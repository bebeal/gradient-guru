export interface LinkListProps {
  links: string[];
  prefix?: string;
}

export const LinkList = (props: LinkListProps) => {
  const { links, prefix = '/' } = props;
  return links.map((link, index) => (
    <div key={link}>
      <a href={`${prefix}${link}`} key={`link-${index}`} target="_blank" rel="noopener noreferrer" className="text-lg font-bold">
        {link}
      </a>
    </div>
  ));
};
