import { Component } from 'react';
import { atom } from 'jotai';

import {
  AdvancedFilterValue,
  BlueprintNFT,
  ComponentSortField,
  CreateBlueprint,
  ProductToken,
  SelectedBlueprint,
  SelectedOwnBlueprint,
  SelectedProduct,
  SortField,
} from '../types';

export const isAddComponentModalAtom = atom<boolean>(false);
export const isEditComponentModalAtom = atom<boolean>(false);
export const showFilterOptionAtom = atom<boolean>(false);
export const isLoadingAtom = atom<boolean>(false);
export const isDataEmptyAtom = atom<boolean>(false);
export const activeAddComponentTokenAtom = atom<number>(0);
export const searchValueAtom = atom<string>('');
export const selectedBlueprintAtom = atom<SelectedBlueprint>({
  id: '',
  name: '',
  imageUri: '',
  creator: '',
  totalSupply: 0,
  mintPrice: 0,
  mintPriceUnit: 0,
  mintLimit: 0,
  mintedAmount: 0,
  myBlueprint: false,
  data: {
    erc20Data: [],
    erc721Data: [],
    erc1155Data: [],
  },
});
export const selectedOwnBlueprintAtom = atom<SelectedOwnBlueprint>({
  id: '',
  name: '',
  imageUri: '',
  creator: '',
  balance: 0,
  blueprintAddress: '',
  myBlueprint: false,
  data: {
    erc20Data: [],
    erc721Data: [],
    erc1155Data: [],
  },
});
export const selectedProductintAtom = atom<SelectedProduct>({
  id: '',
  name: '',
  imageUri: '',
  address: '',
  balance: 0,
  blueprintAddress: '',
  data: {
    erc20Data: [],
    erc721Data: [],
    erc1155Data: [],
  },
});

const localStorageEffect = (key: string) => (atomWithStorage: any) => {
  const getInitialValue = () => {
    const item = localStorage.getItem(key);
    if (item !== null) {
      return JSON.parse(item);
    }
    return atomWithStorage;
  };
  const anAtom = atom(getInitialValue(), (get, set, update) => {
    const nextValue =
      typeof update === 'function' ? update(get(anAtom)) : update;
    set(anAtom, nextValue);
    const stringified = JSON.stringify(nextValue, (_key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    );
    localStorage.setItem(key, stringified);
  });
  return anAtom;
};

export const blueprintSelectionState = localStorageEffect('selected-blueprint')(
  selectedBlueprintAtom
);
export const ownBlueprintSelectionState = localStorageEffect(
  'selected-ownBlueprint'
)(selectedOwnBlueprintAtom);
export const productSelectionState = localStorageEffect('selected-product')(
  selectedProductintAtom
);
export const isCreatorModeAtom = atom<boolean>(false);
export const createBlueprintAtom = atom<CreateBlueprint>({
  id: '',
  name: '',
  imageUri: 'https://ipfs.io/ipfs/bafkreiac47exop4qnvi47azogyp2xrb45dlyqgsijpnsvkvizkh4rm3uvi',
  creator: '',
  totalSupply: '',
  mintPrice: '',
  mintPriceUnit: '',
  mintLimit: '',
  data: {
    erc20Data: [],
    erc721Data: [],
    erc1155Data: [],
  },
});
export const availableComponentAtom = atom<number>(7);
export const headerActiveItemAtom = atom<number>(0);

export const blueprintTokenListAtom = atom<BlueprintNFT[]>([]);
export const ownBlueprintTokenListAtom = atom<ProductToken[]>([]);
export const productTokenListAtom = atom<Array<ProductToken>>([]);
export const componentTokenListAtom = atom<Array<Component>>([]);

export const sortFieldAtom = atom<SortField>('id');
export const componentSortFieldAtom = atom<ComponentSortField>('name');
export const sortOrderAtom = atom<string>('asc');
export const advancedFilterValueAtom = atom<AdvancedFilterValue>({
  blueprintIdMin: '',
  blueprintIdMax: '',
  mintPriceUnit: 0,
  mintPriceMin: '',
  mintPriceMax: '',
  mintLimitMin: '',
  mintLimitMax: '',
  totalSupplyMin: '',
  totalSupplyMax: '',
  mintedAmountMin: '',
  mintedAmountMax: '',
  productIdMin: '',
  productIdMax: '',
  productBalanceMin: '',
  productBalanceMax: '',
});
