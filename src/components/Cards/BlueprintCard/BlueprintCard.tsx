import { FC } from 'react';

import EthLineSvg from '../../../assets/images/currency-eth.png';
import Image from '../../Image';

export interface Props {
  uri: string;
  name: string;
  blueprintId: number;
  totalSupply: number;
  mintPrice: number;
  mintLimit: number;
  mintUnit: number;
  myBlueprint?: boolean;
  button?: boolean;
  onClick?: () => void;
  onClickMint?: () => void;
}

const Button: FC<{
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className: string;
}> = ({ text, onClick, className }) => (
  <button className={className} onClick={onClick}>
    {text}
  </button>
);

const BlueprintCard: FC<Props> = ({
  uri,
  name,
  blueprintId,
  totalSupply,
  mintPrice,
  mintLimit,
  mintUnit,
  myBlueprint,
  button,
  onClick,
  onClickMint,
}) => {
  return (
    <div
      id="container"
      className="h-min w-full border-2 border-slate-800 bg-[#000] rounded-3xl border-block overflow-clip"
      onClick={onClick}
    >
      <div className="relative w-full overflow-hidden">
        <div className="w-full overflow-hidden object-cover">
          <Image
            className="w-full aspect-square"
            src={uri}
            spinnerClassName="w-full aspect-square"
            alt="blueprint-card"
          />
          <div
            className={`absolute ${
              button
                ? 'lg:bottom-[208px] md:bottom-[196px] sm:bottom-[184px]'
                : 'lg:bottom-[158px] md:bottom-[146px] sm:bottom-[134px]'
            } bg-gradient-to-t from-[#000] sm:from-0% bg-opacity-100 to-[#000407]/1 w-full ${
              button ? 'bottom-[102px] xs:bottom-[108px]' : 'bottom-[58px]'
            } h-[45px]`}
          ></div>
          <div className="z-20 absolute top-[0px] left-0 bg-gradient-to-r from-slate-800 gray via-transparent to-transparent w-[20px] h-full"></div>
          <div className="z-20 absolute top-[0px] right-0 rounded-l-3xl bg-gradient-to-l from-slate-800 gray via-transparent to-transparent w-[20px] h-full"></div>
          <div className="absolute bottom-0 left-0 rounded-l-3xl bg-gradient-to-t from-slate-800 gray via-transparent to-transparent w-full h-[20px] rounded-b-[24px]"></div>
          <div className="absolute top-0 left-0 rounded-l-3xl bg-gradient-to-b from-slate-800 gray via-transparent to-transparent w-full h-[20px] rounded-b-[-24px]"></div>
        </div>
        <p
          className={`absolute ${myBlueprint ? 'sm:hidden' : 'hidden'} flex ${
            button ? 'bottom-[111px] xs:bottom-[117px]' : 'bottom-[67px]'
          } right-[10px] block-content font-mono items-center rounded-2xl bg-[#06DCEC]/20 text-[11px] px-[6px] border border-[#06DCEC]/50 text-[#06DCEC] text-center`}
        >
          My Blueprint
        </p>
        <div
          id="infor"
          className="flex justify-between sm:flex-col gap-y-0 xs:px-4 pb-4 px-6 pt-0 w-full box-border"
        >
          <div id="name" className="text-white">
            <p className="flex justify-start text-xs font-mono text-[#858584]">
              Name
            </p>
            <div className="sm:flex sm:justify-between grid w-full items-center py-[3px]">
              <p className="truncate text-sm md:text-base lg:text-lg font-mono">
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
          <div
            id="id_supply"
            className="relative flex justify-between text-white"
          >
            <div id="id" className="pl-1">
              <p className="flex justify-start text-xs font-mono text-[#858584]">
                ID
              </p>
              <p className="text-sm md:text-base lg:text-lg items-center font-mono mt-[4px] sm:mt-[3px] sm:w-[80px]">
                {blueprintId}
              </p>
            </div>
            <div id="id" className="text-end hidden sm:block truncate">
              <p className="text-xs font-mono text-[#858584] truncate">
                Total Supply
              </p>
              <p className="md:text-base lg:text-lg font-mono mt-[4px] truncate">
                {totalSupply}
              </p>
            </div>
          </div>
          <div
            id="id_supply"
            className="relative sm:flex justify-between w-full hidden"
          >
            <div id="id" className=" hidden sm:block">
              <p className="flex justify-start text-xs font-mono text-[#858584]">
                Mint Price
              </p>
              <p className="flex gap-2 md:text-base lg:text-lg font-mono text-xs text-white">
                <span className="items-center my-auto">
                  <img src={EthLineSvg} />
                </span>{' '}
                {mintPrice}{' '}
                <span className="text-[#F3AC19]">
                  {mintUnit === 0 ? 'ETH' : mintUnit === 1 ? 'USDT' : 'USDC'}
                </span>
              </p>
            </div>
            <div id="id" className="text-end hidden md:block">
              <p className="text-xs font-mono text-[#858584] truncate">
                Mint Limit
              </p>
              <p className="md:text-base lg:text-lg font-mono text-white">
                {mintLimit}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            className={`${
              button ? 'block' : 'hidden'
            } w-full mx-3.5 mb-3.5 text-white bg-blue-600 h-[30px] mt-0 rounded-lg justify-center text-sm md:text-base xs:h-[36px]`}
            text="Mint Now"
            onClick={(e) => {
              e.stopPropagation();
              if (onClickMint) {
                onClickMint();
              }
            }}
          />
        </div>
        <div
          id="badge"
          className="absolute right-[-55px] md:right-[-48px] top-[11px] md:top-[18px] sm:top-[15px] sm:right-[-55px] xs:h-[22px] xs:top-[12px] xs:right-[-60px] xs:text-[12px] w-[175.5px] h-[25px] md:h-[27px] bg-[#0047FF] text-white text-center text-[14px] md:text-[18px] rotate-[38.86deg] py-auto px-[35px] shadow-[0_3px_5px_1px_rgba(0,0,0,0.3)]"
        >
          Blueprint
        </div>
      </div>
    </div>
  );
};

export default BlueprintCard;
