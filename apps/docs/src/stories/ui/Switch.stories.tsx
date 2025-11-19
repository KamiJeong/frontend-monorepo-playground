import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Switch } from '@playground/ui/components/switch';
import { Label } from '@playground/ui/components/label';

const meta = {
  title: 'UI/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const switchButton = canvas.getByRole('switch');

    // Test switch is rendered
    await expect(switchButton).toBeInTheDocument();

    // Test switch can be toggled
    await userEvent.click(switchButton);
    await expect(switchButton).toHaveAttribute('data-state', 'checked');

    // Test switch can be untoggled
    await userEvent.click(switchButton);
    await expect(switchButton).toHaveAttribute('data-state', 'unchecked');
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
      <Switch id="airplane-mode" {...args} />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText('Airplane Mode');
    const switchButton = canvas.getByRole('switch');

    // Test label is rendered
    await expect(label).toBeInTheDocument();

    // Test clicking label toggles switch
    await userEvent.click(label);
    await expect(switchButton).toHaveAttribute('data-state', 'checked');
  },
};
