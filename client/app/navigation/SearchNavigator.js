import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createStackNavigator();
function SearchNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="search"
        options={{ headerShown: false }}
        component={SearchScreen}
      />

      <Stack.Screen
        name="searchResult"
        options={{ headerShown: false }}
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
}

export default SearchNavigator;
