import { cn } from '@/utils/utils';
import { TextSelection } from '@tiptap/pm/state';

// Table Of Contents extension

export const TOCItem = ({ item, onItemClick }: any) => {
  const style: any = {
    '--level': item.level,
    paddingLeft: `calc(1rem * (var(--level) - 1))`,
  };
  return (
    <div className={`toc--item toc--item--level_${item.level}`} style={style}>
      <a
        className={cn('block p-1', item.isScrolledOver && !item.isActive ? 'text-secondary' : 'text-primary no-underline', item.isActive ? `bg-[rgba(0, 0, 0, .05)]` : `bg-transparent`, `rounded-sm`)}
        href={`#${item.id}`}
        onClick={(e) => onItemClick(e, item.id)}
      >
        {item.itemIndex}. {item.textContent}
      </a>
    </div>
  );
};

export const TOCEmptyState = () => {
  return (
    <div className="text-gray-600 select-none">
      <p>Start editing your document to see the outline.</p>
    </div>
  );
};

export const TOC = ({ items = [], editor }: any) => {
  if (items.length === 0) {
    return <></>;
    // return <TOCEmptyState />
  }

  const onItemClick = (e: any, id: any) => {
    e.preventDefault();

    if (editor) {
      const element = editor.view.dom.querySelector(`[data-toc-id="${id}"`);
      const pos = editor.view.posAtDOM(element, 0);

      // set focus
      const tr = editor.view.state.tr;

      tr.setSelection(new TextSelection(tr.doc.resolve(pos)));

      editor.view.dispatch(tr);

      editor.view.focus();

      if (history.pushState) {
        // eslint-disable-line
        history.pushState(null, '', `#${id}`); // eslint-disable-line
      }

      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="flex bg-secondary p-4 rounded-sm z-10 shadow-md w-80 max-h-[50vh] overflow-auto">
      <div className="flex flex-col gap-1">
        {items.map((item: any, i: number) => (
          <TOCItem onItemClick={onItemClick} key={item.id} item={item} index={i + 1} />
        ))}
      </div>
    </div>
  );
};
