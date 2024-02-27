import { Icon } from '@iconify/react/dist/iconify.js';

import ScrollButton from '../../components/Button/ScrollDownButton';
import FAQ from '../../components/FAQ';
import PlatformStatus from '../../components/PlatformStatus';
import PlatformUsage from '../../components/PlatformUsage';
import Union from '../../assets/images/Union.png';
import CardFront from '../../assets/images/card-front.png';
import SmallBlueprintCardImage from '../../assets/images/small-blueprint-card.png';

const LandingPage = () => {
  return (
    <div className="text-white bg-landing overflow-hidden relative">
      <img
        className="absolute w-[1000px] z-10 top-[-220px] rotate-[-30deg] overflow-hidden"
        src={Union}
        alt="union"
      />
      <img
        className="absolute w-[1000px] z-10 top-[900px] left-[400px] rotate-[-30deg]"
        src={Union}
        alt="union"
      />
      <div className="px-6 2xl:px-24 xl:px-20 lg:px-16 md:px-12 sm:px-10">
        <div className="grid grid-cols-12 pt-2 md:pt-4 lg:pt-8">
          <div className="col-span-12 md:col-span-6">
            <h1 className="mt-4 font-bold text-[30px] leading-[40px] xl:text-[66px] xl:leading-[80px] lg:text-[50px] lg:mt-10 md:text-[38px] md:mt-4 sm:text-[40px] sm:leading-[60px]">
              Get Unique NFTs <br />
              For Your Business
            </h1>
            <h2 className="text-xl pt-4 leading-[30px] xl:text-[32px] xl:leading-[50px] lg:text-[28px] sm:text-2xl sm:leading-[40px]">
              The Easiest Way To Create Your <br />
              Own Tokens ...
            </h2>
            <div className="flex justify-start items-center gap-1 border-b-2 w-auto pt-8 mx-0 md:w-96 lg:pt-16 sm:pt-14 sm:mx-4">
              <Icon className="w-6 h-6" icon="ion:search-outline" />
              <input
                className="z-20 w-full bg-transparent px-0 py-2 outline-none text-sm sm:text-lg sm:px-2"
                type="text"
                placeholder="Search for Blueprint ID, Name and Creator"
              />
            </div>
          </div>
          <div className="col-span-12 md:col-span-6">
            <div className="relative">
              <div className="flex flex-row-reverse justify-center mt-20 ml-0 items-center z-30 rounded-3xl px-1 top-[170px] right-[116px] xl:mt-20 md:mt-10 md:ml-32">
                <img
                  className="mt-[100px] max-w-[120px] max-h-[250px] rotate-[35deg] lg:max-w-[170px] lg:max-h-[320px] lg:mt-[120px] sm:max-w-[150px] sm:max-h-[280px]"
                  src={SmallBlueprintCardImage}
                  alt="card-front"
                />
                <img
                  className="max-w-[200px] max-h-[350px] rotate-[-24deg] lg:max-w-[250px] lg:max-h-[460px] sm:max-w-[230px] sm:max-h-[400px]"
                  src={CardFront}
                  alt="card-front"
                />
              </div>
            </div>
          </div>
          <ScrollButton className="z-20 !mt-[-60px] mb-4 ml-1 sm:ml-4 sm:w-20 sm:h-20" />
        </div>
      </div>
      <p className="mt-10">This is landing page!</p>
      <PlatformStatus
        blueprints={112}
        creators={91}
        mintedBlueprints={68}
        products={55}
      />
      <PlatformUsage />
      <FAQ />
    </div>
  );
};

export default LandingPage;
