import { Readable } from 'stream';
import { getEnvVariable, getEnvVariables } from '@/utils/environment';
import { streamToString } from '@/utils/stream';
import { GetObjectCommand, S3Client as InternalS3Client, ListObjectVersionsCommand, ObjectVersion, PutObjectCommand, PutObjectOutput } from '@aws-sdk/client-s3';
import { AwsCredentialIdentity } from '@aws-sdk/types';

const getAWSCredentials = () => {
  const { accessKeyId, secretAccessKey } = getEnvVariables({
    accessKeyId: '_AWS_ACCESS_KEY_ID',
    secretAccessKey: '_AWS_SECRET_ACCESS_KEY',
  });
  return {
    accessKeyId,
    secretAccessKey,
  } satisfies AwsCredentialIdentity;
};

const getRegion = (): string | null => {
  return getEnvVariable('_AWS_REGION');
};

const getBucket = (): string | null => {
  return getEnvVariable('_AWS_BUCKET');
};

const getS3Client = (): InternalS3Client | null => {
  const credentials = getAWSCredentials();
  const region = getRegion();
  if (!credentials || !region) {
    console.error('Invalid AWS S3 credentials', `\ncredentials: ${credentials}`, `\nregion: ${region}`);
    return null;
  }
  return new InternalS3Client({ credentials, region });
};

export class S3Client {
  // singleton instance - ensuring that only one instance of the client exists throughout the application
  private static instance: S3Client;
  // internal client from aws-sdk
  private client: InternalS3Client;
  private bucket: string;
  // local object cache
  private cache: Record<string, Record<string, any>> = {};

  private constructor() {
    const bucket = getBucket();
    const client = getS3Client();
    if (!client || !bucket) {
      throw new Error('Invalid AWS S3 credentials');
    }
    this.client = client;
    this.bucket = bucket;
  }

  public static envVariables(): string[] {
    return ['_AWS_ACCESS_KEY_ID', '_AWS_SECRET_ACCESS_KEY', '_AWS_REGION', '_AWS_BUCKET'];
  }

  public static getMissingEnvVariables(): string[] {
    return S3Client.envVariables().filter((env) => !getEnvVariable(env));
  }

  // returns the singleton instance of the client
  public static getInstance(): S3Client {
    if (!S3Client.instance) {
      S3Client.instance = new S3Client();
    }
    if (!S3Client.instance) {
      throw new Error('S3Client instance could not be created');
    }
    return S3Client.instance;
  }

  // returns a cache key for an object to be used with the local object cache
  private static getCacheKey(id: string, versionId: string | undefined = undefined): string {
    return versionId ? `${id}-${versionId}` : id;
  }

  // lists sll available versions of an object
  public async listVersions(id: string, sort = true): Promise<ObjectVersion[]> {
    const request = new ListObjectVersionsCommand({
      Bucket: this.bucket,
      Prefix: id,
    });

    const response = await this.client.send(request);
    const unsortedVersions = response?.Versions || [];
    if (sort) {
      // sort by LastModified date
      const sortedVersions = unsortedVersions.sort((a, b) => {
        const dateA = a.LastModified ? new Date(a.LastModified).getTime() : 0;
        const dateB = b.LastModified ? new Date(b.LastModified).getTime() : 0;
        return dateA - dateB;
      });
      return sortedVersions;
    }
    return unsortedVersions;
  }

  // puts a new object in the bucket, returns the versionId of the object if bucket versioning is enabled
  public async put(id: string, json: Record<string, any>): Promise<PutObjectOutput> {
    const jsonString = JSON.stringify(json);
    const request = new PutObjectCommand({
      Bucket: this.bucket,
      Key: id,
      Body: jsonString,
      ContentType: 'application/json',
    });
    const response = await this.client.send(request);
    this.cache[S3Client.getCacheKey(id, response?.VersionId)] = json;
    return response;
  }

  // get all available versions of an object
  public async getAll(id: string): Promise<Record<string, any>[]> {
    const versions = await this.listVersions(id);
    return Promise.all(versions.map((version) => this.getObject(id, version.VersionId)));
  }

  // Get specific version of an object using version index
  // `version` is an index of which version of the object to retrieve. Defaults to latest version.
  public async get(id: string, version: number | undefined = undefined): Promise<Record<string, any>> {
    if (version !== undefined) {
      // get all versions of the object, use version as index to get the versionId
      const versions = await this.listVersions(id);
      if (version >= versions.length) {
        throw new Error(`Invalid version ${version} for ${id}`);
      }
      return this.getObject(id, versions[version || 0].VersionId);
    } else {
      return this.getObject(id);
    }
  }

  // Get specific version of an object using versionId
  // or latest version if versionId is not provided
  public async getObject(id: string, versionId: string | undefined = undefined): Promise<Record<string, any>> {
    // Return from cache if available
    const cacheKey = S3Client.getCacheKey(id, versionId);
    if (this.cache[cacheKey]) {
      return this.cache[cacheKey];
    }

    const request = new GetObjectCommand({
      Bucket: this.bucket,
      Key: id,
      VersionId: versionId, // if versionId is not provided, the latest version is returned
    });

    const response = await this.client.send(request);
    if (!response.Body) {
      throw new Error(`Invalid response body for ${id}`);
    }

    const fetchedResponse = await streamToString(response.Body as Readable);
    try {
      const json = JSON.parse(fetchedResponse);
      this.cache[cacheKey] = json;
      return json;
    } catch (error) {
      throw new Error(`Error parsing JSON from ${id}: ${error}`);
    }
  }
}
