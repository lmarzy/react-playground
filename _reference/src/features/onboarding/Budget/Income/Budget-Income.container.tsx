import * as React from 'react';
import { AnswerCode } from './answer-codes';

import { AccordionContainer, AccordionItem, PageHeader } from '../../../../shared/components';

import { IncomeTransactionAnswerComponent } from './Income-Transaction-Answer/Income-Transaction-Answer.component';
import { CurrentIncomeComponent } from './Current-Income/Current-Income.component';
import { TransferBetweenAccountsComponent } from './Transfer-Between-Accounts.component';

interface AccordionItemState {
  isActive: boolean;
  isComplete: boolean;
} // can be reused from security agreements

interface TransactionViewModel {
  accordionState: AccordionItemState;
  answerCode: AnswerCode;
  selectedAnswerCategoryId: TransactionAnswerCategory;
  transactionId: string;
}

const initialState = {
  isInReadonlyMode: false,
  viewModels: [] as TransactionViewModel[],
};

type BudgetIncomeContainerState = Readonly<typeof initialState>;

export enum TransactionAnswerCategory {
  None,
  FormerPastIncome,
  Gift,
  MoneyForBillsOrHouseholdCosts,
  MoneyForAOneOffPayment,
  MyCurrentIncome,
  MyPartnersCurrentIncome,
  Refund,
  TransferToOneOfMyBankAccounts,
}

export class BudgetIncomeContainer extends React.Component<{}, BudgetIncomeContainerState> {
  readonly state: BudgetIncomeContainerState = initialState;

  answerCategoryToAnswerLabelMap = new Map<TransactionAnswerCategory, string>([
    [TransactionAnswerCategory.FormerPastIncome, 'Former/Past income'],
    [TransactionAnswerCategory.Gift, 'Gift'],
    [TransactionAnswerCategory.MoneyForBillsOrHouseholdCosts, 'Money for bills or household costs'],
    [TransactionAnswerCategory.MoneyForAOneOffPayment, 'Money for a one-off payment'],
    [TransactionAnswerCategory.MyCurrentIncome, 'My current income'],
    [TransactionAnswerCategory.MyPartnersCurrentIncome, 'My partners current income'],
    [TransactionAnswerCategory.Refund, 'Refund'],
    [TransactionAnswerCategory.TransferToOneOfMyBankAccounts, 'Transfer to one of my bank accounts'],
  ]);

  componentWillMount(): void {
    const newState = { ...this.state };
    newState.viewModels = ['Transaction 1', 'Transaction 2', 'Transaction 3'].map((transId, index) => ({
      accordionState: { isActive: index === 0, isComplete: false },
      answerCode: 'NONE' as AnswerCode,
      selectedAnswerCategoryId: TransactionAnswerCategory.None,
      transactionId: transId,
    }));
    this.setState(newState);
  }

  onToggleAccordionItem = (transactionId: string): void => {
    const newState = { ...this.state };
    const match = newState.viewModels.find(vm => vm.transactionId === transactionId);
    match.accordionState.isActive = !match.accordionState.isActive;
    this.setState(newState);
  };

  isAnswerCategorySelected = (answerCategory: TransactionAnswerCategory, transactionId: string): boolean => {
    const match = this.state.viewModels.find(vm => vm.transactionId === transactionId);
    return match.selectedAnswerCategoryId === answerCategory;
  };

  onSelectAnswerCategory = (
    answerCode: AnswerCode,
    transactionId: string,
    answerCategory: TransactionAnswerCategory,
  ): void => {
    const newState = { ...this.state };
    const match = newState.viewModels.find(vm => vm.transactionId === transactionId);
    const noneOptionSelected = answerCode === 'NONE';

    match.answerCode = answerCode;
    match.accordionState.isActive = false;
    match.accordionState.isComplete = !noneOptionSelected;
    match.selectedAnswerCategoryId = noneOptionSelected ? TransactionAnswerCategory.None : answerCategory;

    this.setState(newState);
  };

  onSelectAnswerCategoryWithSubCategories = (
    transactionId: string,
    answerCategory: TransactionAnswerCategory,
  ): void => {
    const newState = { ...this.state };
    const match = newState.viewModels.find(vm => vm.transactionId === transactionId);
    match.selectedAnswerCategoryId = answerCategory;
    this.setState(newState);
  };

