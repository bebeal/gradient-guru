'use client'

import * as yup from 'yup';
import { cn, sortObject } from '@/utils';
import { Schema, SchemaMeta } from './Form';
import { DataModality } from '@/clients';
import { Badge } from '@radix-ui/themes';

// infer yup schema from object types
export const inferSchema = (object: Record<string, any>): Schema => {
  return yup.object().shape(
    Object.entries(object).reduce((acc: Record<string, yup.AnySchema & { meta: SchemaMeta }>, [key, value]) => {
      if (typeof value === 'string') {
        acc[key] = yup.string().meta({ item: 'readOnly' });
      } else if (typeof value === 'number') {
        acc[key] = yup.number().meta({ item: 'readOnly' });
      } else if (typeof value === 'boolean') {
        acc[key] = yup.boolean().meta({ item: 'checkbox' });
      } else if (Array.isArray(value)) {
        acc[key] = yup.array().meta({ item: 'array' });
      } else if (typeof value === 'object') {
        acc[key] = inferSchema(value).meta({ item: 'object' });
      }
      return acc;
    }, {})
  );
};

// extract meta property from schema
export const extractFromMeta = (schema: Schema, property: string) => {
  return Object.keys(schema.fields).reduce((acc: Record<string, any>, key: string) => {
    const field: any = schema.fields[key];
    if (field.spec.meta && field.spec.meta[property]) {
      acc[key] = field.spec.meta[property];
    }
    return acc;
  }, {});
};

const ModalityColors: Record<DataModality, { variant: "solid" | "soft" | "surface" | "outline", color: "tomato" | "red" | "ruby" | "crimson" | "pink" | "plum" | "purple" | "violet" | "iris" | "indigo" | "blue" | "cyan" | "teal" | "jade" | "green" | "grass" | "brown" | "orange" | "sky" | "mint" | "lime" | "yellow" | "amber" | "gold" | "bronze" | "gray" }> = {
  text: {
    variant: 'surface',
    color: 'sky',
  },
  image: {
    variant: 'surface',
    color: 'green',
  },
  audio: {
    variant: 'surface',
    color: 'red',
  },
  video: {
    variant: 'surface',
    color: 'yellow',
  },
};


const CompactBadge = ({ modality, className, animate=true }: { modality: DataModality; className?: string, animate?: boolean }) => {
  return (
    <div className={cn(`h-auto w-auto text-${ModalityColors[modality].color}`, "flex justify-center items-center relative rounded")}>
    <span className={cn(`block h-2.5 w-2.5 rounded-full bg-${ModalityColors[modality].color} text-${ModalityColors[modality].color} border-black border border-opacity-30`, 
          animate && `after:content-[""] after:rounded-full after:w-full after:h-full after:left-0 after:top-0 after:absolute after:animate-ripple after:text-${ModalityColors[modality].color} after:border-2 after:border-current after:translate-x-1/2 after:translate-y-1/2`,
          className
        )}
    />
    </div>
  )
}

export const DataModalityBadge = ({ modality, className, compact=false }: { modality: DataModality; className?: string, compact?: boolean }) => {

  if (compact) {
    return (
      <CompactBadge modality={modality} animate={true} className="p-1 after:p-0" />
    )
  }
  return (
    <Badge
      variant={ModalityColors[modality].variant}
      color={ModalityColors[modality].color}
      size={'1'}
      className={cn('!relative !text-[8px] text-center justify-center items-center flex gap-1 flex-row oveflow-hidden !h-full !w-auto', className)}
    >
      <CompactBadge modality={modality} />
      {modality}
    </Badge>
  )
};

// sort schema based on item meta property
export const sortSchema = (
  schema: Schema,
  order = ['model', 'modalities', 'checkbox', 'switch', 'slider', 'select', 'readOnly', 'input', 'array', 'object']
) => {
  const item = extractFromMeta(schema, 'item');
  return sortObject(schema.fields, item, order);
};
