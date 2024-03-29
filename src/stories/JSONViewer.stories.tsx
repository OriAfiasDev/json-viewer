import type { Meta, StoryObj } from '@storybook/react';

import { JSONViewer } from '../../lib/main';

const meta = {
  title: 'JSONViewer',
  component: JSONViewer,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    afterLine: {
      description: 'a component to be rendered after each line.',
    },
    beforeLine: {
      description: 'a component to be rendered before each line.',
    },
    parser: {
      if: {
        arg: 'json',
        eq: true,
      },
    },
  },
} satisfies Meta<typeof JSONViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultLight: Story = {
  name: 'Theme/Light',
  args: {
    json: `{"foo": "bar"}`,
  },
};

export const DefaultDark: Story = {
  name: 'Theme/Dark',
  args: {
    json: `{"foo": "bar"}`,
    theme: 'dark',
  },
};

export const TabSize2: Story = {
  name: 'tabSize/2',
  args: {
    json: `{"foo": "bar"}`,
    tabSize: 2,
  },
};

export const TabSize4: Story = {
  name: 'tabSize/4',
  args: {
    json: `{"foo": "bar"}`,
    tabSize: 4,
  },
};

export const LineNumbers: Story = {
  name: 'showLineNumbers/True',
  args: {
    json: `{"foo": "bar"}`,
  },
};

export const NoLineNumbers: Story = {
  name: 'showLineNumbers/False',
  args: {
    json: `{"foo": "bar"}`,
    showLineNumbers: false,
  },
};

export const Collapse: Story = {
  name: 'collapseEnabled/True',
  args: {
    json: `{"foo": "bar"}`,
    collapseEnabled: true,
  },
};

export const NoCollapse: Story = {
  name: 'collapseEnabled/False',
  args: {
    json: `{"foo": "bar"}`,
    collapseEnabled: false,
  },
};

export const CollapseOnLoad: Story = {
  name: 'collapsedOnLoad/True',
  args: {
    json: `{"foo": "bar"}`,
    collapseEnabled: true,
    collapsedOnLoad: true,
  },
};

export const NoCollapseOnLoad: Story = {
  name: 'collapsedOnLoad/False',
  args: {
    json: `{"foo": "bar"}`,
    collapsedOnLoad: false,
  },
};

export const BeforeLine: Story = {
  name: 'beforeLine',
  args: {
    json: `{"foo": "bar"}`,
    beforeLine: (row) =>
      row.isPrimitive && <span style={{ fontSize: 8, color: 'gray', verticalAlign: 'sub' }}>{row.valueType}</span>,
  },
};

export const AfterLine: Story = {
  name: 'afterLine',
  args: {
    json: `{"foo": "bar"}`,
    afterLine: (row) => row.isPrimitive && <span style={{ fontSize: 8, color: 'gray' }}>{row.valueType}</span>,
  },
};
