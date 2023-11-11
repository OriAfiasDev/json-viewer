import { Options, Parser, RowType, Theme } from './types.ts';
import { getBlockRange, getClassName, parseJSON } from './utils.ts';
import { DEFAULT_OPTIONS } from './constants';
import Row from './Row.tsx';
import { useCallback, useEffect, useState } from 'react';
import classes from './JSONViewer.module.css';

interface JSONViewerProps {
  json: string;
  parser?: Parser;
  options?: Options;
  theme?: Theme;
}

export const JSONViewer: React.FC<JSONViewerProps> = ({
  json,
  parser = parseJSON,
  options = DEFAULT_OPTIONS,
  theme = 'light',
}) => {
  const [rows, setRows] = useState<RowType[]>([]);
  const [collapsedRows, setCollapsedRows] = useState<number[][]>([]);

  const onCollapse = useCallback(
    (lineNumber: number, operation: 'collapse' | 'expand') => {
      const range = getBlockRange(rows, lineNumber);

      if (operation === 'expand') {
        setCollapsedRows((prev) => prev.filter((row) => row === range));
      } else {
        setCollapsedRows((prev) => [...prev, range]);
      }
    },
    [rows]
  );

  useEffect(() => {
    const parsedJson = parser(json);
    setRows(parsedJson);

    const shouldCollapseOnLoad = options.collapse.enabled && options.collapse.collapsedOnLoad;
    if (shouldCollapseOnLoad) setCollapsedRows([parsedJson.map((row) => row.lineNumber)]);
  }, [json, parser, options.collapse]);

  return (
    <div className={getClassName(theme, [classes.container])}>
      {rows.map((row) => (
        <Row
          key={row.id}
          row={row}
          theme={theme}
          options={options}
          isCollapsed={collapsedRows.some((block) => block.includes(row.lineNumber))}
          onCollapse={onCollapse}
          isMiddleOfBlock={!collapsedRows.some((block) => [block[0], block[block.length - 1]].includes(row.lineNumber))}
        />
      ))}
    </div>
  );
};

export default JSONViewer;
