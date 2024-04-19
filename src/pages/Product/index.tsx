import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAtom } from 'jotai';
import { HeadProvider, Title, Link, Meta } from 'react-head';
import { Helmet } from 'react-helmet';

import useToast from '../../hooks/useToast';
import useWeb3 from '../../hooks/useWeb3';
import SearchBar from '../../components/SearchBar';
import ProductCard from '../../components/Cards/BlueprintCard/ProductCard';
import ProductDetailsDrawer from '../../components/Drawers/ProductDetailsDrawer';
import NoDataFound from '../../components/Loading/NoDataFound';
import LoadingSpinner from '../../components/Loading/LoadingSpinner';
import {
  selectedProductintAtom,
  productSelectionState,
  productTokenListAtom,
  isLoadingAtom,
  isDataEmptyAtom,
} from '../../jotai/atoms';
import { runMain } from '../../utils/getDataFromAlchemy';
import { BASE_URI, productAddress } from '../../constants';

const ProductPage = () => {
  const { showToast } = useToast();
  const { isConnected, account } = useWeb3();

  const navigate = useNavigate();

  const [, setSelectedProduct] = useAtom(selectedProductintAtom);
  const [, setProductSelectionState] = useAtom(productSelectionState);
  const [productTokenList, setProductTokenList] = useAtom(productTokenListAtom);
  const [isLoading, setIsLoading] = useAtom<boolean>(isLoadingAtom);
  const [isDataEmpty, setIsDataEmpty] = useAtom<boolean>(isDataEmptyAtom);

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    const getProductTokenList = async () => {
      try {
        const myProducts = await runMain(productAddress, String(account));
        console.log(myProducts);
        if (myProducts && myProducts.length > 0) {
          const myProductsIds = myProducts.map((product) => product.tokenId);
          const myProductsData = await axios.get(
            `${BASE_URI}/product/?ids=${myProductsIds}`
          );
          console.log(myProductsData.data);
          if (myProductsData.data.length === 0) {
            setIsDataEmpty(true);
          } else {
            myProductsData.data.forEach((product: any) => {
              const _product = myProducts.find(
                (n) => Number(n.tokenId) === Number(product.id)
              );
              if (_product) {
                product.balance = Number(_product.balance);
              }
            });
            console.log(myProductsData.data);
            setProductTokenList(myProductsData.data);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (isConnected) {
      getProductTokenList();
    } else {
      showToast('warning', 'Please connect wallet');
    }
  }, [
    account,
    isConnected,
    setIsDataEmpty,
    setIsLoading,
    setProductTokenList,
    showToast,
  ]);

  const showSidebar = () => {
    setIsDrawerOpen(true);
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
    <HeadProvider>
      <Title>Product - Factory</Title>
      <Link rel="canonical" href="http://factory-ui.vercel.app/product" />
      <Meta
        name="description"
        content="This is factory-ui.vercel.app/product. Here you can decompose Product token based on the minted Product tokens."
      />
      <Meta
        name="keyword"
        content="Factory, Factory1155, Blueprint, Product, Component Token, Combine, Creation, Mint, Recreation"
      />
      <Helmet>
        <meta
          name="description"
          content="This is factory-ui.vercel.app/product. Here you can decompose Product token based on the minted Product tokens."
        />
        <meta
          name="keyword"
          content="Factory, Factory1155, Blueprint, Product, Component Token, Combine, Creation, Mint, Recreation"
        />
        <meta property="og:title" content="Blueprint - Factory1155" />
        <meta
          property="og:description"
          content="This is factory-ui.vercel.app/product. Here you can decompose Product token based on the minted Product tokens."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://factory-ui.vercel.app/product"
        />
        <meta property="twitter:title" content="Blueprint - Factory1155" />
        <meta
          property="twitter:description"
          content="This is factory-ui.vercel.app/product. Here you can decompose Product token based on the minted Product tokens."
        />
      </Helmet>
      <div className="flex flex-col min-w-[320px] gap-2 text-white">
        <h1 className="text-xl text-white 2xl:text-4xl lg:text-3xl md:text-2xl pt-3">
          My Products
        </h1>
        <div>
          <SearchBar
            pageFilter="product"
            advancedFilter
            placeholders="Search for Proudct ID and Name."
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
            {productTokenList.length > 0 &&
              productTokenList.map((product) => {
                return (
                  <div className="flex justify-center" key={product.id}>
                    <ProductCard
                      productId={product.id}
                      name={product.name}
                      uri={product.imageUri}
                      balance={product.balance}
                      onClick={() => handleProductCardClicked(product)}
                      onClickDecompose={() => handleDecomposeProduct(product)}
                    />
                  </div>
                );
              })}
          </div>
        )}
        <ProductDetailsDrawer
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
        />
      </div>
    </HeadProvider>
  );
};

export default ProductPage;
