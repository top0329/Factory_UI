import Web3 from 'web3';
import { defaultRPC } from '../constants';

const filterWalletAddress = async (address: string) => {
  const web3 = new Web3(new Web3.providers.HttpProvider(defaultRPC));
  const code = await web3.eth.getCode(address);
  console.log('code>>>>>>>>>>>>>>>>', code);
  if (code == '0x') {
    return true;
  }
  return false;
};

export default filterWalletAddress;
