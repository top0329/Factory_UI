import Button from '../Button';

export default function AdvancedFilter() {
  return (
    <div className="flex flex-col py-4 px-4 bg-[#000000]/90 w-[282px] gap-y-4 border rounded-b-lg">
      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between items-center  px-3 py-1 text-[#FFFFFF] bg-black rounded-lg w-full">
          <p className="text-base font-mono">Blueprint ID</p>
        </div>
        <div className="flex justify-between text-white gap-2">
          <input
            type="input"
            placeholder="Min"
            className="rounded-lg border border-[#FFFFFF] text-[#B0A9A9D4] text-base text-center w-full bg-[#000000]"
          />
          to
          <input
            type="input"
            placeholder="Max"
            className="rounded-lg border border-[#FFFFFF] text-[#B0A9A9D4] text-base text-center w-full bg-[#000000]"
          />
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between items-center px-3 py-1 text-[#FFFFFF] bg-black rounded-lg w-full">
          <p className="text-base font-mono">Mint Price</p>
        </div>
        <div className="flex flex-col gap-2">
          <select className="flex w-full items-center px-3 py-1.5 rounded-lg border border-light-gray bg-[#000000] font-medium text-white shadow-sm sm:mt-0 sm:w-auto sm:text-sm sm:min-w-36 sm:gap-3">
            <option>ETH</option>
            <option>USDT</option>
            <option>USDC</option>
          </select>
          <div className="flex justify-between text-white gap-2">
            <input
              type="input"
              placeholder="Min"
              className="rounded-lg border border-[#FFFFFF] text-[#B0A9A9D4] text-base text-center w-full bg-[#000000]"
            />
            to
            <input
              type="input"
              placeholder="Max"
              className="rounded-lg border border-[#FFFFFF] text-[#B0A9A9D4] text-base text-center w-full bg-[#000000]"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between items-center  px-3 py-1 text-[#FFFFFF] bg-black rounded-lg w-full">
          <p className="text-base font-mono">Mint Limit</p>
        </div>
        <div className="flex justify-between text-white gap-2">
          <input
            type="input"
            placeholder="Min"
            className="rounded-lg border border-[#FFFFFF] text-[#B0A9A9D4] text-base text-center w-full bg-[#000000]"
          />
          to
          <input
            type="input"
            placeholder="Max"
            className="rounded-lg border border-[#FFFFFF] text-[#B0A9A9D4] text-base text-center w-full bg-[#000000]"
          />
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between items-center  px-3 py-1 text-[#FFFFFF] bg-black rounded-lg w-full">
          <p className="text-base font-mono">Total Supply</p>
        </div>
        <div className="flex justify-between text-white gap-2">
          <input
            type="input"
            placeholder="Min"
            className="rounded-lg border border-[#FFFFFF] text-[#B0A9A9D4] text-base text-center w-full bg-[#000000]"
          />
          to
          <input
            type="input"
            placeholder="Max"
            className="rounded-lg border border-[#FFFFFF] text-[#B0A9A9D4] text-base text-center w-full bg-[#000000]"
          />
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between items-center  px-3 py-1 text-[#FFFFFF] bg-black rounded-lg w-full">
          <p className="text-base font-mono">Minted Amount</p>
        </div>
        <div className="flex justify-between text-white gap-2">
          <input
            type="input"
            placeholder="Min"
            className="rounded-lg border border-[#FFFFFF] text-[#B0A9A9D4] text-base text-center w-full bg-[#000000]"
          />
          to
          <input
            type="input"
            placeholder="Max"
            className="rounded-lg border border-[#FFFFFF] text-[#B0A9A9D4] text-base text-center w-full bg-[#000000]"
          />
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
