import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

export interface Props {
  url: string;
  className?: string;
}

const Logo: FC<Props> = ({ url, className }) => {
  const navigate = useNavigate();

  return (
    <img
      className={`object-contain items-center ${className}`}
      alt="logo"
      src={url}
      onClick={() => navigate('/')}
    />
  );
};

export default Logo;