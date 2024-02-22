import { Icon } from '@iconify/react/dist/iconify.js';
import { FC } from 'react';

const ComponentButton: FC = () => {
  return (
    <button className="flex justify-center items-center bg-secondary w-72 h-44 rounded-3xl">
      <Icon
        className="w-24 h-24 text-[#898989]"
        icon="flowbite:circle-plus-outline"
      />
    </button>
  );
};

export default ComponentButton;
