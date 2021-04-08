import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";

import Text from "./Text";
import colors from "../config/colors";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const baseURL = "http://172.16.8.141:5000/";

import postsApi from "../api/posts";
import useApi from "../hooks/useApi";

import ActivityIndicator from "./ActivityIndicator";

function Card({ post, onPress }) {
  const [save, setSave] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedPost, setSavedPost] = useState([]);
  const unSavePostsApi = useApi(postsApi.unsavePost);

  const getSaved = async () => {
    setSaving(true);
    const data = await postsApi.getSavePost(post._id);
    if (Array.isArray(data.data) && data.data.length > 0) {
      setSave(true);
      setSavedPost(data.data);
    }
    setSaving(false);
  };

  useEffect(() => {
    getSaved();
  }, []);

  const myDate = new Date(post.date);

  const saveHandler = async () => {
    if (!save) {
      setSaving(true);
      const responde = await postsApi.savePost({ postId: post._id });
      const saved = [];
      saved.push(responde.data);
      setSavedPost(saved);
      setSaving(false);
    } else {
      await unSavePostsApi.request(savedPost[0]._id);
    }

    setSave(!save);
  };

  return (
    <>
      <View style={styles.card}>
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {post.title}
          </Text>
          <Text style={styles.subTitle} numberOfLines={2}>
            {post.content}
          </Text>

          <Text style={styles.date}>{myDate.toUTCString()}</Text>
        </View>

        <Image
          style={styles.image}
          source={{
            uri: baseURL + post.image.replace(`\\`, "/"),
          }}
        />
        <ActivityIndicator visible={unSavePostsApi.loading || saving} />
        <View style={[styles.row, { height: 60 }]}>
          <TouchableOpacity onPress={onPress}>
            <View style={styles.row}>
              <MaterialCommunityIcons
                style={styles.icon}
                name="comment-processing"
                size={24}
                color={colors.primary}
              />
              <Text style={styles.text}>Comment</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={saveHandler}>
            <View style={[styles.row, save && styles.save]}>
              <MaterialCommunityIcons
                style={styles.icon}
                name="content-save"
                size={24}
                color={save ? colors.white : colors.primary}
              />
              <Text style={[styles.text, save && { color: colors.white }]}>
                save
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
    borderColor: colors.light,
    borderWidth: 1,
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  subTitle: {
    color: colors.medium,
    fontWeight: "bold",
    marginBottom: 6,
  },
  title: {
    marginBottom: 7,
    color: colors.primary,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    paddingHorizontal: 20,
  },
  save: {
    backgroundColor: colors.primary,
    borderRadius: 30,
  },
  text: {
    color: colors.primary,
  },
  icon: {
    marginRight: 10,
  },
  date: {
    fontSize: 16,
    color: colors.medium,
  },
});

export default Card;
