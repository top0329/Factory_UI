import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

import useWeb3 from '../../../hooks/useWeb3';

export interface Props {
  uri: string;
  name: string;
  id: string;
  address: string;
  balance: number;
}

export function ProductListCard(props: Props) {
  const { account } = useWeb3();

  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [componentName, setComponentName] = useState<string>('');
  const [tokenAmount, setTokenAmount] = useState<number>();
  const [tokenAddress, setTokenAddress] = useState<string>('');
  const [tokenImage, setTokenImage] = useState<string>('');

  useEffect(() => {
    const getContractInfo = async () => {
      setComponentName(props.name);
      setTokenAmount(props.balance);
      setTokenAddress(props.address);
      setTokenImage(props.uri);
    };
    getContractInfo();
  }, [account, props]);

  const handleCopyButtonClicked = () => {
    setIsCopied(true);
  };

  return (
    <div className="flex justify-between w-full h-[80px] gap-6 items-center md:px-[40px] sm:px-[20px] px-4  py-2 mb-2 borderpy-2 border  rounded-3xl text-white text-base bg-[#858584]/10 border-gray-500">
      <div id="icon" className="flex justify-center py-2">
        <img
          src={tokenImage}
          className="block sm:w-[64px] w-[52px] sm:h-[64px] h-[52px] rounded-full"
        />
      </div>
      <div
        id="type"
        className="hidden sm:block text-white justify-center items-center w-[15%] md:text-[24px] text-[16px] text-xl"
      >
        Product
      </div>
      <div
        id="name"
        className="flex flex-col justify-center sm:w-[12%] w-[30%]"
      >
        <p className="text-[#858584] text-xs">Name</p>
        <p className="text-[#BABABA] truncate">{componentName}</p>
      </div>
      <div
        id="address"
        className="hidden md:block flex-col justify-center w-[25%]"
      >
        <p className="text-[#858584] text-xs">Address</p>
        <div className="flex gap-2">
          <p className="text-[#BABABA] truncate">
            {tokenAddress.substring(0, 9)} ... {tokenAddress.slice(-7)}
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
      <div id="id" className="w-[3%]">
        <div>
          <p className="text-[#858584] text-xs">ID</p>
          <p className="text-[#BABABA]">{props.id}</p>
        </div>
      </div>
      <div id="amount" className="truncate sm:w-auto">
        <p className="text-[#858584] text-xs">Balance</p>
        <p className="text-center">{tokenAmount}</p>
      </div>
    </div>
  );
}
