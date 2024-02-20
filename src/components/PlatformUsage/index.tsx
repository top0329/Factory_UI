import { FC } from 'react';

import ImageForPlatformUsage from '../../assets/images/image-for-platform-usage.png';

const PlatformUsage: FC = () => {
  return (
    <div className="px-32 py-12 bg-landing">
      <h1 className="text-light-gray text-3xl mb-14">
        For <span className="text-white">NFT</span> people, By{' '}
        <span className="text-white">NFT</span> people
      </h1>
      <div className="grid grid-cols-2 border border-light-gray rounded-3xl shadow-lg shadow-secondary">
        <div className="col-span-1 py-2">
          <div className="flex p-8">
            <hr className="border border-cyan h-16 w-0 my-auto ml-4 block" />
            <p className="pl-10 text-white text-3xl">
              Enhancing Asset Value Stability and Reusablility using NFT&nbsp;
              <span className="text-cyan">Synthesis</span>
            </p>
          </div>
          <div className="flex p-8">
            <hr className="border border-yellow h-16 w-0 my-auto ml-4 block" />
            <p className="pl-10 text-white text-3xl">
              Gamified Advertising Platform by creating&nbsp;
              <span className="text-yellow">Unique</span>&nbsp;NFTs for gaming
              aseets
            </p>
          </div>
          <div className="flex p-8">
            <hr className="border border-cyan h-16 w-0 my-auto ml-4 block" />
            <p className="pl-10 text-white text-3xl">
              Enhancing Asset Value Stability and Reusablility using NFT&nbsp;
              <span className="text-cyan">Synthesis</span>
            </p>
          </div>
        </div>
        <div className="relative col-span-1 w-full h-full">
          <img
            className="w-full h-full rounded-r-3xl object-cover"
            src={ImageForPlatformUsage}
            alt="image-for-platform-usage"
          />
        </div>
      </div>
    </div>
  );
};

export default PlatformUsage;
