import { FC } from 'react';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export const Image: FC<ImageProps> = (props: ImageProps) => {
  return <img {...props} />;
};
