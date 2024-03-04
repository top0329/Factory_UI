// import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Link, useNavigate } from 'react-router-dom';

// import { WindowSize } from '../../types';
import Button from '../../components/Button';
// import MintBlueprintModal from '../../components/Modals/MintBlueprintModal';
import BatteringRam from '../../assets/images/development/battering-ram-erc1155.png';

const MintBlueprintPage = () => {
  const naviage = useNavigate();

  // const [windowSize, setWindowSize] = useState<WindowSize>({
  //   width: undefined,
  //   height: undefined,
  // });

  // useEffect(() => {
  //   // Handler to call on window resize
  //   function handleResize() {
  //     // Set window width/height to state
  //     setWindowSize({
  //       width: window.innerWidth,
  //       height: window.innerHeight,
  //     });
  //   }

  //   // Add event listener
  //   window.addEventListener('resize', handleResize);

  //   // Call handler right away so state gets updated with initial window size
  //   handleResize();

  //   // Remove event listener on cleanup
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []); // Empty array ensures that effect is only run on mount and unmount

  return (
    <div className="flex justify-center items-center py-10 text-white sm:py-20">
      <div className="relative rounded-3xl bg-default w-full pb-10 sm:w-[700px] sm:bg-[#060606]">
        <header className="flex justify-start items-center pl-4 py-4 text-xl sm:text-3xl sm:justify-center">
          Blueprint Mint
        </header>
        <img
          className="w-full h-60 sm:h-96"
          src={BatteringRam}
          alt="blueprint"
        />
        <div className="z-10 absolute top-[188px] bg-gradient-to-t from-landing via-transparent to-transparent w-full h-28 sm:top-[349px]"></div>
        <div className="flex flex-col gap-4 sm:px-8">
          <h1 className="z-20 font-semibold text-lg mt-[-36px] pl-4 sm:text-xl">
            Battering Ram
          </h1>
          <div className="flex flex-col gap-3 px-2">
            <div className="grid grid-cols-2 gap-3 font-mono">
              <p className="col-span-1 text-light-gray">Blueprint ID</p>
              <p className="col-span-1">45</p>
            </div>
            <div className="flex flex-col justify-between items-start gap-2 font-mono sm:flex-row sm:items-center">
              <p className="text-light-gray">Creator</p>
              <div className="flex items-center gap-1">
                <Icon className="w-6 h-6 sm:w-4 sm:h-5" icon="logos:ethereum" />
                <Link className="underline text-base break-all" to={'#'}>
                  0x48C281DB38eAD8050bBd821d195FaE85A235d8fc
                </Link>
                <Icon
                  className="w-6 h-6 cursor-pointer sm:w-4 sm:h-4"
                  icon="solar:copy-outline"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 items-center gap-3 font-mono">
              <p className="col-span-1 text-light-gray">
                Blueprint Mint Amount
              </p>
              <input
                id="blueprint-mint-amount"
                name="blueprint-mint-amount"
                className="inline w-full rounded-lg border border-light-gray text-white text-lg bg-black py-1.5 px-2 leading-5 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                type="number"
                defaultValue={100000}
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-3 font-mono">
              <p className="col-span-1 text-light-gray">
                Blueprint Creation Fee
              </p>
              <p className="col-span-1">0.1 ETH</p>
            </div>
            <div className="grid grid-cols-2 items-center gap-3 font-mono">
              <p className="col-span-1 text-light-gray">Blueprint Mint Price</p>
              <p className="col-span-1">1 USDT</p>
            </div>
            <div className="grid grid-cols-2 items-center gap-3 font-mono">
              <p className="col-span-1 text-light-gray">Total Mint fee</p>
              <p className="col-span-1">0.1 ETH + 100000 * 1 USDT</p>
            </div>
            <div className="flex justify-center items-center gap-4 pt-0 sm:gap-28 sm:pt-8">
              <Button
                className="flex justify-center !w-32"
                text="Cancel"
                variant="secondary"
                onClick={() => naviage('/blueprint')}
              />
              <Button
                className="truncate"
                text="Mint Blueprint"
                variant="primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MintBlueprintPage;
