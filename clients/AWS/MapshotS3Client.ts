import { MapshotManifest, MapshotMetadata } from '@/utils/mapshot';
import { GetObjectCommand, S3Client, ListObjectsV2Command, S3ClientConfig } from '@aws-sdk/client-s3';
import { AwsCredentialIdentity } from '@aws-sdk/types';

export const getAwsCredentials = (): AwsCredentialIdentity | null => {
  const accessKeyId = process.env._AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env._AWS_SECRET_ACCESS_KEY;
  if (!accessKeyId || !secretAccessKey) {
    console.error('Missing AWS credentials (env variables [_AWS_ACCESS_KEY_ID, _AWS_SECRET_ACCESS_KEY])');
    return null;
  }
  return { accessKeyId, secretAccessKey };
};

export const getAwsRegion = (): string | null => {
  const region = process.env._AWS_REGION;
  if (!region) {
    console.error('Missing AWS region (env variable [_AWS_REGION])');
    return null;
  }
  return region;
}

export const getMapBucket = (): string | null => {
  const bucket = process.env.MAP_BUCKET;
  if (!bucket) {
    console.error('Missing bucket configuration (env variables [MAP_BUCKET])');
    return null;
  }
  return bucket;
};

export class MapshotS3Client {
  private static instance: MapshotS3Client;
  private client: S3Client;
  private mapBucket: string;
  private region: string;

  private constructor() {
    this.mapBucket = getMapBucket()!;
    this.region = getAwsRegion()!;
    const credentials = getAwsCredentials();
    const clientConfig: S3ClientConfig = {
      region: this.region || undefined,
    };
    if (credentials) {
      clientConfig.credentials = credentials;
    }
    this.client = new S3Client(clientConfig);
  }

  public static getInstance(): MapshotS3Client {
    if (!MapshotS3Client.instance) {
      MapshotS3Client.instance = new MapshotS3Client();
    }
    return MapshotS3Client.instance;
  }

  private async fetchJsonData<T>(key: string): Promise<T> {
    const command = new GetObjectCommand({
      Bucket: this.mapBucket,
      Key: key,
    });
    const response = await this.client.send(command);
    if (!response.Body) {
      throw new Error('Empty response body');
    }
    const bodyContents = await response.Body.transformToString();
    return JSON.parse(bodyContents);
  }

  // list all directories in the map bucket which are considered mapshots
  public async listMapshots(): Promise<string[] | null> {
    const command = new ListObjectsV2Command({
      Bucket: this.mapBucket,
      Delimiter: '/',
    });
    try {
      const response = await this.client.send(command);
      return response.CommonPrefixes?.map(prefix => prefix.Prefix?.replace('/', '') ?? '') ?? [];
    } catch (error) {
      console.warn('Error listing mapshots:', error);
      throw error;
    }
  }

  // Get the metadata for all available mapshots.
  public async getMapshots(): Promise<MapshotMetadata[] | null> {
    try {
      return await this.fetchJsonData<MapshotMetadata[]>('mapshots.json');
    } catch (error) {
      console.error('Error getting mapshots:', error);
      throw error;
    }
  }

  // Get the manifest for a specific mapshot.
  public async getMapshotManifest(mapshot: string): Promise<MapshotManifest | null> {
    try {
      return await this.fetchJsonData<any>(`${mapshot}/mapshot.json`);
    } catch (error) {
      console.error('Error getting map manifest:', error);
      throw error;
    }
  }

  // Get a mapshot tile from the S3 bucket.
  public async getMapshotTile(
    mapshot: string,
    prefix: string,
    z: string,
    x: string,
    y: string,
  ): Promise<Buffer | null> {
    const key = `${mapshot}/${prefix}${z}/tile_${x}_${y}.jpg`;
    const command = new GetObjectCommand({
      Bucket: this.mapBucket,
      Key: key,
    });
    try {
      const response = await this.client.send(command);
      if (!response.Body) {
        throw new Error('Empty response body');
      }
      const byteArray = await response.Body.transformToByteArray();
      return Buffer.from(byteArray);
    } catch (error) {
      console.error('Error getting mapshot tile:', error);
      throw error;
    }
  }
}
