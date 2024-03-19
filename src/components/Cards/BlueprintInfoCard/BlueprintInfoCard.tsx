import { FC, useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useAtom } from 'jotai';

import { createBlueprintAtom } from '../../../jotai/atoms';
import { CreateBlueprint } from '../../../types';
import DefaultBlueprintImage from '../../../assets/images/default-blueprint.png';
import useWeb3 from '../../../hooks/useWeb3';
import { invalidChars } from '../../../constants';
// import { uploadFileToIPFS, uploadJSONToIPFS } from '../../../utils/uploadIPFS';

interface CustomCheckboxProps {
  editable: boolean;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface Props {
  isRecreate?: boolean;
  isUpdate?: boolean;
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

const BlueprintInfoCard: FC<Props> = ({ isRecreate, isUpdate }) => {
  const { isConnected, library, account, factoryContract, factoryWeb3 } =
    useWeb3();

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
  const [creator, setCreator] = useState<string | ''>();
  const [imageSrc, setImageSrc] = useState<string>(
    createInfo.uri.substring(21)
  );
  const [uploadedImageSrc, setUploadedImageSrc] = useState<string>(
    DefaultBlueprintImage
  );
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsIPFSSelected(isIPFSSelected);
    setName(createInfo.name);
    setTotalSupply(createInfo.totalSupply);
    setImageSrc(createInfo.uri);
    setMintPrice(createInfo.mintPrice);
    setMintPriceLimit(createInfo.mintLimit);
    setImageSrc(createInfo.uri);
    setCreator(account);
  }, [
    createInfo.creator,
    createInfo.mintLimit,
    createInfo.mintPrice,
    createInfo.name,
    createInfo.totalSupply,
    createInfo.uri,
    isIPFSSelected,
    account,
  ]);

  useEffect(() => {
    if (isRecreate || isUpdate) setIsIPFSSelected(true);
  }, [isRecreate, isUpdate]);

