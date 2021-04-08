import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";

import Text from "../Text";
import colors from "../../config/colors";

function PickerItem({ result, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.row}>
        <Text style={styles.text}>
          <Text style={styles.span}> Owner :</Text> {result.name}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.span}>company :</Text> {result.compagnie}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>
          <Text style={styles.span}>category :</Text> {result.categorie}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.span}>location :</Text> {result.adresse}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: colors.light,
    marginBottom: 10,
  },

  text: {
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  span: {
    color: colors.primary,
    fontWeight: "bold",
  },
});

export default PickerItem;
