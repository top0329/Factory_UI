import { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import blueprintInfoImage from '../../../assets/images/blueprint.png';

export default function BlueprintInfoCard() {
  const [editable, setEditable] = useState(true);
  const [uriChecked, setUriChecked] = useState(false);
  const [mintPriceChecked, setMintPriceChecked] = useState(false);
  const [mintLimitChecked, setMintLimitChecked] = useState(false);
  const [buttonEnable, setButtonEnable] = useState(false);

  const handleEditable = () => {
    setEditable(true);
  };

  const handleUriCheckedChange = () => {
    setUriChecked(!uriChecked);
  };

  const handleMintPriceChecked = () => {
    setMintPriceChecked(!mintPriceChecked);
  };

  const handleMintLimitChecked = () => {
    setMintLimitChecked(!mintLimitChecked);
  };

  const handleButtonEnable = () => {
    setButtonEnable(true);
  };

  return (
    <div className="flex flex-col  w-[335px] rounded-3xl bg-[#011018] broder border-[#313131] gap-y-3 pt-[13px] pb-[40px] ">
      <div className="flex justify-between items-center  text-[#AEAEAE] pl-[32px] pr-[16px]">
        <p className="text-2xl">Blueprint Info</p>
        <button onClick={handleEditable}>
          {editable ? (
            buttonEnable ? (
              <Icon icon="line-md:confirm-circle-twotone" className="w-6" />
            ) : (
              <button onClick={handleButtonEnable}>
                <Icon icon="line-md:confirm-circle" className="w-6" />
              </button>
            )
          ) : (
            <Icon icon="basil:edit-outline" className="w-6" />
          )}
        </button>
      </div>
      <img src={blueprintInfoImage} />
      <div className="flex flex-col items-center px-[32px] gap-y-3 text-white">
        <div className="flex flex-col w-full gap-y-1 ">
          <p className="text-xs text-[#858584]">Name</p>
          <input
            disabled={!editable}
            className={`border-[0.5px] w-full py-1 px-2 rounded-lg
            ${
              editable
                ? 'bg-[#03070F] border-[#8B8B8B]'
                : 'bg-[#010B10] border-[#191313]'
            }`}
          />
        </div>
        <div className="flex flex-col w-full gap-y-1">
          <p className="text-xs text-[#858584]">Total Supply</p>
          <input
            type="input"
            disabled={!editable}
            className={`border-[0.5px] w-full py-1 px-2 rounded-lg
            ${
              editable
                ? 'bg-[#03070F] border-[#8B8B8B]'
                : 'bg-[#010B10] border-[#191313]'
            }`}
          />
        </div>
        <div className="flex flex-col w-full gap-y-1">
          <div className="flex justify-start gap-2">
            <input
              type="checkbox"
              disabled={!editable}
              checked={uriChecked}
              onChange={handleUriCheckedChange}
              className="!border-0 !bg-[#03070F] py-1 px-2"
            />
            <p className="text-xs text-[#858584]">URI</p>
          </div>
          <div className="flex justify-between">
            <input
              type="input"
              disabled={!editable || !uriChecked}
              className={`border-[0.5px] w-full py-1 px-2 rounded-lg
            ${
              editable && uriChecked
                ? 'bg-[#03070F] border-[#8B8B8B]'
                : 'bg-[#010B10] border-[#191313]'
            }`}
            />
            <button value="Open" />
          </div>
        </div>
        <div className="flex flex-col w-full gap-y-1">
          <div className="flex justify-start gap-2">
            <input
              type="checkbox"
              disabled={!editable}
              checked={mintPriceChecked}
              onChange={handleMintPriceChecked}
              className="!border-0 !bg-[#03070F] py-1 px-2"
            />
            <p className="text-xs text-[#858584]">Mint Price</p>
          </div>
          <div className="flex justify-center">
            <input
              type="input"
              disabled={!editable || !mintPriceChecked}
              className={`border-[0.5px] w-full py-1 px-2 rounded-l-lg
            ${
              editable && mintPriceChecked
                ? 'bg-[#03070F] border-[#8B8B8B]'
                : 'bg-[#010B10] border-[#2e1313]'
            }`}
            />
            <select
              disabled={!editable || !mintPriceChecked}
              className="!bg-[#4A4A4A]/20 rounded-r-lg text-sm"
            >
              <option value="ETH" className="!bg-[#4A4A4A] !text-sm">
                ETH
              </option>
              <option value="USDT" className="!bg-[#4A4A4A] !text-sm">
                USDT
              </option>
              <option value="USDC" className="!bg-[#4A4A4A] !text-sm">
                USDC
              </option>
            </select>
          </div>
        </div>
        <div className="flex flex-col w-full gap-y-1">
          <div className="flex justify-start gap-2">
            <input
              type="checkbox"
              disabled={!editable}
              checked={mintLimitChecked}
              onChange={handleMintLimitChecked}
              className="!border-0 !bg-[#03070F] py-1 px-2"
            />
            <p className="text-xs text-[#858584]">Mint Limit</p>
          </div>
          <input
            type="input"
            disabled={!editable || !mintLimitChecked}
            className={`border-[0.5px] w-full py-1 px-2 rounded-lg
            ${
              editable && mintLimitChecked
                ? 'bg-[#03070F] border-[#8B8B8B]'
                : 'bg-[#010B10] border-[#191313]'
            }`}
          />
        </div>
        <div className="flex justify-between !text-cente w-full gap-10 my-2">
          <button
            disabled={!editable || !buttonEnable}
            className={`flex py-2 px-5 rounded-2xl gap-3 items-center w-full !text-center !justify-center
            ${
              editable && buttonEnable
                ? 'bg-[#353535] text-white'
                : 'bg-[#1F2937] text-[#718096]'
            }`}
          >
            Cancel
          </button>
          <button
            disabled={!editable || !buttonEnable}
            className={`flex py-2 px-5 rounded-2xl gap-3 items-center w-full !text-center !justify-center
            ${
              editable && buttonEnable
                ? 'bg-primary text-white'
                : 'bg-[#1F2937] text-[#718096]'
            }`}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
