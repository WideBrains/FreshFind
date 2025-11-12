import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>FreshFind</Text>
      <Text style={styles.subtitle}>Seller App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#e74c3c",
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginTop: 10,
  },
});
