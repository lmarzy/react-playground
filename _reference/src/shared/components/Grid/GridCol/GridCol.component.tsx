import * as React from 'react';
import * as styles from './styles.scss';

export interface GridColProps {
  children: React.ReactNode;
}

export const GridCol = ({ children }: GridColProps) => <div className={styles.gridCol}>{children}</div>;
