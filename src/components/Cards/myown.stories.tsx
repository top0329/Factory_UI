import { Meta, Story } from '@storybook/react';
import robot from '../../assets/images/robot.svg';

import { MyOwnBlueprintCard, Props } from './myown';

const meta: Meta = {
  title: 'Atoms/OwnBlueprintCard',
  component: MyOwnBlueprintCard,
};

export default meta;

const Template: Story<Props> = (args) => <MyOwnBlueprintCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  imageLink: robot,
  name: 'Robot',
  blueprintid: 5,
  tsupply: 10000000,
  address: '0x55d398326f99059ff775485246999027b3197955',
};
