import { Contract } from 'ethers';

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
  factoryContract: Contract;
  blueprintContract: Contract;
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
