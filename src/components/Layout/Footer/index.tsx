import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';

import { WindowSize } from '../../../types';

function Footer() {
  const [hrWidth, setHrWidth] = useState('100%');
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

  useEffect(() => {
    function handleResize() {
      const vw = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      );
      // Calculate dynamic padding based on the viewport width
      const dynamicPadding = Math.max(132, (vw - 1536) / 2);
      // Set the width of the hr element
      setHrWidth(`calc(100vw - ${dynamicPadding * 2}px)`);
    }

    // Set width initially and whenever the window is resized
    handleResize();

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener when the component unmounts
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="px-4 py-7 bg-[#000000] h-[350px] object-contain relative 2xl:max-w-[1536px] 2xl:min-px-132 2xl:min-w-full xl:px-32 xl:h-44 sm:h-40 lg:px-28 md:px-16 sm:px-12">
      <div className="flex flex-col-reverse justify-between sm:flex-row">
        <div className="flex flex-col items-center px-2 sm:items-start">
          <div className="flex justify-start text-light-gray items-center gap-6 py-3 lg:gap-8 md:gap-3.5 sm:gap-2">
            <Icon
              icon="teenyicons:linkedin-outline"
              className="w-7 h-7 xl:w-8 xl:h-8 cursor-pointer"
            />
            <Icon
              icon="teenyicons:facebook-outline"
              className="w-7 h-7 xl:w-8 xl:h-8 cursor-pointer"
            />
            <Icon
              icon="pajamas:twitter"
              className="w-7 h-7 xl:w-8 xl:h-8 cursor-pointer"
            />
            <Icon
              icon="uit:youtube"
              className="w-10 h-10 xl:w-11 xl:h-11 cursor-pointer"
            />
            <Icon
              icon="ph:instagram-logo-light"
              className="w-9 h-9 xl:w-10 xl:h-10 cursor-pointer"
            />
          </div>
          <p className="text-white text-left text-sm py-4 md:text-base sm:py-6">
            Copyright&copy; {new Date().getFullYear()} Factory
          </p>
        </div>
        {windowSize.width !== undefined && windowSize.width >= 1536 ? (
          <hr
            style={{ width: hrWidth }}
            className={`absolute top-24 text-light-gray hidden 2xl:inset-x-auto 2xl:max-w-[1536px] sm:block sm:inset-x-12 md:inset-x-16 lg:inset-x-28 lg:border xl:inset-x-32`}
          />
        ) : (
          <hr
            className={`absolute top-24 text-light-gray hidden 2xl:inset-x-auto 2xl:max-w-[1536px] sm:block sm:inset-x-12 md:inset-x-16 lg:inset-x-28 lg:border xl:inset-x-32`}
          />
        )}
        <div className="flex flex-row items-start justify-between px-2 sm:items-end sm:flex-col sm:justify-start">
          <div className="flex flex-col gap-2 py-5 text-base font-bold text-light-gray xl:gap-10 xl:text-2xl lg:gap-8 lg:text-xl md:gap-3.5 md:text-lg sm:flex-row sm:font-normal">
            <Link to={'/blueprint'}>Blueprint</Link>
            <Link to={'/product'}>Product</Link>
            <Link to={'/decompose'}>Decompose</Link>
            <Link to={'#'}>Whitepaper</Link>
          </div>
          <div className="flex flex-col items-end gap-2 py-4 text-light-gray text-base font-bold xl:text-xl lg:text-lg sm:flex-row sm:item-start sm:font-normal sm:opacity-50 sm:text-white sm:gap-8">
            <Link to={'#'}>Contact</Link>
            <Link to={'#'}>Terms</Link>
            <Link to={'#'}>Privacy Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
