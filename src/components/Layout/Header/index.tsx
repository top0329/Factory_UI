import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Logo } from '../../Logo';
import { Button } from '../../Button';
import { Icon } from '@iconify/react/dist/iconify.js';

function Header() {
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);
  const [isListButtonClicked, setIsListButtonClicked] =
    useState<boolean>(false);

  return (
    <div className="flex px-7 py-3 bg-black h-14 sm:h-16 md:h-20 items-center object-contain">
      <div className="flex flex-grow justify-between items-center">
        <Logo
          className="w-28 h-9 sm:w-32 sm:h-10 md:w-40 md:h-12 lg:w-48 lg:h-14 cursor-pointer"
          url="/src/assets/images/blueprint-logo.png"
        />
        <div className="flex justify-between items-center gap-2 md:gap-6 lg:gap-16">
          <div className="hidden items-center gap-1 lg:gap-10 md:flex sm:flex md:gap-4">
            <Link
              to={'#'}
              className="text-light-gray text-sm md:text-base lg:text-lg"
            >
              Blueprint
            </Link>
            <Link
              to={'#'}
              className="text-light-gray text-sm md:text-base lg:text-lg"
            >
              Product
            </Link>
            <Link
              to={'#'}
              className="text-light-gray text-sm md:text-base lg:text-lg"
            >
              Decompose
            </Link>
            <Link
              to={'#'}
              className="text-light-gray text-sm md:text-base lg:text-lg"
            >
              Whitepaper
            </Link>
          </div>
          <div className="flex items-center">
            {isWalletConnected ? (
              <div className="flex gap-1 lg:gap-5 md:gap-3">
                <div className="hidden gap-0 items-center sm:flex">
                  <img
                    className="h-6 md:h-7 lg:h-10"
                    src="/src/assets/images/ethereum.png"
                    alt="avatar"
                  />
                  <Icon
                    icon="solar:alt-arrow-down-outline"
                    className="text-light-gray cursor-pointer w-4 h-4 lg:w-6 lg:h-6"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <img
                    className="h-6 md:h-7 lg:h-9 cursor-pointer"
                    src="/src/assets/images/avatar.png"
                    alt="avatar"
                  />
                  <p className="hidden text-white text-sm lg:text-lg md:text-base sm:block">
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
              className={`z-10 ${
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
