import * as React from 'react';
import { Icon } from '../../../shared/components';
import * as styles from './styles.scss';

export interface InputProps {
  label: string;
  labelHidden?: boolean;
  id: string;
  type?: string;
  value?: string;
  maxLength?: number;
  placeholder?: string;
  icon?: string;
  isInvalid?: boolean;
  errorText?: string;
  onKeyDown?: any;
  onBlur?: any;
  onChange: any;
}

export const Input = ({
  type = 'text',
  id,
  label,
  labelHidden,
  value,
  maxLength,
  placeholder,
  icon,
  isInvalid,
  onKeyDown,
  onBlur,
  onChange,
}: InputProps) => {
  let labelStyles = styles.label;
  let inputWrapStyles = styles.inputWrap;
  let inputStyles = styles.input;

  if (labelHidden) labelStyles += ' u-hidden-visually';
  // @ts-ignore
  if (icon) inputWrapStyles += ` ${styles[icon]}`;
  if (isInvalid) inputStyles += ` ${styles.isInvalid}`;

  const inputProps = {
    ['type']: type,
    ['id']: id,
    ['name']: id,
    ['value']: value,
    ['maxLength']: maxLength,
    ['placeholder']: placeholder,
    ['className']: inputStyles,
    ['onKeyDown']: onKeyDown,
    ['onBlur']: onBlur,
    ['onChange']: onChange,
  };

  return (
    <React.Fragment>
      <label htmlFor={id} className={labelStyles}>
        {label}
      </label>

      {icon && (
        <div className={inputWrapStyles}>
          <input {...inputProps} />
          {icon && <Icon name={icon} />}
        </div>
      )}
      {!icon && <input {...inputProps} />}
    </React.Fragment>
  );
};
