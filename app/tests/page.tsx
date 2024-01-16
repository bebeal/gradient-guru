
const TestPage = () => {
  const tests = ['auth', 'buttons', 'chat', 'fonts', 'form', 'fun', 'icon-sets', 'palettes', 'plotly', 'primitives', 'syntax-highlighter', 'terminal', 'tiptap', 'tldraw'];

  return (
    <div className="flex flex-col gap-2 w-full h-auto justify-center items-center p-4 overflow-auto">
      {tests.map((test) => (
        <div key={test}>
          <a href={`/tests/${test}`} rel="noopener noreferrer" target="_blank" className="text-lg font-bold">{test}</a>
        </div>
      ))}  
    </div>
  );
}
export default TestPage;