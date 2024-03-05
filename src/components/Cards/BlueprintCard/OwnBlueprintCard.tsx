import { FC } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

export interface Props {
  uri: string;
  name: string;
  blueprintId: number;
  balance: number;
  address: string;
  myCardBadge?: boolean;
  onClick?: () => void;
}

const OwnBlueprintCard: FC<Props> = ({
  uri,
  name,
  blueprintId,
  balance,
  address,
  myCardBadge,
  onClick,
}) => {
  return (
    <div
      id="container"
      className="w-[160px] h-min xs:w-full sm:w-full md:w-full border-2 border-[#00F0FF]/30 bg-[#011018] rounded-3xl border-block overflow-clip"
      onClick={onClick}
    >
      <div className="relative w-[160px] xs:w-full sm:w-full md:w-full overflow-hidden">
        <div
          id="badge"
          className="absolute  right-[-55px] md:right-[-48px] top-[11px] md:top-[18px] sm:top-[15px] sm:right-[-55px] xs:h-[22px] xs:top-[12px] xs:right-[-60px] xs:text-[12px] w-[175.5px] h-[25px] md:h-[27px] bg-[#0047FF] text-white text-center text-[14px] md:text-[18px] rotate-[38.86deg] py-auto px-[35px] shadow-[0_3px_5px_1px_rgba(0,0,0,0.3)]"
        >
          Blueprint
        </div>
        <div className="xs:w-full sm:w-full md:w-full md:h-full overflow-hidden object-cover">
          <img
            src={uri}
            className="w-full xs:w-full sm:w-full lg:w-full aspect-auto object-cover"
            alt="okoko"
          />
          <div className="absolute md:bottom-[170px] lg:bottom-[182px] sm:bottom-[158px] bg-gradient-to-t from-[#000] from-30% sm:from-0% bg-opacity-100 to-[#000407]/0 sm:w-full md:w-full h-[45px]"></div>
        </div>
        <p
          className={`absolute ${myCardBadge ? 'sm:hidden' : 'hidden'
            } flex bottom-[77px] right-[10px] block-content font-mono items-center rounded-2xl bg-[#2e1313]/60 text-[11px] px-[6px] border border-[#06DCEC]/50 text-[#06DCEC]/50 text-center`}
        >
          My Blueprint
        </p>
        <div
          id="infor"
          className="flex justify-between py-4 sm:flex-col gap-y-1 top-[-80px] md:top-[-80px] px-4  xs:w-full sm:w-full md:w-full box-border"
        >
          <div id="name" className="text-white">
            <p className="flex justify-start text-xs font-mono text-[#858584]">
              Name
            </p>
            <div className="flex justify-between items-center py-[3px]">
              <p className="w-[80px] lg:md:sm:w-[130px] truncate text-sm md:text-base lg:text-lg font-mono">
                {name}
              </p>
              <p
                className={`${myCardBadge ? 'hidden sm:block' : 'hidden'
                  } truncate font-mono items-center rounded-2xl bg-[#2e1313]/60 text-[11px] my-[3px] px-[6px] border border-[#06DCEC]/50 text-[#06DCEC]/50 text-center w-[87px]`}
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
              <p className="text-sm md:text-base lg:text-lg items-center font-mono mt-[4px] ">
                {blueprintId}
              </p>
            </div>
            <div id="id" className="text-end hidden sm:block">
              <p className="text-xs font-mono text-[#858584]">Balance</p>
              <p className="md:text-base lg:text-lg font-mono mt-[4px]">{balance}</p>
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
                  <p className="">
                    {address.substring(0, 7)}...{address.slice(-5)}
                  </p>

                  {/* <p className="sm:block lg:hidden">
                    {address.substring(0, 5)}...{address.slice(-3)}
                  </p> */}
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
