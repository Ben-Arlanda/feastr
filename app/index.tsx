import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

import { fetchMealsByIngredients } from './api/mealAPI';
import { Link } from 'expo-router';

const moods = [
  { label: 'Happy', value: 'happy' },
  { label: 'Sad', value: 'sad' },
  { label: 'Tired', value: 'tired' },
  { label: 'Stressed', value: 'stressed' },
  { label: 'Excited', value: 'excited' },
];

export default function Home() {
  const [ingredients, setIngredients] = useState('');
  const [meals, setMeals] = useState([]);

  const searchMeals = async () => {
    const mealData = await fetchMealsByIngredients(ingredients);
    setMeals(mealData);
  };
  return (
    <View className="flex-1 bg-[#905c3f]">
      <View className="items-center mt-4">
        <Image
          source={require('../assets/images/logo.png')}
          className="w-40 h-40 "
        />
      </View>
      <Text className="m-4">
        Hungry but indecisive? Tell us your mood, and we’ll do the rest!
      </Text>
      {moods.map((mood) => (
        <Link key={mood.value} href={`/mealSuggestions/${mood.value}`}>
          <TouchableOpacity>
            <Text className="mx-4">{mood.label}</Text>
          </TouchableOpacity>
        </Link>
      ))}
      <Text className="mx-4 mt-4">
        Not in the mood for mood based meals, Whats in your fridge? Find meals
        by Ingredient!
      </Text>
      <ScrollView className="flex-1 p-4">
        <TextInput
          placeholder="Enter ingredients"
          value={ingredients}
          onChangeText={setIngredients}
          className="border p-2 rounded-lg mt-4"
          placeholderTextColor="#f9edb8"
        />

        <TouchableOpacity
          onPress={searchMeals}
          className="bg-[#f9edb8] p-2 rounded-lg mt-2"
        >
          <Text className="text-black text-center">Find Meals</Text>
        </TouchableOpacity>

        {meals.map((meal) => (
          <View
            key={meal.id}
            className="bg-white p-4 rounded-lg shadow-lg mt-4"
          >
            <Image
              source={{ uri: meal.image }}
              className="w-full h-40 rounded-md"
            />
            <Text className="text-lg font-bold mt-2">{meal.title}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
