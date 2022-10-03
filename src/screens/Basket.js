import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import { useBasketContext } from "../context/BasketContext";
import BasketDishItem from "../components/BasketList";
import { useOrderContext } from "../context/OrderContext";
import { useNavigation } from "@react-navigation/native";

const Basket = () => {
  const { restaurant,basketDishes,totalPrice } = useBasketContext();
const {createOrder}=useOrderContext();
const navigation=useNavigation();

const onCreateOrder=async()=>{
  await createOrder();
  navigation.goBack();
}
  return (
    <View style={styles.page}>
      <Text style={styles.name}>{restaurant.name}</Text>

      <Text style={{ fontSize: 19, fontWeight: "bold", marginTop: 20 }}>
        Your Items
      </Text>

      <FlatList
        data={basketDishes}
        renderItem={({ item }) => <BasketDishItem basketDish={item} />}
      />

      <View style={styles.separator} />

      <Pressable onPress={onCreateOrder} style={styles.button}>
        <Text style={styles.buttonText}>Create Order &#8226; ${totalPrice.toFixed(2)}</Text>
      </Pressable>
    </View>
  );
};

export default Basket;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: "100%",
    paddingVertical: 30,
    padding: 10,
    marginVertical: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    marginVertical: 10,
  },

  separator: {
    height: 1,
    backgroundColor: "lightgray",
    marginVertical: 10,
  },
  description: {
    color: "gray",
  },
  icon: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
    alignItems: "center",
  },
  quantity: {
    fontSize: 25,
    // fontWeight:'bold',
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: "black",
    marginTop: "auto",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
  buttonDisabled: {
    backgroundColor: "gray",
    marginTop: "auto",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  quantityContainer: {
    backgroundColor: "lightgray",
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginRight: 10,
    borderRadius: 3,
  },
});
