import { useEffect } from "react"
import { router } from "expo-router"
import { View, Text, Image } from "react-native"
import { doc, setDoc } from "firebase/firestore"

import { chatSession } from "@/configs/ai-modal"
import { auth, db } from "@/configs/firebase.config"
import { useCreateTripContext } from "@/context/create-trip-context"

const GenerateTrip = () => {
  const { tripData } = useCreateTripContext()
  const session = auth.currentUser

  const prompt =
    "Generate Travel Plan for Location: {location}, for {totalDays} Days and {totalNights} Night for {traveler} with a {budget} budget with a Flight details, Flight Price with Booking url, Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and Places to visit nearby with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time to travel each of the location for {totalDays} days and {totalNights} night with each day plan with best time to visit in JSON format."

  const generateAiTrip = async () => {
    const finalPrompt = prompt
      .replaceAll("{location}", tripData!.locationInfo!.name)
      .replaceAll("{totalDays}", tripData!.dates!.totalDays.toString())
      .replaceAll("{totalNights}", (tripData!.dates!.totalDays - 1).toString())
      .replaceAll("{traveler}", tripData!.traveler!.title)
      .replaceAll("{budget}", tripData!.budget!.title)

    const response = await chatSession.sendMessage(finalPrompt)

    const docId = Date.now().toString()
    await setDoc(doc(db, "UserTrips", docId), {
      userEmail: session?.email,
      tripPlan: JSON.parse(response.response.text()),
      tripData,
    })

    return router.replace("/my-trips")
  }

  useEffect(() => {
    generateAiTrip()
  }, [])

  return (
    <View className="bg-white justify-center items-center p-6 h-full">
      <Text className="font-[outfit-bold] text-4xl">Please Wait...</Text>
      <Text className="font-[outfit-medium] text-xl text-center pt-5">
        We are working to generate your dream trip
      </Text>

      <Image
        source={require("@/assets/images/plane.gif")}
        className="w-full h-1/2"
      />

      <Text className="font-[outfit] text-gray text-xl">
        Please do not "Go Back"
      </Text>
    </View>
  )
}

export default GenerateTrip
