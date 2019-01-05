import * as React from 'react';
import { Icon } from '../Icon/Icon.component';
import * as styles from './styles.scss';

interface CounterComponentProps {
  label: string;
  labelSub?: string;
  id: string;
  value: number;
  maxValue: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
}

export const CounterComponent = (props: CounterComponentProps): JSX.Element => (
  <div className={styles.container}>
    <label htmlFor={props.id}>
      <span>{props.label}</span>
      {props.labelSub && <span>{props.labelSub}</span>}
    </label>
    <div className={styles.wrap}>
      <button type="button" className={styles.button} onClick={props.handleDecrement} disabled={props.value === 0}>
        <span className="u-hidden-visually">Add</span>
        <Icon name="minus-circle" />
      </button>
      <input type="text" id={props.id} value={props.value} className={styles.input} disabled />
      <button
        type="button"
        className={styles.button}
        onClick={props.handleIncrement}
        disabled={props.value === props.maxValue}
      >
        <span className="u-hidden-visually">Subtract</span>
        <Icon name="plus-circle" />
      </button>
    </div>
  </div>
);
