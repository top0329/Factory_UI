import { Meta, Story } from '@storybook/react';
import { Icon } from '@iconify/react';

import Button, { Props } from './index';

const meta: Meta = {
  title: 'Atoms/Button',
  component: Button,
};

export default meta;

const Template: Story<Props> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'Recreate',
  variant: 'primary',
  icon: <Icon icon="gridicons:create" />,
  className: 'text-xl',
};
