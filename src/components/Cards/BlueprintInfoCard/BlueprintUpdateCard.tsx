import { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
// import pickAxe from '../../../assets/images/pickaxe_iron_wood_ERC1155.webp';
import blueprintInfoImage from '../../../assets/images/blueprint.png';



export default function BlueprintUpdateCard() {
  const [editable, setEditable] = useState(false);
  const [buttonEnable, setButtonEnable] = useState(false);

  const handleEditable = () => {
    setEditable(true);
  };

  const handleButtonEnable = () => {
    setButtonEnable(true);
  };

  return (
    <div className="flex flex-col  w-[342px] rounded-3xl bg-[#011018] broder border-[#313131] gap-y-3 pt-[13px] pb-[3 0px] ">
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
      <img
        src={blueprintInfoImage}
        className="w-full h-[202px] overflow-hidden	"
      />
      <div className="flex flex-col items-center px-[32px] gap-y-2 text-white">
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
          <p className="text-xs text-[#858584]">URI</p>
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
            <p className="text-xs text-[#858584]">Mint Price</p>
          </div>
          <div className="flex justify-center">
            <input
              type="input"
              disabled={!editable}
              className={`border-[0.5px] w-full py-1 px-2 rounded-l-lg border-r-0
            ${
              editable
                ? 'bg-[#03070F] border-[#8B8B8B]'
                : 'bg-[#010B10] border-[#191313]'
            }`}
            />
            <select
              disabled={!editable}
              className={`!bg-[#4A4A4A]/20 rounded-r-lg text-sm ${
                editable
                  ? '!bg-[#4A4A4A]/20 border-[0.5px] border-l-0 border-[#8B8B8B]'
                  : 'bg-[#010B10] border-0'
              }`}
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
          <p className="text-xs text-[#858584]">Mint Limit</p>
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
          <p className="text-xs text-[#858584]">Creator</p>
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
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
