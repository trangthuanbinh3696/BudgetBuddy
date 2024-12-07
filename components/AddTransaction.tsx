import { MaterialIcons } from "@expo/vector-icons";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Category, Transaction } from "../models/types";
import React, { useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import Card from "./ui/Card";
import SegmentedControl from "@react-native-segmented-control/segmented-control";

function AddTransaction({
  insertTransaction,
}: {
  insertTransaction: (transaction: Transaction) => Promise<void>;
}) {
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [typeSelected, setTypeSelected] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Expense");
  const [categoryId, setCategoryId] = useState(1);
  const db = useSQLiteContext();

  useEffect(() => {
    async function getExpenseType(currentTab: number) {
      setCategory(currentTab === 0 ? "Expense" : "Income");
      const type = currentTab === 0 ? "Expense" : "Income";
      const result = await db.getAllAsync<Category>(
        `SELECT * FROM Categories WHERE type = ?;`,
        [type]
      );
      setCategories(result);
    }
    getExpenseType(currentTab);
  }, [currentTab]);
  //
  async function handleSave() {
    try {
      const payload = {
        amount: Number(amount),
        description,
        category_id: categoryId,
        date: new Date().getTime() / 1000,
        type: category as "Expense" | "Income",
      };

      console.log("29148 > handleSave > payload:::::::", payload);
      // @ts-ignore
      await insertTransaction(payload);

      setAmount("");
      setDescription("");
      setCategory("Expense");
      setCategoryId(1);
      setCurrentTab(0);
      setIsAddingTransaction(false);
    } catch (error) {
      console.log("29148 > handleSave > error:::::::", error);
    }
  }

  return (
    <View style={{ marginBottom: 15 }}>
      {isAddingTransaction ? (
        <View>
          <Card>
            <TextInput
              placeholder="$Amount"
              style={{ fontSize: 32, marginBottom: 15, fontWeight: "bold" }}
              keyboardType="numeric"
              onChangeText={(text) => {
                const numericValue = text.replace(/[^0-9.]/g, "");
                setAmount(numericValue);
              }}
            />
            <TextInput
              placeholder="Description"
              style={{ marginBottom: 15 }}
              onChangeText={setDescription}
            />
            <Text style={{ marginBottom: 6 }}>Select a entry type</Text>
            <SegmentedControl
              values={["Expense", "Income"]}
              style={{ marginBottom: 15 }}
              selectedIndex={0}
              onChange={({ nativeEvent: { selectedSegmentIndex } }) =>
                setCurrentTab(selectedSegmentIndex)
              }
            />
            {categories.map((e) => (
              <AddTransaction.CategoryButton
                key={e.name}
                id={e.id}
                title={e.name}
                isSelected={typeSelected == e.name}
                setTypeSelected={setTypeSelected}
                setCategoryId={setCategoryId}
              />
            ))}
          </Card>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Button
              title="Cancel"
              color="red"
              onPress={() => setIsAddingTransaction(false)}
            />
            <Button title="Save" onPress={handleSave} />
          </View>
        </View>
      ) : (
        <AddTransaction.AddButton
          setIsAddingTransaction={setIsAddingTransaction}
        />
      )}
    </View>
  );
}

AddTransaction.AddButton = function AddButton({
  setIsAddingTransaction,
}: {
  setIsAddingTransaction: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <TouchableOpacity
      onPress={() => setIsAddingTransaction(true)}
      activeOpacity={0.6}
      style={{
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#007bff20",
        borderRadius: 15,
      }}
    >
      <MaterialIcons name={"add-circle-outline"} size={24} color={"#007BFF"} />
      <Text style={{ fontWeight: "700", color: "#007BFF", marginLeft: 5 }}>
        New Entry
      </Text>
    </TouchableOpacity>
  );
};

AddTransaction.CategoryButton = function CategoryButton({
  id,
  title,
  isSelected,
  setTypeSelected,
  setCategoryId,
}: {
  id: number;
  title: string;
  isSelected: boolean;
  setTypeSelected: React.Dispatch<React.SetStateAction<string>>;
  setCategoryId: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <TouchableOpacity
      onPress={() => {
        setTypeSelected(title);
        setCategoryId(id);
      }}
      activeOpacity={0.6}
      style={{
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: isSelected ? "#007bff20" : "#00000020",
        borderRadius: 15,
        marginBottom: 6,
      }}
    >
      <Text
        style={{
          fontWeight: "700",
          color: isSelected ? "#007BFF" : "#000000",
          marginLeft: 5,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
export default AddTransaction;
