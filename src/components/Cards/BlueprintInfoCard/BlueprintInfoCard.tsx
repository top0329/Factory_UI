import { FC, useEffect, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useAtom } from 'jotai';

import { createBlueprintAtom } from '../../../jotai/atoms';
import { CreateBlueprint } from '../../../types';
import BlueprintDefaultImage from '../../../assets/images/blueprint.png';

interface CustomCheckboxProps {
  editable: boolean;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface Props {
  isRecreate?: boolean;
  onClick?: () => void;
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
        WebkitAppearance: 'none',
        MozAppearance: 'none',
        appearance: 'none',
        border: '1px solid #858584',
        borderRadius: '2px',
        backgroundColor: checked ? '#011018' : 'transparent', // Change the background color when checked/unchecked
        backgroundImage: checked
          ? `url('data:image/svg+xml;base64,${CheckboxIcon}')`
          : '',
        backgroundPosition: 'center',
        backgroundSize: '98%',
        width: '14px',
        height: '14px',
        cursor: !editable ? 'pointer' : 'not-allowed', // Change the cursor based on the editable state
      }}
    />
  );
}

const BlueprintInfoCard: FC<Props> = ({ isRecreate, onClick }) => {
  const [createInfo, setCreateInfo] =
    useAtom<CreateBlueprint>(createBlueprintAtom);
  const [editable, setEditable] = useState(false);
  const [uriChecked, setUriChecked] = useState(false);
  const [mintPriceChecked, setMintPriceChecked] = useState(false);
  const [mintLimitChecked, setMintLimitChecked] = useState(false);
  const [buttonEnable, setButtonEnable] = useState(false);
  const [fileText, setFileText] = useState('');
  const [isIPFSSelected, setIsIPFSSelected] = useState(false);

  const [name, setName] = useState('');
  const [totalSupply, setTotalSupply] = useState<number | ''>('');
  const [mintPrice, setMintPrice] = useState<number | ''>('');
  const [mintPriceLimit, setMintPriceLimit] = useState<number | ''>('');
  const [imageSrc, setImageSrc] = useState<string>(
    createInfo.uri.substring(21)
  );

  useEffect(() => {
    if (isRecreate) setIsIPFSSelected(true);
    setName(createInfo.name);
    setTotalSupply(createInfo.totalSupply);
    setImageSrc(
      createInfo.uri.substring(21) ===
        'bafkreiac47exop4qnvi47azogyp2xrb45dlyqgsijpnsvkvizkh4rm3uvi'
        ? ''
        : createInfo.uri.substring(21)
    );
    setMintPrice(createInfo.mintPrice);
    setMintPriceLimit(createInfo.mintLimit);
  }, [
    createInfo.mintLimit,
    createInfo.mintPrice,
    createInfo.name,
    createInfo.totalSupply,
    createInfo.uri,
    isRecreate,
  ]);

  const handleRadioClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.id; // Use currentTarget when dealing with mouse events
    if (value === 'default-radio-1') {
      setFileText(''); // For "Files" radio button
    } else if (value === 'default-radio-2') {
      setFileText(''); // For "IPFS" radio button
      setImageSrc(
        createInfo.uri.substring(21) ===
          'bafkreiac47exop4qnvi47azogyp2xrb45dlyqgsijpnsvkvizkh4rm3uvi'
          ? ''
          : createInfo.uri.substring(21)
      );
    }
    setIsIPFSSelected(value === 'default-radio-2');
  };

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

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const fileName = event.target.files[0].name;
      setFileText(fileName);
      setImageSrc(createInfo.uri.substring(21));
    }
  };

  const handleFileNameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setFileText(event.target.value); // Update the fileText state with the input value
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
        setFileText('');
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInputClick = () => {
    const fileInputElement = document.getElementById('hiddenFileInput');
    if (fileInputElement) {
      fileInputElement.click();
    }
  };

  return (
    <div className="flex flex-col  w-full rounded-3xl bg-[#011018] border border-[#858584]/30 gap-y-1 pb-[30px] ">
      <div className="flex justify-between items-center py-3 text-[#AEAEAE] pl-[24px] pr-[12px]">
        <p className="lg:md:sm:text-2xl xs:text-lg truncate">Blueprint Info</p>
        <button
          onClick={editable ? handleButtonEnable : handleEditable}
          className="my-[4px]"
        >
          {editable ? (
            buttonEnable ? (
              <Icon icon="line-md:confirm-circle-twotone" className="w-6 h-6" />
            ) : (
              <Icon icon="fa6-regular:circle-check" className="w-5 h-5" />
            )
          ) : (
            <Icon icon="basil:edit-outline" className="w-6 h-6" />
          )}
        </button>
      </div>
      <div className="flex flex-col gap-0 justify-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
          id="hiddenFileInput"
        />
        {/* {imageSrc && ( */}
        <img
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src =
              BlueprintDefaultImage;
          }}
          className="aspect-auto object-cover"
          src={isIPFSSelected ? `https://ipfs.io/ipfs/${imageSrc}` : fileText}
          style={{ maxWidth: '100%', height: '140px' }}
        />
        {/* )} */}
      </div>
      <form>
        <div className="flex flex-col items-center lg:px-[16px] px-[10px] gap-2 ">
          <div className="flex flex-col w-full gap-y-1 ">
            <p className="text-xs text-[#858584]">Name</p>
            <input
              disabled={!editable}
              value={name}
              className={`border-[0.5px] w-full h-[28px] py-1 px-2 rounded-lg
            ${
              editable
                ? 'bg-[#03070F] border-[#8B8B8B]'
                : 'bg-[#010B10] border-[#191313]'
            }`}
              onChange={(event) => {
                const newName = event.target.value;
                setCreateInfo((prevCreateInfo) => ({
                  ...prevCreateInfo,
                  name: newName,
                }));
                setName(newName);
              }}
              required
            />
          </div>
          <div className="flex flex-col w-full gap-y-1">
            <p className="text-xs text-[#858584]">Total Supply</p>
            <input
              type="number"
              min="1"
              disabled={!editable}
              value={totalSupply === 0 ? '' : totalSupply}
              onChange={(event) => {
                const newSupplyNumber = Number(event.target.value);
                setCreateInfo((prevCreateInfo) => ({
                  ...prevCreateInfo,
                  totalSupply: newSupplyNumber,
                }));
                setTotalSupply(newSupplyNumber);
                if (newSupplyNumber == 0) setTotalSupply('');
              }}
              className={`border-[0.5px] w-full h-[28px] py-1 px-2 rounded-lg
            ${
              editable
                ? 'bg-[#03070F] border-[#8B8B8B]'
                : 'bg-[#010B10] border-[#191313]'
            }`}
              required
            />
          </div>
          <div className="flex flex-col w-full gap-y-1">
            <div className="flex justify-between items-center gap-2">
              <div className="flex items-center gap-2">
                <CustomCheckbox
                  editable={!editable}
                  checked={uriChecked}
                  onChange={handleUriCheckedChange}
                />
                <p className="text-xs text-[#858584]">URI</p>
              </div>
              {uriChecked && (
                <div className="flex gap-2">
                  <div className="flex items-center">
                    <input
                      id="default-radio-1"
                      // checked={true}
                      // defaultChecked={true}
                      checked={!isIPFSSelected}
                      type="radio"
                      name="default-radio"
                      onChange={handleRadioClick}
                      className="w-4 h-4 !text-black !bg-gray-100 !border-gray-300 !focus:ring-black"
                    />
                    <label className="ms-1 text-xs font-medium text-[#858584]">
                      Files
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="default-radio-2"
                      checked={isIPFSSelected}
                      type="radio"
                      onChange={handleRadioClick}
                      className="w-4 h-4 "
                    />
                    <label className="ms-1 text-xs font-medium text-[#858584]">
                      IPFS
                    </label>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-between gap-[1px]">
              <div className={`${isIPFSSelected ? 'w-full' : ''}`}>
                <input
                  type="text"
                  value={isIPFSSelected ? imageSrc.substring(21) : fileText}
                  disabled={
                    !editable || !uriChecked || buttonEnable || !isIPFSSelected
                  }
                  onChange={(event) => {
                    handleFileNameChange;
                    const newUri = event.target.value;
                    setCreateInfo((prevCreateInfo) => ({
                      ...prevCreateInfo,
                      uri: `https://ipfs.io/ipfs/${newUri}`,
                    }));
                    setFileText(newUri);
                    setImageSrc(event.target.value);
                  }}
                  className={`border-[0.5px] w-full h-[28px] py-1 pl-[44px] ${
                    isIPFSSelected ? 'rounded' : 'rounded-l-lg'
                  }
                ${
                  editable && uriChecked && isIPFSSelected
                    ? 'bg-[#03070F] border-[#8B8B8B] mr-0.5'
                    : 'bg-[#010B10] border-[#191313] '
                }`}
                />
                {isIPFSSelected && <p className="ml-2 mt-[-25px]">IPFS:</p>}
              </div>
              {!isIPFSSelected && (
                <button
                  onClick={triggerFileInputClick}
                  disabled={
                    !editable || !uriChecked || buttonEnable || isIPFSSelected
                  }
                  className={`px-[17.5px] flex justify-center items-center !bg-[#4A4A4A]/20 rounded-r-lg border-[0.5px]       ${
                    editable && uriChecked && !isIPFSSelected
                      ? 'bg-[#03070F] border-[#8B8B8B] '
                      : 'bg-[#010B10] border-[#191313]'
                  }`}
                >
                  <Icon icon="icomoon-free:upload" className="text-[#939393]" />
                </button>
              )}
              <input
                id="fimeName"
                type="file"
                // disabled={!editable || !mintPriceChecked || buttonEnable}
                onChange={handleFileChange}
                style={{ display: 'none' }} // Hide the file input
              />
            </div>
          </div>
          <div className="flex flex-col w-full gap-y-1">
            <div className="flex justify-start items-center gap-2">
              <CustomCheckbox
                editable={!editable} // Or false, depending on whether you want the checkbox to be editable
                checked={mintPriceChecked}
                onChange={handleMintPriceChecked}
              />
              <p className="text-xs text-[#858584]">Mint Price</p>
            </div>
            <div className="flex justify-center">
              <input
                type="number"
                disabled={!editable || !mintPriceChecked}
                value={mintPrice === 0 ? '' : mintPrice}
                onChange={(event) => {
                  const newMintPrice = Number(event.target.value);
                  setCreateInfo((prevCreateInfo) => ({
                    ...prevCreateInfo,
                    mintPrice: newMintPrice,
                  }));
                  setMintPrice(newMintPrice);
                  if (newMintPrice == 0) setMintPrice('');
                }}
                className={`border-[0.5px] w-full h-[28px] py-1 rounded-l-lg px-2 border-r-0
            ${
              editable && mintPriceChecked
                ? 'bg-[#03070F] border-[#8B8B8B]'
                : 'bg-[#010B10] border-[#191313]'
            }`}
                required
              />
              <select
                disabled={!editable || !mintPriceChecked}
                onChange={(event) => {
                  const newMintPriceUnit = Number(event.target.value);
                  setCreateInfo((prevCreateInfo) => ({
                    ...prevCreateInfo,
                    mintPriceUnit: newMintPriceUnit,
                  }));
                }}
                className={`!bg-[#4A4A4A]/20 rounded-r-lg text-center text-[11px] w-[50px] border-[0.5px] border-l-0 ${
                  editable && mintPriceChecked
                    ? 'bg-[#03070F] border-[#8B8B8B]'
                    : 'bg-[#010B10] border-[#191313]'
                }`}
                defaultValue={createInfo.mintPriceUnit}
              >
                <option value={0} className="!bg-[#4A4A4A]">
                  ETH
                </option>
                <option value={1} className="!bg-[#4A4A4A]">
                  USDT
                </option>
                <option value={2} className="!bg-[#4A4A4A]">
                  USDC
                </option>
              </select>
            </div>
          </div>
          <div className="flex flex-col w-full gap-y-1">
            <div className="flex justify-start items-center gap-2">
              <CustomCheckbox
                editable={!editable} // Or false, depending on whether you want the checkbox to be editable
                checked={mintLimitChecked}
                onChange={handleMintLimitChecked}
              />
              <p className="text-xs text-[#858584]">Mint Limit</p>
            </div>
            <input
              type="number"
              disabled={!editable || !mintLimitChecked}
              value={mintPriceLimit === 0 ? '' : mintPriceLimit}
              onChange={(event) => {
                const newMintPriceLimit = Number(event.target.value);
                setCreateInfo((prevCreateInfo) => ({
                  ...prevCreateInfo,
                  mintLimit: newMintPriceLimit,
                }));
                setMintPriceLimit(newMintPriceLimit);
                if (newMintPriceLimit == 0) setMintPriceLimit('');
              }}
              className={`border-[0.5px] w-full h-[28px] py-1 px-2 rounded-lg
            ${
              editable && mintLimitChecked
                ? 'bg-[#03070F] border-[#8B8B8B]'
                : 'bg-[#010B10] border-[#191313]'
            }`}
              required
            />
          </div>
          <div className="flex justify-between mt-2 !text-cente w-full gap-4">
            <button
              id="cancelButton"
              disabled={!editable || !buttonEnable}
              onClick={() => {
                setEditable(false);
                setButtonEnable(false);
                setName('');
                setTotalSupply('');
                setMintPrice('');
                setMintPriceLimit('');
                setFileText('');
                setUriChecked(false);
                setMintPriceChecked(false);
                setMintLimitChecked(false);
                setImageSrc(createInfo.uri.substring(21));

                setCreateInfo((prevCreateInfo) => ({
                  ...prevCreateInfo,
                  totalSupply: 0,
                }));
              }}
              className={`flex rounded-2xl gap-3 items-center w-full h-8 !text-center !justify-center
            ${
              editable && buttonEnable
                ? 'bg-[#353535] text-white'
                : 'bg-[#1F2937] text-[#718096]'
            }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={onClick}
              disabled={!editable || !buttonEnable}
              className={`flex rounded-2xl gap-3 items-center w-full h-8 !text-center !justify-center
            ${
              editable && buttonEnable
                ? 'bg-primary text-white'
                : 'bg-[#1F2937] text-[#718096]'
            }`}
            >
              {isRecreate ? 'Recreate' : 'Create'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BlueprintInfoCard;
