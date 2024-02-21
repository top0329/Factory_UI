import { Meta, Story } from '@storybook/react';
import robot from '../../assets/svg/robot.svg';

import DefaultBlueprintCard, { Props } from './default';

const meta: Meta = {
  title: 'Atoms/DefaultBlueprintCard',
  component: DefaultBlueprintCard,
};

export default meta;

const Template: Story<Props> = (args) => <DefaultBlueprintCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  imageLink: robot,
  name: 'Robot',
  blueprintid: 5,
  tsupply: 10000000,
  mintPrice: 0.001,
  mintLimit: 1000000,
};
