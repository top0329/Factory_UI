import { FC, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

import Image from '../../Image';

export interface Props {
  uri: string;
  name: string;
  blueprintId: string;
  balance: number;
  address: string;
  myBlueprint?: boolean;
  onClick?: () => void;
}

const OwnBlueprintCard: FC<Props> = ({
  uri,
  name,
  blueprintId,
  balance,
  address,
  myBlueprint,
  onClick,
}) => {
  const [tooltipMessage, setTooltipMessage] = useState('Copy to clipboard');
  const copyToClipboard = () => {
    navigator.clipboard.writeText(address).then(() => {
      setTooltipMessage('Copied!');
      setTimeout(() => {
        setTooltipMessage('Copy to clipboard');
      }, 2000);
    });
  };
  return (
    <div
      id="container"
      className="h-min w-full border-2 border-[#00F0FF]/30 bg-[#011018] rounded-3xl border-block overflow-clip"
      onClick={onClick}
    >
      <div className="relative w-full overflow-hidden">
        <div className="w-full overflow-hidden object-cover">
          <Image
            className="w-full aspect-square hover:scale-105 duration-300 ease-in-out"
            src={uri}
            spinnerClassName="w-full aspect-square"
            alt="own-blueprint-card"
          />
          <div className="absolute md:bottom-[146px] lg:bottom-[158px] sm:bottom-[134px] bg-gradient-to-t from-[#011018] from-0% sm:from-0% bg-opacity-100 to-[#000407]/0 bottom-[57px] w-full h-[45px]"></div>
        </div>
        <p
          className={`absolute ${
            myBlueprint ? 'sm:hidden' : 'hidden'
          } flex bottom-[67px] right-[10px] block-content font-mono items-center rounded-2xl bg-[#06DCEC]/20 text-[11px] px-[6px] border border-[#06DCEC]/50 text-[#06DCEC] text-center`}
        >
          My Blueprint
        </p>
        <div
          id="infor"
          className="flex justify-between p-4 pt-0 sm:flex-col xs:px-4 gap-y-0 top-[-80px] md:top-[-80px] w-full box-border"
        >
          <div id="name" className="text-white">
            <p className="flex justify-start text-xs font-mono text-[#858584]">
              Name
            </p>
            <div className="sm:flex sm:justify-between grid items-center py-[3px]">
              <p className="w-auto truncate text-sm md:text-base lg:text-lg font-mono">
                {name}
              </p>
              <p
                className={`${
                  myBlueprint ? 'hidden sm:block' : 'hidden'
                } truncate font-mono items-center rounded-2xl bg-[#06DCEC]/20 text-[11px] px-[6px] border border-[#06DCEC]/50 text-[#06DCEC] text-center w-[87px]`}
              >
                My Blueprint
              </p>
            </div>
          </div>
          <div id="id_supply" className="flex justify-between text-white">
            <div id="id" className="pl-1">
              <p className="flex justify-start text-xs font-mono text-[#858584]">
                ID
              </p>
              <p className="text-sm md:text-base lg:text-lg items-center font-mono mt-[3.2px] ">
                {blueprintId}
              </p>
            </div>
            <div id="id" className="text-end hidden sm:block">
              <p className="text-xs font-mono text-[#858584]">Balance</p>
              <p className="md:text-base lg:text-lg font-mono mt-[4px]">
                {balance}
              </p>
            </div>
          </div>
          <div id="id_supply" className="relative w-full hidden sm:block">
            <div id="address" className="text-white">
              <p className="text-xs font-mono text-[#858584]">Creator</p>
              <div id="id_supply" className="flex justify-between text-white">
                <div className="flex justify-center gap-1 item-center md:text-base lg:text-lg font-mono text-xs">
                  <Icon
                    icon="logos:ethereum"
                    className="hidden md:block item-center my-auto"
                  />
                  <p>
                    {address.substring(0, 7)}...{address.slice(-5)}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (copyToClipboard) {
                      copyToClipboard();
                    }
                  }}
                >
                  <Icon
                    icon="solar:copy-outline"
                    className="item-center my-auto"
                  />
                </button>
                <div
                  role="tooltip"
                  className={`absolute z-10 inline-block right-0 bottom-7 px-3 py-2 text-sm text-white transition-opacity duration-300 bg-gray-700 rounded-lg shadow-sm ${
                    tooltipMessage === 'Copied!'
                      ? 'opacity-100'
                      : 'invisible opacity-0'
                  }`}
                >
                  {tooltipMessage}
                  <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
              </div>
            </div>
          </div>
          <div
            id="badge"
            className="absolute  right-[-55px] md:right-[-48px] top-[11px] md:top-[18px] sm:top-[15px] sm:right-[-55px] xs:h-[22px] xs:top-[12px] xs:right-[-60px] xs:text-[12px] w-[175.5px] h-[25px] md:h-[27px] bg-[#0047FF] text-white text-center text-[14px] md:text-[18px] rotate-[38.86deg] py-auto px-[35px] shadow-[0_3px_5px_1px_rgba(0,0,0,0.3)]"
          >
            Blueprint
          </div>
        </div>
      </div>
    </div>
  );
};
export default OwnBlueprintCard;
