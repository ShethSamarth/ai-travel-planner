import { router } from "expo-router"
import { useEffect, useState } from "react"
import { ActivityIndicator, Image, Text, View } from "react-native"

import { auth } from "@/configs/firebase.config"

const Home = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      const session = auth.currentUser

      if (session?.email) {
        return router.replace("/my-trips")
      }

      return setLoading(false)
    }, 500)
  }, [])

  return (
    <>
      {loading ? (
        <ActivityIndicator
          size={50}
          color="black"
          className="items-center h-full"
        />
      ) : (
        <View className="h-full">
          <Image
            source={require("@/assets/images/login.png")}
            className="w-full h-3/5"
          />

          <View className="flex-1 bg-white -mt-5 p-6 rounded-t-3xl">
            <Text className="font-[outfit-bold] text-center text-2xl">
              AI Travel Planner
            </Text>

            <Text className="font-[outfit] text-center text-gray text-base mt-4">
              Discover your next adventure effortlessly. Personalized
              itineraries at your fingertips. Travel smarter with AI-driver
              insights.
            </Text>

            <Text
              onPress={() => router.push("/auth/sign-in")}
              className="font-[outfit] bg-black text-white text-center text-base mt-auto py-4 rounded-full"
            >
              Get Started
            </Text>
          </View>
        </View>
      )}
    </>
  )
}

export default Home
