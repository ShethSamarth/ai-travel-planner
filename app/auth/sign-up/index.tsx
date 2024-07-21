import {
  View,
  Text,
  TextInput,
  Alert,
  ToastAndroid,
  Platform,
} from "react-native"
import { useState } from "react"
import { router } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { createUserWithEmailAndPassword } from "firebase/auth"

import { auth } from "@/configs/firebase.config"

const SignUp = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onCreateAccount = () => {
    if (form.name && form.email && form.password) {
      setIsSubmitting(true)
      createUserWithEmailAndPassword(auth, form.email, form.password)
        .then(() => router.replace("/my-trips"))
        .catch((error) => {
          if (Platform.OS !== "android") {
            Alert.alert(`Error: ${error.code}`, error.message)
          } else {
            ToastAndroid.show(error.message, ToastAndroid.LONG)
          }
          console.log(error.code, " : ", error.message)
        })
        .finally(() => {
          setForm({ name: "", email: "", password: "" })
          setIsSubmitting(false)
        })
    } else {
      if (Platform.OS !== "android") {
        Alert.alert(
          "Fields required",
          "Please enter your Full Name, Email and Password"
        )
      } else {
        ToastAndroid.show(
          "Please enter your Full Name, Email and Password",
          ToastAndroid.LONG
        )
      }
    }
  }

  return (
    <SafeAreaView className="bg-white px-5 py-10 min-h-full">
      <Text className="font-[outfit-bold] text-3xl">Create New Account</Text>

      <Text className="font-[outfit] text-gray text-3xl my-5">
        Make travel plans using an AI-powered planner
      </Text>

      <View className="gap-y-2">
        <View className="gap-y-2">
          <Text className="font-[outfit] text-base">Full Name</Text>
          <TextInput
            className="font-[outfit] text-base px-4 py-3 border border-gray rounded-2xl"
            placeholder="Name"
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
        </View>
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
        onPress={onCreateAccount}
        disabled={isSubmitting}
        className={`font-[outfit] bg-black text-white text-center text-base mt-10 py-4 rounded-xl ${
          isSubmitting && "bg-black/50"
        }`}
      >
        Create Account
      </Text>
      <Text
        disabled={isSubmitting}
        onPress={() => router.replace("/auth/sign-in")}
        className="font-[outfit] text-center text-base mt-3 py-4 rounded-xl border"
      >
        Sign In
      </Text>
    </SafeAreaView>
  )
}

export default SignUp
