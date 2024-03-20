import { Address } from 'viem';
import { ethers } from 'ethers';
import axios from 'axios';

import erc20Abi from '../abi/ERC20ABI.json';
import erc721Abi from '../abi/ERC721ABI.json';
import erc1155Abi from '../abi/ERC1155ABI.json';
import { defaultRPC } from '../constants';

const getTokenDetailsByAddress = async (contractAddress: Address) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/ethereum/contract/${contractAddress}`
    );

    const tokenId = response.data.id; // Token ID
    const logo = response.data.image.large; // Token logo URL

    return { tokenId, logo };
  } catch (error) {
    console.error('Error fetching token details:', error);
    return null;
  }
};

async function checkContractType(contractAddress: Address | '') {
  let data: any;
  if (contractAddress === '') return { type: 'Unknown', payload: data };
  const provider = new ethers.JsonRpcProvider(defaultRPC);
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
      const totalSupply = await erc20Contract.totalSupply();
      const tokenName = await erc20Contract.name();
      console.log('This is an ERC20 contract');
      console.log(totalSupply);
      console.log(tokenName);
      const tokenData = await getTokenDetailsByAddress(contractAddress);
      data = { name: tokenName, logo: tokenData?.logo };
      // If totalSupply succeeds, then return, assuming ERC20
      return { type: 'ERC20', payload: data };
    } catch (error) {
      console.error(
        'Could not determine the contract type, or it is none of the above.'
      );
      return { type: 'Unknown' };
    }
  }

  // try {
  //   // Checking if the contract is ERC20 by calling totalSupply
  //   const totalSupply = await erc20Contract.totalSupply();
  //   const tokenName = await erc20Contract.name();
  //   console.log('This is an ERC20 contract');
  //   console.log(totalSupply);
  //   console.log(tokenName);
  //   const tokenData = await getTokenDetailsByAddress(contractAddress);
  //   data = { name: tokenName, logo: tokenData?.logo };
  //   // If totalSupply succeeds, then return, assuming ERC20
  //   return { type: 'ERC20', payload: data };
  // } catch (erc20Error) {
  //   // If the call fails, it could be ERC721 or ERC1155 or others
  //   try {
  //     // Checking if the contract is ERC721 by querying ownerOf for tokenId 1
  //     await erc721Contract.ownerOf(1);
  //     console.log('This is an ERC721 contract');
  //     // If ownerOf succeeds, then assume ERC721
  //     return { type: 'ERC721' };
  //   } catch (erc721Error) {
  //     try {
  //       // Checking if the contract is ERC1155 by calling balanceOf
  //       await erc1155Contract.balanceOf(
  //         '0xf4B2A7e6DC9560128A9d6BBfd474aC8B1f04032B',
  //         1
  //       );
  //       console.log('This is an ERC1155 contract');
  //       // If balanceOf succeeds, then assume ERC1155
  //       return { type: 'ERC1155' };
  //     } catch (erc1155Error) {
  //       console.error(
  //         'Could not determine the contract type, or it is none of the above.'
  //       );
  //       return { type: 'Unknown' };
  //     }
  //   }
  // }
}

export default checkContractType;
