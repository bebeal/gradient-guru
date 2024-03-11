export interface LinkListProps {
  links: string[];
  prefix?: string;
}

export const LinkList = (props: LinkListProps) => {
  const { links, prefix = '/' } = props;
  return (
    <div>
      {links.map((link, index) => (
        <a
          key={link}
          href={`${prefix}${link}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-bold block my-2"
        >
          {link}
        </a>
      ))}
    </div>
  );
};
