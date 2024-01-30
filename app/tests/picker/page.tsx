
import { GoogleDriveUtility } from '@/components/GoogleDriveFilePicker/GoogleDriveFilePicker';
import { getEnvVariable } from '@/utils/host';
import { Loading } from '@/components/shared';
import React from 'react';


const PickerPage: React.FC = () => {
  const googleDriveApiKey = getEnvVariable('GOOGLE_DRIVE_API_KEY');

  return (
    <div className="flex flex-col bg-primary h-full overflow-auto w-full items-center justify-center">
      <div className="w-[300px] h-[300px] bg-secondary flex justify-center items-center">
        {!googleDriveApiKey ? <Loading /> : <GoogleDriveUtility googleDriveApiKey={googleDriveApiKey} />}
      </div>
    </div>
  );
};

export default PickerPage;
