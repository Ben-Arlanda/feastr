import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <View>
      <Text>Feastr</Text>
      <Link href="/mealSuggestions">Go to Meal Suggestions</Link>
    </View>
  );
}
