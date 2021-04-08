import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";

import Text from "../Text";
import colors from "../../config/colors";
import { FontAwesome } from "@expo/vector-icons";
import commentApi from "../../api/comments";
import useApi from "../../hooks/useApi";
import ActivityIndicator from "../ActivityIndicator";

function PickerItem({ comment, onRefresh }) {
  const deleteCommentApi = useApi(commentApi.deleteComments);

  const deleteHandler = async () => {
    await deleteCommentApi.request(comment._id);
    onRefresh();
  };

  return (
    <>
      <ActivityIndicator visible={deleteCommentApi.loading} />
      <View style={styles.row}>
        <FontAwesome name="user-circle-o" size={40} color={colors.primary} />

        <View style={styles.commentContainer}>
          <View style={[styles.row, { justifyContent: "space-between" }]}>
            <Text style={styles.writer}>{comment.writer}</Text>
          </View>

          <Text style={styles.comment}>{comment.comment}</Text>
        </View>
      </View>
      {comment.myComment && (
        <TouchableOpacity onPress={deleteHandler}>
          <Text style={styles.delete}>Delete</Text>
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  commentContainer: {
    marginLeft: 10,
    backgroundColor: "#ecf0f1",
    alignSelf: "flex-start",
    maxWidth: "70%",
    minWidth: "40%",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginVertical: 8,
    paddingBottom: 10,
  },

  writer: {
    padding: 3,
    color: colors.primary,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  delete: {
    color: colors.primary,
    marginLeft: 60,
    marginTop: -7,
  },
});

export default PickerItem;
