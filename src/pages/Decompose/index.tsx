import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

import SearchBar from '../../components/SearchBar';
import productData from '../../../own-blueprint-data.json';
import {
  selectedProductintAtom,
  productSelectionState,
  productTokenIdListAtom,
  // blueprintTokenListAtom,
} from '../../jotai/atoms';
import ProductCard from '../../components/Cards/BlueprintCard/ProductCard';
import ProductDetailsDrawer from '../../components/Drawers/ProductDetailsDrawer';
import useWeb3 from '../../hooks/useWeb3';

const DecomposePage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [, setSelectedProduct] = useAtom(selectedProductintAtom);
  const [, setProductSelectionState] = useAtom(productSelectionState);
  const [, setProductTokenIdList] = useAtom(productTokenIdListAtom);
  const navigate = useNavigate();

  const { productContract } = useWeb3();

  useEffect(() => {
    const getTokenList = async () => {
      const tokenIdList = await productContract.getProductIDs();
      setProductTokenIdList(tokenIdList);
      // let productTokenItems = blueprintTokenListAtom.filter((data) =>
      //   productTokenIdListAtom.includes(data.id)
      // );
    };
    getTokenList();
  });

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
    navigate(`/decompose/product/${product.id}`);
  };
  return (
    <div className="text-white">
      <div className="flex flex-col min-w-[320px] gap-2 text-white">
        <h1 className="text-xl text-white 2xl:text-4xl lg:text-3xl md:text-2xl pt-3">
          My Products
        </h1>
        <div>
          <SearchBar
            advancedFilter
            placeholders="Search for Proudct ID and Name."
          />
        </div>
        <div className="grid grid-cols-2 pt-8 pb-16 xs:grid-cols-2 sm:grid-cols-3 md:gap-4 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2  xl:grid-cols-4">
          {productData.length > 0 &&
            productData.map((product) => {
              return (
                <div className="flex justify-center" key={product.id}>
                  <ProductCard
                    productId={product.id}
                    name={product.name}
                    uri={product.uri}
                    balance={product.balance}
                    address={product.blueprintAddress}
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

export default DecomposePage;
