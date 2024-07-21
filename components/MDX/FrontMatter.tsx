import { isEmptyObject } from '@/utils';

export const FrontMatter = ({ frontMatter }: any) => {
  return (
    !isEmptyObject(frontMatter) && (
      <div className="flex flex-col">
        <hr className="my-4" />
        {Object.keys(frontMatter!).map((key) => (
          <div key={key} className="text-muted text-sm">
            {key}: {frontMatter[key].toString()}
          </div>
        ))}
        <hr className="my-4" />
      </div>
    )
  );
};
