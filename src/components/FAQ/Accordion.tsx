import { Icon } from '@iconify/react/dist/iconify.js';
import React, { FC, ReactNode } from 'react';

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
      <h2>
        <button
          type="button"
          className="flex items-center text-white text-xl md:text-2xl lg:text-[28px] justify-between w-full text-left py-5"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span>{title}</span>
          {/* <svg
            className={`fill-indigo-500 shrink-0 ml-8 bg-white rounded-full p-1`}
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              y="6.5"
              width="20"
              height="3"
              rx="1"
              className={`transform origin-center transition duration-200 ease-out ${
                !isExpanded ? '!rotate-90' : ''
              }`}
            />
            <rect
              y="6.5"
              width="20"
              height="3"
              rx="1"
              className="transform origin-center rotate-180 transition duration-200 ease-out"
            />
          </svg> */}
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
      </h2>
      <div
        className={`grid text-light-gray text-lg md:text-xl overflow-hidden transition-200 duration-700 ease-in-out ${
          isExpanded ? 'max-h-[500px] sm:max-h-[300px]' : 'max-h-[0px]'
        }`}
      >
        <div className="">
          <p className="pb-5">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
