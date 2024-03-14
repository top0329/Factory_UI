import Button from '../Button';

export default function AdvancedFilter() {
  return (
    <div className="flex flex-col py-4 px-4 bg-[#000000] w-[282px] gap-y-4 border-[3px] border-[#313131] rounded-lg">
      <div className="flex flex-col gap-y-2 text-sm text-light-gray">
        <div className="flex justify-between items-center  px-3 py-1 bg-black rounded-lg w-full">
          <p className="font-mono">Blueprint ID</p>
        </div>
        <div className="flex justify-between items-center gap-2">
          <input
            type="input"
            placeholder="Min"
            className="rounded-lg border border-light-gray text-center text-white w-full bg-[#000000] py-0.5"
          />
          to
          <input
            type="input"
            placeholder="Max"
            className="rounded-lg border border-light-gray text-center text-white w-full bg-[#000000] py-0.5"
          />
        </div>
      </div>
      <div className="flex flex-col gap-y-2 text-sm text-light-gray">
        <div className="flex justify-between items-center px-3 py-1 bg-black rounded-lg w-full">
          <p className="font-mono">Mint Price</p>
        </div>
        <div className="flex flex-col gap-4 text-sm">
          <select
            defaultValue="ETH"
            className="flex w-full items-center px-2 py-0.5 rounded-lg border border-light-gray bg-[#000000] font-medium shadow-sm sm:mt-0 sm:w-auto sm:text-sm sm:min-w-36 sm:gap-3"
          >
            <option>ETH</option>
            <option>USDT</option>
            <option>USDC</option>
          </select>
          <div className="flex justify-between items-center gap-2">
            <input
              type="input"
              placeholder="Min"
              className="rounded-lg border border-light-gray text-center text-white w-full bg-[#000000] py-0.5"
            />
            to
            <input
              type="input"
              placeholder="Max"
              className="rounded-lg border border-light-gray text-center text-white w-full bg-[#000000] py-0.5"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-2 text-sm text-light-gray">
        <div className="flex justify-between items-center px-3 py-1 bg-black rounded-lg w-full">
          <p className="font-mono">Mint Limit</p>
        </div>
        <div className="flex justify-between items-center gap-2">
          <input
            type="input"
            placeholder="Min"
            className="rounded-lg border border-light-gray text-center text-white w-full bg-[#000000] py-0.5"
          />
          to
          <input
            type="input"
            placeholder="Max"
            className="rounded-lg border border-light-gray text-center text-white w-full bg-[#000000] py-0.5"
          />
        </div>
      </div>
      <div className="flex flex-col gap-y-2 text-sm text-light-gray">
        <div className="flex justify-between items-center px-3 py-1 bg-black rounded-lg w-full">
          <p className="font-mono">Total Supply</p>
        </div>
        <div className="flex justify-between items-center gap-2">
          <input
            type="input"
            placeholder="Min"
            className="rounded-lg border border-light-gray text-center text-white w-full bg-[#000000] py-0.5"
          />
          to
          <input
            type="input"
            placeholder="Max"
            className="rounded-lg border border-light-gray text-center text-white w-full bg-[#000000] py-0.5"
          />
        </div>
      </div>
      <div className="flex flex-col gap-y-2 text-sm text-light-gray">
        <div className="flex justify-between items-center  px-3 py-1  bg-black rounded-lg w-full">
          <p className="font-mono">Minted Amount</p>
        </div>
        <div className="flex justify-between items-center gap-2">
          <input
            type="input"
            placeholder="Min"
            className="rounded-lg border border-light-gray text-center text-white w-full bg-[#000000] py-0.5"
          />
          to
          <input
            type="input"
            placeholder="Max"
            className="rounded-lg border border-light-gray text-center text-white w-full bg-[#000000] py-0.5"
          />
        </div>
      </div>
      <Button
        variant="primary"
        text="Apply"
        className="flex justify-center rounded-lg text-sm !py-1.5"
      />
    </div>
  );
}
