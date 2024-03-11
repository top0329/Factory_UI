import { ethers } from 'ethers';
import { defaultRPC } from '../constants';

export default async function isContractAddress(address: string) {
  const provider = new ethers.JsonRpcProvider(defaultRPC);
  // Validate the address format
  if (!ethers.isAddress(address)) {
    return false;
  }

  // Fetch the code existing at the address
  const code = await provider.getCode(address);

  // If code exists, this is likely a contract address
  return code !== '0x';
}
