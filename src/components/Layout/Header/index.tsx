import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useAtom } from 'jotai';

import Logo from '../../Logo';
import Button from '../../Button';
import LogoImage from '../../../assets/images/blueprint-logo.png';
import useWeb3 from '../../../hooks/useWeb3';
import { WalletConnectButton } from '../../Button/WalletConnectButton';
import { headerActiveItemAtom } from '../../../jotai/atoms';

function Header() {
  const { isConnected } = useWeb3();

  const navigate = useNavigate();
  const location = useLocation();

  const [headerActiveItem, setHeaderActiveItem] =
    useAtom<number>(headerActiveItemAtom);

  const [isListButtonClicked, setIsListButtonClicked] =
    useState<boolean>(false);

  useEffect(() => {
    location.pathname.includes('blueprint') && setHeaderActiveItem(1);
    location.pathname.includes('my-blueprint') && setHeaderActiveItem(2);
    location.pathname.includes('product') && setHeaderActiveItem(3);
    location.pathname.includes('component') && setHeaderActiveItem(4);
    location.pathname === '/' && setHeaderActiveItem(0);
  }, [location.pathname, setHeaderActiveItem]);

  return (
    <div className="flex px-4 py-3 bg-[#05050a] h-14 items-center 2xl:max-w-[1536px] 2xl:min-px-96 2xl:min-w-full xl:px-20 lg:px-16 lg:h-24 md:h-20 md:px-12 sm:h-16 sm:px-10">
      <div className="flex flex-grow justify-between items-center">
        <Logo
          className="w-24 h-9 sm:w-24 sm:h-10 md:w-28 md:h-10 lg:w-36 lg:h-12 xl:h-14 xl:w-40 cursor-pointer"
          url={LogoImage}
          handleLogoClicked={() => {
            navigate('/');
          }}
        />
        <div className="flex justify-between items-center gap-2 md:gap-4 lg:gap-6">
          <div className="hidden items-center text-light-gray text-base gap-2 xl:text-2xl lg:text-xl lg:gap-4 md:flex md:gap-2">
            <button
              className={`${
                headerActiveItem === 1 ? 'text-white' : 'text-light-gray'
              }`}
              onClick={() => {
                navigate('/blueprint');
              }}
            >
              Blueprint
            </button>
            <button
              className={`truncate ${
                headerActiveItem === 2 ? 'text-white' : 'text-light-gray'
              }`}
              onClick={() => {
                navigate('/my-blueprint');
              }}
              hidden={!isConnected}
            >
              My Blueprint
            </button>
            <button
              className={`${
                headerActiveItem === 3 ? 'text-white' : 'text-light-gray'
              }`}
              onClick={() => {
                navigate('/product');
              }}
              hidden={!isConnected}
            >
              Product
            </button>
            <button
              className={`${
                headerActiveItem === 4 ? 'text-white' : 'text-light-gray'
              }`}
              onClick={() => {
                navigate('/component');
              }}
            >
              Component
            </button>
            <button
              className={`${
                headerActiveItem === 5 ? 'text-white' : 'text-light-gray'
              }`}
              onClick={() => {
                navigate('#');
                setHeaderActiveItem(5);
              }}
            >
              Whitepaper
            </button>
          </div>
          <div className="flex items-center">
            <div className="hidden md:block">
              <WalletConnectButton />
            </div>
            <Button
              className="border-none pr-0 py-0 block lg:hidden md:hidden z-30"
              text=""
              icon={<Icon icon="bi:list" width="32px" height="32px" />}
              variant="outline"
              onClick={() => setIsListButtonClicked(!isListButtonClicked)}
            />
            <div
              className={`z-30 ${
                isListButtonClicked ? 'translate-y-0' : 'translate-y-[-450px]'
              } bg-black shadow w-full absolute top-14 right-0 delay-400 duration-500 ease-in-out transition-all transform md:hidden`}
            >
              <ul
                className="p-4 text-base"
                aria-labelledby="dropdownInformationButton"
              >
                <li>
                  <button
                    className={`block my-1 px-4 py-3 text-left rounded ${
                      headerActiveItem === 1 ? 'text-white' : 'text-light-gray'
                    } w-full hover:bg-secondary`}
                    onClick={() => {
                      navigate('/blueprint');
                      setIsListButtonClicked(false);
                    }}
                  >
                    Blueprint
                  </button>
                </li>
                <li hidden={!isConnected}>
                  <button
                    className={`truncate block my-1 px-4 py-3 text-left rounded ${
                      headerActiveItem === 2 ? 'text-white' : 'text-light-gray'
                    } w-full hover:bg-secondary`}
                    onClick={() => {
                      navigate('/my-blueprint');
                      setIsListButtonClicked(false);
                    }}
                  >
                    My Blueprint
                  </button>
                </li>
                <li hidden={!isConnected}>
                  <button
                    className={`block my-1 px-4 py-3 text-left rounded ${
                      headerActiveItem === 3 ? 'text-white' : 'text-light-gray'
                    } w-full hover:bg-secondary`}
                    onClick={() => {
                      navigate('/product');
                      setIsListButtonClicked(false);
                    }}
                  >
                    Product
                  </button>
                </li>
                <li>
                  <button
                    className={`block my-1 px-4 py-3 text-left rounded ${
                      headerActiveItem === 4 ? 'text-white' : 'text-light-gray'
                    } w-full hover:bg-secondary`}
                    onClick={() => {
                      navigate('/component');
                      setIsListButtonClicked(false);
                    }}
                  >
                    Component
                  </button>
                </li>
                <li>
                  <button
                    className={`block my-1 px-4 py-3 text-left rounded ${
                      headerActiveItem === 5 ? 'text-white' : 'text-light-gray'
                    } w-full hover:bg-secondary`}
                    onClick={() => {
                      navigate('#');
                      setHeaderActiveItem(5);
                      setIsListButtonClicked(false);
                    }}
                  >
                    Whitepaper
                  </button>
                </li>
              </ul>
              <hr className="mx-4" />
              <div
                className="block mx-4 my-3 px-4 py-1.5 rounded text-base text-light-gray hover:bg-secondary"
                onClick={() => setIsListButtonClicked(false)}
              >
                <WalletConnectButton />
              </div>
            </div>
            <div
              className={`fixed right-0 bottom-0 top-0 left-0 flex items-center justify-center z-20 ${
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
