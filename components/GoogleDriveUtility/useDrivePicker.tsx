'use client';

import { useCallback, useEffect, useState } from 'react';
import Script from 'next/script';
import { useSession } from 'next-auth/react';
import { useToasts } from '@/hooks/useToasts';

export interface DrivePickerProps {
  googleDriveApiKey?: string | null;
}

export const useDrivePicker = ({ googleDriveApiKey }: DrivePickerProps) => {
  const session: any = useSession();
  const { addToast } = useToasts();
  const [gapiLoaded, setGapiLoaded] = useState(false);
  const [pickerApiLoaded, setPickerApiLoaded] = useState(false);
  const [selection, setSelection] = useState<any>(null);

  useEffect(() => {
    if (selection) {
      const fileCount = selection?.length;
      addToast({
        title: `${fileCount === 1 ? 'File' : 'Files'} Selected`,
        description: (
          <ul className="list-disc ml-4 text-xs">
            {selection.map((file: any) => (
              <li key={file.id}>{file.name}</li>
            ))}
          </ul>
        ),
      });
    }
  }, [selection, addToast]);

  const pickerCallback = useCallback((data: any) => {
    if (data[window.gapi.picker.api.Response.ACTION] == window.gapi.picker.api.Action.PICKED) {
      const docs: any = data[window.gapi.picker.api.Response.DOCUMENTS];
      console.log('Picked Docs', docs);
      setSelection(docs);
    }
  }, []);

  const createPicker = useCallback(() => {
    if (!googleDriveApiKey || !gapiLoaded || !pickerApiLoaded || !session) {
      console.error('Missing required parameters or APIs not loaded');
      return;
    }
    const pickerApi = window.gapi.picker.api;
    const preSearchedView = new pickerApi.View(pickerApi.ViewId.DOCS);
    const googleDriveViewGroup = new pickerApi.ViewGroup(preSearchedView);
    const picker = new pickerApi.PickerBuilder()
      .addViewGroup(googleDriveViewGroup)
      .setOAuthToken(session.data.account.access_token)
      .setDeveloperKey(googleDriveApiKey)
      .setCallback(pickerCallback)
      .enableFeature(pickerApi.Feature.MULTISELECT_ENABLED)
      .enableFeature(pickerApi.Feature.SIMPLE_UPLOAD_ENABLED)
      .enableFeature(pickerApi.Feature.MINE_ONLY)
      .build();
    picker.setVisible(true);
  }, [gapiLoaded, pickerApiLoaded, pickerCallback, session, googleDriveApiKey]);

  const loadGoogleApi = useCallback(() => {
    if (typeof window === 'undefined') {
      console.error('Window object not found');
      return;
    }
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
          onerror: () => console.error('Error loading Picker API'),
        });
      },
      onerror: () => console.error('Error loading Google API'),
    });
  }, [gapiLoaded]);

  const GoogleApiScript = () => {
    return <Script id="google-drive-api" src="https://apis.google.com/js/api.js" onLoad={loadGoogleApi} strategy="afterInteractive" />;
  };

  return {
    selection,
    createPicker,
    loadGoogleApi,
    pickerApiLoaded,
    gapiLoaded,
    session,
    GoogleApiScript,
  };
};
