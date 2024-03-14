import { useState, useEffect } from 'react';

import { Icon } from '@iconify/react/dist/iconify.js';

export default function AdvancedSort() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    <>
      <Icon icon="iconamoon:sorting-left" className="text-[#858584] w-6 h-6" />
      Sort by
    </>
  );
  const [isSortDown, setisSortDown] = useState(false);
  useEffect(() => {
    console.log(isSortDown); // This will log the updated state after changes
  }, [isSortDown]);

  const handleIconClick = (e: any) => {
    // Prevent the click event from triggering parent click events
    e.stopPropagation();
    // Toggle the sort direction
    setisSortDown(!isSortDown);
  };
  const handleOptionClick = (name: string) => {
    setSelectedValue(
      <div className="flex items-center">
        {isSortDown ? (
          <Icon
            icon="bi:sort-down"
            className="w-6 h-6 float-right"
            onClick={handleIconClick}
          />
        ) : (
          <Icon
            icon="bi:sort-up"
            className="w-6 h-6 float-right"
            onClick={handleIconClick}
          />
        )}
        {name}
      </div>
    );
    setIsDropdownOpen(false);
    // No need to toggle isSortDown here; it should only be toggled in handleIconClick
  };

  return (
    <div className="">
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex gap-4 w-52 text-[#858584] truncate bg-[#000] border border-[#B1B1B1] focus:outline-none font-medium rounded-xl text-sm px-5 py-2 text-center items-center"
        type="button"
      >
        {selectedValue}
      </button>

      <div
        id="dropdown"
        className={`${
          isDropdownOpen ? 'translate-y-0' : 'translate-y-[-700px]'
        } z-30 absolute bg-[#000] mt-1 p-1 divide-y  rounded-lg shadow w-52`}
      >
        <ul
          className="py-2 text-sm text-[#858584]"
          aria-labelledby="dropdownDefaultButton"
        >
          <li>
            <p
              onClick={() => {
                setSelectedValue(
                  <>
                    {isSortDown ? (
                      <Icon icon="bi:sort-down" className={`w-6 h-6`} />
                    ) : (
                      <Icon icon="bi:sort-up" className={`w-6 h-6`} />
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
                      <Icon icon="bi:sort-down" className={`w-6 h-6`} />
                    ) : (
                      <Icon icon="bi:sort-up" className={`w-6 h-6`} />
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
                      <Icon icon="bi:sort-down" className={`w-6 h-6`} />
                    ) : (
                      <Icon icon="bi:sort-up" className={`w-6 h-6`} />
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
              className="block px-4 py-2 hover:bg-[#858584]/10 cursor-pointer rounded-md"
              onClick={() => handleOptionClick('Mint Limit')}
            >
              Mint Limit
            </p>
          </li>
          <li>
            <p
              onClick={() => {
                setSelectedValue(
                  <>
                    {/* {isSortDown == true ? ( */}
                    <Icon
                      icon="bi:sort-down"
                      className={`w-6 h-6`}
                      onClick={(e) => {
                        e.stopPropagation();
                        // toggleSortDirection();
                        // if (setisSortDown) {
                        //   setisSortDown(false);
                        //   console.log('---------------------------->',isSortDown);
                        // }
                      }}
                    />
                    {/* ) : ( */}
                    {/* <Icon
                        icon="bi:sort-up"
                        className={`w-6 h-6`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (setisSortDown) {
                            setisSortDown(true);
                            console.log('=====================>', isSortDown);
                          }
                        }}
                      /> */}
                    {/* )} */}
                    Mint Price
                  </>
                );
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
                setSelectedValue(
                  <>
                    {isSortDown ? (
                      <Icon
                        icon="bi:sort-down"
                        className={` text-[#858584] w-6 h-6`}
                      />
                    ) : (
                      <Icon
                        icon="bi:sort-up"
                        className={` text-[#858584] w-6 h-6`}
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
