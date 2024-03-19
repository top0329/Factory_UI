import { useEffect } from 'react';
import { useAtom } from 'jotai';
import toast, { Toaster } from 'react-hot-toast';

import ComponentButton from '../../components/Button/ComponentButton';
import BlueprintInfoCard from '../../components/Cards/BlueprintInfoCard/BlueprintInfoCard';
import ERC1155Card from '../../components/Cards/ComponentCard/ERC1155Card';
import ERC20Card from '../../components/Cards/ComponentCard/ERC20Card';
import AddComponentModal from '../../components/Modals/AddComponentModal';
import ERC721Card from '../../components/Cards/ComponentCard/ERC721Card';
import {
  availableComponentAtom,
  createBlueprintAtom,
  isAddComponentModalAtom,
} from '../../jotai/atoms';
import { ERC1155Data, ERC20Data, ERC721Data } from '../../types';

const NewBlueprintPage = () => {
  const [createBlueprint, setCreateBlueprint] = useAtom(createBlueprintAtom);
  const [availableComponent, setAvailableComponent] = useAtom(
    availableComponentAtom
  );
  const [, setIsAddComponentModalOpen] = useAtom(isAddComponentModalAtom);

  useEffect(() => {
    setCreateBlueprint({
      name: '',
      uri: 'https://ipfs.io/ipfs/bafkreiac47exop4qnvi47azogyp2xrb45dlyqgsijpnsvkvizkh4rm3uvi',
      creator: '',
      totalSupply: 0,
      mintPrice: 0,
      mintPriceUnit: 0,
      mintLimit: 0,
      data: {
        erc20Data: [],
        erc721Data: [],
        erc1155Data: [],
      },
    });
    setAvailableComponent(7);
  }, [setAvailableComponent, setCreateBlueprint]);

  const handleAddComponentModalOpen = () => {
    if (availableComponent > 0) setIsAddComponentModalOpen(true);
    else {
      // toast('Here is your toast.');
      toast.error('Not able to add component tokens.', {
        duration: 4000,
        position: 'top-right',

        // Styling
        style: { background: '#333333', color: '#ccc' },
        // className: 'bg-[#333333] text-[#ccc]',

        // Custom Icon
        // icon: '👏',

        // Change colors of success/error/loading icon
        // iconTheme: {
        //   primary: '#000',
        //   secondary: '#fff',
        // },

        // Aria
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
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
        return item.tokenAddress !== erc721.tokenAddress || item.tokenId !== erc721.tokenId;
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
        return item.tokenAddress !== erc1155.tokenAddress || item.tokenId !== erc1155.tokenId;
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
          New Blueprint
        </h1>
        <h3 className="text-sm fixed bg-primary rounded-full px-2 py-1 bottom-6 right-6 z-50 xs:text-base lg:text-lg xl:text-xl xs:block xs:static xs:bg-transparent">
          <span className="xs:hidden">Available</span>
          <span className="hidden xs:inline-block">
            Available Components
          </span>: <span>{availableComponent}</span>
        </h3>
      </div>
      <div className="flex flex-col justify-start items-start pt-6 pb-16 gap-4 lg:gap-6 xs:flex-row">
        <div className="min-w-48 w-full md:w-auto lg:min-w-72 md:min-w-[33.3%] sm:min-w-64">
          <BlueprintInfoCard />
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
      <Toaster />
    </div>
  );
};

export default NewBlueprintPage;
