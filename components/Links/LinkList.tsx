export interface LinkListProps {
  links: string[];
  textMap?: Record<string, string>;
  prefix?: string;
  target?: string;
  rel?: string;
}

export const LinkList = (props: LinkListProps) => {
  const { links, textMap, prefix = '/', target="_blank", rel="noopener noreferrer" } = props;
  return (
    <div>
      {links.map((link, index) => (
        <a key={`${link}-${index}`} href={`${prefix}${link}`} className="text-lg font-bold block my-2" target={target} rel={rel}>
          {textMap && textMap[link] ? textMap[link] : link}
        </a>
      ))}
    </div>
  );
};
