import { useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { Carousel } from '../Carousel';
import { Icon } from '@iconify/react/dist/iconify.js';

import {
  activeAddComponentTokenAtom,
  isAddComponentModalAtom,
} from '../../jotai/atoms';
import Button from '../Button';

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

  const modal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!isAddComponentModalOpen || keyCode !== 27) return;
      setIsAddComponentModalOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

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
        <div
          className={`flex flex-col gap-3 py-8 px-6 text-base md:text-lg justify-center sm:px-[70px] xs:px-10 xs:gap-5`}
        >
          <div className="grid grid-cols-4 gap-2">
            <p className="text-sm items-center col-span-1 flex text-light-gray xs:text-base">
              Address
            </p>
            <input
              id="address"
              name="address"
              className="col-span-3 inline w-full rounded-xl border border-light-gray text-white text-lg bg-black py-1.5 px-2 leading-5 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
              type="text"
            />
          </div>
          {activeItem !== 0 && (
            <div className="grid grid-cols-4">
              <p className="text-sm items-center col-span-1 flex text-light-gray xs:text-base">
                ID
              </p>
              <input
                id="address"
                name="address"
                className="col-span-3 inline w-full rounded-xl border border-light-gray text-white text-lg bg-black py-1.5 px-2 leading-5 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                type="text"
              />
            </div>
          )}
          {activeItem !== 1 && (
            <div className="items-center grid grid-cols-4">
              <p className="text-sm items-center col-span-1 flex text-light-gray xs:text-base">
                Amount
              </p>
              <input
                id="address"
                name="address"
                className="col-span-3 inline w-full rounded-xl border border-light-gray text-white text-lg bg-black py-1.5 px-2 leading-5 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                type="text"
              />
            </div>
          )}
        </div>
        <div className="flex justify-center items-center gap-6 px-8 xs:gap-16 sm:gap-28 md:px-[70px]">
          <Button
            className="flex justify-center !w-32 text-sm xs:text-base"
            text="Cancel"
            variant="secondary"
            onClick={() => setIsAddComponentModalOpen(false)}
          />
          <Button
            className="flex justify-center !w-32 text-sm xs:text-base"
            text="Add"
            variant="primary"
          />
        </div>
      </div>
    </div>
  );
};

export default AddComponentModal;
