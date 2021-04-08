import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import * as Yup from "yup";
import _ from "underscore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import Screen from "../components/Screen";
import commentsApi from "../api/comments";
import useApi from "../hooks/useApi";

import Text from "../components/Text";
import ActivityIndicator from "../components/ActivityIndicator";
import ListComment from "../components/lists/ListComment";
import colors from "../config/colors";

function PostsCommentsScreen({ route }) {
  const post = route.params;
  const getCommentsApi = useApi(commentsApi.getComments);
  const postCommentsApi = useApi(commentsApi.postComments);

  const handlepost = async (values, resetForm) => {
    if (values.comment == "") return;
    const commentInfo = {
      postId: post._id,
      comment: values.comment,
    };
    await postCommentsApi.request(commentInfo);
    getCommentsApi.request(post._id);

    resetForm();
  };

  useEffect(() => {
    getCommentsApi.request(post._id);
  }, []);

  return (
    <>
      <ActivityIndicator
        visible={getCommentsApi.loading || postCommentsApi.loading}
      />
      <Screen style={styles.container}>
        <View style={styles.messages}>
          {getCommentsApi.error && (
            <View style={styles.errorContainer}>
              <MaterialCommunityIcons
                name="comment-alert-outline"
                size={120}
                color={colors.primary}
              />
              <Text style={styles.error}>no Comment for this post</Text>
            </View>
          )}

          {!getCommentsApi.loading &&
            !getCommentsApi.error &&
            Array.isArray(getCommentsApi.data) &&
            getCommentsApi.data.length > 0 && (
              <FlatList
                data={getCommentsApi.data}
                keyExtractor={(comment) => {
                  return comment._id.toString();
                }}
                renderItem={({ item }) => (
                  <ListComment
                    comment={item}
                    onRefresh={() => getCommentsApi.request(post._id)}
                  />
                )}
                refreshing={false}
                onRefresh={() => getCommentsApi.request(post._id)}
              />
            )}
        </View>

        <Form
          initialValues={{
            comment: "",
          }}
          onSubmit={(values, { resetForm }) => handlepost(values, resetForm)}
        >
          <View style={styles.row}>
            <View style={styles.input}>
              <FormField name="comment" placeholder="Add a comment" />
            </View>
            <View style={styles.button}>
              <SubmitButton title="Post" />
            </View>
          </View>
        </Form>
      </Screen>
    </>
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
  error: {
    textAlign: "center",
    color: colors.primary,
    fontWeight: "bold",
  },
  errorContainer: {
    alignItems: "center",
  },
});

export default PostsCommentsScreen;
