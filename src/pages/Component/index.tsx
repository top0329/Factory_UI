import { Helmet } from 'react-helmet';
import { HeadProvider, Title, Link, Meta } from 'react-head';

import SearchBar from '../../components/SearchBar';
import ERC20Card from '../../components/Cards/ComponentCard/ERC20Card';
import Components from '../../../component-data.json';
import ERC721Card from '../../components/Cards/ComponentCard/ERC721Card';
import ERC1155Card from '../../components/Cards/ComponentCard/ERC1155Card';

const Component = () => {
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
        <div className="grid grid-cols-2 pt-8 pb-16 gap-2 xs:grid-cols-2 sm:grid-cols-2 md:gap-4 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
          {Components.erc20Data.length > 0 &&
            Components.erc20Data.map(
              (
                erc20: {
                  name: string;
                  uri: string;
                  amount: number;
                  tokenAddress: string;
                },
                idx: React.Key | null | undefined
              ) => {
                return (
                  <ERC20Card
                    key={idx}
                    amount={Number(erc20.amount)}
                    tokenAddress={erc20.tokenAddress}
                  />
                );
              }
            )}
          {Components.erc721Data.length > 0 &&
            Components.erc721Data.map(
              (erc721: {
                tokenId: number;
                name: string;
                uri: string;
                tokenAddress: string;
              }) => {
                return (
                  <ERC721Card
                    key={erc721.tokenId}
                    tokenId={erc721.tokenId}
                    tokenAddress={erc721.tokenAddress}
                  />
                );
              }
            )}
          {Components.erc1155Data.length > 0 &&
            Components.erc1155Data.map(
              (erc1155: {
                tokenId: number;
                name: string;
                uri: string;
                amount: number;
                tokenAddress: string;
              }) => {
                return (
                  <ERC1155Card
                    key={erc1155.tokenId}
                    tokenId={erc1155.tokenId}
                    amount={erc1155.amount}
                    tokenAddress={erc1155.tokenAddress}
                  />
                );
              }
            )}
        </div>
      </div>
    </HeadProvider>
  );
};

export default Component;
