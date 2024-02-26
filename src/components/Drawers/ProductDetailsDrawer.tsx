import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';

import Button from '../Button';
import ERC20Card from '../Cards/ComponentCard/ERC20Card';
import ERC721Card from '../Cards/ComponentCard/ERC721Card';
import ERC1155Card from '../Cards/ComponentCard/ERC1155Card';
// import IronSheild from '../../assets/images/development/Shield_iron_ERC1155.webp';
import Wood from '../../assets/images/development/wood_ERC20.webp';
import Copper from '../../assets/images/development/copper_ERC20.webp';
import Iron from '../../assets/images/development/iron_ERC20.webp';
import Key from '../../assets/images/development/key_ERC721.webp';
import Axe from '../../assets/images/development/axe_iron_wood_ERC1155.webp';
// import WoodSheild from '../../assets/images/development/Shield_wood_ERC1155.webp';
// import Picaxe from '../../assets/images/development/pickaxe_iron_wood_ERC1155.webp';
import Door from '../../assets/images/development/door.png';
import { WindowSize } from '../../types';

export interface Props {
  isDrawerOpen?: boolean;
  setIsDrawerOpen?: (isOpen: boolean) => void;
}

export interface Props {
  isDrawerOpen?: boolean;
  setIsDrawerOpen?: (isOpen: boolean) => void;
}

