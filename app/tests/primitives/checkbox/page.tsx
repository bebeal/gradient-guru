'use client';

import { useState } from 'react';
import { Checkbox, Icon } from '@/components';

const CheckboxPage = () => {
  const [value, setValue] = useState<boolean | 'indeterminate'>('indeterminate');

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary text-primary">
      <div className="flex items-center justify-center gap-10">
        <Checkbox checked={value} onCheckedChange={setValue} size={8} />
        <Checkbox checked={value} onCheckedChange={setValue} size={14} />
        <Checkbox checked={value} onCheckedChange={setValue} size={16} />
        <Checkbox checked={value} onCheckedChange={setValue} size={18} />
        <Checkbox checked={value} onCheckedChange={setValue} size={20} />
        <Checkbox checked={value} onCheckedChange={setValue} size={24} />
        <Checkbox checked={value} onCheckedChange={setValue} size={28} />
        <Checkbox checked={value} onCheckedChange={setValue} size={32} />
        <Checkbox checked={value} onCheckedChange={setValue} size={40} />
      </div>
      <Icon set="Carbon" icon="Checkmark" className="hidden" />
    </div>
  );
};

export default CheckboxPage;
