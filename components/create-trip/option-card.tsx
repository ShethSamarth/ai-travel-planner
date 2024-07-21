import { View, Text, Pressable } from "react-native"

interface OptionCardProps {
  option: Option
  selected: Option | null
  setSelected: (option: Option) => void
}

const OptionCard = ({ option, selected, setSelected }: OptionCardProps) => {
  return (
    <Pressable
      onPress={() => setSelected(option)}
      className={`bg-slate-200/60 flex-row items-center justify-between mb-5 p-5 rounded-xl ${
        selected?.id === option.id && "border-2"
      }`}
    >
      <View>
        <Text className="font-[outfit-bold] text-xl">{option.title}</Text>
        <Text className="font-[outfit-medium] text-lg text-gray">
          {option.desc}
        </Text>
      </View>
      <Text className="text-4xl">{option.icon}</Text>
    </Pressable>
  )
}

export default OptionCard
