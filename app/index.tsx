import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

const moods = [
  { label: 'Happy', value: 'happy' },
  { label: 'Sad', value: 'sad' },
  { label: 'Tired', value: 'tired' },
  { label: 'Stressed', value: 'stressed' },
  { label: 'Excited', value: 'excited' },
];

export default function Home() {
  return (
    <View>
      <Text>Feastr</Text>
      <Text>
        Hungry but indecisive? Tell us your mood, and we’ll do the rest!
      </Text>
      {moods.map((mood) => (
        <Link key={mood.value} href={`/mealSuggestions/${mood.value}`}>
          <TouchableOpacity>
            <Text>{mood.label}</Text>
          </TouchableOpacity>
        </Link>
      ))}
    </View>
  );
}
