import { Icon } from '@iconify/react/dist/iconify.js';
import shield from '../../assets/images/Shield_wood_ERC1155.webp';

export default function ApproveBlueprintModal() {
  return (
    <div className="flex flex-col w-[614px] rounded-3xl bg-[#020915] broder border-[#313131] gap-y-3 pt-[13px] pb-[30px] ">
      <div className="flex justify-between items-center text-[#AEAEAE]">
        <p className="flex justify-center text-2xl items-center text-center">
          Blueprint Info
        </p>
      </div>
      <div className="overflow-hidden h-[382px]">
        <img
          src={shield}
          className="!bg-center bg-no-repeat bg-cover w-full overflow-hidden mt-[-90px]"
        />
      </div>
      <div className="w-full h-[82px] bg-gradient-to-t from-[#020915] to-white/0 mt-[-82px] items-end px-14">
        <p className="text-white text-2xl font-mono pt-8">Cute</p>
      </div>

      <div id="infor" className="flex flex-col gap-y-3 pl-20">
        <div className="grid grid-cols-2 text-base">
          <p className="font-mono text-white">Blueprint ID</p>
          <p className="font-mono text-white">261</p>
        </div>
        <div className="grid grid-cols-2 text-base">
          <p className="font-mono text-white">Address</p>
          <div className="flex gap-2 text-white">
            <p className="font-mono ">0xdAC17F9 ... D831ec7</p>
            <button>
              <Icon icon="solar:copy-outline" className="item-center my-auto" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 text-base">
          <p className="font-mono text-white">Blueprint Amount</p>
          <div className="flex gap-3">
            <input className="bg-[#03070F] border border-[#5C5252] rounded-xl w-1/2" />
            <input type="checkbox" />
            <p className="text-[#6C6969]">Max Amount</p>
          </div>
        </div>
        <div className="flex justify-between !text-cente w-3/4 gap-10 my-2">
          <button className="flex py-2 px-5 rounded-2xl gap-3 items-center w-full !text-center !justify-center bg-[#353535] text-white">
            Cancel
          </button>
          <button className="flex py-2 px-5 rounded-2xl gap-3 items-center w-full !text-center !justify-center bg-primary text-white">
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
