// import styled from 'styled-components';
import { Options, RowType, Theme } from './types.ts';
import { displayBrackets, getClassName } from './utils.ts';
import { Collapse, Expand } from '../../assets';
import { useCallback } from 'react';
import classes from './Row.module.css';

//TODO: handle context menu ?

interface RowProps {
  row: RowType;
  theme: Theme;
  options: Options;
  isCollapsed: boolean;
  onCollapse: (lineNumber: number, operation: 'collapse' | 'expand') => void;
  isMiddleOfBlock?: boolean;
}

const Row: React.FC<RowProps> = ({ row, theme, options, isCollapsed, isMiddleOfBlock, onCollapse }) => {
  const isCollapsable = !row.isPrimitive && row.position === 'start';
  const shouldDisplayLeftPanel = options.showLineNumbers || options.collapse.enabled;

  const onCollapseClick = useCallback(() => {
    onCollapse(row.lineNumber, isCollapsed ? 'expand' : 'collapse');
  }, [row.lineNumber, isCollapsed, onCollapse]);

  if (isCollapsed && isMiddleOfBlock) return null;

  return (
    <div className={getClassName(theme, [classes.wrapper])}>
      <span className={classes.container}>
        {shouldDisplayLeftPanel && (
          <span className={getClassName(theme, [classes.leftPanelContainer])}>
            <span className={getClassName(theme, [classes.text, classes.lineNumber])}>
              {options.showLineNumbers && row.lineNumber}
              <span
                className={getClassName(theme, [
                  classes.iconContainer,
                  options.collapse.enabled && isCollapsable ? '' : classes.hidden,
                ])}
                onClick={onCollapseClick}
              >
                {isCollapsed ? <Expand height={12} width={12} /> : <Collapse height={12} width={12} />}
              </span>
            </span>
          </span>
        )}
        <span className={getClassName(theme, [classes.indent, classes[`indent-${options.tabSize}-${row.depth}`]])} />
        {options.beforeLine?.(row)}
        {row.key && <span className={getClassName(theme, [classes.text, classes.key])}>"{row.key}":&nbsp;</span>}
        <span className={getClassName(theme, [classes.text, classes.bracket])}>{displayBrackets(row)}</span>
        {row.isPrimitive && (
          <span className={getClassName(theme, [classes.text, classes[row.valueType]])}>{`${row.value}`}</span>
        )}
        {!row.isLast && row.isPrimitive && (
          <span className={getClassName(theme, [classes.text, classes.bracket])}>,</span>
        )}
        {options.afterLine?.(row)}
      </span>
    </div>
  );
};

export default Row;
