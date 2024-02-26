import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';

export interface Props {
  imageUrl: string;
  icon?: boolean;
  // name: string;
  // tokenAddress: string;
  // amount: number;
}

const ERC20Card: FC<Props> = ({ imageUrl, icon = false }) => {
  return (
    <div className="group relative w-[272px] h-[300px] overflow-hidden border border-black rounded-3xl">
      <div
        id="badge"
        className="absolute left-[152px] top-[17px] w-[150px] h-[30px] bg-[#1dbba8] text-white text-center text-[18px] rotate-[38.86deg] py-auto pl-[12px] shadow-[0_3px_5px_1px_rgba(0,0,0,0.3)]"
      >
        ERC20
      </div>
      <img
        className={`z-20 flex justify-center items-center w-[272px] h-44 rounded-t-3xl object-cover ${
          icon && 'transition duration-300 ease-in-out group-hover:blur-sm'
        }`}
        src={imageUrl}
        alt="erc-20"
      />
      {icon && (
        <div className="absolute inset-0 w-[270px] h-44 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:flex">
          <Icon
            className="bg-blue-200 w-10 h-10 text-blue-800 text-base font-medium me-2 p-0.5 rounded opacity-90 cursor-pointer"
            icon="mynaui:edit-one"
          />
          <Icon
            className="bg-blue-200 w-10 h-10 text-blue-800 text-base font-medium me-2 p-0.5 rounded opacity-90 cursor-pointer"
            icon="heroicons:trash"
          />
        </div>
      )}
      <div className="z-10 absolute top-[164px] bg-gradient-to-t from-black via-black to-transparent w-full h-[20px]"></div>
      <div className="z-20 absolute top-[172px] left-0 bg-gradient-to-r from-slate-800 gray via-transparent to-transparent w-[20px] h-full"></div>
      <div className="z-20 absolute top-[172px] right-0 rounded-l-3xl bg-gradient-to-l from-slate-800 gray via-transparent to-transparent w-[20px] h-full"></div>
      <div className="absolute bottom-0 left-0 rounded-l-3xl bg-gradient-to-t from-slate-800 gray via-transparent to-transparent w-full h-[20px] rounded-b-[-24px]"></div>
      <div className="flex flex-col gap-1 px-4 pt-0 pb-2 text-white">
        <p className="z-20 text-lg font-medium mt-[-12px]">Copper</p>
        <div className="flex flex-col">
          <p className="text-sm text-light-gray">Amount</p>
          <p>2000</p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-light-gray">Adress</p>
          <div className="flex items-center gap-1">
            <Icon className="w-4 h-6" icon="logos:ethereum" />
            <Link className="underline text-base" to={'#'}>
              0x48C281DB38...85A235d8fc
            </Link>
            <Icon
              className="w-4 h-4 cursor-pointer"
              icon="solar:copy-outline"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ERC20Card;
