import { TouchableOpacity } from "react-native";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userInfoSlice";
import { makeRedirectUri } from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

export default function SignUpScreen() {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [request, response, promptAsync] = Google.useAuthRequest(
    {
      androidClientId:
        "976241951577-i0q3dmb5a8808ug5ec8p81u09hr9jf4l.apps.googleusercontent.com",
      iosClientId:
        "976241951577-ntuf9on1icbhnarc1pi36g96s6n04oil.apps.googleusercontent.com",
      expoClientId:
        "976241951577-4nl0q6uvr7ejogvi9mp2tvfj0f4v0ig3.apps.googleusercontent.com",
    },
    {
      redirectUri: makeRedirectUri({
        scheme: "com.toshii.deliverooclone",
      }),
    }
  );

  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication.accessToken);
      getUserInfo();
    }
  }, [response, token]);

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      setUserInfo(user);
      dispatch(
        setUser({
          email: user.email,
          family_name: user.family_name,
          given_name: user.given_name,
          userId: user.id,
          picture: user.picture,
          verifiedEmail: user.verified_email,
        })
      );
    } catch (error) {
      // Add your own error handler here
    }
  };

  return (
    <SafeAreaView>
      {userInfo && (
        <View className="relative">
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            className="absolute top-14 left-5 p-2 rounded-full bg-[#00ccbb] z-50"
          >
            <ArrowLeftIcon size={20} color="#fff" />
          </TouchableOpacity>
          <View className="flex-col space-y-4 justify-center items-center p-4">
            <View>
              <Image
                source={{
                  uri: userInfo.picture,
                }}
                className="h-28 w-28 rounded-full"
              />
            </View>
            <Text className="text-lg">
              Name: {userInfo.given_name + " " + userInfo.family_name}
            </Text>
            <Text className="text-lg">Email: {userInfo.email}</Text>
          </View>
        </View>
      )}

      {!userInfo && (
        <View>
          <View className="bg-[#00ccbb] flex-col justify-center items-center p-6">
            <Image
              source={require("../assets/deliveroo-logo.png")}
              className="h-24 w-24 mb-2"
            />
            <Text className="mb-2 font-bold text-white text-2xl">
              Almost there
            </Text>
            <Text className="text-center text-white mb-2">
              You're one step away from delicious
            </Text>
            <Text className="text-center text-white">
              food being delivered to your door
            </Text>
          </View>

          <View className="p-4">
            <TouchableOpacity
              onPress={() => promptAsync()}
              className="py-3 px-4 rounded-sm bg-white shadow-lg"
            >
              <Text className="text-center font-semibold">
                Sign Up with Google
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
