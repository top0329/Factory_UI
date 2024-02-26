import { Icon } from '@iconify/react/dist/iconify.js';
import ScrollButton from '../../components/Button/ScrollDownButton';
import FAQ from '../../components/FAQ';
import PlatformStatus from '../../components/PlatformStatus';
import PlatformUsage from '../../components/PlatformUsage';
import Union from '../../assets/images/Union.png';

const LandingPage = () => {
  return (
    <div className="text-white bg-landing overflow-hidden relative">
      <img
        className="absolute z-10 top-[-520px] rotate-[-30deg]"
        src={Union}
        alt="union"
      />
      <img
        className="absolute z-10 top-[900px] left-[400px] rotate-[-30deg]"
        src={Union}
        alt="union"
      />
      <div className="px-6 2xl:px-24 xl:px-20 lg:px-16 md:px-12 sm:px-10">
        <div className="grid grid-cols-12 pt-8">
          <div className="col-span-6">
            <h1 className="font-bold text-[66px]">
              Get Unique NFTs <br />
              For Your Business
            </h1>
            <h2 className="text-[32px] pt-4">
              The Easiest Way To Create Your <br />
              Own Tokens ...
            </h2>
            <div className="flex justify-start items-center gap-1 border-b-2 w-96 pt-28 ml-4">
              <Icon className="w-6 h-6" icon="ion:search-outline" />
              <input
                className="w-full bg-transparent px-2 py-2 outline-none"
                type="text"
                placeholder="Search for Blueprint ID, Name and Creator"
              />
            </div>
            <ScrollButton className="mt-20 ml-4" />
          </div>
          <div className="col-span-6"></div>
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
