import { useState, useEffect } from 'react';

import { Icon } from '@iconify/react/dist/iconify.js';

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
  const [selectedValue, setSelectedValue] = useState('');
  const [sortDown, setSortDown] = useState(false);
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
    setSortDown(!sortDown);
  };

  return (
    <div className="relative">
      <div
        className={`${
          selectedValue.length != 0 ? 'hidden' : 'block'
        } pointer-events-auto absolute inset-y-0 left-0 flex items-center px-2 text-gray-700`}
      >
        <Icon
          onClick={handleDirection}
          icon="iconamoon:sorting-left"
          className="text-light-gray w-6 h-6"
        />
      </div>
      <div
        className={`${
          selectedValue.length == 0 ? 'hidden' : 'block'
        } pointer-events-auto absolute inset-y-0 left-0 flex items-center px-2 text-gray-700`}
      >
        <Icon
          onClick={handleDirection}
          icon="bi:sort-down"
          className={`${sortDown ? 'block' : 'hidden'} text-light-gray w-6 h-6`}
        />
        <Icon
          onClick={handleDirection}
          icon="bi:sort-up"
          className={`${sortDown ? 'hidden' : 'block'} text-light-gray w-6 h-6`}
        />
      </div>
      <select
        style={selectStyles}
        onChange={(e) => setSelectedValue(e.target.value)}
        value={selectedValue}
        className="appearance-none inset-y-0 left-2 bg-black border border-gray-400 hover:border-gray-500 px-8 py-2 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline text-white/30"
      >
        <option className="pl-2" value="" disabled>
          Sort by
        </option>
        <option value="Blueprint ID">Blueprint ID</option>
        <option value="Blueprint Name">Blueprint Name</option>
        <option value="Total Supply">Total Supply</option>
        <option value="Mint Limit">Mint Limit</option>
        <option value="Mint Price">Mint Price</option>
        <option value="Minted Amount">Minted Amount</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <Icon
          icon="icon-park-solid:down-one"
          className="text-light-gray w-6 h-6"
        />
      </div>
    </div>
  );
}
