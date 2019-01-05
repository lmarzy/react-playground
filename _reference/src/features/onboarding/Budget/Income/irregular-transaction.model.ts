export interface IrregularTransactionModel {
  description: string;
  groupMarkerId: string;
  transactionDetails: IrregularTransactionDetailModel[];
}

export interface IrregularTransactionDetailModel {
  amount: string;
  date: string;
  providerName: string;
  transactionId: string;
}
