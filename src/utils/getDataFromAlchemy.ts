import { Alchemy, Network } from 'alchemy-sdk';

const config: any = {
  apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
};

export const runMain = async (
  collectionAddress: string,
  walletAddress: string,
  chainId: number
) => {
  if (chainId === 80002) {
    config.network = Network.MATIC_AMOY;
  } else if (chainId === 11155111) {
    config.network = Network.ETH_SEPOLIA;
  } else if (chainId === 137) {
    config.network = Network.MATIC_MAINNET;
  } else {
    console.error(
      'Unsupported network.'
    );
    return [];
  }

  const alchemy = new Alchemy(config);

  try {
    const nfts = await alchemy.nft.getNftsForOwner(walletAddress, {
      contractAddresses: [collectionAddress],
    });
    const nftsList = nfts.ownedNfts.map((nft) => {
      const { tokenId, balance } = nft;
      return { tokenId, balance };
    });
    return nftsList;
  } catch (err) {
    console.log(err);
  }
};
