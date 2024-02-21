import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';

import Logo from '../../Logo';
import Button from '../../Button';
import LogoImage from '../../../assets/images/blueprint-logo.png';
import EthereumImage from '../../../assets/images/ethereum.png';
import AvatarImage from '../../../assets/images/avatar.png';

function Header() {
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);
  const [isListButtonClicked, setIsListButtonClicked] =
    useState<boolean>(false);

  return (
    <div className="flex px-6 py-3 bg-black h-14 items-center 2xl:px-24 xl:px-20 lg:px-16 lg:h-24 md:h-20 md:px-12 sm:h-16 sm:px-10">
      <div className="flex flex-grow justify-between items-center">
        <Logo
          className="w-24 h-9 sm:w-24 sm:h-10 md:w-32 md:h-12 lg:w-40 lg:h-14 cursor-pointer"
          url={LogoImage}
        />
        <div className="flex justify-between items-center gap-2 md:gap-4 lg:gap-6 xl:gap-16">
          <div className="hidden items-center text-light-gray text-base gap-2 xl:text-2xl lg:text-xl lg:gap-8 md:flex md:gap-4 md:text-lg sm:flex">
            <Link to={'#'}>Blueprint</Link>
            <Link to={'#'}>Product</Link>
            <Link to={'#'}>Decompose</Link>
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
                <Button
                  className="hidden truncate text-base lg:text-lg sm:text-sm sm:block"
                  variant="outline"
                  text="Connect Wallet"
                  onClick={() => setIsWalletConnected(true)}
                />
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
              className={`z-20 ${
                isListButtonClicked ? '' : 'hidden'
              } bg-black shadow w-full absolute top-14 right-0 text-light-gray`}
            >
              <ul
                className="p-4 text-base text-light-gray"
                aria-labelledby="dropdownInformationButton"
              >
                <li>
                  <Link
                    to={'#'}
                    className="block my-1 px-4 py-3 rounded text-white bg-secondary"
                  >
                    Blueprint
                  </Link>
                </li>
                <li>
                  <Link
                    to={'#'}
                    className="block my-1 px-4 py-3 rounded text-light-gray"
                  >
                    Product
                  </Link>
                </li>
                <li>
                  <Link
                    to={'#'}
                    className="block my-1 px-4 py-3 rounded text-light-gray"
                  >
                    Decompose
                  </Link>
                </li>
                <li>
                  <Link
                    to={'#'}
                    className="block my-1 px-4 py-3 rounded text-light-gray"
                  >
                    Whitepaper
                  </Link>
                </li>
              </ul>
              <hr className="mx-1" />
              <Link
                to={'#'}
                className="block m-4 px-4 py-3 rounded text-base text-light-gray"
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
