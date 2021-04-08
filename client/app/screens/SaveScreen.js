import React, { useEffect, useRef } from "react";
import { FlatList, StyleSheet, ScrollView, View } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import Card from "../components/Card";
import colors from "../config/colors";
import postsApi from "../api/posts";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import useApi from "../hooks/useApi";

function ListingsScreen({ navigation }) {
  const getSavePostsApi = useApi(postsApi.getSavePosts);

  useEffect(() => {
    getSavePostsApi.request();
  }, []);

  getSavePostsApi.data && console.log(getSavePostsApi.data);

  return (
    <>
      <ActivityIndicator visible={getSavePostsApi.loading} />
      <Screen style={styles.screen}>
        {getSavePostsApi.error && (
          <>
            <AppText>Couldn't retrieve the Posts.</AppText>
            <Button title="Retry" onPress={getSavePostsApi.request} />
          </>
        )}

        {!getSavePostsApi.error && (
          <FlatList
            data={getSavePostsApi.data}
            keyExtractor={(post) => post._id.toString()}
            renderItem={({ item }) => (
              <Card
                post={item}
                onPress={() => navigation.navigate(routes.POSTS_COMMENTS, item)}
              />
            )}
            refreshing={false}
            onRefresh={() => getSavePostsApi.request()}
          />
        )}
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;
