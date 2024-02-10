import { Options, RowType, Theme } from './types.ts';
import { displayBrackets } from './utils.ts';
import { Collapse, Expand } from '../../assets';
import { useCallback } from 'react';
import classes from './styles/Row.module.css';
import { useClassName } from './hooks';

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
  const shouldDisplayLeftPanel = options?.showLineNumbers || options?.collapse?.enabled;

  const collapseIconProps = { height: 16, width: 16, className: getClassName(['collapseIcon']) };

  const onCollapseClick = useCallback(() => {
    onCollapse(row.lineNumber, isCollapsed ? 'expand' : 'collapse');
  }, [row.lineNumber, isCollapsed, onCollapse]);

  if (isCollapsed && isMiddleOfBlock) return null;

  return (
    <span className={classes.container}>
      {shouldDisplayLeftPanel && (
        <span className={getClassName(['leftPanelContainer'])}>
          <span className={getClassName(['text', 'lineNumber'])}>
            {options.showLineNumbers && String(row.lineNumber).padStart(2, '0')}
            <span
              className={getClassName(['iconContainer', options.collapse?.enabled && isCollapsable ? '' : 'hidden'])}
              onClick={onCollapseClick}
            >
              {isCollapsed ? <Expand {...collapseIconProps} /> : <Collapse {...collapseIconProps} />}
            </span>
          </span>
        </span>
      )}
      <span className={getClassName(['indent', `indent-${options.tabSize || 4}-${row.depth}`])} />
      {options.beforeLine?.(row)}
      {row.key && <span className={getClassName(['text', 'key'])}>"{row.key}":&nbsp;</span>}
      <span className={getClassName(['text', 'bracket'])}>{displayBrackets(row)}</span>
      {row.isPrimitive && (
        <span className={getClassName(['text', row.valueType])}>
          {`${row.value}`}
          {!row.isLast && row.position !== 'start' && <span className={getClassName(['bracket'])}>,</span>}
        </span>
      )}
      {options.afterLine?.(row)}
    </span>
  );
};

export default Row;
