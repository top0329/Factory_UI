import { useState } from 'react';
import copy from 'copy-to-clipboard';
import Web3 from 'web3';
import { Icon } from '@iconify/react/dist/iconify.js';
import { ethers } from 'ethers';
import { Address } from 'viem';

import useWeb3 from '../../../hooks/useWeb3';
import useSpinner from '../../../hooks/useSpinner';
import useToast from '../../../hooks/useToast';
import getTokenData from '../../../utils/getTokenData';
import { factoryAddress } from '../../../constants';

export interface Props {
  name?: string;
  uri?: string;
  address?: string;
  amount?: number;
  productAmount?: number;
  setApprovedCount?: any;
  0?: string;
  1?: number;
}

export function ERC20MintListCard(props: Props) {
  const { isConnected, library, erc20Approve } = useWeb3();
  const { openSpin, closeSpin } = useSpinner();
  const { showToast } = useToast();

  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isApproved, setIsApproved] = useState<boolean>();

  const handleCopyButtonClicked = () => {
    if (props.address) {
      copy(props.address);
      setIsCopied(true);
    }
  };

  const handleApprove = async () => {
    const web3 = new Web3(window.ethereum);
    try {
      if (isConnected && library) {
        const tokenData = await getTokenData(props.address as Address);
        if (tokenData) {
          if (props.amount) {
            let receipt = null;
            while (receipt === null || receipt.status === undefined) {
              const res = erc20Approve(
                props.address as Address,
                factoryAddress,
                ethers
                  .parseUnits(
                    (Number(props.amount) * Number(props.productAmount)).toString(),
                    tokenData.decimal
                  )
                  .toString()
              );
              openSpin('Approving...');
              receipt = await web3.eth.getTransactionReceipt(
                (
                  await res
                ).transactionHash
              );
              if (receipt && receipt.status !== undefined) {
                if (receipt.status) {
                  showToast('success', 'Approve Success!');
                  setIsApproved(true);
                  props.setApprovedCount((current: number) => current + 1);
                  closeSpin();
                } else {
                  showToast('fail', 'Approve failed!');
                  setIsApproved(false);
                  closeSpin();
                }
              } else {
                alert('Transaction is still pending');
                await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before checking again
              }
            }
          } else {
            showToast('fail', 'Amount is required');
          }
        } else {
          showToast('fail', 'Token not found');
        }
      }
    } catch (err: any) {
      showToast('fail', 'User Rejected');
      console.log(err);
    } finally {
      closeSpin();
    }
  };

  return (
    <div className="flex justify-between w-full h-[80px] gap-6 items-center md:px-[40px] sm:px-[20px] px-[4px] py-2 mb-2 border rounded-3xl text-white text-base bg-[#09F5D8]/10 border-[#09F5D8]">
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
        ERC20
      </div>
      <div
        id="name"
        className="xs:block flex flex-col justify-center sm:w-[12%] w-[30%]"
      >
        <p className="text-[#858584] text-xs">Name</p>
        <p className="truncate">{props.name}</p>
      </div>
      <div
        id="address"
        className="hidden md:block flex-col justify-center w-[25%]"
      >
        <p className="text-[#858584] text-xs">Address</p>
        <div className="flex gap-2">
          <p className=" truncate">
            {props.address && props.address.substring(0, 8)} . . .{' '}
            {props.address && props.address.slice(-6)}
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
      <div id="id" className="w-[3%]"></div>
      <div id="amount" className="truncate sm:w-auto">
        <div>
          <p className="text-[#858584] text-xs">Amount</p>
          <p className="text-center">
            {Number(props.amount) * Number(props.productAmount)}
          </p>
        </div>
      </div>
      <div id="approve" className="xs:w-auto w-[20%]">
        <button
          onClick={handleApprove}
          disabled={isApproved}
          className={`${
            isApproved ? 'bg-gray-900' : 'bg-[#000000]'
          } rounded-xl md:text-xl text-[14px] md:h-[35px] h-[30px] px-2 sm:w-[99px] border border-[#2E2E2E]`}
        >
          Approve
        </button>
      </div>
    </div>
  );
}

export function ERC20DecomposeListCard(props: Props) {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopyButtonClicked = () => {
    if (props.address) {
      copy(props.address);
      setIsCopied(true);
    }
  };

  return (
    <div className="flex justify-between w-full h-[80px] gap-6 items-center md:px-[40px] sm:px-[20px] px-4  py-2 mb-2 borderpy-2 border  rounded-3xl text-white text-base bg-[#858584]/10 border-gray-500">
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
        ERC20
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
          <p className="text-[#BABABA] truncate">
            {props.address && props.address.substring(0, 9)} ...{' '}
            {props.address && props.address.slice(-7)}
          </p>
          <div className="relative">
            <button>
              <Icon
                onClick={handleCopyButtonClicked}
                icon="solar:copy-outline"
                className="item-center my-auto text-[#BABABA]"
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
      <div id="id" className="w-[3%]"></div>
      <div id="amount" className="truncate sm:w-auto">
        <p className="text-[#858584] text-xs">Amount</p>
        <p className="text-center">
          {Number(props.amount) * Number(props.productAmount)}
        </p>
      </div>
    </div>
  );
}
