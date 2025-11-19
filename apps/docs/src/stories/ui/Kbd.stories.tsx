import type { Meta, StoryObj } from '@storybook/react-vite';
import { Kbd, KbdGroup } from '@playground/ui/components/kbd';
import { Command } from 'lucide-react';
import { within, expect } from 'storybook/test';

const meta = {
  title: 'UI/Kbd',
  component: Kbd,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Kbd>Ctrl</Kbd>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const kbd = canvas.getByText('Ctrl');

    // Test kbd is rendered
    await expect(kbd).toBeInTheDocument();
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="flex gap-2">
      <Kbd>Ctrl</Kbd>
      <Kbd>Shift</Kbd>
      <Kbd>Tab</Kbd>
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>Ctrl</Kbd>
      <span>+</span>
      <Kbd>K</Kbd>
    </KbdGroup>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>
        <Command className="size-3" />
      </Kbd>
      <span>+</span>
      <Kbd>K</Kbd>
    </KbdGroup>
  ),
};

export const InText: Story = {
  render: () => (
    <p className="text-sm">
      Press <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd> to open the command palette
    </p>
  ),
};
