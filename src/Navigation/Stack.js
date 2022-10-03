import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import RestaurantScreen from "../screens/RestaurantScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import OrderScreen from "../screens/OrderScreen";
import { FontAwesome5, Foundation, MaterialIcons } from "@expo/vector-icons";
import DishScreen from "../screens/DishScreen";
import Basket from "../screens/Basket";
import OrderDetails from "../screens/OrderDetailsHeader";
import Profile from "../screens/ProfileScreen";
import { useAuthContext } from "../context/AuthContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackNavigation = () => {
 
  const {dbUser}=useAuthContext();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {dbUser ? (
      <Stack.Screen name="Home" component={MyTabs} />
      ):(
<Stack.Screen name="Profile" component={Profile} />
      )}
  
    
        
      
    </Stack.Navigator>
  );
};

function MyTabs() {
  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: "white" }}
      screenOptions={{
        tabBarActiveTintColor: "black",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Foundation name="home" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrderStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="list-alt" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-alt" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const HomeStack = createNativeStackNavigator();
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Restaurants"
        component={HomeScreen}
        options={{
          headerTitle: "Home",
        }}
      />
      <HomeStack.Screen
        name="Restaurant"
        component={RestaurantScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name="Dish" component={DishScreen} options={{}} />
      <HomeStack.Screen name="Basket" component={Basket} options={{}} />
    </HomeStack.Navigator>
  );
};

const OrdersStack = createNativeStackNavigator();
const OrderStackNavigator = () => {
  return (
    <OrdersStack.Navigator>
      <OrdersStack.Screen
        name="Orders"
        component={OrderScreen}
        options={{
          headerTitle: "Orders",
        }}
      />
      <OrdersStack.Screen
        name="OrderDetails"
        component={OrderDetails}
        options={{}}
      />
    </OrdersStack.Navigator>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
