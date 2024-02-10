import type { Meta, StoryObj } from '@storybook/react';

import { JSONViewer } from '../../lib/main';

const meta = {
  title: 'Example/JSONViewer',
  component: JSONViewer,
  parameters: {},
  tags: ['autodocs'],
} satisfies Meta<typeof JSONViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultLight: Story = {
  args: {
    json: `{"foo": "bar"}`,
  },
};

export const DefaultDark: Story = {
  args: {
    json: `{"foo": "bar"}`,
    theme: 'dark',
  },
};

export const TabSize2: Story = {
  args: {
    json: `{"foo": "bar"}`,
    tabSize: 2,
  },
};

export const NoLineNumbers: Story = {
  args: {
    json: `{"foo": "bar"}`,
    showLineNumbers: false,
  },
};

export const NoCollapse: Story = {
  args: {
    json: `{"foo": "bar"}`,
    collapseEnabled: false,
  },
};

export const CollapseOnLoad: Story = {
  args: {
    json: `{"foo": "bar"}`,
    collapsedOnLoad: true,
  },
};
