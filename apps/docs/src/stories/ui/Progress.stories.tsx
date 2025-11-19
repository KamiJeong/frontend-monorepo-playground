import type { Meta, StoryObj } from '@storybook/react-vite';
import { Progress } from '@playground/ui/components/progress';
import { useEffect, useState } from 'react';
import { within, expect } from 'storybook/test';

const meta = {
  title: 'UI/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 50,
    className: 'w-[300px]',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const progressbar = canvas.getByRole('progressbar');

    // Test progressbar is rendered
    await expect(progressbar).toBeInTheDocument();
    await expect(progressbar).toHaveAttribute('aria-valuenow', '50');
  },
};

export const Zero: Story = {
  args: {
    value: 0,
    className: 'w-[300px]',
  },
};

export const Complete: Story = {
  args: {
    value: 100,
    className: 'w-[300px]',
  },
};

export const Animated: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0;
          }
          return prev + 10;
        });
      }, 500);

      return () => clearInterval(timer);
    }, []);

    return <Progress value={progress} className="w-[300px]" />;
  },
};
