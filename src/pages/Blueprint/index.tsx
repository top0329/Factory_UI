import React, { useState } from 'react';

import SearchBar from '../../components/SearchBar';
import BlueprintDetailDrawer from '../../components/Drawers/BlueprintDetailsDrawer';
import Button from '../../components/Button';
import ERC20Card from '../../components/Cards/ComponentCard/ERC20Card';
import ERC721Card from '../../components/Cards/ComponentCard/ERC721Card';
import ERC1155Card from '../../components/Cards/ComponentCard/ERC1155Card';
import AddComponentModal from '../../components/Modals/AddComponentModal';
import ComponentButton from '../../components/Button/ComponentButton';
import MintBlueprintModal from '../../components/Modals/MintBlueprintModal';
import Copper from '../../assets/images/development/copper-erc20.webp';
import Key from '../../assets/images/development/key-erc721.webp';
import IronSheild from '../../assets/images/development/shield-iron-erc1155.webp';

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
      <Button
        text="Click here to see BlueprintDetailsDrawer"
        className="my-6"
        onClick={showSidebar}
      />
      <ComponentButton />
      <div className="flex flex-col my-12 gap-3">
        <ERC20Card imageUrl={Copper} icon />
        <ERC721Card imageUrl={Key} />
        <ERC1155Card imageUrl={IronSheild} />
      </div>
      <BlueprintDetailDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
      <AddComponentModal />
      <MintBlueprintModal />
    </React.Fragment>
  );
};

export default BlueprintPage;
