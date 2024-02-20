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
    <div className="grid grid-cols-2 px-4 py-12 bg-secondary md:px-6 lg:px-14 xl:px-[86px] xl:py-16 2xl:px-32 2xl:py-20 md:flex md:justify-between">
      <div className="col-span-1  py-4 px-4 xl:px-8 lg:px-6 md:flex md:flex-col md:justify-center md:gap-4">
        <p className="text-3xl mb-2 text-white text-center font-bold 2xl:text-7xl xl:text-6xl lg:text-5xl md:text-4xl md:mb-0">
          {blueprints}
        </p>
        <p className="text-base text-light-gray text-center lg:text-xl md:text-lg">
          Blueprints
        </p>
      </div>
      <hr className="border border-light-gray h-28 my-auto hidden md:block" />
      <div className="col-span-1 gap-4 py-4 px-4 xl:px-8 lg:px-6 md:flex md:flex-col md:justify-center">
        <p className="text-3xl mb-2 text-white text-center font-bold 2xl:text-7xl xl:text-6xl lg:text-5xl md:text-4xl md:mb-0">
          {creators}
        </p>
        <p className="text-base text-light-gray text-center lg:text-xl md:text-lg">
          Creators
        </p>
      </div>
      <hr className="border border-light-gray h-28 my-auto hidden md:block" />
      <div className="col-span-1 gap-4 py-4 px-4 xl:px-8 lg:px-6 md:flex md:flex-col md:justify-center">
        <p className="text-3xl mb-2 text-white text-center font-bold 2xl:text-7xl xl:text-6xl lg:text-5xl md:text-4xl md:mb-0">
          {mintedBlueprints}
        </p>
        <p className="truncate text-sm text-light-gray text-center tracking-tighter lg:text-xl md:text-lg sm:tracking-normal">
          Minted Blueprints
        </p>
      </div>
      <hr className="border border-light-gray h-28 my-auto hidden md:block" />
      <div className="col-span-1 gap-4 py-4 px-4 xl:px-8 lg:px-6 md:flex md:flex-col md:justify-center">
        <p className="text-3xl mb-2 text-white text-center font-bold 2xl:text-7xl xl:text-6xl lg:text-5xl md:text-4xl md:mb-0">
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
