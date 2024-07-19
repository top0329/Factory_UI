import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/common-evm-utils';

export const runMain = async (
  collectionAddress: string,
  walletAddress: string,
  chainId: number
) => {
  let chain: any;
  if (!Moralis.Core.isStarted) {
    await Moralis.start({
      apiKey: import.meta.env.VITE_MORALIS_API_KEY,
    });
  }
  switch (chainId) {
    case 1:
      chain = EvmChain.ETHEREUM;
      break;
    case 56:
      chain = EvmChain.BSC;
      break;
    case 80002:
      chain = EvmChain.POLYGON_AMOY;
      break;
    case 11155111:
      chain = EvmChain.SEPOLIA;
      break;
    case 137:
      chain = EvmChain.POLYGON;
      break;
    default:
      console.error('Unsupported network.');
      return [];
  }

  try {
    const nfts = await Moralis.EvmApi.nft.getWalletNFTs({
      chain,
      tokenAddresses: [collectionAddress],
      address: walletAddress,
    });
    const nftsList = nfts.result.map((nft) => {
      const { tokenId, amount } = nft;
      return { tokenId, amount };
    });
    return nftsList;
  } catch (err) {
    console.log(err);
  }
};
