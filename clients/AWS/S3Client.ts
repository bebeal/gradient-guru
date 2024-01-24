import { Readable } from 'stream';
import { GetObjectCommand, S3Client as InternalS3Client, ListObjectVersionsCommand, ObjectVersion, PutObjectCommand, PutObjectOutput } from '@aws-sdk/client-s3';
import { AwsCredentialIdentity } from '@aws-sdk/types';
import { getEnvVariable } from '@/utils';

const streamToString = (stream: Readable): Promise<string> => {
  return new Promise((resolve, reject) => {
    let data = '';
    stream.on('data', (chunk) => (data += chunk));
    stream.on('end', () => resolve(data));
    stream.on('error', reject);
  });
};

const getAWSCredentials = (): AwsCredentialIdentity | null => {
  const accessKeyId = getEnvVariable('_AWS_ACCESS_KEY_ID');
  const secretAccessKey = getEnvVariable('_AWS_SECRET_ACCESS_KEY');
  if (!accessKeyId || !secretAccessKey) {
    console.error('Invalid AWS S3 credentials');
    return null;
  }
  return { accessKeyId, secretAccessKey };
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
  private client: InternalS3Client;
  private bucket: string;
  private cache: Record<string, any> = {};

  private constructor() {
    const bucket = getBucket();
    const client = getS3Client();
    if (!client || !bucket) {
      throw new Error('Invalid AWS S3 credentials');
    }
    this.client = client;
    this.bucket = bucket;
  }

  public static getInstance(): S3Client {
    if (!S3Client.instance) {
      S3Client.instance = new S3Client();
    }
    if (!S3Client.instance) {
      throw new Error('S3Client instance could not be created');
    }
    return S3Client.instance;
  }

  private static getCacheKey(id: string, versionId: string | undefined = undefined): string {
    return versionId ? `${id}-${versionId}` : id;
  }

  // lists the versions of an object
  public async listVersions(id: string): Promise<ObjectVersion[]> {
    const request = new ListObjectVersionsCommand({
      Bucket: this.bucket,
      Prefix: id,
    });

    const response = await this.client.send(request);
    const unsortedVersions = response?.Versions || [];
    const sortedVersions = unsortedVersions.sort((a, b) => {
      const dateA = a.LastModified ? new Date(a.LastModified).getTime() : 0;
      const dateB = b.LastModified ? new Date(b.LastModified).getTime() : 0;
      return dateA - dateB;
    });
    return sortedVersions;
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

  // get all versions of an object in an array where index = version
  public async getAll(id: string): Promise<Record<string, any>[]> {
    const versions = await this.listVersions(id);
    return Promise.all(versions.map(version => this.getObject(id, version.VersionId)));
  }

  // get an object by `id` and optional `version`
  // `version` is an index of which version of the object to retrieve. Defaults to latest version.
  public async get(id: string, version: number | undefined = undefined): Promise<Record<string, any>> {
    if (version) {
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

  // get `versionId` of an object
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
