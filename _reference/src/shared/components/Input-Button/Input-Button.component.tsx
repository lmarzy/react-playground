import * as React from 'react';
import { Icon } from '..';
import * as styles from './styles.scss';

export interface InputButtonProps {
  type: string;
  label: string;
  name: string;
  id: string;
  value: string;
  icon?: string;
  disabled?: boolean;
  checked?: boolean;
  onChange?: () => void;
}
export const InputButton = ({
  type,
  label,
  name,
  id,
  value,
  checked,
  disabled,
  icon = 'tick',
  onChange,
}: InputButtonProps) => {
  let innerStyles = styles.inner;

  if (icon === 'tick') innerStyles += ` ${styles.tick}`;

  const inputProps = {
    ['type']: type,
    ['id']: id,
    ['name']: name,
    ['value']: value,
    ['checked']: checked,
    ['disabled']: disabled,
    ['className']: styles.input,
    ['aria-checked']: checked,
    ['onChange']: onChange,
  };

  return (
    <label htmlFor={id} className={styles.container}>
      <input {...inputProps} />
      <span className={innerStyles}>
        <Icon name={icon} color={checked ? 'forrest' : 'slate'} />
        <span>{label}</span>
      </span>
    </label>
  );
};
