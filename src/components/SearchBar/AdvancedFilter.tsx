import { Icon } from '@iconify/react/dist/iconify.js';
import Button from '../Button';

export default function AdvancedFilter() {
  return (
    <div className="flex flex-col py-4 px-2 bg-[#000000] w-[282px] gap-y-4">
      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between items-center  px-3 py-1 text-[#FFFFFF] bg-black rounded-lg w-full">
          <p className="text-base font-mono">Blueprint ID</p>
          <Icon icon="formkit:down" className="flex w-4 items-center" />
        </div>
        <div className="flex justify-between text-white gap-2">
          <button className="rounded-lg border border-[#FFFFFF] text-[#B0A9A9D4] text-base w-full">
            Min
          </button>
          to
          <button className="rounded-lg border border-[#FFFFFF] text-[#B0A9A9D4] text-base w-full">
            Max
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between items-center px-3 py-1 text-[#FFFFFF] bg-black rounded-lg w-full">
          <p className="text-base font-mono">Blueprint ID</p>
          <Icon icon="formkit:down" className="flex w-4 items-center" />
        </div>
        <div className="flex flex-col gap-2">
          <button className="flex justify-between gap-0 w-full items-center px-2 search-button-width py-1.5 rounded-lg border border-light-gray bg-[#000000] font-medium text-white shadow-sm sm:mt-0 sm:w-auto sm:text-sm sm:min-w-36 sm:gap-3">
            ETH
            <Icon
              icon="icon-park-solid:down-one"
              className="text-light-gray w-6 h-6"
            />
          </button>
          <div className="flex justify-between text-white gap-2">
            <button className="rounded-lg border border-[#FFFFFF] text-[#B0A9A9D4] text-base w-full">
              Min
            </button>
            to
            <button className="rounded-lg border border-[#FFFFFF] text-[#B0A9A9D4] text-base w-full">
              Min
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between items-center  px-3 py-1 text-[#FFFFFF] bg-black rounded-lg w-full">
          <p className="text-base font-mono">Mint Limit</p>
          <Icon icon="formkit:down" className="flex w-4 items-center" />
        </div>
        <div className="flex justify-between text-white gap-2">
          <button className="rounded-lg border border-[#FFFFFF] text-[#B0A9A9D4] text-base w-full">
            Min
          </button>
          to
          <button className="rounded-lg border border-[#FFFFFF] text-[#B0A9A9D4] text-base w-full">
            Max
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between items-center  px-3 py-1 text-[#FFFFFF] bg-[#000000] rounded-lg w-full">
          <p className="text-base font-mono">Mint Limit</p>
          <Icon icon="formkit:down" className="flex w-4 items-center" />
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between items-center  px-3 py-1 text-[#FFFFFF] bg-[#000000] rounded-lg w-full">
          <p className="text-base font-mono">Minted Amount</p>
          <Icon icon="formkit:down" className="flex w-4 items-center" />
        </div>
      </div>

      <Button
        variant="primary"
        text="Apply"
        className="flex justify-center rounded-lg"
      />
    </div>
  );
}
