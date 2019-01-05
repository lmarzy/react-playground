import * as React from 'react';
import { DefinitionList, TextIcon } from '../../../../shared/components';

interface ContactChoicesReadOnlyComponentProps {
  emailAddress: string;
  telephoneNumber: string;
  optInToMarketing: boolean;
}

export const ContactChoicesReadOnlyComponent: React.SFC<ContactChoicesReadOnlyComponentProps> = props => (
  <React.Fragment>
    <DefinitionList
      items={[
        {
          icon: props.emailAddress ? 'tick' : 'cross',
          label: 'Email',
          value: props.emailAddress ? props.emailAddress : 'We will not send you emails.',
        },
        {
          icon: props.telephoneNumber ? 'tick' : 'cross',
          label: 'Text message',
          value: props.telephoneNumber ? props.telephoneNumber : 'We will not send you text messages.',
        },
      ]}
    />

    <div className="u-mb-m">
      <TextIcon
        icon={props.optInToMarketing ? 'tick' : 'cross'}
        text={
          props.optInToMarketing
            ? 'You will receive updates, offers and news from us.'
            : 'You will not receive updates, offers and news from us.'
        }
      />
    </div>

    <p>These settings can be changed after you have built your budget.</p>
  </React.Fragment>
);
