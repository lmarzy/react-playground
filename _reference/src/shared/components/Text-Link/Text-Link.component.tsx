import * as React from 'react';
import { Link } from 'react-router-dom';

import * as styles from './styles.scss';

interface TextLinkProps {
  to: string;
  text: string;
  onClick?: () => void;
}

export const TextLink = ({ to, text, onClick }: TextLinkProps) => (
  <Link to={to} className={styles.textLink} onClick={onClick}>
    {text}
  </Link>
);
