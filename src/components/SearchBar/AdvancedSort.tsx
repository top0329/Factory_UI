import { useState, useEffect } from 'react';

import { Icon } from '@iconify/react/dist/iconify.js';
import { fantomSonicTestnet } from 'viem/chains';

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  });

  return width;
}

export default function AdvancedSort() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    <>
      <Icon icon="iconamoon:sorting-left" className="text-[#858584] w-6 h-6" />
      Sort by
    </>
  );
  const [isSortDown, setisSortDown] = useState(false);
  // Inline styles for select element
  // const selectStyles = {
  //   width: "100%", // Default width to take full space
  // };

  const windowWidth = useWindowWidth();
  const selectStyles = {
    width: windowWidth <= 460 ? '100%' : '200px',
  };
  if (window.innerWidth <= 460) {
    selectStyles.width = '91vw';
    if (window.innerWidth <= 345) {
      selectStyles.width = '320px';
    }
  }
  const handleDirection = () => {
    setisSortDown(!isSortDown);
  };

  return (
    <div className="">
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex gap-4 w-52 text-[#858584] truncate bg-[#000] border border-[#B1B1B1] focus:outline-none font-medium rounded-xl text-sm px-5 py-2.5 text-center items-center"
        type="button"
      >
        {selectedValue}
      </button>

      <div
        id="dropdown"
        className={`${
          isDropdownOpen ? 'translate-y-0' : 'translate-y-[-700px]'
        } z-30 absolute bg-[#000] mt-1 p-1 divide-y divide-gray-100 rounded-lg shadow w-52`}
      >
        <ul
          className="py-2 text-sm text-gray-700"
          aria-labelledby="dropdownDefaultButton"
        >
          <li>
            <p
              onClick={() => {
                setSelectedValue(
                  <>
                    {isSortDown ? (
                      <Icon
                        icon="bi:sort-down"
                        className={` text-light-gray w-6 h-6`}
                      />
                    ) : (
                      <Icon
                        icon="bi:sort-up"
                        className={` text-light-gray w-6 h-6`}
                      />
                    )}
                    Blueprint ID
                  </>
                );
                setIsDropdownOpen(false);
                setisSortDown(!isSortDown);
              }}
              className="block px-4 py-2 hover:bg-[#858584]/10 cursor-pointer rounded-md"
            >
              Blueprint ID
            </p>
          </li>
          <li>
            <p
              onClick={() => {
                setSelectedValue(
                  <>
                    {isSortDown ? (
                      <Icon
                        icon="bi:sort-down"
                        className={` text-light-gray w-6 h-6`}
                      />
                    ) : (
                      <Icon
                        icon="bi:sort-up"
                        className={` text-light-gray w-6 h-6`}
                      />
                    )}
                    Blueprint Name
                  </>
                );
                setIsDropdownOpen(false);
                setisSortDown(!isSortDown);
              }}
              className="block px-4 py-2 hover:bg-[#858584]/10 cursor-pointer rounded-md"
            >
              Blueprint Name
            </p>
          </li>
          <li>
            <p
              onClick={() => {
                setSelectedValue(
                  <>
                    {isSortDown ? (
                      <Icon
                        icon="bi:sort-down"
                        className={` text-light-gray w-6 h-6`}
                      />
                    ) : (
                      <Icon
                        icon="bi:sort-up"
                        className={` text-light-gray w-6 h-6`}
                      />
                    )}
                    Total Supply
                  </>
                );
                setIsDropdownOpen(false);
                setisSortDown(!isSortDown);
              }}
              className="block px-4 py-2 hover:bg-[#858584]/10 cursor-pointer rounded-md"
            >
              Total Supply
            </p>
          </li>
          <li>
            <p
              onClick={() => {
                setSelectedValue(
                  <>
                    {isSortDown ? (
                      <Icon
                        icon="bi:sort-down"
                        className={` text-light-gray w-6 h-6`}
                      />
                    ) : (
                      <Icon
                        icon="bi:sort-up"
                        className={` text-light-gray w-6 h-6`}
                      />
                    )}
                    Mint Limit
                  </>
                );
                setIsDropdownOpen(false);
                setisSortDown(!isSortDown);
              }}
              className="block px-4 py-2 hover:bg-[#858584]/10 cursor-pointer rounded-md"
            >
              Mint Limit
            </p>
          </li>
          <li>
            <p
              onClick={() => {
                setSelectedValue(
                  <>
                    {isSortDown ? (
                      <Icon
                        icon="bi:sort-down"
                        className={` text-light-gray w-6 h-6`}
                      />
                    ) : (
                      <Icon
                        icon="bi:sort-up"
                        className={` text-light-gray w-6 h-6`}
                      />
                    )}
                    Mint Price
                  </>
                );
                setIsDropdownOpen(false);
                setisSortDown(!isSortDown);
              }}
              className="block px-4 py-2 hover:bg-[#858584]/10 cursor-pointer rounded-md"
            >
              Mint Price
            </p>
          </li>
          <li>
            <p
              onClick={() => {
                setSelectedValue(
                  <>
                    {isSortDown ? (
                      <Icon
                        icon="bi:sort-down"
                        className={` text-light-gray w-6 h-6`}
                      />
                    ) : (
                      <Icon
                        icon="bi:sort-up"
                        className={` text-light-gray w-6 h-6`}
                      />
                    )}
                    Minted Amount
                  </>
                );
                setIsDropdownOpen(false);
                setisSortDown(!isSortDown);
              }}
              className="block px-4 py-2 hover:bg-[#858584]/10 cursor-pointer rounded-md"
            >
              Minted Amount
            </p>
          </li>
        </ul>
      </div>
      <div
        className={`fixed right-0 bottom-0 top-0 left-0 flex items-center justify-center z-10 ${
          !isDropdownOpen && 'hidden'
        }`}
        onClick={() => setIsDropdownOpen(false)}
      ></div>
    </div>
  );
}
