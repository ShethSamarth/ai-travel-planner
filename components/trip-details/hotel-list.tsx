import { Ionicons } from "@expo/vector-icons"
import { View, Text, FlatList, Pressable, Linking } from "react-native"

import { GoogleImage } from "./google-image"

interface HotelListProps {
  hotels: HotelOption[]
}

export const HotelList = ({ hotels }: HotelListProps) => {
  return (
    <View>
      <Text className="font-[outfit-bold] text-xl">
        🏨 Hotel Recommendation
      </Text>

      <FlatList
        horizontal
        data={hotels}
        className="my-2"
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View key={index} className="w-48 mr-5">
            <GoogleImage place={item.hotel_name} />

            <View className="py-2">
              <Text className="font-[outfit-medium] text-lg leading-5">
                {item.hotel_name}
              </Text>
              <Text className="font-[outfit] text-gray">
                {item.hotel_address}
              </Text>
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="font-[outfit]">💰 {item.price}</Text>
                  <Text className="font-[outfit-medium] text-gray">
                    ⭐ {item.rating}
                  </Text>
                </View>
                <Pressable
                  onPress={() =>
                    Linking.openURL(
                      `http://maps.google.com/maps?q=${item.geo_coordinates.latitude},${item.geo_coordinates.longitude}`
                    )
                  }
                  className="bg-blue-500 p-2 rounded-xl mr-2"
                >
                  <Ionicons name="navigate" size={20} color="white" />
                </Pressable>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  )
}
