'use client'

import { Separator } from "@radix-ui/themes";
import { Button, IconSetCache } from "@/components";

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

const PrimitivesPage = () => {
  const colors = ['#FF1834', '#FFC900', '#00E0D9', '#0074E0', '#7F00DE', '#FF007E'];
  return (
    <div className="w-full h-full overflow-hidden">
      <h1 className="text-2xl font-bold flex w-full justify-center p-2">Primitives</h1>
      <Separator orientation="horizontal" size="4" />
      <div className="flex flex-col items-center justify-center gap-1">
        <PrimitiveDemo primitiveName="Button" primitiveComponent={<Button colors={colors}><IconSetCache.Carbon.Home height={`24`} /><div>Home</div></Button>} />
      </div>
    </div>
  )
};
export default PrimitivesPage;
