import { View } from "react-native"
import { router } from "expo-router"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"

import { useCreateTripContext } from "@/context/create-trip-context"

const SearchPlace = () => {
  const { setTripData } = useCreateTripContext()

  return (
    <View className="bg-white pt-5 px-6 h-full">
      <GooglePlacesAutocomplete
        fetchDetails
        placeholder="Search Place"
        query={{ key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY, language: "en" }}
        onPress={(data, details) => {
          setTripData({
            locationInfo: {
              name: data.description,
              coordinates: details?.geometry.location,
              // @ts-ignore
              photoRef: details?.photos[0]?.photo_reference,
              url: details?.url,
            },
          })

          router.push("/create-trip/select-traveller")
        }}
        styles={{
          textInput: {
            borderWidth: 1,
            borderColor: "gray",
            color: "#5d5d5d",
          },
        }}
      />
    </View>
  )
}

export default SearchPlace
