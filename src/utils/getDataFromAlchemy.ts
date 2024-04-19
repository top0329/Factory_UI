import { Alchemy, Network } from 'alchemy-sdk';

const config = {
  apiKey: 'Z66PxY86kCkFslToB82DiSM531OnIyHS',
  network: Network.ETH_SEPOLIA,
};

const alchemy = new Alchemy(config);

export const runMain = async (
  collectionAddress: string,
  walletAddress: string
) => {
  try {
    const nfts = await alchemy.nft.getNftsForOwner(walletAddress, {
      contractAddresses: [collectionAddress],
    });
    const nftsList = nfts.ownedNfts.map((nft) => {
      const { tokenId, balance } = nft;
      return { tokenId, balance };
    })
    return nftsList;
  } catch (err) {
    console.log(err);
  }
};
