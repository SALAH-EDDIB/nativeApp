import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import EventScreen from "../screens/EventScreen";
import AddEventScreen from "../screens/AddEventScreen";
import Test from "../screens/testpicker";

const Stack = createStackNavigator();
function EventNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Events"
        options={{ headerShown: false }}
        component={EventScreen}
      />

      <Stack.Screen name="AddEvent" component={AddEventScreen} />
    </Stack.Navigator>
  );
}

export default EventNavigator;
