import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';

function Footer() {
  return (
    <div className="px-4 py-7 bg-[#000000] h-[350px] object-contain relative 2xl:max-w-[1536px] 2xl:px-[calc((100vw-1536px)/2)] 2xl:min-w-full xl:px-32 xl:h-44 sm:h-40 lg:px-28 md:px-16 sm:px-12">
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
        <hr className="absolute top-24 text-light-gray hidden 2xl:inset-x-auto 2xl:w-[1520px] sm:block sm:inset-x-12 md:inset-x-16 lg:inset-x-28 lg:border xl:inset-x-32" />
        <div className="flex flex-row items-start justify-between px-2 sm:items-end sm:flex-col sm:justify-start">
          <div className="flex flex-col gap-2 py-4 text-base font-bold text-light-gray xl:gap-10 xl:text-2xl lg:gap-8 lg:text-xl md:gap-3.5 md:text-lg sm:flex-row sm:font-normal">
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
