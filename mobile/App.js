import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CameraScanScreen from "./screens/CameraScanScreen";
import InventoryScreen from "./screens/InventoryScreen";
import GroceryListScreen from "./screens/GroceryListScreen";
import SettingsScreen from "./screens/SettingsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Inventory"
          screenOptions={{
            headerStyle: { backgroundColor: "#4CAF50" },
            headerTintColor: "white",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        >
          <Stack.Screen name="CameraScan" component={CameraScanScreen} options={{ title: "Scan Items" }} />
          <Stack.Screen name="Inventory" component={InventoryScreen} options={{ title: "Inventory" }} />
          <Stack.Screen name="GroceryList" component={GroceryListScreen} options={{ title: "Grocery List" }} />
          <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: "Settings" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
