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
  name: string;
  uri: string;
  amount: number;
  tokenAddress: Address;
}

export interface ERC721Data {
  tokenId: number;
  name: string;
  uri: string;
  tokenAddress: Address;
}

export interface ERC1155Data {
  tokenId: number;
  name: string;
  uri: string;
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
};

export type BlueprintTuple = [
  bigint,
  string,
  bigint,
  string,
  string,
  bigint,
  bigint,
  []
];

export type SelectedBlueprint = {
  id: number;
  name: string;
  uri: string;
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
  id: number;
  name: string;
  uri: string;
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
export type SelectedProduct = {
  id: number;
  name: string;
  uri: string;
  address?: string;
  balance: number;
  blueprintAddress: string;
  data: {
    erc20Data: ERC20Data[];
    erc721Data: ERC721Data[];
    erc1155Data: ERC1155Data[];
  };
};
export type CreateBlueprint = {
  name: string;
  uri: string;
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
  uri: string;
  name: string;
  address: string;
  id?: number;
  amount?: number;
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
}
