import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import useToast from '../../hooks/useToast';

import SearchBar from '../../components/SearchBar';
// import productData from '../../../own-blueprint-data.json';
import {
  selectedProductintAtom,
  productSelectionState,
  productTokenListAtom,
  // blueprintTokenListAtom,
} from '../../jotai/atoms';
import ProductCard from '../../components/Cards/BlueprintCard/ProductCard';
import ProductDetailsDrawer from '../../components/Drawers/ProductDetailsDrawer';
import useWeb3 from '../../hooks/useWeb3';
import { tokenUriToImageUri } from '../../utils/tokenUriToImageUri';

const ProductPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const [, setSelectedProduct] = useAtom(selectedProductintAtom);
  const [, setProductSelectionState] = useAtom(productSelectionState);
  const [productTokenList, setProductTokenList] = useAtom(productTokenListAtom);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const {
    productContract,
    blueprintContract,
    isConnected,
    factoryContract,
    account,
  } = useWeb3();

  useEffect(() => {
    const getProductTokenList = async () => {
      try {
        const tokenIdList = await productContract.getProductIDs();

        const tempTokenList = await Promise.all(
          tokenIdList.map(async (id: number) => {
            const blueprintToken = await blueprintContract.getBlueprintNFTData(
              id
            );

            const balance: number = Number(
              await productContract.balanceOf(account, id)
            );

            const imageUri: string = String(
              await tokenUriToImageUri(blueprintToken.uri)
            );

            const fee = await factoryContract.productDecomposeFee();

            const tempObject = {
              id: Number(blueprintToken.id),
              name: blueprintToken.name,
              uri: imageUri,
              creator: blueprintToken.creator,
              balance: balance,
              blueprintAddress: await blueprintContract.getAddress(),
              myBlueprint: blueprintToken.creator == account,
              decomposeFee: Number(fee) * 10 ** -18,
              data: blueprintToken.data,
            };
            return tempObject;
          })
        );

        setProductTokenList(tempTokenList);
      } catch (error) {
        console.log(error);
      }
    };
    if (isConnected) {
      getProductTokenList();
    } else {
      showToast('warning', 'Please connect wallet');
    }
  }, [
    account,
    blueprintContract,
    factoryContract,
    isConnected,
    productContract,
    setProductTokenList,
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
  const handleProductCardClicked = (product: any) => {
    setSelectedProduct(product);
    showSidebar();
  };

  const handleDecomposeProduct = (product: any) => {
    setSelectedProduct(product);
    setProductSelectionState(product);
    navigate(`/product/decompose/${product.id}`);
  };
  return (
    <div className="text-white">
      <div className="flex flex-col min-w-[320px] gap-2 text-white">
        <h1 className="text-xl text-white 2xl:text-4xl lg:text-3xl md:text-2xl pt-3">
          My Products
        </h1>
        <div>
          <SearchBar
            pageFilter="decompose"
            advancedFilter
            placeholders="Search for Proudct ID and Name."
          />
        </div>
        <div className="grid grid-cols-2 pt-8 pb-16 xs:grid-cols-2 sm:grid-cols-3 md:gap-4 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2  xl:grid-cols-4">
          {productTokenList.length > 0 &&
            productTokenList.map((product) => {
              return (
                <div className="flex justify-center" key={product.id}>
                  <ProductCard
                    productId={product.id}
                    name={product.name}
                    uri={product.uri}
                    balance={product.balance}
                    onClick={() => handleProductCardClicked(product)}
                    onClickDecompose={() => handleDecomposeProduct(product)}
                  />
                </div>
              );
            })}
        </div>
        <ProductDetailsDrawer
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
        />
      </div>
    </div>
  );
};

export default ProductPage;
