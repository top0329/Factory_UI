import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';

import ComponentButton from '../../components/Button/ComponentButton';
import BlueprintInfoCard from '../../components/Cards/BlueprintInfoCard';
import ERC1155Card from '../../components/Cards/ComponentCard/ERC1155Card';
import ERC20Card from '../../components/Cards/ComponentCard/ERC20Card';
import AddComponentModal from '../../components/Modals/AddComponentModal';
import ERC721Card from '../../components/Cards/ComponentCard/ERC721Card';
import useWeb3 from '../../hooks/useWeb3';
import useToast from '../../hooks/useToast';
import {
  activeAddComponentTokenAtom,
  availableComponentAtom,
  createBlueprintAtom,
  isAddComponentModalAtom,
  isEditComponentModalAtom,
  selectedBlueprintAtom,
} from '../../jotai/atoms';
import {
  ERC1155Data,
  ERC20Data,
  ERC721Data,
  SelectedComponentData,
} from '../../types';
import UpdateComponentModal from '../../components/Modals/UpdateComponentModal';

const RecreateBlueprintPage = () => {
  const { factoryContract } = useWeb3();
  const { showToast } = useToast();

  const [selectedBlueprint] = useAtom(selectedBlueprintAtom);
  const [createBlueprint, setCreateBlueprint] = useAtom(createBlueprintAtom);
  const [availableComponent, setAvailableComponent] = useAtom(
    availableComponentAtom
  );
  const [, setIsAddComponentModalOpen] = useAtom<boolean>(
    isAddComponentModalAtom
  );
  const [, setIsEditComponentModalOpen] = useAtom<boolean>(
    isEditComponentModalAtom
  );
  const [, setActiveItem] = useAtom<number>(
    activeAddComponentTokenAtom
  );

  const [selectedComponentData, setSelectedComponentData] =
    useState<SelectedComponentData>({
      id: 0,
      tokenAddress: '',
      tokenId: 0,
      erc20Amount: 0n,
      erc1155Amount: 0,
    });

  useEffect(() => {
    setCreateBlueprint(selectedBlueprint);
  }, [selectedBlueprint, setCreateBlueprint]);

  useEffect(() => {
    async function init() {
      try {
        const availableComponentValue =
          await factoryContract.componentTokenLimit();
        setAvailableComponent(
          Number(availableComponentValue) -
            (createBlueprint.data.erc20Data.length +
              createBlueprint.data.erc721Data.length +
              createBlueprint.data.erc1155Data.length)
        );
      } catch (err) {
        console.log(err);
      }
    }
    init();
  }, [
    createBlueprint.data.erc1155Data.length,
    createBlueprint.data.erc20Data.length,
    createBlueprint.data.erc721Data.length,
    factoryContract,
    setAvailableComponent,
  ]);

  const handleAddComponentModalOpen = () => {
    if (availableComponent > 0) setIsAddComponentModalOpen(true);
    else {
      showToast('fail', 'Not able to add component tokens.');
      setIsAddComponentModalOpen(false);
    }
  };

  const handleEditERC20CardClicked = (erc20: ERC20Data, idx: number) => {
    setIsEditComponentModalOpen(true);
    setSelectedComponentData({
      id: idx,
      tokenAddress: erc20.tokenAddress,
      erc20Amount: erc20.amount,
    });
    setActiveItem(0);
  };

  const handleEditERC721CardClicked = (erc721: ERC721Data, idx: number) => {
    setIsEditComponentModalOpen(true);
    setSelectedComponentData({
      id: idx,
      tokenAddress: erc721.tokenAddress,
      tokenId: erc721.tokenId,
    });
    setActiveItem(1);
  };

  const handleEditERC1155CardClicked = (erc1155: ERC1155Data, idx: number) => {
    setIsEditComponentModalOpen(true);
    setSelectedComponentData({
      id: idx,
      tokenAddress: erc1155.tokenAddress,
      tokenId: erc1155.tokenId,
      erc1155Amount: erc1155.amount,
    });
    setActiveItem(2);
  };

  const handleDeleteERC20CardClicked = (erc20: ERC20Data) => {
    const filteredERC20Data = createBlueprint.data.erc20Data.filter((item) => {
      return item.tokenAddress !== erc20.tokenAddress;
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
        return (
          item.tokenAddress !== erc721.tokenAddress ||
          item.tokenId !== erc721.tokenId
        );
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
        return (
          item.tokenAddress !== erc1155.tokenAddress ||
          item.tokenId !== erc1155.tokenId
        );
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
          Recreate Blueprint
        </h1>
        <h3 className="text-sm fixed bg-primary rounded-full px-2 py-1 bottom-6 right-6 z-20 xs:text-base lg:text-lg xl:text-xl xs:block xs:static xs:bg-transparent">
          <span className="xs:hidden">Available</span>
          <span className="hidden xs:inline-block">
            Available Components
          </span>: <span>{availableComponent}</span>
        </h3>
      </div>
      <div className="flex flex-col pt-6 pb-16 gap-4 lg:gap-6 xs:flex-row">
        <div className="min-w-48 w-full md:w-auto lg:min-w-72 md:min-w-52 sm:min-w-64">
          <BlueprintInfoCard isRecreate />
        </div>
        <div className="w-full grid grid-cols-2 gap-4 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 xs:grid-cols-1">
          <ComponentButton
            disabled={availableComponent === 0}
            handleAddComponentModalOpen={handleAddComponentModalOpen}
          />
          {createBlueprint.data.erc20Data.map((erc20, idx) => {
            return (
              <ERC20Card
                key={idx}
                amount={erc20.amount}
                tokenAddress={erc20.tokenAddress}
                icon
                onEditIconClicked={() => handleEditERC20CardClicked(erc20, idx)}
                onDeleteIconClicked={() => handleDeleteERC20CardClicked(erc20)}
              />
            );
          })}
          {createBlueprint.data.erc721Data.map((erc721, idx) => {
            return (
              <ERC721Card
                key={erc721.tokenId}
                tokenId={erc721.tokenId}
                tokenAddress={erc721.tokenAddress}
                icon
                onEditIconClicked={() =>
                  handleEditERC721CardClicked(erc721, idx)
                }
                onDeleteIconClicked={() =>
                  handleDeleteERC721CardClicked(erc721)
                }
              />
            );
          })}
          {createBlueprint.data.erc1155Data.map((erc1155, idx) => {
            return (
              <ERC1155Card
                key={erc1155.tokenId}
                tokenId={erc1155.tokenId}
                amount={erc1155.amount}
                tokenAddress={erc1155.tokenAddress}
                icon
                onEditIconClicked={() =>
                  handleEditERC1155CardClicked(erc1155, idx)
                }
                onDeleteIconClicked={() =>
                  handleDeleteERC1155CardClicked(erc1155)
                }
              />
            );
          })}
        </div>
      </div>
      <AddComponentModal />
      <UpdateComponentModal selectedComponentData={selectedComponentData} />
    </div>
  );
};

export default RecreateBlueprintPage;
