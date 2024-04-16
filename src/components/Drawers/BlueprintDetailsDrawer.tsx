import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useAtom } from 'jotai';
import copy from 'copy-to-clipboard';

import Button from '../Button';
import {
  ERC1155Data,
  ERC20Data,
  ERC721Data,
  SelectedBlueprint,
  WindowSize,
} from '../../types';
import {
  blueprintSelectionState,
  isCreatorModeAtom,
  selectedBlueprintAtom,
} from '../../jotai/atoms';
import ERC20Card from '../Cards/ComponentCard/ERC20Card';
import ERC721Card from '../Cards/ComponentCard/ERC721Card';
import ERC1155Card from '../Cards/ComponentCard/ERC1155Card';
import Image from '../Image';
import useWeb3 from '../../hooks/useWeb3';
import useToast from '../../hooks/useToast';

export interface Props {
  isDrawerOpen?: boolean;
  setIsDrawerOpen?: (isOpen: boolean) => void;
}

const BlueprintDetailDrawer: FC<Props> = ({
  isDrawerOpen,
  setIsDrawerOpen,
}) => {
  const { account, isConnected } = useWeb3();
  const { showToast } = useToast();

  const navigate = useNavigate();

  const [selectedBlueprint] = useAtom<SelectedBlueprint>(selectedBlueprintAtom);
  const [, setBlueprintSelectionState] = useAtom<SelectedBlueprint>(
    blueprintSelectionState
  );
  const [isCreatorMode] = useAtom<boolean>(isCreatorModeAtom);

  const [activeTab, setActiveTab] = useState<number>(1);
  const [isCopied, setIsCopied] = useState<boolean>(false);
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

  const handleMintBlueprintButtonClicked = () => {
    if (isConnected) {
      sideDrawerClosedHandler();
      setBlueprintSelectionState(selectedBlueprint);
      navigate(`/blueprint/mint/${selectedBlueprint.id}`);
    } else {
      showToast('warning', 'Please connect your wallet first');
    }
  };

  const handleRecreateBlueprintButtonClicked = () => {
    if (isConnected) {
      sideDrawerClosedHandler();
      setBlueprintSelectionState(selectedBlueprint);
      navigate(`/blueprint/recreate/${selectedBlueprint.id}`);
    } else {
      showToast('warning', 'Please connect your wallet first');
    }
  };

  const handleUpdateBlueprintButtonClicked = () => {
    sideDrawerClosedHandler();
    setBlueprintSelectionState(selectedBlueprint);
    navigate(`/blueprint/update/${selectedBlueprint.id}`);
  };

  const handleBlueprintOwnershipButtonClicked = () => {
    sideDrawerClosedHandler();
    setBlueprintSelectionState(selectedBlueprint);
    navigate(`/blueprint/transfer-ownership/${selectedBlueprint.id}`);
  };

  const handleTabClick = (id: number) => {
    setActiveTab(id);
  };

  const handleCopyButtonClicked = () => {
    try {
      setIsCopied(true);
      copy(selectedBlueprint.creator);
      setTimeout(() => {
        setIsCopied(false);
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
    <main
      className={
        'fixed overflow-hidden z-50 bg-black bg-opacity-50 inset-0 transform ease-in-out ' +
        (isDrawerOpen
          ? 'transition-opacity opacity-100 duration-500 translate-x-0'
          : 'transition-all delay-500 opacity-0 translate-x-full')
      }
    >
      <section
        className={
          'w-screen max-w-2xl right-0 absolute bg-drawer h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform ' +
          (isDrawerOpen ? 'translate-x-0' : 'translate-x-full')
        }
      >
        <article className="relative w-screen max-w-2xl flex flex-col overflow-y-auto h-full overflow-x-hidden">
          <Image
            className="min-h-[235px] object-cover sm:min-h-[435px] xs:min-h-[335px]"
            src={selectedBlueprint.imageUri}
            spinnerClassName="w-full min-h-[235px] object-cover sm:min-h-[435px] xs:min-h-[335px]"
            alt="blueprint-details-drawer"
          />
          <p className="z-30 absolute top-[192px] left-4 text-white text-2xl font-semibold me-2 px-2.5 py-0.5 rounded opacity-90 sm:top-[392px] xs:top-[292px]">
            {selectedBlueprint.name}
          </p>
          <div className="z-10 absolute top-[124px] bg-gradient-to-t from-landing via-transparent to-transparent w-full h-28 sm:top-[324px] xs:top-[224px]"></div>
          <div
            className={`bg-[#011018] py-6 px-8 max-h-80 ${
              isCreatorMode ? 'sm:h-80' : 'sm:h-60'
            }`}
          >
            {isCreatorMode && (
              <div className="flex flex-col justify-between gap-4 sm:gap-10 sm:flex-row">
                {selectedBlueprint.creator === account && (
                  <div className="flex justify-between w-full">
                    <Button
                      className="text-sm !py-1 !px-4 !bg-black xs:text-base xs:!px-7"
                      text="Update"
                      variant="secondary"
                      onClick={handleUpdateBlueprintButtonClicked}
                    />
                    <Button
                      className="text-sm !py-1 !px-4 !bg-black xs:text-base xs:!px-7"
                      text="Ownership"
                      variant="secondary"
                      onClick={handleBlueprintOwnershipButtonClicked}
                    />
                  </div>
                )}
                <div className="flex justify-between w-full">
                  <Button
                    className="text-sm !py-1 !px-4 xs:text-base xs:!px-7 !bg-black"
                    text="Recreate"
                    variant="secondary"
                    onClick={handleRecreateBlueprintButtonClicked}
                  />
                  <Button
                    className="truncate text-sm text-center !py-1 !px-2 min-w-28 xs:text-base"
                    text="Mint Blueprint"
                    onClick={handleMintBlueprintButtonClicked}
                    variant="outline"
                  />
                </div>
              </div>
            )}
            <div className="flex justify-start items-start mt-4 sm:justify-between">
              <div className="flex flex-col w-full items-start text-white gap-2">
                <div className="flex justify-between w-full gap-4 xs:gap-10">
                  <div className="flex justify-start items-center w-full gap-4 xs:gap-10">
                    <div className="flex flex-col items-start text-white gap-2">
                      <p className="truncate text-light-gray text-sm">
                        Blueprint ID
                      </p>
                      <p>{Number(selectedBlueprint.id)}</p>
                    </div>
                    <div className="flex flex-col items-start text-white gap-2">
                      <p className="text-light-gray text-sm">Total Supply</p>
                      <p>{Number(selectedBlueprint.totalSupply)}</p>
                    </div>
                  </div>
                  {!isCreatorMode === true && (
                    <Button
                      className="truncate text-sm h-9 w-40 !py-1 !px-2 xs:text-base rounded-full"
                      text="Mint Blueprint"
                      onClick={handleMintBlueprintButtonClicked}
                      variant="outline"
                    />
                  )}
                </div>
                <div className="flex gap-3">
                  <p className="text-light-gray text-sm">Creator</p>
                  {selectedBlueprint.creator === account && (
                    <p className="flex top-[148px] z-50 right-[10px] block-content font-mono items-center rounded-2xl bg-[#06DCEC]/20 text-[11px] px-[6px] border border-[#06DCEC]/50 text-[#06DCEC]/50 text-center">
                      My Blueprint
                    </p>
                  )}
                </div>
                <div className="relative flex items-center gap-1">
                  <Icon className="w-4 h-6" icon="logos:ethereum" />
                  <a
                    className="underline text-base"
                    href={`https://sepolia.etherscan.io/address/${selectedBlueprint.creator}`}
                    target="_blank"
                  >
                    {windowSize.width !== undefined && windowSize.width > 472
                      ? `${selectedBlueprint.creator}`
                      : `${shortenAddress(selectedBlueprint.creator)}`}
                  </a>
                  <Icon
                    className="w-4 h-4 cursor-pointer"
                    icon="solar:copy-outline"
                    onClick={handleCopyButtonClicked}
                  />
                  {isCopied && (
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
            <div className="flex justify-between items-start mt-5">
              <div className="flex flex-col items-start text-white gap-2">
                <p className="text-light-gray text-sm">Mint Price</p>
                <p>
                  {Number(selectedBlueprint.mintPrice)}{' '}
                  {Number(selectedBlueprint.mintPriceUnit) === 0
                    ? 'ETH'
                    : Number(selectedBlueprint.mintPriceUnit) === 1
                    ? 'USDT'
                    : 'USDC'}
                </p>
              </div>
              <div className="flex flex-col items-start text-white gap-2">
                <p className="text-light-gray text-sm">Mint Limit</p>
                <p>{Number(selectedBlueprint.mintLimit)}</p>
              </div>
              <div className="flex flex-col items-start text-white gap-2">
                <p className="text-light-gray text-sm">Minted Amount</p>
                <p>{Number(selectedBlueprint.mintedAmount)}</p>
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
                  {selectedBlueprint.data.erc20Data &&
                    selectedBlueprint.data.erc20Data.length}
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
                  {selectedBlueprint.data.erc721Data &&
                    selectedBlueprint.data.erc721Data.length}
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
                  {selectedBlueprint.data.erc1155Data &&
                    selectedBlueprint.data.erc1155Data.length}
                </p>
              </button>
            </div>
          </div>
          <div className="px-4 py-10 h-full md:px-12 xs:px-8">
            {activeTab === 1 && (
              <div className="grid grid-cols-2 gap-4 place-items-center">
                {selectedBlueprint.data.erc20Data &&
                  selectedBlueprint.data.erc20Data.length > 0 &&
                  selectedBlueprint.data.erc20Data.map(
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
                {selectedBlueprint.data.erc721Data &&
                  selectedBlueprint.data.erc721Data.length > 0 &&
                  selectedBlueprint.data.erc721Data.map(
                    (erc721: ERC721Data) => {
                      return (
                        <ERC721Card
                          key={erc721.tokenId}
                          tokenId={erc721.tokenId}
                          tokenAddress={erc721.tokenAddress}
                        />
                      );
                    }
                  )}
              </div>
            )}
            {activeTab === 3 && (
              <div className="grid grid-cols-2 gap-4 place-items-center">
                {selectedBlueprint.data.erc1155Data &&
                  selectedBlueprint.data.erc1155Data.length > 0 &&
                  selectedBlueprint.data.erc1155Data.map(
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
            className="absolute right-[-35px] top-[26px] w-[175.5px] h-[30px] bg-[#0047FF] text-white text-center text-[18px] rotate-[41.38deg] py-auto px-[35px] shadow-[0_3px_5px_1px_rgba(0,0,0,0.3)]"
          >
            Blueprint
          </div>
        </article>
      </section>
      <section
        className="w-screen h-full cursor-pointer"
        onClick={sideDrawerClosedHandler}
      ></section>
    </main>
  );
};

export default BlueprintDetailDrawer;
