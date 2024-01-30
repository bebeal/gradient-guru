'use client'

import Script from 'next/script'
import { useCallback, useEffect, useState } from "react";
import { Button, IconSetCache, RadiusClasses } from "@/components";
import { signIn, useSession } from "next-auth/react";
import { cn } from "@/utils";

// Declare types for Google Picker
declare global {
  interface Window {
    gapi: any;
  }
}

const DebugComponent = ({ session, gapiLoaded }: { session: any, gapiLoaded: boolean }) => {
  return (
    <div className="absolute top-0 left-0 w-auto h-auto bg-tertiary border border-primary flex justify-center items-center m-2 rounded p-1 text-xs">
      <div className="grid grid-cols-2 gap-1 w-full p-2 rounded">
        <strong>Auth Status:</strong>    
        <div className="flex justify-end gap-1">
          {session.status} <AuthStatus />
        </div>
        <strong>GAPI Loaded:</strong>
        <div className="flex justify-end">
          {gapiLoaded ? 'Yes' : 'No'}
        </div>
      </div>
    </div>
  )
};

const AuthStatus = () => {
  const session: any = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      console.log('session error: RefreshAccessTokenError', session);
    }
  }, [session]);

  let statusColor = 'accent';
  if (session.status === "loading") {
    statusColor = 'accent';
  }

  if (session.status === "unauthenticated") {
    statusColor = 'error';
  }

  if (session.status === "authenticated") {
    statusColor = 'green-500';
  }
  

  return (
    <div className="relative flex w-2 h-2 justify-center items-center">
      <div
        className={cn(
          `absolute left-100 top-100 bottom-0 right-0 h-2 w-2 text-${statusColor}`,
          RadiusClasses('large'),
        )}
      >
       <span className={cn(`block h-2.5 w-2.5 rounded-full bg-${statusColor} text-${statusColor} border-black border border-opacity-30`, 
                            `after:content-[""] after:rounded-full after:w-full after:h-full after:absolute after:animate-ripple after:text-${statusColor} after:border-2 after:border-current`,
          )}
        />
      </div>
    </div>
  )
};

export const AuthenticatePortal: React.FC = () => {
  return (
    <Button variant="outline" onClick={() => signIn('google')}>
      <IconSetCache.Logos.Google className="w-6 h-6" />
      <span>Sign in with Google</span>
    </Button>
  );
};
export interface GoogleDriveUtilityProps {
  debug?: boolean;
  googleDriveApiKey?: string | null;
}

export const GoogleDriveUtility = (props: GoogleDriveUtilityProps) => {
  const {
    debug=true,
    googleDriveApiKey,
  } = props;
  const session: any = useSession();
  const [gapiLoaded, setGapiLoaded] = useState(false);
  const [pickerApiLoaded, setPickerApiLoaded] = useState(false);

  const pickerCallback = useCallback((data: any) => {
    if (data[window.gapi.picker.api.Response.ACTION] == window.gapi.picker.api.Action.PICKED) {
      const docs: any = data[window.gapi.picker.api.Response.DOCUMENTS];
      console.log('Picked Docs', docs);

    }
  }, []);

  const createPicker = useCallback(() => {
    if (!googleDriveApiKey || !gapiLoaded || !pickerApiLoaded || !session) {
      console.error('Missing required parameters or APIs not loaded');
      return;
    }
    
    const pickerApi = window.gapi.picker.api;

    const preSearchedView = new pickerApi.View(pickerApi.ViewId.DOCS)
      .setQuery('.tldr');

    const googleDriveViewGroup = new pickerApi.ViewGroup(preSearchedView);
    

    const picker = new pickerApi.PickerBuilder()
        .addViewGroup(googleDriveViewGroup)
        .setOAuthToken(session.data.account.access_token)
        .setDeveloperKey(googleDriveApiKey)
        .setCallback(pickerCallback)
        .enableFeature(pickerApi.Feature.MULTISELECT_ENABLED)
        .enableFeature(pickerApi.Feature.SIMPLE_UPLOAD_ENABLED)
        .build();
  
    picker.setVisible(true);
  }, [gapiLoaded, googleDriveApiKey, pickerApiLoaded, pickerCallback, session]);

  const loadGoogleApi = useCallback(() => {
    if (!window.gapi) {
      console.error('Google API script not loaded');
      return;
    }
    if (gapiLoaded) {
      console.log('Google API already loaded');
      return;
    }
    window.gapi.load('auth', {
      callback: () => {
        setGapiLoaded(true);
        // Load Picker API only after Google API is successfully loaded
        window.gapi.load('picker', {
          callback: () => setPickerApiLoaded(true),
          onerror: () => console.error('Error loading Picker API')
        });
      },
      onerror: () => console.error('Error loading Google API')
    });
  }, [gapiLoaded]);

  const handleOpenPicker = () => {
    createPicker();
  };

  useEffect(() => {
    if (window.gapi && gapiLoaded) {
      window.gapi.load('picker', { callback: () => setPickerApiLoaded(true) });
    }
  }, [gapiLoaded]);

  return (
    <div className="flex flex-col gap-1 w-auto h-auto justify-center items-center">
       <Script
        id="google-drive-api"
        src="https://apis.google.com/js/api.js" 
        onLoad={loadGoogleApi} 
        strategy="afterInteractive"
      />
      {debug && <DebugComponent session={session} gapiLoaded={gapiLoaded} />}
      <AuthenticatePortal />
      <Button variant="outline" onClick={handleOpenPicker}>
        <IconSetCache.Logos.GoogleDrive className="w-6 h-6" />
        Open Google Drive Picker
      </Button>
    </div>
  );
};
