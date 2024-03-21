import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import OwnBlueprintCard from '../../components/Cards/BlueprintCard/OwnBlueprintCard';
import SearchBar from '../../components/SearchBar';
import OwnBlueprintDetailsDrawer from '../../components/Drawers/OwnBlueprintDetailsDrawer';
import productData from '../../../own-blueprint-data.json';
import {
  selectedOwnBlueprintAtom,
  blueprintTokenListAtom,
} from '../../jotai/atoms';
import { BlueprintNFT } from '../../types';
import useWeb3 from '../../hooks/useWeb3';

const ProductPage = () => {
  const { blueprintContract, account } = useWeb3();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [, setSelectedBlueprint] = useAtom(selectedOwnBlueprintAtom);
  const [blueprintTokenList, setBlueprintTokenList] = useAtom(
    blueprintTokenListAtom
  );

  useEffect(() => {
    const getBlueprintTokenList = async () => {
      try {
        let tempTokenList: Array<BlueprintNFT> = []; // Initialize as an empty array
        const blueprintTokenIds: Array<number> =
          await blueprintContract.getBlueprintIds();

        tempTokenList = await Promise.all(
          blueprintTokenIds.map(async (id: number) => {
            const blueprintToken = await blueprintContract.getBlueprintNFTData(
              id
            );

            const balance = await blueprintContract.balanceOf(
              blueprintToken.creator,
              id
            );
            console.log(balance);
            // console.log(balance);
            // blueprintToken.balance = balance;
            // blueprintToken.myBlueprint = account == blueprintToken.creator;
            // console.log('blueprintToken.creator>>>>', blueprintToken);

            return blueprintToken;
          })
        );

        setBlueprintTokenList(tempTokenList);
      } catch (error) {
        console.log(error);
      }
    };
    getBlueprintTokenList();
  }, []);

  // FUNCTION TO HANDLE OPEN ACTION ON SIDEDRAWER/MODAL
  const showSidebar = () => {
    setIsDrawerOpen(true);

    // Disables Background Scrolling whilst the SideDrawer/Modal is open
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
        Own Blueprints
      </h1>
      <div>
        <SearchBar placeholders="Search for Blueprint ID, Name and Creator" />
      </div>
      <div className="grid grid-cols-2 pt-8 pb-16 xs:grid-cols-2 sm:grid-cols-3 md:gap-4 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2  xl:grid-cols-4">
        {blueprintTokenList.length > 0 &&
          blueprintTokenList.map((product) => {
            return (
              <div className="flex justify-center" key={product[0]}>
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

export default ProductPage;
