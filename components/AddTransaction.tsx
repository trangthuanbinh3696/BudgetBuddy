import { MaterialIcons } from "@expo/vector-icons";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Category, Transaction } from "../models/types";
import React, { useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import Card from "./ui/Card";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";

interface FormValues extends FieldValues {
  amount: string;
  description: string;
  category: Category;
}
function AddTransaction({
  insertTransaction,
}: {
  insertTransaction: (transaction: Transaction) => Promise<void>;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      amount: "",
      description: "",
      category: undefined,
    },
  });
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const db = useSQLiteContext();

  useEffect(() => {
    async function getExpenseType(currentTab: number) {
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
  async function handleSave(data: {
    amount: string;
    description: string;
    category: Category;
  }) {
    try {
      const payload = {
        amount: Number(data.amount),
        description: data.description,
        category_id: data.category.id,
        date: new Date().getTime() / 1000,
        type: currentTab === 0 ? "Expense" : "Income",
      };
      // @ts-ignore
      await insertTransaction(payload);
      setCurrentTab(0);
      setIsAddingTransaction(false);
      reset();
    } catch (error) {
      console.log("29148 > handleSave > error:::::::", error);
    }
  }

  return (
    <View style={{ marginBottom: 15 }}>
      {isAddingTransaction ? (
        <View>
          <Card>
            <Controller
              control={control}
              name={"amount"}
              rules={{
                required: "*This is required",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Amount must be a numeric value",
                },
              }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  onChangeText={field.onChange}
                  placeholder="$Amount"
                  style={{ fontSize: 32, marginBottom: 15, fontWeight: "bold" }}
                  keyboardType="numeric"
                />
              )}
            />
            {errors.amount && (
              <Text style={{ color: "red" }}>{errors?.amount?.message}</Text>
            )}

            <Controller
              control={control}
              name="description"
              rules={{
                required: "*This is required",
              }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  onChangeText={field.onChange}
                  placeholder="Description"
                  style={{ marginBottom: 15 }}
                />
              )}
            />
            {errors.description && (
              <Text style={{ color: "red" }}>
                {errors?.description?.message}
              </Text>
            )}
            <Text style={{ marginBottom: 6 }}>Select a entry type</Text>
            <SegmentedControl
              values={["Expense", "Income"]}
              style={{ marginBottom: 15 }}
              selectedIndex={0}
              onChange={({ nativeEvent: { selectedSegmentIndex } }) =>
                setCurrentTab(selectedSegmentIndex)
              }
            />
            <Controller
              control={control}
              name={"category"}
              rules={{
                required: "*This is required.",
              }}
              render={({ field: { onChange, value } }) => (
                <View>
                  {categories.map((e) => (
                    <AddTransaction.CategoryButton
                      category={e}
                      key={e.name}
                      isSelected={value?.name == e.name}
                      setCategory={onChange}
                    />
                  ))}
                </View>
              )}
            />
            {errors?.category && (
              <Text style={{ color: "red" }}>{errors?.category?.message}</Text>
            )}
          </Card>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Button
              title="Cancel"
              color="red"
              onPress={() => setIsAddingTransaction(false)}
            />
            <Button title="Save" onPress={handleSubmit(handleSave)} />
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
  category,
  isSelected,
  setCategory,
}: {
  category: Category;
  isSelected: boolean;
  setCategory: (value: Category) => void;
}) {
  const { id, name } = category;
  return (
    <TouchableOpacity
      onPress={() => {
        setCategory(category);
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
        {name}
      </Text>
    </TouchableOpacity>
  );
};
export default AddTransaction;
