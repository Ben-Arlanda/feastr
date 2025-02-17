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

export default function IngredientSearch() {
  const [ingredients, setIngredients] = useState('');
  const [meals, setMeals] = useState([]);

  const searchMeals = async () => {
    const mealData = await fetchMealsByIngredients(ingredients);
    setMeals(mealData);
  };

  return (
    <ScrollView className="flex-1 p-4">
      <Text className="text-2xl font-bold text-center">
        Search Meals by Ingredients
      </Text>

      <TextInput
        placeholder="Enter ingredients"
        value={ingredients}
        onChangeText={setIngredients}
        className="border p-2 rounded-lg mt-4"
      />

      <TouchableOpacity
        onPress={searchMeals}
        className="bg-blue-500 p-2 rounded-lg mt-2"
      >
        <Text className="text-white text-center">Find Meals</Text>
      </TouchableOpacity>

      {meals.map((meal) => (
        <View key={meal.id} className="bg-white p-4 rounded-lg shadow-lg mt-4">
          <Image
            source={{ uri: meal.image }}
            className="w-full h-40 rounded-md"
          />
          <Text className="text-lg font-bold mt-2">{meal.title}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
