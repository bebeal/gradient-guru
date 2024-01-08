'use client'

import { useApi } from "@/hooks";
import { useEffect, useState } from "react";
import { Button, Erroring, Loading, RadiusClasses, Success } from "@/components";
import { useSession, signIn } from "next-auth/react";
import { cn } from "@/utils";

const AuthStatus = () => {
  const session: any = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn(); // Force sign in to hopefully resolve error
    }
  }, [session]);

  let status = <></>;
  let statusColor = 'accent';
  if (session.status === "loading") {
    statusColor = 'accent';
    status = (
      <div className="flex gap-1 w-auto h-auto justify-center items-center">
        <Loading /> Fetching Session...
      </div>
    );
  }

  if (session.status === "unauthenticated") {
    statusColor = 'error';
    status = (
      <div className="flex gap-1 w-auto h-auto justify-center items-center">
        <Erroring /> Access Denied
      </div>
    )
  }

  if (session.status === "authenticated") {
    statusColor = 'text-green-500';
    status = (
      <div className="flex gap-1 w-auto h-auto justify-center items-center">
        <Success /> Access Granted
      </div>
    )
  }
  

  return (
    <div className="relative flex gap-1 w-auto h-auto justify-center items-center">
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
      {status}
    </div>
  )
}

export interface GoogleDriveUtilityProps {

}

export const GoogleDriveUtility = (props: GoogleDriveUtilityProps) => {
  const { listFilesFromDrive } = useApi();
  const [result, setResult] = useState<any>(null);
  const [gapiLoaded, setGapiLoaded] = useState(false);
  const [gisLoaded, setGisLoaded] = useState(false);

  const loadScript = (src: string) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error(`Failed to load script ${src}`));
      document.head.appendChild(script);
    });
  };

  useEffect(() => {
    const loadGapi = async () => {
      await loadScript('https://apis.google.com/js/api.js');
      setGapiLoaded(true);
    };
    const loadGis = async () => {
      await loadScript('https://accounts.google.com/gsi/client');
      setGisLoaded(true);
    };
    loadGapi();
    loadGis();
  }, []);

  return (
    <div className="flex flex-col gap-1 w-auto h-auto justify-center items-center">
      <AuthStatus />
      <Button 
        variant="outline"
        onClick={async () => {
          console.log('listFilesFromDrive');
          const results = await listFilesFromDrive();
          setResult(results);
          console.log('results', results);
        }}>listFilesFromDrive</Button>
        {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  )
};
