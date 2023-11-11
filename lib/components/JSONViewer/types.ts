export type ValueType = 'object' | 'array' | 'string' | 'number' | 'boolean' | 'null';
export type Position = 'start' | 'end' | 'middle';

export type RowType = {
  id: string;
  position: Position;
  key: string;
  fullPathKey: string;
  value: unknown;
  valueType: ValueType;
  isLast: boolean;
  depth: number;
  lineNumber: number;
  isPrimitive: boolean;
};

export type Parser = (value: string) => RowType[];

export type Options = {
  showLineNumbers?: boolean;
  tabSize: 2 | 4;
  beforeLine?: (row: RowType) => React.ReactNode;
  afterLine?: (row: RowType) => React.ReactNode;
  collapse: {
    collapsedOnLoad?: boolean;
    enabled?: boolean;
  };
};

export type Theme = 'light' | 'dark';
