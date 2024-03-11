import { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import copy from 'copy-to-clipboard';

import { ListCardInterface } from '../../../types';

export default function ListCard(props: ListCardInterface) {
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
    <div
      className={`flex w-full h-[80px] justify-between items-center md:px-[40px] px-[20px] py-2 mb-2 border  rounded-3xl text-white text-base ${
        props.type == 0
          ? 'bg-[#09F5D8]/10 border-[#09F5D8]'
          : props.type == 1
          ? 'bg-[#099EF5]/10 border-[#099EF5]'
          : 'bg-[#7414D5]/10 border-[#7414D5]'
      }`}
    >
      <div id="icon" className="flex justify-center py-2">
        <img src={props.uri} className="block w-[64px] h-[64px] rounded-full" />
      </div>

      <div
        id="type"
        className="hidden md:flex text-white justify-center items-center w-[15%]  text-xl"
      >
        {props.type == 0 && <p>ERC20</p>}
        {props.type == 1 && <p>ERC721</p>}
        {props.type == 2 && <p>ERC1155</p>}
        {props.type == 3 && <p>Blueprint</p>}
        {props.type == 4 && <p>Product</p>}
      </div>

      <div id="name" className="flex flex-col justify-center w-[12%]">
        <p className="text-[#858584] text-xs">Name</p>
        <p>{props.name}</p>
      </div>

      <div id="address" className="hidden md:block flex-col justify-center">
        <p className="text-[#858584] text-xs">Address</p>
        <div className="flex gap-2">
          <p className="truncate">
            {props.address.substring(0, 8)} . . . {props.address.slice(-6)}
          </p>
          <div className="relative">
            <button>
              <Icon
                onClick={handleCopyButtonClicked}
                icon="solar:copy-outline"
                className="item-center my-auto"
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
      <div id="id" className=" w-[3%]">
        {(props.type !== 0 && props.type !== 3) && (
          <div>
            <p className="text-[#858584] text-xs">ID</p>
            <p className="">{props.id}</p>
          </div>
        )}
      </div>

      <div id="amount" className="w-[6%]">
        {props.type != 1 && (
          <div>
            <p className="text-[#858584] text-xs">Amount</p>
            <p className="text-center">{props.amount}</p>
          </div>
        )}
      </div>
      {!props.isDecompose && (
        <div id="approve" className="">
          <button className="bg-[#000000] rounded-xl text-xl h-[35px] w-[99px] border border-[#2E2E2E]">
            Approve
          </button>
        </div>
      )}
    </div>
  );
}
