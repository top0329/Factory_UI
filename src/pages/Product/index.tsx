import { useState } from 'react';
import Button from '../../components/Button';
import pickAxe from '../../assets/images/development/pickaxe-iron-wood-erc1155.webp';
import OwnBlueprintCard from '../../components/Cards/BlueprintCard/OwnBlueprintCard';
import OwnBlueprintDetailsDrawer from '../../components/Drawers/OwnBlueprintDetailsDrawer';

const ProductPage = () => {
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
    <div className="text-white">
      <div className="grid grid-cols-4">
        <OwnBlueprintCard
          uri={pickAxe}
          name="PickAxe"
          blueprintId={5}
          totalSupply={1000}
          address="0xdE336E2d7c8E875a7E73fB6Ccf23cfDA96135D22"
          myCardBadge={false}
        />
        <OwnBlueprintCard
          uri={pickAxe}
          name="PickAxe"
          blueprintId={5}
          totalSupply={1000}
          address="0xdE336E2d7c8E875a7E73fB6Ccf23cfDA96135D22"
          myCardBadge={false}
        />
        <OwnBlueprintCard
          uri={pickAxe}
          name="PickAxe"
          blueprintId={5}
          totalSupply={1000}
          address="0xdE336E2d7c8E875a7E73fB6Ccf23cfDA96135D22"
          myCardBadge={false}
        />
        <OwnBlueprintCard
          uri={pickAxe}
          name="PickAxe"
          blueprintId={5}
          totalSupply={1000}
          address="0xdE336E2d7c8E875a7E73fB6Ccf23cfDA96135D22"
          myCardBadge={false}
        />
      </div>
      <Button
        text="Click here to see OwnBlueprintDetailsDrawer"
        className="my-6"
        onClick={showSidebar}
      />
      <OwnBlueprintDetailsDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </div>
  );
};

export default ProductPage;
