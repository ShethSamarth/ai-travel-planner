import { View, Text, Linking } from "react-native"

interface FlightInfoProps {
  flightData: FlightDetails
}

export const FlightInfo = ({ flightData }: FlightInfoProps) => {
  return (
    <View className="flex-row justify-between items-start my-3 p-3 rounded-xl border border-slate-300">
      <View>
        <Text className="font-[outfit-bold] text-xl">✈️ Flight</Text>
        <Text className="font-[outfit] text-base leading-5 tracking-wide">
          Airline: {flightData.airline}
        </Text>
        <Text className="font-[outfit] text-base leading-5 tracking-wide">
          Price: {flightData.price}
        </Text>
      </View>
      <Text
        onPress={() => Linking.openURL(flightData.booking_url)}
        className="font-[outfit] bg-black text-white text-center px-4 py-2 rounded-md"
      >
        Book Here
      </Text>
    </View>
  )
}
