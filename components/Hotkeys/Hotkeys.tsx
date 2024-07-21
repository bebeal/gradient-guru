import { GroupedHotkeys, groupHotkeys, Hotkey } from '@/hooks/useHotkeys';
import { useMounted } from '@/hooks/useMounted';
import React, { memo } from 'react';
import { Kbd } from '../Primitives/Kbd';
import { Loading } from '../Primitives/Loading';

export const HotkeyKeys = memo(({ keys }: { keys: string | string[] }) => {
  const mounted = useMounted();
  const keyArray = Array.isArray(keys) ? keys : keys.split('+');
  return (
    <div className="flex items-center gap-1">
      {keyArray?.map((key, index) => (
        <React.Fragment key={`${key}-${index}`}>
          {mounted ? <Kbd>{key}</Kbd> : <Loading className="w-[1ch]" />}
          {index < keyArray.length - 1 && <span className="text-tertiary text-xs">+</span>}
        </React.Fragment>
      ))}
    </div>
  );
});

export const HotkeyHint = ({ hotkey }: { hotkey: Hotkey }) => (
  <div className="grid grid-cols-[auto,1fr] items-center p-3 bg-secondary rounded-lg shadow-sm gap-4">
    <HotkeyKeys keys={hotkey.key} />
    <div className="overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
      <span className="text-sm text-tertiary">{hotkey?.options?.description || '?'}</span>
    </div>
  </div>
);

export const HotkeysGuide = ({ hotkeys }: { hotkeys: Hotkey[] }) => {
  const groupedHotkeys: GroupedHotkeys = groupHotkeys(hotkeys);
  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-8 bg-primary rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-primary mb-6">Keyboard Hotkeys</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {groupedHotkeys.global.map((hotkey, index) => (
          <HotkeyHint key={`global-${index}`} hotkey={hotkey} />
        ))}
        {Object.entries(groupedHotkeys.groups).map(([group, Hotkeys]) => (
          <React.Fragment key={group}>
            <div className="col-span-full text-sm font-semibold text-tertiary mt-4 mb-2">{group}</div>
            {hotkeys.map((hotkey, index) => (
              <HotkeyHint key={`${group}-${index}`} hotkey={hotkey} />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
