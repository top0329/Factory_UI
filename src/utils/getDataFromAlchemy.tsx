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
    return nfts.ownedNfts;
  } catch (err) {
    console.log(err);
  }
};
