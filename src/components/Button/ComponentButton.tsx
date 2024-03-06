import { Icon } from '@iconify/react/dist/iconify.js';
import { FC } from 'react';
import { useAtom } from 'jotai';

import { isAddComponentModalAtom } from '../../jotai/atoms';

const ComponentButton: FC = () => {
  const [, setIsAddComponentModalOpen] = useAtom(isAddComponentModalAtom);

  return (
    <button
      className="z-10 flex justify-center items-center bg-secondary w-auto h-44 rounded-3xl"
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
