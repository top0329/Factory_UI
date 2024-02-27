import { FC } from 'react';
import ArrowDownIcon from '../../assets/images/arrow-down.png';
import ScrollRoundImage from '../../assets/images/scroll-round.png';

export interface Props {
  className?: string;
  onClick?: () => void;
}

const ScrollButton: FC<Props> = ({ className, onClick }) => {
  return (
    <button
      className={`flex justify-center items-center bg-[#080808] w-20 h-20 rounded-full relative ${className}`}
      onClick={onClick}
    >
      <img
        className="absolute inset-0 p-1.5 w-20 h-20 rotate"
        src={ScrollRoundImage}
        alt="scroll-round"
      />
      <img
        className="z-10 w-8 h-8 hover:animate-bounce"
        src={ArrowDownIcon}
        alt="arrow-down"
      />
    </button>
  );
};

export default ScrollButton;
