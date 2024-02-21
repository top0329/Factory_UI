import EthLineSvg from '../../assets/images/CurrencyEth.png';

export interface Props {
  imageLink: string;
  name: string;
  blueprintid: number;
  tsupply: number;
  mintPrice: number;
  mintLimit: number;
}

export function MyBlueprintCard(props: Props) {
  return (
    <div
      id="container"
      className="w-[176px] sm:w-[280px] border border-black bg-[#000000] rounded-3xl border-block"
      style={{ overflow: 'hidden' }}
    >
      <div className="relative w-full">
        <div
          id="badge"
          className="absolute left-[52px] sm:left-[152px] top-[20px] sm:top-[26px] w-[175.5px] h-[20px] sm:h-[30px] bg-[#0047FF] text-white text-center text-[14px] sm:text-[18px] rotate-[38.86deg] py-auto px-[35px] shadow-[0_3px_5px_1px_rgba(0,0,0,0.3)]"
        >
          Blueprint
        </div>
        <img
          src={props.imageLink}
          className="w-[280px] xs:w-[176px]"
          alt="okoko"
        />{' '}
        <div
          id="gradient"
          className="absolute z-0 top-[258px] bg-gradient-to-t from-[#000000] bg-opacity-100 to-[#000407]/0 sm:w-[280px]  w-[176px] h-[82px]"
        ></div>
        <p className="absolute flex top-[178px] z-50 right-[10px] block-content sm:hidden font-mono items-center rounded-2xl bg-[#06DCEC]/20 text-[11px] px-[6px] border border-[#06DCEC]/50 text-[#06DCEC]/50 text-center">
          My Blueprint
        </p>
        <div
          id="infor"
          className="relative flex justify-between sm:flex-col gap-y-1 top-[-8px] px-6 sm:w-[280px] w-[176px] box-border"
        >
          <div id="name" className="text-white">
            <p className="text-xs font-mono text-[#858584]">Name</p>
            <div className="flex justify-between py-[3px]">
              <p className="text-lg font-mono">{props.name}</p>
              <p className="hidden sm:block flex font-mono items-center rounded-2xl bg-[#06DCEC]/20 text-[11px] my-[3px] px-[6px] border border-[#06DCEC]/50 text-[#06DCEC]/50 text-center">
                My Blueprint
              </p>
            </div>
          </div>

          <div id="id_supply" className="flex justify-between text-white">
            <div id="id" className="">
              <p className="text-xs font-mono text-[#858584]">ID</p>
              <p className="text-lg font-mono">{props.blueprintid}</p>
            </div>
            <div id="id" className="text-end hidden sm:block">
              <p className="text-xs font-mono text-[#858584]">Total Supply</p>
              <p className="text-lg font-mono">{props.tsupply}</p>
            </div>
          </div>

          <div id="id_supply" className="flex justify-between text-white">
            <div id="id" className=" hidden sm:block">
              <p className="text-xs font-mono text-[#858584]">Mint Price</p>
              <p className="flex gap-2 text-lg font-mono">
                <span className="items-center my-auto">
                  <img src={EthLineSvg} />
                </span>{' '}
                {props.mintPrice} <span className="text-[#F3AC19]">ETH</span>
              </p>
            </div>
            <div id="id" className="text-end mb-4  hidden sm:block">
              <p className="text-xs font-mono text-[#858584]">Mint Limit</p>
              <p className="text-lg font-mono">{props.mintLimit}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