  const handleRadioClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.id; // Use currentTarget when dealing with mouse events
    if (value === 'files-radio') {
      if (selectedFile) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedFile(selectedFile);
          setFileText(selectedFile.name);
          console.log(selectedFile, imageSrc);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setUploadedImageSrc(DefaultBlueprintImage);
      }
    } else if (value === 'ipfs-radio') {
      setImageSrc(createInfo.uri.substring(21));
    }
    setIsIPFSSelected(value === 'ipfs-radio');
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

  const handleFileNameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setFileText(event.target.value); // Update the fileText state with the input value
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      console.log(file);
      // Create a URL for the uploaded file
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(file);
        setUploadedImageSrc(reader.result as string);
        setFileText(file.name);
        console.log(file, imageSrc);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (invalidChars.test(value)) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
      return;
    } else {
      setCreateInfo((prevCreateInfo) => ({
        ...prevCreateInfo,
        name: value,
      }));
      setName(value);
    }
  };

  const handleKeyDownForMintPrice = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      !(
        (event.key >= '0' && event.key <= '9') ||
        event.key === 'Backspace' ||
        event.key === 'Delete' ||
        event.key === 'Tab' ||
        event.key === 'ArrowLeft' ||
        event.key === 'ArrowRight' ||
        event.key === '.' ||
        (event.key >= '0' &&
          event.key <= '9' &&
          event.getModifierState('NumLock'))
      )
    ) {
      event.preventDefault();
    }
  };

  const handleKeyDownForTotalSupplyAndMintLimit = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      !(
        (event.key >= '0' && event.key <= '9') ||
        event.key === 'Backspace' ||
        event.key === 'Delete' ||
        event.key === 'Tab' ||
        event.key === 'ArrowLeft' ||
        event.key === 'ArrowRight' ||
        (event.key >= '0' &&
          event.key <= '9' &&
          event.getModifierState('NumLock'))
      )
    ) {
      event.preventDefault();
    }
  };

  const triggerFileInputClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault(); // Prevent the default form submission behavior

    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // const uploadToIPFS = async () => {
  //   if (!selectedFile) return;

  //   try {
  //     // Upload the image to IPFS
  //     const imageHashURI: string = await uploadFileToIPFS(
  //       selectedFile,
  //       fileText
  //     );
  //     console.log(
  //       'Image uploaded to IPFS with hash ====================> ',
  //       imageHashURI
  //     );

  //     // Upload the JSON file to IPFS
  //     const json = {
  //       name: fileText,
  //       description: 'The ERC1155 token for Factory Project',
  //       image: `https://ipfs.io/ipfs/${imageHashURI}`,
  //       attributes: [],
  //       compiler: 'Factory',
  //     };
  //     const jsonHash = await uploadJSONToIPFS(fileText, json);
  //     console.log(
  //       'JSON uploaded to IPFS with hash ====================> ',
  //       jsonHash
  //     );
  //   } catch (error) {
  //     console.log('Error uploading file:', error);
  //   }
  // };

  const handleSubmit = async () => {
    try {
      if (isConnected && library) {
        if (isIPFSSelected) {
          setCreateInfo((prevCreateInfo) => ({
            ...prevCreateInfo,
            creator: account,
          }));
          console.log(createInfo);
          console.log(account);

          if (
            createInfo.data.erc20Data.length +
              createInfo.data.erc721Data.length +
              createInfo.data.erc1155Data.length >
            0
          ) {
            console.log(
              createInfo.name,
              createInfo.uri,
              createInfo.totalSupply,
              createInfo.mintPrice,
              createInfo.mintPriceUnit,
              createInfo.mintLimit,
              createInfo.data
            );
            console.log(creator);

            // ethers - for read functions of smart contract
            const result = await factoryContract.componentTokenLimit();
            console.log('Available component token limit: ', result);

            // web3 - for write functions of smart contract
            const transaction = await factoryWeb3.methods
              .createBlueprint(
                createInfo.name,
                createInfo.uri,
                createInfo.totalSupply,
                createInfo.mintPrice,
                createInfo.mintPriceUnit,
                createInfo.mintLimit,
                {
                  erc20Data: [
                    {
                      tokenAddress:
                        '0xa9819b08c329395FEC4edA9FA32205846b6E3230',
                      amount: 10,
                    },
                  ],
                  erc721Data: [
                    {
                      tokenAddress:
                        '0xcD988300109D73fa30Af755415BC56eF3b802F81',
                      tokenId: 1,
                    },
                  ],
                  erc1155Data: [
                    {
                      tokenAddress:
                        '0xa75551c79E8F90f921D9959fA169f35DA98efD1a',
                      tokenId: 3,
                      amount: 10,
                    },
                  ],
                }
              )
              .send({ from: account });

            // const transaction = await factoryWeb3.methods.createBlueprint(
            //   'ERC', // Name
            //   'ipfs://VmWQ4Wps4evKn4Aw9P3yUmj6ewqL7C9iCByC1bdbXiquCW', // URI
            //   1000000, // TotalSupply
            //   10000, // Mint Price
            //   1, // Unit
            //   100, // Mint Limit
            //   {
            //     erc20Data: [
            //       {
            //         tokenAddress: '0xa9819b08c329395FEC4edA9FA32205846b6E3230',
            //         amount: 10,
            //       },
            //     ],
            //     erc721Data: [
            //       {
            //         tokenAddress: '0xcD988300109D73fa30Af755415BC56eF3b802F81',
            //         tokenId: 1,
            //       },
            //     ],
            //     erc1155Data: [
            //       {
            //         tokenAddress: '0xa75551c79E8F90f921D9959fA169f35DA98efD1a',
            //         tokenId: 3,
            //         amount: 10,
            //       },
            //     ],
            //   }
            // ).send({from: account});

            console.log('Blueprint created successfully', transaction);
          }
        } else {
          console.log(selectedFile);
        }
      }
    } catch (err) {
      console.log(err);
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
          id="hiddenFileInput"
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
        <img
          className="aspect-auto object-cover h-[250px] xs:h-[180px] sm:h-[200px] md:h-[140px]"
          src={isIPFSSelected ? imageSrc : uploadedImageSrc}
          style={{ maxWidth: '100%' }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = DefaultBlueprintImage;
          }}
        />
      </div>
      <div className="flex flex-col items-center lg:px-[16px] px-[10px] gap-2">
        <div className="relative flex flex-col w-full gap-y-1">
          <p className="text-xs text-[#858584]">Name</p>
          <input
            className={`border-[0.5px] w-full h-[28px] py-1 px-2 rounded-lg
            ${
              !editable
                ? 'bg-[#010B10] border-[#191313]'
                : 'bg-[#03070F] border-[#8B8B8B]'
            }`}
            maxLength={20}
            onChange={handleNameChange}
            value={name}
            disabled={isUpdate ? true : !editable}
            required
          />
          {showTooltip && (
            <div
              className="absolute -bottom-12 left-2 mb-2 px-4 py-2 bg-gray-700 text-white text-xs rounded-lg transition-opacity opacity-100"
              style={{ transition: 'opacity 0.3s' }}
            >
              Special characters are not allowed!
            </div>
          )}
        </div>
        <div className="flex flex-col w-full gap-y-1">
          <p className="text-xs text-[#858584]">Total Supply</p>
          <input
            className={`border-[0.5px] w-full h-[28px] py-1 px-2 rounded-lg hide-arrows
                ${
                  !editable
                    ? ' bg-[#010B10] border-[#191313]'
                    : ' bg-[#03070F] border-[#8B8B8B]'
                }`}
            type="number"
            min={1}
            onChange={(event) => {
              const newSupplyNumber = event.target.value;
              setCreateInfo((prevCreateInfo) => ({
                ...prevCreateInfo,
                totalSupply:
                  newSupplyNumber.trim() === '' ? '' : Number(newSupplyNumber),
              }));
              setTotalSupply(
                newSupplyNumber.trim() === '' ? '' : Number(newSupplyNumber)
              );
            }}
            onKeyDown={handleKeyDownForTotalSupplyAndMintLimit}
            value={totalSupply === 0 ? '' : totalSupply}
            disabled={isUpdate ? true : !editable}
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
                    id="files-radio"
                    name="files-radio"
                    className="w-4 h-4 !text-black !bg-gray-100 !border-gray-300 !focus:ring-black"
                    type="radio"
                    onChange={handleRadioClick}
                    checked={!isIPFSSelected}
                  />
                  <label className="ms-1 text-xs font-medium text-[#858584]">
                    Files
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="ipfs-radio"
                    name="ipfs-radio"
                    className="w-4 h-4 "
                    type="radio"
                    onChange={handleRadioClick}
                    checked={isIPFSSelected}
                  />
                  <label className="ms-1 text-xs font-medium text-[#858584]">
                    IPFS
                  </label>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-between">
            <div className="w-full">
              <input
                className={`border-[0.5px] w-full h-[28px] py-1 ${
                  isIPFSSelected ? 'rounded pl-[44px]' : 'rounded-l-lg pl-2'
                } ${
                  editable && uriChecked && isIPFSSelected
                    ? 'bg-[#03070F] border-[#8B8B8B] mr-0.5'
                    : 'bg-[#010B10] border-[#191313] '
                }`}
                type="text"
                value={
                  isIPFSSelected
                    ? imageSrc.substring(21) ===
                      'bafkreiac47exop4qnvi47azogyp2xrb45dlyqgsijpnsvkvizkh4rm3uvi'
                      ? ''
                      : imageSrc.substring(21)
                    : fileText
                }
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
                  setImageSrc(`https://ipfs.io/ipfs/${event.target.value}`);
                }}
              />
              {isIPFSSelected && <p className="ml-2 mt-[-25px]">IPFS:</p>}
            </div>
            {!isIPFSSelected && (
              <button
                className={`px-[17.5px] flex justify-center items-center !bg-[#4A4A4A]/20 rounded-r-lg border-[0.5px] ${
                  editable && uriChecked && !isIPFSSelected
                    ? 'bg-[#03070F] border-[#8B8B8B] '
                    : 'bg-[#010B10] border-[#191313]'
                }`}
                onClick={triggerFileInputClick}
                disabled={
                  !editable || !uriChecked || buttonEnable || isIPFSSelected
                }
              >
                <Icon icon="icomoon-free:upload" className="text-[#939393]" />
              </button>
            )}
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
              className={`border-[0.5px] w-full h-[28px] py-1 rounded-l-lg px-2 border-r-0 hide-arrows
                ${
                  editable && mintPriceChecked
                    ? ' bg-[#03070F] border-[#8B8B8B]'
                    : ' bg-[#010B10] border-[#191313]'
                }`}
              type="number"
              min={0}
              onChange={(event) => {
                const newMintPrice = event.target.value;
                setCreateInfo((prevCreateInfo) => ({
                  ...prevCreateInfo,
                  mintPrice:
                    newMintPrice.trim() === '' ? '' : Number(newMintPrice),
                }));
                setMintPrice(
                  newMintPrice.trim() === '' ? '' : Number(newMintPrice)
                );
              }}
              onKeyDown={handleKeyDownForMintPrice}
              value={mintPriceChecked ? mintPrice : ''}
              disabled={!editable || !mintPriceChecked}
              required
            />
            <select
              className={`!bg-[#4A4A4A]/20 rounded-r-lg text-center text-[11px] w-[50px] border-[0.5px] border-l-0 ${
                editable && mintPriceChecked
                  ? 'bg-[#03070F] border-[#8B8B8B]'
                  : 'bg-[#010B10] border-[#191313]'
              }`}
              onChange={(event) => {
                const newMintPriceUnit = Number(event.target.value);
                setCreateInfo((prevCreateInfo) => ({
                  ...prevCreateInfo,
                  mintPriceUnit: newMintPriceUnit,
                }));
              }}
              defaultValue={createInfo.mintPriceUnit}
              disabled={!editable || !mintPriceChecked}
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
              editable={!editable}
              checked={mintLimitChecked}
              onChange={handleMintLimitChecked}
            />
            <p className="text-xs text-[#858584]">Mint Limit</p>
          </div>
          <input
            className={`border-[0.5px] w-full h-[28px] py-1 px-2 rounded-lg hide-arrows
            ${
              editable && mintLimitChecked
                ? ' bg-[#03070F] border-[#8B8B8B]'
                : ' bg-[#010B10] border-[#191313]'
            }`}
            type="number"
            min={0}
            onChange={(event) => {
              const newMintPriceLimit = event.target.value;
              setCreateInfo((prevCreateInfo) => ({
                ...prevCreateInfo,
                mintLimit:
                  newMintPriceLimit.trim() === ''
                    ? ''
                    : Number(newMintPriceLimit),
              }));
              setMintPriceLimit(
                newMintPriceLimit.trim() === '' ? '' : Number(newMintPriceLimit)
              );
            }}
            onKeyDown={handleKeyDownForTotalSupplyAndMintLimit}
            value={mintLimitChecked ? mintPriceLimit : ''}
            disabled={!editable || !mintLimitChecked}
            required
          />
        </div>
        <div className="flex justify-between mt-2 !text-cente w-full gap-4">
          <button
            id="cancelButton"
            className={`flex rounded-2xl gap-3 items-center w-full h-8 !text-center !justify-center
            ${
              editable && buttonEnable
                ? 'bg-[#353535] text-white'
                : 'bg-[#1F2937] text-[#718096]'
            }`}
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
              setUploadedImageSrc('');

              setCreateInfo((prevCreateInfo) => ({
                ...prevCreateInfo,
                totalSupply: 0,
              }));
            }}
            disabled={!editable || !buttonEnable}
          >
            Cancel
          </button>
          <button
            className={`flex rounded-2xl gap-3 items-center w-full h-8 !text-center !justify-center
            ${
              editable && buttonEnable
                ? 'bg-primary text-white'
                : 'bg-[#1F2937] text-[#718096]'
            }`}
            onClick={handleSubmit}
            disabled={!editable || !buttonEnable}
          >
            {isRecreate ? 'Recreate' : isUpdate ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlueprintInfoCard;
