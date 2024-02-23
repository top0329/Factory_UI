import { FC } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

export interface Props {
  imageUrl: string;
  icon?: boolean;
}

const ERC1155Card: FC<Props> = ({ imageUrl, icon = false }) => {
  return (
    <div className="relative w-[272px] h-44">
      <img
        className="flex justify-center items-center w-72 h-44 rounded-3xl"
        src={imageUrl}
        alt="erc-20"
      />
      <p className="absolute top-3 left-4 bg-blue-200 text-blue-800 text-base font-medium me-2 px-2.5 py-0.5 rounded opacity-90">
        ERC1155
      </p>
      {icon && (
        <div>
          <Icon
            className="absolute top-3 right-12 bg-blue-200 w-7 h-7 text-blue-800 text-base font-medium me-2 p-0.5 rounded opacity-90 cursor-pointer"
            icon="mynaui:edit-one"
          />
          <Icon
            className="absolute top-3 right-4 bg-blue-200 w-7 h-7 text-blue-800 text-base font-medium me-2 p-0.5 rounded opacity-90 cursor-pointer"
            icon="heroicons:trash"
          />
        </div>
      )}
      <p className="absolute top-[118px] left-4 bg-blue-200 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded opacity-90">
        Iron Sheild
      </p>
      <p className="absolute top-[120px] right-2 bg-blue-200 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded opacity-90 tracking-tighter">
        ID <span className="">398</span>
      </p>
      <p className="absolute top-36 left-4 truncate bg-blue-200 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded opacity-90 tracking-tighter">
        Amount <span className="">100000</span>
      </p>
      <p className="absolute top-36 right-2 truncate bg-blue-200 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded opacity-90 tracking-tighter">
        Address <span className="">0x5868...4be1</span>
      </p>
      <div className="absolute top-[118px] rounded-3xl bg-gradient-to-t from-landing via-transparent to-transparent w-full h-1/3"></div>
    </div>
  );
};

export default ERC1155Card;
