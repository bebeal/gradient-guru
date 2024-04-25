import { FC, useEffect, useState } from 'react';
import { ComponentMap, ComponentMapper } from '@/components/ComponentMapper/ComponentMapper';
import { useDevTools } from '@/hooks/useDevTools';
import { TargetIcon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';
import { throttle } from 'lodash';

// Test for react-gieger (set to true in dev tool config)
const ReactGeigerTool = () => {
  const devTools = useDevTools();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = throttle((event: any) => {
    // Update position state with mouse coordinates
    setPosition({
      x: event.clientX,
      y: event.clientY,
    });
  }, 1000);

  useEffect(() => {
    devTools.toggleDevTool('geiger', true);
  }, [devTools]);

  return (
    <IconButton className="p-2 hover:cursor-pointer pointer-events-auto" color="green" radius="large" variant="surface" onMouseMove={handleMouseMove}>
      <TargetIcon width={'1em'} height={'100%'} />
    </IconButton>
  );
};

const DevToolExamples: ComponentMap = {
  ReactGeigerTool,
};

const DevToolsPage: FC = () => {
  return <ComponentMapper title="Dev Tools" components={DevToolExamples} />;
};

export default DevToolsPage;
