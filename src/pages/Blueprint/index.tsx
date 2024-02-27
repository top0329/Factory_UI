import React, { useState } from 'react';

import SearchBar from '../../components/SearchBar';
import BlueprintDetailDrawer from '../../components/Drawers/BlueprintDetailsDrawer';
import Button from '../../components/Button';
import ERC20Card from '../../components/Cards/ComponentCard/ERC20Card';
import ERC721Card from '../../components/Cards/ComponentCard/ERC721Card';
import ERC1155Card from '../../components/Cards/ComponentCard/ERC1155Card';
import Copper from '../../assets/images/development/copper_ERC20.webp';
import Key from '../../assets/images/development/key_ERC721.webp';
import IronSheild from '../../assets/images/development/shield_iron_ERC1155.webp';

const BlueprintPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // FUNCTION TO HANDLE OPEN ACTION ON SIDEDRAWER/MODAL
  const showSidebar = () => {
    setIsDrawerOpen(true);

    // Disables Background Scrolling whilst the SideDrawer/Modal is open
    if (typeof window != 'undefined' && window.document) {
      document.body.style.overflow = 'hidden';
    }
  };

  return (
    <React.Fragment>
      <SearchBar />
      <Button
        text="Click here to see BlueprintDetailsDrawer"
        className="my-6"
        onClick={showSidebar}
      />
      <div className="flex flex-col my-12 gap-3">
        <ERC20Card imageUrl={Copper} icon />
        <ERC721Card imageUrl={Key} />
        <ERC1155Card imageUrl={IronSheild} />
      </div>
      <BlueprintDetailDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </React.Fragment>
  );
};

export default BlueprintPage;
