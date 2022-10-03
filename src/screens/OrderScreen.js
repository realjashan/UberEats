import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import OrderListItem from '../components/OrderListItem'
import { useOrderContext } from '../context/OrderContext'
// import orders from '../../assets/data/orders.json'

const OrderScreen = () => {

  const {orders}=useOrderContext();
  return (
    <View style={{flex:1,
    width:'100%'}}>
     <FlatList data={orders} renderItem={({item})=> <OrderListItem order={item}/>}/>
    </View>
  )
}

export default OrderScreen

const styles = StyleSheet.create({})