import { Icon } from '@iconify/react/dist/iconify.js';
import { useEffect, useState } from 'react';
import Web3, { HttpProvider } from 'web3';
import useWeb3 from '../../../hooks/useWeb3';
import { factoryAddress, defaultRPC } from '../../../constants';
import { ethers } from 'ethers';
import { erc20Abi } from 'viem';

export interface Props {
  address?: string;
  amount?: bigint;
  0?: string;
  1?: number;
  productAmount?: number;
}

export function ERC20MintListCard(props: Props) {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [decimal, setDecimal] = useState<number>();
  const { isConnected, library, account, erc20Approve } = useWeb3();
  const [componentName, setComponentName] = useState<string>('');
  const [tokenAmount, setTokenAmount] = useState<number>();
  const [tokenAddress, setTokenAddress] = useState<string>('');
  const [tokenImage, setTokenImage] = useState<string>('');
  useEffect(() => {
    const getContractInfo = async () => {
      const web3 = new Web3(new HttpProvider(defaultRPC));
      const erc20Contract = new web3.eth.Contract(erc20Abi, props[0]);

      const name: string = await erc20Contract.methods
        .name()
        .call({ from: account });

      const _decimal: number = await erc20Contract.methods
        .decimals()
        .call({ from: account });
      setDecimal(_decimal);
      setComponentName(name);
      setTokenAmount(Number(props[1]) * 10 ** (Number(_decimal) * -1));
      setTokenAddress(String(props[0]));
      setTokenImage(
        'https://ipfs.io/ipfs/bafybeigzqwt7uavnlrj3nq44hyoicf3jcbfxi2iih6uaguj3za5t3aqxoi'
      );
    };
    getContractInfo();
  }, [account, decimal, props]);
  const handleCopyButtonClicked = () => {
    setIsCopied(true);
  };
  const handleApprove = async () => {
    try {
      if (isConnected && library) {
        erc20Approve(
          String(props[0]),
          factoryAddress,
          String(ethers.parseUnits(String(tokenAmount), decimal))
        );
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-between w-full h-[80px] gap-6 items-center md:px-[40px] sm:px-[20px] px-[4px] py-2 mb-2 border rounded-3xl text-white text-base bg-[#09F5D8]/10 border-[#09F5D8]">
      <div id="icon" className="flex justify-center py-2">
        <img
          src={tokenImage}
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
        <p className="truncate">{componentName}</p>
      </div>

      <div
        id="address"
        className="hidden md:block flex-col justify-center w-[25%]"
      >
        <p className="text-[#858584] text-xs">Address</p>
        <div className="flex gap-2">
          <p className=" truncate">
            {tokenAddress.substring(0, 8)} . . . {tokenAddress.slice(-6)}
          </p>
          <div className="relative">
            <button>
              <Icon
                onClick={handleCopyButtonClicked}
                icon="solar:copy-outline"
                className="item-center my-auto"
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
      <div id="id" className="w-[3%]"></div>

      <div id="amount" className="truncate sm:w-auto">
        <div>
          <p className="text-[#858584] text-xs">Amount</p>
          <p className="text-center">{tokenAmount}</p>
        </div>
      </div>
      <div id="approve" className="xs:w-auto w-[20%]">
        <button
          onClick={handleApprove}
          className="bg-[#000000] rounded-xl md:text-xl text-[14px] md:h-[35px] h-[30px] px-2 sm:w-[99px] border border-[#2E2E2E]"
        >
          Approve
        </button>
      </div>
    </div>
  );
}

export function ERC20DecomposeListCard(props: Props) {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const { account } = useWeb3();
  const [componentName, setComponentName] = useState<string>('');
  const [tokenAmount, setTokenAmount] = useState<number>();
  const [tokenAddress, setTokenAddress] = useState<string>('');
  const [tokenImage, setTokenImage] = useState<string>('');
  useEffect(() => {
    console.log('props>>>>>>>>>>>>>>', props);
    const getContractInfo = async () => {
      const web3 = new Web3(new HttpProvider(defaultRPC));
      const erc20Contract = new web3.eth.Contract(erc20Abi, props[0]);

      const name: string = await erc20Contract.methods
        .name()
        .call({ from: account });

      const _decimal: number = await erc20Contract.methods
        .decimals()
        .call({ from: account });
      setComponentName(name);
      setTokenAmount(Number(props[1]) * 10 ** (Number(_decimal) * -1));
      setTokenAddress(String(props[0]));
      setTokenImage(
        'https://ipfs.io/ipfs/bafybeigzqwt7uavnlrj3nq44hyoicf3jcbfxi2iih6uaguj3za5t3aqxoi'
      );
      // setDecimal(_decimal);
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
        className="hidden sm:block text-white justify-center  items-center w-[15%] md:text-[24px] text-[16px] text-xl"
      >
        ERC20
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

      <div id="id" className="w-[3%]"></div>

      <div id="amount" className="truncate sm:w-auto">
        <p className="text-[#858584] text-xs">Amount</p>
        <p className="text-center">
          {Number(tokenAmount) * Number(props.productAmount)}
        </p>
      </div>
    </div>
  );
}
