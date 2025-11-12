import React, { useState, useEffect } from "react";
import { View, FlatList, Alert } from "react-native";
import { Card, Text, Button, IconButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function InventoryScreen({ navigation, route }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadInventory();
  }, []);

  useEffect(() => {
    if (route.params && route.params.detections) {
      handleDetections(route.params.detections);
    }
  }, [route.params]);

  const loadInventory = async () => {
    const data = await AsyncStorage.getItem("inventory");
    if (data) setItems(JSON.parse(data));
  };

  const saveInventory = async (inv) => {
    await AsyncStorage.setItem("inventory", JSON.stringify(inv));
  };

  const handleDetections = async (detections) => {
    const grouped = detections.reduce((acc, d) => {
      const label = d.label.toLowerCase();
      acc[label] = (acc[label] || 0) + 1;
      return acc;
    }, {});

    const data = await AsyncStorage.getItem("inventory");
    let currentItems = data ? JSON.parse(data) : [];

    Object.entries(grouped).forEach(([label, count]) => {
      const existingIndex = currentItems.findIndex(
        (item) => item.name.toLowerCase() === label
      );
      if (existingIndex !== -1) {
        currentItems[existingIndex].qty += count;
      } else {
        currentItems.push({
          id: Date.now().toString() + Math.random(),
          name: label,
          qty: count,
          threshold: 1,
        });
      }
    });

    setItems(currentItems);
    saveInventory(currentItems);
  };

  const useItem = async (id) => {
    const updated = items.map((item) =>
      item.id === id
        ? { ...item, qty: Math.max(0, item.qty - 1) }
        : item
    );
    setItems(updated);
    saveInventory(updated);
  };

  const clearInventory = async () => {
    Alert.alert("Confirm", "Clear all items?", [
      { text: "Cancel" },
      {
        text: "Yes",
        onPress: async () => {
          await AsyncStorage.removeItem("inventory");
          setItems([]);
        },
      },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F5F5", padding: 10 }}>
      <Button
        mode="contained"
        icon="camera"
        onPress={() => navigation.navigate("CameraScan")}
        style={{ marginBottom: 10 }}
      >
        Scan Items
      </Button>

      <FlatList
        data={items}
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
              subtitle={`Quantity: ${item.qty}`}
              right={() => (
                <IconButton
                  icon="minus-circle-outline"
                  iconColor="#E53935"
                  onPress={() => useItem(item.id)}
                />
              )}
            />
          </Card>
        )}
      />

      <Button
        mode="contained"
        icon="cart"
        onPress={() => navigation.navigate("GroceryList", { items })}
        style={{ marginTop: 12, backgroundColor: "#2196F3" }}
      >
        View Grocery List
      </Button>

      <Button
        mode="outlined"
        icon="delete"
        onPress={clearInventory}
        textColor="red"
        style={{ marginTop: 10 }}
      >
        Clear Inventory
      </Button>
    </View>
  );
}
