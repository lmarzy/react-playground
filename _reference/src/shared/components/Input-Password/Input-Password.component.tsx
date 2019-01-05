import * as React from 'react';
import { Icon } from '../Icon/Icon.component';
import { Input, Alert } from '..';

import * as styles from './styles.scss';

interface InputPasswordProps {
  value: string;
  touched: boolean;
  valid: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface InputPasswordState {
  showPassword: boolean;
  capsLockOn: boolean;
}

export class InputPassword extends React.Component<InputPasswordProps, InputPasswordState> {
  state = {
    showPassword: false,
    capsLockOn: false,
  } as InputPasswordState;

  handleTogglePassword = (): void => {
    const newState = { ...this.state };
    newState.showPassword = !newState.showPassword;
    this.setState(newState);
  };

  handleCapsLockOn = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    const newState = { ...this.state };
    const capsLockIsOn = event.getModifierState && event.getModifierState('CapsLock');
    newState.capsLockOn = capsLockIsOn;
    this.setState(newState);
  };

  render() {
    const { value, touched, valid, onChange } = this.props;
    const { showPassword, capsLockOn } = this.state;

    return (
      <div className={styles.inputPassword}>
        <div className="u-mb-t">
          <Input
            type={!showPassword ? 'password' : 'text'}
            label="Password"
            id="password"
            value={value}
            onKeyDown={this.handleCapsLockOn}
            onChange={onChange}
          />

          <button type="button" className={styles.passwordRevealBtn} onClick={this.handleTogglePassword}>
            <span className="u-hidden-visually">Show password</span>
            <Icon name="show" />
          </button>
        </div>

        {!valid && touched && (
          <div className="u-mb-t">
            <Alert id="emailValidation" arrow="center" error>
              <p>Please enter a valid password</p>
            </Alert>
          </div>
        )}

        {capsLockOn && (
          <p className={styles.capsLock}>
            <Icon name="flag" />
            Caps lock is on
          </p>
        )}
      </div>
    );
  }
}
