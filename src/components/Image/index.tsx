import React, { FunctionComponent, useState } from 'react';

interface Props {
  src: string;
  className?: string;
  spinnerClassName?: string;
  alt?: string;
}

const Image: FunctionComponent<Props> = ({
  src,
  className,
  spinnerClassName,
  alt,
}) => {
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

  return (
    <React.Fragment>
      {isImageLoading && (
        <div className={`bg-[#202020] animate-pulse ${spinnerClassName}`}></div>
      )}
      <img
        src={src}
        className={`${className} ${isImageLoading ? 'hidden' : 'block'}`}
        onLoad={() => {
          setIsImageLoading(false);
        }}
        onError={() => {
          setIsImageLoading(true);
        }}
        alt={alt}
      />
    </React.Fragment>
  );
};

export default Image;
