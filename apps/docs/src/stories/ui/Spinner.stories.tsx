import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from '@playground/ui/components/spinner';
import { expect } from 'storybook/test';

const meta = {
  title: 'UI/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const spinner = canvasElement.querySelector('.animate-spin');

    // Test spinner is rendered
    await expect(spinner).toBeInTheDocument();
  },
};

export const Large: Story = {
  args: {
    className: 'size-8',
  },
};

export const Small: Story = {
  args: {
    className: 'size-3',
  },
};
