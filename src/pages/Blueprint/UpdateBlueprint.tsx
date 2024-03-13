import { useAtom } from 'jotai';
import { Toaster } from 'react-hot-toast';

import BlueprintInfoCard from '../../components/Cards/BlueprintInfoCard/BlueprintInfoCard';
import ERC1155Card from '../../components/Cards/ComponentCard/ERC1155Card';
import ERC20Card from '../../components/Cards/ComponentCard/ERC20Card';
import {
  availableComponentAtom,
  createBlueprintAtom,
  selectedBlueprintAtom,
} from '../../jotai/atoms';
import ERC721Card from '../../components/Cards/ComponentCard/ERC721Card';
import { ERC1155Data, ERC20Data, ERC721Data } from '../../types';
import { useEffect } from 'react';

const UpdateBlueprintPage = () => {
  const [selectedBlueprint] = useAtom(selectedBlueprintAtom);
  const [createBlueprint, setCreateBlueprint] = useAtom(createBlueprintAtom);
  const [, setAvailableComponent] = useAtom(
    availableComponentAtom
  );

  useEffect(() => {
    setCreateBlueprint(selectedBlueprint);
  }, [selectedBlueprint, setCreateBlueprint]);

  useEffect(() => {
    setAvailableComponent(
      7 -
        (createBlueprint.data.erc20Data.length +
          createBlueprint.data.erc721Data.length +
          createBlueprint.data.erc1155Data.length)
    );
  }, [
    createBlueprint.data.erc1155Data.length,
    createBlueprint.data.erc20Data.length,
    createBlueprint.data.erc721Data.length,
    setAvailableComponent,
  ]);

  const handleDeleteERC20CardClicked = (erc20: ERC20Data) => {
    const filteredERC20Data = createBlueprint.data.erc20Data.filter((item) => {
      return item.address !== erc20.address;
    });
    setCreateBlueprint({
      ...createBlueprint,
      data: {
        ...createBlueprint.data,
        erc20Data: filteredERC20Data,
      },
    });
    setAvailableComponent((prevValue) => prevValue + 1);
  };

  const handleDeleteERC721CardClicked = (erc721: ERC721Data) => {
    const filteredERC721Data = createBlueprint.data.erc721Data.filter(
      (item) => {
        return item.address !== erc721.address || item.id !== erc721.id;
      }
    );
    setCreateBlueprint({
      ...createBlueprint,
      data: {
        ...createBlueprint.data,
        erc721Data: filteredERC721Data,
      },
    });
    setAvailableComponent((prevValue) => prevValue + 1);
  };

  const handleDeleteERC1155CardClicked = (erc1155: ERC1155Data) => {
    const filteredERC1155Data = createBlueprint.data.erc1155Data.filter(
      (item) => {
        return item.address !== erc1155.address || item.id !== erc1155.id;
      }
    );
    setCreateBlueprint({
      ...createBlueprint,
      data: {
        ...createBlueprint.data,
        erc1155Data: filteredERC1155Data,
      },
    });
    setAvailableComponent((prevValue) => prevValue + 1);
  };

  return (
    <div className="text-white">
      <div className="flex justify-between items-center py-3">
        <h1 className="text-lg xs:text-xl lg:text-2xl xl:text-3xl">
          Update Blueprint
        </h1>
      </div>
      <div className="flex flex-col pt-6 pb-16 gap-4 lg:gap-6 xs:flex-row">
        <div className="min-w-48 w-full md:w-auto lg:min-w-72 md:min-w-52 sm:min-w-64">
          <BlueprintInfoCard isRecreate = {false} />
        </div>
        <div className="w-full grid grid-cols-2 gap-4 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 xs:grid-cols-1">

          {createBlueprint.data.erc20Data.map((erc20, idx) => {
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
          {createBlueprint.data.erc721Data.map((erc721) => {
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
                onDeleteIconClicked={() =>
                  handleDeleteERC1155CardClicked(erc1155)
                }
              />
            );
          })}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default UpdateBlueprintPage;
