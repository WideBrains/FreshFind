import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function HomeScreen({ navigation, route }) {
  const { email } = route.params;

  const handleLogout = () => {
    navigation.navigate("Login");
  };

  const handleFindSellers = () => {
    navigation.navigate("SellersMap");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to FreshFind!</Text>
      <Text style={styles.email}>{email}</Text>
      <Text style={styles.subtitle}>Find fresh produce near you</Text>

      <TouchableOpacity style={styles.findButton} onPress={handleFindSellers}>
        <Text style={styles.buttonText}>Find Nearby Sellers</Text>
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
    color: "#2ecc71",
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#333",
    marginBottom: 40,
  },
  findButton: {
    width: "80%",
    paddingVertical: 15,
    backgroundColor: "#2ecc71",
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
    backgroundColor: "#e74c3c",
    borderRadius: 8,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
