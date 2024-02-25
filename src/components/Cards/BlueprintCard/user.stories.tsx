import { Meta, Story } from '@storybook/react';
import robot from '../../assets/svg/robot.svg';

import { UserBlueprintCard, Props } from './UserBlueprintCard';

const meta: Meta = {
  title: 'Atoms/DefaultBlueprintCard',
  component: UserBlueprintCard,
};

export default meta;

const Template: Story<Props> = (args) => <UserBlueprintCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  imageLink: robot,
  name: 'Robot',
  blueprintid: 5,
  tsupply: 10000000,
  mintPrice: 0.001,
  mintLimit: 1000000,
};
