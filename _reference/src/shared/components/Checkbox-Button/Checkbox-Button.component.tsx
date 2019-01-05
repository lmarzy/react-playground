import * as React from 'react';
import { Icon } from '../Icon/Icon.component';

import * as styles from './styles.scss';

interface CheckboxButtonProps {
  label: string;
  name: string;
  id: string;
  value: string;
  disabled?: boolean;
  checked?: boolean;
  onChange: any;
}

export const CheckboxButton = ({ label, name, id, value, disabled, checked, onChange }: CheckboxButtonProps) => (
  <label htmlFor={id} className={styles.checkboxBtn}>
    <input
      type="checkbox"
      id={id}
      name={name}
      value={value}
      checked={checked}
      disabled={disabled}
      className={styles.input}
      aria-checked={checked}
      onChange={onChange}
    />
    <span className={styles.inner}>
      <span className={styles.icon}>
        <Icon name="tick" color="forrest" />
      </span>
      <span>{label}</span>
    </span>
  </label>
);
