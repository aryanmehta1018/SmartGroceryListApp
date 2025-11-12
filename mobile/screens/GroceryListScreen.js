import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { Card, Text, Button, IconButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function GroceryListScreen({ route, navigation }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    loadGroceryList();
  }, []);

  // 🧠 Load all low-stock items
  const loadGroceryList = async () => {
    const data = await AsyncStorage.getItem("inventory");
    if (data) {
      const inv = JSON.parse(data);
      const need = inv.filter((i) => i.qty <= (i.threshold || 1));
      setList(need);
    }
  };

  // 🛒 Mark item as restocked
  const restockItem = async (id) => {
    const data = await AsyncStorage.getItem("inventory");
    let inv = data ? JSON.parse(data) : [];

    inv = inv.map((item) =>
      item.id === id ? { ...item, qty: item.qty + 5 } : item 
    );

    await AsyncStorage.setItem("inventory", JSON.stringify(inv));
    setList(inv.filter((i) => i.qty <= (i.threshold || 1))); 
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F5F5", padding: 10 }}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          color: "#333",
          marginBottom: 12,
          textAlign: "center",
        }}
      >
        Grocery List
      </Text>

      <FlatList
        data={list}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <Card
            style={{
              marginVertical: 6,
              backgroundColor: "white",
              elevation: 2,
              borderRadius: 10,
            }}
          >
            <Card.Title
              title={item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              subtitle={`Current Qty: ${item.qty}`}
              right={() => (
                <IconButton
                  icon="check-circle-outline"
                  iconColor="#4CAF50"
                  onPress={() => restockItem(item.id)}
                />
              )}
            />
          </Card>
        )}
      />

      <Button
        mode="contained"
        icon="arrow-left"
        onPress={() => navigation.navigate("Inventory")}
        style={{ marginTop: 12, backgroundColor: "#2196F3" }}
      >
        Back to Inventory
      </Button>
    </View>
  );
}
