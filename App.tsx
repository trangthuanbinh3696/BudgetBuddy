import React from "react";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import { useEffect, useState } from "react";
import { SQLiteProvider } from "expo-sqlite";
import Home from "./screens/home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const loadDatabase = async () => {
  const dbName = "mySQLiteDB.db";
  const dbAsset = require("./assets/mySQLiteDB.db");
  // in source
  const dbUri = Asset.fromModule(dbAsset).uri;
  // file path
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  console.log("29148 > loadDatabase > dbFilePath:::::::", dbFilePath);

  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);

  console.log("29148 > loadDatabase > fileInfo:::::::", fileInfo);

  if (!fileInfo.exists) {
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
      {
        intermediates: true,
      }
    );
    await FileSystem.downloadAsync(dbUri, dbFilePath);
  }
};
export default function App() {
  const [dbLoaded, setDbLoaded] = useState(false);

  useEffect(() => {
    loadDatabase()
      .then(() => setDbLoaded(true))
      .catch((err) => console.error(err));
  }, []);

  if (!dbLoaded) {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator size={"large"} />
        <Text>Loading database...</Text>
      </View>
    );
  }
  return (
    <NavigationContainer>
      <React.Suspense
        fallback={
          <View style={{ flex: 1 }}>
            <ActivityIndicator size={"large"} />
            <Text>Loading database...</Text>
          </View>
        }
      >
        <SQLiteProvider databaseName="mySQLiteDB.db" useSuspense>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerTitle: "Budget Buddy",
                headerLargeTitle: true,
              }}
            />
          </Stack.Navigator>
        </SQLiteProvider>
      </React.Suspense>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
