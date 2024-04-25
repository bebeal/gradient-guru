// assets page to show various ways you can import and use svgs, images.
// This will strictly be from client side (bundled and optimized by webpack)
import { FC } from 'react';
import mountains from '@/assets/images/mountains.jpg';
import PNGTest from '@/assets/images/panda-adversarial.png';
import { Image } from '@/components/Primitives/Image';

// 3 common ways to use pngs:
// 1. direct import -> react component
// 1. wrapped in <img> -> react component
// 2. wrapped in <NextImage> -> react component
const PNG_wrapped_in_img = () => {
  return <img src={PNGTest} alt="panda" width={200} height={200} />;
};
const PNG_wrapped_in_next_image = () => {
  return <Image src={PNGTest} alt="panda" width={200} height={200} />;
};

// Hint to test these, throttle the network speed to slow 3G in devtools
const Image_With_Shimmer_Placeholder = () => {
  return (
    <div className="flex flex-col w-full h-full gap-2 justify-center items-center">
      <h1>Image Component With Shimmer Data URL Placeholder</h1>
      <Image
        src={mountains}
        alt="Mountains w/ Shimmer Placeholder"
        // placeholder={getShimmerPlaceholder(700, 475)}
        loading="lazy"
        width={700}
        height={475}
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
    </div>
  );
};

const Image_With_Blur_Placeholder = () => {
  return (
    <div className="flex flex-col w-full h-full gap-2 justify-center items-center">
      <h1>Image Component With Blur Placeholder</h1>
      <Image
        alt="Mountains w/ Blur Placeholder"
        src={mountains}
        // placeholder="blur"
        loading="lazy"
        // quality={100}
        width={700}
        height={475}
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
    </div>
  );
};

const AssetsToRender: Record<string, FC> = {
  Image_With_Shimmer_Placeholder,
  Image_With_Blur_Placeholder,
  PNG_wrapped_in_img,
  PNG_wrapped_in_next_image,
};

const AssetsPage = () => {
  const title = 'Assets';
  return (
    <div className="flex flex-col w-auto h-auto justify-center items-center gap-1 p-2 overflow-auto bg-primary">
      <div className="text-2xl font-bold text-center underline">{title}</div>
      <div className="flex flex-col gap-10 w-full h-full justify-center items-center p-10">
        {Object.keys(AssetsToRender).map((key: any) => {
          const Component: any = AssetsToRender[key];
          return (
            <div key={key} className="flex flex-col rounded items-center justify-center w-full h-full overflow-auto bg-primary text-primary gap-2 border border-primary p-2">
              <div className="flex flex-col items-center justify-center w-full h-auto gap-1 text-sm">
                <h1 className="text-md font-bold text-center">{key.replace(/_/g, ' ')}</h1>
                <div className="border border-black dark:border-white rounded w-auto h-full overflow-auto p-2">
                  <Component />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AssetsPage;
