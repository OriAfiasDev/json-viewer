import { Options, Parser, Theme } from './types.ts';
import { parseJSON } from './utils.ts';
import { DEFAULT_OPTIONS } from './constants';
import Row from './Row.tsx';
import classes from './JSONViewer.module.css';
import useViewer from './useViewer.tsx';
import { useClassName } from './useClassName.tsx';

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
  const { rows, collapsedRows, onCollapse } = useViewer({ json, parser, options });
  const getClassName = useClassName({ theme, module: classes });

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
