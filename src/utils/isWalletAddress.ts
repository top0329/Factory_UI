import Web3 from 'web3';

const filterWalletAddress = async (address: string) => {
  const web3 = new Web3(window.ethereum);
  const code = await web3.eth.getCode(address);
  if (code == '0x') {
    return true;
  }
  return false;
};

export default filterWalletAddress;
