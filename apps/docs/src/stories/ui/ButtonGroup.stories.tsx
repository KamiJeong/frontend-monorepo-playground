import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@playground/ui/components/button';
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from '@playground/ui/components/button-group';
import { within, expect } from 'storybook/test';

const meta = {
  title: 'UI/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Left</Button>
      <Button variant="outline">Center</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test all buttons are rendered
    await expect(canvas.getByRole('button', { name: 'Left' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Center' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Right' })).toBeInTheDocument();
  },
};

export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical">
      <Button variant="outline">Left</Button>
      <Button variant="outline">Center</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup>
  ),
};

export const WithSeparator: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Action 1</Button>
      <ButtonGroupSeparator />
      <Button variant="outline">Action 2</Button>
      <ButtonGroupSeparator />
      <Button variant="outline">Action 3</Button>
    </ButtonGroup>
  ),
};

export const WithText: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Click</Button>
      <ButtonGroupText>Label</ButtonGroupText>
      <Button variant="outline">Submit</Button>
    </ButtonGroup>
  ),
};
