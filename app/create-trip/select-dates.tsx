import { useState } from "react"
import { router } from "expo-router"
import { View, Text } from "react-native"
import { differenceInDays } from "date-fns"
import CalendarPicker from "react-native-calendar-picker"

import { useCreateTripContext } from "@/context/create-trip-context"

const SelectDates = () => {
  const { tripData, setTripData } = useCreateTripContext()

  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  const onDateChange = (date: Date, type: "START_DATE" | "END_DATE") => {
    if (type === "END_DATE") {
      setEndDate(date)
    } else {
      setStartDate(date)
      setEndDate(null)
    }
  }

  const onNext = () => {
    if (!startDate || !endDate) return

    const totalDays = differenceInDays(endDate, startDate)

    setTripData({
      ...tripData,
      dates: { startDate, endDate, totalDays: totalDays + 1 },
    })

    return router.push("/create-trip/select-budget")
  }

  return (
    <View className="bg-white p-6 h-full">
      <Text className="font-[outfit-bold] text-4xl">Travel Dates</Text>
      <Text className="font-[outfit-bold] text-xl text-black/60">
        Choose a range of dates to travel
      </Text>

      <View className="py-10">
        <CalendarPicker
          allowRangeSelection
          minDate={new Date()}
          maxRangeDuration={5}
          onDateChange={onDateChange}
          selectedRangeStyle={{ backgroundColor: "black" }}
          selectedDayTextStyle={{ color: "white" }}
        />
      </View>

      {endDate && (
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

export default SelectDates
