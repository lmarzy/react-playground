import * as React from 'react';

import { RouteComponentProps, withRouter } from 'react-router';
import { AxiosResponse, AxiosError } from 'axios';
import { signUpApi } from '../sign-up-api';
import { History } from 'history';

import { ContactPreferencesModel } from '../models';
import { PageHeader, AccordionContainer, Button } from '../../../shared/components';

import { AccountCreationComponent } from './Account-Creation/Account-Creation.container';
import { TermsComponent } from './Terms/Terms.component';
import { ContactChoicesContainer } from './Contact-Choices/Contact-Choices.container';
import { IdentityCheckContainer } from './Identity/Identity-Check.container';
import { SignUpRoutes } from '../sign-up.routes';
import { ProspectModel } from '../../../shared/models';
import { CompleteSignUpRequestModel } from './models/complete-sign-up-request.model';
import { OnboardingRoutes } from '../../onboarding';
import { SignUpErrors } from '../sign-up.errors';

import { signUpAnalyticsService } from '../sign-up-analytics.service';

interface ComponentProps {
  onCompleteSignUpSuccess: (response: AxiosResponse, memberEmail: string, memberPassword: string) => void;
  onCompleteSignUpError: (errorCode: SignUpErrors) => void;
  onDeclineTermsAndConditions: () => void;
  contactPreferences: ContactPreferencesModel;
  prospect: ProspectModel;
  accountCreated: boolean;
  contactChoicesConfirmed: boolean;
  termsAndConditionsAccepted: boolean;
  identityChecked: boolean;
  userEmail: string;
  signUpId: string;
}

interface AccordionItemState {
  isActive: boolean;
  isComplete: boolean;
}

interface ContactChoicesState {
  emailAddress: string;
  phoneNumber: string;
  optInToMarketing: boolean;
}

interface UserState {
  dateOfBirth: string;
  email: string;
  password: string;
}

export const initialState = {
  accordionItems: {
    accountCreation: {
      isActive: false,
      isComplete: false,
    } as AccordionItemState,
    terms: {
      isActive: false,
      isComplete: false,
    } as AccordionItemState,
    contactChoices: {
      isActive: false,
      isComplete: false,
    } as AccordionItemState,
    identity: {
      isActive: false,
      isComplete: false,
    } as AccordionItemState,
  } as { [key: string]: AccordionItemState },
  user: {
    dateOfBirth: '',
    email: '',
    password: '',
  } as UserState,
  contactChoices: {
    emailAddress: null,
    phoneNumber: '',
    optInToMarketing: false,
  } as ContactChoicesState,
  config: {
    isReadOnlyMode: false,
  },
  termsDeclined: false,
  whyCreditCheck: false,
  errors: {
    accountCreation: {
      accountAlreadyExists: false,
      isInErroredState: false,
    },
    identity: {
      dateOfBirthInvalid: false,
      isInErroredState: false,
    },
  },
};

type SecurityAgreementsProps = ComponentProps & RouteComponentProps;

export type SecurityAgreementsContainerState = Readonly<typeof initialState>;

export const onDateOfBirthMatchFailureError = (
  prevState: SecurityAgreementsContainerState,
): SecurityAgreementsContainerState => {
  const newState = { ...prevState };
  newState.errors.identity.dateOfBirthInvalid = true;
  newState.errors.identity.isInErroredState = true;
  newState.accordionItems.identity.isComplete = false;
  newState.accordionItems.identity.isActive = true;
  return newState;
};

export const onAccountAlreadyExistsError = (
  prevState: SecurityAgreementsContainerState,
): SecurityAgreementsContainerState => {
  const newState = { ...prevState };
  newState.errors.accountCreation.accountAlreadyExists = true;
  newState.errors.accountCreation.isInErroredState = true;
  newState.accordionItems.accountCreation.isComplete = false;
  newState.accordionItems.accountCreation.isActive = true;
  return newState;
};

export const onMaxDateOfBirthAttemptsLimitError = (historyApi: History): void =>
  historyApi.push(SignUpRoutes.IdentityError);

export const onIdentityVerificationError = (historyApi: History): void => historyApi.push(SignUpRoutes.IdentityError);

export const onAccountCreationComplete = (
  emailAddress: string,
  password: string,
  prevState: SecurityAgreementsContainerState,
): SecurityAgreementsContainerState => {
  const newState = { ...prevState };
  newState.accordionItems.accountCreation.isActive = false;
  newState.accordionItems.accountCreation.isComplete = true;
  newState.accordionItems.terms.isActive = !newState.accordionItems.terms.isComplete;
  newState.user.email = emailAddress;
  newState.user.password = password;
  return newState;
};

