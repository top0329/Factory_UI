import { FC } from 'react';

import EthLineSvg from '../../../assets/images/currency-eth.png';
import Button from '../../Button';

export interface Props {
  uri: string;
  name: string;
  blueprintId: number;
  totalSupply: number;
  mintPrice: number;
  mintLimit: number;
  myCardBadge?: boolean;
  button?: boolean;
  onClick?: () => void;
}

// export default function BlueprintCard(props: Props) {
const BlueprintCard: FC<Props> = ({
  uri,
  name,
  blueprintId,
  totalSupply,
  mintPrice,
  mintLimit,
  myCardBadge,
  button,
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
          Blueprint
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
        <div className="z-20 absolute top-[0px] left-0 bg-gradient-to-r from-slate-800 gray via-transparent to-transparent w-[20px] h-full"></div>
        <div className="z-20 absolute top-[0px] right-0 rounded-l-3xl bg-gradient-to-l from-slate-800 gray via-transparent to-transparent w-[20px] h-full"></div>
        <div className="absolute bottom-0 left-0 rounded-l-3xl bg-gradient-to-t from-slate-800 gray via-transparent to-transparent w-full h-[20px] rounded-b-[-24px]"></div>
        <div className="absolute top-0 left-0 rounded-l-3xl bg-gradient-to-b from-slate-800 gray via-transparent to-transparent w-full h-[20px] rounded-b-[-24px]"></div>

        <p
          className={`absolute ${
            myCardBadge ? 'sm:hidden' : 'hidden'
          } flex top-[148px] z-50 right-[10px] block-content font-mono items-center rounded-2xl bg-[#06DCEC]/20 text-[11px] px-[6px] border border-[#06DCEC]/50 text-[#06DCEC]/50 text-center`}
        >
          My Blueprint
        </p>
        <div
          id="infor"
          className="relative flex justify-between sm:flex-col gap-y-1 top-[-80px] sm:top-[-80px] px-6 w-[176px] sm:w-full  box-border"
        >
          <div id="name" className="text-white">
            <p className="flex text-xs font-mono text-[#858584] justify-start">
              Name
            </p>
            <div className="flex justify-between py-[3px]">
              <p className="text-lg font-mono">{name}</p>
              <p
                className={`${
                  myCardBadge ? 'sm:block hidden' : 'hidden'
                } font-mono items-center rounded-2xl bg-[#06DCEC]/20 text-[11px] my-[3px] px-[6px] border border-[#06DCEC]/50 text-[#06DCEC]/50 text-center`}
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
              <p className="text-lg font-mono">{blueprintId}</p>
            </div>
            <div id="id" className="text-end hidden sm:block">
              <p className="text-xs font-mono text-[rgb(133,133,132)]">
                Total Supply
              </p>
              <p className="text-lg font-mono">{totalSupply}</p>
            </div>
          </div>

          <div id="id_supply" className="flex justify-between text-white">
            <div id="id" className=" hidden sm:block">
              <p className="flex justify-start text-xs font-mono text-[#858584]">
                Mint Price
              </p>
              <p className="flex gap-2 text-lg font-mono">
                <span className="items-center my-auto">
                  <img src={EthLineSvg} />
                </span>{' '}
                {mintPrice} <span className="text-[#F3AC19]">ETH</span>
              </p>
            </div>
            <div id="id" className="text-end mb-4  hidden sm:block">
              <p className="text-xs font-mono text-[#858584]">Mint Limit</p>
              <p className="text-lg font-mono">{mintLimit}</p>
            </div>
          </div>
        </div>
        <Button
          text="Mint Now"
          variant="primary"
          className={`${
            button ? 'block' : 'hidden'
          } flex w-full mb-3 mt-1 sm:mt-0 rounded-lg justify-center`}
        />
      </div>
    </div>
  );
};

export default BlueprintCard;
