import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { ethers } from 'ethers';
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
import blueprintAbi from '../../abi/BlueprintABI.json';

const ProductPage = () => {
  const { blueprintContract } = useWeb3();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [, setSelectedBlueprint] = useAtom(selectedOwnBlueprintAtom);
  const [, setBlueprintTokenList] = useAtom(blueprintTokenListAtom);

  useEffect(() => {
    const getBlueprintTokenList = async () => {
      console.log(
        'blueprintContract Address',
        await blueprintContract.getAddress()
      );
      try {
        const provider = new ethers.JsonRpcProvider('https://rpc.sepolia.org');

        const blueprintContract_ = new ethers.Contract(
          await blueprintContract.getAddress(),
          blueprintAbi,
          provider
        );

        console.log(await blueprintContract_.getBlueprintIds());

        const tempTokenList: Array<BlueprintNFT> = [];
        // console.log(
        //   '<<<<<<<<<>>>>>>>>>>>',
        //   await blueprintWeb3.methods.factory()
        // );

        const blueprintTokenIds: Array<number> =
          await blueprintContract.getBlueprintIds();
        blueprintTokenIds.map(async (id: number) => {
          const blueprintToken: BlueprintNFT =
            await blueprintContract.getBlueprintNFTData(id);
          tempTokenList.push(blueprintToken);
        });

        setBlueprintTokenList(tempTokenList);
      } catch (error) {
        console.log(error);
      }
    };
    getBlueprintTokenList();
  });

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
        {productData.length > 0 &&
          productData.map((product) => {
            return (
              <div className="flex justify-center" key={product.id}>
                <OwnBlueprintCard
                  blueprintId={product.id}
                  name={product.name}
                  uri={product.uri}
                  balance={product.balance}
                  address={product.blueprintAddress}
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
