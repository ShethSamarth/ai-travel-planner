import { router, Tabs } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { auth } from "@/configs/firebase.config"

const TabLayout = () => {
  const user = auth.currentUser

  if (!user?.email) router.replace("/auth/sign-in")

  return (
    <Tabs
      screenOptions={{ headerShown: false, tabBarActiveTintColor: "black" }}
    >
      <Tabs.Screen
        name="my-trips"
        options={{
          tabBarLabel: "My Trips",
          tabBarIcon: ({ color }) => (
            <Ionicons name="location-sharp" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          tabBarLabel: "Discover",
          tabBarIcon: ({ color }) => (
            <Ionicons name="globe-sharp" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-sharp" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}

export default TabLayout
