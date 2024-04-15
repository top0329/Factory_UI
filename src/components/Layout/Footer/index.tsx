import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useAtom } from 'jotai';

import { WindowSize } from '../../../types';
import { headerActiveItemAtom } from '../../../jotai/atoms';
import useWeb3 from '../../../hooks/useWeb3';

function Footer() {
  const { isConnected } = useWeb3();

  const navigate = useNavigate();
  const location = useLocation();

  const [headerActiveItem, setHeaderActiveItem] =
    useAtom<number>(headerActiveItemAtom);

  const [hrWidth, setHrWidth] = useState('100%');
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    location.pathname.includes('blueprint') && setHeaderActiveItem(1);
    location.pathname.includes('my-blueprint') && setHeaderActiveItem(2);
    location.pathname.includes('product') && setHeaderActiveItem(3);
    location.pathname.includes('component') && setHeaderActiveItem(4);
    location.pathname === '/' && setHeaderActiveItem(0);
  }, [location.pathname, setHeaderActiveItem]);

  useEffect(() => {
    function handleResize() {
      const vw = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      );
      const dynamicPadding = Math.max(132, (vw - 1536) / 2);
      setHrWidth(`calc(100vw - ${dynamicPadding * 2}px)`);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="px-4 py-7 bg-[#000000] h-[350px] object-contain relative 2xl:max-w-[1536px] 2xl:min-px-132 2xl:min-w-full xl:px-32 xl:h-44 md:h-40 lg:px-28 md:px-16 sm:px-12">
      <div className="flex flex-col-reverse justify-between md:flex-row">
        <div className="flex flex-col items-center px-2 md:items-start">
          <div className="flex justify-start text-light-gray items-center gap-6 py-3 lg:gap-4 md:gap-3">
            <a href="mailto:factorycenter1155@gmail.com">
              <Icon
                icon="cib:gmail"
                className="w-7 h-7 xl:w-8 xl:h-8 cursor-pointer hover:text-[#f74141] transition-colors duration-300"
              />
            </a>
            <a href="https://discord.gg/GRtC66Zd" target="_blank">
              <Icon
                icon="simple-icons:discord"
                className="w-7 h-7 xl:w-8 xl:h-8 cursor-pointer hover:text-[#5865f2] transition-colors duration-300"
              />
            </a>
            {/* <a href="#" target="_blank">
              <Icon
                icon="teenyicons:linkedin-outline"
                className="w-7 h-7 xl:w-8 xl:h-8 cursor-pointer hover:text-[#0077B5] transition-colors duration-300"
              />
            </a> */}
            <a href="#" target="_blank">
              <Icon
                icon="teenyicons:facebook-outline"
                className="w-7 h-7 xl:w-8 xl:h-8 cursor-pointer hover:text-[#1877F2] transition-colors duration-300"
              />
            </a>
            <a href="https://twitter.com/Factory1155" target="_blank">
              <Icon
                icon="pajamas:twitter"
                className="w-7 h-7 xl:w-8 xl:h-8 cursor-pointer hover:text-[#1DA1F2] transition-colors duration-300"
              />
            </a>
            <a href="#" target="_blank">
              <Icon
                icon="uit:youtube"
                className="w-10 h-10 xl:w-11 xl:h-11 cursor-pointer hover:text-[#CD201F] transition-colors duration-300"
              />
            </a>
            {/* <a href='#' target="_blank">
              <Icon
                icon="teenyicons:instagram-outline"
                className="w-7 h-7 xl:w-8 xl:h-8 cursor-pointer"
              />
            </a> */}
          </div>
          <p className="text-white text-left text-sm py-4 md:text-base sm:py-6">
            Copyright&copy; {new Date().getFullYear()} Factory
          </p>
        </div>
        {windowSize.width !== undefined && windowSize.width >= 1536 ? (
          <hr
            style={{ width: hrWidth }}
            className={`absolute top-24 text-light-gray hidden 2xl:inset-x-auto 2xl:max-w-[1536px] md:block md:inset-x-16 lg:inset-x-28 lg:border xl:inset-x-32`}
          />
        ) : (
          <hr
            className={`absolute top-24 text-light-gray hidden 2xl:inset-x-auto 2xl:max-w-[1536px] md:block md:inset-x-16 lg:inset-x-28 lg:border xl:inset-x-32`}
          />
        )}
        <div className="flex flex-row items-start justify-between px-2 md:items-end md:flex-col md:justify-start">
          <div
            className={`flex flex-col ${
              isConnected ? 'gap-2' : 'gap-4'
            } py-5 text-base font-bold xl:gap-6 xl:text-2xl lg:gap-4 lg:text-xl lg:font-normal md:gap-2 md:text-base md:flex-row md:font-medium`}
          >
            <button
              className={`text-left ${
                headerActiveItem === 1 ? 'text-white' : 'text-light-gray'
              } cursor-pointer`}
              onClick={() => {
                navigate('/blueprint');
              }}
            >
              Blueprint
            </button>
            <button
              className={`truncate text-left ${
                headerActiveItem === 2 ? 'text-white' : 'text-light-gray'
              } cursor-pointer`}
              onClick={() => {
                navigate('/my-blueprint');
              }}
              hidden={!isConnected}
            >
              My Blueprint
            </button>
            <button
              className={`text-left ${
                headerActiveItem === 3 ? 'text-white' : 'text-light-gray'
              } cursor-pointer`}
              onClick={() => {
                navigate('/product');
              }}
              hidden={!isConnected}
            >
              Product
            </button>
            <button
              className={`text-left ${
                headerActiveItem === 4 ? 'text-white' : 'text-light-gray'
              } cursor-pointer`}
              onClick={() => {
                navigate('/component');
              }}
            >
              Component
            </button>
            <button
              className={`text-left ${
                headerActiveItem === 5 ? 'text-white' : 'text-light-gray'
              } cursor-pointer`}
              onClick={() => {
                navigate('#');
                setHeaderActiveItem(5);
              }}
            >
              Whitepaper
            </button>
          </div>
          <div className="flex flex-col items-end gap-4 py-4 text-light-gray text-base font-bold xl:text-xl lg:text-lg md:flex-row md:item-start md:font-normal md:opacity-50 md:text-white md:gap-8">
            <button
              className={`${
                headerActiveItem === 6 ? 'text-white' : 'text-light-gray'
              } cursor-pointer`}
              onClick={() => {
                navigate('contact-us');
                setHeaderActiveItem(6);
              }}
            >
              Contact
            </button>
            <button
              className={`${
                headerActiveItem === 7 ? 'text-white' : 'text-light-gray'
              } cursor-pointer`}
              onClick={() => {
                navigate('#');
                setHeaderActiveItem(7);
              }}
            >
              Terms
            </button>
            <button
              className={`${
                headerActiveItem === 8 ? 'text-white' : 'text-light-gray'
              } cursor-pointer`}
              onClick={() => {
                navigate('#');
                setHeaderActiveItem(8);
              }}
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
