import { useState } from 'react';
// import Button from '../../components/Button';
import pickAxe from '../../assets/images/development/pickaxe-iron-wood-erc1155.webp';
import OwnBlueprintCard from '../../components/Cards/BlueprintCard/OwnBlueprintCard';
import SearchBar from '../../components/SearchBar';
import OwnBlueprintDetailsDrawer from '../../components/Drawers/OwnBlueprintDetailsDrawer';
import BlueprintCard from '../../components/Cards/BlueprintCard/BlueprintCard';
import SilverCoin from '../../assets/images/development/siliver-coin-erc1155.webp';
import MilkTea from '../../assets/images/development/milk-tea-erc1155.webp';
import Coffee from '../../assets/images/development/coffee-erc1155.webp';
import lemonTea from '../../assets/images/development/lemon-tea-erc1155.webp';
import OatMilkLatte from '../../assets/images/development/oat-milk-latte-erc1155.webp';
import PlasticCup from '../../assets/images/development/plastic-cup-erc1155.webp';
import Oats from '../../assets/images/development/oats-erc20.webp';
import GoldCoins from '../../assets/images/development/gold-coin-erc1155.webp';
import USDT from '../../assets/images/development/usdt-erc20.webp';

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
            uri={SilverCoin}
            name="Silversssssssssssss Coin"
            blueprintId={5}
            balance={1000}
            address="0xdE336E2d7c8E875a7E73fB6Ccf23cfDA96135D22"
            myCardBadge={true}
            onClick={showSidebar}
          />
        </div>
        <div className="flex justify-center">
          <OwnBlueprintCard
            uri={MilkTea}
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
            uri={pickAxe}
            onClick={showSidebar}
          />{' '}
        </div>
        <div className="flex justify-center">
          <OwnBlueprintCard
            uri={Coffee}
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
            uri={lemonTea}
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
            uri={OatMilkLatte}
            name="Oat Milk Latte"
            blueprintId={5}
            balance={1000}
            address="0xdE336E2d7c8E875a7E73fB6Ccf23cfDA96135D22"
            myCardBadge={false}
            onClick={showSidebar}
          />
        </div>
        <div className="flex justify-center">
          <OwnBlueprintCard
            uri={PlasticCup}
            name="Plastic Cup"
            blueprintId={5}
            balance={1000}
            address="0xdE336E2d7c8E875a7E73fB6Ccf23cfDA96135D22"
            myCardBadge={false}
            onClick={showSidebar}
          />
        </div>
        <div className="flex justify-center">
          <OwnBlueprintCard
            uri={Oats}
            name="Oats"
            blueprintId={5}
            balance={1000}
            address="0xdE336E2d7c8E875a7E73fB6Ccf23cfDA96135D22"
            myCardBadge={true}
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
            uri={GoldCoins}
            onClick={showSidebar}
          />
        </div>
        <div className="flex justify-center">
          <OwnBlueprintCard
            uri={USDT}
            name="USDT"
            blueprintId={5}
            balance={1000}
            address="0xdE336E2d7c8E875a7E73fB6Ccf23cfDA96135D22"
            myCardBadge={true}
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
