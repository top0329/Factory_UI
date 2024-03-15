import { FC } from 'react';

export interface Props {
  url: string;
  className?: string;
  handleLogoClicked?: () => void;
}

const Logo: FC<Props> = ({ url, className, handleLogoClicked }) => {
  return (
    <img
      className={`object-fill items-center ${className}`}
      alt="logo"
      src={url}
      onClick={handleLogoClicked}
    />
  );
};

export default Logo;
