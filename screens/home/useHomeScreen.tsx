import React, { useEffect } from "react";
import { Category, Transaction, TransactionsByMonth } from "../../models/types";
import { useSQLiteContext } from "expo-sqlite";

const useHomeScreen = () => {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [transactionsByMonth, setTransactionsByMonth] =
    React.useState<TransactionsByMonth>({
      totalExpense: 0,
      totalIncome: 0,
    });
  const db = useSQLiteContext();

  async function getData() {
    const result = await db.getAllAsync<Transaction>(
      `SELECT * FROM Transactions ORDER by date DESC;`
    );

    console.log("29148 > getData > result:::::::", result.length, result);
    setTransactions(result);

    const categoriesResult = await db.getAllAsync<Category>(
      `SELECT * FROM Categories;`
    );
    setCategories(categoriesResult);

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    endOfMonth.setMilliseconds(endOfMonth.getMilliseconds() - 1);

    const startOfMonthTimestamp = Math.floor(startOfMonth.getTime() / 1000);
    const endOfMonthTimestamp = Math.floor(endOfMonth.getTime() / 1000);

    const transactionsByMonth = await db.getAllAsync<TransactionsByMonth>(
      `
      SELECT 
        COALESCE(SUM(CASE WHEN type = 'Expense' THEN amount ELSE 0 END), 0) as totalExpense,
        COALESCE(SUM(CASE WHEN type = 'Income' THEN amount ELSE 0 END), 0) as totalIncome
      FROM Transactions
      WHERE date >= ? AND date <= ?;
      `,
      [startOfMonthTimestamp, endOfMonthTimestamp]
    );

    setTransactionsByMonth(transactionsByMonth[0]);
  }

  useEffect(() => {
    db.withTransactionAsync(async () => {
      await getData();
    });
  }, [db]);

  const deleteTransaction = async (id: number) => {
    db.withTransactionAsync(async () => {
      //   await db.runAsync(`DELETE FROM Transactions WHERE id = ${id}`); // BAD USECASE SINCE IT MIGHT BE ATTACKED WITH SQL Injection
      await db.runAsync(`DELETE FROM Transactions WHERE id = ?;`, [id]);
      await getData();
    });
  };

  const insertTransaction = async (transaction: Transaction) => {
    db.withTransactionAsync(async () => {
      try {
        await db.runAsync(
          `
          INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (?, ?, ?, ?, ?);`,
          [
            transaction.category_id,
            transaction.amount,
            transaction.date,
            transaction.description,
            transaction.type,
          ]
        );
        console.log("29148 done ne ");
        await getData();
      } catch (error) {
        console.log("29148 > db.withTransactionAsync > error:::::::", error);
      }
    });
  };
  return {
    categories,
    transactions,
    insertTransaction,
    deleteTransaction,
    transactionsByMonth,
  };
};

export default useHomeScreen;
