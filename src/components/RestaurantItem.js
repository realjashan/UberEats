import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const RestaurantItem = (props) => {
  const { restaurant } = props;

  const DEFAULT_IMAGE =
    "https://thumbs.dreamstime.com/b/vegetables-deep-fried-restaurant-dishes-top-view-free-space-your-text-vegetables-deep-fried-restaurant-dishes-164711363.jpg";
  const navigation = useNavigation();

  return (
    <>
      {/* <FlatList
        data={restaurant}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => ( */}
      <Pressable
        style={styles.restaurantContainer}
        onPress={() => {
          navigation.navigate("Restaurant", {
            id: restaurant.id,
          });
        }}
      >
        <Image
          source={{
            uri: restaurant.image
          }}
          style={styles.image}
        />
        <View style={styles.row}>
          <View>
            <Text style={styles.title}>{restaurant.name}</Text>
            <Text style={styles.subtitle}>
              ${restaurant.deliveryFee.toFixed(1)} &#8226; {restaurant.minDeliveryTime}-
              {restaurant.maxDeliveryTime} minutes
            </Text>
          </View>

          <View style={styles.rating}>
            <Text> {restaurant.rating.toFixed(1)}</Text>
          </View>
        </View>
      </Pressable>
    </>
  );
};

export default RestaurantItem;

const styles = StyleSheet.create({
  image: {
    aspectRatio: 5 / 3,
    width: "100%",
    marginBottom: 5,
  },

  restaurantContainer: {
    width: "100%",
    marginVertical: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 5,
  },

  subtitle: {
    color: "gray",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  rating: {
    marginLeft: "auto",
    backgroundColor: "lightgray",
    height: 30,
    width: 30,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 5,
  },
});
