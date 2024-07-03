import { FC } from 'react';

export interface Props {
  blueprints: number;
  creators: number;
  mintedBlueprints: number;
  products: number;
}

const PlatformStatus: FC<Props> = ({
  blueprints,
  creators,
  mintedBlueprints,
  products,
}) => {
  return (
    <div
      className="relative z-20 grid grid-cols-2 px-4 py-12 bg-[#05090c] md:px-10 lg:px-14 xl:px-[86px] xl:py-16 2xl:py-20 md:flex md:justify-between 2xl:max-w-[1536px] 2xl:min-px-96 2xl:min-w-full"
      data-aos="fade-up"
      data-aos-offset="200"
      data-aos-delay="200"
      data-aos-duration="500"
      data-aos-easing="ease-in-out"
      data-aos-once="true"
    >
      <div className="col-span-1  py-4 px-4 xl:px-8 lg:px-6 md:flex md:flex-col md:justify-center md:gap-4">
        <p className="text-3xl mb-2 text-white text-center font-bold 2xl:text-7xl xl:text-6xl lg:text-5xl md:text-4xl md:mb-0 sm:text-5xl">
          {blueprints}
        </p>
        <p className="text-base text-light-gray text-center lg:text-xl md:text-lg">
          Blueprints
        </p>
      </div>
      <hr className="border border-light-gray h-28 my-auto hidden md:block" />
      <div className="col-span-1 gap-4 py-4 px-4 xl:px-8 lg:px-6 md:flex md:flex-col md:justify-center">
        <p className="text-3xl mb-2 text-white text-center font-bold 2xl:text-7xl xl:text-6xl lg:text-5xl md:text-4xl md:mb-0 sm:text-5xl">
          {creators}
        </p>
        <p className="text-base text-light-gray text-center lg:text-xl md:text-lg">
          Creators
        </p>
      </div>
      <hr className="border border-light-gray h-28 my-auto hidden md:block" />
      <div className="col-span-1 gap-4 py-4 px-4 xl:px-8 lg:px-6 md:flex md:flex-col md:justify-center">
        <p className="text-3xl mb-2 text-white text-center font-bold 2xl:text-7xl xl:text-6xl lg:text-5xl md:text-4xl md:mb-0 sm:text-5xl">
          {mintedBlueprints}
        </p>
        <p className="truncate text-sm text-light-gray text-center tracking-tighter lg:text-xl md:text-lg sm:tracking-normal">
          Minted Blueprints
        </p>
      </div>
      <hr className="border border-light-gray h-28 my-auto hidden md:block" />
      <div className="col-span-1 gap-4 py-4 px-4 xl:px-8 lg:px-6 md:flex md:flex-col md:justify-center">
        <p className="text-3xl mb-2 text-white text-center font-bold 2xl:text-7xl xl:text-6xl lg:text-5xl md:text-4xl md:mb-0 sm:text-5xl">
          {products}
        </p>
        <p className="text-base text-light-gray text-center lg:text-xl md:text-lg">
          Products
        </p>
      </div>
    </div>
  );
};

export default PlatformStatus;
