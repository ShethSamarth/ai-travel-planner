import { router } from "expo-router"
import { View, Text, Image, ScrollView, Pressable } from "react-native"

import { convertToDate } from "@/lib/utils"

import TripCard from "./trip-card"

interface UserTripsListProps {
  trips: UserTrip[]
}

export const UserTripsList = ({ trips }: UserTripsListProps) => {
  return (
    <ScrollView className="mt-5 px-6">
      {trips.slice(0, 1).map((trip, index) => (
        <Pressable
          key={index}
          onPress={() =>
            router.push({
              pathname: "/trip-details",
              params: { tripDetails: JSON.stringify(trip) },
            })
          }
        >
          {trip.tripData.locationInfo?.photoRef ? (
            <Image
              source={{
                uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${trip.tripData.locationInfo.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
              }}
              className="w-full h-60 rounded-2xl"
            />
          ) : (
            <Image
              source={require("@/assets/images/login.png")}
              className="w-full h-60 rounded-2xl"
            />
          )}
          <View className="mx-1 my-2">
            <Text className="font-[outfit-medium] text-xl">
              {trip.tripPlan.travel_plan.destination}
            </Text>
            <View className="flex-row justify-between items-center mt-1">
              <Text className="font-[outfit] text-base text-gray">
                {convertToDate(trip.tripData.dates?.startDate)}
              </Text>
              <Text className="font-[outfit] text-base text-gray">
                🚌 {trip.tripData.traveler?.title}
              </Text>
            </View>
          </View>
        </Pressable>
      ))}

      {trips.slice(1).map((trip, index) => (
        <TripCard key={index} trip={trip} />
      ))}
    </ScrollView>
  )
}
