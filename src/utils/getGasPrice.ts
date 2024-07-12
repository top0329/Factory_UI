export const getGasPrice = async (web3: any, chainId: number) => {
  if (chainId === 11155111) {
    const gasPrice = await web3.eth.getGasPrice();
    return Number(gasPrice);
  } else if (chainId === 137) {
    const gasPrice = await web3.eth.getGasPrice();
    return Number(gasPrice) * 1.5;
  } else if (chainId === 80002) {
    const gasPrice = await web3.eth.getGasPrice();
    return Number(gasPrice) * 1.5;
  }
};
