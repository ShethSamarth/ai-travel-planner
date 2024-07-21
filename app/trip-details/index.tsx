import { AntDesign } from "@expo/vector-icons"
import { router, useLocalSearchParams } from "expo-router"
import { View, Text, Image, Pressable, ScrollView } from "react-native"

import { TripPlan } from "@/components/trip-details/trip-plan"
import { HotelList } from "@/components/trip-details/hotel-list"
import { FlightInfo } from "@/components/trip-details/flight-info"

const TripDetails = () => {
  const { tripDetails } = useLocalSearchParams()

  const trip: UserTrip = JSON.parse(tripDetails as string)

  return (
    <ScrollView className="bg-white">
      <Pressable
        onPress={router.back}
        className="absolute top-8 left-3 bg-white/60 p-2 rounded-full z-10"
      >
        <AntDesign name="arrowleft" size={24} color="black" />
      </Pressable>
      {trip.tripData.locationInfo?.photoRef ? (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${trip.tripData.locationInfo.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
          }}
          className="w-full h-80"
        />
      ) : (
        <Image
          source={require("@/assets/images/login.png")}
          className="w-full h-60"
        />
      )}

      <View className="p-6">
        <Text className="font-[outfit-bold] text-3xl">
          {trip.tripPlan.travel_plan.destination}
        </Text>
        <Text className="font-[outfit] text-base text-gray">
          {trip.tripPlan.travel_plan.duration}
        </Text>
        <View className="flex-row gap-x-3">
          <Text className="font-[outfit] text-base text-gray">
            🚌 {trip.tripData.traveler?.title}
          </Text>
          <Text className="font-[outfit] text-base text-gray">
            💰 {trip.tripPlan.travel_plan.budget}
          </Text>
        </View>

        <FlightInfo flightData={trip.tripPlan.travel_plan.flight_details} />

        <HotelList hotels={trip.tripPlan.travel_plan.hotel_options} />

        <TripPlan plan={trip.tripPlan.travel_plan.day_plans} />
      </View>
    </ScrollView>
  )
}

export default TripDetails
