import { Icon } from '@iconify/react/dist/iconify.js';
import { FC } from 'react';
import { useAtom } from 'jotai';

import { isAddComponentModalAtom } from '../../jotai/atoms';

const ComponentButton: FC = () => {
  const [, setIsAddComponentModalOpen] = useAtom(isAddComponentModalAtom);

  return (
    <button
      className="z-10 flex justify-center items-center bg-secondary min-w-[120px] h-[250px] overflow-hidden rounded-3xl sm:h-[290px] sm:min-w-[220px]"
      onClick={() => setIsAddComponentModalOpen(true)}
    >
      <Icon
        className="w-24 h-24 text-[#898989]"
        icon="flowbite:circle-plus-outline"
      />
    </button>
  );
};

export default ComponentButton;
