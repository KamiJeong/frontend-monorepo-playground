import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Checkbox } from '@playground/ui/components/checkbox';
import { Label } from '@playground/ui/components/label';

const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');

    // Test checkbox is rendered
    await expect(checkbox).toBeInTheDocument();

    // Test checkbox can be clicked
    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();

    // Test checkbox can be unchecked
    await userEvent.click(checkbox);
    await expect(checkbox).not.toBeChecked();
  },
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" {...args} />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');
    const label = canvas.getByText('Accept terms and conditions');

    // Test label is rendered
    await expect(label).toBeInTheDocument();

    // Test clicking label toggles checkbox
    await userEvent.click(label);
    await expect(checkbox).toBeChecked();
  },
};
