import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import colors from "../config/colors";
import { FontAwesome } from "@expo/vector-icons";
function ProfileScreen({ route }) {
  const [favorite, setFavorite] = useState(false);
  const result = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <FontAwesome
          style={styles.icon}
          name="user-circle-o"
          size={120}
          color={colors.primary}
        />
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={() => setFavorite(!favorite)}
          >
            {favorite ? (
              <FontAwesome name="heart" size={24} color={colors.white} />
            ) : (
              <Text style={styles.text}>add favorite</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.secondary }]}
          >
            <Text style={styles.text}>Send Message</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.name}>{result.name}</Text>
        <Text style={styles.email}>{result.email}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    flex: 1,
  },
  profile: {
    backgroundColor: colors.white,
    flex: 1,
    marginHorizontal: 40,
    marginVertical: 50,
    marginTop: 150,
    borderRadius: 15,
    alignItems: "center",
  },
  icon: {
    bottom: 80,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginHorizontal: 10,
  },
  text: {
    color: colors.white,
    fontSize: 14,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    bottom: 50,
  },
  name: {
    color: "#747d8c",
    fontSize: 28,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  email: {
    color: "#747d8c",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default ProfileScreen;
