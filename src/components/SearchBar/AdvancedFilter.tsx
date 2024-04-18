import React, { FC } from 'react';
import { useAtom } from 'jotai';

import Button from '../Button';
import {
  advancedFilterValueAtom,
  blueprintTokenListAtom,
  isDataEmptyAtom,
  isLoadingAtom,
  searchValueAtom,
  showFilterOptionAtom,
  sortFieldAtom,
  sortOrderAtom,
} from '../../jotai/atoms';
import { AdvancedFilterValue } from '../../types';
import axios from 'axios';
import { BASE_URI } from '../../constants';
import useToast from '../../hooks/useToast';

export interface Props {
  pageFilter?: 'blueprint' | 'my-blueprint' | 'product' | 'component';
}

const AdvancedFilter: FC<Props> = ({ pageFilter }) => {
  const { showToast } = useToast();

  const [, setBlueprintTokenList] = useAtom(blueprintTokenListAtom);
  const [advancedFilterValue, setAdvancedFilterValue] =
    useAtom<AdvancedFilterValue>(advancedFilterValueAtom);
  const [searchValue] = useAtom<string>(searchValueAtom);
  const [sortField] = useAtom<string>(sortFieldAtom);
  const [sortOrder] = useAtom<string>(sortOrderAtom);
  const [, setShowFilterOption] = useAtom<boolean>(showFilterOptionAtom);
  const [, setIsLoading] = useAtom<boolean>(isLoadingAtom);
  const [, setIsDataEmpty] = useAtom<boolean>(isDataEmptyAtom);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAdvancedFilterValue((prevState) => ({
      ...prevState,
      [name]: value.trim() === '' ? '' : Number(value),
    }));
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setAdvancedFilterValue({ ...advancedFilterValue, [name]: Number(value) });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      !(
        (event.key >= '0' && event.key <= '9') ||
        event.key === 'Backspace' ||
        event.key === 'Delete' ||
        event.key === 'Tab' ||
        event.key === 'ArrowLeft' ||
        event.key === 'ArrowRight' ||
        (event.key >= '0' &&
          event.key <= '9' &&
          event.getModifierState('NumLock'))
      )
    ) {
      event.preventDefault();
    }
  };

  const handleKeyDownForMintLimit = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      !(
        (event.key >= '0' && event.key <= '9') ||
        event.key === 'Backspace' ||
        event.key === 'Delete' ||
        event.key === 'Tab' ||
        event.key === 'ArrowLeft' ||
        event.key === 'ArrowRight' ||
        event.key === '.' ||
        (event.key >= '0' &&
          event.key <= '9' &&
          event.getModifierState('NumLock'))
      )
    ) {
      event.preventDefault();
    }
  };

  const handleAdvancedFilter = async () => {
    try {
      setIsLoading(true);
      setShowFilterOption(false);
      const advancedFilterResult = await axios.get(
        `${BASE_URI}/blueprint/search?query=${searchValue}&sortField=${sortField}&sortOrder=${sortOrder}&minId=${advancedFilterValue.blueprintIdMin.toString()}&maxId=${
          advancedFilterValue.blueprintIdMax
        }&mintPriceUnit=${advancedFilterValue.mintPriceUnit}&mintPriceMin=${
          advancedFilterValue.mintPriceMin
        }&mintPriceMax=${advancedFilterValue.mintPriceMax}&totalSupplyMin=${
          advancedFilterValue.totalSupplyMin
        }&totalSupplyMax=${advancedFilterValue.totalSupplyMax}&mintLimitMin=${
          advancedFilterValue.mintLimitMin
        }&mintLimitMax=${advancedFilterValue.mintLimitMax}&mintedAmountMin=${
          advancedFilterValue.mintedAmountMin
        }&mintedAmountMax=${advancedFilterValue.mintedAmountMax}`
      );
      if (advancedFilterResult.data.length === 0) {
        setIsDataEmpty(true);
      } else {
        setBlueprintTokenList(advancedFilterResult.data);
        setIsDataEmpty(false);
      }
    } catch (err: any) {
      console.log(err);
      showToast('fail', err.response.data);
    }finally {
      setIsLoading(false);
    }
  };

  const handleResetAdvancedFilter = async () => {
    try {
      setIsLoading(true);
      setAdvancedFilterValue({
        blueprintIdMin: '',
        blueprintIdMax: '',
        mintPriceUnit: 0,
        mintPriceMin: '',
        mintPriceMax: '',
        totalSupplyMin: '',
        totalSupplyMax: '',
        mintLimitMin: '',
        mintLimitMax: '',
        mintedAmountMin: '',
        mintedAmountMax: '',
        productIdMin: '',
        productIdMax: '',
        productBalanceMin: '',
        productBalanceMax: '',
      });
      setShowFilterOption(false);
      const advancedFilterResult = await axios.get(
        `${BASE_URI}/blueprint/search?query=${searchValue}&sortField=${sortField}&sortOrder=${sortOrder}&minId=&maxId=&mintPriceUnit=&mintPriceMin=&mintPriceMax=&totalSupplyMin=&totalSupplyMax=&mintLimitMin=&mintLimitMax=&mintedAmountMin=&mintedAmountMax=`
      );
      if (advancedFilterResult.data.length === 0) {
        setIsDataEmpty(true);
      } else {
        setBlueprintTokenList(advancedFilterResult.data);
        setIsDataEmpty(false);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col py-4 px-4 bg-[#000000] w-[282px] gap-y-4 border-[3px] border-[#313131] rounded-lg">
      {pageFilter === 'product' && (
        <React.Fragment>
          <div className="flex flex-col gap-y-2 text-sm text-light-gray">
            <div className="flex justify-between items-center  px-3 py-1 bg-black rounded-lg w-full">
              <p className="font-mono">Product ID</p>
            </div>
            <div className="flex justify-between items-center gap-2">
              <input
                name="productIdMin"
                className="rounded-lg border border-light-gray text-center text-white w-full bg-[#000000] py-0.5 hide-arrows"
                type="number"
                placeholder="Min"
                inputMode="decimal"
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                value={advancedFilterValue.productIdMin}
              />
              to
              <input
                name="productIdMax"
                className="rounded-lg border border-light-gray text-center text-white w-full bg-[#000000] py-0.5 hide-arrows"
                type="number"
                placeholder="Max"
                inputMode="decimal"
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                value={advancedFilterValue.productIdMax}
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-2 text-sm text-light-gray">
            <div className="flex justify-between items-center  px-3 py-1 bg-black rounded-lg w-full">
              <p className="font-mono">Balance</p>
            </div>
            <div className="flex justify-between items-center gap-2">
              <input
                name="productBalanceMin"
                className="rounded-lg border border-light-gray text-center text-white w-full bg-[#000000] py-0.5 hide-arrows"
                type="number"
                placeholder="Min"
                inputMode="decimal"
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                value={advancedFilterValue.productBalanceMin}
              />
              to
              <input
                name="productBalanceMax"
                className="rounded-lg border border-light-gray text-center text-white w-full bg-[#000000] py-0.5 hide-arrows"
                type="number"
                placeholder="Max"
                inputMode="decimal"
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                value={advancedFilterValue.productBalanceMax}
              />
            </div>
          </div>
        </React.Fragment>
      )}
      {(pageFilter === 'blueprint' || pageFilter === 'my-blueprint') && (
        <React.Fragment>
          <div className="flex flex-col gap-y-2 text-sm text-light-gray">
            <div className="flex justify-between items-center  px-3 py-1 bg-black rounded-lg w-full">
              <p className="font-mono">Blueprint ID</p>
            </div>
            <div className="flex justify-between items-center gap-2">
              <input
                name="blueprintIdMin"
                className="rounded-lg border border-light-gray text-center text-white w-full bg-[#000000] py-0.5 hide-arrows"
                type="number"
                placeholder="Min"
                inputMode="decimal"
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                value={advancedFilterValue.blueprintIdMin}
              />
              to
              <input
                name="blueprintIdMax"
                className="rounded-lg border border-light-gray text-center text-white w-full bg-[#000000] py-0.5 hide-arrows"
                type="number"
                placeholder="Max"
                inputMode="decimal"
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                value={advancedFilterValue.blueprintIdMax}
              />
            </div>
          </div>
          {pageFilter === 'blueprint' && (
            <React.Fragment>
              <div className="flex flex-col gap-y-2 text-sm text-light-gray">
                <div className="flex justify-between items-center px-3 py-1 bg-black rounded-lg w-full">
                  <p className="font-mono">Mint Price</p>
                </div>
                <div className="flex flex-col gap-4 text-sm">
                  <select
                    name="mintPriceUnit"
                    className="flex w-full items-center px-2 py-0.5 rounded-lg border border-light-gray bg-[#000000] font-medium shadow-sm sm:mt-0 sm:w-auto sm:text-sm sm:min-w-36 sm:gap-3"
                    onChange={handleSelectChange}
                    defaultValue={0}
                  >
                    <option value={0}>ETH</option>
                    <option value={1}>USDT</option>
                    <option value={2}>USDC</option>
                  </select>
                  <div className="flex justify-between items-center gap-2">
                    <input
                      name="mintPriceMin"
                      className="rounded-lg border border-light-gray text-center text-white w-full bg-[#000000] py-0.5 hide-arrows"
                      type="number"
                      placeholder="Min"
                      inputMode="decimal"
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDownForMintLimit}
                      value={advancedFilterValue.mintPriceMin}
                    />
                    to
                    <input
                      name="mintPriceMax"
                      className="rounded-lg border border-light-gray text-center text-white w-full bg-[#000000] py-0.5 hide-arrows"
                      type="number"
                      placeholder="Max"
                      inputMode="decimal"
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDownForMintLimit}
                      value={advancedFilterValue.mintPriceMax}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-y-2 text-sm text-light-gray">
                <div className="flex justify-between items-center px-3 py-1 bg-black rounded-lg w-full">
                  <p className="font-mono">Mint Limit</p>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <input
                    name="mintLimitMin"
                    className="rounded-lg border border-light-gray text-center text-white w-full bg-[#000000] py-0.5 hide-arrows"
                    type="number"
                    placeholder="Min"
                    inputMode="decimal"
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    value={advancedFilterValue.mintLimitMin}
                  />
                  to
                  <input
                    name="mintLimitMax"
                    className="rounded-lg border border-light-gray text-center text-white w-full bg-[#000000] py-0.5 hide-arrows"
                    type="number"
                    placeholder="Max"
                    inputMode="decimal"
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    value={advancedFilterValue.mintLimitMax}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-y-2 text-sm text-light-gray">
                <div className="flex justify-between items-center px-3 py-1 bg-black rounded-lg w-full">
                  <p className="font-mono">Total Supply</p>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <input
                    name="totalSupplyMin"
                    className="rounded-lg border border-light-gray text-center text-white w-full bg-[#000000] py-0.5 hide-arrows"
                    type="number"
                    placeholder="Min"
                    inputMode="decimal"
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    value={advancedFilterValue.totalSupplyMin}
                  />
                  to
                  <input
                    name="totalSupplyMax"
                    className="rounded-lg border border-light-gray text-center text-white w-full bg-[#000000] py-0.5 hide-arrows"
                    type="number"
                    placeholder="Max"
                    inputMode="decimal"
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    value={advancedFilterValue.totalSupplyMax}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-y-2 text-sm text-light-gray">
                <div className="flex justify-between items-center  px-3 py-1  bg-black rounded-lg w-full">
                  <p className="font-mono">Minted Amount</p>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <input
                    name="mintedAmountMin"
                    className="rounded-lg border border-light-gray text-center text-white w-full bg-[#000000] py-0.5 hide-arrows"
                    type="number"
                    placeholder="Min"
                    inputMode="decimal"
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    value={advancedFilterValue.mintedAmountMin}
                  />
                  to
                  <input
                    name="mintedAmountMax"
                    className="rounded-lg border border-light-gray text-center text-white w-full bg-[#000000] py-0.5 hide-arrows"
                    type="number"
                    placeholder="Max"
                    inputMode="decimal"
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    value={advancedFilterValue.mintedAmountMax}
                  />
                </div>
              </div>
            </React.Fragment>
          )}
          {pageFilter === 'my-blueprint' && (
            <div className="flex flex-col gap-y-2 text-sm text-light-gray">
              <div className="flex justify-between items-center  px-3 py-1 bg-black rounded-lg w-full">
                <p className="font-mono">Balance</p>
              </div>
              <div className="flex justify-between items-center gap-2">
                <input
                  name="productBalanceMin"
                  className="rounded-lg border border-light-gray text-center text-white w-full bg-[#000000] py-0.5 hide-arrows"
                  type="number"
                  placeholder="Min"
                  inputMode="decimal"
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  value={advancedFilterValue.productBalanceMin}
                />
                to
                <input
                  name="productBalanceMax"
                  className="rounded-lg border border-light-gray text-center text-white w-full bg-[#000000] py-0.5 hide-arrows"
                  type="number"
                  placeholder="Max"
                  inputMode="decimal"
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  value={advancedFilterValue.productBalanceMax}
                />
              </div>
            </div>
          )}
        </React.Fragment>
      )}
      <Button
        variant="primary"
        text="Apply"
        className="flex justify-center rounded-lg text-sm !py-1.5"
        onClick={handleAdvancedFilter}
      />
      <Button
        variant="secondary"
        text="Reset Filter Options"
        className="flex justify-center rounded-lg text-sm !py-1.5 -mt-1.5"
        onClick={handleResetAdvancedFilter}
      />
    </div>
  );
};

export default AdvancedFilter;
