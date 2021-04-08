import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import * as Yup from "yup";
import _ from "underscore";
import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import Screen from "../components/Screen";

import ListChat from "../components/lists/ListChat";

// const searchvalidationSchema = Yup.object().shape({
//   message: Yup.string().trim().min(1).label("Message"),
// });

function SearchScreen() {
  const [messages, setMessages] = useState([
    {
      message: "Hey man",
      date: "10:00 am",
      myMessage: false,
    },
    {
      message: "Hey what's up",
      date: "10:03 am",
      myMessage: true,
    },
    {
      message: "I just want to ask you for something",
      date: "10:05 am",
      myMessage: false,
    },
    {
      message: "yes what is it",
      date: "10:07 am",
      myMessage: true,
    },
    {
      message: "can I borrow your AirPods for the day",
      date: "10:08 am",
      myMessage: false,
    },
  ]);

  const handleSearch = async (values) => {
    if (values.message == "") return;

    const message = {
      message: values.message,
      date: "10:30 pm ",
      myMessage: true,
    };

    const newMessages = [...messages, message];

    setMessages(newMessages);
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.messages}>
        {messages && (
          <FlatList
            data={messages}
            keyExtractor={(message) => message.message}
            renderItem={({ item }) => <ListChat message={item} />}
          />
        )}
      </View>

      <Form
        initialValues={{
          message: "",
        }}
        onSubmit={(values) => handleSearch(values)}
      >
        <View style={styles.row}>
          <View style={styles.input}>
            <FormField name="message" placeholder="Type a message" />
          </View>
          <View style={styles.button}>
            <SubmitButton title="Send" />
          </View>
        </View>
      </Form>
    </Screen>
  );
}
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  input: {
    width: "70%",
  },
  button: {
    width: "25%",
  },
  messages: {
    flex: 1,
    padding: 15,
  },
});

export default SearchScreen;
