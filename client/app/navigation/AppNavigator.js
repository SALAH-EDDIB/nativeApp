import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AccountNavigator from "./AccountNavigator";
import PostNavigator from "./PostNavigator";
import EventNavigator from "./EventNavigator";
import SearchButton from "./SearchButton";
import SearchNavigator from "./SearchNavigator";
import routes from "./routes";
import SearchScreen from "../screens/SearchScreen";
import ChatTestScreen from "../screens/ChatTestScreen";
// import useNotifications from "../hooks/useNotifications";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  //   useNotifications();

  return (
    <Tab.Navigator
      tabBarOptions={{
        style: { height: 60 },
        labelStyle: { marginBottom: 10 },
      }}
    >
      <Tab.Screen
        name="Post"
        component={PostNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Event"
        component={EventNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchNavigator}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <SearchButton onPress={() => navigation.navigate(routes.SEARCH)} />
          ),
        })}
      />
      <Tab.Screen
        name="Messages"
        component={ChatTestScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="message-bulleted"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
