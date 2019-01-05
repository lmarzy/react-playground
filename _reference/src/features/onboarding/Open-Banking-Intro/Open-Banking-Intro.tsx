import * as React from 'react';
// import * as styles from './styles.scss';

import { PageHeader, Video, AccordionContainer, AccordionItem, Modal, Button } from '../../../shared/components';
import { RouteComponentProps, withRouter } from 'react-router';
import { OnboardingRoutes } from '../onboarding.routes';
import { analyticsEventService } from '../../../shared/analytics';
import * as analytics from './open-banking-intro-analytics.events';

interface ComponentProps {
  partner: boolean;
}

interface AccordionItemState {
  isActive: boolean;
}

export const initialState = {
  accordion: {
    secure: {
      isActive: false,
    } as AccordionItemState,
    fast: {
      isActive: false,
    } as AccordionItemState,
    private: {
      isActive: false,
    } as AccordionItemState,
    regulated: {
      isActive: false,
    } as AccordionItemState,
  } as { [key: string]: AccordionItemState },
  showJointAccountModal: false,
};

type OpenBankingIntroProps = ComponentProps & RouteComponentProps;
type OpenBankingIntroState = Readonly<typeof initialState>;

export const onAccordionItemToggle = (item: string, prevState: OpenBankingIntroState) => {
  const newState = { ...prevState };
  newState.accordion[item].isActive = !newState.accordion[item].isActive;
  return newState;
};

export const onShowJointAccountModal = (prevState: OpenBankingIntroState) => {
  const newState = { ...prevState };
  newState.showJointAccountModal = !newState.showJointAccountModal;
  return newState;
};

export const onNoPartnerSelected = (historyApi: any) => historyApi.push(OnboardingRoutes.OpenBankingTransferringYou);

export class OpenBankingIntro extends React.Component<OpenBankingIntroProps, OpenBankingIntroState> {
  readonly state: OpenBankingIntroState = initialState;

  handleAccordionItemToggle = (item: string): void => {
    switch (item) {
      case 'fast':
        analyticsEventService.raiseEvent(analytics.OpenBankingNavigationFast);
        break;
      case 'secure':
        analyticsEventService.raiseEvent(analytics.OpenBankingNavigationSecure);
        break;
      case 'private':
        analyticsEventService.raiseEvent(analytics.OpenBankingNavigationPrivate);
        break;
      case 'regulated':
        analyticsEventService.raiseEvent(analytics.OpenBankingNavigationRegulated);
        break;
    }
    this.setState(onAccordionItemToggle(item, this.state));
  };

  handleVideoWatchedLater = (): void => {
    analyticsEventService.raiseEvent(analytics.OpenBankingIntroWatchVideoLater);
    this.handleShowJointAccountModal();
  };

  handleOnVideoWatched = (): void => {
    analyticsEventService.raiseEvent(analytics.OpenBankingIntroWatchVideoWatched);
    this.handleShowJointAccountModal();
  };

  private handleShowJointAccountModal = (): void => {
    this.props.partner ? this.setState(onShowJointAccountModal(this.state)) : onNoPartnerSelected(this.props.history);
  };

  handleJaModalContinue = (): void => {
    analyticsEventService.raiseEvent(analytics.OpenBankingConfirmJaModal);
    this.props.history.push(OnboardingRoutes.OpenBankingTransferringYou);
  };

  render() {
    const { accordion, showJointAccountModal } = this.state;

    return (
      <div className="l-container">
        <PageHeader type="main" text="Share your bank statements with us for 90 days" />

        <main className="u-align-center">
          <div className="u-mb-s">
            <Video
              id={3}
              onWatchLater={this.handleVideoWatchedLater}
              onVideoWatched={this.handleOnVideoWatched}
              onVideoStarted={() => analyticsEventService.raiseEvent(analytics.OpenBankingIntroPlayVideoEvent)}
              onWatchNow={() => analyticsEventService.raiseEvent(analytics.OpenBankingIntroWatchVideoNow)}
              continueText="Connect my first account"
            >
              <p className="u-pIntro u-mb-s">Start your draft budget by connecting your bank accounts.</p>
              <div className="u-mb-s">
                <AccordionContainer>
                  <AccordionItem
                    icon="secure"
                    title="Secure"
                    status={accordion.secure}
                    handleToggle={() => this.handleAccordionItemToggle('secure')}
                  >
                    <p className="u-mb-s">We'll never see your bank login details.</p>
                    <p className="u-mb-s">There's no way we can move your money.</p>
                    <p>Your personal information is encrypted and stored anonymously</p>
                  </AccordionItem>
                  <AccordionItem
                    icon="fast"
                    title="Fast"
                    status={accordion.fast}
                    handleToggle={() => this.handleAccordionItemToggle('fast')}
                  >
                    <p className="u-mb-s">
                      No hunting for, highlighting, posting, scanning, downloading or emailing bank statements and
                      payslips.
                    </p>
                    <p>Understand your finances in minutes not days by connecting your bank accounts with us.</p>
                  </AccordionItem>
                  <AccordionItem
                    icon="private"
                    title="Private"
                    status={accordion.private}
                    handleToggle={() => this.handleAccordionItemToggle('private')}
                  >
                    <p className="u-mb-s">
                      Information from your budget will only be shared once you're happy with it.
                    </p>
                    <p className="u-mb-s">
                      Companies who lend you money will not see your transactions. They see your income and spending by
                      category only.
                    </p>
                    <p>You will be able to check the information before it is sent to your lenders.</p>
                  </AccordionItem>
                  <AccordionItem
                    icon="regulated"
                    title="Regulated"
                    status={accordion.regulated}
                    handleToggle={() => this.handleAccordionItemToggle('regulated')}
                  >
                    <p className="u-mb-s">
                      We have been checked and approved by the Financial Conduct Authority(FCA) to make sure we handle
                      your information securely.
                    </p>
                    <p className="u-mb-s">
                      Our partner, OpenWrks, have also been approved by the{' '}
                      <abbr title="Financial Conduct Authority">FCA</abbr>.
                    </p>
                    <p>
                      Your bank will know that you have connected your account. You will be able to stop the connection
                      throgh your bank.
                    </p>
                  </AccordionItem>
                </AccordionContainer>
              </div>
            </Video>
          </div>
          {showJointAccountModal && (
            <Modal
              type="info"
              id="joint-account"
              title="Quick heads up on joint accounts"
              handleClose={this.handleShowJointAccountModal}
            >
              <p className="u-mb-m">
                To get a full picture of your personal budget, we need to understand the money coming in and going out
                of all your bank accounts, including joint accounts.
              </p>
              <Button type="button" secondary main onClick={this.handleJaModalContinue}>
                Got it!
              </Button>
            </Modal>
          )}
        </main>
      </div>
    );
  }
}

export default withRouter(OpenBankingIntro);
