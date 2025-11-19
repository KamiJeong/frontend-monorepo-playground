import type { Meta, StoryObj } from '@storybook/react-vite';
import { Mail, ChevronRight } from 'lucide-react';
import { fn, expect, userEvent, within } from 'storybook/test';
import { Button } from '@playground/ui/components/button';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'The visual style variant of the button',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon', 'icon-sm', 'icon-lg'],
      description: 'The size of the button',
    },
    asChild: {
      control: 'boolean',
      description: 'Render as a child element using Radix UI Slot',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Button' });

    // Test button is rendered
    await expect(button).toBeInTheDocument();

    // Test button is clickable
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalled();
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link',
  },
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

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Mail />
        Login with Email
      </>
    ),
  },
};

export const IconOnly: Story = {
  args: {
    size: 'icon',
    children: <ChevronRight />,
  },
};

export const IconSmall: Story = {
  args: {
    size: 'icon-sm',
    children: <ChevronRight />,
  },
};

export const IconLarge: Story = {
  args: {
    size: 'icon-lg',
    children: <ChevronRight />,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Disabled' });

    // Test button is disabled
    await expect(button).toBeDisabled();

    // Test click doesn't trigger onClick when disabled

    await expect(async () => {
      await userEvent.click(button);
    }).rejects.toThrow();

    // disabled라서 onClick은 호출되지 않아야 한다
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const Loading: Story = {
  args: {
    disabled: true,
    children: (
      <>
        <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        Loading...
      </>
    ),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <Button variant="default">Default</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="icon-sm">
          <ChevronRight />
        </Button>
        <Button size="icon">
          <ChevronRight />
        </Button>
        <Button size="icon-lg">
          <ChevronRight />
        </Button>
      </div>
    </div>
  ),
};
