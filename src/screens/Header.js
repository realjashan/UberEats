import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
 
import { StatusBar } from "expo-status-bar";
 

const Header = ({ restaurant }) => {
  //   const restaurant = restaurants[0];
  return (
    <View style={styles.page}>
      <Image
        source={{
          uri: restaurant.image,
        }}
        style={styles.image}
      />

      <View style={styles.marginContainer}>
        <Text style={styles.title}>{restaurant.name}</Text>
        <Text style={styles.subtitle}>
          ${restaurant.deliveryFee.toFixed(1)} &#8226; {restaurant.minDeliveryTime}-
          {restaurant.maxDeliveryTime} minutes
        </Text>

        <Text style={styles.menuTitle}>Menu</Text>
      </View>
      <StatusBar style="light" />
      {/* <DishList dish={restaurant.dishes[0]}/>
        <DishList dish={restaurant.dishes[2]}/> */}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    aspectRatio: 5 / 3,
  },
  page: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 15,
    color: "grey",
  },
  marginContainer: {
    margin: 10,
  },
  iconContainer: {
    position: "absolute",
    top: 40,
    left: 10,
    borderRadius: 50,
  },
  menuTitle: {
    marginTop: 10,
    marginLeft:10,
    fontSize: 18,
    letterSpacing: 0.7,
  },
});
