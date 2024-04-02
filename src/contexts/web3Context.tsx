import {
  createContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import Web3 from 'web3';
import { ethers, Contract, ContractRunner } from 'ethers';
import { useAccount, useChainId } from 'wagmi';

import FactoryABI from '../abi/FactoryABI.json';
import BlueprintABI from '../abi/BlueprintABI.json';
import ProductABI from '../abi/ProductABI.json';
import erc20Abi from '../abi/ERC20ABI.json';
import erc721Abi from '../abi/ERC721ABI.json';
import erc1155Abi from '../abi/ERC1155ABI.json';
import { useEthersProvider, useEthersSigner } from '../utils/wagmi-ethers';
import { Web3ContextType } from '../types';
import {
  defaultRPC,
  factoryAddress,
  blueprintAddress,
  productAddress,
} from '../constants';

declare let window: any;
const Web3Context = createContext<Web3ContextType | null>(null);

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const signer = useEthersSigner();
  const ethersProvider = useEthersProvider();
  const defaultProvider = new ethers.JsonRpcProvider(defaultRPC);
  const web3 = new Web3(window.ethereum);

  // Ethers Contracts
  const [provider, setProvider] = useState<ContractRunner>(defaultProvider);
  const [factoryContract, setFactoryContract] = useState<Contract>(
    {} as Contract
  );
  const [blueprintContract, setBlueprintContract] = useState<Contract>(
    {} as Contract
  );
  const [productContract, setProductContract] = useState<Contract>(
    {} as Contract
  );

  // Web3 Contracts
  const [factoryWeb3, setFactoryWeb3] = useState<Contract>({} as Contract);
  const [blueprintWeb3, setBlueprintWeb3] = useState<Contract>({} as Contract);
  const [productWeb3, setProductWeb3] = useState<Contract>({} as Contract);

  const init = useCallback(async () => {
    try {
      if (!isConnected || !ethersProvider) {
        console.log('Not connected wallet');
      } else {
        setProvider(ethersProvider);
        console.log('Connected wallet');
      }

      // Ethers Contracts
      const _factoryContract: Contract = new ethers.Contract(
        factoryAddress,
        FactoryABI,
        provider
      ) as Contract;
      const _blueprintContract: Contract = new ethers.Contract(
        blueprintAddress,
        BlueprintABI,
        provider
      ) as Contract;
      const _productContract: Contract = new ethers.Contract(
        productAddress,
        ProductABI,
        provider
      ) as Contract;

      // Web3 Contracts
      const _factoryWeb3: any = new web3.eth.Contract(
        FactoryABI,
        factoryAddress
      );
      const _blueprintWeb3: any = new web3.eth.Contract(
        BlueprintABI,
        blueprintAddress
      );
      const _productWeb3: any = new web3.eth.Contract(
        ProductABI,
        productAddress
      );

      setFactoryContract(_factoryContract);
      setBlueprintContract(_blueprintContract);
      setProductContract(_productContract);

      setFactoryWeb3(_factoryWeb3);
      setBlueprintWeb3(_blueprintWeb3);
      setProductWeb3(_productWeb3);
    } catch (err) {
      console.log(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, ethersProvider, provider]);

  useEffect(() => {
    init();
  }, [init]);

  const erc20Approve = useCallback(
    async (erc20Address: string, spender: string, amount: string) => {
      try {
        const erc20Contract = new web3.eth.Contract(erc20Abi, erc20Address);
        const tx = await erc20Contract.methods
          .approve(spender, amount)
          .send({ from: address });
        console.log('tx.transactionHash', tx.transactionHash);

        const receipt = await web3.eth.getTransactionReceipt(
          tx.transactionHash
        );

        return receipt.status;
      } catch (err) {
        console.log(err);
      }
    },
    [address, web3.eth]
  );

  const erc721Approve = useCallback(
    async (erc721Address: string, spender: string, tokenId: string) => {
      try {
        const erc721Contract = new web3.eth.Contract(erc721Abi, erc721Address);
        const tx = await erc721Contract.methods
          .approve(spender, tokenId)
          .send({ from: address });
        const receipt = await web3.eth.getTransactionReceipt(
          tx.transactionHash
        );

        return receipt.status;
      } catch (err) {
        console.log(err);
      }
    },
    [address, web3.eth]
  );

  const erc1155Approve = useCallback(
    async (erc1155Address: string, spender: string, approved: boolean) => {
      try {
        const erc1155Contract = new web3.eth.Contract(
          erc1155Abi,
          erc1155Address
        );
        const tx = await erc1155Contract.methods
          .setApprovalForAll(spender, approved)
          .send({ from: address });

        const receipt = await web3.eth.getTransactionReceipt(
          tx.transactionHash
        );

        return receipt.status;
      } catch (err) {
        console.log(err);
      }
    },
    [address, web3.eth]
  );

  const value = useMemo(
    () => ({
      account: address,
      chainId,
      isConnected,
      library: provider ?? signer,
      factoryContract,
      blueprintContract,
      productContract,
      factoryWeb3,
      blueprintWeb3,
      productWeb3,
      erc20Approve,
      erc721Approve,
      erc1155Approve,
    }),
    [
      address,
      chainId,
      isConnected,
      provider,
      signer,
      factoryContract,
      blueprintContract,
      productContract,
      factoryWeb3,
      blueprintWeb3,
      productWeb3,
      erc20Approve,
      erc721Approve,
      erc1155Approve,
    ]
  );

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

export default Web3Context;
