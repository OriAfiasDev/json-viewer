import { Parser, Position, RowType, Theme, ValueType } from './types.ts';
import { v4 as uuid } from 'uuid';

const getValueType = (value: unknown): ValueType =>
  Array.isArray(value) ? 'array' : value === null ? 'null' : (typeof value as ValueType);

const getValue = (value: unknown, valueType: ValueType) =>
  valueType === 'string' ? `"${value}"` : valueType === 'null' ? 'null' : value;

const primitiveTypes: ValueType[] = ['string', 'number', 'boolean', 'null'];

const createRow = (
  key: string,
  fullPathKey: string,
  value: unknown,
  valueType: ValueType,
  depth: number,
  position: Position,
  isLast: boolean,
  lineNumber: number
): RowType => ({
  id: uuid(),
  key,
  fullPathKey,
  value: getValue(value, valueType),
  isPrimitive: primitiveTypes.includes(valueType),
  valueType,
  isLast,
  depth,
  position,
  lineNumber,
});

export const parseJSON: Parser = (input) => {
  const stack: RowType[] = [];
  const json = JSON.parse(input);

  const traverse = (value: unknown, fullPathKey: string, key: string, depth: number): void => {
    //while creating a row we can't tell if it's the last row, so we need to update the previous row.
    if (stack.length) stack[stack.length - 1].isLast = false;

    const valueType = getValueType(value);
    const position: Position = primitiveTypes.includes(valueType) ? 'middle' : 'start';
    const isLast = true;

    stack.push(createRow(key, fullPathKey, value, valueType, depth, position, isLast, stack.length + 1));

    if (valueType === 'object') {
      Object.entries(value as object).forEach(([key, value]) => {
        const currentFullKey = fullPathKey ? `${fullPathKey}.${key}` : key;
        traverse(value, currentFullKey, key, depth + 1);
      });
      createClosingRow(stack, valueType, depth);
    } else if (valueType === 'array') {
      (value as unknown[]).forEach((value) => {
        traverse(value, '', '', depth + 1);
      });
      createClosingRow(stack, valueType, depth);
    }
  };

  traverse(json, '', '', 0);

  return stack;
};

const createClosingRow = (stack: RowType[], valueType: ValueType, depth: number) => {
  stack[stack.length - 1].isLast = true;
  const arrayClosingRow = createRow('', '', '', valueType, depth, 'end', true, stack.length + 1);
  stack.push(arrayClosingRow);
};

const brackets: { [key in ValueType]?: { [position in Position]: string } } = {
  object: { start: '{', end: '}', middle: '' },
  array: { start: '[', end: ']', middle: '' },
};

export const displayBrackets = (row: RowType) => {
  const { valueType, position } = row;
  return brackets[valueType]?.[position] || '';
};

export const getBlockRange = (rows: RowType[], start: number): number[] => {
  const range = [];
  let blocksCount = 0;
  const relevantRows = rows.slice(start - 1);

  for (let i = 0; i < relevantRows.length; i++) {
    const row = relevantRows[i];

    if (row.position === 'start') {
      blocksCount += 1;
    } else if (row.position === 'end') {
      blocksCount -= 1;
    }
    range.push(row.lineNumber);
    if (blocksCount === 0) {
      break;
    }
  }

  return range;
};

export const getClassName = (theme: Theme, classNames: string[], userClassName?: string) => {
  const generalClassName = 'json-viewer';
  const themeClassName = `json-viewer--${theme}`;
  const classes = [generalClassName, themeClassName, ...classNames];
  if (userClassName) classNames.push(userClassName);
  return classes.join(' ');
};
