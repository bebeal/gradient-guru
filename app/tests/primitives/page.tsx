'use client'

const PrimitivesPage = () => {
  const primitives = ['accordion', 'checkbox', 'dropdown', 'flip-card', 'kbd', 'menubar', 'progress', 'radix-themed-components', 'side-panel', 'slider', 'switch', 'textarea', 'tooltip'];

  return (
    <div className="flex flex-col gap-2 w-full h-auto justify-center items-center p-4 overflow-auto">
      {primitives.map((primitive) => (
        <div key={primitive}>
          <a href={`/tests/primitives/${primitive}`} rel="noopener noreferrer" target="_blank" className="text-lg font-bold">{primitive}</a>
        </div>
      ))}  
    </div>
  );
};

export default PrimitivesPage;
