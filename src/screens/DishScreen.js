import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

import { DataStore } from "aws-amplify";
import { Dish } from "../models";
import { useBasketContext } from "../context/BasketContext";

const DishScreen = () => {
  // const dish=restaurants[0].dishes[0]

  const {addDishToBasket}=useBasketContext();
  const [quantity, setQunatity] = useState(0);
  const [dish, setDish] = useState("");

  const navigation = useNavigation();
  const route = useRoute();

  const id = route.params?.id;


async function onAddToBasket(){
  await addDishToBasket(dish,quantity);
  navigation.goBack();
}


  useEffect(() => {
    if (id) {
      DataStore.query(Dish, id).then(setDish);
    }
  }, [id]);

  if (!dish) {
    return <ActivityIndicator size="large" color="gray" />;
  }

  function getTotal() {
    return (dish.price * quantity).toFixed(2);
  }

  return (
    <View style={styles.page}>
      <Text style={styles.name}>{dish.name}</Text>
      <Text style={styles.description}>{dish.description}</Text>
      <View style={styles.separator} />

      <View style={styles.icon}>
        <Pressable
          onPress={() => {
            setQunatity(Math.max(quantity - 1, 0));
          }}
        >
          <AntDesign name="minuscircleo" size={40} color="black" />
        </Pressable>

        <Text style={styles.quantity}>{quantity}</Text>
        <Pressable
          onPress={() => {
            setQunatity(quantity + 1);
          }}
        >
          <AntDesign name="pluscircleo" size={40} color="black" />
        </Pressable>
      </View>

      {quantity === 0 ? (
        <View style={styles.buttonDisabled}>
          <Text style={styles.buttonText}>Add {quantity} to basket</Text>
        </View>
      ) : (
        <Pressable onPress={onAddToBasket} style={styles.button}>
          <Text style={styles.buttonText}>
            Add {quantity} to basket &#8226; ${getTotal()}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default DishScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: "100%",
    paddingVertical: 30,
    padding: 10,
    marginVertical: 10,
  },
  name: {
    fontSize: 30,
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
});
