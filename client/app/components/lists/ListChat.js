import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";

import Text from "../Text";
import colors from "../../config/colors";

function PickerItem({ message }) {
  return (
    <View style={[styles.message, message.myMessage && styles.myMessage]}>
      <Text
        style={[styles.messageText, message.myMessage && styles.myMessageText]}
      >
        {message.message}
      </Text>
      <Text style={[styles.date, message.myMessage && styles.myDate]}>
        {message.date}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    backgroundColor: "#ecf0f1",
    alignSelf: "flex-start",
    maxWidth: "70%",
    minWidth: "40%",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginVertical: 8,
  },
  myMessage: {
    backgroundColor: colors.primary,
    alignSelf: "flex-end",
  },
  messageText: {
    padding: 3,
  },
  myMessageText: {
    color: colors.white,
  },
  date: {
    color: colors.medium,
    fontSize: 14,
    alignSelf: "flex-end",
  },
  myDate: {
    color: "#ecf0f1",
  },
});

export default PickerItem;
