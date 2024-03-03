import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
// import { ConnectButton } from '@rainbow-me/rainbowkit';
import { WalletConnectButton } from '../../Button/WalletConnectButton';

import Logo from '../../Logo';
import Button from '../../Button';
import LogoImage from '../../../assets/images/blueprint-logo.png';
import EthereumImage from '../../../assets/images/ethereum.png';
import AvatarImage from '../../../assets/images/avatar.png';

function Header() {
  const [isWalletConnected] = useState<boolean>(false);
  const [isListButtonClicked, setIsListButtonClicked] =
    useState<boolean>(false);

  return (
    <div className="flex px-4 py-3 bg-[#05050a] h-14 items-center 2xl:max-w-[1536px] 2xl:px-[calc((100vw-1536px)/2)] 2xl:min-w-full xl:px-20 lg:px-16 lg:h-24 md:h-20 md:px-12 sm:h-16 sm:px-10">
      <div className="flex flex-grow justify-between items-center">
        <Logo
          className="w-24 h-9 sm:w-24 sm:h-10 md:w-32 md:h-12 lg:w-40 lg:h-14 cursor-pointer"
          url={LogoImage}
        />
        <div className="flex justify-between items-center gap-2 md:gap-4 lg:gap-6 xl:gap-16">
          <div className="hidden items-center text-light-gray text-base gap-2 xl:text-2xl lg:text-xl lg:gap-8 md:flex md:gap-4 md:text-lg sm:flex">
            <Link to={'/blueprint'}>Blueprint</Link>
            <Link to={'/product'}>Product</Link>
            <Link to={'/decompose'}>Decompose</Link>
            <Link to={'#'}>Whitepaper</Link>
          </div>
          <div className="flex items-center">
            {isWalletConnected ? (
              <div className="flex gap-1 xl:gap-5 lg:gap-3">
                <div className="hidden gap-0 items-center sm:flex">
                  <img
                    className="h-6 xl:h-10 lg:h-8 md:h-7"
                    src={EthereumImage}
                    alt="avatar"
                  />
                  <Icon
                    icon="solar:alt-arrow-down-outline"
                    className="text-light-gray cursor-pointer w-4 h-4 lg:w-6 lg:h-6"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <img
                    className="h-6 xl:h-10 lg:h-8 md:h-7 cursor-pointer"
                    src={AvatarImage}
                    alt="avatar"
                  />
                  <p className="hidden text-white xl:text-lg lg:block">
                    0x456c...8ca9
                  </p>
                </div>
              </div>
            ) : (
              <React.Fragment>
                <WalletConnectButton />
              </React.Fragment>
            )}
            <Button
              className="border-none pr-0 py-0 block lg:hidden sm:hidden"
              text=""
              icon={<Icon icon="bi:list" width="32px" height="32px" />}
              variant="outline"
              onClick={() => setIsListButtonClicked(!isListButtonClicked)}
            />
            <div
              className={`z-30 ${
                isListButtonClicked ? 'translate-y-0' : 'translate-y-[-400px]'
              } bg-black shadow w-full absolute top-14 right-0 text-light-gray delay-400 duration-500 ease-in-out transition-all transform`}
            >
              <ul
                className="p-4 text-base text-light-gray"
                aria-labelledby="dropdownInformationButton"
              >
                <li>
                  <Link
                    to={'/blueprint'}
                    className="block my-1 px-4 py-3 rounded text-white bg-secondary"
                    onClick={() => setIsListButtonClicked(false)}
                  >
                    Blueprint
                  </Link>
                </li>
                <li>
                  <Link
                    to={'/product'}
                    className="block my-1 px-4 py-3 rounded text-light-gray"
                    onClick={() => setIsListButtonClicked(false)}
                  >
                    Product
                  </Link>
                </li>
                <li>
                  <Link
                    to={'/decompose'}
                    className="block my-1 px-4 py-3 rounded text-light-gray"
                    onClick={() => setIsListButtonClicked(false)}
                  >
                    Decompose
                  </Link>
                </li>
                <li>
                  <Link
                    to={'#'}
                    className="block my-1 px-4 py-3 rounded text-light-gray"
                    onClick={() => setIsListButtonClicked(false)}
                  >
                    Whitepaper
                  </Link>
                </li>
              </ul>
              <hr className="mx-4" />
              <Link
                to={'#'}
                className="block m-4 px-4 py-3 rounded text-base text-light-gray"
                onClick={() => setIsListButtonClicked(false)}
              >
                Connect Wallet
              </Link>
            </div>
            <div
              className={`fixed right-0 bottom-0 top-0 left-0 flex items-center justify-center z-10 ${
                !isListButtonClicked && 'hidden'
              }`}
              onClick={() => setIsListButtonClicked(false)}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
