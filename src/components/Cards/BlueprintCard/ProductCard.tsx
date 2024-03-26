import { FC, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
// import { useAtom } from 'jotai';

import Button from '../../Button';
import Image from '../../Image';
import { productAddress } from '../../../constants';
// import {
//   selectedProductintAtom,
//   productSelectionState,
// } from '../../../jotai/atoms';
// import { SelectedProduct } from '../../../types';

export interface Props {
  uri: string;
  name: string;
  productId: number;
  balance: number;
  onClick?: () => void;
  onClickDecompose: () => void;
}

const ProductCard: FC<Props> = ({
  uri,
  name,
  productId,
  balance,
  onClick,
  onClickDecompose,
}) => {
  const [tooltipMessage, setTooltipMessage] = useState('Copy to clipboard');
  // const navigate = useNavigate();
  const copyToClipboard = () => {
    navigator.clipboard.writeText(productAddress).then(() => {
      setTooltipMessage('Copied!'); // Update tooltip message on success
      setTimeout(() => {
        setTooltipMessage('Copy to clipboard'); // Reset tooltip message after delay
      }, 2000); // Duration before resetting the tooltip message
    });
  };
  // const [selectedProduct] = useAtom<SelectedProduct>(selectedProductintAtom);
  // const [, setProductSelectionState] = useAtom<SelectedProduct>(
  //   productSelectionState
  // );
  // const onClickDecompose = () => {
  //   setProductSelectionState(selectedProduct);
  //   navigate(`/product/decompose/${selectedProduct.id}`);
  // };

  return (
    <div
      id="container"
      className="h-min w-full border-2 border-[#00F0FF]/30 bg-[#011018] rounded-3xl border-block overflow-clip"
      onClick={onClick}
    >
      <div className="relative w-full overflow-hidden">
        <div className="w-full md:h-full overflow-hidden object-cover">
          <Image
            className="w-full aspect-square"
            src={uri}
            spinnerClassName="w-full aspect-square"
            alt="product-card"
          />
          <div className="absolute md:bottom-[202px] lg:bottom-[214px] sm:bottom-[190px] bg-gradient-to-t from-[#011018] from-0% sm:from-0% bg-opacity-100 to-[#000407]/0 bottom-[106px] w-full h-[45px]"></div>
        </div>
        <div
          id="infor"
          className="flex justify-between p-4 pt-0 sm:flex-col xs:px-4 gap-y-0 top-[-80px] md:top-[-80px] w-full box-border"
        >
          <div id="name" className="text-white">
            <p className="flex justify-start text-xs font-mono text-[#858584]">
              Name
            </p>
            <div className="sm:flex sm:justify-between grid items-center py-[3px]">
              <p className="w-auto truncate text-sm md:text-base lg:text-lg font-mono">
                {name}
              </p>
            </div>
          </div>
          <div id="id_supply" className="flex justify-between text-white">
            <div id="id" className="pl-1">
              <p className="flex justify-start text-xs font-mono text-[#858584]">
                ID
              </p>
              <p className="text-sm md:text-base lg:text-lg items-center font-mono mt-[3.2px] ">
                {productId}
              </p>
            </div>
            <div id="id" className="text-end hidden sm:block">
              <p className="text-xs font-mono text-[#858584]">Balance</p>
              <p className="md:text-base lg:text-lg font-mono mt-[4px]">
                {balance}
              </p>
            </div>
          </div>
          <div id="id_supply" className="relative w-full hidden sm:block">
            <div id="address" className="text-white">
              <p className="text-xs font-mono text-[#858584]">Address</p>
              <div id="id_supply" className="flex justify-between text-white">
                <div className="flex justify-center gap-1 item-center md:text-base lg:text-lg font-mono text-xs">
                  <Icon
                    icon="logos:ethereum"
                    className="hidden md:block item-center my-auto"
                  />
                  <p>
                    {productAddress.substring(0, 7)}...
                    {productAddress.slice(-5)}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (copyToClipboard) {
                      copyToClipboard();
                    }
                  }}
                >
                  <Icon
                    icon="solar:copy-outline"
                    className="item-center my-auto"
                  />
                </button>
                <div
                  role="tooltip"
                  className={`absolute z-10 inline-block right-0 bottom-7 px-3 py-2 text-sm text-white transition-opacity duration-300 bg-gray-700 rounded-lg shadow-sm ${
                    tooltipMessage === 'Copied!'
                      ? 'opacity-100'
                      : 'invisible opacity-0'
                  }`}
                >
                  {tooltipMessage}
                  <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 pt-0">
          <Button
            className="rounded-lg w-full justify-center xs:h-10 h-8 xs:text-[16px] text-[14px]"
            text="Decompose"
            onClick={(e) => {
              e.stopPropagation();
              if (onClickDecompose) {
                onClickDecompose();
              }
            }}
          ></Button>
        </div>
        <div
          id="badge"
          className="absolute  right-[-55px] md:right-[-48px] top-[11px] md:top-[18px] sm:top-[15px] sm:right-[-55px] xs:h-[22px] xs:top-[12px] xs:right-[-60px] xs:text-[12px] w-[175.5px] h-[25px] md:h-[27px] bg-[#FFF500] text-black text-center text-[14px] md:text-[18px] rotate-[38.86deg] py-auto px-[35px] shadow-[0_3px_5px_1px_rgba(0,0,0,0.3)]"
        >
          Product
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
