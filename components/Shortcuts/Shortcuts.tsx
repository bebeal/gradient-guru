'ues client';

import { GroupedShortcuts, groupShortcuts, Shortcut, useShortcuts } from "@/hooks/useShortcuts";
import React, { memo } from "react";
import { Kbd } from "../Primitives/Kbd";
import { useMounted } from "@/hooks/useMounted";
import { Loading } from "../Primitives/Loading";

// Display each individual code of the shortcut with <Kbd> components which looks like a keyboard key
// wait till mounted so it only determines which key to display on the client side (whose machine may differ from the server)
export const ShortcutKeys = memo(({ keys }: { keys: string | string[] }) => {
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
  )
});

// A single shortcut hint with shortcut keys and description
export const ShortcutHint = ({ shortcut }: { shortcut: Shortcut }) => (
  <div className="flex justify-between items-center p-3 bg-secondary rounded-lg shadow-sm gap-2">
    <ShortcutKeys keys={shortcut.key} />
    <span className="text-sm text-tertiary">{shortcut?.options?.description || '?'}</span>
  </div>
);

// Display all the shortcuts in a grid with global shortcuts at the top and grouped shortcuts below
export const ShortcutsGuide = ({ shortcuts }: { shortcuts: Shortcut[] }) => {
  const groupedShortcuts: GroupedShortcuts = groupShortcuts(shortcuts);
  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto p-8 bg-primary rounded-lg shadow-lg">
    <h1 className="text-2xl font-bold text-primary">Keyboard Shortcuts</h1>
    <div className="grid grid-cols-2 gap-4">
    {groupedShortcuts.global.map((shortcut, index) => {
      return <ShortcutHint key={`global-${index}`} shortcut={shortcut} />;
    })}
    {Object.keys(groupedShortcuts.groups).map((group, index) => (
       <React.Fragment key={group}>
       <div className="col-span-6 text-sm font-semibold text-tertiary mt-4 mb-2">{group}</div>
      {groupedShortcuts.groups[group].map((shortcut, index) => {
        return <ShortcutHint key={`${group}-${index}`} shortcut={shortcut} />;
  })}
      </React.Fragment>
    ))}
  </div>
</div>
  )
};
