import * as React from 'react';
import * as styles from './styles.scss';

import generateId from '../../../../../utils/generateId/generateId';

import { AnswerCode } from '../answer-codes';
import { InputButton, Icon, Alert, HelpTooltip, InputRadio } from '../../../../../shared/components';
import { TransactionAnswerCategory } from '../Budget-Income.container';

interface CurrentIncomeComponentProps {
  isPartner: boolean;
  onSelectAnswerSubCategory: (
    answerCode: AnswerCode,
    transactionId: string,
    answerCategory: TransactionAnswerCategory,
  ) => void;
  transactionId: string;
}

export const CurrentIncomeComponent: React.FunctionComponent<CurrentIncomeComponentProps> = ({
  isPartner,
  onSelectAnswerSubCategory,
  transactionId,
}): JSX.Element => (
  <fieldset className={styles.currentIncome}>
    <legend className="u-mb-m u-col-forrest u-bold">Which sub-category best describes this income?</legend>
    <ul>
      <li key={'salary-or-earnings'} className={styles.item}>
        <HelpTooltip>
          <p>...</p>
        </HelpTooltip>
        <InputButton
          type="radio"
          label="Salary or earnings"
          id={generateId([transactionId, isPartner ? 'par' : 'ear', 'salary-or-earnings'])}
          name={generateId([transactionId, isPartner ? 'par' : 'ear', 'salary-or-earnings'])}
          value={generateId([transactionId, isPartner ? 'par' : 'ear', 'salary-or-earnings'])}
          checked={false}
          icon="income-generic"
          onChange={() =>
            onSelectAnswerSubCategory(
              isPartner ? 'PAR' : 'EAR',
              transactionId,
              isPartner ? TransactionAnswerCategory.MyPartnersCurrentIncome : TransactionAnswerCategory.MyCurrentIncome,
            )
          }
        />
      </li>
      <li key={'benefits-or-tax-credits'} className={styles.item}>
        <HelpTooltip>
          <p>...</p>
        </HelpTooltip>
        <InputButton
          type="radio"
          label="Benefits or tax credits"
          id={generateId([transactionId, isPartner ? 'par' : 'ear', 'benefits-or-tax-credits'])}
          name={generateId([transactionId, isPartner ? 'par' : 'ear', 'my-income'])}
          value={generateId([transactionId, isPartner ? 'par' : 'ear', 'benefits-or-tax-credits'])}
          checked={false}
          icon="benefits"
          onChange={() =>
            onSelectAnswerSubCategory(
              isPartner ? 'PAR' : 'BEN',
              transactionId,
              isPartner ? TransactionAnswerCategory.MyPartnersCurrentIncome : TransactionAnswerCategory.MyCurrentIncome,
            )
          }
        />
      </li>
      <li key={'child-maintenance'} className={styles.item}>
        <HelpTooltip>
          <p>...</p>
        </HelpTooltip>
        <InputButton
          type="radio"
          label="Child maintenance"
          id={generateId([transactionId, isPartner ? 'par' : 'ear', 'child-maintenance'])}
          name={generateId([transactionId, isPartner ? 'par' : 'ear', 'my-income'])}
          value={generateId([transactionId, isPartner ? 'par' : 'ear', 'child-maintenance'])}
          checked={false}
          icon="care"
          onChange={() =>
            onSelectAnswerSubCategory(
              isPartner ? 'PAR' : 'CHM',
              transactionId,
              isPartner ? TransactionAnswerCategory.MyPartnersCurrentIncome : TransactionAnswerCategory.MyCurrentIncome,
            )
          }
        />
      </li>
      <li key={'pension'} className={styles.item}>
        <HelpTooltip>
          <p>...</p>
        </HelpTooltip>
        <InputButton
          type="radio"
          label="Pension"
          id={generateId([transactionId, isPartner ? 'par' : 'ear', 'pension'])}
          name={generateId([transactionId, isPartner ? 'par' : 'ear', 'my-income'])}
          value={generateId([transactionId, isPartner ? 'par' : 'ear', 'pension'])}
          checked={false}
          icon="pension-income"
          onChange={() =>
            onSelectAnswerSubCategory(
              isPartner ? 'PAR' : 'PEN',
              transactionId,
              isPartner ? TransactionAnswerCategory.MyPartnersCurrentIncome : TransactionAnswerCategory.MyCurrentIncome,
            )
          }
        />
      </li>
      <li key={'none-of-these'} className={styles.item}>
        <InputButton
          type="radio"
          label="None of these"
          id={generateId([transactionId, isPartner ? 'par' : 'ear', 'none-of-these'])}
          name={generateId([transactionId, isPartner ? 'par' : 'ear', 'my-income'])}
          value={generateId([transactionId, isPartner ? 'par' : 'ear', 'none-of-these'])}
          checked={false}
          icon="arrow-left"
          onChange={() =>
            onSelectAnswerSubCategory(
              'NONE',
              transactionId,
              isPartner ? TransactionAnswerCategory.MyPartnersCurrentIncome : TransactionAnswerCategory.MyCurrentIncome,
            )
          }
        />
      </li>
    </ul>
  </fieldset>
);
