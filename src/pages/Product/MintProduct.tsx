import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useAtom } from 'jotai';
import copy from 'copy-to-clipboard';
import Button from '../../components/Button';
import ProductListCard from '../../components/Cards/ListCard';
import { SelectedOwnBlueprint } from '../../types';
import useWeb3 from '../../hooks/useWeb3';

import {
  ownBlueprintSelectionState,
  selectedOwnBlueprintAtom,
} from '../../jotai/atoms';
interface CustomCheckboxProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const CheckboxIcon = btoa(
  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><pathgit  fill="white" d="M20.292 6.708a1 1 0 0 0-1.414-1.414l-10.334 10.333-4.25-4.25a1 1 0 1 0-1.415 1.414l5 5a1 1 0 0 0 1.415 0L20.292 6.708z"/></svg>'
);

function CustomCheckbox({ checked, onChange }: CustomCheckboxProps) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      style={{
        WebkitAppearance: 'none',
        MozAppearance: 'none',
        appearance: 'none',
        border: '1px solid #858584',
        borderRadius: '2px',
        backgroundColor: checked ? '#011018' : 'transparent', // Change the background color when checked/unchecked
        backgroundImage: checked
          ? `url('data:image/svg+xml;base64,${CheckboxIcon}')`
          : '',
        backgroundPosition: 'center',
        backgroundSize: '98%',
        width: '14px',
        height: '14px',
        cursor: 'pointer', // Change the cursor based on the editable state
      }}
    />
  );
}
const MintProductPage = () => {
  const [selectedOwnData] = useAtom<SelectedOwnBlueprint>(
    selectedOwnBlueprintAtom
  );
  const navigate = useNavigate();
  const [maxChecked, setMaxChecked] = useState(false);

  const [selectedOwnBlueprint] = useAtom(ownBlueprintSelectionState);

  const [blueprintMintAmountValue, setBlueprintMintAmountValue] =
    useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const { factoryContract } = useWeb3();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (newValue === '' || /^\d+$/.test(newValue)) {
      setBlueprintMintAmountValue(newValue); // Update the state only if it's an empty string or an integer
    }
  };

  const handleCopyButtonClicked = () => {
    try {
      setIsCopied(true);
      copy(selectedOwnBlueprint.creator);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.log('failed to copy', err);
    }
  };

  const fillMaxAmount = () => {
    const newMaxChecked = !maxChecked;
    setMaxChecked(newMaxChecked);
    if (newMaxChecked) {
      setBlueprintMintAmountValue(selectedOwnBlueprint.balance.toString());
    } else {
      setBlueprintMintAmountValue('');
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const closeModal = (event: React.MouseEvent) => {
    // Verify if the target is the backdrop to avoid closing when clicking inside the modal
    if (event.target === event.currentTarget) {
      setIsModalOpen(false);
    }
  };

  const handleMintProduct = async () => {
    alert('Mint Product');
    await factoryContract.createProduct(
      selectedOwnBlueprint.id,
      blueprintMintAmountValue,
      '0x'
    );
  };

  return (
    <div className="flex justify-center items-center py-10 text-white sm:py-10 min-w-[360px]">
      <div className="relative rounded-3xl bg-[#011018] w-full pb-6 sm:w-[614px] border-2 border-[#1f1f1f]">
        <header className="flex justify-start items-center pl-4 py-4 text-xl sm:text-3xl sm:justify-center">
          Approve Blueprint
        </header>
        <img
          className="w-full h-80 sm:h-96 object-cover"
          src={selectedOwnBlueprint.uri}
          alt="blueprint"
        />
        <div className="z-10 absolute top-[268px] bg-gradient-to-t from-[#011018] to-transparent w-full h-28 sm:top-[340px]"></div>
        <div className="flex flex-col gap-4 sm:px-8">
          <h1 className="z-20 font-semibold text-lg mt-[-36px] pl-4 sm:text-xl">
            {selectedOwnBlueprint.name}
          </h1>
          <div className="flex flex-col gap-3 px-9">
            <div className="grid grid-cols-2 gap-3 font-mono">
              <p className="col-span-1 text-light-gray">Blueprint ID</p>
              <p className="col-span-1">{selectedOwnBlueprint.id}</p>
            </div>
            <div className="grid grid-cols-2 items-start gap-2 font-mono sm:flex-row sm:items-center">
              <p className="text-light-gray">Address</p>
              <div className=" flex justify-start items-center gap-1">
                {selectedOwnBlueprint.creator.substring(0, 5)}...
                {selectedOwnBlueprint.creator.slice(-5)}
                {/* {selectedOwnBlueprint.creator} */}
                <div className="relative">
                  <Icon
                    className="w-5 h-5 cursor-pointer"
                    icon="solar:copy-outline"
                    onClick={handleCopyButtonClicked}
                  />
                  {isCopied && (
                    <div
                      className="absolute right-0 -top-10 px-4 py-2 bg-gray-700 text-white text-xs rounded-lg transition-opacity opacity-100"
                      style={{ transition: 'opacity 0.3s' }}
                    >
                      Copied!
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 items-center gap-3 font-mono">
              <p className=" text-light-gray">Blueprint Amount</p>
              <div className="grid sm:grid-cols-2 grid-cols-1 items-center gap-2">
                <input
                  id="blueprint-mint-amount"
                  name="blueprint-mint-amount"
                  className="inline h-8 w-[110px] rounded-xl border border-light-gray text-white text-lg bg-black py-1.5 px-2 leading-5 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                  onChange={handleInputChange}
                  value={blueprintMintAmountValue}
                />
                <div className="flex items-center gap-2">
                  <CustomCheckbox
                    checked={maxChecked}
                    onChange={fillMaxAmount}
                  />
                  <p className="truncate">Max Amount</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center sm:px-[45px] px-[50px] items-center gap-10 pt-10 xs:gap-6 sm:pt-6">
              <Button
                className="flex justify-center w-[160px] !h-9 rounded-xl"
                text="Cancel"
                variant="secondary"
                onClick={() => navigate('/product')}
              />
              <Button
                onClick={toggleModal}
                className="flex justify-center w-[160px] h-9 rounded-xl"
                text="Approve"
                variant="primary"
              />
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div
          id="default-modal"
          aria-hidden="true"
          // tabIndex={-1}
          className="fixed top-0 z-50 flex justify-center items-center h-modal md:h-full inset-0 "
          style={{ backdropFilter: 'blur(5px)' }}
          onClick={closeModal}
        >
          <div className="relative p-4 sm:w-[1000px] xs:w-[500px] w-[400px]">
            <div className="relative bg-[#011018] border border-[#09F5D8]/20 rounded-[32px] shadow">
              <h3 className="xs:text-[32px] text-[22px] py-6 font-semibold text-center text-white">
                Mint Product
              </h3>
              <div className="flex flex-col items-center p-6 border-t border-gray-200 rounded-b">
                {selectedOwnData.data.erc20Data.map((dataItem, index) => (
                  <ProductListCard
                    isDecompose={false}
                    key={index}
                    {...dataItem}
                    type={0}
                  />
                ))}
                {selectedOwnData.data.erc721Data.map((dataItem, index) => (
                  <ProductListCard
                    isDecompose={false}
                    key={index}
                    {...dataItem}
                    type={1}
                  />
                ))}
                {selectedOwnData.data.erc1155Data.map((dataItem, index) => (
                  <ProductListCard
                    isDecompose={false}
                    key={index}
                    {...dataItem}
                    type={2}
                  />
                ))}

                <div className="flex justify-center px-[60px] items-center md:gap-32 gap-8 pt-10 sm:pt-6">
                  <Button
                    className="flex justify-center xs:w-[160px] w-[140px] !h-9 rounded-xl"
                    text="Cancel"
                    variant="secondary"
                    onClick={toggleModal}
                  />
                  <Button
                    onClick={handleMintProduct}
                    className="flex justify-center xs:w-[160px] w-[140px] h-9 rounded-xl"
                    text="Mint Product"
                    variant="primary"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default MintProductPage;
