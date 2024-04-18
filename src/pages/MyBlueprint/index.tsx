import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';

import useWeb3 from '../../hooks/useWeb3';
import useToast from '../../hooks/useToast';
import OwnBlueprintCard from '../../components/Cards/BlueprintCard/OwnBlueprintCard';
import SearchBar from '../../components/SearchBar';
import OwnBlueprintDetailsDrawer from '../../components/Drawers/OwnBlueprintDetailsDrawer';
import {
  selectedOwnBlueprintAtom,
  ownBlueprintTokenListAtom,
  isLoadingAtom,
  isDataEmptyAtom,
} from '../../jotai/atoms';
import { BASE_URI, blueprintAddress } from '../../constants';
import axios from 'axios';
import LoadingSpinner from '../../components/Loading/LoadingSpinner';
import NoDataFound from '../../components/Loading/NoDataFound';
import { runMain } from '../../utils/getDataFromAlchemy';

const MyBlueprintPage = () => {
  const { account, isConnected } = useWeb3();
  const { showToast } = useToast();

  const [, setSelectedBlueprint] = useAtom(selectedOwnBlueprintAtom);
  const [ownBlueprintTokenList, setOwnBlueprintTokenList] = useAtom(
    ownBlueprintTokenListAtom
  );
  const [isLoading, setIsLoading] = useAtom<boolean>(isLoadingAtom);
  const [isDataEmpty, setIsDataEmpty] = useAtom<boolean>(isDataEmptyAtom);

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  useEffect(() => {
    const getBlueprintTokenList = async () => {
      try {
        setIsLoading(true);
        const myBluprints = await runMain(blueprintAddress, String(account));
        if (myBluprints) {
          const myBlueprintIds = myBluprints.map(
            (blueprint) => blueprint.tokenId
          );
          const myBlueprintData = await axios.get(
            `${BASE_URI}/my-blueprint/?ids=${myBlueprintIds}`
          );
          if (myBlueprintData.data.length === 0) {
            setIsDataEmpty(true);
          } else {
            myBlueprintData.data.forEach((blueprint: any) => {
              const ownedBlueprint = myBluprints.find(
                (n) => Number(n.tokenId) === Number(blueprint.id)
              );
              if (ownedBlueprint) {
                blueprint.balance = Number(ownedBlueprint.balance);
              }
            });
            console.log(myBlueprintData.data);
            setOwnBlueprintTokenList(myBlueprintData.data);
          }
        } else {
          setIsDataEmpty(true);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (isConnected) {
      getBlueprintTokenList();
    } else {
      showToast('warning', 'Please connect wallet');
    }
  }, [
    account,
    isConnected,
    setIsDataEmpty,
    setIsLoading,
    setOwnBlueprintTokenList,
    showToast,
  ]);

  const showSidebar = () => {
    setIsDrawerOpen(true);

    if (typeof window != 'undefined' && window.document) {
      document.body.style.overflow = 'hidden';
    }
  };

  const handleBlueprintCardClicked = (blueprint: any) => {
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
          pageFilter="my-blueprint"
          advancedFilter
          placeholders="Search for Blueprint ID, Name and Creator"
        />
      </div>
      {isLoading ? (
        <div className="w-full h-[38vh] flex flex-col items-center justify-center md:h-[58vh] sm:h-[42vh]">
          <LoadingSpinner />
        </div>
      ) : isDataEmpty ? (
        <div className="w-full h-[38vh] flex flex-col items-center justify-center md:h-[58vh] sm:h-[42vh]">
          <NoDataFound message="No My Blueprints Found!" />
        </div>
      ) : (
        <div className="grid grid-cols-2 pt-8 pb-16 xs:grid-cols-2 sm:grid-cols-3 md:gap-4 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2  xl:grid-cols-4">
          {ownBlueprintTokenList.length > 0 &&
            ownBlueprintTokenList.map((product) => {
              return (
                <div className="flex justify-center" key={product.id}>
                  <OwnBlueprintCard
                    blueprintId={product.id}
                    name={product.name}
                    uri={product.imageUri}
                    balance={product.balance}
                    address={product.creator}
                    myBlueprint={product.myBlueprint}
                    onClick={() => handleBlueprintCardClicked(product)}
                  />
                </div>
              );
            })}
        </div>
      )}
      <OwnBlueprintDetailsDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </div>
  );
};

export default MyBlueprintPage;
