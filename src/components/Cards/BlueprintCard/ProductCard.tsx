import { FC } from 'react';

import { Icon } from '@iconify/react/dist/iconify.js';

export interface Props {
  uri: string;
  name: string;
  blueprintId: number;
  totalSupply: number;
  address: string;
  onClick?: () => void;
}

const BlueprintCard: FC<Props> = ({
  uri,
  name,
  blueprintId,
  totalSupply,
  address,
  onClick,
}) => {
  return (
    <div
      id="container"
      className="w-[176px] sm:w-full border border-black bg-[#011018] rounded-3xl border-block overflow-clip"
      onClick={onClick}
    >
      <div className="relative w-[176px] sm:w-full overflow-hidden">
        <div
          id="badge"
          className="absolute right-[-38px] sm:right-[-38px] top-[20px] sm:top-[26px] w-[175.5px] h-[20px] sm:h-[30px] bg-[#0047FF] text-white text-center text-[14px] sm:text-[18px] rotate-[38.86deg] py-auto px-[35px] shadow-[0_3px_5px_1px_rgba(0,0,0,0.3)]"
        >
          Product
        </div>
        <div className="w-[176px] h-[176px] sm:w-full sm:h-full overflow-hidden object-cover">
          <img
            src={uri}
            className="w-full sm:w-full md:w-full lg:w-full aspect-auto object-cover"
            alt="okoko"
          />
        </div>
        <div
          id="gradient"
          className="relative top-[-45px] bg-gradient-to-t from-[#011018] bg-opacity-100 to-[#000407]/0 sm:w-full h-[82px]"
        ></div>
        <div
          id="infor"
          className="relative flex justify-between sm:flex-col gap-y-1 top-[-80px] sm:top-[-80px] px-6 w-[176px] sm:w-full  box-border"
        >
          <div id="name" className="text-white">
            <p className="text-xs font-mono text-[#858584]">Name</p>
            <p className="text-lg font-mono">{name}</p>
          </div>

          <div id="id_supply" className="flex justify-between text-white">
            <div id="id" className="">
              <p className="text-xs font-mono text-[#858584]">ID</p>
              <p className="text-lg font-mono">{blueprintId}</p>
            </div>
            <div id="id" className="text-end hidden sm:block">
              <p className="text-xs font-mono text-[#858584]">Balance</p>
              <p className="text-lg font-mono">{totalSupply}</p>
            </div>
          </div>

          <div id="id_supply" className="flex justify-between text-white">
            <div id="address" className="text-white">
              <p className="text-xs font-mono text-[#858584]">Address</p>
              <div id="id_supply" className="flex justify-between text-white">
                <div className="flex justify-center gap-1 item-center sm:text-lg font-mono text-xs">
                  <Icon
                    icon="logos:ethereum"
                    className="hidden sm:block item-center my-auto"
                  />
                  {address.substring(0, 7)} ... {address.slice(-5)}
                </div>
                <button>
                  <Icon
                    icon="solar:copy-outline"
                    className="item-center my-auto"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlueprintCard;
