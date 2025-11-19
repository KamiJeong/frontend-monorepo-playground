import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Input } from '@playground/ui/components/input';
import { Label } from '@playground/ui/components/label';

const meta = {
  title: 'UI/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Label',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText('Label');

    // Test label is rendered
    await expect(label).toBeInTheDocument();
  },
};

export const WithInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText('Email');
    const input = canvas.getByPlaceholderText('Email');

    // Test label and input are rendered
    await expect(label).toBeInTheDocument();
    await expect(input).toBeInTheDocument();

    // Test label is associated with input
    await expect(input).toHaveAttribute('id', 'email');
  },
};
