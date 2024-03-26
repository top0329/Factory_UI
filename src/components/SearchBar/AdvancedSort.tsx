import { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

interface AdvancedSortProps {
  filterOption?: string;
}

const AdvancedSort: React.FC<AdvancedSortProps> = ({ filterOption }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    <>
      <p className="!text-sm !leading-5 !font-[400] placeholder-gray-500">
        Sort by
      </p>
    </>
  );
  const [defaultIcon, setDefaultIcon] = useState(false);
  const [isSortDown, setisSortDown] = useState(true);
  return (
    <div className="w-full bg-black border border-[#B1B1B1] rounded-lg">
      <div className="flex pl-5">
        <div className="pt-2">
          {isSortDown ? (
            defaultIcon ? (
              <Icon
                icon="bi:sort-down"
                className={` text-[#858584] w-6 h-6`}
                onClick={() =>
                  setisSortDown((prevIsSortDown) => !prevIsSortDown)
                }
              />
            ) : (
              <Icon
                icon="iconamoon:sorting-left"
                className="text-light-gray w-6 h-6"
              />
            )
          ) : defaultIcon ? (
            <Icon
              icon="bi:sort-up"
              className={` text-[#858584] w-6 h-6`}
              onClick={() => setisSortDown((prevIsSortDown) => !prevIsSortDown)}
            />
          ) : (
            <Icon
              icon="iconamoon:sorting-left"
              className="text-light-gray w-6 h-6"
            />
          )}
        </div>
        <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex gap-4 xs:w-[155px] w-[100%] text-[#858584] truncate bg-black border border-none focus:outline-none font-medium rounded-lg text-sm px-3 h-[38px] text-center items-center"
          type="button"
        >
          {selectedValue}
        </button>
      </div>
      <div
        id="dropdown"
        className={`${
          isDropdownOpen ? 'translate-y-0' : 'translate-y-[-700px]'
        } z-30 absolute bg-[#000] mt-1 p-1 divide-y  rounded-lg shadow xs:w-[200px] w-[92.5%] `}
      >
        {filterOption === 'normal' && (
          <ul
            className="py-2 text-sm text-[#858584] !leading-5 !font-[400]"
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
              <p
                onClick={() => {
                  setSelectedValue(<>Blueprint ID</>);
                  setDefaultIcon(true);
                  setIsDropdownOpen(false);
                  // setisSortDown(!isSortDown);
                }}
                className="block px-4 py-2 hover:bg-[#858584]/10 cursor-pointer rounded-md"
              >
                Blueprint ID
              </p>
            </li>
            <li>
              <p
                onClick={() => {
                  setSelectedValue(<>Blueprint Name</>);
                  setDefaultIcon(true);
                  setIsDropdownOpen(false);
                  // setisSortDown(!isSortDown);
                }}
                className="block px-4 py-2 hover:bg-[#858584]/10 cursor-pointer rounded-md"
              >
                Blueprint Name
              </p>
            </li>
            <li>
              <p
                onClick={() => {
                  setSelectedValue(<>Total Supply</>);
                  setDefaultIcon(true);
                  setIsDropdownOpen(false);
                  // setisSortDown(!isSortDown);
                }}
                className="block px-4 py-2 hover:bg-[#858584]/10 cursor-pointer rounded-md"
              >
                Total Supply
              </p>
            </li>
            <li>
              <p
                onClick={() => {
                  setSelectedValue(<>Mint Limit</>);
                  setDefaultIcon(true);
                  setIsDropdownOpen(false);
                  // setisSortDown(!isSortDown);
                }}
                className="block px-4 py-2 hover:bg-[#858584]/10 cursor-pointer rounded-md"
                // onClick={() => handleOptionClick('Mint Limit')}
              >
                Mint Limit
              </p>
            </li>
            <li>
              <p
                onClick={() => {
                  setSelectedValue(<>Mint Price</>);
                  setDefaultIcon(true);
                  setIsDropdownOpen(false);
                  // setisSortDown(!isSortDown);
                }}
                className="block px-4 py-2 hover:bg-[#858584]/10 cursor-pointer rounded-md"
              >
                Mint Price
              </p>
            </li>
            <li>
              <p
                onClick={() => {
                  setSelectedValue(<>Minted Amount</>);
                  setDefaultIcon(true);
                  setIsDropdownOpen(false);
                  // setisSortDown(!isSortDown);
                }}
                className="block px-4 py-2 hover:bg-[#858584]/10 cursor-pointer rounded-md"
              >
                Minted Amount
              </p>
            </li>
          </ul>
        )}
        {filterOption === 'decompose' && (
          <ul
            className="py-2 text-sm text-[#858584] !leading-5 !font-[400]"
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
              <p
                onClick={() => {
                  setSelectedValue(<>Product ID</>);
                  setDefaultIcon(true);
                  setIsDropdownOpen(false);
                  // setisSortDown(!isSortDown);
                }}
                className="block px-4 py-2 hover:bg-[#858584]/10 cursor-pointer rounded-md"
              >
                Product ID
              </p>
            </li>
            <li>
              <p
                onClick={() => {
                  setSelectedValue(<>Product Name</>);
                  setDefaultIcon(true);
                  setIsDropdownOpen(false);
                  // setisSortDown(!isSortDown);
                }}
                className="block px-4 py-2 hover:bg-[#858584]/10 cursor-pointer rounded-md"
              >
                Product Name
              </p>
            </li>
            <li>
              <p
                onClick={() => {
                  setSelectedValue(<>Balance</>);
                  setDefaultIcon(true);
                  setIsDropdownOpen(false);
                  // setisSortDown(!isSortDown);
                }}
                className="block px-4 py-2 hover:bg-[#858584]/10 cursor-pointer rounded-md"
              >
                Balance
              </p>
            </li>
          </ul>
        )}
        {filterOption === 'component' && (
          <ul
            className="py-2 text-sm text-[#858584] !leading-5 !font-[400]"
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
              <p
                onClick={() => {
                  setSelectedValue(<>Component Name</>);
                  setDefaultIcon(true);
                  setIsDropdownOpen(false);
                  // setisSortDown(!isSortDown);
                }}
                className="block px-4 py-2 hover:bg-[#858584]/10 cursor-pointer rounded-md"
              >
                Component Name
              </p>
            </li>
            <li>
              <p
                onClick={() => {
                  setSelectedValue(<>Component Type</>);
                  setDefaultIcon(true);
                  setIsDropdownOpen(false);
                  // setisSortDown(!isSortDown);
                }}
                className="block px-4 py-2 hover:bg-[#858584]/10 cursor-pointer rounded-md"
              >
                Product Type
              </p>
            </li>
            <li>
              <p
                onClick={() => {
                  setSelectedValue(<>Most Used</>);
                  setDefaultIcon(true);
                  setIsDropdownOpen(false);
                  // setisSortDown(!isSortDown);
                }}
                className="block px-4 py-2 hover:bg-[#858584]/10 cursor-pointer rounded-md"
              >
                Most Used
              </p>
            </li>
            <li>
              <p
                onClick={() => {
                  setSelectedValue(<>Recent Created</>);
                  setDefaultIcon(true);
                  setIsDropdownOpen(false);
                  // setisSortDown(!isSortDown);
                }}
                className="block px-4 py-2 hover:bg-[#858584]/10 cursor-pointer rounded-md"
              >
                Recent Created
              </p>
            </li>
          </ul>
        )}
      </div>
      <div
        className={`fixed right-0 bottom-0 top-0 left-0 flex items-center justify-center z-10 ${
          !isDropdownOpen && 'hidden'
        }`}
        onClick={() => setIsDropdownOpen(false)}
      ></div>
    </div>
  );
};

export default AdvancedSort;
