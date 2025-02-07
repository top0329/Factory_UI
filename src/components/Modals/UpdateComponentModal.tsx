import { useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { Address } from 'viem';

import Button from '../Button';
import useWeb3 from '../../hooks/useWeb3';
import getERC721Data from '../../utils/getERC721Data';
import getERC1155Data from '../../utils/getERC1155Data';
import getTokenData from '../../utils/getTokenData';
import {
  activeAddComponentTokenAtom,
  createBlueprintAtom,
  isEditComponentModalAtom,
} from '../../jotai/atoms';
import { getTokenDetailsByAddress } from '../../utils/checkContractType';
import {
  CreateBlueprint,
  ERC1155ComponentData,
  ERC1155Data,
  ERC20ComponentData,
  ERC20Data,
  ERC721ComponentData,
  ERC721Data,
  SelectedComponentData,
} from '../../types';
import {
  DefaultErc1155ImageUri,
  DefaultErc20ImageUri,
  DefaultErc721ImageUri,
  TOKEN_DETAIL_DATA_URL,
} from '../../constants';

const UpdateComponentModal = ({
  selectedComponentData,
}: {
  selectedComponentData: SelectedComponentData;
}) => {
  const { library, chainId } = useWeb3();

  const [isUpdateComponentModalOpen, setIsUpdateComponentModalOpen] =
    useAtom<boolean>(isEditComponentModalAtom);
  const [activeItem, setActiveItem] = useAtom<number>(
    activeAddComponentTokenAtom
  );
  const [createBlueprint, setCreateBlueprint] =
    useAtom<CreateBlueprint>(createBlueprintAtom);

  const [isUpdateButtonDisabled, setIsUpdateButtonDisabled] =
    useState<boolean>(true);
  const [erc20Data, setErc20Data] = useState<ERC20ComponentData>({
    name: '',
    address: '',
    amount: '',
    decimal: 0,
  });
  const [erc721Data, setErc721Data] = useState<ERC721ComponentData>({
    name: '',
    address: '',
    id: '',
  });
  const [erc1155Data, setErc1155Data] = useState<ERC1155ComponentData>({
    name: '',
    address: '',
    id: '',
    amount: '',
  });
  const [imageUri, setImageUri] = useState<string>('');

  const modal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function init() {
      if (selectedComponentData.tokenAddress) {
        if (activeItem === 0) {
          let tokenDataUrl: string = '';
          if (chainId === 1) {
            tokenDataUrl = TOKEN_DETAIL_DATA_URL.main;
          } else if (chainId === 137) {
            tokenDataUrl = TOKEN_DETAIL_DATA_URL.polygon;
          }
          const tokenDetails = await getTokenData(
            selectedComponentData.tokenAddress as Address,
            library
          );
          const details = await getTokenDetailsByAddress(
            selectedComponentData.tokenAddress as Address,
            tokenDataUrl
          );
          if (details) {
            setImageUri(details?.logo as string);
          } else {
            setImageUri(DefaultErc20ImageUri);
          }
          setErc20Data({
            name: tokenDetails?.tokenName,
            address: selectedComponentData.tokenAddress,
            amount: selectedComponentData.erc20Amount
              ? selectedComponentData.erc20Amount.toString()
              : '',
            decimal: tokenDetails?.decimal,
          });
        }
        if (activeItem === 1) {
          const erc721Data = await getERC721Data(
            selectedComponentData.tokenAddress as Address,
            selectedComponentData.tokenId as number,
            library
          );
          if (erc721Data) {
            const { name, uri } = erc721Data;
            setErc721Data({
              name,
              address: selectedComponentData.tokenAddress,
              id: selectedComponentData.tokenId
                ? selectedComponentData.tokenId.toString()
                : '',
            });
            setImageUri(`https://ipfs.io/${uri}`);
          }
        }
        if (activeItem === 2) {
          const erc1155Data = await getERC1155Data(
            selectedComponentData.tokenAddress as Address,
            selectedComponentData.tokenId as number,
            library
          );
          if (erc1155Data) {
            const { name, uri } = erc1155Data;
            setErc1155Data({
              name,
              address: selectedComponentData.tokenAddress,
              id: selectedComponentData.tokenId
                ? selectedComponentData.tokenId.toString()
                : '',
              amount: selectedComponentData.erc1155Amount
                ? selectedComponentData.erc1155Amount.toString()
                : '',
            });
            setImageUri(uri);
          }
        }
      }
    }
    init();
  }, [
    activeItem,
    isUpdateComponentModalOpen,
    selectedComponentData.tokenAddress,
    selectedComponentData.erc20Amount,
    selectedComponentData.tokenId,
    selectedComponentData.erc1155Amount,
    library,
    chainId,
  ]);

  useEffect(() => {
    if (activeItem === 0) {
      if (
        erc20Data.amount &&
        Number(erc20Data.amount) !== 0 &&
        Number(erc20Data.amount) !=
          Number(
            selectedComponentData.erc20Amount
              ? selectedComponentData.erc20Amount
              : 0
          )
      ) {
        setIsUpdateButtonDisabled(false);
      } else setIsUpdateButtonDisabled(true);
    }
    if (activeItem === 1) {
      if (
        erc721Data.id &&
        erc721Data.id !== (selectedComponentData.tokenId ?? '').toString()
      ) {
        setIsUpdateButtonDisabled(false);
      } else setIsUpdateButtonDisabled(true);
    }
    if (activeItem === 2) {
      if (
        erc1155Data.id &&
        erc1155Data.amount &&
        (erc1155Data.id !== (selectedComponentData.tokenId ?? '').toString() ||
          erc1155Data.amount !==
            (selectedComponentData.erc1155Amount ?? '').toString())
      ) {
        setIsUpdateButtonDisabled(false);
      } else setIsUpdateButtonDisabled(true);
    }
  }, [
    activeItem,
    erc1155Data.amount,
    erc1155Data.id,
    erc20Data.amount,
    erc20Data.decimal,
    erc721Data.id,
    selectedComponentData.erc1155Amount,
    selectedComponentData.erc20Amount,
    selectedComponentData.tokenId,
  ]);

  const handleERC721IdChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const { value } = event.target;
      if (/^\d+$/.test(value) && parseInt(value, 10) > 0) {
        const erc721Data = await getERC721Data(
          selectedComponentData.tokenAddress as Address,
          Number(value),
          library
        );
        if (erc721Data) {
          const { name, uri } = erc721Data;
          setErc721Data((prevValues) => ({
            ...prevValues,
            name,
            id: value,
          }));
          setImageUri(`https://ipfs.io/${uri}`);
        }
      } else if (value === '') {
        setErc721Data((prevValues) => ({
          ...prevValues,
          id: value,
        }));
        setImageUri(DefaultErc721ImageUri);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleERC1155IdChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const { value } = event.target;
      if (/^\d+$/.test(value) && parseInt(value, 10) > 0) {
        const erc1155Data = await getERC1155Data(
          selectedComponentData.tokenAddress as Address,
          Number(value),
          library
        );
        if (erc1155Data) {
          const { name, uri } = erc1155Data;
          setErc1155Data((prevValues) => ({
            ...prevValues,
            name,
            id: value,
          }));
          setImageUri(uri);
        }
      } else if (value === '') {
        setErc1155Data((prevValues) => ({
          ...prevValues,
          id: value,
        }));
        setImageUri(DefaultErc721ImageUri);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleERC1155AmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    if (/^\d+$/.test(value) && parseInt(value, 10) > 0) {
      setErc1155Data((prevValues) => ({
        ...prevValues,
        amount: value,
      }));
    } else if (value === '') {
      setErc1155Data((prevValues) => ({
        ...prevValues,
        amount: value,
      }));
    }
  };

  const handleNumberKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === '-' || event.key === '.') {
      event.preventDefault();
    }
  };

  const handleERC20AmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const validPattern = /^\d*(\.\d+)?$/;
    const { value } = event.target;
    if (validPattern.test(value) && Number(value) >= 0) {
      setErc20Data((prevValues) => ({
        ...prevValues,
        amount: value,
      }));
    } else if (value === '') {
      setErc20Data((prevValues) => ({
        ...prevValues,
        amount: value,
      }));
    }
  };

  const handleErc20KeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === '-') {
      event.preventDefault();
    }
  };

  const handleUpdateButtonClicked = () => {
    if (activeItem === 0) {
      const updatedErc20Data = createBlueprint.data.erc20Data.map(
        (data: ERC20Data, index) => {
          if (index === selectedComponentData.id) {
            return {
              ...data,
              amount: Number(erc20Data.amount),
            };
          }
          return data;
        }
      );
      setCreateBlueprint((prevBlueprint) => {
        return {
          ...prevBlueprint,
          data: {
            ...prevBlueprint.data,
            erc20Data: updatedErc20Data,
          },
        };
      });
    }
    if (activeItem === 1) {
      const updatedErc721Data = createBlueprint.data.erc721Data.map(
        (data: ERC721Data, index) => {
          if (index === selectedComponentData.id) {
            return {
              ...data,
              tokenId: Number(erc721Data.id),
            };
          }
          return data;
        }
      );
      setCreateBlueprint((prevBlueprint) => {
        return {
          ...prevBlueprint,
          data: {
            ...prevBlueprint.data,
            erc721Data: updatedErc721Data,
          },
        };
      });
    }
    if (activeItem === 2) {
      const updatedErc1155Data = createBlueprint.data.erc1155Data.map(
        (data: ERC1155Data, index) => {
          if (index === selectedComponentData.id) {
            return {
              ...data,
              tokenId: Number(erc1155Data.id),
              amount: Number(erc1155Data.amount),
            };
          }
          return data;
        }
      );
      setCreateBlueprint((prevBlueprint) => {
        return {
          ...prevBlueprint,
          data: {
            ...prevBlueprint.data,
            erc1155Data: updatedErc1155Data,
          },
        };
      });
    }
    setIsUpdateComponentModalOpen(false);
    setActiveItem(0);
    setErc20Data({
      name: '',
      address: '',
      amount: '',
      decimal: 0,
    });
    setErc721Data({
      name: '',
      address: '',
      id: '',
    });
    setErc1155Data({
      name: '',
      address: '',
      id: '',
      amount: '',
    });
    setImageUri(DefaultErc20ImageUri);
  };

  const handleCancelButtonClicked = () => {
    setIsUpdateComponentModalOpen(false);
    if (activeItem === 0) {
      setImageUri(DefaultErc20ImageUri);
      setErc20Data({
        name: '',
        address: '',
        amount: '',
        decimal: 0,
      });
    }
    if (activeItem === 1) {
      setErc721Data({
        name: '',
        address: '',
        id: '',
      });
      setImageUri(DefaultErc721ImageUri);
    }
    if (activeItem === 2) {
      setErc1155Data({
        name: '',
        address: '',
        id: '',
        amount: '',
      });
      setImageUri(DefaultErc1155ImageUri);
    }
  };

  return (
    <div
      className={`fixed right-0 bottom-0 top-0 left-0 z-30 flex h-full min-h-screen w-full items-center justify-center px-4 py-5 ${
        isUpdateComponentModalOpen ? 'block' : 'hidden'
      }`}
    >
      <div
        className="z-20 fixed right-0 bottom-0 top-0 left-0 flex items-center justify-center bg-opacity-80 bg-[#1D2127]"
        onClick={handleCancelButtonClicked}
      ></div>
      <div
        ref={modal}
        className="z-30 w-full max-w-[400px] rounded-3xl bg-[#040a0f] text-white pt-4 pb-6 text-center sm:w-[610px] sm:py-6 sm:rounded-[32px] sm:pb-[40px] sm:max-w-[610px]"
      >
        <h3 className="pb-4 text-lg font-semibold text-white px-4 sm:pb-6 sm:text-2xl sm:px-8 md:px-[60px]">
          Edit Your Component
        </h3>
        <img
          className="h-[200px] w-full object-cover sm:h-[300px]"
          src={imageUri}
        />
        {activeItem === 0 && (
          <div className="flex flex-col gap-1 py-6 px-6 text-base justify-center md:text-lg sm:pb-8 xs:px-8 sm:px-14">
            <div className="grid grid-cols-4">
              <p className="text-sm items-center col-span-1 flex text-light-gray xs:text-base">
                Name
              </p>
              <label className="text-left col-span-3 inline w-full rounded-xl text-white text-sm py-1.5 leading-5 xs:text-base">
                {erc20Data?.name}
              </label>
            </div>
            <div className="grid grid-cols-4">
              <p className="text-sm items-center col-span-1 flex text-light-gray xs:text-base">
                Address
              </p>
              <label className="text-left col-span-3 inline w-full rounded-xl text-white text-sm py-1.5 leading-5 break-words xs:text-base">
                {erc20Data?.address}
              </label>
            </div>
            <div className="items-center grid grid-cols-4 mt-2">
              <p className="text-sm items-center col-span-1 flex text-light-gray xs:text-base">
                Amount
              </p>
              <input
                id="erc20-amount"
                className="col-span-3 inline w-full rounded-xl border border-light-gray text-white text-sm bg-black py-1.5 px-2 leading-5 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary xs:text-base hide-arrows"
                type="number"
                onChange={handleERC20AmountChange}
                onKeyDown={handleErc20KeyPress}
                value={erc20Data.amount}
              />
            </div>
          </div>
        )}
        {activeItem === 1 && (
          <div className="flex flex-col gap-1 py-6 px-6 text-base justify-center md:text-lg sm:pb-8 xs:px-8 sm:px-14">
            <div className="grid grid-cols-4">
              <p className="text-sm items-center col-span-1 flex text-light-gray xs:text-base">
                Name
              </p>
              <label className="text-left col-span-3 inline w-full rounded-xl text-white text-sm py-1.5 leading-5 xs:text-base">
                {erc721Data?.name}
              </label>
            </div>
            <div className="grid grid-cols-4">
              <p className="text-sm items-center col-span-1 flex text-light-gray xs:text-base">
                Address
              </p>
              <label className="text-left col-span-3 inline w-full rounded-xl text-white text-sm py-1.5 leading-5 break-words xs:text-base">
                {erc721Data?.address}
              </label>
            </div>
            <div className="items-center grid grid-cols-4 mt-2">
              <p className="text-sm items-center col-span-1 flex text-light-gray xs:text-base">
                ID
              </p>
              <input
                id="erc721-id"
                name="erc721Id"
                className="col-span-3 inline w-full rounded-xl border border-light-gray text-white text-sm bg-black py-1.5 px-2 leading-5 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary xs:text-base hide-arrows"
                type="number"
                step={1}
                onChange={handleERC721IdChange}
                onKeyDown={handleNumberKeyPress}
                value={erc721Data.id}
              />
            </div>
          </div>
        )}
        {activeItem === 2 && (
          <div className="flex flex-col gap-1 py-6 px-6 text-base justify-center md:text-lg sm:pb-8 xs:px-8 sm:px-14">
            <div className="grid grid-cols-4">
              <p className="text-sm items-center col-span-1 flex text-light-gray xs:text-base">
                Name
              </p>
              <label className="text-left col-span-3 inline w-full rounded-xl text-white text-sm py-1.5 leading-5 xs:text-base">
                {erc1155Data?.name}
              </label>
            </div>
            <div className="grid grid-cols-4">
              <p className="text-sm items-center col-span-1 flex text-light-gray xs:text-base">
                Address
              </p>
              <label className="text-left col-span-3 inline w-full rounded-xl text-white text-sm py-1.5 leading-5 break-words xs:text-base">
                {erc1155Data?.address}
              </label>
            </div>
            <div className="items-center grid grid-cols-4 mt-2">
              <p className="text-sm items-center col-span-1 flex text-light-gray xs:text-base">
                ID
              </p>
              <input
                id="erc1155-id"
                className="col-span-3 inline w-full rounded-xl border border-light-gray text-white text-sm bg-black py-1.5 px-2 leading-5 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary xs:text-base hide-arrows"
                type="number"
                step={1}
                onChange={handleERC1155IdChange}
                onKeyDown={handleNumberKeyPress}
                value={erc1155Data?.id}
              />
            </div>
            <div className="items-center grid grid-cols-4 mt-3">
              <p className="text-sm items-center col-span-1 flex text-light-gray xs:text-base">
                Amount
              </p>
              <input
                id="erc1155-amount"
                className="col-span-3 inline w-full rounded-xl border border-light-gray text-white text-sm bg-black py-1.5 px-2 leading-5 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary xs:text-base hide-arrows"
                type="number"
                step={1}
                onChange={handleERC1155AmountChange}
                onKeyDown={handleNumberKeyPress}
                value={erc1155Data.amount}
              />
            </div>
          </div>
        )}
        <div className="flex justify-center items-center gap-6 px-8 xs:gap-16 sm:gap-28 md:px-[70px]">
          <Button
            className="flex justify-center !w-32 text-sm xs:text-base"
            text="Cancel"
            variant="secondary"
            onClick={handleCancelButtonClicked}
          />
          <Button
            className={`flex justify-center !w-32 text-sm xs:text-base ${
              isUpdateButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            text="Update"
            variant="primary"
            disabled={isUpdateButtonDisabled}
            onClick={handleUpdateButtonClicked}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateComponentModal;
