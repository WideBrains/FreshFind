import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";

export default function AddProductScreen({ navigation, route }) {
  const { sellerId } = route.params;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [stock, setStock] = useState("");

  const handleAddProduct = async () => {
    if (!name || !price || !unit || !stock) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      const response = await fetch("http://192.168.0.17:5000/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          seller_id: sellerId,
          name: name,
          price: parseFloat(price),
          unit: unit,
          stock_quantity: parseInt(stock),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Product added successfully!");
        navigation.goBack();
      } else {
        Alert.alert("Error", data.error || "Failed to add product");
      }
    } catch (error) {
      Alert.alert("Error", "Could not connect to server");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add New Product</Text>

      <TextInput
        style={styles.input}
        placeholder="Product Name (e.g., Tomatoes)"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Price (e.g., 40)"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Unit (e.g., kg, dozen)"
        value={unit}
        onChangeText={setUnit}
      />

      <TextInput
        style={styles.input}
        placeholder="Stock Quantity"
        value={stock}
        onChangeText={setStock}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
        <Text style={styles.buttonText}>Add Product</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#e74c3c",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#e74c3c",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  cancelButton: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#e74c3c",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  cancelText: {
    color: "#e74c3c",
    fontSize: 18,
    fontWeight: "bold",
  },
});
