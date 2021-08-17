export interface TransactionDto {
  id: string;
  accountId: string;
  categoryId: string;
  cost: number;
  comment: string;
  createDate: Date;
}
