import React, { FunctionComponent, useState } from 'react';

export interface Props {
  src: string;
  className?: string;
  spinnerClassName?: string;
  alt?: string;
}

export const Image: FunctionComponent<Props> = ({ src, className, spinnerClassName, alt }) => {
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

  return (
    <React.Fragment>
      {isImageLoading && (
        <div className={`bg-[#202020] animate-pulse ${spinnerClassName}`}></div>
      )}
      <img
        src={src}
        className={`${className} ${isImageLoading ? 'hidden' : 'block'}`}
        alt={alt}
        onLoad={() => {
          setIsImageLoading(false);
        }}
      />
    </React.Fragment>
  );
};