export const onAcceptTermsAndConditionsComplete = (
  prevState: SecurityAgreementsContainerState,
): SecurityAgreementsContainerState => {
  const newState = { ...prevState };
  newState.accordionItems.terms.isActive = false;
  newState.accordionItems.terms.isComplete = true;
  newState.accordionItems.contactChoices.isActive = !newState.accordionItems.contactChoices.isComplete;
  return newState;
};

export const onToggleTermsDeclined = (
  prevState: SecurityAgreementsContainerState,
): SecurityAgreementsContainerState => {
  const newState = { ...prevState };
  newState.termsDeclined = !prevState.termsDeclined;
  return newState;
};

export const onToggleWhyCheckCredit = (
  prevState: SecurityAgreementsContainerState,
): SecurityAgreementsContainerState => {
  const newState = { ...prevState };
  newState.whyCreditCheck = !prevState.whyCreditCheck;
  return newState;
};

export const onHandleContactChoiceComplete = (
  phoneNumber: string,
  optInToMarketing: boolean,
  prevState: SecurityAgreementsContainerState,
): SecurityAgreementsContainerState => {
  const newState = { ...prevState };
  newState.accordionItems.contactChoices.isActive = false;
  newState.accordionItems.contactChoices.isComplete = true;
  newState.accordionItems.identity.isActive = !newState.accordionItems.identity.isComplete;
  newState.contactChoices.phoneNumber = phoneNumber;
  newState.contactChoices.optInToMarketing = optInToMarketing;
  return newState;
};

export const onHandleContactChoiceEmailChange = (
  emailChecked: boolean,
  prevState: SecurityAgreementsContainerState,
): SecurityAgreementsContainerState => {
  const newState = { ...prevState };
  newState.contactChoices.emailAddress = emailChecked ? newState.user.email : null;
  return newState;
};

export const onHandleIdentitySectionComplete = (
  dateOfBirth: string,
  prevState: SecurityAgreementsContainerState,
): SecurityAgreementsContainerState => {
  const newState = { ...prevState };
  newState.accordionItems.identity.isActive = false;
  newState.accordionItems.identity.isComplete = true;
  newState.user.dateOfBirth = dateOfBirth;
  return newState;
};

export const onHandleToggleIdentityCheckError = (
  prevState: SecurityAgreementsContainerState,
): SecurityAgreementsContainerState => {
  const newState = { ...prevState };
  newState.errors.identity.isInErroredState = false;
  newState.errors.identity.dateOfBirthInvalid = false;
  return newState;
};

export const onHandleToggleAccordionItem = (
  id: string,
  prevState: SecurityAgreementsContainerState,
): SecurityAgreementsContainerState => {
  const newState = { ...prevState };
  newState.accordionItems[id].isActive = !prevState.accordionItems[id].isActive;
  return newState;
};

export const onHandleToggleSectionComplete = (
  isComplete: boolean,
  id: string,
  prevState: SecurityAgreementsContainerState,
): SecurityAgreementsContainerState => {
  const newState = { ...prevState };
  newState.accordionItems[id].isComplete = isComplete;
  return newState;
};

export const getContactPreferencesSectionCompletedText = (byEmail: boolean, byPhone: boolean): string => {
  let completeText;
  if (byEmail && !byPhone) completeText = 'Email';
  if (byPhone && !byEmail) completeText = 'Text message';
  if (byEmail && byPhone) completeText = 'Email and text message';
  return completeText;
};

export class SecurityAgreementsContainer extends React.Component<
  SecurityAgreementsProps,
  SecurityAgreementsContainerState
