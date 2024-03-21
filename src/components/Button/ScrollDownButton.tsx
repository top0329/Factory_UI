import { FC } from 'react';
import ArrowDownIcon from '../../assets/images/arrow-down.png';
import ArrowTopIcon from '../../assets/images/arrow-top.png';
import ScrollRoundImage from '../../assets/images/scroll-round.png';

export interface Props {
  className?: string;
  isScrollAtBottom?: boolean;
  onClick?: () => void;
}

const ScrollButton: FC<Props> = ({ className, isScrollAtBottom, onClick }) => {
  return (
    <button
      className={`fixed bottom-2 left-4 z-40 flex justify-center items-center bg-[#080808] w-16 h-16 lg:w-20 lg:h-20 rounded-full sm:left-[40px] md:left-[48px] lg:left-[64px] xl:left-[80px] 2xl:left-[96px] ${className}`}
      onClick={onClick}
    >
      <img
        className="absolute object-contain inset-0 p-1 w-16 h-16 lg:w-20 lg:h-20 lg:p-1.5 rotate"
        src={ScrollRoundImage}
        alt="scroll-round"
      />
      <img
        className="z-10 w-7 h-7 lg:w-8 lg:h-8 object-contain hover:animate-bounce"
        src={isScrollAtBottom ? ArrowTopIcon : ArrowDownIcon}
        alt="arrow-down"
      />
    </button>
  );
};

export default ScrollButton;
