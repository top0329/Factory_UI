import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useAtom } from 'jotai';
import copy from 'copy-to-clipboard';

import Button from '../../components/Button';
import useWeb3 from '../../hooks/useWeb3';
import { blueprintSelectionState } from '../../jotai/atoms';

const MintBlueprintPage = () => {
  const { factoryContract, factoryWeb3, account } = useWeb3();

  const naviage = useNavigate();

  const [selectedBlueprint] = useAtom(blueprintSelectionState);

  const [blueprintMintAmountValue, setBlueprintMintAmountValue] = useState<
    number | ''
  >('');
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [blueprintMintFee, setBlueprintMintFee] = useState<number>(0);

  useEffect(() => {
    async function init() {
      const _blueprintMintFee = await factoryContract.blueprintCreationFee();
      setBlueprintMintFee(Number(_blueprintMintFee));
    }
    init();
  }, [factoryContract]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (newValue === '' || /^\d+$/.test(newValue)) {
      if (
        Number(newValue) < Number(selectedBlueprint.mintLimit) ||
        Number(selectedBlueprint.mintLimit) === 0
      ) {
        setBlueprintMintAmountValue(
          newValue.trim() === '' ? '' : Number(newValue)
        );
      } else {
        console.log('error');
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      !(
        (event.key >= '0' && event.key <= '9') ||
        event.key === 'Backspace' ||
        event.key === 'Delete' ||
        event.key === 'Tab' ||
        event.key === 'ArrowLeft' ||
        event.key === 'ArrowRight' ||
        (event.key >= '0' &&
          event.key <= '9' &&
          event.getModifierState('NumLock'))
      )
    ) {
      event.preventDefault();
    }
  };

  const handleApproveClick = async () => {
    try {
      if (blueprintMintAmountValue === 0 || blueprintMintAmountValue === '') {
        console.log('error');
      } else {
        // await blueprintWeb3.methods
        //   .setApprovalForAll(blueprintAddress, true)
        //   .send({ from: account });
        // setIsApproved(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleMintBlueprintClick = async () => {
    try {
      const transition = await factoryWeb3.methods
        .mintBlueprint(account, selectedBlueprint.id)
        .send({ from: account });
      setIsApproved(true);
      console.log(transition);
    } catch (err) {
      console.log(err);
    }
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

  return (
    <div className="flex justify-center items-center py-10 text-white sm:py-10">
      <div className="relative rounded-3xl bg-[#060606] w-full pb-6 sm:w-[614px] sm:bg-[#060606] border-2 border-[#1f1f1f]">
        <header className="flex justify-start items-center pl-4 py-4 text-xl sm:text-3xl sm:justify-center">
          Blueprint Mint
        </header>
        <img
          className="w-full h-80 sm:h-96 object-cover"
          src={selectedBlueprint.uri}
          alt="blueprint"
        />
        <div className="z-10 absolute top-[268px] bg-gradient-to-t from-[#060606] to-transparent w-full h-28 sm:top-[340px]"></div>
        <div className="flex flex-col gap-4 sm:px-8">
          <h1 className="z-20 font-semibold text-lg mt-[-36px] pl-4 sm:text-xl">
            {selectedBlueprint.name}
          </h1>
          <div className="flex flex-col gap-3 px-4">
            <div className="grid grid-cols-2 gap-3 font-mono">
              <p className="col-span-1 text-light-gray">Blueprint ID</p>
              <p className="col-span-1">{selectedBlueprint.id}</p>
            </div>
            <div className="flex flex-col justify-between items-start gap-2 font-mono sm:flex-row sm:items-center">
              <p className="text-light-gray">Creator</p>
              <div className="relative flex items-center gap-1">
                <Icon className="w-6 h-6 xs:w-4 xs:h-5" icon="logos:ethereum" />
                <a
                  className="underline text-base break-all"
                  href={`https://sepolia.etherscan.io/address/${selectedBlueprint.creator}`}
                  target="_blank"
                >
                  {selectedBlueprint.creator}
                </a>
                <Icon
                  className="w-6 h-6 cursor-pointer xs:w-4 xs:h-4"
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
            <div className="grid grid-cols-2 items-center gap-3 font-mono">
              <p className="col-span-1 text-light-gray">
                Blueprint Mint Amount
              </p>
              <input
                id="blueprint-mint-amount"
                name="blueprint-mint-amount"
                className="inline w-full rounded-lg border border-light-gray text-white text-lg bg-black py-1.5 px-2 leading-5 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm hide-arrows"
                type="number"
                step={1}
                min={1}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                value={blueprintMintAmountValue}
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-3 font-mono">
              <p className="col-span-1 text-light-gray">
                Blueprint Creation Fee
              </p>
              <p className="col-span-1">{blueprintMintFee} ETH</p>
            </div>
            <div className="grid grid-cols-2 items-center gap-3 font-mono">
              <p className="col-span-1 text-light-gray">Blueprint Mint Price</p>
              <p className="col-span-1">
                {Number(selectedBlueprint.mintPrice)}{' '}
                {Number(selectedBlueprint.mintPriceUnit) === 0
                  ? 'ETH'
                  : Number(selectedBlueprint.mintPriceUnit) === 1
                  ? 'USDT'
                  : 'USDC'}
              </p>
            </div>
            <div className="grid grid-cols-2 items-center gap-3 font-mono">
              <p className="col-span-1 text-light-gray">Total Mint fee</p>
              <p className="col-span-1">
                {blueprintMintFee} ETH + {Number(blueprintMintAmountValue)} *{' '}
                {Number(selectedBlueprint.mintPrice)}{' '}
                {Number(selectedBlueprint.mintPriceUnit) === 0
                  ? 'ETH'
                  : Number(selectedBlueprint.mintPriceUnit) === 1
                  ? 'USDT'
                  : 'USDC'}
              </p>
            </div>
            <div className="flex justify-center items-center gap-8 pt-0 xs:gap-28 sm:pt-2">
              <Button
                className="flex justify-center !w-28"
                text="Cancel"
                variant="secondary"
                onClick={() => naviage('/blueprint')}
              />
              {selectedBlueprint.mintPriceUnit === 0 ? (
                <Button
                  className="truncate !px-3"
                  text="Mint Blueprint"
                  variant="primary"
                />
              ) : (
                <React.Fragment>
                  {isApproved ? (
                    <Button
                      className="truncate !px-3"
                      text="Mint Blueprint"
                      variant="primary"
                      onClick={handleMintBlueprintClick}
                    />
                  ) : (
                    <Button
                      className="truncate !px-8"
                      text="Approve"
                      variant="primary"
                      onClick={handleApproveClick}
                    />
                  )}
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MintBlueprintPage;
