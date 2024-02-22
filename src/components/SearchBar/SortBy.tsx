import { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

export default function SortBy() {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedItem, setSelectedItem] = useState('Sort By');
  const handleClick = () => {
    setShowOptions(true);
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="flex gap-2 items-center text-center w-[132px] bg-[#000000] text-[#FFFFFF]/30 border-[0.5px] border-[#B1B1B1] rounded-lg py-1 px-2 text-xs"
      >
        <Icon
          icon="iconamoon:sorting-left"
          className="text-light-gray w-6 h-6"
        />
        {selectedItem}
      </button>
      <div
        className={`flex flex-col cursor-pointer transition-all duration-300 bg-[#000000] text-white/30 px-4 py-2 gap-y-2 text-[10px] ${
          showOptions ? 'h-auto opacity-100' : 'h-0 opacity-0'
        }`}
      >
        <p
          onClick={() => {
            setShowOptions(false);
            setSelectedItem('Blueprint Id');
          }}
          className={`${
            selectedItem == 'Blueprint Id' ? 'bg-[#232323]' : 'bg-[#000000]'
          }`}
        >
          Blueprint Id
        </p>
        <p
          onClick={() => {
            setShowOptions(false);
            setSelectedItem('Blueprint Name');
          }}
          className={`${
            selectedItem == 'Blueprint Name' ? 'bg-[#232323]' : 'bg-[#000000]'
          }`}
        >
          Blueprint Name
        </p>
        <p
          onClick={() => {
            setShowOptions(false);
            setSelectedItem('Total Supply');
          }}
          className={`${
            selectedItem == 'Total Supply' ? 'bg-[#232323]' : 'bg-[#000000]'
          }`}
        >
          Total Supply
        </p>
        <p
          onClick={() => {
            setShowOptions(false);
            setSelectedItem('Mint Limit');
          }}
          className={`${
            selectedItem == 'Mint Limit' ? 'bg-[#232323]' : 'bg-[#000000]'
          }`}
        >
          Mint Limit
        </p>
        <p
          onClick={() => {
            setShowOptions(false);
            setSelectedItem('Mint Price');
          }}
          className={`${
            selectedItem == 'Mint Price' ? 'bg-[#232323]' : 'bg-[#000000]'
          }`}
        >
          Mint Price
        </p>
      </div>
    </div>
  );
}
