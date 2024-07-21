import { DevToolsForm, DevToolsSchema, useDevTools } from '@/hooks/useDevTools';

export const DevTools = () => {
  const { debug, toggleDebug, keyLoggerConfig, setKeyLoggerConfig } = useDevTools();

  return <div className="flex flex-col gap-2 w-full h-auto justify-center items-center p-4 overflow-auto"></div>;
};
