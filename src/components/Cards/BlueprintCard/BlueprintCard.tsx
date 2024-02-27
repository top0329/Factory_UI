import { FC } from 'react';

import EthLineSvg from '../../../assets/images/currency-eth.png';
import Button from '../../Button';

export interface Props {
  uri: string;
  name: string;
  blueprintid: number;
  totalSupply: number;
  mintPrice: number;
  mintLimit: number;
  myCardBadge?: boolean;
  button?: boolean;
}

// export default function BlueprintCard(props: Props) {
const BlueprintCard: FC<Props> = ({
  uri,
  name,
  blueprintid,
  totalSupply,
  mintPrice,
  mintLimit,
  myCardBadge,
  button,
}) => {
  return (
    <div
      id="container"
      className="w-[176px] sm:w-[280px]  border border-black bg-[#000000] rounded-3xl border-block overflow-hidden"
    >
      <div className="relative w-[176px] sm:w-[280px]">
        <div
          id="badge"
          className="absolute left-[52px] sm:left-[152px] top-[20px] sm:top-[26px] w-[175.5px] h-[20px] sm:h-[30px] bg-[#0047FF] text-white text-center text-[14px] sm:text-[18px] rotate-[38.86deg] py-auto px-[35px] shadow-[0_3px_5px_1px_rgba(0,0,0,0.3)]"
        >
          Blueprint
        </div>
        <div className="w-[176px] h-[176px] sm:w-[280px] sm:h-[335px] overflow-hidden">
          <img
            src={uri}
            className="w-[280px] xs:w-[176px] sm:w-[280px] sm:h-[335px]"
            alt="okoko"
          />
        </div>

        <div
          id="gradient"
          className="absolute top-[258px] bg-gradient-to-t from-[#000000] bg-opacity-100 to-[#000407]/0 w-[280px]  xs:w-[176px] h-[82px]"
        ></div>
        <p
          className={`absolute ${
            myCardBadge ? 'sm:hidden' : 'hidden'
          } flex top-[148px] z-50 right-[10px] block-content font-mono items-center rounded-2xl bg-[#06DCEC]/20 text-[11px] px-[6px] border border-[#06DCEC]/50 text-[#06DCEC]/50 text-center`}
        >
          My Blueprint
        </p>
        <div
          id="infor"
          className="relative flex justify-between sm:flex-col gap-y-1 top-[2px] sm:top-[-8px] px-6 sm:w-[280px] w-[176px] box-border"
        >
          <div id="name" className="text-white">
            <p className="text-xs font-mono text-[#858584]">Name</p>
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
              <p className="text-xs font-mono text-[#858584]">ID</p>
              <p className="text-lg font-mono">{blueprintid}</p>
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
              <p className="text-xs font-mono text-[#858584]">Mint Price</p>
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
