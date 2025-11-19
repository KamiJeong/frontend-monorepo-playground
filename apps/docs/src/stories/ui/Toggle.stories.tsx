import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toggle } from '@playground/ui/components/toggle';
import { Bold, Italic, Underline } from 'lucide-react';
import { within, expect, userEvent } from 'storybook/test';

const meta = {
  title: 'UI/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Toggle',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('button', { name: 'Toggle' });

    // Test toggle is rendered
    await expect(toggle).toBeInTheDocument();

    // Test toggle can be pressed
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute('data-state', 'on');

    // Test toggle can be unpressed
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute('data-state', 'off');
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Toggle',
  },
};

export const WithIcon: Story = {
  render: (args) => (
    <Toggle {...args}>
      <Bold />
    </Toggle>
  ),
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large',
  },
};

export const TextFormatting: Story = {
  render: () => (
    <div className="flex gap-2">
      <Toggle variant="outline" aria-label="Toggle bold">
        <Bold />
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle italic">
        <Italic />
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle underline">
        <Underline />
      </Toggle>
    </div>
  ),
};
