import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import useToast from '../../hooks/useToast';
import OwnBlueprintCard from '../../components/Cards/BlueprintCard/OwnBlueprintCard';
import SearchBar from '../../components/SearchBar';
import OwnBlueprintDetailsDrawer from '../../components/Drawers/OwnBlueprintDetailsDrawer';
// import productData from '../../../own-blueprint-data.json';
import {
  selectedOwnBlueprintAtom,
  ownBlueprintTokenListAtom,
} from '../../jotai/atoms';
import useWeb3 from '../../hooks/useWeb3';
import { tokenUriToImageUri } from '../../utils/tokenUriToImageUri';
import { runMain } from '../../utils/getDataFromAlchemy';
import { blueprintAddress } from '../../constants';

const MyBlueprintPage = () => {
  const { blueprintContract, account, isConnected } = useWeb3();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [, setSelectedBlueprint] = useAtom(selectedOwnBlueprintAtom);
  const [ownBlueprintTokenList, setOwnBlueprintTokenList] = useAtom(
    ownBlueprintTokenListAtom
  );
  const { showToast } = useToast();
  useEffect(() => {
    const getBlueprintTokenList = async () => {
      const myBluprints = await runMain(blueprintAddress, String(account));
      try {
        const blueprintTokenIds: any = await myBluprints.map(
          (blueprint: any) => {
            return blueprint.tokenId;
          }
        );

        const tempTokenList = await Promise.all(
          blueprintTokenIds.map(async (id: number) => {
            const blueprintToken = await blueprintContract.getBlueprintNFTData(
              id
            );

            const balance: number = await blueprintContract.balanceOf(
              account,
              id
            );

            const imageUri: string = String(
              await tokenUriToImageUri(blueprintToken.uri)
            );

            const tempObject = {
              id: Number(blueprintToken.id),
              name: blueprintToken.name,
              uri: imageUri,
              creator: blueprintToken.creator,
              balance: Number(balance),
              blueprintAddress: await blueprintContract.getAddress(),
              myBlueprint: blueprintToken.creator == account,
              data: blueprintToken.data,
            };
            return tempObject;
          })
        );

        setOwnBlueprintTokenList(tempTokenList);
      } catch (error) {
        console.log(error);
      }
    };
    if (isConnected) {
      getBlueprintTokenList();
    } else {
      showToast('warning', 'Please connect wallet');
    }
  }, [
    account,
    blueprintContract,
    isConnected,
    setOwnBlueprintTokenList,
    showToast,
  ]);

  // FUNCTION TO HANDLE OPEN ACTION ON SIDEDRAWER/MODAL
  const showSidebar = () => {
    setIsDrawerOpen(true);

    // Disables Background Scrolling whilst the SideDrawer/Modal is open
    if (typeof window != 'undefined' && window.document) {
      document.body.style.overflow = 'hidden';
    }
  };
  const handleBlueprintCardClicked = (blueprint: any) => {
    // console.log('blueprint>>>>>>>>', blueprint.data.erc20Data[0].tokenAddress);
    setSelectedBlueprint(blueprint);
    showSidebar();
  };
  return (
    <div className="flex flex-col min-w-[320px] gap-2 text-white">
      <h1 className="text-xl text-white 2xl:text-4xl lg:text-3xl md:text-2xl pt-3">
        My Blueprints
      </h1>
      <div>
        <SearchBar
          pageFilter="normal"
          advancedFilter
          placeholders="Search for Blueprint ID, Name and Creator"
        />
      </div>
      <div className="grid grid-cols-2 pt-8 pb-16 xs:grid-cols-2 sm:grid-cols-3 md:gap-4 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2  xl:grid-cols-4">
        {ownBlueprintTokenList.length > 0 &&
          ownBlueprintTokenList.map((product) => {
            return (
              <div className="flex justify-center" key={product.id}>
                <OwnBlueprintCard
                  blueprintId={product.id}
                  name={product.name}
                  uri={product.uri}
                  balance={product.balance}
                  address={product.creator}
                  myBlueprint={product.myBlueprint}
                  onClick={() => handleBlueprintCardClicked(product)}
                />
              </div>
            );
          })}
      </div>
      <OwnBlueprintDetailsDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </div>
  );
};

export default MyBlueprintPage;
