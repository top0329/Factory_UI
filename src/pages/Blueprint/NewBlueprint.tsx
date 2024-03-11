import { useAtom } from 'jotai';

import ComponentButton from '../../components/Button/ComponentButton';
import BlueprintInfoCard from '../../components/Cards/BlueprintInfoCard/BlueprintInfoCard';
import ERC1155Card from '../../components/Cards/ComponentCard/ERC1155Card';
import ERC20Card from '../../components/Cards/ComponentCard/ERC20Card';
import AddComponentModal from '../../components/Modals/AddComponentModal';
import { availableComponentAtom, createBlueprintAtom } from '../../jotai/atoms';
import ERC721Card from '../../components/Cards/ComponentCard/ERC721Card';

const NewBlueprintPage = () => {
  const [createBlueprint] = useAtom(createBlueprintAtom);
  const [availableComponent] = useAtom(availableComponentAtom);

  return (
    <div className="text-white">
      <div className="flex justify-between items-center py-3">
        <h1 className="text-lg xs:text-xl lg:text-2xl xl:text-3xl">
          New Blueprint
        </h1>
        <h3 className="text-sm xs:text-base lg:text-lg xl:text-xl">
          Available Component: <span>{availableComponent}</span>
        </h3>
      </div>
      <div className="flex flex-col pt-6 pb-16 gap-4 lg:gap-6 xs:flex-row">
        <div className="min-w-48 w-full md:w-auto lg:min-w-72 md:min-w-52 sm:min-w-64">
          <BlueprintInfoCard />
        </div>
        <div className="w-full grid grid-cols-2 gap-4 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 xs:grid-cols-1">
          <ComponentButton />
          {createBlueprint.data.erc20Data.map((erc20, idx) => {
            return (
              <ERC20Card
                key={idx}
                name={erc20.name}
                uri={erc20.uri}
                amount={erc20.amount}
                address={erc20.address}
                icon
              />
            );
          })}
          {createBlueprint.data.erc721Data.map((erc721) => {
            return (
              <ERC721Card
                key={erc721.id}
                id={erc721.id}
                name={erc721.name}
                uri={erc721.uri}
                address={erc721.address}
                icon
              />
            );
          })}
          {createBlueprint.data.erc1155Data.map((erc1155) => {
            return (
              <ERC1155Card
                key={erc1155.id}
                id={erc1155.id}
                name={erc1155.name}
                uri={erc1155.uri}
                amount={erc1155.amount}
                address={erc1155.address}
                icon
              />
            );
          })}
        </div>
      </div>
      <AddComponentModal />
    </div>
  );
};

export default NewBlueprintPage;
