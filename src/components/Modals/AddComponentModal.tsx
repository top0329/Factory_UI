import { useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { Carousel } from '../Carousel';
import { Icon } from '@iconify/react/dist/iconify.js';

import {
  activeAddComponentTokenAtom,
  createBlueprintAtom,
  isAddComponentModalAtom,
} from '../../jotai/atoms';
import Button from '../Button';
import { AddComponentModalInputValue, CreateBlueprint } from '../../types';

export interface Props {
  text: string;
}

const AddComponentModal = () => {
  const CarouselData = [
    {
      headerText: null,
      subText: null,
      image:
        'https://indigo-payable-walrus-596.mypinata.cloud/ipfs/Qme8EoD9DXyH5axFVxMu8XuwReHPcQFHM1LtkGA3xkCt88',
    },
    {
      headerText: null,
      subText: null,
      image:
        'https://indigo-payable-walrus-596.mypinata.cloud/ipfs/QmPqXLh5nwpRXzarBajaD7NG5hctwYoEkWjRiHdQGfhpQu',
    },
    {
      headerText: null,
      subText: null,
      image:
        'https://indigo-payable-walrus-596.mypinata.cloud/ipfs/QmRYYxbao8N9z3L8kPDYQnC5JQggj3pzTr6GwDBuYTpvAq',
    },
  ];

  const [isAddComponentModalOpen, setIsAddComponentModalOpen] = useAtom(
    isAddComponentModalAtom
  );
  const [activeItem] = useAtom<number>(activeAddComponentTokenAtom);
  const [, setCreateBlueprint] = useAtom<CreateBlueprint>(createBlueprintAtom);

  const initialValues: AddComponentModalInputValue = {
    erc20Address: '',
    erc20Amount: '',
    erc721Address: '',
    erc721Id: '',
    erc1155Address: '',
    erc1155Id: '',
    erc1155Amount: '',
  };

  const [inputValues, setInputValues] =
    useState<AddComponentModalInputValue>(initialValues);
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState<boolean>(true);

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
    setInputValues(initialValues);
    setIsAddButtonDisabled(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeItem]);

  useEffect(() => {
    if (activeItem === 0) {
      if (inputValues.erc20Address !== '' && inputValues.erc20Amount !== '') {
        setIsAddButtonDisabled(false);
      } else setIsAddButtonDisabled(true);
    }
    if (activeItem === 1) {
      if (inputValues.erc721Address !== '' && inputValues.erc721Id !== '') {
        setIsAddButtonDisabled(false);
      } else setIsAddButtonDisabled(true);
    }
    if (activeItem === 2) {
      if (
        inputValues.erc1155Address !== '' &&
        inputValues.erc1155Amount !== '' &&
        inputValues.erc1155Id !== ''
      ) {
        setIsAddButtonDisabled(false);
      } else setIsAddButtonDisabled(true);
    }
  }, [activeItem, inputValues]);

  const handleStringChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
    console.log(inputValues);
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    const value = event.target.value === '' ? '' : Number(event.target.value);
    setInputValues({
      ...inputValues,
      [name]: value,
    });
    console.log(inputValues);
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
                name: 'Tea Leaf',
                uri: 'https://indigo-payable-walrus-596.mypinata.cloud/ipfs/QmZHBY1MB1AzZttMc1WkPiUM68ZqjUkBxxv87znCmfkHQY/tea_leaf_20.webp',
                address: inputValues.erc20Address,
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
                id: Number(inputValues.erc721Id),
                name: 'Key',
                uri: 'https://indigo-payable-walrus-596.mypinata.cloud/ipfs/QmZHBY1MB1AzZttMc1WkPiUM68ZqjUkBxxv87znCmfkHQY/key_721.webp',
                address: inputValues.erc721Address,
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
                id: Number(inputValues.erc1155Id),
                name: 'Iron Sword',
                uri: 'https://indigo-payable-walrus-596.mypinata.cloud/ipfs/QmZHBY1MB1AzZttMc1WkPiUM68ZqjUkBxxv87znCmfkHQY/iron%20sword.webp',
                address: inputValues.erc1155Address,
                amount: Number(inputValues.erc1155Amount),
              },
            ],
          },
        };
      });
    }
    setIsAddComponentModalOpen(false);
    setInputValues(initialValues);
  };

  return (
    <div
      className={`fixed right-0 bottom-0 top-0 left-0 z-30 flex h-full min-h-screen w-full items-center justify-center px-4 py-5 ${
        isAddComponentModalOpen ? 'block' : 'hidden'
      }`}
    >
      <div
        className="z-20 fixed right-0 bottom-0 top-0 left-0 flex items-center justify-center bg-opacity-80 bg-[#1D2127]"
        onClick={() => setIsAddComponentModalOpen(false)}
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
              />
            }
            leftItem={
              <Icon
                className="rounded-full w-8 h-8 p-2 font-bold opacity-70 hover:opacity-90"
                icon="ep:arrow-left-bold"
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
                onChange={handleStringChange}
                value={inputValues.erc20Address}
              />
            </div>
            <div className="items-center grid grid-cols-4">
              <p className="text-sm items-center col-span-1 flex text-light-gray xs:text-base">
                Amount
              </p>
              <input
                id="erc20-amount"
                name="erc20Amount"
                className="col-span-3 inline w-full rounded-xl border border-light-gray text-white text-lg bg-black py-1.5 px-2 leading-5 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                type="number"
                step={1}
                onChange={handleNumberChange}
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
                className="col-span-3 inline w-full rounded-xl border border-light-gray text-white text-lg bg-black py-1.5 px-2 leading-5 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                type="text"
                onChange={handleStringChange}
                value={inputValues.erc721Address}
              />
            </div>
            <div className="grid grid-cols-4">
              <p className="text-sm items-center col-span-1 flex text-light-gray xs:text-base">
                ID
              </p>
              <input
                id="erc721-id"
                name="erc721Id"
                className="col-span-3 inline w-full rounded-xl border border-light-gray text-white text-lg bg-black py-1.5 px-2 leading-5 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                type="number"
                step={1}
                onChange={handleNumberChange}
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
                onChange={handleStringChange}
                value={inputValues.erc1155Address}
              />
            </div>
            <div className="grid grid-cols-4">
              <p className="text-sm items-center col-span-1 flex text-light-gray xs:text-base">
                ID
              </p>
              <input
                id="erc1155-id"
                name="erc1155Id"
                className="col-span-3 inline w-full rounded-xl border border-light-gray text-white text-lg bg-black py-1.5 px-2 leading-5 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                type="number"
                step={1}
                onChange={handleNumberChange}
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
                className="col-span-3 inline w-full rounded-xl border border-light-gray text-white text-lg bg-black py-1.5 px-2 leading-5 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                type="number"
                step={1}
                onChange={handleNumberChange}
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
            onClick={() => setIsAddComponentModalOpen(false)}
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
