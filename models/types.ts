export type Transaction = {
  id: number;
  category_id: number;
  amount: number;
  date: number;
  description: string;
  type: "Expense" | "Income";
};

export type Category = {
  id: number;
  name: string;
  type: "Expense" | "Income";
};

export type TransactionsByMonth = {
  totalExpense: number;
  totalIncome: number;
};
