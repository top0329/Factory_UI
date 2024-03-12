import { Icon } from '@iconify/react/dist/iconify.js';
import { FC } from 'react';

export interface Props {
  disabled: boolean;
  handleAddComponentModalOpen?: () => void;
}

const ComponentButton: FC<Props> = ({
  disabled,
  handleAddComponentModalOpen,
}) => {
  return (
    <button
      className={`z-10 flex justify-center items-center ${
        disabled ? 'bg-[#272727]' : 'bg-secondary'
      } min-w-[120px] h-[250px] overflow-hidden rounded-3xl sm:h-[290px] sm:min-w-[220px]`}
      onClick={handleAddComponentModalOpen}
    >
      <Icon
        className="w-24 h-24 text-[#898989]"
        icon="flowbite:circle-plus-outline"
      />
    </button>
  );
};

export default ComponentButton;
