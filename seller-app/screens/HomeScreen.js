import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function HomeScreen({ navigation, route }) {
  const { email, sellerId, businessName } = route.params;

  const handleLogout = () => {
    navigation.navigate("Login");
  };

  const handleAddProduct = () => {
    navigation.navigate("AddProduct", { sellerId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{businessName || "Seller Dashboard"}</Text>
      <Text style={styles.email}>{email}</Text>

      <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
        <Text style={styles.buttonText}>Add New Product</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#e74c3c",
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginBottom: 40,
  },
  addButton: {
    width: "80%",
    paddingVertical: 15,
    backgroundColor: "#e74c3c",
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  logoutButton: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    backgroundColor: "#95a5a6",
    borderRadius: 8,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
