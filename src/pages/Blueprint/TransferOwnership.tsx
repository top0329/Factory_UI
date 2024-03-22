import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useAtom } from 'jotai';
import copy from 'copy-to-clipboard';

import Button from '../../components/Button';
import { blueprintSelectionState } from '../../jotai/atoms';
const TransferOwnership = () => {
  const naviage = useNavigate();

  const [selectedBlueprint] = useAtom(blueprintSelectionState);

  const [blueprintMintAmountValue, setBlueprintMintAmountValue] =
    useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(true);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only integer values
    const newValue = event.target.value;
    // Check if the input value is either empty or an integer
    if (newValue === '' || /^\d+$/.test(newValue)) {
      setBlueprintMintAmountValue(newValue); // Update the state only if it's an empty string or an integer
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
  const closeModal = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      setIsModalOpen(false);
    }
  };
  return (
    <>
      <div className={`min-w-[360px] `}>
        <p className="pt-[4px] pb-3 text-white lg:text-[32px] md:text-[26px] text-[20px]">
          Blueprint Ownership
        </p>
        <div className=" border bg-black border-[#BABABA] text-[#BABABA] rounded-md py-4 px-10 w-full xl:text-[22px] lg:text-[18px]">
          <p>
            This operation is to transfer ownership of this Blueprint to another
            party
          </p>
          <p>
            As a result, You will lose control of this Blueprint and will not
            receive any Blueprint mint fees.
          </p>
        </div>
        <div className="flex justify-center items-center py-6 text-white">
          <div className="relative rounded-3xl bg-[#011018] w-full pb-6 sm:w-[614px] border-2 border-[#00F0FF]/30">
            <header className="flex justify-start items-center pl-4 py-4 text-xl sm:text-3xl sm:justify-center">
              Transfer Ownership
            </header>
            <img
              className="w-full h-80 sm:h-96 object-cover"
              src={selectedBlueprint.uri}
              alt="blueprint"
            />
            <div className="z-10 absolute top-[268px] bg-gradient-to-t from-[#011018] to-transparent w-full h-28 sm:top-[340px]"></div>
            <div className="flex flex-col gap-4 sm:px-8">
              <h1 className="z-20 font-semibold text-lg mt-[-36px] pl-4 sm:text-xl">
                {selectedBlueprint.name}
              </h1>
              <div className="flex flex-col gap-3 px-4">
                <div className="grid grid-cols-3 gap-3 font-mono">
                  <p className="col-span-1 text-light-gray">Blueprint ID</p>
                  <p className="col-span-1">{selectedBlueprint.id}</p>
                </div>
                <div className="grid grid-cols-3 items-center gap-3 font-mono">
                  <p className="col-span-1 text-light-gray">Mint Price</p>
                  <p className="col-span-1">
                    1{' '}
                    {selectedBlueprint.mintPriceUnit === 0
                      ? 'ETH'
                      : selectedBlueprint.mintPriceUnit === 1
                      ? 'USDT'
                      : 'USDC'}
                  </p>
                </div>
                <div className="grid grid-cols-3 items-center gap-3 font-mono">
                  <p className="col-span-1 text-light-gray">Mint Limit</p>
                  <p className="col-span-1">{selectedBlueprint.mintLimit}</p>
                </div>
                <div className="grid grid-cols-3 items-center gap-3 font-mono">
                  <p className="col-span-1 text-light-gray">Mint Amount</p>
                  <p className="col-span-1">{selectedBlueprint.mintedAmount}</p>
                </div>
                <div className="grid grid-cols-3 justify-between items-start gap-2 font-mono sm:flex-row sm:items-center">
                  <p className="text-light-gray">Owner</p>
                  <div className="col-span-2 relative flex items-center gap-1">
                    <p
                      className=" text-base break-all"
                      // href={`https://sepolia.etherscan.io/address/${selectedBlueprint.creator}`}
                      // target="_blank"
                    >
                      {selectedBlueprint.creator.substring(0, 16)}...
                      {selectedBlueprint.creator.slice(-16)}
                    </p>
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
                <div className="grid grid-cols-3 items-center gap-3 font-mono">
                  <p className="col-span-1 text-light-gray">New Owner</p>
                  <input
                    id="blueprint-mint-amount"
                    name="blueprint-mint-amount"
                    className="col-span-2 inline w-full rounded-lg border border-light-gray text-white text-lg bg-black py-1.5 px-2 leading-5 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm hide-arrows"
                    type="number"
                    step={1}
                    min={0}
                    onChange={handleInputChange}
                    value={blueprintMintAmountValue}
                  />
                </div>
                <div className="flex justify-center items-center gap-8 pt-0 xs:gap-20 sm:pt-2">
                  <Button
                    className="flex justify-center px-12 h-9"
                    text="Cancel"
                    variant="secondary"
                    onClick={() => naviage('/blueprint')}
                  />
                  <Button
                    onClick={toggleModal}
                    className="truncate px-12 h-9"
                    text="Transfer"
                    variant="primary"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div
          id="default-modal"
          aria-hidden="true"
          className="fixed top-0 z-50 flex  justify-center items-center inset-0 min-w-[365px]"
          style={{ backdropFilter: 'blur(5px)' }}
          onClick={closeModal}
        >
          <div className="bg-[#011018] 2xl:w-[25%] xl:w-[27.5%] lg:w-[40%] md:w-[50%] sm:w-[60%] xs:w-[70%] w-[77.5%] rounded-2xl border border-gray-700">
            <p className="flex justify-center items-center gap-2 py-2 text-center lg:text-[26px] sm:text-[22px] text-[18px] text-white">
              <Icon
                className="sm:w-8 sm:h-8 w-6 h-6 cursor-pointer text-gray-500"
                icon="ion:alert-circle-outline"
              />
              Transfer Ownership
            </p>
            <div className="bg-black sm:px-6 px-2 py-4 text-light-gray md:text-[18px]">
              <p>
                The ownership of Your Blueprint will be transferred{' '}
                {/* <br /> */}
                to the
                <span className="text-white sm:text-[16px] text-[14px] break-all">
                  {' '}
                  {selectedBlueprint.creator}.
                </span>
              </p>
              <p className="mt-6">Are you sure?</p>
            </div>
            <div className="flex justify-center items-center py-4 gap-6">
              <Button
                className="flex justify-center px-8 h-8"
                text="Cancel"
                variant="secondary"
                onClick={closeModal}
              />
              <Button
                className="truncate px-8 h-8"
                text="Confirm"
                variant="primary"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TransferOwnership;
