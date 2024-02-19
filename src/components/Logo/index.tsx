import { FC } from 'react';
import LogoImage from '../../assets/images/blueprint-logo.png';

console.log(LogoImage);
export interface Props {
  url: string;
  className?: string;
}

export const Logo: FC<Props> = ({ url, className }) => {
  return (
    <img
      className={`object-contain items-center ${className}`}
      alt="logo"
      src={url}
    />
  );
};
