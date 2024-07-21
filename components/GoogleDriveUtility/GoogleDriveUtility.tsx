'use client';

import { useCallback, useEffect, useState } from 'react';
import { Button, GoogleDebugAuthComponent, Icon, Loading } from '@/components';
import { useDrivePicker } from './useDrivePicker';

// Declare types for Google Picker
declare global {
  interface Window {
    gapi: any;
  }
}

export interface GoogleDriveUtilityProps {
  debug?: boolean;
  googleDriveApiKey: string | null;
}

export const GoogleDriveUtility = (props: GoogleDriveUtilityProps) => {
  const { debug = true, googleDriveApiKey } = props;
  const { GoogleApiScript, session, gapiLoaded, pickerApiLoaded, createPicker } = useDrivePicker({ googleDriveApiKey });
  const [createPickerRequested, setCreatePickerRequested] = useState(false);

  useEffect(() => {
    if (createPickerRequested && session?.status === 'authenticated') {
      createPicker();
    }
  }, [createPickerRequested, createPicker, session?.status]);

  const authenticatePopup = useCallback((url: string, title = 'Google Sign In') => {
    if (!window) return;
    const dualScreenLeft = window.screenLeft ?? window.screenX;
    const dualScreenTop = window.screenTop ?? window.screenY;

    const width = window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

    const height = window.innerHeight ?? document.documentElement.clientHeight ?? screen.height;

    const systemZoom = width / window.screen.availWidth;

    const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
    const top = (height - 550) / 2 / systemZoom + dualScreenTop;

    const newWindow = window.open(url, title, `popup=true,width=${500 / systemZoom},height=${550 / systemZoom},top=${top},left=${left}`)!;

    newWindow?.focus();
    // Create an interval to check if the window has been closed, and if so, createPicker
    const interval = setInterval(() => {
      if (newWindow.closed) {
        clearInterval(interval);
        setCreatePickerRequested(true);
      }
    }, 1000);
  }, []);

  const authenticateAndOpenPicker = useCallback(
    (provider: string) => {
      if (session?.status === 'unauthenticated') {
        // Open the Google Sign In window
        authenticatePopup(`/api/auth/signin?provider=${provider}`);
      }

      // if already authenticated, resolve immediately
      if (session?.status === 'authenticated') {
        createPicker();
      }
    },
    [session?.status, authenticatePopup, createPicker],
  );

  const buttonClicked = useCallback(() => {
    authenticateAndOpenPicker('google');
  }, [authenticateAndOpenPicker]);

  if (!googleDriveApiKey) {
    return <Loading />;
  }
  return (
    <div className="flex flex-col gap-1 w-auto h-auto justify-center items-center">
      {debug && <GoogleDebugAuthComponent session={session} gapiLoaded={gapiLoaded} pickerApiLoaded={pickerApiLoaded} />}
      <GoogleApiScript />
      <Button variant="outline" onClick={buttonClicked}>
        <Icon set="Logos" icon="GoogleDrive" className="w-6 h-6" />
        Open Google Drive Picker
      </Button>
    </div>
  );
};
