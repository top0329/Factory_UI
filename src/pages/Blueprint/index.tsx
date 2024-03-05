import React, { useState } from 'react';

import SearchBar from '../../components/SearchBar';
import BlueprintDetailDrawer from '../../components/Drawers/BlueprintDetailsDrawer';
import BlueprintCard from '../../components/Cards/BlueprintCard/BlueprintCard';

const BlueprintPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isCreatorMode, setIsCreatorMode] = useState<boolean>(false);

  // FUNCTION TO HANDLE OPEN ACTION ON SIDEDRAWER/MODAL
  const showSidebar = () => {
    setIsDrawerOpen(true);

    // Disables Background Scrolling whilst the SideDrawer/Modal is open
    if (typeof window != 'undefined' && window.document) {
      document.body.style.overflow = 'hidden';
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCreatorMode(event.target.checked);
  };

  return (
    <React.Fragment>
      <div className="flex justify-between items-center py-3">
        <h1 className="text-xl text-white 2xl:text-4xl lg:text-3xl md:text-2xl">
          Blueprint
        </h1>
        <div className="flex justify-between items-center gap-4">
          <h4 className="text-light-gray text-base">Creator Mode</h4>
          <label className="flex flex-col cursor-pointer select-none items-start gap-2">
            <div className="relative">
              <input
                name="creator-mode"
                type="checkbox"
                checked={isCreatorMode}
                onChange={handleCheckboxChange}
                className="sr-only"
              />
              <div
                className={`box block h-6 w-10 rounded-full ${
                  isCreatorMode ? 'bg-primary' : 'bg-light-gray'
                }`}
              ></div>
              <div
                className={`absolute left-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white transition ${
                  isCreatorMode ? 'translate-x-full' : ''
                }`}
              ></div>
            </div>
          </label>
        </div>
      </div>
      <SearchBar isNewButton />
      <div className="grid grid-cols-5 py-8 gap-8">
        <div className="col-span-1">
          <BlueprintCard
            blueprintId={1}
            mintLimit={100}
            mintPrice={0.001}
            name="Sword"
            totalSupply={100000000}
            uri="https://indigo-payable-walrus-596.mypinata.cloud/ipfs/QmZHBY1MB1AzZttMc1WkPiUM68ZqjUkBxxv87znCmfkHQY/iron%20sword.webp"
            onClick={showSidebar}
          />
        </div>
        <div className="col-span-1">
          <BlueprintCard
            blueprintId={1}
            mintLimit={100}
            mintPrice={0.001}
            name="Lemon Tea"
            totalSupply={100000000}
            uri="https://indigo-payable-walrus-596.mypinata.cloud/ipfs/QmZHBY1MB1AzZttMc1WkPiUM68ZqjUkBxxv87znCmfkHQY/Lemon_tea_1155.webp"
            onClick={showSidebar}
          />
        </div>
        <div className="col-span-1">
          <BlueprintCard
            blueprintId={1}
            mintLimit={100}
            mintPrice={0.001}
            name="Black Tea"
            totalSupply={100000000}
            uri="https://indigo-payable-walrus-596.mypinata.cloud/ipfs/QmZHBY1MB1AzZttMc1WkPiUM68ZqjUkBxxv87znCmfkHQY/black_tea_1155.webp"
            onClick={showSidebar}
          />
        </div>
        <div className="col-span-1">
          <BlueprintCard
            blueprintId={1}
            mintLimit={100}
            mintPrice={0.001}
            name="Coffee"
            totalSupply={100000000}
            uri="https://indigo-payable-walrus-596.mypinata.cloud/ipfs/QmZHBY1MB1AzZttMc1WkPiUM68ZqjUkBxxv87znCmfkHQY/coffee_1155.webp"
            onClick={showSidebar}
          />
        </div>
        <div className="col-span-1">
          <BlueprintCard
            blueprintId={1}
            mintLimit={100}
            mintPrice={0.001}
            name="Copper Coin"
            totalSupply={100000000}
            uri="https://indigo-payable-walrus-596.mypinata.cloud/ipfs/QmZHBY1MB1AzZttMc1WkPiUM68ZqjUkBxxv87znCmfkHQY/copper_coin_1155.webp"
            onClick={showSidebar}
          />
        </div>
        <div className="col-span-1">
          <BlueprintCard
            blueprintId={1}
            mintLimit={100}
            mintPrice={0.001}
            name="Gold Coin"
            totalSupply={100000000}
            uri="https://indigo-payable-walrus-596.mypinata.cloud/ipfs/QmZHBY1MB1AzZttMc1WkPiUM68ZqjUkBxxv87znCmfkHQY/gold_coin_1155.webp"
            onClick={showSidebar}
          />
        </div>
        <div className="col-span-1">
          <BlueprintCard
            blueprintId={1}
            mintLimit={100}
            mintPrice={0.001}
            name="Milk Tea"
            totalSupply={100000000}
            uri="https://indigo-payable-walrus-596.mypinata.cloud/ipfs/QmZHBY1MB1AzZttMc1WkPiUM68ZqjUkBxxv87znCmfkHQY/milk_tea_1155.webp"
            onClick={showSidebar}
          />
        </div>
        <div className="col-span-1">
          <BlueprintCard
            blueprintId={1}
            mintLimit={100}
            mintPrice={0.001}
            name="Oat Milk Latte"
            totalSupply={100000000}
            uri="https://indigo-payable-walrus-596.mypinata.cloud/ipfs/QmZHBY1MB1AzZttMc1WkPiUM68ZqjUkBxxv87znCmfkHQY/oat%20milk%20latte_1155.webp"
            onClick={showSidebar}
          />
        </div>
        <div className="col-span-1">
          <BlueprintCard
            blueprintId={1}
            mintLimit={100}
            mintPrice={0.001}
            name="Silver Coin"
            totalSupply={100000000}
            uri="https://indigo-payable-walrus-596.mypinata.cloud/ipfs/QmZHBY1MB1AzZttMc1WkPiUM68ZqjUkBxxv87znCmfkHQY/siliver_coin_1155.webp"
            onClick={showSidebar}
          />
        </div>
      </div>
      <BlueprintDetailDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </React.Fragment>
  );
};

export default BlueprintPage;
