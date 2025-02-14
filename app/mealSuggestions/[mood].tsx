import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { MealsByMood, MealDetails } from '../api/mealAPI';

export default function MealSugesstions() {
  const { mood } = useLocalSearchParams();
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    const getMeals = async () => {
      const mealData = await MealsByMood(mood as string);
      setMeals(mealData);
      setLoading(false);
    };
    getMeals();
  }, [mood]);

  const handleClick = async (mealId: number) => {
    setLoadingDetails(true);
    const details = await MealDetails(mealId);
    setSelectedMeal(details);
    setLoadingDetails(false);
  };

  return (
    <ScrollView>
      <Text>Meals for when you are feeling {mood}!</Text>

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        meals.map((meal) => (
          <TouchableOpacity key={meal.id} onPress={() => handleClick(meal.id)}>
            <Image source={{ uri: meal.image }} />
            <Text>{meal.title}</Text>
          </TouchableOpacity>
        ))
      )}

      {loadingDetails && (
        <ActivityIndicator size="large" color="green" className="mt-6" />
      )}

      {selectedMeal && (
        <View className="bg-gray-100 p-4 rounded-xl mt-6">
          <Text className="text-xl font-bold text-gray-900">
            {selectedMeal.title}
          </Text>
          <Image
            source={{ uri: selectedMeal.image }}
            className="w-full h-48 rounded-lg mt-2"
          />
          <Text className="text-lg font-bold text-gray-800 mt-4">
            Ingredients
          </Text>
          {selectedMeal.extendedIngredients.map((ingredient) => (
            <Text key={ingredient.id} className="text-gray-700">
              {ingredient.original}
            </Text>
          ))}
          <Text className="text-lg font-bold text-gray-800 mt-4">
            Instructions
          </Text>
          <Text className="text-gray-700">{selectedMeal.instructions}</Text>

          <TouchableOpacity
            onPress={() => setSelectedMeal(null)}
            className="mt-4"
          >
            <Text className="text-blue-500 text-lg font-bold">
              Back to Meals
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}
