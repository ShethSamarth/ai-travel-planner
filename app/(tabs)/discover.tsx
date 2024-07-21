import { useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { collection, getDocs, query } from "firebase/firestore"
import { View, Text, ActivityIndicator, ScrollView } from "react-native"

import { db } from "@/configs/firebase.config"
import TripCard from "@/components/my-trips/trip-card"
import { StartNewTripCard } from "@/components/my-trips/start-new-trip-card"

const Discover = () => {
  const [trips, setTrips] = useState<UserTrip[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTrips()
  }, [])

  const getTrips = async () => {
    setLoading(true)
    const q = query(collection(db, "UserTrips"))

    const querySnapShot = await getDocs(q)

    setTrips([])

    querySnapShot.forEach((doc) => {
      setTrips((prev) => [...prev, doc.data() as UserTrip])
    })
    setLoading(false)
  }

  return (
    <>
      {loading ? (
        <ActivityIndicator size={50} color="black" className="h-full" />
      ) : (
        <SafeAreaView className="bg-white pt-6 h-full">
          <Text className="font-[outfit-bold] text-4xl px-6">
            Discover Trips
          </Text>

          <ScrollView className="mt-6 px-6">
            {trips.map((trip, index) => (
              <TripCard key={index} trip={trip} />
            ))}
          </ScrollView>

          {trips.length === 0 && <StartNewTripCard />}
        </SafeAreaView>
      )}
    </>
  )
}

export default Discover
