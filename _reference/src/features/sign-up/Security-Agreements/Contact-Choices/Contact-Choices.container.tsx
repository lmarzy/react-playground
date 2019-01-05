import * as React from 'react';
import * as styles from './styles.scss';
import { Button, AccordionItem, InputCheckbox, Icon, Alert, Input } from '../../../../shared/components';
import { ContactPreferencesModel } from '../../models';
import { ProspectModel } from '../../../../shared/models';
import validate from '../../../../utils/validation';
import { ContactChoicesReadOnlyComponent } from './Contact-Choices-Read-Only.component';
import { signUpAnalyticsService } from '../../sign-up-analytics.service';

interface ContactChoicesContainerProps {
  contactPreferences: ContactPreferencesModel;
  isReadOnlyMode: boolean;
  onContactChoiceComplete: (telephoneNumber: string, optInToMarketing: boolean) => void;
  onToggleContactChoicesActive: () => void;
  onContactChoiceEmailChanged: (emailChecked: boolean) => void;
  onContactChoiceSectionComplete: (isComplete: boolean) => void;
  prospect: ProspectModel;
  sectionCompletedText: (byEmail: boolean, byPhone: boolean) => string;
  status: { isActive: boolean; isComplete: boolean };
}

export class ContactChoicesContainer extends React.Component<ContactChoicesContainerProps> {
  state = {
    contactChoice: {
      email: {
        checked: false,
      } as { [key: string]: any },
      telephoneNumber: {
        valueOriginal: '',
        value: '',
        edit: false,
        checked: false,
        valid: true,
      } as { [key: string]: any },
    } as { [key: string]: any },
    optInToMarketing: false,
    completeText: '',
    isComplete: false,
  };

  componentWillMount(): void {
    const { contactPreferences, prospect } = this.props;

    const emailSetAsContactPref = contactPreferences.emailAddress ? true : false;
    const phoneSetAsContactPref = contactPreferences.telephoneNumber ? true : false;
    const originalPhoneNumber = contactPreferences.telephoneNumber
      ? contactPreferences.telephoneNumber
      : prospect.telephoneNumber;

    const newState = { ...this.state };
    newState.contactChoice.telephoneNumber.valueOriginal = originalPhoneNumber;
    newState.contactChoice.telephoneNumber.value = originalPhoneNumber;
    newState.contactChoice.email.checked = emailSetAsContactPref;
    newState.contactChoice.telephoneNumber.checked = phoneSetAsContactPref;
    newState.optInToMarketing = contactPreferences ? contactPreferences.optInToMarketing : false;
    newState.completeText = this.props.sectionCompletedText(emailSetAsContactPref, phoneSetAsContactPref);
    this.setState(newState);
  }

  handleTelephoneNumberEdit = (): void => {
    const newState = { ...this.state };
    newState.isComplete = false;
    newState.contactChoice.telephoneNumber.edit = !newState.contactChoice.telephoneNumber.edit;

    if (newState.contactChoice.telephoneNumber.valueOriginal !== newState.contactChoice.telephoneNumber.value) {
      newState.contactChoice.telephoneNumber.value = newState.contactChoice.telephoneNumber.valueOriginal;
      newState.contactChoice.telephoneNumber.valid = true;
    }

    this.setState(newState, () => this.props.onContactChoiceSectionComplete(newState.isComplete));
  };

  handlePhoneNumberCheckedChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name } = event.currentTarget;
    const newState = { ...this.state };

    newState.isComplete = false;
    newState.contactChoice[name].checked = !newState.contactChoice[name].checked;

    signUpAnalyticsService.contactChoicesPhoneNumberSelectChange();

    if (!newState.contactChoice.email.checked && !newState.contactChoice.telephoneNumber.checked) {
      newState.optInToMarketing = false;
    }

    this.setState(newState, () => this.props.onContactChoiceSectionComplete(newState.isComplete));
  };

  handleOptInToMarketingCheckedChange = (): void => {
    const newState = { ...this.state };
    newState.isComplete = false;
    newState.optInToMarketing = !newState.optInToMarketing;
    signUpAnalyticsService.contactChoicesOptInToMarketing();
    this.setState(newState, () => this.props.onContactChoiceSectionComplete(newState.isComplete));
  };

  handleEmailCheckedChanged = (): void => {
    const newState = { ...this.state };
    newState.contactChoice.email.checked = !newState.contactChoice.email.checked;
    newState.isComplete = false;
    if (!newState.contactChoice.email.checked && !newState.contactChoice.telephoneNumber.checked) {
      newState.optInToMarketing = false;
    }

    const emailChecked = newState.contactChoice.email.checked;
    this.setState(newState, () => {
      this.props.onContactChoiceEmailChanged(emailChecked);
      this.props.onContactChoiceSectionComplete(newState.isComplete);
    });
  };

  handlePhoneNumberChanged = (event: React.ChangeEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const newState = { ...this.state };
    newState.contactChoice.telephoneNumber.value = event.target.value;
    newState.contactChoice.telephoneNumber.valid = true;
    newState.isComplete = false;
    this.setState(newState, () => this.props.onContactChoiceSectionComplete(newState.isComplete));
  };

  handleDoneSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const { email, telephoneNumber } = this.state.contactChoice;
    const newState = { ...this.state };

    if (telephoneNumber.checked) {
      if (validate('telephoneNumber', telephoneNumber.value)) {
        newState.contactChoice.telephoneNumber.valueOriginal = newState.contactChoice.telephoneNumber.value;
        newState.contactChoice.telephoneNumber.edit = false;
        newState.completeText = this.props.sectionCompletedText(email.checked, telephoneNumber.checked);
        this.setState(newState, () =>
          this.props.onContactChoiceComplete(
            telephoneNumber.checked ? telephoneNumber.value : null,
            this.state.optInToMarketing,
          ),
        );
      } else {
        newState.contactChoice.telephoneNumber.valid = false;
        this.setState(newState);
      }
    } else {
      newState.completeText = this.props.sectionCompletedText(email.checked, telephoneNumber.checked);
      this.setState(newState, () =>
        this.props.onContactChoiceComplete(
          telephoneNumber.checked ? telephoneNumber.value : null,
          this.state.optInToMarketing,
        ),
      );
    }
  };

  render(): JSX.Element {
    const { contactPreferences, status, onToggleContactChoicesActive, isReadOnlyMode } = this.props;
    const { contactChoice, completeText, optInToMarketing } = this.state;

    const contactSelected =
      (contactChoice.email && contactChoice.email.checked) ||
      (contactChoice.telephoneNumber && contactChoice.telephoneNumber.checked);

    return (
      <AccordionItem
        title="How to contact you"
        status={status}
        completeText={completeText}
        handleToggle={onToggleContactChoicesActive}
      >
        {isReadOnlyMode ? (
          <ContactChoicesReadOnlyComponent
            emailAddress={contactPreferences.emailAddress}
            optInToMarketing={contactPreferences.optInToMarketing}
            telephoneNumber={contactPreferences.telephoneNumber}
          />
        ) : (
          <form noValidate>
            <fieldset>
              <legend className="u-mb-m u-col-forrest u-bold">How would you like us to contact you?</legend>

              <div className={styles.contactChoice}>
                <InputCheckbox
                  label="By Email"
                  id="email-checkbox"
                  name="email"
                  value="By email"
                  checked={contactChoice.email.checked}
                  onChange={this.handleEmailCheckedChanged}
                />
              </div>

              <div className={styles.contactChoice}>
                <React.Fragment>
                  <InputCheckbox
                    label="By text message"
                    id="telephoneNumber-checkbox"
                    name="telephoneNumber"
                    value="By telephoneNumber"
                    checked={contactChoice.telephoneNumber.checked}
                    onChange={this.handlePhoneNumberCheckedChange}
                  />
                </React.Fragment>

                {contactChoice.telephoneNumber.checked &&
                  contactChoice.telephoneNumber.valueOriginal &&
                  !contactChoice.telephoneNumber.edit && (
                    <React.Fragment>
                      <p className={styles.value}>{contactChoice.telephoneNumber.value}</p>
                      <button type="button" className={styles.editBtn} onClick={this.handleTelephoneNumberEdit}>
                        <span className="u-hidden-visually">Edit</span>
                        <Icon name="edit" />
                      </button>
                    </React.Fragment>
                  )}

                {((contactChoice.telephoneNumber.checked &&
                  contactChoice.telephoneNumber.valueOriginal &&
                  contactChoice.telephoneNumber.edit) ||
                  (!contactChoice.telephoneNumber.valueOriginal && contactChoice.telephoneNumber.checked)) && (
                  <div className="u-mb-m">
                    <div className="u-mb-t">
                      <Input
                        type={'tel'}
                        label={'What is your telephone number?'}
                        id={'telephoneNumber'}
                        value={contactChoice.telephoneNumber.value ? contactChoice.telephoneNumber.value : ''}
                        onChange={this.handlePhoneNumberChanged}
                      />
                    </div>
                    {!contactChoice.telephoneNumber.valid && (
                      <div className="u-mb-t">
                        <Alert id="contactChoiceValidation" arrow="center" error>
                          <p>Please enter a valid telephone number</p>
                        </Alert>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="u-mb-m">
                <InputCheckbox
                  label="I would like to receive updates, offers and news from Tully"
                  id="optInToMarketing"
                  name="optInToMarketing"
                  value="I would like to receive updates, offers and news from Tully"
                  checked={optInToMarketing}
                  disabled={!contactSelected}
                  onChange={this.handleOptInToMarketingCheckedChange}
                />
              </div>

              <div className="u-align-right">
                <Button type="submit" secondary main disabled={!contactSelected} onClick={this.handleDoneSubmit}>
                  Done
                </Button>
              </div>
            </fieldset>
          </form>
        )}
      </AccordionItem>
    );
  }
}
