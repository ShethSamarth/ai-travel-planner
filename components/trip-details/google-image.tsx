import { Image } from "react-native"
import { useEffect, useState } from "react"

import { GetPhotoRef } from "@/lib/get-photo"

export const GoogleImage = ({ place }: { place: string }) => {
  const [photoRef, setPhotoRef] = useState(null)

  const getPhotoRef = async () => {
    const photoRef = await GetPhotoRef(place)

    setPhotoRef(photoRef)
  }

  useEffect(() => {
    getPhotoRef()
  }, [])

  if (photoRef === null)
    return <Image className="bg-slate-200 w-full h-32 rounded-xl" />

  return (
    <Image
      source={{
        uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
      }}
      className="bg-slate-200 w-full h-32 rounded-xl"
    />
  )
}
