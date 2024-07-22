import { createStore, Provider } from 'jotai';
import { createElement, ReactNode } from 'react';

const store = createStore();

export type StoreProviderProps = {
  children: ReactNode;
};

export function StoreProvider(props: StoreProviderProps): JSX.Element {
  return createElement(Provider, { store, ...props });
}
