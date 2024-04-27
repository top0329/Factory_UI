import { useAtom } from 'jotai';
import { Helmet } from 'react-helmet';
import { HeadProvider, Title, Link, Meta } from 'react-head';

import SearchBar from '../../components/SearchBar';
import ERC20Card from '../../components/Cards/ComponentCard/ERC20Card';
import ERC721Card from '../../components/Cards/ComponentCard/ERC721Card';
import ERC1155Card from '../../components/Cards/ComponentCard/ERC1155Card';
import LoadingSpinner from '../../components/Loading/LoadingSpinner';
import NoDataFound from '../../components/Loading/NoDataFound';
import {
  componentTokenListAtom,
  isDataEmptyAtom,
  isLoadingAtom,
} from '../../jotai/atoms';

const Component = () => {
  const [componentTokenList] = useAtom(componentTokenListAtom);
  const [isLoading] = useAtom<boolean>(isLoadingAtom);
  const [isDataEmpty] = useAtom<boolean>(isDataEmptyAtom);

  return (
    <HeadProvider>
      <Title>Component - Factory</Title>
      <Link rel="canonical" href="http://factorygame.org/component" />
      <Meta
        name="description"
        content="This is factorygame.org/component. Here you can browse and select component tokens to mint new Blueprint token"
      />
      <Meta
        name="keyword"
        content="Factory, Factory1155, Blueprint, Product, Component Token, Combine, Creation, Mint, Recreation"
      />
      <div className="min-w-[320px]">
        <Helmet>
          <meta
            name="description"
            content="This is factorygame.org/component. Here you can browse and select component tokens to mint new Blueprint token"
          />
          <meta
            name="keyword"
            content="Factory, Factory1155, Blueprint, Product, Component Token, Combine, Creation, Mint, Recreation"
          />
          <meta property="og:title" content="Blueprint - Factory1155" />
          <meta
            property="og:description"
            content="This is factorygame.org/component. Here you can browse and select component tokens to mint new Blueprint token"
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://factorygame.org/component" />
          <meta property="twitter:title" content="Blueprint - Factory1155" />
          <meta
            property="twitter:description"
            content="This is factorygame.org/component. Here you can browse and select component tokens to mint new Blueprint token"
          />
        </Helmet>
        <div className="flex justify-between items-center py-3">
          <h1 className="text-xl text-white 2xl:text-4xl lg:text-3xl md:text-2xl">
            Components
          </h1>
        </div>
        <SearchBar
          pageFilter="component"
          placeholders="Search for Component Name and Type"
        />
        {isLoading ? (
          <div className="w-full h-[38vh] flex flex-col items-center justify-center md:h-[58vh] sm:h-[42vh]">
            <LoadingSpinner />
          </div>
        ) : isDataEmpty ? (
          <div className="w-full h-[38vh] flex flex-col items-center justify-center md:h-[58vh] sm:h-[42vh]">
            <NoDataFound message="No Components Found!" />
          </div>
        ) : (
          <div className="grid grid-cols-2 pt-8 pb-16 gap-2 xs:grid-cols-2 sm:grid-cols-2 md:gap-4 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
            {componentTokenList.length > 0 &&
              componentTokenList.map(
                (
                  component: any,
                  idx: React.Key | null | undefined
                ) => {
                  if (component.type === 'erc20') {
                    return (
                      <ERC20Card
                        key={idx}
                        name={component.name}
                        uri={component.uri}
                        amount={Number(component.totalAmount)}
                        tokenAddress={component.tokenAddress}
                      />
                    );
                  } else if (component.type === 'erc721') {
                    return (
                      <ERC721Card
                        key={idx}
                        tokenId={component.tokenId}
                        tokenAddress={component.tokenAddress}
                      />
                    );
                  } else if (component.type === 'erc1155') {
                    return (
                      <ERC1155Card
                        key={idx}
                        tokenId={component.tokenId}
                        amount={Number(component.totalAmount)}
                        tokenAddress={component.tokenAddress}
                      />
                    );
                  }
                }
              )}
          </div>
        )}
      </div>
    </HeadProvider>
  );
};

export default Component;
