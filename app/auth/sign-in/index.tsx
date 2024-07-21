import {
  View,
  Text,
  TextInput,
  Platform,
  Alert,
  ToastAndroid,
} from "react-native"
import { useState } from "react"
import { router } from "expo-router"
import { signInWithEmailAndPassword } from "firebase/auth"
import { SafeAreaView } from "react-native-safe-area-context"

import { auth } from "@/configs/firebase.config"

const SignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSignIn = () => {
    if (form.email && form.password) {
      setIsSubmitting(true)
      signInWithEmailAndPassword(auth, form.email, form.password)
        .then(() => router.replace("/my-trips"))
        .catch((error) => {
          if (Platform.OS === "android") {
            Alert.alert(`Error: ${error.code}`, error.message)
          } else {
            ToastAndroid.show(error.message, ToastAndroid.LONG)
          }
          console.log(error.code, ":", error.message)
        })
        .finally(() => {
          setForm({ email: "", password: "" })
          setIsSubmitting(false)
        })
    } else {
      if (Platform.OS !== "android") {
        Alert.alert("Fields required", "Please enter your Email and Password")
      } else {
        ToastAndroid.show(
          "Please enter your Email and Password",
          ToastAndroid.LONG
        )
      }
    }
  }

  return (
    <SafeAreaView className="bg-white px-5 py-10 min-h-full">
      <Text className="font-[outfit-bold] text-3xl">Let's Sign You In</Text>

      <Text className="font-[outfit] text-gray text-3xl mt-5">
        Welcome Back
      </Text>
      <Text className="font-[outfit] text-gray text-3xl mb-5">
        You've been missed!
      </Text>

      <View className="gap-y-2">
        <View className="gap-y-2">
          <Text className="font-[outfit] text-base">Email</Text>
          <TextInput
            className="font-[outfit] text-base px-4 py-3 border border-gray rounded-2xl"
            keyboardType="email-address"
            placeholder="Email"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
        </View>
        <View className="gap-y-2">
          <Text className="font-[outfit] text-base">Password</Text>
          <TextInput
            className="font-[outfit] text-base px-4 py-3 border border-gray rounded-2xl"
            placeholder="Password"
            secureTextEntry
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
        </View>
      </View>

      <Text
        onPress={onSignIn}
        disabled={isSubmitting}
        className={`font-[outfit] bg-black text-white text-center text-base mt-10 py-4 rounded-xl ${
          isSubmitting && "bg-black/50"
        }`}
      >
        Sign In
      </Text>
      <Text
        disabled={isSubmitting}
        onPress={() => router.replace("/auth/sign-up")}
        className="font-[outfit] text-center text-base mt-3 py-4 rounded-xl border"
      >
        Create Account
      </Text>
    </SafeAreaView>
  )
}

export default SignIn
