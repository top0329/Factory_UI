import { useState } from 'react';
import { ethers } from 'ethers';
import { erc20Abi, erc721Abi } from 'viem';
import { Icon } from '@iconify/react/dist/iconify.js';
import copy from 'copy-to-clipboard';
import useWeb3 from '../../../hooks/useWeb3';

import erc1155Abi from '../../../abi/ERC1155ABI.json';
import { ListCardInterface } from '../../../types';
import { defaultRPC } from '../../../constants';

export default function ListCard(props: ListCardInterface) {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const { factoryContract, blueprintContract } = useWeb3();

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

  const handleApprove = async () => {
    alert('Approve');
    const provider = new ethers.JsonRpcProvider(defaultRPC);
    const erc20Contract = new ethers.Contract(
      props.address,
      erc20Abi,
      provider
    );

    const erc721Contract = new ethers.Contract(
      props.address,
      erc721Abi,
      provider
    );

    const erc1155Contract = new ethers.Contract(
      props.address,
      erc1155Abi,
      provider
    );

    if (props.type == 1) {
      await erc20Contract.approve(
        await factoryContract.getAddress(),
        props.amount
      );
    } else if (props.type == 2) {
      await erc721Contract.setApprovalForAll(
        await factoryContract.getAddress(),
        true
      );
    } else if (props.type == 3) {
      await erc1155Contract.setApprovalForAll(
        await factoryContract.getAddress(),
        true
      );
    } else if (props.type == 4) {
      await blueprintContract.setApprovalForAll(
        await factoryContract.getAddress(),
        true
      );
    } else {
      console.log('Invalid Component');
    }
  };

  return (
    <div
      className={`flex justify-between w-full h-[80px] gap-6 items-center md:px-[40px] sm:px-[20px] ${
        props.isDecompose ? 'px-4' : 'px-[4px]'
      }  py-2 mb-2 border  rounded-3xl text-white text-base ${
        props.type == 0
          ? 'bg-[#09F5D8]/10 border-[#09F5D8]'
          : props.type == 1
          ? 'bg-[#099EF5]/10 border-[#099EF5]'
          : props.type == 2
          ? 'bg-[#7414D5]/10 border-[#7414D5]'
          : props.type == 3
          ? 'bg-[#858584]/20 border-black'
          : 'bg-[#858584]/10 border-gray-500'
      }`}
    >
      <div id="icon" className="flex justify-center py-2">
        <img
          src={props.uri}
          className="block sm:w-[64px] w-[52px] sm:h-[64px] h-[52px] rounded-full"
        />
      </div>

      <div
        className="hidden sm:block text-white justify-center  items-center w-[15%] md:text-[24px] text-[16px] text-xl"
        id="type"
      >
        {props.type == 0 && <p>ERC20</p>}
        {props.type == 1 && <p>ERC721</p>}
        {props.type == 2 && <p>ERC1155</p>}
        {props.type == 3 && <p>Blueprint</p>}
        {props.type == 4 && <p>Product</p>}
      </div>

      <div
        id="name"
        className={`${
          props.isDecompose ? '' : 'xs:block'
        } flex flex-col justify-center sm:w-[12%] w-[30%]`}
      >
        <p className="text-[#858584] text-xs">Name</p>
        <p
          className={`${props.isDecompose ? 'text-[#BABABA]' : ''} ${
            props.type == 4 ? '!text-white' : ''
          } truncate`}
        >
          {props.name}
        </p>
      </div>

      <div
        id="address"
        className="hidden md:block flex-col justify-center w-[25%]"
      >
        <p className="text-[#858584] text-xs">Address</p>
        <div className="flex gap-2">
          <p
            className={`${props.isDecompose ? 'text-[#BABABA]' : ''} truncate ${
              props.type == 4 ? '!text-white' : ''
            }`}
          >
            {props.address.substring(0, 8)} . . . {props.address.slice(-6)}
          </p>
          <div className="relative">
            <button>
              <Icon
                onClick={handleCopyButtonClicked}
                icon="solar:copy-outline"
                className={`${
                  props.isDecompose ? 'text-[#BABABA]' : ''
                } item-center my-auto`}
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
      <div id="id" className="w-[3%] ">
        {props.type !== 0 && props.type !== 3 && (
          <div>
            <p className="text-[#858584] text-xs">ID</p>
            <p
              className={`${props.isDecompose ? 'text-[#BABABA]' : ''} ${
                props.type == 4 ? '!text-white' : ''
              }`}
            >
              {props.id}
            </p>
          </div>
        )}
      </div>

      <div id="amount" className="truncate sm:w-auto ">
        {props.type != 1 && (
          <div>
            <p className="text-[#858584] text-xs">
              {props.type == 4 ? 'Balance' : 'Amount'}
            </p>
            <p className="text-center">{props.amount}</p>
          </div>
        )}
      </div>
      {!props.isDecompose && (
        <div id="approve" className="xs:w-auto w-[20%]">
          <button
            onClick={handleApprove}
            className="bg-[#000000] rounded-xl md:text-xl text-[14px] md:h-[35px] h-[30px] px-2 sm:w-[99px] border border-[#2E2E2E]"
          >
            Approve
          </button>
        </div>
      )}
    </div>
  );
}
