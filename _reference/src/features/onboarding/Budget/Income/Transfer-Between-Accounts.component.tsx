import * as React from 'react';

import { AnswerCode } from './answer-codes';
import { Pill } from '../../../../shared/components';
import { TransactionAnswerCategory } from './Budget-Income.container';

interface TransferBetweenAccountsComponentProps {
  onSelectAnswerSubCategory: (
    answerCode: AnswerCode,
    transactionId: string,
    answerCategory: TransactionAnswerCategory,
  ) => void;
  transactionId: string;
}

export const TransferBetweenAccountsComponent: React.FunctionComponent<TransferBetweenAccountsComponentProps> = ({
  onSelectAnswerSubCategory,
  transactionId,
}): JSX.Element => (
  <>
    <fieldset>
      <legend className="u-mb-s u-col-forrest u-bold">
        Have you shared bank statements with us for the account this money comes from?
      </legend>
      <div className="u-mb-s">
        <div className="u-mb-s">
          <Pill
            icon="tick"
            text={'Yes'}
            onClick={() =>
              onSelectAnswerSubCategory('SAV', transactionId, TransactionAnswerCategory.TransferToOneOfMyBankAccounts)
            }
          />
        </div>
        <div>
          <Pill
            icon="tick"
            text={'No'}
            onClick={() =>
              onSelectAnswerSubCategory('TWN', transactionId, TransactionAnswerCategory.TransferToOneOfMyBankAccounts)
            }
          />
        </div>
      </div>
    </fieldset>
    <fieldset>
      <legend className="u-mb-s u-col-forrest u-bold">Is the money from your savings?</legend>
      <div className="u-mb-s">
        <div className="u-mb-s">
          <Pill
            icon="tick"
            text={'Yes'}
            onClick={() =>
              onSelectAnswerSubCategory('SAV', transactionId, TransactionAnswerCategory.TransferToOneOfMyBankAccounts)
            }
          />
        </div>
        <div>
          <Pill
            icon="tick"
            text={'No'}
            onClick={() =>
              onSelectAnswerSubCategory('TIN', transactionId, TransactionAnswerCategory.TransferToOneOfMyBankAccounts)
            }
          />
        </div>
      </div>
    </fieldset>
  </>
);