  render(): JSX.Element {
    const { viewModels } = this.state;

    return (
      <div className="l-container">
        <PageHeader type="main" text={`First up, let's get the right income for your personal budget.`} />
        <main>
          <AccordionContainer>
            {viewModels.map(vm => (
              <AccordionItem
                key={vm.transactionId}
                handleToggle={() => this.onToggleAccordionItem(vm.transactionId)}
                status={{ isActive: vm.accordionState.isActive, isComplete: vm.accordionState.isComplete }}
                title={vm.transactionId}
              >
                <legend className="u-mb-m u-col-forrest u-bold">What best describes this transaction?</legend>

                <IncomeTransactionAnswerComponent
                  answerLabel={this.answerCategoryToAnswerLabelMap.get(TransactionAnswerCategory.FormerPastIncome)}
                  isSelected={this.isAnswerCategorySelected(
                    TransactionAnswerCategory.FormerPastIncome,
                    vm.transactionId,
                  )}
                  onChange={() =>
                    this.onSelectAnswerCategory('NOT', vm.transactionId, TransactionAnswerCategory.FormerPastIncome)
                  }
                  transactionId={vm.transactionId}
                />

                <IncomeTransactionAnswerComponent
                  answerLabel={this.answerCategoryToAnswerLabelMap.get(TransactionAnswerCategory.MyCurrentIncome)}
                  isSelected={this.isAnswerCategorySelected(
                    TransactionAnswerCategory.MyCurrentIncome,
                    vm.transactionId,
                  )}
                  transactionId={vm.transactionId}
                  onChange={() =>
                    this.onSelectAnswerCategoryWithSubCategories(
                      vm.transactionId,
                      TransactionAnswerCategory.MyCurrentIncome,
                    )
                  }
                >
                  {this.isAnswerCategorySelected(TransactionAnswerCategory.MyCurrentIncome, vm.transactionId) && (
                    <CurrentIncomeComponent
                      isPartner={false}
                      onSelectAnswerSubCategory={this.onSelectAnswerCategory}
                      transactionId={vm.transactionId}
                    />
                  )}
                </IncomeTransactionAnswerComponent>

                <IncomeTransactionAnswerComponent
                  answerLabel={this.answerCategoryToAnswerLabelMap.get(
                    TransactionAnswerCategory.MyPartnersCurrentIncome,
                  )}
                  isSelected={this.isAnswerCategorySelected(
                    TransactionAnswerCategory.MyPartnersCurrentIncome,
                    vm.transactionId,
                  )}
                  transactionId={vm.transactionId}
                  onChange={() =>
                    this.onSelectAnswerCategoryWithSubCategories(
                      vm.transactionId,
                      TransactionAnswerCategory.MyPartnersCurrentIncome,
                    )
                  }
                >
                  {this.isAnswerCategorySelected(
                    TransactionAnswerCategory.MyPartnersCurrentIncome,
                    vm.transactionId,
                  ) && (
                    <CurrentIncomeComponent
                      isPartner={true}
                      onSelectAnswerSubCategory={this.onSelectAnswerCategory}
                      transactionId={vm.transactionId}
                    />
                  )}
                </IncomeTransactionAnswerComponent>

                <IncomeTransactionAnswerComponent
                  answerLabel={this.answerCategoryToAnswerLabelMap.get(
                    TransactionAnswerCategory.MoneyForBillsOrHouseholdCosts,
                  )}
                  isSelected={this.isAnswerCategorySelected(
                    TransactionAnswerCategory.MoneyForBillsOrHouseholdCosts,
                    vm.transactionId,
                  )}
                  onChange={() =>
                    this.onSelectAnswerCategory(
                      'REG',
                      vm.transactionId,
                      TransactionAnswerCategory.MoneyForBillsOrHouseholdCosts,
                    )
                  }
                  transactionId={vm.transactionId}
                />

                <IncomeTransactionAnswerComponent
                  answerLabel={this.answerCategoryToAnswerLabelMap.get(
                    TransactionAnswerCategory.MoneyForAOneOffPayment,
                  )}
                  isSelected={this.isAnswerCategorySelected(
                    TransactionAnswerCategory.MoneyForAOneOffPayment,
                    vm.transactionId,
                  )}
                  onChange={() =>
                    this.onSelectAnswerCategory(
                      'ONE',
                      vm.transactionId,
                      TransactionAnswerCategory.MoneyForAOneOffPayment,
                    )
                  }
                  transactionId={vm.transactionId}
                />

                <IncomeTransactionAnswerComponent
                  answerLabel={this.answerCategoryToAnswerLabelMap.get(TransactionAnswerCategory.Gift)}
                  isSelected={this.isAnswerCategorySelected(TransactionAnswerCategory.Gift, vm.transactionId)}
                  onChange={() => this.onSelectAnswerCategory('GIF', vm.transactionId, TransactionAnswerCategory.Gift)}
                  transactionId={vm.transactionId}
                />

                <IncomeTransactionAnswerComponent
                  answerLabel={this.answerCategoryToAnswerLabelMap.get(TransactionAnswerCategory.Refund)}
                  isSelected={this.isAnswerCategorySelected(TransactionAnswerCategory.Refund, vm.transactionId)}
                  onChange={() =>
                    this.onSelectAnswerCategory('REF', vm.transactionId, TransactionAnswerCategory.Refund)
                  }
                  transactionId={vm.transactionId}
                />

                <IncomeTransactionAnswerComponent
                  answerLabel={this.answerCategoryToAnswerLabelMap.get(
                    TransactionAnswerCategory.TransferToOneOfMyBankAccounts,
                  )}
                  isSelected={this.isAnswerCategorySelected(
                    TransactionAnswerCategory.TransferToOneOfMyBankAccounts,
                    vm.transactionId,
                  )}
                  transactionId={vm.transactionId}
                  onChange={() =>
                    this.onSelectAnswerCategoryWithSubCategories(
                      vm.transactionId,
                      TransactionAnswerCategory.TransferToOneOfMyBankAccounts,
                    )
                  }
                >
                  {this.isAnswerCategorySelected(
                    TransactionAnswerCategory.TransferToOneOfMyBankAccounts,
                    vm.transactionId,
                  ) && (
                    <TransferBetweenAccountsComponent
                      onSelectAnswerSubCategory={this.onSelectAnswerCategory}
                      transactionId={vm.transactionId}
                    />
                  )}
                </IncomeTransactionAnswerComponent>
              </AccordionItem>
            ))}
          </AccordionContainer>
        </main>
      </div>
    );
  }
}
