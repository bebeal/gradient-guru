'use client'

import { useMemo, useState } from "react";
import { Separator } from "@radix-ui/themes";
import { Button, CarbonIconNames, Checkbox, IconSetCache, Input, Select } from "@/components";
import { defaultVariants } from "@/utils";

const PrimitiveDemo = ({ primitiveName, primitiveComponent }: any) => {
  return (
    <>
    <h2 className="text-2xl font-bold flex w-full justify-center p-2">{primitiveName}</h2>
    <div className="w-full h-full flex flex-col items-center justify-center p-10">
      <div className="w-full h-full flex flex-col items-center justify-center">
        {primitiveComponent}
      </div>
    </div>
    <Separator orientation="horizontal" size="4" />
    </>
  )
}

const PrimitiveVariantsDemo = ({ primitiveName, Primitive, primitiveVariants=[], ...rest }: any) => {
  return (
    <>
    <h2 className="text-2xl font-bold flex w-full justify-center p-2">{primitiveName}</h2>
    <div className="w-full h-full flex flex-col items-center justify-center p-2">
      <div className="w-full h-full flex items-center justify-around flex-wrap">
        {primitiveVariants.map((variant: any, index: number) => {
          return (
            <div key={index} className="flex flex-col items-center justify-center gap-1 w-auto">
              <Primitive {...rest} variant={variant} />
              <div className="text-sm">{variant}</div>
            </div>
          );
        })}
        </div>
    </div>
    <Separator orientation="horizontal" size="4" />
    </>
  )

};

const iconItems = CarbonIconNames.map((item: any) => {
  if (typeof item === 'string') {
    return { value: item, children: item };
  }
  return item;
});
const PrimitivesPage = () => {
  const [checked, setChecked] = useState<boolean | 'indeterminate'>(false);
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('item 1');

  const colors = ['#FF1834', '#FFC900', '#00E0D9', '#0074E0', '#7F00DE', '#FF007E'];
  const items: any = ['item 1', 'item 2', 'item 3'];
  const moreItems = [
    {
      value: 'item 1',
      children: <IconSetCache.Carbon.Home />
    },
    {
      value: 'item 2',
      children: <IconSetCache.Carbon.MachineLearning />
    },
    {
      value: 'item 3',
      children: <IconSetCache.Carbon.Ai />
    }
  ];

  const buttonPrimitiveProps: any = {
    colors: colors,
  };
  const checkboxPrimitiveProps: any = {
    checked: checked,
    onCheckedChange: setChecked,
    children: checked ? 'Checked' : 'Unchecked'
  };
  const input = <Input value={inputValue} onChange={(e: any) => setInputValue(e.target.value)} />;
  const select = <Select value={selectValue} items={items} onValueChange={setSelectValue} />;
  const selectWithIcons = <Select value={selectValue} items={moreItems} onValueChange={setSelectValue} />;

  const [icon, setIcon] = useState('Accessibility');

  const iconSelect = useMemo(() => <Select value={icon} items={iconItems} onValueChange={(value: any) => {
    setIcon(value);
  }} /> , [icon]);

  const normalIconSelect = useMemo(() => <select value={icon} onChange={(e: any) => {
    setIcon(e.target.value);
  }}>
    {CarbonIconNames.map((icon: any, index: number) => {
      return (
        <option key={index} value={icon}>{icon}</option>
      )
    })}
  </select>, [icon]);

  return (
    <div className="w-full h-full overflow-auto bg-gray-600">
      <h1 className="text-2xl font-bold flex w-full justify-center p-2">Primitives</h1>
      <Separator orientation="horizontal" size="4" />
      <div className="flex flex-col items-center justify-center gap-1">
        <PrimitiveVariantsDemo primitiveName="Button" Primitive={Button} primitiveVariants={[...defaultVariants, 'gradient']} {...buttonPrimitiveProps}>
          <IconSetCache.Carbon.Home height={`24`} /><div>Home</div>
        </PrimitiveVariantsDemo>
        <PrimitiveVariantsDemo primitiveName="Checkbox" Primitive={Checkbox} primitiveVariants={['classic', 'surface', 'soft']} {...checkboxPrimitiveProps} />
        <PrimitiveDemo primitiveName="Select" primitiveComponent={select} />
        <PrimitiveDemo primitiveName="Select with icons" primitiveComponent={selectWithIcons} />
        <PrimitiveDemo primitiveName="Input" primitiveComponent={iconSelect} />
        <PrimitiveDemo primitiveName="Normal Input" primitiveComponent={normalIconSelect} />
      </div>
    </div>
  )
};
export default PrimitivesPage;
