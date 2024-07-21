import { router } from "expo-router"
import { View, Text } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export const StartNewTripCard = () => {
  return (
    <View className="items-center justify-center h-full gap-5 px-5">
      <Ionicons name="location-sharp" size={35} color="black" />
      <Text className="font-[outfit-bold] text-2xl">No Trips Planned Yet</Text>
      <Text className="font-[outfit] text-xl text-center text-gray">
        Looks like it&apos;s time to plan a new travel experience! Get started
        below.
      </Text>

      <Text
        onPress={() => router.push("/create-trip/search-place")}
        className="font-[outfit] bg-black text-white text-center text-lg px-8 py-4 rounded-xl"
      >
        Start a new trip
      </Text>
    </View>
  )
}
