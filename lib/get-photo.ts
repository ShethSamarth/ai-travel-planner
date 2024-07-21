export const GetPhotoRef = async (place: string) => {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${place}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`
  )

  const result = await res.json()

  const photo_ref = result.results[0].photos[0].photo_reference

  return photo_ref
}
