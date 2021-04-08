import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import * as Yup from "yup";
import _ from "underscore";
import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import Screen from "../components/Screen";
import searchApi from "../api/search";
import ListSearch from "../components/lists/ListSearch";
import ActivityIndicator from "../components/ActivityIndicator";

const searchvalidationSchema = Yup.object().shape({
  query: Yup.string().trim().min(1).label("Query"),
  category: Yup.string().nullable().label("Category"),
  location: Yup.string().nullable().label("Location"),
});



function SearchScreen({ navigation }) {
  const [searchResult, setSearchResult] = useState();
  const [loading, setLoading] = useState(false);

  const handleSearch = async (values) => {
    let result = [];
    setLoading(true);
    if (!values.category && !values.location && values.query === "") return;
    else if (!values.category && !values.location) {
      const bycompany = await searchApi.find("/company?query=" + values.query);
      const bylocation = await searchApi.find(
        "/location?query=" + values.query
      );
      const bycategory = await searchApi.find(
        "/category?query=" + values.query
      );
      const byname = await searchApi.find("/name?query=" + values.query);
      result.data = _.union(
        bycompany.data,
        bylocation.data,
        bycategory.data,
        byname.data
      );
    } else if (!values.category && values.query === "") {
      result = await searchApi.find("/location?query=" + values.location.label);
      console.log(result.data);
    } else if (!values.location && values.query === "") {
      result = await searchApi.find("/category?query=" + values.category.label);
      console.log(result.data);
    } else {
      result = await searchApi.find(
        "?query=" +
          values.query +
          (values.category ? "&category=" + values.category.label : "") +
          (values.location ? "&location=" + values.location.label : "")
      );
    }

    setSearchResult(result.data);

    setLoading(false);
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.container}>
        <Form
          initialValues={{
            query: "",
            category: null,
            location: null,
          }}
          onSubmit={(values) => handleSearch(values)}
          validationSchema={searchvalidationSchema}
        >
          <FormField maxLength={255} name="query" placeholder="Search" />


          <SubmitButton title="Search" />
        </Form>

        {searchResult && (
          <FlatList
            data={searchResult}
            keyExtractor={(result) => result._id.toString()}
            renderItem={({ item }) => (
              <ListSearch
                result={item}
                onPress={() => {
                  navigation.navigate("searchResult", item);
                  console.log(item);
                }}
              />
            )}
          />
        )}
      </Screen>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default SearchScreen;
