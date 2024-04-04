import { FC } from 'react';

export * from './ComponentMapper';

export interface ComponentMap {
  [key: string]: FC<any>;
}

export interface ComponentMapperProps {
  title?: string;
  components: ComponentMap;
}

export const ComponentMapper: FC<ComponentMapperProps> = (props) => {
  const { title = '', components = {} } = props;

  return (
    <div className="flex flex-col w-auto h-auto justify-center items-center gap-1 p-2 overflow-auto bg-primary">
      <div className="text-2xl font-bold text-center underline">{title}</div>
      <div className="flex flex-col gap-10 w-full h-full justify-center items-center p-10">
        {Object.keys(components).map((key) => {
          const Component: FC<any> = components[key];
          return (
            <div key={key} className="flex flex-col rounded items-center justify-center w-full h-full overflow-auto bg-primary text-primary gap-2 border border-primary p-2">
              <div className="flex flex-col items-center justify-center w-full h-auto gap-1 text-sm">
                <h1 className="text-md font-bold text-center">{key}</h1>
                <Component />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
