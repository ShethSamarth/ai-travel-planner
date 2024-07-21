import { createContext, useContext } from "react"

type CreateTripContextType = {
  tripData: TripData | null
  setTripData: (value: TripData) => void
}

export const CreateTripContext = createContext<CreateTripContextType>({
  tripData: null,
  setTripData: () => {},
})

export const useCreateTripContext = () => useContext(CreateTripContext)
