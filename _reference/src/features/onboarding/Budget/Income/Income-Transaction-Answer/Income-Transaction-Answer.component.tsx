import * as React from 'react';
import { InputRadio, Icon, Alert, HelpTooltip } from '../../../../../shared/components';

import * as styles from './styles.scss';

interface IncomeTransactionAnswerProps {
  answerLabel: string;
  isSelected: boolean;
  onChange?: () => void;
  transactionId: string;
}

const initialState = {
  showHelpActive: false,
};

type IncomeTransactionAnswerComponentState = Readonly<typeof initialState>;

export const onHandleShowHelp = (
  prevState: IncomeTransactionAnswerComponentState,
): IncomeTransactionAnswerComponentState => {
  const newState = { ...prevState };
  newState.showHelpActive = !prevState.showHelpActive;
  return newState;
};

export const onHandleCloseHelp = (
  prevState: IncomeTransactionAnswerComponentState,
): IncomeTransactionAnswerComponentState => {
  const newState = { ...prevState };
  newState.showHelpActive = false;
  return newState;
};

export class IncomeTransactionAnswerComponent extends React.Component<
  IncomeTransactionAnswerProps,
  IncomeTransactionAnswerComponentState
> {
  readonly state: IncomeTransactionAnswerComponentState = initialState;

  private generateId = (): string => `${this.props.answerLabel}-${this.props.transactionId}`.replace(/[,\/,\s]/g, '-'); // might be better to move this out of here

  handleShowHelp = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    this.setState(onHandleShowHelp(this.state));
  };

  render() {
    const { answerLabel, children, onChange, isSelected } = this.props;

    return (
      <div className={styles.answer}>
        <HelpTooltip>
          <p>...</p>
        </HelpTooltip>
        <InputRadio
          label={answerLabel}
          id={this.generateId()}
          name={answerLabel}
          value="By email"
          checked={isSelected}
          onChange={onChange}
        />
        {children}
      </div>
    );
  }
}
