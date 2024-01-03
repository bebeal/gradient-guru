import { AwsCredentialIdentity } from '@aws-sdk/types';
import { S3Client as InternalS3Client, PutObjectCommand, PutObjectOutput, GetObjectCommand, GetObjectOutput } from '@aws-sdk/client-s3';
import { getEnvVariable } from '@/utils';
import { Readable } from 'stream';
import { InvalidLinkHtml } from '@/components';

const streamToString = (stream: Readable): Promise<string> => {
  return new Promise((resolve, reject) => {
    let data = '';
    stream.on('data', chunk => data += chunk);
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
  // singleton instance - nsuring that only one instance of the client exists throughout the application
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
      throw new Error("S3Client instance could not be created");
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
    return response;
  }

  public async get(id: string): Promise<string> {
    const request = new GetObjectCommand({
      Bucket: this.bucket,
      Key: id,
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

export class MockS3Client {
  public config = {
    credentials: {
      accessKeyId: `accessKeyId`,
      secretAccessKey: `secretAccessKey`,
    },
    region: 'us-west-2',
  };
  public records: { [key: string]: string } = {
    'test': InvalidLinkHtml
  };

  public static getInstance(): MockS3Client {
    console.log(`MockS3Client.getInstance`);
    return new MockS3Client();
  }

  public async put(id: string, json: Record<string, any>) {
    const jsonString = JSON.stringify(json);
    this.records[id] = jsonString;
    return new Promise((resolve) => {
      resolve({
        ETag: 'etag',
        VersionId: 'versionId',
        Location: 'location',
      } as PutObjectOutput);
    });
  }

  public async get(id: string): Promise<GetObjectOutput> {
    const response: any = JSON.parse(this.records[id]);
    return new Promise((resolve) => {
      resolve(response as GetObjectOutput);
    });
  }
}

