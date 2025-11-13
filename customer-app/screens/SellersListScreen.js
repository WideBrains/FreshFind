import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";

export default function SellersListScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLocationAndSellers();
  }, []);

  const getLocationAndSellers = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Location permission is required");
        setLoading(false);
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);

      const response = await fetch(
        `http://192.168.0.17:5000/api/product/nearby?latitude=${currentLocation.coords.latitude}&longitude=${currentLocation.coords.longitude}&radius=10`
      );

      const data = await response.json();

      if (response.ok) {
        setSellers(data.sellers);
      }
    } catch (error) {
      Alert.alert("Error", "Could not load sellers");
    } finally {
      setLoading(false);
    }
  };

  const renderSeller = ({ item }) => (
    <TouchableOpacity
      style={styles.sellerCard}
      onPress={() => navigation.navigate("SellerProducts", { seller: item })}
    >
      <View style={styles.sellerHeader}>
        <Text style={styles.sellerName}>{item.business_name}</Text>
        <Text style={styles.distance}>{item.distance.toFixed(2)} km</Text>
      </View>
      {item.phone && <Text style={styles.phone}>📞 {item.phone}</Text>}
      <Text style={styles.tapText}>Tap to view products →</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2ecc71" />
        <Text style={styles.loadingText}>Finding sellers near you...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Nearby Sellers</Text>
        <Text style={styles.count}>{sellers.length} sellers found</Text>
      </View>

      {sellers.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No sellers nearby. Try increasing the search radius.
          </Text>
        </View>
      ) : (
        <FlatList
          data={sellers}
          renderItem={renderSeller}
          keyExtractor={(item) => item.seller_id.toString()}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  backButton: {
    fontSize: 18,
    color: "#2ecc71",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  count: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: "#666",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  list: {
    padding: 15,
  },
  sellerCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#2ecc71",
  },
  sellerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sellerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  distance: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2ecc71",
  },
  phone: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  tapText: {
    fontSize: 14,
    color: "#2ecc71",
    fontStyle: "italic",
  },
});
