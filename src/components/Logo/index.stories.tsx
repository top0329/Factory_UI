import { Meta, Story } from '@storybook/react';

import Logo, { Props } from './index';

const meta: Meta = {
  title: 'Atoms/Logo',
  component: Logo,
};

export default meta;

const Template: Story<Props> = (args) => <Logo {...args} />;

export const Default = Template.bind({});
Default.args = {
  url: '/src/assets/images/blueprint-logo.png',
  className: '',
};