const ProductDetailsDrawer: FC<Props> = ({ isDrawerOpen, setIsDrawerOpen }) => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  const handleTabClick = (id: number) => {
    setActiveTab(id);
  };

  const sideDrawerClosedHandler = () => {
    if (setIsDrawerOpen) {
      setIsDrawerOpen(false);
    }

    // Unsets Background Scrolling to use when SideDrawer/Modal is closed
    document.body.style.overflow = 'unset';
  };

  return (
    <main
      className={
        'fixed overflow-hidden z-20 bg-black bg-opacity-50 inset-0 transform ease-in-out ' +
        (isDrawerOpen
          ? 'transition-opacity opacity-100 duration-500 translate-x-0'
          : 'transition-all delay-500 opacity-0 translate-x-full')
      }
    >
      <section
        className={
          'w-screen max-w-2xl right-0 absolute bg-drawer h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform ' +
          (isDrawerOpen ? 'translate-x-0' : 'translate-x-full')
        }
      >
        <article className="relative w-screen max-w-2xl flex flex-col overflow-y-auto h-full overflow-x-hidden">
          <Icon
            className="absolute bg-gray-300 text-gray-800 text-xs font-medium rounded-full p-1 m-2 h-8 w-8 cursor-pointer hover:opacity-50"
            icon="flowbite:close-outline"
            onClick={sideDrawerClosedHandler}
          />
          <div
            id="badge"
            className="absolute right-[-35px] top-[26px] w-[175.5px] h-[30px] bg-[#faff17] text-black text-center text-[18px] font-semibold rotate-[41.38deg] py-auto px-[35px] shadow-[0_3px_5px_1px_rgba(0,0,0,0.3)]"
          >
            Product
          </div>
          <img
            className="min-h-[235px] object-cover md:min-h-[435px]"
            src={Door}
            alt="drawer"
          />
          <p className="z-30 absolute top-[192px] left-4 text-white text-2xl font-semibold me-2 px-2.5 py-0.5 rounded opacity-90 md:top-[392px]">
            Iron Sheild
          </p>
          <div className="z-10 absolute top-[124px] bg-gradient-to-t from-landing via-transparent to-transparent w-full h-28 md:top-[324px]"></div>
          <div className="bg-[#011018] py-6 px-8 h-80 md:h-h-[172px]">
            <div className="flex flex-col-reverse justify-between items-center gap-4 md:flex-row md:justify-beteen">
              <div className="flex justify-start w-full gap-8">
                <div className="flex flex-col items-start text-white gap-2">
                  <p className="text-light-gray text-sm">Blueprint ID</p>
                  <p>492</p>
                </div>
                <div className="flex flex-col items-start text-white gap-2">
                  <p className="text-light-gray text-sm">Balance</p>
                  <p>10000</p>
                </div>
              </div>
              <div className="flex justify-end w-full gap-8 mb-2 md:gap-3">
                <Button
                  className="truncate text-base !py-1 !px-2"
                  text="Decompose"
                  variant="outline"
                  icon={<Icon className="w-6 h-6" icon="ri:exchange-line" />}
                />
              </div>
            </div>
            <div className="flex justify-start items-start mt-5 md:justify-between">
              <div className="flex flex-col items-start text-white gap-2">
                <p className="text-light-gray text-sm">Creator</p>
                <div className="flex items-center gap-1">
                  <Icon className="w-4 h-6" icon="logos:ethereum" />
                  <Link className="underline text-base" to={'#'}>
                    {windowSize.width !== undefined && windowSize.width > 768
                      ? '0x48C281DB38eAD8050bBd821d195FaE85A235d8fc'
                      : '0x48C281DB38...85A235d8fc'}
                  </Link>
                  <Icon
                    className="w-4 h-4 cursor-pointer"
                    icon="solar:copy-outline"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between h-16 bg-black border-t-2 border-gray-700 pt-2">
              <button
                className={`flex justify-center items-center gap-2 font-medium w-1/3 mx-2 ${
                  activeTab === 1
                    ? 'border-b-2 border-light-gray text-white'
                    : 'text-light-gray'
                }`}
                onClick={() => handleTabClick(1)}
              >
                ERC20
                <p
                  className={`${
                    activeTab === 1
                      ? 'bg-light-gray text-white'
                      : 'bg-secondary text-light-gray'
                  } font-medium me-2 px-2.5 rounded-xl opacity-90`}
                >
                  3
                </p>
              </button>
              <button
                className={`flex justify-center items-center gap-2 font-medium w-1/3 mx-2 ${
                  activeTab === 2
                    ? 'border-b-2 border-light-gray text-white'
                    : 'text-light-gray'
                }`}
                onClick={() => handleTabClick(2)}
              >
                ERC721
                <p
                  className={`${
                    activeTab === 2
                      ? 'bg-light-gray text-white'
                      : 'bg-secondary text-light-gray'
                  } font-medium me-2 px-2.5 rounded-xl opacity-90`}
                >
                  1
                </p>
              </button>
              <button
                className={`flex justify-center items-center gap-2 font-medium w-1/3 mx-2 ${
                  activeTab === 3
                    ? 'border-b-2 border-light-gray text-white'
                    : 'text-light-gray'
                }`}
                onClick={() => handleTabClick(3)}
              >
                ERC1155
                <p
                  className={`${
                    activeTab === 3
                      ? 'bg-light-gray text-white'
                      : 'bg-secondary text-light-gray'
                  } font-medium me-2 px-2.5 rounded-xl opacity-90`}
                >
                  1
                </p>
              </button>
            </div>
          </div>
          <div className="px-12 py-10 h-auto">
            {activeTab === 1 && (
              <div className="grid grid-cols-1 gap-4 place-items-center md:grid-cols-2 md:gap-2 md:gap-y-4">
                <ERC20Card imageUrl={Copper} />
                <ERC20Card imageUrl={Iron} />
                <ERC20Card imageUrl={Wood} />
              </div>
            )}
            {activeTab === 2 && (
              <div className="grid grid-cols-1 gap-4 place-items-center md:grid-cols-2 md:gap-2 md:gap-y-4">
                <ERC721Card imageUrl={Key} />
              </div>
            )}
            {activeTab === 3 && (
              <div className="grid grid-cols-1 gap-4 place-items-center md:grid-cols-2 md:gap-2 md:gap-y-4">
                <ERC1155Card imageUrl={Axe} />
                {/* <ERC1155Card imageUrl={Picaxe} /> */}
                {/* <ERC1155Card imageUrl={IronSheild} />
                <ERC1155Card imageUrl={WoodSheild} /> */}
              </div>
            )}
          </div>
        </article>
      </section>
      <section
        className="w-screen h-full cursor-pointer"
        onClick={sideDrawerClosedHandler}
      ></section>
    </main>
  );
};

export default ProductDetailsDrawer;
