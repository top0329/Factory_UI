import { Icon } from '@iconify/react/dist/iconify.js';

export interface Props {
  imageLink: string;
  name: string;
  blueprintid: number;
  tsupply: number;
  address: string;
}

export function ProductBlueprintCard(props: Props) {
  return (
    <div
      id="container"
      className="w-[176px] sm:w-[280px]  border border-black bg-[#011018] rounded-3xl border-block"
      style={{ overflow: 'hidden' }}
    >
      <div className="relative w-[176px] sm:w-[280px]">
        <div
          id="badge"
          className="absolute left-[52px] sm:left-[152px] top-[20px] sm:top-[26px] w-[175.5px] h-[20px] sm:h-[30px] bg-[#FFF500] text-[#010101] text-center text-[14px] sm:text-[18px] rotate-[38.86deg] py-auto px-[35px] shadow-[0_3px_5px_1px_rgba(0,0,0,0.3)]"
        >
          Product
        </div>
        <div className="w-[176px] h-[176px] sm:w-[280px] sm:h-[335px] overflow-hidden">
          <img
            src={props.imageLink}
            className="w-[280px] xs:w-[176px] sm:w-[280px] sm:h-[335px]"
            alt="okoko"
          />
        </div>
        <div
          id="gradient"
          className="absolute top-[258px] bg-gradient-to-t from-[#011018] bg-opacity-100 to-[#000407]/0 w-[280px]  xs:w-[176px] h-[82px]"
        ></div>
        <div
          id="infor"
          className="relative flex justify-between sm:flex-col gap-y-1 top-[2px] sm:top-[-8px] px-6 sm:w-[280px] w-[176px] box-border"
        >
          <div id="name" className="text-white">
            <p className="text-xs font-mono text-[#858584]">Name</p>
            <p className="text-lg font-mono">{props.name}</p>
          </div>

          <div id="id_supply" className="flex justify-between text-white">
            <div id="id" className="">
              <p className="text-xs font-mono text-[#858584]">ID</p>
              <p className="text-lg font-mono">{props.blueprintid}</p>
            </div>
            <div id="id" className="text-end hidden sm:block">
              <p className="text-xs font-mono text-[#858584]">Balance</p>
              <p className="text-lg font-mono">{props.tsupply}</p>
            </div>
          </div>

          <div id="id_supply" className="w-full hidden sm:block">
            <div id="address" className="text-white">
              <p className="text-xs font-mono text-[#858584]">Address</p>
              <div id="id_supply" className="flex justify-between text-white">
                <div className="flex justify-center gap-1 item-center sm:text-lg font-mono text-xs">
                  <Icon
                    icon="logos:ethereum"
                    className="hidden sm:block item-center my-auto"
                  />
                  {props.address.substring(0, 7)} ... {props.address.slice(-5)}
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
}
