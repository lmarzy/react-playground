import * as React from 'react';
import {
  AccordionItem,
  Input,
  Button,
  TextLink,
  Icon,
  Alert,
  DefinitionList,
  InputPassword,
} from '../../../../shared/components';
import validate from '../../../../utils/validation';

import * as styles from './styles.scss';
import { LoginRoutes } from '../../../login/login.routes';

interface AccountCreationProps {
  duplicateUserName: boolean;
  status: { isActive: boolean; isComplete: boolean };
  email: string;
  isReadOnlyMode: boolean;
  onToggleAccountCreationActive: () => void;
  onToggleAccountCreationSectionComplete: (isComplete: boolean) => void;
  onHandleAccountCreationComplete: (emailAddress: string, password: string) => void;
}

interface AccountCreationInput {
  value: string;
  valid: boolean;
  touched: boolean;
}

const initialState = {
  inputs: {
    email: {
      value: '',
      valid: false,
      touched: false,
    } as AccountCreationInput,
    password: {
      value: '',
      valid: false,
      touched: false,
    } as AccountCreationInput,
  } as { [key: string]: AccountCreationInput },
  isComplete: false,
};

type AccountCreationState = Readonly<typeof initialState>;

export class AccountCreationComponent extends React.Component<AccountCreationProps, AccountCreationState> {
  readonly state: AccountCreationState = initialState;

  componentWillMount(): void {
    const { email, isReadOnlyMode } = this.props;
    const newState = { ...this.state };

    if (email) {
      newState.inputs.email.value = email;
      newState.inputs.email.valid = true;
      newState.inputs.email.touched = true;
    }

    newState.isComplete = isReadOnlyMode;
    this.setState(newState);
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = event.target;
    const newState = { ...this.state };
    newState.inputs[id].value = value;
    newState.inputs[id].touched = true;
    newState.inputs[id].valid = true;
    newState.isComplete = false;
    this.setState(newState, () => this.props.onToggleAccountCreationSectionComplete(newState.isComplete));
  };

  handleDoneSubmit = (event: React.FormEvent<HTMLInputElement>): void => {
    event.preventDefault();

    const { email, password } = this.state.inputs;

    this.validateInputField('email', email.value);
    this.validateInputField('password', password.value);

    this.props.onToggleAccountCreationSectionComplete(this.state.isComplete);

    if (email.valid && password.valid) {
      this.props.onHandleAccountCreationComplete(email.value, password.value);
    }
  };

  private validateInputField = (fieldId: string, fieldValue: string): void => {
    const newState = { ...this.state };

    if (validate(fieldId, fieldValue)) {
      newState.inputs[fieldId].valid = true;
      newState.isComplete = true;
    } else {
      newState.inputs[fieldId].valid = false;
      newState.inputs[fieldId].touched = true;
      newState.isComplete = false;
    }
    this.setState(newState);
  };

  render(): JSX.Element {
    const { status, onToggleAccountCreationActive, duplicateUserName } = this.props;
    const { inputs, isComplete } = this.state;

    const inputsValid = inputs.email.valid && inputs.password.valid;

    return (
      <AccordionItem
        title="Set up your account"
        status={{ isActive: status.isActive, isComplete: status.isComplete }}
        completeText={'Password set'}
        invalidText={duplicateUserName ? 'Duplicate username' : ''}
        handleToggle={onToggleAccountCreationActive}
      >
        {this.props.isReadOnlyMode ? (
          <React.Fragment>
            <DefinitionList
              items={[
                {
                  label: 'Email',
                  value: inputs.email.value,
                },
              ]}
            />
            <p>Your email and password can be changed after you have built your budget.</p>
          </React.Fragment>
        ) : (
          <form noValidate>
            <fieldset>
              <legend className="u-hidden-visually">Set up your account</legend>

              <div className="u-mb-m">
                <div className="u-mb-t">
                  <Input
                    type="email"
                    label="Email"
                    id="email"
                    value={inputs.email.value}
                    onChange={this.handleInputChange}
                  />
                </div>
                {!inputs.email.valid && inputs.email.touched && (
                  <div className="u-mb-t">
                    <Alert id="emailValidation" arrow="center" error>
                      <p>Please enter a valid email</p>
                    </Alert>
                  </div>
                )}
                {this.props.duplicateUserName && (
                  <div className="u-mb-t">
                    <Alert id="emailValidation" arrow="center" error>
                      <p>
                        A user with that email already exists in Tully.{' '}
                        <TextLink text="Click here to login" to={LoginRoutes.Login} />
                      </p>
                    </Alert>
                  </div>
                )}
              </div>

              <InputPassword
                value={inputs.password.value}
                valid={inputs.password.valid}
                touched={inputs.password.touched}
                onChange={this.handleInputChange}
              />

              <p className="u-mb-s">
                Passwords must be <strong>at least 8</strong> characters.
              </p>

              <p className="u-mb-s">Choose a password that can't be easily guessed by people who know you.</p>

              <p className="u-mb-s">Try three random words that are easy to remember.</p>

              <div className="u-mb-m">
                <TextLink to={LoginRoutes.Login} text="I already have a Tully account" />
              </div>

              {!this.props.duplicateUserName && (
                <div className="u-align-right">
                  <Button
                    type="submit"
                    secondary
                    main
                    disabled={!inputsValid && !isComplete}
                    onClick={this.handleDoneSubmit}
                  >
                    Done
                  </Button>
                </div>
              )}
            </fieldset>
          </form>
        )}
      </AccordionItem>
    );
  }
}
