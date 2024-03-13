import { useAtom } from 'jotai';

import ERC1155Card from '../../components/Cards/ComponentCard/ERC1155Card';
import ERC20Card from '../../components/Cards/ComponentCard/ERC20Card';
import AddComponentModal from '../../components/Modals/AddComponentModal';
import {
  availableComponentAtom,
  selectedBlueprintAtom,
} from '../../jotai/atoms';
import ERC721Card from '../../components/Cards/ComponentCard/ERC721Card';
import { ERC1155Data, ERC20Data, ERC721Data } from '../../types';
import { useEffect } from 'react';
import BlueprintUpdateCard from '../../components/Cards/BlueprintInfoCard/BlueprintUpdateCard';

const UpdateBlueprintPage = () => {
  const [selectedBlueprint, setSelectedBlueprint] = useAtom(
    selectedBlueprintAtom
  );
  const [availableComponent, setAvailableComponent] = useAtom(
    availableComponentAtom
  );

  useEffect(() => {
    setAvailableComponent(
      7 -
        (selectedBlueprint.data.erc20Data.length +
          selectedBlueprint.data.erc721Data.length +
          selectedBlueprint.data.erc1155Data.length)
    );
  }, [
    selectedBlueprint.data.erc1155Data.length,
    selectedBlueprint.data.erc20Data.length,
    selectedBlueprint.data.erc721Data.length,
    setAvailableComponent,
  ]);

  const handleDeleteERC20CardClicked = (erc20: ERC20Data) => {
    const filteredERC20Data = selectedBlueprint.data.erc20Data.filter(
      (item) => {
        return item.address !== erc20.address;
      }
    );
    setSelectedBlueprint({
      ...selectedBlueprint,
      data: {
        ...selectedBlueprint.data,
        erc20Data: filteredERC20Data,
      },
    });
    setAvailableComponent((prevValue) => prevValue + 1);
  };

  const handleDeleteERC721CardClicked = (erc721: ERC721Data) => {
    const filteredERC721Data = selectedBlueprint.data.erc721Data.filter(
      (item) => {
        return item.address !== erc721.address || item.id !== erc721.id;
      }
    );
    setSelectedBlueprint({
      ...selectedBlueprint,
      data: {
        ...selectedBlueprint.data,
        erc721Data: filteredERC721Data,
      },
    });
    setAvailableComponent((prevValue) => prevValue + 1);
  };

  const handleDeleteERC1155CardClicked = (erc1155: ERC1155Data) => {
    const filteredERC1155Data = selectedBlueprint.data.erc1155Data.filter(
      (item) => {
        return item.address !== erc1155.address || item.id !== erc1155.id;
      }
    );
    setSelectedBlueprint({
      ...selectedBlueprint,
      data: {
        ...selectedBlueprint.data,
        erc1155Data: filteredERC1155Data,
      },
    });
    setAvailableComponent((prevValue) => prevValue + 1);
  };

  return (
    <div className="text-white">
      <div className="flex justify-between items-center py-3">
        <h1 className="text-lg xs:text-xl lg:text-2xl xl:text-3xl">
          Recreate Blueprint
        </h1>
        <h3 className="text-sm xs:text-base lg:text-lg xl:text-xl">
          Available Component: <span>{availableComponent}</span>
        </h3>
      </div>
      <div className="flex flex-col pt-6 pb-16 gap-4 lg:gap-6 xs:flex-row">
        <div className="min-w-48 w-full md:w-auto lg:min-w-72 md:min-w-52 sm:min-w-64">
          <BlueprintUpdateCard />
        </div>
        <div className="w-full grid grid-cols-2 gap-4 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 xs:grid-cols-1">
          {selectedBlueprint.data.erc20Data.map((erc20, idx) => {
            return (
              <ERC20Card
                key={idx}
                name={erc20.name}
                uri={erc20.uri}
                amount={erc20.amount}
                address={erc20.address}
                icon
                onDeleteIconClicked={() => handleDeleteERC20CardClicked(erc20)}
              />
            );
          })}
          {selectedBlueprint.data.erc721Data.map((erc721) => {
            return (
              <ERC721Card
                key={erc721.id}
                id={erc721.id}
                name={erc721.name}
                uri={erc721.uri}
                address={erc721.address}
                icon
                onDeleteIconClicked={() =>
                  handleDeleteERC721CardClicked(erc721)
                }
              />
            );
          })}
          {selectedBlueprint.data.erc1155Data.map((erc1155) => {
            return (
              <ERC1155Card
                key={erc1155.id}
                id={erc1155.id}
                name={erc1155.name}
                uri={erc1155.uri}
                amount={erc1155.amount}
                address={erc1155.address}
                icon
                onDeleteIconClicked={() =>
                  handleDeleteERC1155CardClicked(erc1155)
                }
              />
            );
          })}
        </div>
      </div>
      <AddComponentModal />
    </div>
  );
};

export default UpdateBlueprintPage;
