import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Badge } from '@playground/ui/components/badge';

const meta = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Fix Stories */
export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Badge',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText('Badge');

    // Test badge is rendered
    await expect(badge).toBeInTheDocument();
  },
};
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};
export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
};
export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};
