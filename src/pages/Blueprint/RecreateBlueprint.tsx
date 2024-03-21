import { useEffect } from 'react';
import { useAtom } from 'jotai';
import toast, { Toaster } from 'react-hot-toast';

import ComponentButton from '../../components/Button/ComponentButton';
import BlueprintInfoCard from '../../components/Cards/BlueprintInfoCard/BlueprintInfoCard';
import ERC1155Card from '../../components/Cards/ComponentCard/ERC1155Card';
import ERC20Card from '../../components/Cards/ComponentCard/ERC20Card';
import AddComponentModal from '../../components/Modals/AddComponentModal';
import {
  availableComponentAtom,
  createBlueprintAtom,
  isAddComponentModalAtom,
  selectedBlueprintAtom,
} from '../../jotai/atoms';
import ERC721Card from '../../components/Cards/ComponentCard/ERC721Card';
import { ERC1155Data, ERC20Data, ERC721Data } from '../../types';
import FailImage from '../../assets/images/fail.png';

const RecreateBlueprintPage = () => {
  const [selectedBlueprint] = useAtom(selectedBlueprintAtom);
  const [createBlueprint, setCreateBlueprint] = useAtom(createBlueprintAtom);
  const [availableComponent, setAvailableComponent] = useAtom(
    availableComponentAtom
  );
  const [, setIsAddComponentModalOpen] = useAtom(isAddComponentModalAtom);

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

  const handleAddComponentModalOpen = () => {
    if (availableComponent > 0) setIsAddComponentModalOpen(true);
    else {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-96 w-full bg-[#141414] shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-center">
              <div className="pt-0.5">
                <img
                  className="h-10 w-10 rounded-full"
                  src={FailImage}
                  alt=""
                />
              </div>
              <div className="ml-3 flex items-center">
                <p className="text-base font-medium text-light-gray">
                  Not able to add component tokens.
                </p>
              </div>
            </div>
          </div>
          <div className="">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-full flex items-center justify-center text-sm font-medium text-light-gray hover:text-light-gray focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29l-4.3 4.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4.29-4.3l4.29 4.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42Z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      ));
      setIsAddComponentModalOpen(false);
    }
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
                name={erc20.name}
                uri={erc20.uri}
                amount={erc20.amount}
                tokenAddress={erc20.tokenAddress}
                icon
                onDeleteIconClicked={() => handleDeleteERC20CardClicked(erc20)}
              />
            );
          })}
          {createBlueprint.data.erc721Data.map((erc721) => {
            return (
              <ERC721Card
                key={erc721.tokenId}
                tokenId={erc721.tokenId}
                name={erc721.name}
                uri={erc721.uri}
                tokenAddress={erc721.tokenAddress}
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
                key={erc1155.tokenId}
                tokenId={erc1155.tokenId}
                name={erc1155.name}
                uri={erc1155.uri}
                amount={erc1155.amount}
                tokenAddress={erc1155.tokenAddress}
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
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default RecreateBlueprintPage;
