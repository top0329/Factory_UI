import Web3 from 'web3';

let web3: any;

if (typeof window !== 'undefined') {
  web3 = new Web3(window.ethereum);
}

const filterWalletAddress = async (address: string) => {
  const code = await web3.eth.getCode(address);
  if (code == '0x') {
    return true;
  }
  return false;
};

export default filterWalletAddress;
