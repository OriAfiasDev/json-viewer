import { GetClassName } from './hooks/useClassName';
import { Collapse, Expand } from '../../assets';

interface Props {
  lineNumber: number;
  showLineNumbers?: boolean;
  getClassName: GetClassName;
  showCollapseIcon: boolean;
  onCollapse: () => void;
  isCollapsed: boolean;
}

export function RowLeftPanel(props: Props) {
  const { lineNumber, showLineNumbers, getClassName, showCollapseIcon, onCollapse, isCollapsed } = props;

  return (
    <span className={getClassName(['leftPanelContainer'])}>
      <span className={getClassName(['text', 'lineNumber'])}>
        {showLineNumbers && lineNumber}
        <span className={getClassName(['iconContainer', showCollapseIcon ? '' : 'hidden'])} onClick={onCollapse}>
          {isCollapsed ? <Expand height={12} width={12} /> : <Collapse height={12} width={12} />}
        </span>
      </span>
    </span>
  );
}
