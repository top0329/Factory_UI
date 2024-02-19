import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';

function getCurrentYear() {
  return new Date().getFullYear();
}

function Footer() {
  return (
    <div className="px-32 py-7 bg-black h-44 object-contain">
      <div className="flex justify-between items-center px-3">
        <div className="flex justify-start items-center gap-10">
          <Icon
            icon="teenyicons:linkedin-outline"
            width="32px"
            height="32px"
            className="text-light-gray"
          />
          <Icon
            icon="teenyicons:facebook-outline"
            width="32px"
            height="32px"
            className="text-light-gray"
          />
          <Icon
            icon="pajamas:twitter"
            width="32px"
            height="32px"
            className="text-light-gray"
          />
          <Icon
            icon="uit:youtube"
            width="42px"
            height="42px"
            className="text-light-gray"
          />
          <Icon
            icon="ph:instagram-logo-light"
            width="38px"
            height="36px"
            className="text-light-gray"
          />
        </div>
        <div className="flex gap-10">
          <Link to={'#'} className="text-light-gray text-2xl">
            Blueprint
          </Link>
          <Link to={'#'} className="text-light-gray text-2xl">
            Product
          </Link>
          <Link to={'#'} className="text-light-gray text-2xl">
            Decompose
          </Link>
          <Link to={'#'} className="text-light-gray text-2xl">
            Whitepaper
          </Link>
        </div>
      </div>
      <hr className="text-light-gray my-4 border hidden sm:block" />
      <div className="flex justify-between items-center text-white px-5">
        <p>Copyright&copy; {getCurrentYear()} Factory</p>
        <div className="flex gap-8">
          <Link to={'#'} className="text-white text-xl opacity-50">
            Contact
          </Link>
          <Link to={'#'} className="text-white text-xl opacity-50">
            Terms
          </Link>
          <Link to={'#'} className="text-white text-xl opacity-50">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
