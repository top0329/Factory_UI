import { atom } from 'jotai';

import {
  BlueprintNFT,
  CreateBlueprint,
  SelectedBlueprint,
  SelectedOwnBlueprint,
  SelectedProduct,
} from '../types';

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
    erc20Data: [],
    erc721Data: [],
    erc1155Data: [],
  },
});
export const selectedOwnBlueprintAtom = atom<SelectedOwnBlueprint>({
  id: 0,
  name: '',
  uri: '',
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
  id: 0,
  name: '',
  uri: '',
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
  uri: 'https://ipfs.io/ipfs/bafkreiac47exop4qnvi47azogyp2xrb45dlyqgsijpnsvkvizkh4rm3uvi',
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

// Store the blueprint token list
export const blueprintTokenListAtom = atom<BlueprintNFT[]>([]);
export const ownBlueprintTokenListAtom = atom<BlueprintNFT[]>([]);

export const productTokenIdListAtom = atom<Array<number>>([]);
