import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { FontAwesome5, Octicons } from "@expo/vector-icons";
import Screen from "../components/Screen";
import colors from "../config/colors";
import routes from "../navigation/routes";
import eventApi from "../api/events";
import useApi from "../hooks/useApi";

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};

const cleanDate = (date) => {
  return (
    timeToString(date).split("-")[1] + "/" + timeToString(date).split("-")[2]
  );
};

function EventScreen({ navigation }) {
  const getEventApi = useApi(eventApi.getEvents);
  const [items, setItems] = useState({
    "2017-05-28": [
      {
        title: "event test",
        from: "05/28",
        to: "05/29",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget dui euismod, blandit justo a, ultrices erat",
      },
    ],
    "2017-05-31": [
      {
        title: "event test",
        from: "05-31",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget dui euismod, blandit justo a, ultrices erat",
      },
    ],
    "2017-06-30": [{ title: "event test" }],
  });

  useEffect(() => {
    getEventApi.request();
  }, []);

  console.log(getEventApi.data);

  const loadItems = (day) => {
    getEventApi.data.forEach((event) => {
      const strTime = timeToString(event.startDate);
      if (!items[strTime]) {
        items[strTime] = [];
        items[strTime].push({
          title: event.title,
          content: event.description,
          from: event.startDate,
          to: event.endDate,
        });
      }
    });

    const newItems = {};
    Object.keys(items).forEach((key) => {
      newItems[key] = items[key];
    });

    setItems(newItems);
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
        <View style={styles.eventContainer}>
          <View style={styles.row}>
            <Text style={styles.date}>{cleanDate(item.from)}</Text>
            {item.to && (
              <Text style={styles.date}> - {cleanDate(item.to)} </Text>
            )}
          </View>
          <Text style={styles.title}> {item.title} </Text>
          <Text style={styles.content}> {item.content} </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Screen>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        renderEmptyData={() => (
          <View style={styles.empty}>
            <Octicons name="calendar" size={120} color={colors.primary} />
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: colors.primary,
                marginTop: 30,
              }}
            >
              Check calendar for events
            </Text>
          </View>
        )}
        renderEmptyDate={() => null}
        renderItem={renderItem}
        theme={{
          agendaKnobColor: colors.primary,
          indicatorColor: colors.primary,
          dotColor: colors.primary,
          selectedDayBackgroundColor: colors.primary,
        }}
      />
      <View style={styles.addContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate(routes.ADD_EVENTS)}
        >
          <View style={styles.add}>
            <FontAwesome5 name="calendar-plus" size={30} color={colors.white} />
          </View>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  eventContainer: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 15,
  },
  title: {
    fontSize: 20,
    color: colors.primary,
  },
  row: {
    flexDirection: "row",
    marginLeft: 5,
  },
  date: {
    fontWeight: "bold",
    color: "#718093",
    fontSize: 21,
  },
  content: {
    color: colors.medium,
    paddingVertical: 10,
    marginRight: 10,
  },
  add: {
    width: 60,
    height: 60,
    backgroundColor: colors.primary,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  addContainer: {
    position: "absolute",
    bottom: 20,
    right: 30,
  },
  empty: {
    alignItems: "center",
    marginTop: 100,
  },
});

export default EventScreen;
