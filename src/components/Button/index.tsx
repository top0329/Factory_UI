import React, { FC } from 'react';
import { IButtonClass } from '../../types';

export interface Props {
  text: string;
  variant?: 'primary' | 'secondary' | 'black' | 'outline';
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Button: FC<Props> = ({ text, variant = 'primary', icon, className, onClick }) => {
  const styling: IButtonClass | undefined = buttonClasses.find((classes) => {
    return classes.name === variant;
  });
  return (
    <button
      className={`py-3 px-5 rounded-2xl flex gap-3 items-center ${styling?.style} ${className}`}
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  );
};

const buttonClasses: Array<IButtonClass> = [
  {
    name: 'primary',
    style: 'text-white bg-primary',
  },
  {
    name: 'secondary',
    style: 'text-white rounded bg-secondary',
  },
  {
    name: 'black',
    style: 'text-white bg-black',
  },
  {
    name: 'outline',
    style: 'text-white border border-white bg-opacity-100',
  },
];
