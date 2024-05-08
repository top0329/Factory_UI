import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { HeadProvider, Title, Link, Meta } from 'react-head';
import { Helmet } from 'react-helmet';

import SearchBar from '../../components/SearchBar';
import ProductCard from '../../components/Cards/BlueprintCard/ProductCard';
import ProductDetailsDrawer from '../../components/Drawers/ProductDetailsDrawer';
import NoDataFound from '../../components/Loading/NoDataFound';
import LoadingSpinner from '../../components/Loading/LoadingSpinner';
import {
  selectedProductintAtom,
  productSelectionState,
  isLoadingAtom,
  productTokenListAtom,
} from '../../jotai/atoms';

const ProductPage = () => {
  const navigate = useNavigate();

  const [, setSelectedProduct] = useAtom(selectedProductintAtom);
  const [, setProductSelectionState] = useAtom(productSelectionState);
  const [productTokenList] = useAtom(productTokenListAtom);
  const [isLoading] = useAtom<boolean>(isLoadingAtom);

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

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
      <Link rel="canonical" href="http://factorygame.org/product" />
      <Meta
        name="description"
        content="This is factorygame.org/product. Here you can decompose Product token based on the minted Product tokens."
      />
      <Meta
        name="keyword"
        content="Factory, Factory1155, Blueprint, Product, Component Token, Combine, Creation, Mint, Recreation"
      />
      <Helmet>
        <meta
          name="description"
          content="This is factorygame.org/product. Here you can decompose Product token based on the minted Product tokens."
        />
        <meta
          name="keyword"
          content="Factory, Factory1155, Blueprint, Product, Component Token, Combine, Creation, Mint, Recreation"
        />
        <meta property="og:title" content="Blueprint - Factory1155" />
        <meta
          property="og:description"
          content="This is factorygame.org/product. Here you can decompose Product token based on the minted Product tokens."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://factorygame.org/product" />
        <meta property="twitter:title" content="Blueprint - Factory1155" />
        <meta
          property="twitter:description"
          content="This is factorygame.org/product. Here you can decompose Product token based on the minted Product tokens."
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
        ) : productTokenList.length > 0 ? (
          <div className="grid grid-cols-2 pt-8 pb-16 xs:grid-cols-2 sm:grid-cols-3 md:gap-4 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2  xl:grid-cols-4">
            {productTokenList.map((product) => {
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
        ) : (
          <div className="w-full h-[38vh] flex flex-col items-center justify-center md:h-[58vh] sm:h-[42vh]">
            <NoDataFound message="No Products Found!" />
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
