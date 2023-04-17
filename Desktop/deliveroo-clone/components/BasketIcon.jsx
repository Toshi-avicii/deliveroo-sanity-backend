import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { selectBasketTotal } from "../store/slices/basketSlice";

export default function BasketIcon() {
  const items = useSelector((state) => state.basket.items);
  const navigation = useNavigation();
  const total = useSelector(selectBasketTotal);

  if (items.length === 0) {
    return null;
  }
  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity
        onPress={() => navigation.navigate("Basket")}
        className="bg-[#00ccbb] flex-row p-4 mx-5 rounded-lg items-center space-x-1"
      >
        <Text className=" bg-[#01a296] py-1 px-2 text-white font-extrabold text-lg">
          {items.length}
        </Text>
        <Text className="font-extrabold text-lg text-center flex-1 text-white">
          View Basket
        </Text>
        <Text className="text-lg text-white font-extrabold">Rs. {total}</Text>
      </TouchableOpacity>
    </View>
  );
}
