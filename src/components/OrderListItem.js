import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { withAuthenticator} from 'aws-amplify-react-native';



const OrderListItem = ({ order }) => {

const navigation=useNavigation();
  return (
    <Pressable onPress={()=>{
      navigation.navigate('OrderDetails',{id:order.id})
    }} style={{flexDirection:"row",margin:10,alignItems:'center'}}>
      <Image
        source={{ uri: order.Restaurant.image }}
        style={{ width: 75, height: 75 ,marginRight:10}}
      />

      <View>
        <Text style={{fontWeight:'bold',fontSize:16}}>{order.Restaurant.name}</Text>
        <Text style={{marginVertical:5,color:'gray'}}>3 items $31.01</Text>
        <Text style={{color:'gray'}}>2 days ago &#8226; {order.status}</Text>


      </View>
    </Pressable>
  );
};

export default OrderListItem;

const styles = StyleSheet.create({});
