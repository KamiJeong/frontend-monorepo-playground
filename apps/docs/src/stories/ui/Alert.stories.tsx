import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert, AlertDescription, AlertTitle } from '@playground/ui/components/alert';
import { Terminal, AlertCircle } from 'lucide-react';
import { within, expect } from 'storybook/test';

const meta = {
  title: 'UI/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive'],
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Alert {...args}>
      <Terminal />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>You can add components to your app using the cli.</AlertDescription>
    </Alert>
  ),
  args: {
    variant: 'default',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test alert content is rendered
    await expect(canvas.getByText('Heads up!')).toBeInTheDocument();
    await expect(
      canvas.getByText('You can add components to your app using the cli.'),
    ).toBeInTheDocument();
  },
};

export const Destructive: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertCircle />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
    </Alert>
  ),
  args: {
    variant: 'destructive',
  },
};
