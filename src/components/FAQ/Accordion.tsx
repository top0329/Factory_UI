import React, { FC, ReactNode } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

export interface Props {
  title: string;
  content: ReactNode;
}

const Accordion: FC<Props> = ({ title, content }) => {
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);

  return (
    <div
      className={`px-4 my-1 rounded-xl hover:bg-[#0B1B27] ${
        isExpanded ? 'bg-[#0B1B27]' : 'bg-none'
      }`}
    >
      <button
        type="button"
        className="flex items-center text-white text-xl md:text-2xl lg:text-[28px] justify-between w-full text-left py-5"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {title}
        <Icon
          icon={
            isExpanded
              ? 'heroicons:minus-circle-16-solid'
              : 'heroicons:plus-circle-16-solid'
          }
          className="flex min-w-10"
          onClick={() => setIsExpanded(!isExpanded)}
        />
      </button>
      <div
        className={`grid text-light-gray text-lg md:text-xl overflow-hidden transition-200 duration-700 ease-in-out ${
          isExpanded ? 'max-h-[500px] sm:max-h-[300px]' : 'max-h-[0px]'
        }`}
      >
        <div className="pl-4 pb-5">{content}</div>
      </div>
    </div>
  );
};

export default Accordion;
