import { Readable } from 'stream';
import { GetObjectCommand, S3Client as InternalS3Client, PutObjectCommand, PutObjectOutput } from '@aws-sdk/client-s3';
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

const getCredentials = (): AwsCredentialIdentity | null => {
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
  const credentials = getCredentials();
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

  public async put(id: string, json: Record<string, any>): Promise<PutObjectOutput> {
    const jsonString = JSON.stringify(json);
    const request = new PutObjectCommand({
      Bucket: this.bucket,
      Key: id,
      Body: jsonString,
      ContentType: 'application/json',
    });
    const response = await this.client.send(request);
    return response; // contains versionId if bucket versioning is enabled
  }

  public async get(id: string, versionId?: string): Promise<string> {
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
      return json;
    } catch (error) {
      throw new Error(`Error parsing JSON from ${id}: ${error}`);
    }
  }
}
