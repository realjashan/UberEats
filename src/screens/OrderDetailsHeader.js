import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import orders from "../../assets/data/orders.json";
import { StatusBar } from "expo-status-bar";
import restaurants from "../../assets/data/restaurants.json";
import BasketDishItem from "../components/BasketList";
import { useOrderContext } from "../context/OrderContext";
import { useRoute } from "@react-navigation/native";
 
 

// const order = orders[0];



const OrderDetailsHeader = ({order}) => {



  return (
    <View>
      <View style={styles.page}>
        <Image
          source={{
            uri: order.Restaurant.image,
          }}
          style={styles.image}
        />

        <View style={styles.marginContainer}>
          <Text style={styles.title}>{order.Restaurant.name}</Text>
          <Text style={styles.subtitle}>{order.status} &#8226; 2 days ago</Text>

          <Text style={styles.menuTitle}>Your Orders</Text>
        </View>
        <StatusBar style="light" />
   
      </View>
    </View>
  );
};

const orderDetails = () => {
  const [order,setOrder]=useState();

  const [orderDishItems,setOrderDishItems]=useState();

  const {getOrder}=useOrderContext();
  const route=useRoute();
//id coming from OrderListItem//
  const id=route.params?.id;

useEffect(() => {


  getOrder(id).then(setOrder);
}, [])

if(!order){
  return <ActivityIndicator color='gray' size='large'/>
}





  return (
    <FlatList
      data={order.dishes}
      renderItem={({ item }) => <BasketDishItem basketDish={item} />}
      ListHeaderComponent={()=><OrderDetailsHeader order={order}/>}
 
    />
  );
};

export default orderDetails;

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
    marginLeft: 10,
    fontSize: 18,
    letterSpacing: 0.7,
    marginBottom:10,
  },
});
