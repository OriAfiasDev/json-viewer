import { Options, Parser, RowType, Theme } from './types.ts';
import { parseJSON } from './utils.ts';
import Row from './Row.tsx';
import classes from './styles/JSONViewer.module.css';
import { useViewer, useClassName } from './hooks';

interface JSONViewerProps {
  json: string;
  parser?: Parser;
  theme?: Theme;
  tabSize?: 2 | 4;
  showLineNumbers?: boolean;
  beforeLine?: (row: RowType) => React.ReactNode;
  afterLine?: (row: RowType) => React.ReactNode;
  collapseEnabled?: boolean;
  collapsedOnLoad?: boolean;
}

export const JSONViewer: React.FC<JSONViewerProps> = ({
  json,
  parser = parseJSON,
  theme = 'light',
  tabSize = 4,
  showLineNumbers = true,
  collapseEnabled = true,
  collapsedOnLoad = false,
  beforeLine,
  afterLine,
}) => {
  const options: Options = {
    tabSize,
    showLineNumbers,
    collapse: {
      enabled: collapseEnabled,
      collapsedOnLoad: collapsedOnLoad,
    },
    beforeLine,
    afterLine,
  };

  const { rows, collapsedRows, onCollapse, isError } = useViewer({ json, parser, options });
  const getClassName = useClassName({ theme, module: classes });

  if (isError) {
    return <div className={getClassName(['container', 'error'])}>Invalid JSON</div>;
  }

  return (
    <div className={getClassName(['container'])}>
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
