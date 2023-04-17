import { ScrollView, Text } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import client, { urlFor } from "../sanity";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `
      *[_type == 'category']
      `
      )
      .then((data) => setCategories(data));
  }, []);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 20,
      }}
    >
      {categories?.map((category) => {
        return (
          <CategoryCard
            key={category._id}
            imgUrl={urlFor(category.image).url()}
            title={category.title}
          />
        );
      })}
    </ScrollView>
  );
}
