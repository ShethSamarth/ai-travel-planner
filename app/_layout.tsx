import { Stack } from "expo-router"
import { useFonts } from "expo-font"
import { useEffect, useState } from "react"
import * as SplashScreen from "expo-splash-screen"

import { CreateTripContext } from "@/context/create-trip-context"

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [tripData, setTripData] = useState<TripData | null>(null)

  const [loaded, error] = useFonts({
    outfit: require("@/assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("@/assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("@/assets/fonts/Outfit-Bold.ttf"),
  })

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync()
    }
  }, [loaded, error])

  if (!loaded && !error) return null

  return (
    <CreateTripContext.Provider value={{ tripData, setTripData }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </CreateTripContext.Provider>
  )
}
