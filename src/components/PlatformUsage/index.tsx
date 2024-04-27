import { FC } from 'react';

import ImageForPlatformUsage from '../../assets/images/image-for-platform-usage.png';
import Image from '../Image';

const PlatformUsage: FC = () => {
  return (
    <div className="relative z-20 px-6 pb-28 pt-20 mt-2 shadow-light-gray sm:px-10 sm:py-30 sm:mt-4 md:px-15 md:py-8 md:mt-6 lg:px-20 lg:py-12 lg:mt-8 2xl:max-w-[1536px] 2xl:min-px-96 2xl:min-w-full">
      <h1 className="text-light-gray font-bold text-xl mb-10 sm:mb-14 sm:text-2xl md:mb-12 md:text-3xl lg:mb-12 lg:text-4xl">
        For <span className="text-white">Game Asset</span> people,
        <br className="inline-block md:hidden" /> By{' '}
        <span className="text-white">Game Asset</span> people
      </h1>
      <div className="grid grid-cols-12 border border-[#16e3e34d] rounded-3xl shadow-lg shadow-secondary bg-[#09080e]">
        <div className="col-span-12 px-3 py-10 gap-4 flex flex-col justify-center items-start md:col-span-6 lg:col-span-7 lg:gap-8 lg:px-10">
          <div className="flex justify-center items-center">
            <hr className="border border-cyan h-[72px] w-0 my-auto ml-3 block" />
            <p className="pl-3 text-white text-lg md:text-xl lg:text-2xl">
              Enhancing Asset Value Stability and Reusablility using Game Asset &nbsp;
              <span className="text-cyan">Synthesis</span>
            </p>
          </div>
          <div className="flex justify-center items-center">
            <hr className="border border-yellow h-[72px] w-0 my-auto ml-3 block" />
            <p className="pl-3 text-white text-lg md:text-xl lg:text-2xl">
              Gamified Advertising Platform by creating &nbsp;
              <span className="text-yellow">Unique </span>&nbsp; NFTs for gaming
              aseets
            </p>
          </div>
          <div className="flex justify-center items-center">
            <hr className="border border-purple h-[72px] w-0 my-auto ml-3 block" />
            <p className="pl-3 text-white text-lg md:text-xl lg:text-2xl">
              Improving&nbsp;<span className="text-purple">Liquidity</span>
              &nbsp;by expanding the ways Game Assets can circulate, manage and trade
            </p>
          </div>
        </div>
        <div className="relative col-span-12 h-full rounded-3xl md:col-span-6 lg:col-span-5">
          <div className="absolute w-2/5 h-full bg-gradient-to-r from-landing via-transparent to-transparent rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none"></div>
          <Image
            className="w-full h-full object-cover rounded-b-3xl md:rounded-r-3xl"
            src={ImageForPlatformUsage}
            spinnerClassName="w-full h-full"
            alt="image-for-platform-usage"
          />
        </div>
      </div>
    </div>
  );
};

export default PlatformUsage;
