import { LinkList } from "@/components";

// Generate links to all other test pages from here
const TestsPage = () => {
  // TODO: dynamically fetch this? then just provide a way to filter it for easy control
  const title = 'Tests';
  const pages: string[] = ['assets', 'auth', 'buttons', 'devtools', 'fun', 'google-drive', 'icon-sets', 'mdx', 'primitives', 'radix-themed-components', 'styled-components', 'tailwindcss', 'terminal', 'tiptap', 'tweet'];

  return (
    <div className="flex flex-col gap-2 w-full h-auto justify-center items-center p-4 overflow-auto">
      <div className="text-2xl font-bold text-center underline">{title}</div>
      <LinkList links={pages} prefix="/tests/" />
    </div>
  );
};

export default TestsPage;
