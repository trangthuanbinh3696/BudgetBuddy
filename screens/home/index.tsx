import { ScrollView, Text, View } from "react-native";
import useHomeScreen from "./useHomeScreen";
import TransactionList from "../../components/TransactionsList";
import TransactionSummary from "../../components/TransactionSummary";
import AddTransaction from "../../components/AddTransaction";

function Home() {
  const {
    categories,
    transactions,
    transactionsByMonth,
    insertTransaction,
    deleteTransaction,
  } = useHomeScreen();
  return (
    <ScrollView
      contentContainerStyle={{ padding: 15, gap: 15, paddingVertical: 170 }}
    >
      <AddTransaction insertTransaction={insertTransaction} />
      <TransactionSummary
        totalExpense={transactionsByMonth.totalExpense}
        totalIncome={transactionsByMonth.totalIncome}
      />
      <TransactionList
        categories={categories}
        transactions={transactions}
        deleteTransaction={deleteTransaction}
      />
    </ScrollView>
  );
}

export default Home;
