import * as React from 'react';
import { Icon } from '../Icon/Icon.component';
import * as styles from './styles.scss';

export interface InputCheckboxProps {
  label: string;
  id: string;
  name: string;
  value: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: any;
}

export const InputCheckbox = ({ label, id, name, value, checked, disabled, onChange }: InputCheckboxProps) => {
  let labelStyles = styles.checkbox;

  if (disabled) labelStyles += ` ${styles.disabled}`;

  return (
    <label htmlFor={id} className={labelStyles}>
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        readOnly={!onChange}
        className={styles.input}
        aria-checked={checked}
        onChange={onChange}
      />
      {!checked ? <Icon name="check-box-inactive" /> : <Icon name="check-box-active" color="forrest" />}
      <span className={styles.label}>{label}</span>
    </label>
  );
};
