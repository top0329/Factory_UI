import { FC } from 'react';

import DataNotFoundSvg from '../../assets/svg/data-not-found.svg';
import './LoadingSpinner.css';

interface NoDataFoundProps {
  message: string;
}

const NoDataFound: FC<NoDataFoundProps> = ({ message }) => (
  <div className="flex flex-col justify-center items-center">
    <img src={DataNotFoundSvg} alt="box" className="w-40 h-40" />
    <p className="text-center text-light-gray text-xl">{message}</p>
  </div>
);

export default NoDataFound;
