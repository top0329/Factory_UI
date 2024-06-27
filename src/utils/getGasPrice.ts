import Web3 from 'web3';

const web3 = new Web3(window.ethereum);

export const getGasPrice = async (chainId: number) => {
  if (chainId === 11155111) {
    const gasPrice = await web3.eth.getGasPrice();
    return Number(gasPrice);
  } else if (chainId === 80002) {
    const gasPrice = await web3.eth.getGasPrice();
    return Number(gasPrice);
  }
};
