'use client'

import { FC } from "react";
import { DemoCard } from "@/components/Random/Misc";
import { ComponentMap, ComponentMapper } from "@/components/ComponentMapper";

const DemoCardDemo = () => {
  return (
    <DemoCard
      pinContent={'Click to open in new tab'}
      href={'/'}
      title={'Demo Card'}
      description={'A custom demo card component'}
      
    />
  )
};


const MiscComponents: ComponentMap = {
  DemoCardDemo,
};

const MiscPage: FC = () => {
  return (
    <ComponentMapper title="Misc Components" components={MiscComponents} />
  );
};

export default MiscPage;
