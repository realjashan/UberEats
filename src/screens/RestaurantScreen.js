import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import restaurants from "../../assets/data/restaurants.json";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import DishList from "../components/DishList";
import Header from "./Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DataStore } from "aws-amplify";
import { Dish, Restaurant } from "../models";
import { useBasketContext } from "../context/BasketContext";

const RestaurantScreen = () => {
  // const restaurant = restaurants[0];
const route=useRoute();
const navigation=useNavigation();
const id=route.params?.id;


const[restaurant,setRestaurants]=useState(null);
const[dishes,setDishes]=useState(null);

const {setRestaurant:setBasketRestaurant,basket,basketDishes}=useBasketContext();

//from backend data//


useEffect(() => {
if(!id){
  return;
}



//first set to be null to refresh the basket for each restaurant//
setBasketRestaurant(null);

DataStore.query(Restaurant,id).then(setRestaurants);
DataStore.query(Dish,(dish)=>dish.restaurantID('eq',id)).then(setDishes);

},  [])

 useEffect(() => {
 setBasketRestaurant(restaurant)
 }, [restaurant])
 




if(!restaurant){
  return(
    <ActivityIndicator size={"large"} color='gray'/>
  )
}










// const restaurant=restaurants.find((restaurant)=> restaurant.id === id)


  return (
    <View style={styles.page}>
      <StatusBar style="light" />
      {/* <DishList dish={restaurant.dishes[0]}/>
        <DishList dish={restaurant.dishes[2]}/> */}
      <FlatList
        data={dishes}
        ListHeaderComponent={() => <Header restaurant={restaurant} />}
        renderItem={({ item }) => <DishList dish={item} />}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item)=>item.name}
      />
      <Ionicons
        name="arrow-back-circle"
        size={45}
        color="white"
        style={styles.iconContainer}
        onPress={()=>{
          navigation.goBack();
        }}
      />
   {basket &&   <Pressable onPress={()=>{
    navigation.navigate("Basket")
   }} style={styles.button}>
          <Text style={styles.buttonText}>
            Open Basket ({basketDishes.length})
          </Text>
        </Pressable>}
 




    </View>
  );
};

export default RestaurantScreen;

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
});
