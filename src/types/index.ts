import { ReactElement } from 'react';
import { Contract, ContractRunner } from 'ethers';
import { Address } from 'viem';

export interface IButtonClass {
  name: string;
  style: string;
}

export interface WindowSize {
  width?: number;
  height?: number;
}

export type CarouselModel = {
  headerText?: string | null;
  subText?: string | null;
  image: string;
};

export interface ERC20Data {
  name?: string;
  uri?: string;
  amount: number;
  tokenAddress: Address;
}

export interface ERC721Data {
  name?: string;
  tokenId: number;
  tokenAddress: Address;
}

export interface ERC1155Data {
  name?: string;
  tokenId: number;
  amount: number;
  tokenAddress: Address;
}

export type Web3ContextType = {
  account?: Address;
  chainId?: number;
  isConnected?: boolean;
  library?: ContractRunner;
  factoryContract: Contract;
  blueprintContract: Contract;
  productContract: Contract;
  factoryWeb3: any;
  blueprintWeb3: any;
  productWeb3: any;
  erc20Approve: (erc20Address: string, spender: string, amount: string) => any;
  erc721Approve: (
    erc721Address: string,
    spedner: string,
    tokenId: string
  ) => any;
  erc1155Approve: (
    erc1155Address: string,
    spender: string,
    approved: boolean
  ) => any;
};

export type SelectedBlueprint = {
  id: string;
  name: string;
  imageUri: string;
  creator: Address | '';
  totalSupply: number;
  mintPrice: number;
  mintPriceUnit: number;
  mintLimit: number;
  mintedAmount: number;
  myBlueprint: boolean;
  data: {
    erc20Data: ERC20Data[];
    erc721Data: ERC721Data[];
    erc1155Data: ERC1155Data[];
  };
};

export type SelectedOwnBlueprint = {
  id: string;
  name: string;
  imageUri: string;
  creator: Address | '';
  balance: number;
  blueprintAddress: Address | '';
  myBlueprint: boolean;
  data: {
    erc20Data: ERC20Data[];
    erc721Data: ERC721Data[];
    erc1155Data: ERC1155Data[];
  };
};

export type ProductToken = {
  id: string;
  name: string;
  imageUri: string;
  creator: string;
  balance: number;
  blueprintAddress: string;
  myBlueprint: boolean;
  data: any;
  decomposeFee?: number;
};

export type SelectedProduct = {
  id: string;
  name: string;
  imageUri: string;
  address?: string;
  balance: number;
  blueprintAddress: string;
  data: {
    erc20Data: ERC20Data[];
    erc721Data: ERC721Data[];
    erc1155Data: ERC1155Data[];
  };
  decomposeFee?: number;
};

export type CreateBlueprint = {
  id: string;
  name: string;
  imageUri: string;
  creator: Address | '' | undefined;
  totalSupply: number | '';
  mintPrice: number | '';
  mintPriceUnit: number | '';
  mintLimit: number | '';
  data: {
    erc20Data: ERC20Data[];
    erc721Data: ERC721Data[];
    erc1155Data: ERC1155Data[];
  };
};

export interface ListCardInterface {
  isDecompose: boolean;
  type: number;
  tokenAddress: string;
  tokenId?: number;
  amount?: number | bigint;
  0?: string;
  1?: string;
  2?: string;
}

export type AddComponentModalInputValue = {
  erc20Address: Address | '';
  erc20Amount: number | '';
  erc721Address: Address | '';
  erc721Id: number | '';
  erc1155Address: Address | '';
  erc1155Id: number | '';
  erc1155Amount: number | '';
};

export interface AdvancedFilterValue {
  blueprintIdMin: number | '';
  blueprintIdMax: number | '';
  mintPriceUnit: number;
  mintPriceMin: number | '';
  mintPriceMax: number | '';
  mintLimitMin: number | '';
  mintLimitMax: number | '';
  totalSupplyMin: number | '';
  totalSupplyMax: number | '';
  mintedAmountMin: number | '';
  mintedAmountMax: number | '';
  productIdMin: number | '';
  productIdMax: number | '';
  productBalanceMin: number | '';
  productBalanceMax: number | '';
}

export enum MintPriceUnit {
  ETH,
  USDT,
  USDC,
}

export interface BlueprintData {
  erc20Data: ERC20Data[];
  erc721Data: ERC721Data[];
  erc1155Data: ERC1155Data[];
}

export interface BlueprintNFT {
  id: number;
  name: string;
  imageUri: string;
  creator: string;
  totalSupply: number;
  mintPrice: number;
  mintPriceUnit: MintPriceUnit;
  mintLimit: number;
  data: BlueprintData;
}

export type GuardProps = {
  children: ReactElement | null;
};

export type SelectedComponentData = {
  id: number;
  tokenId?: number;
  tokenAddress: string;
  erc20Amount?: number;
  erc1155Amount?: number;
};

export type ERC20ComponentData = {
  name: string;
  address: string;
  amount: string;
  decimal: number;
};

export type ERC721ComponentData = {
  name: string;
  id: string;
  address: string;
};

export type ERC1155ComponentData = {
  name: string;
  id: string;
  amount: string;
  address: string;
};

export type SortField =
  | 'id'
  | 'name'
  | 'totalSupply'
  | 'mintPrice'
  | 'mintLimit'
  | 'mintedAmount';
