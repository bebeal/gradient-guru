
import React from 'react';
import { GoogleDriveUtility, Loading } from '@/components';
// import { getEnvVariable } from '@/utils/environment';
import { getGoogleDriveAPIKey } from '@/clients/Google/GoogleAuth';

const GooglePickerPage: React.FC = () => {
  const GoogleDriveAPIKey = getGoogleDriveAPIKey();
  return (
    <div className="flex flex-col bg-primary h-full overflow-auto w-full items-center justify-center">
      <div className="w-[300px] h-[300px] bg-secondary flex justify-center items-center">
      {!GoogleDriveAPIKey ? <Loading /> : <GoogleDriveUtility googleDriveApiKey={GoogleDriveAPIKey} />}
      </div>
    </div>
  );
};

export default GooglePickerPage;
