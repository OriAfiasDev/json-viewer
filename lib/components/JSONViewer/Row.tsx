import { Options, RowType, Theme } from './types.ts';
import { displayBrackets } from './utils.ts';
import { useCallback } from 'react';
import classes from './styles/Row.module.css';
import { useClassName } from './hooks';
import { RowLeftPanel } from './RowLeftPanel.tsx';

interface RowProps {
  row: RowType;
  theme: Theme;
  options: Options;
  isCollapsed: boolean;
  onCollapse: (lineNumber: number, operation: 'collapse' | 'expand') => void;
  isMiddleOfBlock?: boolean;
}

const Row: React.FC<RowProps> = ({ row, theme, options, isCollapsed, isMiddleOfBlock, onCollapse }) => {
  const getClassName = useClassName({ theme, module: classes });
  const isCollapsable = !row.isPrimitive && row.position === 'start';
  const shouldDisplayLeftPanel = options.showLineNumbers || options.collapse.enabled;

  const onCollapseClick = useCallback(() => {
    onCollapse(row.lineNumber, isCollapsed ? 'expand' : 'collapse');
  }, [row.lineNumber, isCollapsed, onCollapse]);

  if (isCollapsed && isMiddleOfBlock) return null;

  return (
    <div className={getClassName(['wrapper'])}>
      <span className={classes.container}>
        {shouldDisplayLeftPanel && (
          <RowLeftPanel
            isCollapsed={isCollapsed}
            lineNumber={row.lineNumber}
            onCollapse={onCollapseClick}
            showCollapseIcon={Boolean(options.collapse.enabled && isCollapsable)}
            getClassName={getClassName}
            showLineNumbers={options.showLineNumbers}
          />
        )}

        <span className={getClassName(['indent', `indent-${options.tabSize}-${row.depth}`])} />
        {options.beforeLine?.(row)}
        {row.key && <span className={getClassName(['text', 'key'])}>"{row.key}":&nbsp;</span>}
        <span className={getClassName(['text', 'bracket'])}>{displayBrackets(row)}</span>
        {row.isPrimitive && <span className={getClassName(['text', row.valueType])}>{`${row.value}`}</span>}
        {!row.isLast && row.isPrimitive && <span className={getClassName(['text', 'bracket'])}>,</span>}
        {options.afterLine?.(row)}
      </span>
    </div>
  );
};

export default Row;
