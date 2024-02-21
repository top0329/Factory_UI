import { Icon } from '@iconify/react/dist/iconify.js';

export interface Props {
  imageLink: string;
  name: string;
  blueprintid: number;
  tsupply: number;
  address: string;
}

export function OwnBlueprintCard(props: Props) {
  return (
    <div
      id="container"
      className="w-[280px] h-[480px] border border-[#000000] bg-[#011018] rounded-3xl border-block"
      style={{ overflow: 'hidden' }}
    >
      <div className="relative w-full">
        <div
          id="badge"
          className="absolute left-[152px] top-[26px] w-[175.5px] h-[30px] bg-[#0047FF] text-white text-center text-[18px] rotate-[38.86deg] py-auto px-[35px] shadow-[0_3px_5px_1px_rgba(0,0,0,0.3)]"
        >
          Blueprint
        </div>
        <img src={props.imageLink} alt="okoko" />
        <div
          id="gradient"
          className="absolute top-[258px] bg-gradient-to-t from-[#011018] bg-opacity-100 to-[#000407]/0 w-[280px] h-[82px] mt-"
        ></div>

        <div
          id="infor"
          className="relative flex flex-col w-[237px] gap-y-1 top-[-15px] left-[25px]"
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
            <div id="id" className="text-end">
              <p className="text-xs font-mono text-[#858584]">Total Supply</p>
              <p className="text-lg font-mono">{props.tsupply}</p>
            </div>
          </div>

          <div id="id_supply" className="">
            <div id="address" className="text-white">
              <p className="text-xs font-mono text-[#858584]">Address</p>
              <div id="id_supply" className="flex justify-between text-white">
                <div className="flex justify-center gap-1 item-center text-lg font-mono">
                  <Icon icon="logos:ethereum" className="item-center my-auto" />
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
