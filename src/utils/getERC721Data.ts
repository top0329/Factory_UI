import { ethers } from 'ethers';
import { Address, erc721Abi } from 'viem';
import axios from 'axios';

import { defaultRPC } from '../constants';

export default async function getERC721Data(
  contractAddress: Address | '',
  tokenId: number
) {
  if (contractAddress === '') return null;
  const provider = new ethers.JsonRpcProvider(defaultRPC);
  const erc721Contract = new ethers.Contract(
    contractAddress,
    erc721Abi,
    provider
  );

  try {
    const name = await erc721Contract.name();
    console.log(`Name: ${name}`);
    const symbol = await erc721Contract.symbol();
    console.log(`Symbol: ${symbol}`);
    const owner = await erc721Contract.ownerOf(tokenId);
    console.log(`Owner of Token #${tokenId}: ${owner}`);
    const tokenUri = await erc721Contract.tokenURI(tokenId);
    console.log(`Token URI: ${tokenUri}`);
    const metaData = await axios.get(`https://ipfs.io/${tokenUri}`);
    const uri = metaData.data.image;

    console.log(metaData);

    return { name, symbol, owner, uri };
  } catch (error) {
    console.error('Error occurred:', error);
    return null;
  }
}
