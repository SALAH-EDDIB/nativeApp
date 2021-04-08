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
  const getPostsApi = useApi(postsApi.getPosts);

  useEffect(() => {
    getPostsApi.request();
  }, []);

  return (
    <>
      <ActivityIndicator visible={getPostsApi.loading} />
      <Screen style={styles.screen}>
        {getPostsApi.error && (
          <>
            <AppText>Couldn't retrieve the Posts.</AppText>
            <Button title="Retry" onPress={getPostsApi.request} />
          </>
        )}

        {!getPostsApi.error && (
          <>
            <View style={{ width: "80%", alignSelf: "center" }}>
              <Button
                title="ADD POST"
                onPress={() => navigation.navigate(routes.ADD_POSTS)}
              />
            </View>
            <FlatList
              data={getPostsApi.data}
              keyExtractor={(post) => post._id.toString()}
              renderItem={({ item }) => (
                <Card
                  post={item}
                  onPress={() =>
                    navigation.navigate(routes.POSTS_COMMENTS, item)
                  }
                />
              )}
              refreshing={false}
              onRefresh={() => getPostsApi.request()}
            />
          </>
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
