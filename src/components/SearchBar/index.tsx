import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { Icon } from '@iconify/react/dist/iconify.js';

import Button from '../Button';
import AdvancedSort from './AdvancedSort';
import AdvancedFilter from './AdvancedFilter';
import useWeb3 from '../../hooks/useWeb3';
import useToast from '../../hooks/useToast';
import { isCreatorModeAtom, searchValueAtom } from '../../jotai/atoms';
import { invalidChars } from '../../constants';

export interface Props {
  value?: string;
  isNewButton?: boolean;
  placeholders: string;
  advancedFilter?: boolean;
  pageFilter?: 'normal' | 'product' | 'component';
  isProduct?: boolean;
}

const SearchBar: FC<Props> = ({
  isNewButton,
  placeholders,
  advancedFilter,
  pageFilter,
  isProduct,
}) => {
  const { isConnected } = useWeb3();
  const { showToast } = useToast();

  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useAtom<string>(searchValueAtom);
  const [isCreatorMode] = useAtom<boolean>(isCreatorModeAtom);

  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [showFilterOption, setShowFilterOption] = useState<boolean>(false);

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

  const handleFilterChange = () => {
    setShowFilterOption(!showFilterOption);
  };

  const handleNewBlueprintButtonClicked = () => {
    if (isConnected) navigate('/blueprint/new');
    else {
      showToast('warning', 'Please connect your wallet first');
    }
  };

  return (
    <div className="my-5 gap-2 sm:flex sm:items-center">
      <div className="flex w-full relative">
        {advancedFilter && (
          <React.Fragment>
            <Icon
              className="absolute z-20 text-light-gray min-w-6 min-h-6 m-2 cursor-pointer"
              icon="icon-park-outline:setting-config"
              onClick={handleFilterChange}
            />
            {showFilterOption && (
              <React.Fragment>
                <div className="absolute top-0 left-0 mt-12 ml-2 z-40">
                  <AdvancedFilter isProduct={isProduct} />
                </div>
                <div
                  className="z-10 fixed right-0 bottom-0 top-0 left-0 flex items-center justify-center bg-opacity-40 bg-[#1D2127]"
                  onClick={() => setShowFilterOption(false)}
                ></div>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
        <div className="absolute left-0 inset-y-0 flex items-center">
          <Icon
            icon="ic:baseline-search"
            className={`text-light-gray w-6 h-6 ${
              advancedFilter ? 'ml-12' : 'ml-2'
            }`}
          />
        </div>
        <input
          id="search"
          name="search"
          className={`inline w-full rounded-lg border border-light-gray text-white bg-black py-2 ${
            advancedFilter && 'ml-10'
          } pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-slate-600 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-slate-600 sm:text-sm`}
          placeholder={placeholders}
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
      <div
        className={`flex ${
          isNewButton === true ? 'justify-between' : ''
        } items-center sm:mt-0 mt-2 sm:w-auto w-full gap-2`}
      >
        <div className="w-full sm:w-[200px]">
          <AdvancedSort filterOption={pageFilter} />
        </div>
        <Button
          className={`${
            isNewButton && isCreatorMode ? 'flex' : 'hidden'
          } truncate !text-base justify-center px-0.5 py-1 search-button-width rounded-lg bg-black font-medium text-light-gray shadow-sm sm:mt-0 sm:w-auto sm:text-sm sm:min-w-36`}
          text="New Blueprint"
          variant="primary"
          onClick={handleNewBlueprintButtonClicked}
        />
      </div>
    </div>
  );
};

export default SearchBar;
