import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

export default function ProfileSetupScreen({ navigation, route }) {
  const { userId, email } = route.params;
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSetup = async () => {
    if (!businessName || !phone) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      const response = await fetch(
        "http://192.168.0.17:5000/api/seller/profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            business_name: businessName,
            phone: phone,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        navigation.navigate("Home", {
          email: email,
          sellerId: data.seller.id,
          businessName: data.seller.business_name,
        });
      } else {
        Alert.alert("Error", data.error || "Profile setup failed");
      }
    } catch (error) {
      Alert.alert("Error", "Could not connect to server");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Setup Your Business</Text>
      <Text style={styles.subtitle}>Complete your seller profile</Text>

      <TextInput
        style={styles.input}
        placeholder="Business Name"
        value={businessName}
        onChangeText={setBusinessName}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.button} onPress={handleSetup}>
        <Text style={styles.buttonText}>Complete Setup</Text>
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
    fontSize: 32,
    fontWeight: "bold",
    color: "#e74c3c",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 40,
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
});
