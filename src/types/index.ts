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

export type Web3ContextType = {
  account?: Address;
  chainId?: number;
  isConnected?: boolean;
  library?: ContractRunner;
  factoryContract: Contract;
  blueprintContract: Contract;
  productContract: Contract;
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
  creator: string;
  totalSupply: number;
  mintPrice: number;
  mintPriceUnit: number;
  mintLimit: number;
  mintedAmount: number;
  myBlueprint: boolean;
  data: {
    erc20Data: [
      {
        name: string;
        uri: string;
        amount: number;
        address: string;
      }
    ];
    erc721Data: [
      {
        id: number;
        name: string;
        uri: string;
        address: string;
      }
    ];
    erc1155Data: [
      {
        id: number;
        name: string;
        uri: string;
        amount: number;
        address: string;
      }
    ];
  };
};

export type SelectedOwnBlueprint = {
  id: number;
  name: string;
  uri: string;
  creator: string;
  balance: number;
  blueprintAddress: string;
  myBlueprint: boolean;
  data: {
    erc20Data: [
      {
        name: string;
        uri: string;
        amount: number;
        address: string;
      }
    ];
    erc721Data: [
      {
        id: number;
        name: string;
        uri: string;
        address: string;
      }
    ];
    erc1155Data: [
      {
        id: number;
        name: string;
        uri: string;
        amount: number;
        address: string;
      }
    ];
  };
};

export type CreateBlueprint = {
  name: string;
  uri: string;
  creator: string;
  totalSupply: number;
  mintPrice: number;
  mintPriceUnit: number;
  mintLimit: number;
  data: {
    erc20Data: [
      {
        name: string;
        uri: string;
        amount: number;
        address: string;
      }
    ];
    erc721Data: [
      {
        id: number;
        name: string;
        uri: string;
        address: string;
      }
    ];
    erc1155Data: [
      {
        id: number;
        name: string;
        uri: string;
        amount: number;
        address: string;
      }
    ];
  };
};

export interface OwnBlueprintList {
  // erc20: {
    isDecompose?: boolean;
    type: number;
    subType: number;
    uri: string;
    name: string;
    address: string;
    id?: number;
    amount?: number;
  // };
  // erc751: {
  //   isDecompose?: boolean;
  //   type: number;
  //   subType: number;
  //   uri: string;
  //   name: string;
  //   address: string;
  //   id?: number;
  //   amount?: number;
  // };
  // erc1155: {
  //   isDecompose?: boolean;
  //   type: number;
  //   subType: number;
  //   uri: string;
  //   name: string;
  //   address: string;
  //   id?: number;
  //   amount?: number;
  // };
}