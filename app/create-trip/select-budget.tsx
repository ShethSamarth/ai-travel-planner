import { useState } from "react"
import { router } from "expo-router"
import { View, Text, FlatList } from "react-native"

import OptionCard from "@/components/create-trip/option-card"
import { useCreateTripContext } from "@/context/create-trip-context"

const SelectBudget = () => {
  const { tripData, setTripData } = useCreateTripContext()

  const [selectedBudget, setSelectedBudget] = useState<Option | null>(null)

  const budgetOptions = [
    { id: 1, title: "Cheap", desc: "Stay conscious of costs", icon: "💵" },
    { id: 2, title: "Moderate", desc: "Keep cost on the average", icon: "💰" },
    { id: 3, title: "Luxury", desc: "Don't worry about cost", icon: "💸" },
  ]

  const onNext = () => {
    if (selectedBudget === null) return

    setTripData({ ...tripData, budget: selectedBudget })

    return router.push("/create-trip/review-trip")
  }

  return (
    <View className="bg-white p-6 h-full">
      <Text className="font-[outfit-bold] text-4xl">Budget</Text>
      <Text className="font-[outfit-bold] text-xl text-black/60">
        Choose a spending habit for your trip
      </Text>

      <View className="py-5">
        <FlatList
          data={budgetOptions}
          renderItem={({ item }) => (
            <OptionCard
              option={item}
              selected={selectedBudget}
              setSelected={setSelectedBudget}
            />
          )}
        />
      </View>

      {selectedBudget !== null && (
        <Text
          onPress={onNext}
          className="font-[outfit-medium] bg-black text-white text-center text-base mt-auto py-4 rounded-xl"
        >
          Continue
        </Text>
      )}
    </View>
  )
}

export default SelectBudget
