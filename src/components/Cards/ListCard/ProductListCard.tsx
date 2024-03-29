import { Icon } from '@iconify/react/dist/iconify.js';
import copy from 'copy-to-clipboard';
import { useState } from 'react';

export interface Props {
  uri: string;
  type: string;
  name: string;
  address: string;
  id: number;
  balance: number;
}

export default function ProductListCard(props: Props) {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopyButtonClicked = () => {
    try {
      setIsCopied(true);
      copy(props.address);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.log('failed to copy', err);
    }
  };
  return (
    <div className="flex justify-between w-full h-[80px] gap-6 items-center md:px-[40px] sm:px-[20px] px-4 py-2 mb-2 border  rounded-3xl text-white text-base bg-[#858584]/10 border-gray-500">
      <div id="icon" className="flex justify-center py-2">
        <img
          src={props.uri}
          className="block sm:w-[64px] w-[52px] sm:h-[64px] h-[52px] rounded-full"
        />
      </div>

      <div
        id="type"
        className="hidden sm:block text-white justify-center  items-center w-[15%] md:text-[24px] text-[16px] text-xl"
      >
        {props.type}
      </div>

      <div
        id="name"
        className="flex flex-col justify-center sm:w-[12%] w-[30%]"
      >
        <p className="text-[#858584] text-xs">Name</p>
        <p className="text-[#BABABA] truncate">{props.name}</p>
      </div>

      <div
        id="address"
        className="hidden md:block flex-col justify-center w-[25%]"
      >
        <p className="text-[#858584] text-xs">Address</p>
        <div className="flex gap-2">
          <p className="text-white truncate">
            {props.address.substring(0, 8)} . . . {props.address.slice(-6)}
          </p>
          <div className="relative">
            <button>
              <Icon
                onClick={handleCopyButtonClicked}
                icon="solar:copy-outline"
                className={`text-[#BABABA] item-center my-auto`}
                // className="item-center my-auto"
              />
            </button>
            {isCopied && (
              <div
                className="absolute right-0 -top-8 px-4 py-2 bg-gray-700 text-white text-xs rounded-lg transition-opacity opacity-100"
                style={{ transition: 'opacity 0.3s' }}
              >
                Copied!
              </div>
            )}
          </div>
        </div>
      </div>

      <div id="id" className="flex flex-col justify-center w-[5%]">
        <p className="text-[#858584] text-xs">Id</p>
        <p>{props.id}</p>
      </div>

      <div id="amount" className="w-[15%] justify-end items-end">
        <p className="text-[#858584] text-xs items-end">Balance</p>
        <p>{props.balance}</p>
      </div>
    </div>
  );
}
