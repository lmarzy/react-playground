import * as React from 'react';
import { icons } from './icons';
import * as styles from './styles.scss';

interface IconProps {
  name: string;
  color?: string;
}

export const Icon = ({ name, color }: IconProps) => {
  const paths = icons[name].map((path: any) => {
    // @ts-ignore
    return <path key={path.d} className={color ? styles[color] : styles[path.fill]} d={path.d} />;
  });

  return (
    <svg width="15" height="15" viewBox="0 0 15 15" aria-hidden="true">
      {paths}
    </svg>
  );
};
