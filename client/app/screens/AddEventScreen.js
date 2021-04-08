import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Yup from "yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Formik } from "formik";
import {
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import Screen from "../components/Screen";
import eventApi from "../api/events";
import UploadScreen from "./UploadScreen";
import routes from "../navigation/routes";
import Button from "../components/Button";
import Text from "../components/Text";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  content: Yup.string().label("content"),
  startDate: Yup.date().required().label("startDate"),
  endDate: Yup.date().label("endDate"),
});

function ListingEditScreen({ navigation }) {
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [startShow, setStartShow] = useState(false);
  const [endShow, setEndShow] = useState(false);
  const [endDate, setEndDate] = useState(false);

  const handleSubmit = async (event, { resetForm }) => {
    let eventInfo = {};

    console.log(event);

    // if (
    //   !event.endDate ||
    //   event.startDate.toLocaleDateString() == event.endDate.toLocaleDateString()
    // ) {
    //   eventInfo = {
    //     description: event.content,
    //     endDate: null,
    //     startDate: event.startDate,
    //     title: event.title,
    //   };
    // } else {
    //   eventInfo = {
    //     description: event.content,
    //     endDate: event.endDate,
    //     startDate: event.startDate,
    //     title: event.title,
    //   };
    // }



    // console.log(eventInfo);

    // setProgress(0);
    // setUploadVisible(true);
    // const result = await eventApi.addEvent(eventInfo, (progress) =>
    //   setProgress(progress)
    // );

    // if (!result.ok) {
    //   setUploadVisible(false);
    //   console.log(result.data);
    //   return alert("Could not save the post");
    // }
    // resetForm();

    // navigation.navigate(routes.EVENTS);
  };

  const showStartDatepicker = () => {
    setStartShow(true);
  };
  const showEndDatepicker = () => {
    setEndShow(true);
  };

  return (
    <Screen style={styles.container}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <Formik
        initialValues={{
          title: "",
          content: "",
          startDate: "",
          endDate: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleBlur,
          setFieldValue,
          handleSubmit,
          values,
        }) => (
          <View>
            <FormField maxLength={255} name="title" placeholder="Title" />

            <View>
              <View style={styles.start}>
                <Button
                  onPress={showStartDatepicker}
                  title="Event Start Date"
                />
                <Text style={styles.date}>
                  {values.startDate.toLocaleDateString().replace(/\//gi, "-")}
                </Text>
              </View>

              {startShow && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={values.startDate}
                  mode={"date"}
                  display="calendar"
                  onChange={(date, dateString) => {
                    const currentDate = dateString || values.startDate;
                    setStartShow(false);
                    setFieldValue("startDate", currentDate);
                  }}
                />
              )}
            </View>
            <View>
              <View style={styles.end}>
                <Button onPress={showEndDatepicker} title="Event End Date " />
                {endDate && (
                  <Text style={styles.date}>
                    {values.endDate.toLocaleDateString().replace(/\//gi, "-")}
                  </Text>
                )}
              </View>

              {endShow && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={values.endDate}
                  mode={"date"}
                  display="calendar"
                  onChange={(date, dateString) => {
                    const currentDate = dateString || values.endDate;
                    setEndShow(false);
                    if (date.type == "set") {
                      setEndDate(true);
                    }
                    setFieldValue("endDate", currentDate);
                  }}
                />
              )}
            </View>

            <FormField
              maxLength={255}
              multiline
              name="content"
              numberOfLines={3}
              placeholder="content"
            />

            <SubmitButton title="Post" />
          </View>
        )}
      </Formik>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  start: {
    width: "60%",
    flexDirection: "row",
    alignItems: "center",
  },
  end: {
    width: "60%",
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    fontSize: 21,
    fontWeight: "bold",
    color: colors.medium,
    marginLeft: 20,
  },
});
export default ListingEditScreen;
