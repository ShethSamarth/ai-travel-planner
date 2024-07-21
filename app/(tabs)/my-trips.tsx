import { router } from "expo-router"
import { useEffect, useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import { View, Text, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { collection, getDocs, query, where } from "firebase/firestore"

import { auth, db } from "@/configs/firebase.config"
import { UserTripsList } from "@/components/my-trips/user-trips-list"
import { StartNewTripCard } from "@/components/my-trips/start-new-trip-card"

const MyTrips = () => {
  const [userTrips, setUserTrips] = useState<UserTrip[]>([])
  const [loading, setLoading] = useState(true)

  const userEmail = auth.currentUser?.email

  useEffect(() => {
    userEmail && getMyTrips()
  }, [userEmail])

  const getMyTrips = async () => {
    setLoading(true)
    const q = query(
      collection(db, "UserTrips"),
      where("userEmail", "==", userEmail)
    )

    const querySnapShot = await getDocs(q)

    setUserTrips([])

    querySnapShot.forEach((doc) => {
      setUserTrips((prev) => [...prev, doc.data() as UserTrip])
    })
    setLoading(false)
  }

  return (
    <>
      {loading ? (
        <ActivityIndicator size={50} color="black" className="h-full" />
      ) : (
        <SafeAreaView className="bg-white pt-6 h-full">
          <View className="flex-row items-center justify-between px-6">
            <Text className="font-[outfit-bold] text-4xl">My Trips</Text>
            {userTrips.length !== 0 && (
              <Ionicons
                onPress={() => router.push("/create-trip/search-place")}
                name="add-circle"
                size={40}
                color="black"
              />
            )}
          </View>

          {userTrips.length === 0 ? (
            <StartNewTripCard />
          ) : (
            <UserTripsList trips={userTrips.reverse()} />
          )}
        </SafeAreaView>
      )}
    </>
  )
}

export default MyTrips
