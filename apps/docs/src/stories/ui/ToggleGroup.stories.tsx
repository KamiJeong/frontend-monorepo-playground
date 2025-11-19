import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToggleGroup, ToggleGroupItem } from '@playground/ui/components/toggle-group';
import { Bold, Italic, Underline } from 'lucide-react';
import { within, expect, userEvent } from 'storybook/test';

const meta = {
  title: 'UI/ToggleGroup',
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
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  render: () => (
    <ToggleGroup type="single" variant="outline">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold />
      </ToggleGroupItem>

      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <Underline />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const boldToggle = canvas.getByLabelText('Toggle bold');
    const italicToggle = canvas.getByLabelText('Toggle italic');

    // Test toggles are rendered
    await expect(boldToggle).toBeInTheDocument();
    await expect(italicToggle).toBeInTheDocument();

    // Test single selection
    await userEvent.click(boldToggle);
    await expect(boldToggle).toHaveAttribute('data-state', 'on');

    // Test switching selection
    await userEvent.click(italicToggle);
    await expect(italicToggle).toHaveAttribute('data-state', 'on');
    await expect(boldToggle).toHaveAttribute('data-state', 'off');
  },
};

export const Multiple: Story = {
  render: () => (
    <ToggleGroup type="multiple" variant="outline">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold />
      </ToggleGroupItem>

      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <Underline />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};
export const WithText: Story = {
  render: () => (
    <ToggleGroup type="single" variant="outline">
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  ),
};
export const WithSpacing: Story = {
  render: () => (
    <ToggleGroup type="single" variant="outline" spacing={2}>
      <ToggleGroupItem value="bold">
        <Bold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic">
        <Italic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline">
        <Underline />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};
