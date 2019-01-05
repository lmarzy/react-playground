import * as React from 'react';
import * as styles from './styles.scss';

interface AccordionItemProps {
  children: React.ReactNode;
}

export const AccordionContainer = ({ children }: AccordionItemProps) => (
  <dl className={styles.container}>{children}</dl>
);
