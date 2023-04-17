import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

export default function PreparingOrderScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    // go to another screen after 4 secs, replace it with actual
    // accepting logic
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 4000);
  }, []);

  return (
    <SafeAreaView className="bg-[#00ccbb] flex-1 justify-center items-center">
      <Animatable.Image
        source={require("../assets/delivery.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="h-96 w-96"
      />
      <Animatable.Text
        iterationCount={1}
        animation="slideInUp"
        className="text-lg my-10 text-center text-white font-bold"
      >
        Waiting For Restaurant to Accept your order
      </Animatable.Text>
      <Progress.Circle size={60} indeterminate={true} color="white" />
    </SafeAreaView>
  );
}
