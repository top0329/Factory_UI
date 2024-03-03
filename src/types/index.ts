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
