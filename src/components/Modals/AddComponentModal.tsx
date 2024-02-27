import { useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { Carousel } from '../Carousel';
import { Icon } from '@iconify/react/dist/iconify.js';

import {
  activeAddComponentTokenAtom,
  isAddComponentModalAtom,
} from '../../jotai/atoms';
import Button from '../Button';

import ERC20 from '../../assets/images/erc20.png';
import ERC721 from '../../assets/images/erc721.png';
import ERC1155 from '../../assets/images/erc1155.png';

export interface Props {
  text: string;
}

const AddComponentModal = () => {
  const CarouselData = [
    {
      headerText: null,
      subText: null,
      image: ERC20,
    },
    {
      headerText: null,
      subText: null,
      image: ERC721,
    },
    {
      headerText: null,
      subText: null,
      image: ERC1155,
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
      className={`absolute left-0 top-0 flex h-full min-h-screen w-full items-center justify-center px-4 py-5 ${
        isAddComponentModalOpen ? 'block' : 'hidden'
      }`}
    >
      <div
        className="z-20 fixed right-0 bottom-0 top-0 left-0 flex items-center justify-center bg-opacity-80 bg-[#1D2127]"
        onClick={() => setIsAddComponentModalOpen(false)}
      ></div>
      <div
        ref={modal}
        // onFocus={() => setIsAddComponentModalOpen(true)}
        // onBlur={() => setIsAddComponentModalOpen(false)}
        className="z-30 w-full max-w-[600px] rounded-3xl bg-[#040a0f] text-white pt-4 pb-6 text-center sm:py-12 sm:rounded-[48px] md:py-[40px]"
      >
        <h3 className="pb-4 text-base font-semibold text-white px-4 sm:pb-10 sm:text-2xl sm:px-8 md:px-[60px]">
          Add Component to Your Blueprint
        </h3>
        <div className="z-40 overflow-x-hidden overflow-y-auto flex justify-center items-center">
          <Carousel
            data={CarouselData}
            rightItem={<Icon icon="ep:arrow-right-bold" />}
            leftItem={<Icon icon="ep:arrow-left-bold" />}
            // animationDuration={3000}
            size="normal"
          />
        </div>
        <div
          className={`flex flex-col gap-5 py-8 px-4 text-base md:text-lg justify-center sm:px-[70px]`}
        >
          <div className="grid grid-cols-4">
            <p className="items-center col-span-1 flex text-light-gray">
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
              <p className="items-center col-span-1 flex text-light-gray">ID</p>
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
              <p className="col-span-1 flex text-light-gray">Amount</p>
              <input
                id="address"
                name="address"
                className="col-span-3 inline w-full rounded-xl border border-light-gray text-white text-lg bg-black py-1.5 px-2 leading-5 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                type="text"
              />
            </div>
          )}
        </div>
        <div className="flex justify-center items-center gap-6 px-8 sm:gap-16 md:gap-28 md:px-[70px]">
          <Button
            className="flex justify-center !w-32"
            text="Cancel"
            variant="secondary"
            onClick={() => setIsAddComponentModalOpen(false)}
          />
          <Button
            className="flex justify-center !w-32"
            text="Add"
            variant="primary"
          />
        </div>
      </div>
    </div>
  );
};

export default AddComponentModal;
