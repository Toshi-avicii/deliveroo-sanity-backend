import { View, Text, TouchableOpacity, Image } from "react-native";

export default function CategoryCard({ imgUrl, title }) {
  return (
    <TouchableOpacity className="mr-2 relative">
      <Image
        source={{
          uri: imgUrl,
        }}
        className="h-20 w-20 rounded"
      />
      <Text className="absolute left-1 bottom-1 font-bold text-white">
        {title}
      </Text>
    </TouchableOpacity>
  );
}
