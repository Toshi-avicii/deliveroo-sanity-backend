import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChevronDownIcon,
  UserIcon,
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import client from "../sanity";
import CurrentLocation from "../components/CurrentLocation";
import { selectCurrentUser } from "../store/slices/userInfoSlice";
import { useSelector } from "react-redux";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const currentUser = useSelector(selectCurrentUser);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "featured"] {
        ...,
        restaurants[]->{
          ...,
          dishes[]->
        }
      }
    `
      )
      .then((data) => setFeaturedCategories(data));
  }, []);

  return (
    <SafeAreaView className="pt-5 bg-white">
      {/* Header */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="w-7 h-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1 justify-center">
          <Text className="text-xs text-gray-400 font-bold">Deliver Now!</Text>
          <CurrentLocation />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <UserIcon size={35} color="#00ccbb" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View className="flex-row pb-2 items-center justify-between space-x-2 mx-4">
        <View className="flex-row space-x-2 bg-gray-200 p-3 items-center flex-1 rounded-sm">
          <MagnifyingGlassIcon color="grey" size={20} />
          <TextInput
            placeholder="Restaurants and Cuisine"
            keyboardType="default"
          />
        </View>
        <AdjustmentsVerticalIcon color="#00ccbb" size={30} />
      </View>

      {/* Body */}
      <ScrollView
        className="bg-gray-100 mb-16"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {/* Categories */}
        <Categories />
        {/* Featured Row */}

        {featuredCategories?.map((row) => {
          return (
            <FeaturedRow
              title={row.name}
              description={row.short_description}
              id={row._id}
              key={row._id}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
