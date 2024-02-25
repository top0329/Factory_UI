import CoreRoutes from './routes';
import DefaultBlueprintCard from './components/Cards/BlueprintCard/default';
import { MyBlueprintCard } from './components/Cards/BlueprintCard/mycard';
import { MyOwnBlueprintCard } from './components/Cards/BlueprintCard/myown';
import { OwnBlueprintCard } from './components/Cards/BlueprintCard/own';
import { ProductBlueprintCard } from './components/Cards/BlueprintCard/product';
import { UserBlueprintCard } from './components/Cards/BlueprintCard/user';
import BlueprintInfoCard from './components/Cards/BlueprintInfoCard/BlueprintInfoCard';
import BlueprintUpdateCard from './components/Cards/BlueprintInfoCard/BlueprintUpdateCard';
import AdvancedFilter from './components/SearchBar/AdvancedFilter';
import SortBy from './components/SearchBar/SortBy';

import robot from './assets/svg/robot.svg';
import copper from './assets/images/copper_ERC20.webp';
import key721 from './assets/images/key_ERC721.webp';
import axeIron from './assets/images/axe_iron_wood_ERC1155.webp';
import pickAxe from './assets/images/pickaxe_iron_wood_ERC1155.webp';
import woodShield from './assets/images/Shield_wood_ERC1155.webp';
import ironShield from './assets/images/Shield_iron_ERC1155.webp';
import ApproveBlueprintModal from './components/Modals/ApproveBlueprintModal';
import MintProductModal from './components/Modals/MintProductModal';
import DecomposeProductModal from './components/Modals/DecomposeProductModal';
import ERC20DecomposeListCard from './components/Cards/ListCard/ERC20DecomposeListCard';
import ERC721DecomposeListCard from './components/Cards/ListCard/ERC721DecomposeListCard';
import ERC1155DecomposeListCard from './components/Cards/ListCard/ERC1155DecomposeListCard';
import ERC20MintListCard from './components/Cards/ListCard/ERC20MintListCard';
import ERC721MintListCard from './components/Cards/ListCard/ERC721MintListCard';
import ERC1155MintListCard from './components/Cards/ListCard/ERC1155MintListCard';
function App() {
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <ApproveBlueprintModal />
      <DecomposeProductModal />

      <MintProductModal />

      <ERC20DecomposeListCard
        uri={pickAxe}
        type={'Blueprint'}
        name={'PickAxe Blueprint'}
        address={'0xdAC17F958D2ee523a2206206994597C13D831ec7'}
        amount={100}
      />
      <ERC721DecomposeListCard
        uri={copper}
        type={'ERC20'}
        name={'Copper ERC20'}
        address={'0xdAC17F958D2ee523a2206206994597C13D831ec7'}
        id={3}
      />
      <ERC1155DecomposeListCard
        uri={key721}
        type={'ERC721'}
        name={'Key 721'}
        address={'0xdAC17F958D2ee523a2206206994597C13D831ec7'}
        id={3}
        amount={100}
      />

      <ERC20MintListCard
        uri={copper}
        type={'ERC20'}
        name={'Copper ERC20'}
        address={'0xdAC17F958D2ee523a2206206994597C13D831ec7'}
        amount={100}
      />
      <ERC721MintListCard
        uri={key721}
        type={'ERC721'}
        name={'Key 721'}
        address={'0xdAC17F958D2ee523a2206206994597C13D831ec7'}
        id={3}
      />
      <ERC1155MintListCard
        uri={axeIron}
        type={'ERC1155'}
        name={'Axe Iron ERC1155'}
        address={'0xdAC17F958D2ee523a2206206994597C13D831ec7'}
        id={3}
        amount={100}
      />

      <SortBy />

      <BlueprintUpdateCard />
      <BlueprintInfoCard />
      <AdvancedFilter />
      <ProductBlueprintCard
        imageLink={woodShield}
        name="WoodShield"
        blueprintid={28}
        tsupply={100}
        address="0x55d398326f99059ff775485246999027b3197955"
      />

      <MyOwnBlueprintCard
        imageLink={ironShield}
        name="IronShield"
        blueprintid={28}
        tsupply={100}
        address="0x55d398326f99059ff775485246999027b3197955"
      />

      <OwnBlueprintCard
        imageLink={woodShield}
        name="WoodShield"
        blueprintid={28}
        tsupply={100}
        address="0x55d398326f99059ff775485246999027b3197955"
      />

      <DefaultBlueprintCard
        imageLink={woodShield}
        name="WoodShield"
        blueprintid={28}
        tsupply={100}
        mintPrice={0.001}
        mintLimit={100}
      />

      <MyBlueprintCard
        imageLink={ironShield}
        name="IronShield"
        blueprintid={28}
        tsupply={100}
        mintPrice={0.001}
        mintLimit={100}
      />

      <UserBlueprintCard
        imageLink={woodShield}
        name="WoodShield"
        blueprintid={28}
        tsupply={100}
        mintPrice={0.001}
        mintLimit={100}
      />
      <CoreRoutes />
    </div>
  );
}

export default App;
