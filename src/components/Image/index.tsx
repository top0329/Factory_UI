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
  const [isError, setIsError] = useState<boolean>(false);

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
        onError={() => {
          setIsError(true);
          setIsImageLoading(false);
        }}
      />
      {isError && (
        <div className={`bg-[#202020] animate-pulse ${spinnerClassName}`}></div>
      )}
    </React.Fragment>
  );
};

export default Image;
