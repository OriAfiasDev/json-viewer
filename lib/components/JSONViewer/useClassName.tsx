import { Theme } from './types';
import { getClassName } from './utils';

interface Props {
  theme: Theme;
  module: CSSModuleClasses;
}

type GetClassName = (keys: (keyof CSSModuleClasses)[]) => string;

export const useClassName = ({ theme, module }: Props): GetClassName => {
  const getClass: GetClassName = (keys) =>
    getClassName(
      theme,
      keys.map((key) => module[key])
    );

  return getClass;
};
