import { Icon } from '@iconify/react/dist/iconify.js';

export interface Props {
  uri: string;
  type: string;
  name: string;
  address: string;
  id: number;
  balance: number;
}

export default function ProductListCard(props: Props) {
  return (
    <div
      className={`flex gap-0 md:gap-3 w-[400px] md:w-[85%] h-[80px] justify-between items-center md:px-[40px] py-2 border bg-[#6469875]/10 rounded-3xl text-white text-base`}
    >
      <div id="icon" className="flex justify-center w-[64px] py-2">
        <img src={props.uri} className="block h-[64px] rounded-full" />
      </div>

      <div
        id="type"
        className="hidden md:flex text-white justify-center items-center w-[15%]"
      >
        {props.type}
      </div>

      <div id="name" className="flex flex-col justify-center w-[15%]">
        <p className="text-[#858584] text-xs">Name</p>
        <p>{props.name}</p>
      </div>

      <div
        id="address"
        className="hidden md:block flex-col justify-center w-[25%]"
      >
        <p className="text-[#858584] text-xs">Address</p>
        <div className="flex gap-2">
          {props.address.substring(0, 9)} ... {props.address.slice(-7)}
          <button>
            <Icon icon="solar:copy-outline" className="item-center my-auto" />
          </button>
        </div>
      </div>

      <div id="id" className="flex flex-col justify-center w-[5%]">
        <p className="text-[#858584] text-xs">Id</p>
        <p>{props.id}</p>
      </div>

      <div id="amount" className="w-[15%]">
        <p className="text-[#858584] text-xs">Balance</p>
        <p>{props.balance}</p>
      </div>
    </div>
  );
}
