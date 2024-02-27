import { FC } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

import Button from '../Button';
import { useAtom } from 'jotai';
import { isAddComponentModalAtom, searchValueAtom } from '../../jotai/atoms';

export interface Props {
  value?: string;
}

const SearchBar: FC<Props> = () => {
  const [searchValue, setSearchValue] = useAtom(searchValueAtom);
  const [, setAddComponentModalOpen] = useAtom(isAddComponentModalAtom);

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full">
        <div className="my-5 sm:flex sm:items-center">
          <div className="flex w-full relative">
            <Icon
              icon="icon-park-outline:setting-config"
              className="text-light-gray min-w-5 min-h-5 m-2"
            />
            <div className="absolute left-0 inset-y-0 flex items-center">
              <Icon
                icon="ic:baseline-search"
                className="text-light-gray w-6 h-6 ml-12"
              />
            </div>
            <input
              id="search"
              name="search"
              className="inline w-full rounded-lg border border-light-gray text-white bg-black py-2 pl-12 pr-3 leading-5 placeholder-gray-500 focus:border-slate-600 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-slate-600 sm:text-sm"
              placeholder="Search for Blueprint ID, Name and Creator"
              type="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <div className="flex gap-3 mt-2 sm:gap-0 sm:mt-0">
            <button className="flex justify-between gap-0 items-center px-1 search-button-width py-1.5 rounded-lg border border-light-gray bg-black font-medium text-light-gray shadow-sm sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm sm:min-w-36 sm:gap-3">
              <Icon
                icon="iconamoon:sorting-left"
                className="text-light-gray w-6 h-6"
              />
              Sort by
              <Icon
                icon="icon-park-solid:down-one"
                className="text-light-gray w-6 h-6"
              />
            </button>
            <Button
              className="truncate flex justify-center px-0.5 py-2 search-button-width rounded-lg border border-primary bg-black font-medium text-light-gray shadow-sm sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm sm:min-w-36"
              text="New Blueprint"
              variant="primary"
              onClick={() => setAddComponentModalOpen(true)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
