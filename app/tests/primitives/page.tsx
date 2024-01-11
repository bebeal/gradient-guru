'use client'

const PrimitivesPage = () => {
  const primitives = ['accordion', 'checkbox', 'radix-themed-components', 'side-panel', 'slider', 'switch', 'menubar'];

  return (
    <div className="flex flex-col gap-2 w-full h-full justify-center items-center p-4">
      {primitives.map((primitive) => (
        <div key={primitive}>
          <a href={`/tests/primitives/${primitive}`} className="text-lg font-bold">{primitive}</a>
        </div>
      ))}  
    </div>
  );
};

export default PrimitivesPage;
