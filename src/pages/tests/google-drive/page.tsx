import React from 'react';
import { getGoogleDriveAPIKey } from '@/clients/Google/GoogleAuth';
import { GoogleDriveUtility } from '@/components/GoogleDriveUtility/GoogleDriveUtility';
import { Loading } from '@/components/Primitives/Loading';

const GooglePickerPage: React.FC = () => {
  const GoogleDriveAPIKey = getGoogleDriveAPIKey();
  // const GoogleDriveAPIKey = null;
  return (
    <div className="flex flex-col bg-primary h-full overflow-auto w-full items-center justify-center">
      <div className="w-[300px] h-[300px] bg-secondary flex justify-center items-center">{!GoogleDriveAPIKey ? <Loading /> : <GoogleDriveUtility googleDriveApiKey={GoogleDriveAPIKey} />}</div>
    </div>
  );
};

export default GooglePickerPage;
