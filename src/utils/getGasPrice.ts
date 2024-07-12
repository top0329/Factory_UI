export const getGasPrice = async (web3: any) => {
  const gasPrice = await web3.eth.getGasPrice();
  return Number(gasPrice) * 1.5;
};
