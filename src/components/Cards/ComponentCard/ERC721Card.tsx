import { FC, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import copy from 'copy-to-clipboard';

export interface Props {
  id: number;
  name: string;
  uri: string;
  address: string;
  icon?: boolean;
}

const ERC721Card: FC<Props> = ({ id, name, uri, address, icon = false }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopyButtonClicked = () => {
    try {
      setIsCopied(true);
      copy(address);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.log('failed to copy', err);
    }
  };

  const shortenAddress = (addr: string) => {
    if (!addr || addr.length <= 12) return addr;
    const start = addr.slice(0, 6); // Keep the starting characters
    const end = addr.slice(-4); // Keep the last characters
    return `${start}...${end}`; // Combine with the ellipsis
  };

  return (
    <div className="group relative w-full min-w-[120px] h-[250px] overflow-hidden bg-[#040a0f] border border-black rounded-3xl sm:h-[290px] sm:min-w-[220px]">
      <div
        id="badge"
        className="absolute -right-10 top-[10px] w-[150px] h-[24px] bg-[#099ef5] text-white text-center text-base rotate-[38.86deg] py-auto pl-[12px] shadow-[0_3px_5px_1px_rgba(0,0,0,0.3)] sm:h-[30px] sm:text-lg sm:-right-8 sm:top-[17px]"
      >
        ERC721
      </div>
      <img
        className={`z-20 flex justify-center items-center w-full h-44 rounded-t-3xl object-cover ${
          icon && 'transition duration-300 ease-in-out group-hover:blur-sm'
        }`}
        src={uri}
        alt="erc-20"
      />
      {icon && (
        <div className="absolute inset-0 w-full h-44 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:flex">
          <Icon
            className="bg-blue-200 w-10 h-10 text-blue-800 text-base font-medium me-2 p-0.5 rounded opacity-90 cursor-pointer"
            icon="mynaui:edit-one"
          />
          <Icon
            className="bg-blue-200 w-10 h-10 text-blue-800 text-base font-medium me-2 p-0.5 rounded opacity-90 cursor-pointer"
            icon="heroicons:trash"
          />
        </div>
      )}
      <div className="z-10 absolute top-[164px] bg-gradient-to-t from-[#040a0f] via-[#040a0f] to-transparent w-full h-[20px]"></div>
      <div className="z-20 absolute top-[172px] left-0 bg-gradient-to-r from-slate-800 gray via-transparent to-transparent w-[20px] h-full"></div>
      <div className="z-20 absolute top-[172px] right-0 rounded-l-3xl bg-gradient-to-l from-slate-800 gray via-transparent to-transparent w-[20px] h-full"></div>
      <div className="absolute bottom-0 left-0 rounded-l-3xl bg-gradient-to-t from-slate-800 gray via-transparent to-transparent w-full h-[20px] rounded-b-[-24px]"></div>
      <div className="flex flex-col gap-1 px-4 pt-0 pb-2 text-white">
        <p className="z-20 text-lg font-medium mt-[-12px]">{name}</p>
        <div className="flex flex-col">
          <p className="truncate text-sm text-light-gray">ID</p>
          <p>{id}</p>
        </div>
        <div className="hidden sm:flex sm:flex-row sm:justify-between">
          <p className="text-sm text-light-gray">Address</p>
          <div className="relative flex items-center gap-1">
            <Icon className="w-4 h-5" icon="logos:ethereum" />
            <a
              className="underline text-base"
              href={`https://sepolia.etherscan.io/address/${address}`}
              target="_blank"
            >
              {shortenAddress(address)}
            </a>
            <Icon
              className="w-4 h-4 cursor-pointer"
              icon="solar:copy-outline"
              onClick={handleCopyButtonClicked}
            />
            {isCopied && (
              <div
                className="absolute -top-8 right-0 mb-2 px-4 py-2 bg-gray-700 text-white text-xs rounded-lg transition-opacity opacity-100"
                style={{ transition: 'opacity 0.3s' }}
              >
                Copied!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ERC721Card;
