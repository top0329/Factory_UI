import { useState } from 'react';
// import Button from '../../components/Button';
import OwnBlueprintCard from '../../components/Cards/BlueprintCard/OwnBlueprintCard';
import SearchBar from '../../components/SearchBar';
import OwnBlueprintDetailsDrawer from '../../components/Drawers/OwnBlueprintDetailsDrawer';
import BlueprintCard from '../../components/Cards/BlueprintCard/BlueprintCard';

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
    <div className="flex flex-col min-w-[320px] gap-2 text-white">
      <div>
        <SearchBar />
      </div>
      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-2 lg:grid-cols-4 xl:grid-cols-5">
        <div className="flex justify-center">
          <OwnBlueprintCard
            uri="https://indigo-payable-walrus-596.mypinata.cloud/ipfs/QmZHBY1MB1AzZttMc1WkPiUM68ZqjUkBxxv87znCmfkHQY/siliver_coin_1155.webp"
            name="Silver Coin"
            blueprintId={5}
            balance={1000}
            address="0xdE336E2d7c8E875a7E73fB6Ccf23cfDA96135D22"
            myCardBadge={true}
            onClick={showSidebar}
          />
        </div>
        <div className="flex justify-center">
          <OwnBlueprintCard
            uri="https://indigo-payable-walrus-596.mypinata.cloud/ipfs/QmZHBY1MB1AzZttMc1WkPiUM68ZqjUkBxxv87znCmfkHQY/milk_tea_1155.webp"
            name="Milk Tea"
            blueprintId={5}
            balance={1000}
            address="0xdE336E2d7c8E875a7E73fB6Ccf23cfDA96135D22"
            myCardBadge={false}
            onClick={showSidebar}
          />
        </div>
        <div className="flex justify-center">
          <BlueprintCard
            blueprintId={95}
            mintUnit={0}
            mintLimit={10000}
            mintPrice={0.001}
            totalSupply={100000000}
            name="Ironn Sword"
            uri="https://indigo-payable-walrus-596.mypinata.cloud/ipfs/QmZHBY1MB1AzZttMc1WkPiUM68ZqjUkBxxv87znCmfkHQY/pickaxe_iron_wood_1155.webp"
            onClick={showSidebar}
          />{' '}
        </div>
        <div className="flex justify-center">
          <OwnBlueprintCard
            uri="https://indigo-payable-walrus-596.mypinata.cloud/ipfs/QmZHBY1MB1AzZttMc1WkPiUM68ZqjUkBxxv87znCmfkHQY/coffee_1155.webp"
            name="Coffee"
            blueprintId={5}
            balance={1000}
            address="0xdE336E2d7c8E875a7E73fB6Ccf23cfDA96135D22"
            myCardBadge={true}
            onClick={showSidebar}
          />
        </div>
        <div className="flex justify-center">
          <OwnBlueprintCard
            uri="https://indigo-payable-walrus-596.mypinata.cloud/ipfs/QmZHBY1MB1AzZttMc1WkPiUM68ZqjUkBxxv87znCmfkHQY/Lemon_tea_1155.webp"
            name="Lemon Tea"
            blueprintId={5}
            balance={1000}
            address="0xdE336E2d7c8E875a7E73fB6Ccf23cfDA96135D22"
            myCardBadge={false}
            onClick={showSidebar}
          />
        </div>
        <div className="flex justify-center">
          <OwnBlueprintCard
            uri="https://indigo-payable-walrus-596.mypinata.cloud/ipfs/QmZHBY1MB1AzZttMc1WkPiUM68ZqjUkBxxv87znCmfkHQY/oat%20milk%20latte_1155.webp"
            name="Oat Milk Latte"
            blueprintId={5}
            balance={1000}
            address="0xdE336E2d7c8E875a7E73fB6Ccf23cfDA96135D22"
            myCardBadge={false}
            onClick={showSidebar}
          />
        </div>
        <div className="flex justify-center">
          <BlueprintCard
            blueprintId={95}
            mintLimit={10000}
            mintUnit={2}
            mintPrice={0.001}
            totalSupply={100000000}
            name="Gold Coins"
            myCardBadge={true}
            uri="https://indigo-payable-walrus-596.mypinata.cloud/ipfs/QmZHBY1MB1AzZttMc1WkPiUM68ZqjUkBxxv87znCmfkHQY/gold_coin_1155.webp"
            onClick={showSidebar}
          />
        </div>
      </div>
      <OwnBlueprintDetailsDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </div>
  );
};

export default ProductPage;
