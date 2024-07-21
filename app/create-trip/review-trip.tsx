import { format } from "date-fns"
import { router } from "expo-router"
import { View, Text } from "react-native"

import { useCreateTripContext } from "@/context/create-trip-context"

const ReviewTrip = () => {
  const { tripData } = useCreateTripContext()

  return (
    <View className="bg-white p-6 h-full">
      <Text className="font-[outfit-bold] text-4xl">Trip review</Text>
      <Text className="font-[outfit-bold] text-xl text-black/60">
        Before generating your trip, please review your selection
      </Text>

      <View className="py-10 gap-y-5">
        <View className="flex-row items-center gap-x-5">
          <Text className="text-3xl">📍</Text>
          <View>
            <Text className="font-[outfit] text-xl  text-gray">
              Destination
            </Text>
            <Text className="font-[outfit-medium] text-xl">
              {tripData?.locationInfo?.name}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center gap-x-5">
          <Text className="text-3xl">🗓️</Text>
          <View>
            <Text className="font-[outfit] text-xl  text-gray">
              Travel Date
            </Text>
            <Text className="font-[outfit-medium] text-xl">
              {format(tripData!.dates!.startDate, "dd MMM") +
                " - " +
                format(tripData!.dates!.endDate, "dd MMM") +
                ` (${tripData?.dates?.totalDays} days)`}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center gap-x-5">
          <Text className="text-3xl">🚌</Text>
          <View>
            <Text className="font-[outfit] text-xl  text-gray">
              Who is Travelling
            </Text>
            <Text className="font-[outfit-medium] text-xl">
              {tripData?.traveler?.title} ({tripData?.traveler?.people})
            </Text>
          </View>
        </View>

        <View className="flex-row items-center gap-x-5">
          <Text className="text-3xl">💰</Text>
          <View>
            <Text className="font-[outfit] text-xl  text-gray">Budget</Text>
            <Text className="font-[outfit-medium] text-xl">
              {tripData?.budget?.title}
            </Text>
          </View>
        </View>
      </View>

      <Text
        onPress={() => router.push("/create-trip/generate-trip")}
        className="font-[outfit-medium] bg-black text-white text-center text-base mt-auto py-4 rounded-xl"
      >
        Build My Trip
      </Text>
    </View>
  )
}

export default ReviewTrip
