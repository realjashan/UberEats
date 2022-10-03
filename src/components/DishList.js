import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const DishList = (props) => {
  const { dish } = props;

  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("Dish", {
          id: dish.id,
        });
      }}
      style={styles.container}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{dish.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {dish.description}
        </Text>
        <Text style={styles.price}>${dish.price}</Text>
      </View>

      {dish.image && (
        <Image
          source={{
            uri: dish.image,
          }}
          style={styles.image}
        />
      )}
    </Pressable>
  );
};

export default DishList;

const styles = StyleSheet.create({
  container: {
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1.5,
    paddingVertical: 10,
    marginHorizontal: 20,
    flexDirection: "row",
  },
  name: {
    fontWeight: "600",
    fontSize: 18,
  },
  description: {
    color: "grey",
    marginVertical: 5,
  },
  image: {
    height: 75,
    aspectRatio: 1,
  },
});
