import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useAtom } from 'jotai';

import Button from '../Button';
import ERC20Card from '../Cards/ComponentCard/ERC20Card';
import ERC721Card from '../Cards/ComponentCard/ERC721Card';
import ERC1155Card from '../Cards/ComponentCard/ERC1155Card';
import Image from '../Image';
import useWeb3 from '../../hooks/useWeb3';
import {
  ERC1155Data,
  ERC20Data,
  ERC721Data,
  SelectedProduct,
  WindowSize,
} from '../../types';
import { selectedProductAtom, productSelectionState } from '../../jotai/atoms';

export interface Props {
  isDrawerOpen?: boolean;
  setIsDrawerOpen?: (isOpen: boolean) => void;
}

const ProductDetailsDrawer: FC<Props> = ({ isDrawerOpen, setIsDrawerOpen }) => {
  const { currentProductAddress, chainExplorer } = useWeb3();
  const navigate = useNavigate();

  const [selectedProduct] = useAtom<SelectedProduct>(selectedProductAtom);
  const [, setProductSelectionState] = useAtom<SelectedProduct>(
    productSelectionState
  );

  const [activeTab, setActiveTab] = useState<number>(1);
  const [isProductAddressCopied, setIsProductAddressCopied] =
    useState<boolean>(false);
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDecomposeButtonClicked = () => {
    navigate(`/product/decompose/${selectedProduct.id}`);
    sideDrawerClosedHandler();
    setProductSelectionState(selectedProduct);
  };

  const handleTabClick = (id: number) => {
    setActiveTab(id);
  };

  const handleCopyProductAddressButtonClicked = (address: string) => {
    try {
      setIsProductAddressCopied(true);
      copy(address);
      setTimeout(() => {
        setIsProductAddressCopied(false);
      }, 2000);
    } catch (err) {
      console.log('failed to copy', err);
    }
  };

  const sideDrawerClosedHandler = () => {
    if (setIsDrawerOpen) {
      setIsDrawerOpen(false);
    }
    document.body.style.overflow = 'unset';
  };

  const shortenAddress = (addr: string) => {
    if (!addr || addr.length <= 12) return addr;
    const start = addr.slice(0, 12);
    const end = addr.slice(-10);
    return `${start}...${end}`;
  };

  return (
    <div
      className={
        'fixed overflow-hidden z-50 bg-black bg-opacity-50 inset-0 transform ease-in-out ' +
        (isDrawerOpen
          ? 'transition-opacity opacity-100 duration-500 translate-x-0'
          : 'transition-all delay-500 opacity-0 translate-x-full')
      }
    >
      <div
        className={
          'w-screen max-w-2xl right-0 absolute bg-drawer h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform ' +
          (isDrawerOpen ? 'translate-x-0' : 'translate-x-full')
        }
      >
        <div className="relative w-screen max-w-2xl flex flex-col overflow-y-auto h-full overflow-x-hidden">
          <Image
            className="min-h-[235px] object-cover sm:min-h-[435px] xs:min-h-[335px]"
            src={selectedProduct.imageUri}
            spinnerClassName="w-full min-h-[235px] object-cover sm:min-h-[435px] xs:min-h-[335px]"
            alt="product-details-drawer"
          />
          <p className="z-30 absolute top-[192px] left-4 text-white text-2xl font-semibold me-2 px-2.5 py-0.5 rounded opacity-90 sm:top-[392px] xs:top-[292px]">
            {selectedProduct.name}
          </p>
          <div className="z-10 absolute top-[124px] bg-gradient-to-t from-landing via-transparent to-transparent w-full h-28 sm:top-[324px] xs:top-[224px]"></div>
          <div className="bg-[#011018] py-6 px-6 h-[252px] md:px-8">
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col items-start text-white gap-2">
                <p className="truncate text-light-gray text-sm">Product ID</p>
                <p>{selectedProduct.id}</p>
              </div>
              <div className="flex flex-col items-start text-white gap-2">
                <p className="truncate text-light-gray text-sm">Balance</p>
                <p>{selectedProduct.balance}</p>
              </div>
              <Button
                className="truncate text-base rounded-full h-9 !py-1 !px-2 !gap-1"
                text="Decompose"
                variant="outline"
                icon={<Icon className="w-6 h-6" icon="ri:exchange-line" />}
                onClick={handleDecomposeButtonClicked}
              />
            </div>
            <div className="flex justify-start items-start mt-5 md:justify-between">
              <div className="flex flex-col items-start text-white gap-2">
                <p className="text-light-gray text-sm">Address</p>
                <div className="relative flex items-center gap-1">
                  <Icon className="w-4 h-6" icon="logos:ethereum" />
                  <a
                    className="underline text-base"
                    href={`${chainExplorer}/address/${currentProductAddress}`}
                    target="_blank"
                  >
                    {windowSize.width !== undefined && windowSize.width > 472
                      ? `${currentProductAddress}`
                      : `${shortenAddress(currentProductAddress)}`}
                  </a>
                  <Icon
                    className="w-4 h-4 cursor-pointer"
                    icon="solar:copy-outline"
                    onClick={() =>
                      handleCopyProductAddressButtonClicked(
                        currentProductAddress
                      )
                    }
                  />
                  {isProductAddressCopied && (
                    <div
                      className="absolute -bottom-12 right-0 mb-2 px-4 py-2 bg-gray-700 text-white text-xs rounded-lg transition-opacity opacity-100"
                      style={{ transition: 'opacity 0.3s' }}
                    >
                      Copied!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between h-16 bg-black border-t-2 border-gray-700 pt-2">
              <button
                className={`flex justify-center items-center gap-2 font-medium w-1/3 mx-2 ${
                  activeTab === 1
                    ? 'border-b-2 border-light-gray text-white'
                    : 'text-light-gray'
                }`}
                onClick={() => handleTabClick(1)}
              >
                ERC20
                <p
                  className={`${
                    activeTab === 1
                      ? 'bg-light-gray text-white'
                      : 'bg-secondary text-light-gray'
                  } font-medium px-2.5 rounded-xl opacity-90`}
                >
                  {selectedProduct.data.erc20Data &&
                    selectedProduct.data.erc20Data.length}
                </p>
              </button>
              <button
                className={`flex justify-center items-center gap-2 font-medium w-1/3 mx-2 ${
                  activeTab === 2
                    ? 'border-b-2 border-light-gray text-white'
                    : 'text-light-gray'
                }`}
                onClick={() => handleTabClick(2)}
              >
                ERC721
                <p
                  className={`${
                    activeTab === 2
                      ? 'bg-light-gray text-white'
                      : 'bg-secondary text-light-gray'
                  } font-medium px-2.5 rounded-xl opacity-90`}
                >
                  {selectedProduct.data.erc721Data &&
                    selectedProduct.data.erc721Data.length}
                </p>
              </button>
              <button
                className={`flex justify-center items-center gap-2 font-medium w-1/3 mx-2 ${
                  activeTab === 3
                    ? 'border-b-2 border-light-gray text-white'
                    : 'text-light-gray'
                }`}
                onClick={() => handleTabClick(3)}
              >
                ERC1155
                <p
                  className={`${
                    activeTab === 3
                      ? 'bg-light-gray text-white'
                      : 'bg-secondary text-light-gray'
                  } font-medium px-2.5 rounded-xl opacity-90`}
                >
                  {selectedProduct.data.erc1155Data &&
                    selectedProduct.data.erc1155Data.length}
                </p>
              </button>
            </div>
          </div>
          <div className="px-4 py-10 h-full md:px-12 xs:px-8">
            {activeTab === 1 && (
              <div className="grid grid-cols-2 gap-4 place-items-center">
                {selectedProduct.data.erc20Data &&
                  selectedProduct.data.erc20Data.length > 0 &&
                  selectedProduct.data.erc20Data.map(
                    (erc20: ERC20Data, idx: React.Key | null | undefined) => {
                      return (
                        <ERC20Card
                          key={idx}
                          name={erc20.name}
                          uri={erc20.uri}
                          amount={erc20.amount}
                          tokenAddress={erc20.tokenAddress}
                        />
                      );
                    }
                  )}
              </div>
            )}
            {activeTab === 2 && (
              <div className="grid grid-cols-2 gap-4 place-items-center">
                {selectedProduct.data.erc721Data &&
                  selectedProduct.data.erc721Data.length > 0 &&
                  selectedProduct.data.erc721Data.map((erc721: ERC721Data) => {
                    return (
                      <ERC721Card
                        key={erc721.tokenId}
                        tokenId={erc721.tokenId}
                        tokenAddress={erc721.tokenAddress}
                      />
                    );
                  })}
              </div>
            )}
            {activeTab === 3 && (
              <div className="grid grid-cols-2 gap-4 place-items-center">
                {selectedProduct.data.erc1155Data &&
                  selectedProduct.data.erc1155Data.length > 0 &&
                  selectedProduct.data.erc1155Data.map(
                    (erc1155: ERC1155Data) => {
                      return (
                        <ERC1155Card
                          key={erc1155.tokenId}
                          tokenId={erc1155.tokenId}
                          amount={erc1155.amount}
                          tokenAddress={erc1155.tokenAddress}
                        />
                      );
                    }
                  )}
              </div>
            )}
          </div>
          <Icon
            className="absolute bg-gray-300 text-gray-800 text-xs font-medium rounded-full p-1 m-2 h-8 w-8 cursor-pointer hover:opacity-50"
            icon="flowbite:close-outline"
            onClick={sideDrawerClosedHandler}
          />
          <div
            id="badge"
            className="absolute right-[-35px] top-[26px] w-[175.5px] h-[30px] bg-[#FFF500] text-black text-center text-[18px] rotate-[41.38deg] py-auto px-[35px] shadow-[0_3px_5px_1px_rgba(0,0,0,0.3)]"
          >
            Product
          </div>
        </div>
      </div>
      <div
        className="w-screen h-full cursor-pointer"
        onClick={sideDrawerClosedHandler}
      ></div>
    </div>
  );
};

export default ProductDetailsDrawer;
