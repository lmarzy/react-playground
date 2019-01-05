import * as React from 'react';
import { TermsText, GoodToKnow } from './components';
import { AccordionItem, GridRow, GridCol, Button, ListItem } from '../../../../shared/components';

interface TermsComponentProps {
  onAcceptTermsAndConditions: () => void;
  onChangeMind: () => void;
  onDeclineTermsAndConditions: () => void;
  onToggleTermsActive: () => void;
  onToggleTermsDeclined: () => void;
  onToggleWhyCheckCredit: () => void;
  referrerName: string;
  status: { isActive: boolean; isComplete: boolean };
  termsAndConditionsAccepted: boolean;
  termsDeclined: boolean;
  whyCreditCheck: boolean;
}
export const TermsComponent = (props: TermsComponentProps): JSX.Element => (
  <AccordionItem
    title="Terms and Conditions"
    status={{ isActive: props.status.isActive, isComplete: props.status.isComplete }}
    completeText={'Accepted'}
    handleToggle={props.onToggleTermsActive}
  >
    {!props.termsDeclined ? (
      <React.Fragment>
        <TermsText />
        <div className="u-mb-s">
          <GoodToKnow creditCheckStatus={props.whyCreditCheck} toggleCreditCheck={props.onToggleWhyCheckCredit} />
        </div>
        {!props.termsAndConditionsAccepted && (
          <GridRow>
            <GridCol>
              <div className="u-align-right">
                <Button type="button" secondary alt onClick={props.onToggleTermsDeclined}>
                  Decline
                </Button>
              </div>
            </GridCol>
            <GridCol>
              <div className="u-align-left">
                <Button type="button" secondary main onClick={props.onAcceptTermsAndConditions}>
                  Accept
                </Button>
              </div>
            </GridCol>
          </GridRow>
        )}
      </React.Fragment>
    ) : (
      <React.Fragment>
        <p className="u-mb-s">
          Declining our Terms and Conditions means we will <strong>Not</strong> be able to help you with:
        </p>

        <ul className="u-mb-s">
          <ListItem negative text="a budget," />
          <ListItem negative text="stopping other companies from contacting you about your debts," />
          <ListItem negative text="affordable, flexible replayments," />
          <ListItem negative text="saving for the future" />
        </ul>

        <p className="u-mb-s">We can transfer you to {props.referrerName} to manage your repayments with them.</p>
        <div className="u-mb-s">
          <Button secondary alt fullWidth type="button" onClick={props.onDeclineTermsAndConditions}>
            Take me to {props.referrerName}
          </Button>
        </div>
        <Button secondary main fullWidth type="button" onClick={props.onChangeMind}>
          I've changed my mind
        </Button>
      </React.Fragment>
    )}
  </AccordionItem>
);
