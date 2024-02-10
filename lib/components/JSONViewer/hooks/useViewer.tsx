import { Options, Parser, RowType } from '../types.ts';
import { getBlockRange } from '../utils.ts';
import { useCallback, useEffect, useState } from 'react';

interface Props {
  json: string;
  parser: Parser;
  options: Options;
}

export const useViewer = ({ json, parser, options }: Props) => {
  const [rows, setRows] = useState<RowType[]>([]);
  const [collapsedRows, setCollapsedRows] = useState<number[][]>([]);

  const onCollapse = useCallback(
    (lineNumber: number, operation: 'collapse' | 'expand') => {
      const range = getBlockRange(rows, lineNumber);

      if (operation === 'expand') {
        setCollapsedRows((prev) => prev.filter((row) => row === range));
      } else {
        setCollapsedRows((prev) => {
          const includedPrevRange = prev.filter((row) => !range.toString().includes(row.toString()));
          return [...includedPrevRange, range];
        });
      }
    },
    [rows]
  );

  useEffect(() => {
    const parsedJson = parser(json);
    setRows(parsedJson);

    const shouldCollapseOnLoad = options.collapse?.enabled && options.collapse.collapsedOnLoad;
    if (shouldCollapseOnLoad) setCollapsedRows([parsedJson.map((row) => row.lineNumber)]);
  }, [json, parser, options.collapse]);

  return { rows, collapsedRows, onCollapse, options } as const;
};

export default useViewer;
