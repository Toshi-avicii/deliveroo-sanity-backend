import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { ChevronDownIcon } from "react-native-heroicons/outline";
import * as Location from "expo-location";

export default function CurrentLocation() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [locationName, setLocationName] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      let reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setLocationName(
        `${reverseGeocode[0].name}, ${reverseGeocode[0].city}, ${reverseGeocode[0].region}, ${reverseGeocode[0].country}`
      );
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location && locationName) {
    text = locationName;
  }

  return (
    <View>
      <Text className="font-bold text-xl">
        {text}
        <ChevronDownIcon color="#00ccbb" size={20} />
      </Text>
    </View>
  );
}
