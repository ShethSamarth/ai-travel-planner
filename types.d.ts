interface UserTrip {
  userEmail: string
  tripData: TripData
  tripPlan: {
    travel_plan: TravelPlan
  }
}

interface TripData {
  locationInfo?: {
    name: string
    coordinates?: {
      lat: number
      lng: number
    }
    photoRef: string
    url?: string
  }
  traveler?: Option
  dates?: {
    startDate: Date | FireStoreDate
    endDate: Date | FireStoreDate
    totalDays: number
  }
  budget?: Option
}

interface FireStoreDate {
  seconds: number
  nanoseconds: number
}

interface Option {
  id: number
  title: string
  desc: string
  icon: string
  people?: string
}

interface TravelPlan {
  destination: string
  duration: string
  budget: string
  flight_details: FlightDetails
  hotel_options: HotelOption[]
  day_plans: DayPlan[]
}

interface FlightDetails {
  airline: string
  flight_number: string
  departure_airport: string
  arrival_airport: string
  departure_date: string
  arrival_date: string
  departure_time: string
  arrival_time: string
  price: string
  booking_url: string
}

interface HotelOption {
  hotel_name: string
  hotel_address: string
  price: string
  hotel_image_url: string
  geo_coordinates: GeoCoordinates
  rating: number
  description: string
}

interface GeoCoordinates {
  latitude: number
  longitude: number
}

interface DayPlan {
  day: string
  schedule: Schedule[]
}

interface Schedule {
  time: string
  activity: string
  location: Location
}

interface Location {
  place_name: string
  place_details: string
  place_image_url: string
  geo_coordinates: GeoCoordinates
  ticket_pricing: string
  time_to_travel: string
}
