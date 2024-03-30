// import { Alchemy, Network } from "alchemy-sdk";
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
  // Define the collection address you're interested in.
  const _collectionAddress = collectionAddress; // blueprint
  // const collectionAddress = '0xaaF0e2a505F074d8080B834c33a9ff44DD7946F1'; // product

  const _walletAddress = walletAddress;

  // Get NFTs for a given owner and filter by the collection address
  const nfts = await alchemy.nft.getNftsForOwner(_walletAddress, {
    contractAddresses: [_collectionAddress],
  });

  // Print NFTs from the specific collection
  // console.log(nfts);
  return nfts.ownedNfts;
};
