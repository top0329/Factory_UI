import { useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Address } from 'viem';

import Button from '../Button';
import useWeb3 from '../../hooks/useWeb3';
import checkContractType from '../../utils/checkContractType';
import getERC721Data from '../../utils/getERC721Data';
import getERC1155Data from '../../utils/getERC1155Data';
import DefaultERC20Image from '../../assets/images/default-erc20.png';
import DefaultERC721Image from '../../assets/images/default-erc721.png';
import DefaultERC1155Image from '../../assets/images/default-erc1155.png';
import { Carousel } from '../Carousel';
import {
  activeAddComponentTokenAtom,
  availableComponentAtom,
  createBlueprintAtom,
  isAddComponentModalAtom,
} from '../../jotai/atoms';
import { AddComponentModalInputValue, CreateBlueprint } from '../../types';

const AddComponentModal = () => {
  const { library } = useWeb3();
  const CarouselData = [
    {
      headerText: null,
      subText: null,
      image: DefaultERC20Image,
    },
    {
      headerText: null,
      subText: null,
      image: DefaultERC721Image,
    },
    {
      headerText: null,
      subText: null,
      image: DefaultERC1155Image,
    },
  ];

  const initialValues: AddComponentModalInputValue = {
    erc20Address: '',
    erc20Amount: '',
    erc721Address: '',
    erc721Id: '',
    erc1155Address: '',
    erc1155Id: '',
    erc1155Amount: '',
  };

  const [isAddComponentModalOpen, setIsAddComponentModalOpen] =
    useAtom<boolean>(isAddComponentModalAtom);
  const [activeItem, setActiveItem] = useAtom<number>(
    activeAddComponentTokenAtom
  );
  const [createBlueprint, setCreateBlueprint] =
    useAtom<CreateBlueprint>(createBlueprintAtom);
  const [, setAvailableComponent] = useAtom<number>(availableComponentAtom);

  const [inputValues, setInputValues] =
    useState<AddComponentModalInputValue>(initialValues);
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState<boolean>(true);
  const [error, setError] = useState<string | boolean>(false);

  const modal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!isAddComponentModalOpen || keyCode !== 27) return;
      setIsAddComponentModalOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    async function getContractData() {
      if (activeItem === 0) {
        if (
          error === '' &&
          inputValues.erc20Amount !== '' &&
          inputValues.erc20Address
        ) {
          setIsAddButtonDisabled(false);
        } else setIsAddButtonDisabled(true);
      }
      if (activeItem === 1) {
        if (error === '' && inputValues.erc721Id !== '') {
          const erc721Data = await getERC721Data(
            inputValues.erc721Address,
            inputValues.erc721Id,
            library
          );
          if (
            createBlueprint.data.erc721Data.some(
              (erc721) =>
                erc721.tokenAddress === inputValues.erc721Address &&
                erc721.tokenId === inputValues.erc721Id
            )
          )
            setError('This token already added');
          else {
            setError('');
          }
          if (erc721Data === null) setIsAddButtonDisabled(true);
          else setIsAddButtonDisabled(false);
        } else setIsAddButtonDisabled(true);
      }
      if (activeItem === 2) {
        if (
          error === '' &&
          inputValues.erc1155Amount !== '' &&
          inputValues.erc1155Id !== ''
        ) {
          const erc1155Data = await getERC1155Data(
            inputValues.erc1155Address,
            inputValues.erc1155Id,
            library
          );
          if (
            createBlueprint.data.erc1155Data.some(
              (erc1155) =>
                erc1155.tokenAddress === inputValues.erc1155Address &&
                erc1155.tokenId === inputValues.erc1155Id
            )
          )
            setError('This token already added');
          if (erc1155Data === null) setIsAddButtonDisabled(true);
          else setIsAddButtonDisabled(false);
        } else setIsAddButtonDisabled(true);
      }
    }
    getContractData();
  }, [
    activeItem,
    inputValues,
    inputValues.erc721Id,
    inputValues.erc1155Id,
    error,
    createBlueprint.data.erc721Data,
    createBlueprint.data.erc1155Data,
    library,
  ]);

  const handleAddressChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const { name, value } = event.target;
      setInputValues({
        ...inputValues,
        [name]: value,
      });
      const result = await checkContractType(value as Address | '', library);
      if (activeItem === 0 && result.type === 'ERC20') {
        if (
          createBlueprint.data.erc20Data.some(
            (erc20) => erc20.tokenAddress === value
          )
        )
          setError('This token already added');
        else {
          setError('');
        }
      } else if (activeItem === 1 && result.type === 'ERC721') {
        if (
          createBlueprint.data.erc721Data.some(
            (erc721) => erc721.tokenAddress === value
          ) &&
          createBlueprint.data.erc721Data.some(
            (erc721) => erc721.tokenId === inputValues.erc721Id
          )
        )
          setError('This token already added');
        else {
          setError('');
        }
      } else if (activeItem === 2 && result.type === 'ERC1155') {
        if (
          createBlueprint.data.erc1155Data.some(
            (erc1155) => erc1155.tokenAddress === value
          ) &&
          createBlueprint.data.erc1155Data.some(
            (erc1155) => erc1155.tokenId === inputValues.erc1155Id
          )
        )
          setError('This token already added');
        else {
          setError('');
        }
      } else {
        switch (activeItem) {
          case 0:
            setError('Invalid ERC20 address.');
            break;
          case 1:
            setError('Invalid ERC721 address.');
            break;
          case 2:
            setError('Invalid ERC1155 address.');
            break;
        }
      }
      if (value === '') setError('');
    } catch (err) {
      setError('Invalid Smart Contract address.');
      console.log(err);
    }
  };

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (/^\d+$/.test(value) && parseInt(value, 10) > 0) {
      setInputValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
      if (
        (createBlueprint.data.erc721Data.some(
          (erc721) => erc721.tokenAddress === inputValues.erc721Address
        ) &&
          createBlueprint.data.erc721Data.some(
            (erc721) => Number(erc721.tokenId) === parseInt(value)
          )) ||
        (createBlueprint.data.erc1155Data.some(
          (erc1155) => erc1155.tokenAddress === inputValues.erc1155Address
        ) &&
          createBlueprint.data.erc1155Data.some(
            (erc1155) => Number(erc1155.tokenId) === parseInt(value)
          ))
      )
        setError('This token already added');
      else {
        setError('');
      }
    } else if (value === '') {
      setInputValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (/^\d+$/.test(value) && parseInt(value, 10) > 0) {
      setInputValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    } else if (value === '') {
      setInputValues((prevValues) => ({
        ...prevValues,
        [name]: value,
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
    const { name, value } = event.target;
    if (validPattern.test(value) && Number(value) > 0) {
      setInputValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    } else if (value === '') {
      setInputValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
    if (inputValues.erc20Address) setError('');
  };

  const handleErc20KeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === '-') {
      event.preventDefault();
    }
  };

  const handleAddButtonClicked = () => {
    if (activeItem === 0) {
      setCreateBlueprint((prevBlueprint) => {
        return {
          ...prevBlueprint,
          data: {
            ...prevBlueprint.data,
            erc20Data: [
              ...prevBlueprint.data.erc20Data,
              {
                tokenAddress: inputValues.erc20Address as Address,
                amount: Number(inputValues.erc20Amount),
              },
            ],
          },
        };
      });
    }
    if (activeItem === 1) {
      setCreateBlueprint((prevBlueprint) => {
        return {
          ...prevBlueprint,
          data: {
            ...prevBlueprint.data,
            erc721Data: [
              ...prevBlueprint.data.erc721Data,
              {
                tokenId: Number(inputValues.erc721Id),
                tokenAddress: inputValues.erc721Address as Address,
              },
            ],
          },
        };
      });
    }
    if (activeItem === 2) {
      setCreateBlueprint((prevBlueprint) => {
        return {
          ...prevBlueprint,
          data: {
            ...prevBlueprint.data,
            erc1155Data: [
              ...prevBlueprint.data.erc1155Data,
              {
                tokenId: Number(inputValues.erc1155Id),
                tokenAddress: inputValues.erc1155Address as Address,
                amount: Number(inputValues.erc1155Amount),
              },
            ],
          },
        };
      });
    }
    setIsAddComponentModalOpen(false);
    setInputValues(initialValues);
    setAvailableComponent((prevValue) => prevValue - 1);
    setActiveItem(0);
  };

  const handleCancelButtonClicked = () => {
    setIsAddComponentModalOpen(false);
    setInputValues(initialValues);
    setError('');
    setActiveItem(0);
  };

  return (
    <div
      className={`fixed right-0 bottom-0 top-0 left-0 z-30 flex h-full min-h-screen w-full items-center justify-center px-4 py-5 ${
        isAddComponentModalOpen ? 'block' : 'hidden'
      }`}
    >
      <div
        className="z-20 fixed right-0 bottom-0 top-0 left-0 flex items-center justify-center bg-opacity-80 bg-[#1D2127]"
        onClick={handleCancelButtonClicked}
      ></div>
      <div
        ref={modal}
        className="z-30 w-full max-w-[400px] rounded-3xl bg-[#040a0f] text-white pt-4 pb-6 text-center sm:w-[560px] sm:py-8 sm:rounded-[48px] md:py-[40px] sm:max-w-[600px]"
      >
        <h3 className="pb-4 text-lg font-semibold text-white px-4 sm:pb-8 sm:text-2xl sm:px-8 md:px-[60px]">
          Add Component to Your Blueprint
        </h3>
        <div className="z-40 overflow-x-hidden overflow-y-auto flex justify-center items-center">
          <Carousel
            data={CarouselData}
            rightItem={
              <Icon
                className="rounded-full w-8 h-8 p-2 font-bold opacity-70 hover:opacity-90"
                icon="ep:arrow-right-bold"
                onClick={() => {
                  setInputValues(initialValues);
                  setIsAddButtonDisabled(true);
                  setError('');
                }}
              />
            }
            leftItem={
              <Icon
                className="rounded-full w-8 h-8 p-2 font-bold opacity-70 hover:opacity-90"
                icon="ep:arrow-left-bold"
                onClick={() => {
                  setInputValues(initialValues);
                  setIsAddButtonDisabled(true);
                  setError('');
                }}
              />
            }
            size="normal"
          />
        </div>
        {activeItem === 0 && (
          <div
            className={`flex flex-col gap-3 py-8 px-6 text-base md:text-lg justify-center sm:px-[70px] xs:px-10 xs:gap-5`}
          >
            <div className="grid grid-cols-4 gap-2">
              <p className="text-sm items-center col-span-1 flex text-light-gray xs:text-base">
                Address
              </p>
              <input
                id="erc20-address"
                name="erc20Address"
                className="col-span-3 inline w-full rounded-xl border border-light-gray text-white text-lg bg-black py-1.5 px-2 leading-5 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                type="text"
                onChange={handleAddressChange}
                value={inputValues.erc20Address}
              />
              {error && (
                <div className="col-start-2 col-end-4 text-red-600 text-xs text-left pl-2">
                  {error}
                </div>
              )}
            </div>
            <div className="items-center grid grid-cols-4">
              <p className="text-sm items-center col-span-1 flex text-light-gray xs:text-base">
                Amount
              </p>
              <input
                id="erc20-amount"
                name="erc20Amount"
                className="col-span-3 inline w-full rounded-xl border border-light-gray text-white text-lg bg-black py-1.5 px-2 leading-5 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm hide-arrows"
                type="number"
                onChange={handleERC20AmountChange}
                onKeyDown={handleErc20KeyPress}
                value={inputValues.erc20Amount}
              />
            </div>
          </div>
        )}
        {activeItem === 1 && (
          <div
            className={`flex flex-col gap-3 py-8 px-6 text-base md:text-lg justify-center sm:px-[70px] xs:px-10 xs:gap-5`}
          >
            <div className="grid grid-cols-4 gap-2">
              <p className="text-sm items-center col-span-1 flex text-light-gray xs:text-base">
                Address
              </p>
              <input
                id="erc721-address"
                name="erc721Address"
                className="col-span-3 inline w-full rounded-xl border border-light-gray text-white text-lg bg-black py-1.5 px-2 leading-5 placeholder-gray-500 focus:border-primary focus:ring-primary focus:outline-none focus:ring-1 sm:text-sm"
                type="text"
                onChange={handleAddressChange}
                value={inputValues.erc721Address}
              />
              {error && (
                <div className="col-start-2 col-end-4 text-red-600 text-xs text-left pl-2">
                  {error}
                </div>
              )}
            </div>
            <div className="grid grid-cols-4">
              <p className="text-sm items-center col-span-1 flex text-light-gray xs:text-base">
                ID
              </p>
              <input
                id="erc721-id"
                name="erc721Id"
                className="col-span-3 inline w-full rounded-xl border border-light-gray text-white text-lg bg-black py-1.5 px-2 leading-5 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm hide-arrows"
                type="number"
                step={1}
                onChange={handleIdChange}
                onKeyDown={handleNumberKeyPress}
                value={inputValues.erc721Id}
              />
            </div>
          </div>
        )}
        {activeItem === 2 && (
          <div
            className={`flex flex-col gap-3 py-3 px-6 text-base md:text-lg justify-center sm:px-[70px] xs:px-10 xs:gap-3`}
          >
            <div className="grid grid-cols-4 gap-2">
              <p className="text-sm items-center col-span-1 flex text-light-gray xs:text-base">
                Address
              </p>
              <input
                id="erc1155-address"
                name="erc1155Address"
                className="col-span-3 inline w-full rounded-xl border border-light-gray text-white text-lg bg-black py-1.5 px-2 leading-5 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                type="text"
                onChange={handleAddressChange}
                value={inputValues.erc1155Address}
              />
              {error && (
                <div className="col-start-2 col-end-4 text-red-600 text-xs text-left pl-2">
                  {error}
                </div>
              )}
            </div>
            <div className="grid grid-cols-4">
              <p className="text-sm items-center col-span-1 flex text-light-gray xs:text-base">
                ID
              </p>
              <input
                id="erc1155-id"
                name="erc1155Id"
                className="col-span-3 inline w-full rounded-xl border border-light-gray text-white text-lg bg-black py-1.5 px-2 leading-5 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm hide-arrows"
                type="number"
                step={1}
                onChange={handleIdChange}
                onKeyDown={handleNumberKeyPress}
                value={inputValues.erc1155Id}
              />
            </div>
            <div className="items-center grid grid-cols-4">
              <p className="text-sm items-center col-span-1 flex text-light-gray xs:text-base">
                Amount
              </p>
              <input
                id="erc1155-amount"
                name="erc1155Amount"
                className="col-span-3 inline w-full rounded-xl border border-light-gray text-white text-lg bg-black py-1.5 px-2 leading-5 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm hide-arrows"
                type="number"
                step={1}
                onChange={handleAmountChange}
                onKeyDown={handleNumberKeyPress}
                value={inputValues.erc1155Amount}
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
              isAddButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            text="Add"
            variant="primary"
            disabled={isAddButtonDisabled}
            onClick={handleAddButtonClicked}
          />
        </div>
      </div>
    </div>
  );
};

export default AddComponentModal;
