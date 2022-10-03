import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { DataStore } from "aws-amplify";
import { Basket, BasketDish } from "../models";

const BasketContext = createContext({});

const BasketContextProvider = ({ children }) => {
  const { dbUser } = useAuthContext();
  const [basket, setBasket] = useState(null);
  const [restaurant, setRestaurant] = useState("");
  const[basketDishes,setBasketDishes]=useState([]);


  const totalPrice=basketDishes.reduce((sum,basketDish)=>sum + basketDish.quantity * basketDish.Dish.price,restaurant?.deliveryFee,)

  //fetching basket details//
  useEffect(() => {
    DataStore.query(Basket, (b) =>
      b.restaurantID("eq", restaurant.id).userID("eq", dbUser.id)
    ).then((baskets) => setBasket(baskets[0]));
  }, [dbUser, restaurant]);



  useEffect(() => {

    //filtering data for specific dish//
   DataStore.query(BasketDish,(bd)=>bd.basketID('eq',basket.id)).then(setBasketDishes);
  }, [basket])
  

  const addDishToBasket = async (dish, quantity) => {
    //create basket to fetch details//

    let thebasket = basket || (await createNewBasket());

   const newDish=await DataStore.save(
      new BasketDish({ quantity, Dish: dish, basketID: thebasket.id })
    );
    setBasketDishes([...basketDishes,newDish]);
  };

  const createNewBasket = async () => {
    const newBasket = await DataStore.save(
      new Basket({ userID: dbUser.id, restaurantID: restaurant.id })
    );
    setBasket(newBasket);
    return newBasket;
  };

  return (
    <BasketContext.Provider value={{ addDishToBasket, setRestaurant, basket,basketDishes ,restaurant,totalPrice}}>
      {children}
    </BasketContext.Provider>
  );
};

export default BasketContextProvider;

export const useBasketContext = () => useContext(BasketContext);
