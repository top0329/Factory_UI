import { FC } from 'react';

export interface Props {
  title: string;
  content: string;
}

const Accordion: FC<Props> = ({ title, content }) => {
  return (
    <div className="">
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};

export default Accordion;
