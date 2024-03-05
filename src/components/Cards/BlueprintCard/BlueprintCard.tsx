import { FC } from 'react';

import EthLineSvg from '../../../assets/images/currency-eth.png';
// import Button from '../../Button';

export interface Props {
  uri: string;
  name: string;
  blueprintId: number;
  totalSupply: number;
  mintPrice: number;
  mintLimit: number;
  mintUnit: number;
  myCardBadge?: boolean;
  button?: boolean;
  onClick?: () => void;
  onClickMint?: () => void;
}
const Button: FC<{ text: string; onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; className: string }> = ({ text, onClick, className }) => (
  <button className={className} onClick={onClick}>
    {text}
  </button>
);

// export default function BlueprintCard(props: Props) {
const BlueprintCard: FC<Props> = ({
  uri,
  name,
  blueprintId,
  totalSupply,
  mintPrice,
  mintLimit,
  mintUnit,
  myCardBadge,
  button,
  onClick,
  onClickMint,
}) => {
  return (
    <div
      id="container"
      className="w-[160px] h-min xs:w-full sm:w-full md:w-full border-2 border-slate-800 bg-[#080809] rounded-3xl border-block overflow-clip"
      onClick={onClick}
    >
      <div className="relative w-[160px] xs:w-full sm:w-full md:w-full overflow-hidden">
        <div
          id="badge"
          className="absolute  right-[-55px] md:right-[-48px] top-[11px] md:top-[18px] sm:top-[15px] sm:right-[-55px] xs:h-[22px] xs:top-[12px] xs:right-[-60px] xs:text-[12px] w-[175.5px] h-[25px] md:h-[27px] bg-[#0047FF] text-white text-center text-[14px] md:text-[18px] rotate-[38.86deg] py-auto px-[35px] shadow-[0_3px_5px_1px_rgba(0,0,0,0.3)]"
        >
          Blueprint
        </div>
        <div className=" xs:w-full sm:w-full md:w-full md:h-full overflow-hidden object-cover">
          <img
            src={uri}
            className="w-full xs:w-full sm:w-full lg:w-full aspect-auto object-cover"
            alt="okoko"
          />
          <div className={`absolute ${button ? 'lg:bottom-[192px] md:bottom-[182px] sm:bottom-[174px]' : 'lg:bottom-[158px] md:bottom-[146px] sm:bottom-[134px]'} bg-gradient-to-t from-[#000] sm:from-0% bg-opacity-100 to-[#000407]/0 w-full bottom-[58px] h-[45px]`}></div>
          <div className="z-20 absolute top-[0px] left-0 bg-gradient-to-r from-slate-800 gray via-transparent to-transparent w-[20px] h-full"></div>
          <div className="z-20 absolute top-[0px] right-0 rounded-l-3xl bg-gradient-to-l from-slate-800 gray via-transparent to-transparent w-[20px] h-full"></div>
          <div className="absolute bottom-0 left-0 rounded-l-3xl bg-gradient-to-t from-slate-800 gray via-transparent to-transparent w-full h-[20px] rounded-b-[24px]"></div>
          <div className="absolute top-0 left-0 rounded-l-3xl bg-gradient-to-b from-slate-800 gray via-transparent to-transparent w-full h-[20px] rounded-b-[-24px]"></div>
        </div>
        <p
          className={`absolute ${myCardBadge ? 'sm:hidden' : 'hidden'
            } flex bottom-[67px]  right-[10px]  block-content font-mono items-center rounded-2xl bg-[#06DCEC]/20 text-[11px] px-[6px] border border-[#06DCEC]/50 text-[#06DCEC] text-center`}
        >
          My Blueprint
        </p>
        <div
          id="infor"
          className="flex justify-between sm:flex-col gap-y-0 top-[-80px] md:top-[-80px] p-4 pt-0 xs:w-full sm:w-full md:w-full box-border"
        >
          <div id="name" className="text-white">
            <p className="flex justify-start text-xs font-mono text-[#858584]">
              Name
            </p>
            <div className="flex justify-between items-center py-[3px]">
              <p className=" truncate text-sm md:text-base lg:text-lg font-mono">
                {name}
              </p>
              <p
                className={`${myCardBadge ? 'hidden sm:block' : 'hidden'
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
            <div id="id" className="">
              <p className="flex justify-start text-xs font-mono text-[#858584]">
                ID
              </p>
              <p className="text-sm md:text-base lg:text-lg items-center font-mono mt-[4px]">
                {blueprintId}
              </p>
            </div>
            <div id="id" className="text-end hidden sm:block">
              <p className="text-xs font-mono text-[#858584]">Total Supply</p>
              <p className="md:text-base lg:text-lg font-mono mt-[4px]">{totalSupply}</p>
            </div>
          </div>

          <div
            id="id_supply"
            className="relative sm:flex justify-between w-full hidden "
          >
            <div id="id" className=" hidden sm:block">
              <p className="flex justify-start text-xs font-mono text-[#858584]">
                Mint Price
              </p>
              <p className="flex gap-2 md:text-base lg:text-lg font-mono text-xs text-white">
                <span className="items-center my-auto">
                  <img src={EthLineSvg} />
                </span>{' '}
                {mintPrice} <span className="text-[#F3AC19]">{mintUnit === 0 ? 'ETH' : mintUnit === 1 ? 'USDT' : 'USDC'}</span>
              </p>
            </div>
            <div id="id" className="text-end hidden md:block">
              <p className="text-xs font-mono text-[#858584]">Mint Limit</p>
              <p className="md:text-base lg:text-lg font-mono text-white">{mintLimit}</p>
            </div>
          </div>
          <Button
            text="Mint Now"
            onClick={(e) => {
              e.stopPropagation();
              if (onClickMint) {
                onClickMint();
              }
            }}
            className={`${button ? 'sm:block' : ''
              } hidden w-full text-white bg-blue-600 h-[36px] mt-1 md:mt-0 rounded-lg justify-center`}
          />
        </div>
      </div>
    </div>
  );
};

export default BlueprintCard;
