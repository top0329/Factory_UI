import axios from 'axios';
import { Address } from 'viem';
import { ethers } from 'ethers';

import erc20Abi from '../abi/ERC20ABI.json';
import erc721Abi from '../abi/ERC721ABI.json';
import erc1155Abi from '../abi/ERC1155ABI.json';
import { DefaultErc20ImageUri } from '../constants';

export const getTokenDetailsByAddress = async (contractAddress: Address, tokenDataUrl: string) => {
  try {
    const response = await axios.get(`${tokenDataUrl}/${contractAddress}`);
    const tokenId = response.data.id;
    let logo: string;
    if (response.data.image.large) {
      logo = response.data.image.large;
    } else {
      logo = DefaultErc20ImageUri;
    }
    return { tokenId, logo };
  } catch (error) {
    console.error('Error fetching token details:', error);
    return null;
  }
};

async function checkContractType(contractAddress: Address | '', provider: any) {
  let data: any;
  if (contractAddress === '') return { type: 'Unknown', payload: data };
  const erc20Contract = new ethers.Contract(
    contractAddress,
    erc20Abi,
    provider
  );
  const erc721Contract = new ethers.Contract(
    contractAddress,
    erc721Abi,
    provider
  );
  const erc1155Contract = new ethers.Contract(
    contractAddress,
    erc1155Abi,
    provider
  );
  try {
    const is721 = await erc721Contract.supportsInterface('0x80ac58cd');
    if (is721) {
      return { type: 'ERC721' };
    }
    const is1155 = await erc1155Contract.supportsInterface('0xd9b67a26');
    if (is1155) {
      return { type: 'ERC1155' };
    }
    return { type: 'Unknown' };
  } catch (error) {
    try {
      await erc20Contract.totalSupply();
      const tokenName = await erc20Contract.name();
      const decimal = await erc20Contract.decimals();
      data = { name: tokenName, decimals: decimal };
      return { type: 'ERC20', payload: data };
    } catch (error) {
      console.error(
        'Could not determine the contract type, or it is none of the above.'
      );
      return { type: 'Unknown' };
    }
  }
}

export default checkContractType;
