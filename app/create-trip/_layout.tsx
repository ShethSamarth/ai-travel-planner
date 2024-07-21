import { Stack } from "expo-router"

const CreateTripLayout = () => {
  return (
    <Stack screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen name="search-place" options={{ title: "Search" }} />
      <Stack.Screen name="select-traveller" options={{ title: "" }} />
      <Stack.Screen name="select-dates" options={{ title: "" }} />
      <Stack.Screen name="select-budget" options={{ title: "" }} />
      <Stack.Screen name="review-trip" options={{ title: "" }} />
      <Stack.Screen name="generate-trip" options={{ headerShown: false }} />
    </Stack>
  )
}

export default CreateTripLayout
