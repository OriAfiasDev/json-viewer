import { Options, Parser, RowType } from '../types.ts';
import { getBlockRange, isEqual } from '../utils.ts';
import { useCallback, useEffect, useState } from 'react';

interface Props {
  json: string;
  parser: Parser;
  options: Options;
}

export const useViewer = ({ json, parser, options }: Props) => {
  const [rows, setRows] = useState<RowType[]>([]);
  const [isError, setIsError] = useState(false);
  const [collapsedRows, setCollapsedRows] = useState<number[][]>([]);

  const onCollapse = useCallback(
    (lineNumber: number, operation: 'collapse' | 'expand') => {
      const range = getBlockRange(rows, lineNumber);

      if (operation === 'expand') {
        setCollapsedRows((prev) => prev.filter((row) => !isEqual(row, range)));
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
    let parsedJson: RowType[] = [];
    try {
      parsedJson = parser(json);
      setIsError(false);
    } catch {
      setIsError(true);
    } finally {
      setRows(parsedJson);
      const shouldCollapseOnLoad = options.collapse?.enabled && options.collapse.collapsedOnLoad;
      if (shouldCollapseOnLoad) setCollapsedRows([parsedJson.map((row) => row.lineNumber)]);
    }
  }, [json, parser, options.collapse?.enabled, options.collapse?.collapsedOnLoad]);

  return { rows, collapsedRows, onCollapse, options, isError } as const;
};

export default useViewer;
