import { atom } from 'jotai';

import { CreateBlueprint, SelectedBlueprint } from '../types';

export const isAddComponentModalAtom = atom<boolean>(false);
// export const isMintBlueprintModalAtom = atom<boolean>(false);
export const activeAddComponentTokenAtom = atom<number>(0);
export const searchValueAtom = atom<string>('');
export const selectedBlueprintAtom = atom<SelectedBlueprint>({
  id: 0,
  name: '',
  uri: '',
  creator: '',
  totalSupply: 0,
  mintPrice: 0,
  mintPriceUnit: 0,
  mintLimit: 0,
  mintedAmount: 0,
  myBlueprint: false,
  data: {
    erc20Data: [
      {
        name: '',
        uri: '',
        amount: 0,
        address: '',
      },
    ],
    erc721Data: [
      {
        id: 0,
        name: '',
        uri: '',
        address: '',
      },
    ],
    erc1155Data: [
      {
        id: 0,
        name: '',
        uri: '',
        amount: 0,
        address: '',
      },
    ],
  },
});
export const isCreatorModeAtom = atom<boolean>(false);
export const createBlueprintAtom = atom<CreateBlueprint>({
  name: '',
  uri: 'https://indigo-payable-walrus-596.mypinata.cloud/ipfs/QmeQ8HeECmvwS2He66ccwrK9rbUuMzoLVJ3JiCbRWRbwqo',
  creator: '',
  totalSupply: 0,
  mintPrice: 0,
  mintPriceUnit: 0,
  mintLimit: 0,
  data: {
    erc20Data: [
      {
        name: '',
        uri: '',
        amount: 0,
        address: '',
      },
    ],
    erc721Data: [
      {
        id: 0,
        name: '',
        uri: '',
        address: '',
      },
    ],
    erc1155Data: [
      {
        id: 0,
        name: '',
        uri: '',
        amount: 0,
        address: '',
      },
    ],
  },
});
