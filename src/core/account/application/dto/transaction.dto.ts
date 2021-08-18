export interface TransactionDto {
  id: string;
  accountId: string;
  cost: number;
  comment: string;
  createDate: Date;
  categoryId: string;
  categoryName: string;
  categoryColor: string;
}
