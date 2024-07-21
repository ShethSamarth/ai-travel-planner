import { signOut } from "firebase/auth"
import { View, Text, Image, TextInput } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { auth } from "@/configs/firebase.config"
import { router } from "expo-router"

const Profile = () => {
  const user = auth.currentUser

  const onPress = () => {
    signOut(auth).then(() => router.replace("/auth/sign-in"))
  }

  return (
    <SafeAreaView className="bg-white pt-6 h-full">
      <Text className="font-[outfit-bold] text-4xl px-6">Profile</Text>

      <View className="justify-center items-center px-6">
        <Image
          source={require("@/assets/images/user.gif")}
          className="h-52 w-52"
        />

        <View className="w-full gap-y-2">
          <View className="gap-y-2">
            <Text className="font-[outfit] text-base">Email</Text>
            <TextInput
              value={user?.email!}
              placeholder="Email"
              className="font-[outfit] text-base px-4 py-3 border border-gray rounded-2xl"
            />
          </View>
          <View className="gap-y-2">
            <Text className="font-[outfit] text-base">Account Created On</Text>
            <TextInput
              value={user?.metadata.creationTime}
              placeholder="Email"
              className="font-[outfit] text-base px-4 py-3 border border-gray rounded-2xl"
            />
          </View>
          <View className="gap-y-2">
            <Text className="font-[outfit] text-base">Last Signed In On</Text>
            <TextInput
              value={user?.metadata.lastSignInTime}
              placeholder="Email"
              className="font-[outfit] text-base px-4 py-3 border border-gray rounded-2xl"
            />
          </View>
        </View>

        <Text
          onPress={onPress}
          className="font-[outfit] bg-black text-white text-center text-base mt-5 py-4 w-full rounded-xl"
        >
          Sign Out
        </Text>
      </View>
    </SafeAreaView>
  )
}

export default Profile
