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
  usdtAddress,
  usdcAddress,
  CHAIN_EXPLORER,
} from '../constants';
import { getGasPrice } from '../utils/getGasPrice';

declare let window: any;
const Web3Context = createContext<Web3ContextType | null>(null);

let web3: any;

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const signer = useEthersSigner();
  const ethersProvider = useEthersProvider();
  let defaultProvider: any;
  if (chainId === 11155111) {
    defaultProvider = new ethers.JsonRpcProvider(defaultRPC.sepolia);
  } else if (chainId === 137) {
    defaultProvider = new ethers.JsonRpcProvider(defaultRPC.polygon);
  } else if (chainId === 80002) {
    defaultProvider = new ethers.JsonRpcProvider(defaultRPC.amoy);
  }

  const [provider, setProvider] = useState<ContractRunner>(defaultProvider);
  const [currentFactoryAddress, setCurrentFactoryAddress] =
    useState<string>('');
  const [currentBlueprintAddress, setCurrentBlueprintAddress] =
    useState<string>('');
  const [currentProductAddress, setCurrentProductAddress] =
    useState<string>('');
  const [currentUSDTAddress, setCurrentUSDTAddress] = useState<string>('');
  const [currentUSDCAddress, setCurrentUSDCAddress] = useState<string>('');
  const [factoryContract, setFactoryContract] = useState<Contract>(
    {} as Contract
  );
  const [blueprintContract, setBlueprintContract] = useState<Contract>(
    {} as Contract
  );
  const [productContract, setProductContract] = useState<Contract>(
    {} as Contract
  );

  const [factoryWeb3, setFactoryWeb3] = useState<any>();
  const [blueprintWeb3, setBlueprintWeb3] = useState<any>();
  const [productWeb3, setProductWeb3] = useState<any>();
  const [nativeTokenUnit, setNativeTokenUnit] = useState<string>('ETH');
  const [chainExplorer, setChainExplorer] = useState<string>(
    CHAIN_EXPLORER.mainnet
  );

  const init = useCallback(async () => {
    try {
      if (typeof window !== 'undefined') {
        web3 = new Web3(window.ethereum);
      }
      if (!isConnected || !ethersProvider) {
        console.log('Not connected wallet');
      } else {
        setProvider(ethersProvider);
        console.log('Connected wallet');
      }

      if (chainId === 1) {
        setFactoryContract(
          new ethers.Contract(
            factoryAddress.mainnet,
            FactoryABI,
            provider
          ) as Contract
        );
        setBlueprintContract(
          new ethers.Contract(
            blueprintAddress.mainnet,
            BlueprintABI,
            provider
          ) as Contract
        );
        setProductContract(
          new ethers.Contract(
            productAddress.mainnet,
            ProductABI,
            provider
          ) as Contract
        );
        setFactoryWeb3(
          new web3.eth.Contract(FactoryABI, factoryAddress.mainnet)
        );
        setBlueprintWeb3(
          new web3.eth.Contract(BlueprintABI, blueprintAddress.mainnet)
        );
        setProductWeb3(
          new web3.eth.Contract(ProductABI, productAddress.mainnet)
        );
        setCurrentFactoryAddress(factoryAddress.mainnet);
        setCurrentBlueprintAddress(blueprintAddress.mainnet);
        setCurrentProductAddress(productAddress.mainnet);
        setCurrentUSDTAddress(usdtAddress.mainnet);
        setCurrentUSDCAddress(usdcAddress.mainnet);
        setNativeTokenUnit('ETH');
        setChainExplorer(CHAIN_EXPLORER.mainnet);
      } else if (chainId === 11155111) {
        setFactoryContract(
          new ethers.Contract(
            factoryAddress.sepolia,
            FactoryABI,
            provider
          ) as Contract
        );
        setBlueprintContract(
          new ethers.Contract(
            blueprintAddress.sepolia,
            BlueprintABI,
            provider
          ) as Contract
        );
        setProductContract(
          new ethers.Contract(
            productAddress.sepolia,
            ProductABI,
            provider
          ) as Contract
        );
        setFactoryWeb3(
          new web3.eth.Contract(FactoryABI, factoryAddress.sepolia)
        );
        setBlueprintWeb3(
          new web3.eth.Contract(BlueprintABI, blueprintAddress.sepolia)
        );
        setProductWeb3(
          new web3.eth.Contract(ProductABI, productAddress.sepolia)
        );
        setCurrentFactoryAddress(factoryAddress.sepolia);
        setCurrentBlueprintAddress(blueprintAddress.sepolia);
        setCurrentProductAddress(productAddress.sepolia);
        setCurrentUSDTAddress(usdtAddress.sepolia);
        setCurrentUSDCAddress(usdcAddress.sepolia);
        setNativeTokenUnit('ETH');
        setChainExplorer(CHAIN_EXPLORER.sepolia);
      } else if (chainId === 56) {
        setFactoryContract(
          new ethers.Contract(
            factoryAddress.bsc,
            FactoryABI,
            provider
          ) as Contract
        );
        setBlueprintContract(
          new ethers.Contract(
            blueprintAddress.bsc,
            BlueprintABI,
            provider
          ) as Contract
        );
        setProductContract(
          new ethers.Contract(
            productAddress.bsc,
            ProductABI,
            provider
          ) as Contract
        );
        setFactoryWeb3(new web3.eth.Contract(FactoryABI, factoryAddress.bsc));
        setBlueprintWeb3(
          new web3.eth.Contract(BlueprintABI, blueprintAddress.bsc)
        );
        setProductWeb3(new web3.eth.Contract(ProductABI, productAddress.bsc));
        setCurrentFactoryAddress(factoryAddress.bsc);
        setCurrentBlueprintAddress(blueprintAddress.bsc);
        setCurrentProductAddress(productAddress.bsc);
        setCurrentUSDTAddress(usdtAddress.bsc);
        setCurrentUSDCAddress(usdcAddress.bsc);
        setNativeTokenUnit('BNB');
        setChainExplorer(CHAIN_EXPLORER.bsc);
      } else if (chainId === 137) {
        setFactoryContract(
          new ethers.Contract(
            factoryAddress.polygon,
            FactoryABI,
            provider
          ) as Contract
        );
        setBlueprintContract(
          new ethers.Contract(
            blueprintAddress.polygon,
            BlueprintABI,
            provider
          ) as Contract
        );
        setProductContract(
          new ethers.Contract(
            productAddress.polygon,
            ProductABI,
            provider
          ) as Contract
        );
        setFactoryWeb3(
          new web3.eth.Contract(FactoryABI, factoryAddress.polygon)
        );
        setBlueprintWeb3(
          new web3.eth.Contract(BlueprintABI, blueprintAddress.polygon)
        );
        setProductWeb3(
          new web3.eth.Contract(ProductABI, productAddress.polygon)
        );
        setCurrentFactoryAddress(factoryAddress.polygon);
        setCurrentBlueprintAddress(blueprintAddress.polygon);
        setCurrentProductAddress(productAddress.polygon);
        setCurrentUSDTAddress(usdtAddress.polygon);
        setCurrentUSDCAddress(usdcAddress.polygon);
        setNativeTokenUnit('MATIC');
        setChainExplorer(CHAIN_EXPLORER.polygon);
      } else if (chainId === 80002) {
        setFactoryContract(
          new ethers.Contract(
            factoryAddress.amoy,
            FactoryABI,
            provider
          ) as Contract
        );
        setBlueprintContract(
          new ethers.Contract(
            blueprintAddress.amoy,
            BlueprintABI,
            provider
          ) as Contract
        );
        setProductContract(
          new ethers.Contract(
            productAddress.amoy,
            ProductABI,
            provider
          ) as Contract
        );
        setFactoryWeb3(new web3.eth.Contract(FactoryABI, factoryAddress.amoy));
        setBlueprintWeb3(
          new web3.eth.Contract(BlueprintABI, blueprintAddress.amoy)
        );
        setProductWeb3(new web3.eth.Contract(ProductABI, productAddress.amoy));
        setCurrentFactoryAddress(factoryAddress.amoy);
        setCurrentBlueprintAddress(blueprintAddress.amoy);
        setCurrentProductAddress(productAddress.amoy);
        setCurrentUSDTAddress(usdtAddress.amoy);
        setCurrentUSDCAddress(usdcAddress.amoy);
        setNativeTokenUnit('MATIC');
        setChainExplorer(CHAIN_EXPLORER.amoy);
      }
    } catch (err) {
      console.log(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, ethersProvider, provider, chainId]);

  useEffect(() => {
    init();
  }, [init]);

  const erc20Approve = useCallback(
    async (erc20Address: string, spender: string, amount: string) => {
      try {
        const erc20Contract = new web3.eth.Contract(erc20Abi, erc20Address);
        const gasPrice = await getGasPrice(web3, chainId);
        if (gasPrice) {
          const tx = await erc20Contract.methods
            .approve(spender, amount)
            .send({ from: address, gasPrice: gasPrice.toString() });
          return tx;
        }
      } catch (err) {
        console.log(err);
      }
    },
    [address, chainId]
  );

  const erc721Approve = useCallback(
    async (erc721Address: string, spender: string, tokenId: string) => {
      try {
        const erc721Contract = new web3.eth.Contract(erc721Abi, erc721Address);
        const gasPrice = await getGasPrice(web3, chainId);
        if (gasPrice) {
          const tx = await erc721Contract.methods
            .approve(spender, tokenId)
            .send({ from: address, gasPrice: gasPrice.toString() });
          return tx;
        }
      } catch (err) {
        console.log(err);
      }
    },
    [address, chainId]
  );

  const erc1155Approve = useCallback(
    async (erc1155Address: string, spender: string, approved: boolean) => {
      try {
        const erc1155Contract = new web3.eth.Contract(
          erc1155Abi,
          erc1155Address
        );
        const gasPrice = await getGasPrice(web3, chainId);
        if (gasPrice) {
          const tx = await erc1155Contract.methods
            .setApprovalForAll(spender, approved)
            .send({ from: address, gasPrice: gasPrice.toString() });
          return tx;
        }
      } catch (err) {
        console.log(err);
      }
    },
    [address, chainId]
  );

  const value = useMemo(
    () => ({
      account: address,
      chainId,
      isConnected,
      library: provider ?? signer,
      currentFactoryAddress,
      currentBlueprintAddress,
      currentProductAddress,
      currentUSDTAddress,
      currentUSDCAddress,
      factoryContract,
      blueprintContract,
      productContract,
      factoryWeb3,
      blueprintWeb3,
      productWeb3,
      erc20Approve,
      erc721Approve,
      erc1155Approve,
      web3,
      nativeTokenUnit,
      chainExplorer,
    }),
    [
      address,
      chainId,
      isConnected,
      provider,
      signer,
      currentFactoryAddress,
      currentBlueprintAddress,
      currentProductAddress,
      currentUSDTAddress,
      currentUSDCAddress,
      factoryContract,
      blueprintContract,
      productContract,
      factoryWeb3,
      blueprintWeb3,
      productWeb3,
      erc20Approve,
      erc721Approve,
      erc1155Approve,
      nativeTokenUnit,
      chainExplorer,
    ]
  );

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

export default Web3Context;
