import ComponentButton from '../../components/Button/ComponentButton';
import BlueprintInfoCard from '../../components/Cards/BlueprintInfoCard/BlueprintInfoCard';
import ERC1155Card from '../../components/Cards/ComponentCard/ERC1155Card';
import ERC20Card from '../../components/Cards/ComponentCard/ERC20Card';
import AddComponentModal from '../../components/Modals/AddComponentModal';

const NewBlueprintPage = () => {
  return (
    <div className="text-white">
      <div className="flex justify-between items-center py-3">
        <h1 className="text-lg xs:text-xl lg:text-2xl xl:text-3xl">
          New Blueprint
        </h1>
        <h3 className="text-sm xs:text-base lg:text-lg xl:text-xl">
          Available Component: <span>7</span>
        </h3>
      </div>
      <div className="flex flex-col pt-6 pb-16 gap-4 lg:gap-6 xs:flex-row">
        <div className="min-w-48 w-full md:w-auto lg:min-w-72 md:min-w-52 sm:min-w-64">
          <BlueprintInfoCard />
        </div>
        <div className="w-full grid grid-cols-2 gap-4 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 xs:grid-cols-1">
          <ComponentButton />
          <ERC20Card
            name={'Tea Leaf'}
            uri={
              'https://indigo-payable-walrus-596.mypinata.cloud/ipfs/QmZHBY1MB1AzZttMc1WkPiUM68ZqjUkBxxv87znCmfkHQY/tea_leaf_20.webp'
            }
            amount={1000}
            address={'0x48C281DB38eAD8050bBd821d195FaE85A235d8fc'}
            icon
          />
          <ERC1155Card
            id={83}
            name={'Glass Cup'}
            uri={
              'https://indigo-payable-walrus-596.mypinata.cloud/ipfs/QmZHBY1MB1AzZttMc1WkPiUM68ZqjUkBxxv87znCmfkHQY/glass_cup_1155.webp'
            }
            amount={1000}
            address={'0x48C281DB38eAD8050bBd821d195FaE85A235d8fc'}
            icon
          />
          <ERC20Card
            name={'Water'}
            uri={
              'https://indigo-payable-walrus-596.mypinata.cloud/ipfs/QmZHBY1MB1AzZttMc1WkPiUM68ZqjUkBxxv87znCmfkHQY/water_20.webp'
            }
            amount={1000}
            address={'0x48C281DB38eAD8050bBd821d195FaE85A235d8fc'}
            icon
          />
          <ERC20Card
            name={'Water'}
            uri={
              'https://indigo-payable-walrus-596.mypinata.cloud/ipfs/QmZHBY1MB1AzZttMc1WkPiUM68ZqjUkBxxv87znCmfkHQY/water_20.webp'
            }
            amount={1000}
            address={'0x48C281DB38eAD8050bBd821d195FaE85A235d8fc'}
            icon
          />
          <ERC20Card
            name={'Water'}
            uri={
              'https://indigo-payable-walrus-596.mypinata.cloud/ipfs/QmZHBY1MB1AzZttMc1WkPiUM68ZqjUkBxxv87znCmfkHQY/water_20.webp'
            }
            amount={1000}
            address={'0x48C281DB38eAD8050bBd821d195FaE85A235d8fc'}
            icon
          />
          <ERC20Card
            name={'Suger'}
            uri={
              'https://indigo-payable-walrus-596.mypinata.cloud/ipfs/QmZHBY1MB1AzZttMc1WkPiUM68ZqjUkBxxv87znCmfkHQY/suger_20.webp'
            }
            amount={1000}
            address={'0x48C281DB38eAD8050bBd821d195FaE85A235d8fc'}
            icon
          />
          <ERC1155Card
            id={82}
            name={'Lemon'}
            uri={
              'https://indigo-payable-walrus-596.mypinata.cloud/ipfs/QmZHBY1MB1AzZttMc1WkPiUM68ZqjUkBxxv87znCmfkHQY/lemon_1155.webp'
            }
            amount={1000}
            address={'0x48C281DB38eAD8050bBd821d195FaE85A235d8fc'}
            icon
          />
        </div>
      </div>
      <AddComponentModal />
    </div>
  );
};

export default NewBlueprintPage;
