import { createContext, useEffect, useState, useCallback } from 'react';
import { ethers, Contract } from 'ethers';
// import 'dotenv/config';

import FactoryABI from '../abi/FactoryABI.json';
import BlueprintABI from '../abi/BlueprintABI.json';
import { Web3ContextType } from '../types';

const Web3Context = createContext<Web3ContextType | null>(null);

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const [factoryContract, setFactoryContract] = useState<Contract>(
    {} as Contract
  );
  const [blueprintContract, setBlueprintContract] = useState<Contract>(
    {} as Contract
  );

  const factoryContractAddress =
    '0x9709251b4ed6DcbDE95eD1ebADEc1C641b45687E'.toLocaleLowerCase();
  const blueprintContractAddress =
    '0xCf72b7659DD7ee7C8c651166721D64120ECF50aa'.toLocaleLowerCase();

  const init = useCallback(async () => {
    const provider = new ethers.JsonRpcProvider(
      'https://ethereum-sepolia-rpc.publicnode.com'
    );

    try {
      const _factoryContract = new ethers.Contract(
        factoryContractAddress,
        FactoryABI,
        provider
      ) as Contract;

      const _blueprintContract = new ethers.Contract(
        blueprintContractAddress,
        BlueprintABI,
        provider
      ) as Contract;
      setFactoryContract(_factoryContract);
      setBlueprintContract(_blueprintContract);
    } catch (err) {
      console.log(err);
    }
  }, [factoryContractAddress, blueprintContractAddress]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <Web3Context.Provider value={{ factoryContract, blueprintContract }}>
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Context;
