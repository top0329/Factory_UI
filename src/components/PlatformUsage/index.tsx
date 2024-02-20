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
        <div className="col-span-1">
          <div className="">
            <hr className="border border- h-full my-auto" />
          </div>
        </div>
        <div className="col-span-1">
          <img
            className="rounded-r-3xl"
            src={ImageForPlatformUsage}
            alt="image-for-platform-usage"
          />
        </div>
      </div>
    </div>
  );
};

export default PlatformUsage;
