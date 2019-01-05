import * as React from 'react';
import { Icon } from '../Icon/Icon.component';
import * as styles from './styles.scss';

export interface InputRadioProps {
  label: string;
  id: string;
  name: string;
  value: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: () => void;
}

export const InputRadio = ({ label, id, name, value, checked, disabled, onChange }: InputRadioProps) => (
  <label htmlFor={id} className={styles.checkbox}>
    <input
      type="radio"
      id={id}
      name={name}
      value={value}
      checked={checked}
      disabled={disabled}
      className={styles.input}
      aria-checked={checked}
      onChange={onChange}
    />
    {!checked ? <Icon name="radio-inactive" /> : <Icon name="radio-active" />}
    <span className={styles.label}>{label}</span>
  </label>
);
