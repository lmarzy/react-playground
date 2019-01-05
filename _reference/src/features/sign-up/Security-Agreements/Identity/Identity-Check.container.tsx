import * as React from 'react';
import * as styles from './styles.scss';

import { AccordionItem, Input, Alert, Button } from '../../../../shared/components';
import { DateOfBirthFormModel } from './date-of-birth-form.model';
import { signUpAnalyticsService } from '../../sign-up-analytics.service';

interface IdentityCheckContainerProps {
  errors: {
    dateOfBirthInvalid: boolean;
    isInErroredState: boolean;
  };
  isReadOnly: boolean;
  onConfirmIdentity: (dateOfBirth: string) => void;
  onIdentityCheckError: () => void;
  onToggleIdentityActive: () => void;
  onToggleIdentityCheckSectionComplete: (isComplete: boolean) => void;
  onToggleIdentityCheckError: () => void;
  referrerName: string;
  status: { isActive: boolean; isComplete: boolean };
}

export class IdentityCheckContainer extends React.Component<IdentityCheckContainerProps> {
  state = {
    dateOfBirthForm: {
      day: '',
      month: '',
      year: '',
    } as DateOfBirthFormModel,
    isComplete: false,
    showInvalidDateError: false,
    showWhyWeNeedDateOfBirth: false,
  };

  handleDateOfBirthFormInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newState = { ...this.state };
    newState.isComplete = false;
    newState.showInvalidDateError = false;
    newState.dateOfBirthForm[event.target.id] = event.target.value;
    this.props.onToggleIdentityCheckError(); // make this better?
    this.setState(newState, () => this.props.onToggleIdentityCheckSectionComplete(newState.isComplete));
  };

  handleConfirmIdentitySubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const newState = { ...this.state };

    if (this.dateOfBirthIsValid(newState.dateOfBirthForm)) {
      newState.isComplete = true;
      this.setState(newState, () => this.props.onToggleIdentityCheckSectionComplete(newState.isComplete));
      this.props.onConfirmIdentity(
        `${newState.dateOfBirthForm.year}-${newState.dateOfBirthForm.month}-${newState.dateOfBirthForm.day}`,
      );
    } else {
      newState.isComplete = false;
      newState.showInvalidDateError = true;
      this.setState(newState);
    }
  };

  getDaysInMonth = (month: number, year: number): number => {
    switch (month) {
      case 2:
        return (year % 4 === 0 && year % 100) || year % 400 === 0 ? 29 : 28;
      case 4:
      case 6:
      case 9:
      case 11:
        return 30;
      default:
        return 31;
    }
  };

  dateOfBirthIsValid = (dateOfBirthForm: DateOfBirthFormModel): boolean => {
    const day = Number(dateOfBirthForm.day);
    const month = Number(dateOfBirthForm.month);
    const year = Number(dateOfBirthForm.year);
    return month > 0 && month <= 12 && day > 0 && day <= this.getDaysInMonth(month, year) && year > 0;
  };

  onToggleWhyWeNeedDateOfBirth = () => {
    signUpAnalyticsService.identityWhyWeNeedYourDateOfBirthClick();
    this.setState({
      showWhyWeNeedDateOfBirth: !this.state.showWhyWeNeedDateOfBirth,
    });
  };

  render(): JSX.Element {
    const { errors, onIdentityCheckError, onToggleIdentityActive, status, referrerName } = this.props;
    const { dateOfBirthForm, showInvalidDateError, showWhyWeNeedDateOfBirth } = this.state;
    return (
      <AccordionItem
        title="Identity check"
        status={status}
        completeText={'Date of birth'}
        handleToggle={onToggleIdentityActive}
        invalidText={errors.dateOfBirthInvalid ? 'Please check your date of birth' : ''}
      >
        {this.props.isReadOnly ? (
          <p className="u-mb-s">You have already confirmed your identity</p>
        ) : (
          <form noValidate>
            <fieldset>
              <legend className="u-mb-m u-col-forrest u-bold">Please type your date of birth</legend>
              <div className={styles.inputs}>
                <div className={styles.dobDay}>
                  <Input
                    label="Day"
                    labelHidden
                    type="text"
                    id="day"
                    value={dateOfBirthForm.day}
                    maxLength={2}
                    placeholder="DD"
                    onChange={this.handleDateOfBirthFormInputChange}
                  />
                </div>
                <div className={styles.dobMonth}>
                  <Input
                    label="Month"
                    labelHidden
                    type="text"
                    id="month"
                    value={dateOfBirthForm.month}
                    maxLength={2}
                    placeholder="MM"
                    onChange={this.handleDateOfBirthFormInputChange}
                  />
                </div>
                <div className={styles.dobYear}>
                  <Input
                    label="Year"
                    labelHidden
                    type="text"
                    id="year"
                    value={dateOfBirthForm.year}
                    maxLength={4}
                    placeholder="YYYY"
                    onChange={this.handleDateOfBirthFormInputChange}
                  />
                </div>
              </div>

              {showInvalidDateError && (
                <div className="u-mb-s">
                  <Alert id="idCheckError" error>
                    <div className={styles.alert}>
                      <p className="u-mb-t">Date of birth is invalid</p>
                    </div>
                  </Alert>
                </div>
              )}

              {errors.dateOfBirthInvalid && errors.isInErroredState && (
                <div className="u-mb-s">
                  <Alert id="idCheckError" error>
                    <div className={styles.alert}>
                      <p className="u-mb-t">
                        This date does not match the date of birth that {referrerName} has for you.
                      </p>
                      <p className="u-mb-t">Please double check the date you entered.</p>
                      <p>If the date you entered is correct, please</p>
                      <button type="button" className="u-link" onClick={onIdentityCheckError}>
                        click here.
                      </button>
                    </div>
                  </Alert>
                </div>
              )}
              <div className="u-mb-s u-align-right">
                <Button
                  secondary
                  main
                  type="submit"
                  disabled={errors.dateOfBirthInvalid || errors.isInErroredState}
                  onClick={this.handleConfirmIdentitySubmit}
                >
                  Check
                </Button>
              </div>
            </fieldset>
            <div className={styles.tooltip}>
              <button type="button" className="u-link" onClick={this.onToggleWhyWeNeedDateOfBirth}>
                Why we need your data of birth
              </button>
              {showWhyWeNeedDateOfBirth && (
                <Alert id="how-we-make-money" arrow="center" handleClose={this.onToggleWhyWeNeedDateOfBirth}>
                  <p className="u-mb-s">
                    When you enter your date of birth, we will compare it to the one {referrerName} already has for you.
                    If the two dates match we can be confident that you are you.
                  </p>
                  <p>
                    This is important because you'll share financial information with us. We need to make sure that
                    information is accurate and that no one else can use it.
                  </p>
                </Alert>
              )}
            </div>
          </form>
        )}
      </AccordionItem>
    );
  }
}

export default IdentityCheckContainer;