> {
  readonly state: SecurityAgreementsContainerState = initialState;

  constructor(props: SecurityAgreementsProps) {
    super(props);

    const {
      accountCreated,
      contactChoicesConfirmed,
      termsAndConditionsAccepted,
      identityChecked,
      userEmail,
    } = this.props;
    const { config, user } = this.state;

    config.isReadOnlyMode = accountCreated && contactChoicesConfirmed && termsAndConditionsAccepted && identityChecked;
    user.email = userEmail;

    this.setAccordionItemsInitialState();
    this.setContactPreferencesInitialState();
  }

  private setAccordionItemsInitialState = (): void => {
    const { accordionItems, config } = this.state;
    const { accountCreated, contactChoicesConfirmed, termsAndConditionsAccepted, identityChecked } = this.props;

    accordionItems.accountCreation.isActive = !config.isReadOnlyMode;
    accordionItems.accountCreation.isComplete = accountCreated;
    accordionItems.terms.isComplete = termsAndConditionsAccepted;
    accordionItems.identity.isComplete = identityChecked;
    accordionItems.contactChoices.isComplete = contactChoicesConfirmed;
  };

  private setContactPreferencesInitialState = (): void => {
    this.state.contactChoices.phoneNumber = this.props.contactPreferences.telephoneNumber;
    this.state.contactChoices.optInToMarketing = this.props.contactPreferences.optInToMarketing;
  };

  handleAccountCreationComplete = (emailAddress: string, password: string): void => {
    signUpAnalyticsService.accountCreated();
    this.setState(onAccountCreationComplete(emailAddress, password, this.state));
  };

  handleAcceptTermsAndConditions = (): void => {
    signUpAnalyticsService.termsAndConditionsAccepted();
    this.setState(onAcceptTermsAndConditionsComplete(this.state));
  };

  handleToggleTermsDeclined = (): void => {
    signUpAnalyticsService.termsAndConditionsDeclined();
    this.setState(onToggleTermsDeclined(this.state));
  };

  handleTermsChangeMind = (): void => {
    signUpAnalyticsService.termsAndConditionsChangedMind();
    this.setState(onToggleTermsDeclined(this.state));
  };

  handleToggleWhyCheckCredit = (): void => {
    signUpAnalyticsService.termsAndConditionsInfoClick();
    this.setState(onToggleWhyCheckCredit(this.state));
  };

  handleContactChoiceComplete = (phoneNumber: string, optInToMarketing: boolean): void => {
    signUpAnalyticsService.contactChoicesComplete();
    this.setState(onHandleContactChoiceComplete(phoneNumber, optInToMarketing, this.state));
  };

  handleContactChoiceEmailChange = (emailChecked: boolean): void => {
    signUpAnalyticsService.contactChoicesEmailSelectChange();
    this.setState(onHandleContactChoiceEmailChange(emailChecked, this.state));
  };

  handleIdentityComplete = (dateOfBirth: string): void => {
    signUpAnalyticsService.identityValidateDateOfBirth();
    this.setState(onHandleIdentitySectionComplete(dateOfBirth, this.state));
  };

  handleToggleSectionComplete = (isComplete: boolean, id: string): void =>
    this.setState(onHandleToggleSectionComplete(isComplete, id, this.state));

  handleToggleAccordionItem = (accordionId: string): void => {
    const { config, accordionItems } = this.state;
    const canToggleAccordionItem = config.isReadOnlyMode || accordionItems[accordionId].isComplete;

    if (canToggleAccordionItem) {
      signUpAnalyticsService.accordionOpened(accordionId);
      this.setState(onHandleToggleAccordionItem(accordionId, this.state));
    }
  };

  allStepsComplete = (): boolean => {
    const { accountCreation, contactChoices, identity, terms } = this.state.accordionItems;
    return accountCreation.isComplete && contactChoices.isComplete && identity.isComplete && terms.isComplete;
  };

  handleToggleIdentityCheckError = (): void => {
    const { dateOfBirthInvalid, isInErroredState } = this.state.errors.identity;
    if (!dateOfBirthInvalid && !isInErroredState) {
      return;
    }

    this.setState(onHandleToggleIdentityCheckError(this.state));
  };

  handleCompleteSignUp = (): void => {
    signUpAnalyticsService.completeSignUp();
    const model = this.getCompleteSignUpRequestModel();
    this.state.config.isReadOnlyMode
      ? this.props.history.push(OnboardingRoutes.Home)
      : signUpApi
          .completeSignUpJourney(this.props.signUpId, model)
          .then(
            res => this.props.onCompleteSignUpSuccess(res, model.email, model.password),
            error => this.completeSignUpJourneyFailure(error),
          );
  };

  handleIdentityCheckFailedDateOfBirthMismatch = (): void => {
    signUpAnalyticsService.identityDateOfBirthFailedErrorClick();
    this.props.history.push(SignUpRoutes.IdentityError);
  };

  private getCompleteSignUpRequestModel = (): CompleteSignUpRequestModel => {
    const { terms } = this.state.accordionItems;
    const { contactChoices, user } = this.state;

    return {
      contactPreferences: {
        emailAddress: contactChoices.emailAddress,
        optInToMarketing: contactChoices.optInToMarketing,
        telephoneNumber: contactChoices.phoneNumber,
      } as ContactPreferencesModel,
      dateOfBirth: user.dateOfBirth,
      email: user.email,
      password: user.password,
      termsAccepted: terms.isComplete,
    } as CompleteSignUpRequestModel;
  };

  completeSignUpJourneyFailure = (error: AxiosError): void => {
    const { errorCode } = error.response.data;
    const { onCompleteSignUpError } = this.props;

    switch (errorCode) {
      case SignUpErrors.SIGNUP_COMPLETE_VALIDATION_LIMIT: {
        onMaxDateOfBirthAttemptsLimitError(this.props.history);
        break;
      }
      case SignUpErrors.SIGNUP_COMPLETE_DOB_INCORRECT: {
        this.setState(onDateOfBirthMatchFailureError(this.state));
        break;
      }
      case SignUpErrors.SIGNUP_COMPLETE_DUPLICATE_USERNAME: {
        this.setState(onAccountAlreadyExistsError(this.state));
        break;
      }
      case SignUpErrors.SIGNUP_COMPLETE_EXPERIAN_ERROR:
      case SignUpErrors.SIGNUP_COMPLETE_EXPERIAN_EXCEPTION:
      case SignUpErrors.SIGNUP_COMPLETE_CREDITFILE_PERSON_UNAUTHENTICATED:
      case SignUpErrors.SIGNUP_COMPLETE_CREDITFILE_NOT_ASSOCIATED: {
        onIdentityVerificationError(this.props.history);
        break;
      }
      default: {
        onCompleteSignUpError(errorCode);
        break;
      }
    }
  };

  render(): JSX.Element {
    const { accordionItems, config, errors, termsDeclined, whyCreditCheck } = this.state;
    const { contactPreferences, prospect, userEmail } = this.props;
    const { firstName, referrer } = this.props.prospect;

    return (
      <React.Fragment>
        <div className="l-container">
          <PageHeader type="main" text={`Ok ${firstName}, there are a few checks and choices to start off with.`} />

          <main>
            <AccordionContainer>
              <AccountCreationComponent
                duplicateUserName={errors.accountCreation.accountAlreadyExists}
                isReadOnlyMode={config.isReadOnlyMode}
                status={accordionItems.accountCreation}
                email={userEmail}
                onToggleAccountCreationActive={() => this.handleToggleAccordionItem('accountCreation')}
                onHandleAccountCreationComplete={this.handleAccountCreationComplete}
                onToggleAccountCreationSectionComplete={value =>
                  this.handleToggleSectionComplete(value, 'accountCreation')
                }
              />
              <TermsComponent
                onAcceptTermsAndConditions={this.handleAcceptTermsAndConditions}
                onChangeMind={this.handleTermsChangeMind}
                onDeclineTermsAndConditions={this.props.onDeclineTermsAndConditions}
                onToggleTermsActive={() => this.handleToggleAccordionItem('terms')}
                onToggleTermsDeclined={this.handleToggleTermsDeclined}
                onToggleWhyCheckCredit={this.handleToggleWhyCheckCredit}
                referrerName={referrer.name}
                status={accordionItems.terms}
                termsAndConditionsAccepted={accordionItems.terms.isComplete}
                termsDeclined={termsDeclined}
                whyCreditCheck={whyCreditCheck}
              />
              <ContactChoicesContainer
                contactPreferences={contactPreferences}
                onContactChoiceComplete={this.handleContactChoiceComplete}
                onToggleContactChoicesActive={() => this.handleToggleAccordionItem('contactChoices')}
                onContactChoiceEmailChanged={this.handleContactChoiceEmailChange}
                prospect={prospect}
                status={accordionItems.contactChoices}
                isReadOnlyMode={config.isReadOnlyMode}
                sectionCompletedText={getContactPreferencesSectionCompletedText}
                onContactChoiceSectionComplete={value => this.handleToggleSectionComplete(value, 'contactChoices')}
              />
              <IdentityCheckContainer
                errors={errors.identity}
                onToggleIdentityCheckError={this.handleToggleIdentityCheckError}
                isReadOnly={config.isReadOnlyMode}
                onConfirmIdentity={this.handleIdentityComplete}
                onIdentityCheckError={this.handleIdentityCheckFailedDateOfBirthMismatch}
                onToggleIdentityActive={() => this.handleToggleAccordionItem('identity')}
                onToggleIdentityCheckSectionComplete={value => this.handleToggleSectionComplete(value, 'identity')}
                referrerName={prospect.referrer.name}
                status={accordionItems.identity}
              />
            </AccordionContainer>
            <div className="u-bg-path path-2 u-mb3">
              <Button
                type="button"
                primary
                main
                disabled={!this.allStepsComplete()}
                onClick={this.handleCompleteSignUp}
              >
                Ok, all done
              </Button>
            </div>
          </main>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(SecurityAgreementsContainer);
