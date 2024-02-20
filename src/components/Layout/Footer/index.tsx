import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';

function getCurrentYear() {
  return new Date().getFullYear();
}

function Footer() {
  return (
    <div className="px-6 py-7 bg-black h-[350px] object-contain relative xl:px-32 xl:h-44 sm:h-40 lg:px-28 md:px-16 sm:px-12">
      <div className="flex flex-col-reverse justify-between sm:flex-row">
        <div className="flex flex-col items-center px-2 sm:items-start">
          <div className="flex justify-start text-light-gray items-center gap-6 py-3 lg:gap-8 md:gap-3.5 sm:gap-2">
            <Icon
              icon="teenyicons:linkedin-outline"
              className="w-7 h-7 xl:w-8 xl:h-8"
            />
            <Icon
              icon="teenyicons:facebook-outline"
              className="w-7 h-7 xl:w-8 xl:h-8"
            />
            <Icon icon="pajamas:twitter" className="w-7 h-7 xl:w-8 xl:h-8" />
            <Icon icon="uit:youtube" className="w-10 h-10 xl:w-11 xl:h-11" />
            <Icon
              icon="ph:instagram-logo-light"
              className="w-9 h-9 xl:w-10 xl:h-10"
            />
          </div>
          <p className="text-white text-left text-sm py-4 md:text-base sm:py-6">
            Copyright&copy; {getCurrentYear()} Factory
          </p>
        </div>
        <hr className="absolute top-24 text-light-gray hidden sm:block sm:inset-x-12 md:inset-x-16 lg:inset-x-28 lg:border xl:inset-x-32" />
        <div className="flex flex-row items-start justify-between px-2 sm:items-end sm:flex-col sm:justify-start">
          <div className="flex flex-col gap-2 py-4 text-base font-bold text-light-gray xl:gap-10 xl:text-2xl lg:gap-8 lg:text-xl md:gap-3.5 md:text-lg sm:flex-row sm:font-medium">
            <Link to={'#'}>Blueprint</Link>
            <Link to={'#'}>Product</Link>
            <Link to={'#'}>Decompose</Link>
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
