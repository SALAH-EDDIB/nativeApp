import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import SaveScreen from "../screens/SaveScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="Favorite" component={FavoriteScreen} />
    <Stack.Screen name="Save" component={SaveScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
