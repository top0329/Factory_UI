import { Address } from 'viem';
import { ethers } from 'ethers';

import erc20Abi from '../abi/ERC20ABI.json';
import { defaultRPC } from '../constants';

async function getTokenData(contractAddress: Address) {
  const provider = new ethers.JsonRpcProvider(defaultRPC);
  const erc20Contract = new ethers.Contract(
    contractAddress,
    erc20Abi,
    provider
  );
  try {
    const tokenName = await erc20Contract.name();
    const decimal = await erc20Contract.decimals();

    return { decimal: decimal, tokenName: tokenName };
  } catch (err) {
    console.error(err);
  }
}

export default getTokenData;
