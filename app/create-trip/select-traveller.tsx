import { useState } from "react"
import { router } from "expo-router"
import { View, Text, FlatList } from "react-native"

import OptionCard from "@/components/create-trip/option-card"
import { useCreateTripContext } from "@/context/create-trip-context"

const SelectTraveller = () => {
  const { tripData, setTripData } = useCreateTripContext()

  const [selectedTraveler, setSelectedTraveler] = useState<Option | null>(null)

  const travellerList = [
    {
      id: 1,
      title: "Just Me",
      desc: "A solo travel in exploration",
      icon: "✈️",
      people: "1 Person",
    },
    {
      id: 2,
      title: "Couple",
      desc: "Two travels in tandem",
      icon: "🥂",
      people: "2 People",
    },
    {
      id: 3,
      title: "Family",
      desc: "A group of fun loving adv",
      icon: "🏡",
      people: "3 to 5 People",
    },
    {
      id: 4,
      title: "Friends",
      desc: "A bunch of thrill-seekers",
      icon: "⛵",
      people: "5 to 10 People",
    },
  ]

  const onNext = () => {
    if (selectedTraveler === null) return

    setTripData({ ...tripData, traveler: selectedTraveler })

    return router.push("/create-trip/select-dates")
  }

  return (
    <View className="bg-white p-6 h-full">
      <Text className="font-[outfit-bold] text-4xl">Who's Travelling</Text>
      <Text className="font-[outfit-bold] text-xl text-black/60">
        Choose your travelers
      </Text>

      <View className="py-5">
        <FlatList
          data={travellerList}
          renderItem={({ item }) => (
            <OptionCard
              option={item}
              selected={selectedTraveler}
              setSelected={setSelectedTraveler}
            />
          )}
        />
      </View>

      {selectedTraveler !== null && (
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

export default SelectTraveller
