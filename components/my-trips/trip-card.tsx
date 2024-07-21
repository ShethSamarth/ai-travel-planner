import { router } from "expo-router"
import { View, Text, Image, Pressable } from "react-native"

import { convertToDate } from "@/lib/utils"

interface TripCardProps {
  trip: UserTrip
}

const TripCard = ({ trip }: TripCardProps) => {
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/trip-details",
          params: { tripDetails: JSON.stringify(trip) },
        })
      }
      className="flex-row my-2"
    >
      {trip.tripData.locationInfo?.photoRef ? (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${trip.tripData.locationInfo.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
          }}
          className="w-24 h-24 rounded-2xl"
        />
      ) : (
        <Image
          source={require("@/assets/images/login.png")}
          className="w-24 h-24 rounded-2xl"
        />
      )}
      <View className="ml-5">
        <Text className="font-[outfit-medium] text-xl">
          {trip.tripPlan.travel_plan.destination}
        </Text>
        <Text className="font-[outfit] text-base text-gray">
          {convertToDate(trip.tripData.dates?.startDate)}
        </Text>
        <Text className="font-[outfit] text-base text-gray">
          🚌 {trip.tripData.traveler?.title}
        </Text>
      </View>
    </Pressable>
  )
}

export default TripCard
