import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>FreshFind</Text>
      <Text style={styles.subtitle}>Customer App</Text>
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
    color: "#2ecc71",
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginTop: 10,
  },
});
