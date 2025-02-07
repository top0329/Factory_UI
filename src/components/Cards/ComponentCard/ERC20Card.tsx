import { FC, useEffect, useState } from 'react';
import copy from 'copy-to-clipboard';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Address } from 'viem';

import Image from '../../Image';
import useWeb3 from '../../../hooks/useWeb3';
import getTokenData from '../../../utils/getTokenData';
import { getTokenDetailsByAddress } from '../../../utils/checkContractType';
import { DefaultErc20ImageUri, TOKEN_DETAIL_DATA_URL } from '../../../constants';

export interface Props {
  name?: string;
  uri?: string;
  amount: number;
  tokenAddress: string;
  icon?: boolean;
  onEditIconClicked?: () => void;
  onDeleteIconClicked?: () => void;
  isForAdd?: boolean;
}

const ERC20Card: FC<Props> = ({
  name,
  uri,
  amount,
  tokenAddress,
  icon = false,
  onEditIconClicked,
  onDeleteIconClicked,
  isForAdd,
}) => {
  const { library, chainExplorer, chainId } = useWeb3();

  const [tokenName, setTokenName] = useState<string>('');
  const [imageUri, setImageUri] = useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    async function init() {
      try {
        if (isForAdd) {
          let tokenDataUrl: string = '';
          if (chainId === 1) {
            tokenDataUrl = TOKEN_DETAIL_DATA_URL.main;
          } else if (chainId === 137) {
            tokenDataUrl = TOKEN_DETAIL_DATA_URL.polygon;
          }
          const tokenData = await getTokenData(
            tokenAddress as Address,
            library
          );
          if (tokenData) {
            const { tokenName } = tokenData;
            const details = await getTokenDetailsByAddress(
              tokenAddress as Address,
              tokenDataUrl
            );
            setTokenName(tokenName);
            if (details && details.logo) {
              setImageUri(details.logo);
            } else {
              setImageUri(DefaultErc20ImageUri);
            }
          }
        } else {
          setTokenName(name || '');
          setImageUri(uri || '');
        }
      } catch (err) {
        console.log(err);
      }
    }
    init();
  }, [chainId, isForAdd, library, name, tokenAddress, uri]);

  const handleCopyButtonClicked = () => {
    try {
      setIsCopied(true);
      copy(tokenAddress);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.log('failed to copy', err);
    }
  };

  const shortenAddress = (addr: string) => {
    if (!addr || addr.length <= 12) return addr;
    const start = addr.slice(0, 6);
    const end = addr.slice(-4);
    return `${start}...${end}`;
  };

  return (
    <div className="relative w-full min-w-[120px] h-[250px] overflow-hidden bg-[#040a0f] border border-black rounded-3xl sm:h-[290px] sm:min-w-[220px]">
      <div className="group relative">
        <Image
          className={`z-20 flex justify-center items-center w-full h-44 rounded-t-3xl object-cover hover:scale-105 duration-300 ease-in-out ${
            icon && 'transition duration-300 ease-in-out group-hover:blur-sm'
          }`}
          spinnerClassName="w-full h-44"
          src={imageUri}
          alt="erc20-card"
        />
        {icon && (
          <div className="absolute inset-0 w-full h-44 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:flex">
            <Icon
              className="bg-blue-200 w-10 h-10 text-blue-800 text-base font-medium me-2 p-0.5 rounded opacity-90 cursor-pointer"
              icon="mynaui:edit-one"
              onClick={onEditIconClicked}
            />
            <Icon
              className="bg-blue-200 w-10 h-10 text-blue-800 text-base font-medium me-2 p-0.5 rounded opacity-90 cursor-pointer"
              icon="heroicons:trash"
              onClick={onDeleteIconClicked}
            />
          </div>
        )}
        <div
          id="badge"
          className="absolute -right-10 top-[10px] w-[150px] h-[24px] bg-[#1dbba8] text-white text-center text-base rotate-[38.86deg] py-auto pl-[12px] shadow-[0_3px_5px_1px_rgba(0,0,0,0.3)] sm:h-[30px] sm:text-lg sm:-right-8 sm:top-[17px]"
        >
          ERC20
        </div>
      </div>
      <div className="z-10 absolute top-[164px] bg-gradient-to-t from-[#040a0f] via-[#040a0f] to-transparent w-full h-[20px]"></div>
      <div className="z-20 absolute top-[172px] left-0 bg-gradient-to-r from-slate-800 gray via-transparent to-transparent w-[20px] h-full"></div>
      <div className="z-20 absolute top-[172px] right-0 rounded-l-3xl bg-gradient-to-l from-slate-800 gray via-transparent to-transparent w-[20px] h-full"></div>
      <div className="absolute bottom-0 left-0 rounded-l-3xl bg-gradient-to-t from-slate-800 gray via-transparent to-transparent w-full h-[20px] rounded-b-[-24px]"></div>
      <div className="flex flex-col gap-1 px-4 pt-0 pb-2 text-white">
        <p className="truncate z-20 text-lg font-medium mt-[-12px]">
          {tokenName}
        </p>
        <div className="flex flex-col">
          <p className="text-sm text-light-gray">Amount</p>
          <p className="truncate">{amount.toString()}</p>
        </div>
        <div className="hidden sm:flex sm:flex-row sm:justify-between">
          <p className="text-sm text-light-gray">Address</p>
          <div className="relative flex items-center gap-1">
            <Icon className="w-4 h-5" icon="logos:ethereum" />
            <a
              className="underline text-base"
              href={`${chainExplorer}/address/${tokenAddress}`}
              target="_blank"
            >
              {shortenAddress(tokenAddress)}
            </a>
            <Icon
              className="w-4 h-4 cursor-pointer"
              icon="solar:copy-outline"
              onClick={handleCopyButtonClicked}
            />
            {isCopied && (
              <div
                className="absolute -top-8 right-0 mb-2 px-4 py-2 bg-gray-700 text-white text-xs rounded-lg transition-opacity opacity-100"
                style={{ transition: 'opacity 0.3s' }}
              >
                Copied!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ERC20Card;
