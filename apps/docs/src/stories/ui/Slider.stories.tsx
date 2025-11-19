import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slider } from '@playground/ui/components/slider';
import { within, expect } from 'storybook/test';

const meta = {
  title: 'UI/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
    className: 'w-[300px]',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const slider = canvas.getByRole('slider');

    // Test slider is rendered
    await expect(slider).toBeInTheDocument();

    // Test slider has correct default value
    await expect(slider).toHaveAttribute('aria-valuenow', '50');
  },
};
export const Range: Story = {
  args: {
    defaultValue: [25, 75],
    max: 100,
    step: 1,
    className: 'w-[300px]',
  },
};
export const WithSteps: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 10,
    className: 'w-[300px]',
  },
};
export const Disabled: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
    className: 'w-[300px]',
    disabled: true,
  },
};
