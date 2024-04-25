import { useEffect, useMemo } from 'react';
import { Button } from '@/components/Primitives/Button';
// import { signIn, useSession } from 'next-auth/react';

import { Icon } from '@/components/Primitives/Icons/Icon';
import { RadiusClasses } from '@/utils/styles';
import { cn } from '@/utils/utils';

export const DebugAuthComponent = ({ session, gapiLoaded, pickerApiLoaded }: { session: any; gapiLoaded: boolean; pickerApiLoaded: boolean }) => {
  return (
    <div className="absolute top-0 left-0 w-auto h-auto bg-tertiary border border-primary flex justify-center items-center m-2 rounded p-1 text-xs">
      <div className="grid grid-cols-2 gap-1 w-full p-2 rounded">
        <strong>Auth Status:</strong>
        <div className="flex justify-end gap-1">
          {session.status} <AuthStatus />
        </div>
        <strong>GAPI Loaded:</strong>
        <div className="flex justify-end">{gapiLoaded ? 'Yes' : 'No'}</div>
        <strong>Picker API Loaded:</strong>
        <div className="flex justify-end">{pickerApiLoaded ? 'Yes' : 'No'}</div>
      </div>
    </div>
  );
};

interface AuthSession {
  status: string;
  error?: string;
}

export const AuthStatus = () => {
  // const session: any = useSession();
  // dummy for now until we replace next-auth
  const session = useMemo(() => {
    return { status: 'authenticated' } as AuthSession;
  }, []);

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      console.log('session error: RefreshAccessTokenError', session);
    }
  }, [session]);

  let statusColor = 'accent';
  if (session.status === 'loading') {
    statusColor = 'accent';
  }

  if (session.status === 'unauthenticated') {
    statusColor = 'error';
  }

  if (session.status === 'authenticated') {
    statusColor = 'green-500';
  }

  return (
    <div className="relative flex w-2 h-2 justify-center items-center">
      <div className={cn(`absolute left-100 top-100 bottom-0 right-0 h-2 w-2 text-${statusColor}`, RadiusClasses('large'))}>
        <span
          className={cn(
            `block h-2.5 w-2.5 rounded-full bg-${statusColor} text-${statusColor} border-black border border-opacity-30`,
            `after:content-[""] after:rounded-full after:w-full after:h-full after:absolute after:animate-ripple after:text-${statusColor} after:border-2 after:border-current`,
          )}
        />
      </div>
    </div>
  );
};

export const AuthenticatePortal: React.FC = () => {
  // dummy sign in until we replace next-auth
  const signIn = (provider: string) => {
    console.log('signing in with provider:', provider);
  };

  return (
    <Button variant="outline" onClick={() => signIn('google')}>
      <Icon set="Logo" icon="Google" className="w-6 h-6" />
      <span>Sign in with Google</span>
    </Button>
  );
};
