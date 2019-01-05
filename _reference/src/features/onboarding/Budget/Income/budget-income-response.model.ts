import { IrregularTransactionModel } from './irregular-transaction.model';
import { RegularTransactionModel } from './regular-transaction.model';

export interface BudgetIncomeResponseModel {
  irregularTransactions: IrregularTransactionModel[];
  regularTransactions: RegularTransactionModel[];
}
