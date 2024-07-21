import { Ionicons } from "@expo/vector-icons"
import { View, Text, Pressable, Linking } from "react-native"

import { GoogleImage } from "./google-image"

interface TripPlanProps {
  plan: DayPlan[]
}

export const TripPlan = ({ plan }: TripPlanProps) => {
  return (
    <View>
      <Text className="font-[outfit-bold] text-xl">🏕️ Itinerary</Text>

      {plan.map((item, index) => (
        <View key={index} className="pt-3">
          <Text className="font-[outfit-medium] text-lg pb-2">
            🌥️ {item.day}
          </Text>

          {item.schedule.map((sch, index) => (
            <View key={index} className="bg-blue-100/70 p-2 rounded-xl mb-5">
              <GoogleImage place={sch.location.place_name} />

              <View className="py-2">
                <Text className="font-[outfit-medium] text-xl leading-5">
                  {sch.location.place_name}
                </Text>
                <Text className="font-[outfit] text-base text-gray leading-5">
                  {sch.location.place_details}
                </Text>
              </View>

              <Text className="font-[outfit] text-base text-gray leading-5 pb-2">
                ✨ {sch.activity}
              </Text>

              <View className="flex-row items-end justify-between">
                <View className="gap-y-1 pb-2">
                  <Text className="font-[outfit-medium]">⏱️ {sch.time}</Text>
                  <Text className="font-[outfit-medium]">
                    🎟️ Ticket Price: {sch.location.ticket_pricing}
                  </Text>
                  <Text className="font-[outfit-medium]">
                    ⏳ Duration: {sch.location.time_to_travel}
                  </Text>
                </View>
                <Pressable
                  onPress={() =>
                    Linking.openURL(
                      `http://maps.google.com/maps?q=${sch.location.geo_coordinates.latitude},${sch.location.geo_coordinates.longitude}`
                    )
                  }
                  className="bg-blue-500 p-2 rounded-xl"
                >
                  <Ionicons name="navigate" size={24} color="white" />
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      ))}
    </View>
  )
}
