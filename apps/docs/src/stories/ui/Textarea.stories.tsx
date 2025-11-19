import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Textarea } from '@playground/ui/components/textarea';

const meta = {
  title: 'UI/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Type your message here...',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByPlaceholderText('Type your message here...');

    // Test textarea is rendered
    await expect(textarea).toBeInTheDocument();

    // Test textarea can receive text
    await userEvent.type(textarea, 'Hello World');
    await expect(textarea).toHaveValue('Hello World');
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled',
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: 'This is a sample text in the textarea component.',
  },
};
