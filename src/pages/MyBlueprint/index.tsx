import { useState } from 'react';
import { useAtom } from 'jotai';
import { HeadProvider, Title, Link, Meta } from 'react-head';
import { Helmet } from 'react-helmet';

import OwnBlueprintCard from '../../components/Cards/BlueprintCard/OwnBlueprintCard';
import SearchBar from '../../components/SearchBar';
import OwnBlueprintDetailsDrawer from '../../components/Drawers/OwnBlueprintDetailsDrawer';
import LoadingSpinner from '../../components/Loading/LoadingSpinner';
import NoDataFound from '../../components/Loading/NoDataFound';
import {
  selectedOwnBlueprintAtom,
  isLoadingAtom,
  ownBlueprintTokenListAtom,
} from '../../jotai/atoms';

const MyBlueprintPage = () => {
  const [, setSelectedBlueprint] = useAtom(selectedOwnBlueprintAtom);
  const [ownBlueprintTokenList] = useAtom(
    ownBlueprintTokenListAtom
  );
  const [isLoading] = useAtom<boolean>(isLoadingAtom);

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

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
    <HeadProvider>
      <div className="flex flex-col min-w-[320px] gap-2 text-white">
        <Title>Blueprint - Factory</Title>
        <Link rel="canonical" href="http://factorygame.org/my-blueprint" />
        <Meta
          name="description"
          content="This is factorygame.org/my-blueprint. Here you can create and mint new Product token based on the minted Blueprint tokens."
        />
        <Meta
          name="keyword"
          content="Factory, Factory1155, Blueprint, Product, Component Token, Combine, Creation, Mint, Recreation"
        />
        <Helmet>
          <meta
            name="description"
            content="This is factorygame.org/my-blueprint. Here you can create and mint new Product token based on the minted Blueprint tokens."
          />
          <meta
            name="keyword"
            content="Factory, Factory1155, Blueprint, Product, Component Token, Combine, Creation, Mint, Recreation"
          />
          <meta property="og:title" content="Blueprint - Factory1155" />
          <meta
            property="og:description"
            content="This is factorygame.org/my-blueprint. Here you can create and mint new Product token based on the minted Blueprint tokens."
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content="https://factorygame.org/my-blueprint"
          />
          <meta property="twitter:title" content="Blueprint - Factory1155" />
          <meta
            property="twitter:description"
            content="This is factorygame.org/my-blueprint. Here you can create and mint new Product token based on the minted Blueprint tokens."
          />
        </Helmet>
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
        ) : ownBlueprintTokenList.length > 0 ? (
          <div className="grid grid-cols-2 pt-8 pb-16 xs:grid-cols-2 sm:grid-cols-3 md:gap-4 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2  xl:grid-cols-4">
            {ownBlueprintTokenList.map((blueprint) => {
              return (
                <div className="flex justify-center" key={blueprint.id}>
                  <OwnBlueprintCard
                    blueprintId={blueprint.id}
                    name={blueprint.name}
                    uri={blueprint.imageUri}
                    balance={blueprint.balance}
                    address={blueprint.creator}
                    myBlueprint={blueprint.myBlueprint}
                    onClick={() => handleBlueprintCardClicked(blueprint)}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="w-full h-[38vh] flex flex-col items-center justify-center md:h-[58vh] sm:h-[42vh]">
            <NoDataFound message="No My Blueprints Found!" />
          </div>
        )}
        <OwnBlueprintDetailsDrawer
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
        />
      </div>
    </HeadProvider>
  );
};

export default MyBlueprintPage;
