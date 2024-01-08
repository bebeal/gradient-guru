import { googleAuth } from "@/utils";
import { google, Auth, drive_v3 } from "googleapis";

export class GDriveClient {
  private static instance: GDriveClient;
  private auth: Auth.OAuth2Client;
  private drive: any;

  private constructor() {
    const auth = new google.auth.OAuth2({
      ...googleAuth,
      forceRefreshOnFailure: true,
    });
    const drive = google.drive({
      version: 'v3',
      auth,
    });
    if (!auth || !drive) {
      throw new Error('Google Drive Client failed to initialize');
    }
    this.auth = auth;
    this.drive = drive;
  }

  public static getInstance(session: any) {
    if (!GDriveClient.instance) {
      GDriveClient.instance = new GDriveClient();
    }
    if (!GDriveClient.instance) {
      throw new Error('GDriveClient instance could not be created');
    }
    if (session) {
      GDriveClient.instance.auth.setCredentials({
        refresh_token: session?.account?.refresh_token,
        access_token: session?.account?.access_token,
      });
    }
    return GDriveClient.instance;
  }

  public async listFiles(extensionFilters: string[] = []): Promise<drive_v3.Schema$File[]> {
    try {
      const response = await this.drive.files.list({
        pageSize: 10,
        fields: 'nextPageToken, files(id, name)',
      });

      const files = response.data.files;
      if (files.length === 0) {
        console.log('No files found.');
        return [];
      }
      return files;
    } catch (error) {
      console.error('The API returned an error: ' + error);
      throw error;
    }
  }

  public async uploadFile(file: Buffer, mimeType: string = 'application/octet-stream', folderId?: string): Promise<drive_v3.Schema$File> {
    try {
      const fileMetadata = {
        name: 'Uploaded File', // You can set a dynamic name based on your requirements
        parents: folderId ? [folderId] : undefined,
      };

      const media = {
        mimeType,
        body: file,
      };

      const response = await this.drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id',
      });

      return response.data;
    } catch (error) {
      console.error('Error uploading file: ' + error);
      throw error;
    }
  }

  public async downloadFile(fileId: string): Promise<Buffer> {
    try {
      const response = await this.drive.files.get({
        fileId: fileId,
        alt: 'media',
      }, { responseType: 'stream' });

      const chunks: Buffer[] = [];
      return new Promise((resolve, reject) => {
        response.data
          .on('data', (chunk: any) => chunks.push(Buffer.from(chunk)))
          .on('end', () => resolve(Buffer.concat(chunks)))
          .on('error', reject);
      });
    } catch (error) {
      console.error('Error downloading file: ' + error);
      throw error;
    }
  }
}

