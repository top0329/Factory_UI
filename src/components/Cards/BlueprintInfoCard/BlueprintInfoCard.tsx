import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import blueprintInfoImage from "../../../assets/images/blueprint.png";
interface CustomCheckboxProps {
  editable: boolean;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const CheckboxIcon = btoa(
  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="white" d="M20.292 6.708a1 1 0 0 0-1.414-1.414l-10.334 10.333-4.25-4.25a1 1 0 1 0-1.415 1.414l5 5a1 1 0 0 0 1.415 0L20.292 6.708z"/></svg>'
);

function CustomCheckbox({ editable, checked, onChange }: CustomCheckboxProps) {
  return (
    <input
      type="checkbox"
      disabled={editable}
      checked={checked}
      onChange={onChange}
      style={{
        WebkitAppearance: "none",
        MozAppearance: "none",
        appearance: "none",
        border: "1px solid #858584",
        borderRadius: "2px",
        backgroundColor: checked ? "#011018" : "transparent", // Change the background color when checked/unchecked
        backgroundImage: checked
          ? `url('data:image/svg+xml;base64,${CheckboxIcon}')`
          : "",
        backgroundPosition: "center",
        backgroundSize: "98%",
        width: "14px",
        height: "14px",
        cursor: !editable ? "pointer" : "not-allowed", // Change the cursor based on the editable state
      }}
    />
  );
}
export default function BlueprintInfoCard() {
  const [editable, setEditable] = useState(false);
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

  const [fileText, setFileText] = useState("");

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const fileName = event.target.files[0].name;
      setFileText(fileName);
    }
  };

  const handleClick = () => {
    const hiddenFileInput = document.getElementById("hiddenFileInput");
    if (hiddenFileInput instanceof HTMLElement) {
      hiddenFileInput.click();
    }
  };
  const handleFileNameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setFileText(event.target.value); // Update the fileText state with the input value
  };
  return (
    <div className="flex flex-col  w-full rounded-3xl bg-[#011018] border border-[#858584]/30 gap-y-1 pt-[13px] pb-[30px] ">
      <div className="flex justify-between items-center  text-[#AEAEAE] pl-[24px] pr-[12px]">
        <p className="lg:md:sm:text-2xl xs:text-lg truncate">Blueprint Info</p>
        <button onClick={handleEditable} className="my-[4px]">
          {editable ? (
            buttonEnable ? (
              <Icon icon="line-md:confirm-circle-twotone" className="w-6 h-6" />
            ) : (
              <button onClick={handleButtonEnable}>
                <Icon icon="fa6-regular:circle-check" className="w-6 h-6" />
              </button>
            )
          ) : (
            <Icon icon="basil:edit-outline" className="w-6 h-6" />
          )}
        </button>
      </div>
      <img src={blueprintInfoImage} />
      <div className="flex flex-col items-center lg:px-[16px] px-[10px] gap-2 ">
        <div className="flex flex-col w-full gap-y-1 ">
          <p className="text-xs text-[#858584]">Name</p>
          <input
            disabled={!editable || buttonEnable}
            className={`border-[0.5px] w-full h-[28px] py-1 px-2 rounded-lg
            ${
              editable
                ? "bg-[#03070F] border-[#8B8B8B]"
                : "bg-[#010B10] border-[#191313]"
            }`}
          />
        </div>
        <div className="flex flex-col w-full gap-y-1">
          <p className="text-xs text-[#858584]">Total Supply</p>
          <input
            type="input"
            disabled={!editable || buttonEnable}
            className={`border-[0.5px] w-full h-[28px] py-1 px-2 rounded-lg
            ${
              editable
                ? "bg-[#03070F] border-[#8B8B8B]"
                : "bg-[#010B10] border-[#191313]"
            }`}
          />
        </div>
        <div className="flex flex-col w-full gap-y-1">
          <div className="flex justify-start items-center gap-2">
            <CustomCheckbox
              editable={!editable || buttonEnable}
              checked={uriChecked}
              onChange={handleUriCheckedChange}
            />
            <p className="text-xs text-[#858584]">URI</p>
          </div>
          <div className="flex justify-between">
            <input
              type="text"
              value={fileText}
              disabled={!editable || !uriChecked}
              onChange={handleFileNameChange}
              className={`border-[0.5px] w-full h-[28px] py-1 px-2 rounded-l-lg
            ${
              editable && uriChecked
                ? "bg-[#03070F] border-[#8B8B8B]"
                : "bg-[#010B10] border-[#191313]"
            }`}
            />
            <button
              onClick={handleClick}
              disabled={!editable || buttonEnable}
              className="px-[17.5px] flex justify-center items-center !bg-[#4A4A4A]/20 rounded-r-lg"
            >
              <Icon icon="icomoon-free:upload" className="text-[#939393]" />
            </button>
            <input
              id="hiddenFileInput"
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }} // Hide the file input
            />
          </div>
        </div>
        <div className="flex flex-col w-full gap-y-1">
          <div className="flex justify-start items-center gap-2">
            <CustomCheckbox
              editable={!editable || buttonEnable} // Or false, depending on whether you want the checkbox to be editable
              checked={mintPriceChecked}
              onChange={handleMintPriceChecked}
            />
            <p className="text-xs text-[#858584]">Mint Price</p>
          </div>
          <div className="flex justify-center">
            <input
              type="input"
              disabled={!editable || !mintPriceChecked || buttonEnable}
              className={`border-[0.5px] w-full h-[28px] py-1 rounded-l-lg
            ${
              editable && mintPriceChecked
                ? "bg-[#03070F] border-[#8B8B8B]"
                : "bg-[#010B10] border-[#191313]"
            }`}
            />
            <select
              disabled={!editable || !mintPriceChecked || buttonEnable}
              className="!bg-[#4A4A4A]/20 rounded-r-lg text-center text-[11px] w-[50px] "
            >
              <option value="ETH" className="!bg-[#4A4A4A]">
                ETH
              </option>
              <option value="USDT" className="!bg-[#4A4A4A]">
                USDT
              </option>
              <option value="USDC" className="!bg-[#4A4A4A]">
                USDC
              </option>
            </select>
          </div>
        </div>
        <div className="flex flex-col w-full gap-y-1">
          <div className="flex justify-start items-center gap-2">
            <CustomCheckbox
              editable={!editable || buttonEnable} // Or false, depending on whether you want the checkbox to be editable
              checked={mintLimitChecked}
              onChange={handleMintLimitChecked}
            />
            <p className="text-xs text-[#858584]">Mint Limit</p>
          </div>
          <input
            type="input"
            disabled={!editable || !mintLimitChecked || buttonEnable}
            className={`border-[0.5px] w-full h-[28px] py-1 px-2 rounded-lg
            ${
              editable && mintLimitChecked
                ? "bg-[#03070F] border-[#8B8B8B]"
                : "bg-[#010B10] border-[#191313]"
            }`}
          />
        </div>
        <div className="flex justify-between !text-cente w-full gap-4">
          <button
            disabled={!editable || buttonEnable}
            className={`flex rounded-2xl gap-3 items-center w-full h-8 !text-center !justify-center
            ${
              editable && buttonEnable
                ? "bg-[#353535] text-white"
                : "bg-[#1F2937] text-[#718096]"
            }`}
          >
            Cancel
          </button>
          <button
            disabled={!editable || !buttonEnable}
            className={`flex rounded-2xl gap-3 items-center w-full h-8 !text-center !justify-center
            ${
              editable && buttonEnable
                ? "bg-primary text-white"
                : "bg-[#1F2937] text-[#718096]"
            }`}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
