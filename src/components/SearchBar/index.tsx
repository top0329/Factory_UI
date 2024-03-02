import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { Icon } from '@iconify/react/dist/iconify.js';

import Button from '../Button';
import { searchValueAtom } from '../../jotai/atoms';
import AdvancedSort from './AdvancedSort';

export interface Props {
  value?: string;
  isNewButton?: boolean;
}

const SearchBar: FC<Props> = ({ isNewButton }) => {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useAtom<string>(searchValueAtom);

  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const invalidChars = /['"`\\;%&!@#$%^?~]/;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (invalidChars.test(value)) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
      return;
    } else {
      setSearchValue(value);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full">
        <div className="my-5 gap-3 sm:flex sm:items-center">
          <div className="flex w-full relative">
            <Icon
              className="absolute z-10 text-light-gray min-w-6 min-h-6 m-2 cursor-pointer"
              icon="icon-park-outline:setting-config"
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
              className="inline w-full rounded-lg border border-light-gray text-white bg-black py-2 ml-10 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-slate-600 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-slate-600 sm:text-sm"
              placeholder="Search for Blueprint ID, Name and Creator"
              type="search"
              value={searchValue}
              onChange={handleSearchChange}
            />
            {showTooltip && (
              <div
                className="absolute -bottom-12 left-16 mb-2 px-4 py-2 bg-gray-700 text-white text-xs rounded-lg transition-opacity opacity-100"
                style={{ transition: 'opacity 0.3s' }}
              >
                Special characters are not allowed!
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-2 sm:gap-0 sm:mt-0 ">
            <AdvancedSort />
            <Button
              className={`${
                isNewButton === true ? 'flex' : 'hidden'
              } truncate justify-center px-0.5 py-2 search-button-width rounded-lg border border-primary bg-black font-medium text-light-gray shadow-sm sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm sm:min-w-36`}
              text="New Blueprint"
              variant="primary"
              onClick={() => navigate('/blueprint/new')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
