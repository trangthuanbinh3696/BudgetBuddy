import { Text, TouchableOpacity, View } from "react-native";
import { Category, Transaction } from "../models/types";
import TransactionListItem from "./TransactionListItem";

type TransactionList = {
  transactions: Transaction[];
  categories: Category[];
  deleteTransaction: (id: number) => Promise<void>;
};

function TransactionList({
  transactions,
  categories,
  deleteTransaction,
}: TransactionList) {
  return (
    <View style={{ gap: 15 }}>
      {transactions.map((transaction) => {
        const categoryForCurrentItem = categories.find(
          (e) => e.id === transaction.category_id
        );
        return (
          <TouchableOpacity
            key={transaction.id}
            activeOpacity={0.7}
            onLongPress={() => deleteTransaction(transaction.id)}
          >
            <TransactionListItem
              transaction={transaction}
              categoryInfo={categoryForCurrentItem}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default TransactionList;
