import * as React from 'react';
import * as styles from './styles.scss';

export interface GridRowProps {
  children: React.ReactNode;
}

export const GridRow = ({ children }: GridRowProps) => <div className={styles.gridRow}>{children}</div>;
