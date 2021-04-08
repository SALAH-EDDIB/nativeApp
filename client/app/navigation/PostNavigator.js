import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PostsScreen from "../screens/PostsScreen";
import AddPostScreen from "../screens/AddPostScreen";
import PostsCommentsScreen from "../screens/PostsCommentsScreen";
import colors from "../config/colors";
const Stack = createStackNavigator();
function PostNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Posts"
        options={{ headerShown: false }}
        component={PostsScreen}
      />
      <Stack.Screen
        name="PostsComments"
        options={{
          headerTitle: "Comments",
          headerTintColor: colors.medium,
        }}
        component={PostsCommentsScreen}
      />
      <Stack.Screen name="AddPost" component={AddPostScreen} />
    </Stack.Navigator>
  );
}

export default PostNavigator;
