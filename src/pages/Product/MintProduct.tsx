import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAtom } from "jotai";
import copy from "copy-to-clipboard";

import Button from "../../components/Button";
import { ownBlueprintSelectionState } from "../../jotai/atoms";
interface CustomCheckboxProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const CheckboxIcon = btoa(
  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="white" d="M20.292 6.708a1 1 0 0 0-1.414-1.414l-10.334 10.333-4.25-4.25a1 1 0 1 0-1.415 1.414l5 5a1 1 0 0 0 1.415 0L20.292 6.708z"/></svg>'
);

function CustomCheckbox({ checked, onChange }: CustomCheckboxProps) {
  return (
    <input
      type="checkbox"
      disabled={true}
      // checked={checked}
      
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
        cursor: "pointer", // Change the cursor based on the editable state
      }}
    />
  );
}
const MintProductPage = () => {
  const naviage = useNavigate();

  const [selectedOwnBlueprint] = useAtom(ownBlueprintSelectionState);

  const [blueprintMintAmountValue, setBlueprintMintAmountValue] =
    useState<string>("");
  // const [isApproved, setIsApproved] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only integer values
    const newValue = event.target.value;
    // Check if the input value is either empty or an integer
    if (newValue === "" || /^\d+$/.test(newValue)) {
      setBlueprintMintAmountValue(newValue); // Update the state only if it's an empty string or an integer
    }
  };

  // const handleApproveClick = () => {
  //   setIsApproved(true);
  // };

  const handleCopyButtonClicked = () => {
    try {
      setIsCopied(true);
      copy(selectedOwnBlueprint.creator);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.log("failed to copy", err);
    }
  };

  const fillMaxAmount = () => {};
  return (
    <div className="flex justify-center items-center py-10 text-white sm:py-10">
      <div className="relative rounded-3xl bg-[#011018] w-full pb-6 sm:w-[614px] sm:bg-[#011018] border-2 border-[#1f1f1f]">
        <header className="flex justify-start items-center pl-4 py-4 text-xl sm:text-3xl sm:justify-center">
          Approve Blueprint
        </header>
        <img
          className="w-full h-80 sm:h-96 object-cover"
          src={selectedOwnBlueprint.uri}
          alt="blueprint"
        />
        <div className="z-10 absolute top-[268px] bg-gradient-to-t from-[#011018] to-transparent w-full h-28 sm:top-[340px]"></div>
        <div className="flex flex-col gap-4 sm:px-8">
          <h1 className="z-20 font-semibold text-lg mt-[-36px] pl-4 sm:text-xl">
            {selectedOwnBlueprint.name}
          </h1>
          <div className="flex flex-col gap-3 px-8">
            <div className="grid grid-cols-2 gap-3 font-mono">
              <p className="col-span-1 text-light-gray">Blueprint ID</p>
              <p className="col-span-1">{selectedOwnBlueprint.id}</p>
            </div>
            <div className="grid grid-cols-2 items-start gap-2 font-mono sm:flex-row sm:items-center">
              <p className="text-light-gray">Address</p>
              <div className="relative flex justify-start items-center gap-1">
                {selectedOwnBlueprint.address.substring(0, 7)}...
                {selectedOwnBlueprint.address.slice(-5)}
                {/* {selectedOwnBlueprint.creator} */}
                <Icon
                  className="w-6 h-6 cursor-pointer sm:w-4 sm:h-4"
                  icon="solar:copy-outline"
                  onClick={handleCopyButtonClicked}
                />
                {isCopied && (
                  <div
                    className="absolute -bottom-12 right-0 mb-2 px-4 py-2 bg-gray-700 text-white text-xs rounded-lg transition-opacity opacity-100"
                    style={{ transition: "opacity 0.3s" }}
                  >
                    Copied!
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 items-center gap-3 font-mono">
              <p className="col-span-1 text-light-gray">Blueprint Amount</p>
              <div className="flex items-center gap-2">
                <input
                  id="blueprint-mint-amount"
                  name="blueprint-mint-amount"
                  className="inline h-8 rounded-xl border border-light-gray text-white text-lg bg-black py-1.5 px-2 leading-5 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                  onChange={handleInputChange}
                  value={blueprintMintAmountValue}
                />
                <CustomCheckbox checked={true} onChange={fillMaxAmount} />
                {/* <p>Max Amount</p> */}
              </div>
            </div>
            <div className="flex justify-between pl-[45px] pr-[60px] items-center gap-8 pt-10 xs:gap-4 sm:pt-6">
              <Button
                className="flex justify-center !w-[160px] !h-9 rounded-xl"
                text="Cancel"
                variant="secondary"
                onClick={() => naviage("/blueprint")}
              />
              {/* {selectedOwnBlueprint.mintPriceUnit === 0 ? ( */}
                <Button
                  className="flex justify-center truncate !w-[175px] h-9 rounded-xl"
                  text="Approve Blueprint"
                  variant="primary"
                />
              {/* ) : (
                <React.Fragment>
                  {isApproved ? (
                    <Button
                      className="truncate !px-3 h-9 "
                      text="Approve Blueprint"
                      variant="primary"
                    />
                  ) : (
                    <Button
                      className="truncate !px-8 h-9"
                      text="Approve"
                      variant="primary"
                      onClick={handleApproveClick}
                    />
                  )}
                </React.Fragment>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MintProductPage;
