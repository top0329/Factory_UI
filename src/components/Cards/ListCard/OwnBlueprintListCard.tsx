import { Icon } from '@iconify/react/dist/iconify.js';
import { OwnBlueprintList } from '../../../types';

export default function OwnBlueprintListCard(props: OwnBlueprintList) {
  return (
    <div
      className={`flex w-full h-[80px] justify-between items-center md:px-[40px] py-2 mb-2 border  rounded-3xl text-white text-base ${
        props.type == 0
          ? 'bg-[#09F5D8]/10 border-[#09F5D8]'
          : props.type == 1
          ? 'bg-[#099EF5]/10 border-[#099EF5]'
          : 'bg-[#7414D5]/10 border-[#7414D5]'
      }`}
    >
      <div id="icon" className="flex justify-center py-2">
        <img src={props.uri} className="block w-[64px] h-[64px] rounded-full" />
      </div>

      <div
        id="type"
        className="hidden md:flex text-white justify-center items-center w-[15%]  text-2xl"
      >
        {props.type == 0 && <p>ERC20</p>}
        {props.type == 1 && <p>ERC721</p>}
        {props.type == 2 && <p>ERC1155</p>}
      </div>

      <div id="name" className="flex flex-col justify-center w-[15%]">
        <p className="text-[#858584] text-xs">Name</p>
        <p>{props.name}</p>
      </div>

      <div
        id="address"
        className="hidden md:block flex-col justify-center w-[27%]"
      >
        <p className="text-[#858584] text-xs">Address</p>
        <div className="flex gap-2">
          <p className="truncate">
            {props.address.substring(0, 9)} . . . {props.address.slice(-7)}
          </p>
          <button>
            <Icon icon="solar:copy-outline" className="item-center my-auto" />
          </button>
        </div>
      </div>
      <div id="id" className=" w-[5%]">
        {props.type != 0 && (
          <div>
            <p className="text-[#858584] text-xs">ID</p>
            <p className="">{props.id}</p>
          </div>
        )}
      </div>

      <div id="amount" className="w-[5%]">
        {props.type != 1 && (
          <div>
            <p className="text-[#858584] text-xs">Amount</p>
            <p className="text-center">{props.amount}</p>
          </div>
        )}
      </div>
      {!props.isDecompose && (
        <div id="approve" className="">
          <button className="bg-[#000000] rounded-xl text-xl h-[35px] w-[99px] border border-[#2E2E2E]">
            Approve
          </button>
        </div>
      )}
    </div>
  );
}

// export function ERC1155DecomposeListCard(props: OwnBlueprintList) {
//   return (
//     <div className="flex gap-3 w-[350px] sm:w-[400px] md:w-[80%] h-[80px] justify-between items-center md:px-[40px] py-2 border bg-[#7414D5]/10 border-[#7414D5] rounded-3xl text-white text-base">
//       <div id="icon" className="flex justify-center w-[64px] py-2">
//         <img src={props.uri} className=" h-[68px] rounded-full" />
//       </div>

//       <div
//         id="type"
//         className="hidden md:flex text-white justify-center items-center w-[15%]  text-2xl"
//       >
//         {props.type}
//       </div>

//       <div id="name" className="flex flex-col justify-center w-[20%]">
//         <p className="text-[#858584] text-xs">Name</p>
//         <p>{props.name}</p>
//       </div>

//       <div
//         id="address"
//         className="hidden md:block flex-col justify-center w-[30%]"
//       >
//         <p className="text-[#858584] text-xs">Address</p>
//         <div className="flex gap-2">
//           {props.address.substring(0, 9)} ... {props.address.slice(-7)}
//           <button>
//             <Icon icon="solar:copy-outline" className="item-center my-auto" />
//           </button>
//         </div>
//       </div>

//       <div id="id" className="w-[5%] justify-center">
//         <p className="text-[#858584] text-xs">ID</p>
//         <p>{props.id}</p>
//       </div>

//       <div id="amount" className="w-[20%]">
//         <p className="text-[#858584] text-xs">Amount</p>
//         <p>{props.amount}</p>
//       </div>
//     </div>
//   );
// }
