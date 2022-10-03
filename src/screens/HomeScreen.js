import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import RestaurantItem from "../components/RestaurantItem";

import { DataStore } from "@aws-amplify/datastore";
import { Restaurant } from "../models";

const HomeScreen = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    DataStore.query(Restaurant).then(setRestaurants);
  }, []);

  // useEffect(() => {
  //   DataStore.query(Restaurant).then(setRestaurants);
  //   console.log(restaurants)
  // }, []);

  return (
    <View style={styles.page}>
      <FlatList
        data={restaurants}
        renderItem={({ item }) => <RestaurantItem restaurant={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
});
