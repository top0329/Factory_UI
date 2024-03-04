import { FC } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

export interface Props {
  uri: string;
  name: string;
  blueprintId: number;
  totalSupply: number;
  address: string;
  myCardBadge?: boolean;
  onClick?: () => void;
}

// export function OwnBlueprintCard(props: Props) {
const OwnBlueprintCard: FC<Props> = ({
  uri,
  name,
  blueprintId,
  totalSupply,
  address,
  myCardBadge,
  onClick,
}) => {
  return (
    <div
      id="container"
      className="w-[176px] md:w-full border-2 border-[#00F0FF]/30 bg-[#011018] rounded-3xl border-block overflow-clip"
      onClick={onClick}
    >
      <div className="relative w-[176px] md:w-full overflow-hidden">
        <div
          id="badge"
          className="absolute  right-[-38px] md:right-[-38px] top-[20px] md:top-[26px] w-[175.5px] h-[25px] md:h-[30px] bg-[#0047FF] text-white text-center text-[14px] md:text-[18px] rotate-[38.86deg] py-auto px-[35px] shadow-[0_3px_5px_1px_rgba(0,0,0,0.3)]"
        >
          Blueprint
        </div>
        <div className="w-[176px] h-[176px] md:w-full md:h-full overflow-hidden object-cover">
          <img
            src={uri}
            className="w-full md:w-full lg:w-full aspect-auto object-cover"
            alt="okoko"
          />
        </div>
        <div
          id="gradient"
          className="relative top-[-45px] bg-gradient-to-t from-[#011018] from-40% bg-opacity-100 to-[#000407]/0 md:w-full h-[82px]"
        ></div>
        <p
          className={`absolute ${
            myCardBadge ? 'md:hidden' : 'hidden'
          } flex top-[148px] z-50 right-[10px] block-content font-mono items-center rounded-2xl bg-[#2e1313]/60 text-[11px] px-[6px] border border-[#06DCEC]/50 text-[#06DCEC]/50 text-center`}
        >
          My Blueprint
        </p>
        <div
          id="infor"
          className="relative flex justify-between md:flex-col gap-y-1 top-[-80px] md:top-[-80px] px-6 w-[176px] md:w-full box-border"
        >
          <div id="name" className="text-white">
            <p className="flex justify-start text-xs font-mono text-[#858584]">
              Name
            </p>
            <div className="flex justify-between py-[3px]">
              <p className="text-sm md:text-base lg:text-lg font-mono">
                {name}
              </p>
              <p
                className={`${
                  myCardBadge ? 'hidden md:block' : 'hidden'
                } font-mono items-center rounded-2xl bg-[#2e1313]/60 text-[11px] my-[3px] px-[6px] border border-[#06DCEC]/50 text-[#06DCEC]/50 text-center`}
              >
                My Blueprint
              </p>
            </div>
          </div>

          <div id="id_supply" className="flex justify-between text-white">
            <div id="id" className="">
              <p className="flex justify-start text-xs font-mono text-[#858584]">
                ID
              </p>
              <p className="text-sm md:text-base lg:text-lg items-center font-mono">
                {blueprintId}
              </p>
            </div>
            <div id="id" className="text-end hidden md:block">
              <p className="text-xs font-mono text-[#858584]">Balance</p>
              <p className="md:text-base lg:text-lg font-mono">{totalSupply}</p>
            </div>
          </div>

          <div id="id_supply" className="w-full hidden md:block">
            <div id="address" className="text-white">
              <p className="text-xs font-mono text-[#858584]">Creator</p>
              <div id="id_supply" className="flex justify-between text-white">
                <div className="flex justify-center gap-1 item-center md:text-base lg:text-lg font-mono text-xs">
                  <Icon
                    icon="logos:ethereum"
                    className="hidden md:block item-center my-auto"
                  />
                  <p className="md:hidden lg:block">
                    {address.substring(0, 7)}...{address.slice(-5)}
                  </p>

                  <p className="md:block lg:hidden">
                    {address.substring(0, 5)}...{address.slice(-3)}
                  </p>
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

export default OwnBlueprintCard;
