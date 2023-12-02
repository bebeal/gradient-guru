'use client'
const FontsPage = () => {
  const tailwindFonts = [
    "font-mono",
    "font-argon",
    "font-krypton",
    "font-neon",
    "font-radon",
    "font-xenon",
  ];

  return (
    <div className="flex flex-col items-center w-full h-full overflow-auto bg-gray-300">
      <h1 className="text-2xl font-bold justify-self-start">Fonts</h1>
      <div className="flex flex-wrap justify-center w-full gap-10 h-full p-2">
        {tailwindFonts.map((font) => (
          <div key={font} className="flex flex-col items-center justify-center p-1">
            <div className={`p-1 w-auto h-auto ${font}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</div>
            <div className={`p-1 w-auto h-auto ${font} font-bold`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</div>
            <div className={`p-1 w-auto h-auto ${font} italic`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</div>
            <div className={`p-1 w-auto h-auto ${font} font-bold italic`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</div>
            <p className="text-sm font-bold">{font}</p>
          </div>
        ))}
      </div>
    </div>
  )
};
export default FontsPage;
