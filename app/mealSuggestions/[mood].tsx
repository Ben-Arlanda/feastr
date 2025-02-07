import React, { useEffect, useState } from 'react';

import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { MealsByMood } from '../api/mealAPI';

export default function MealSugesstions() {
  const { mood } = useLocalSearchParams();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMeals = async () => {
      const mealData = await MealsByMood(mood as string);
      setMeals(mealData);
      setLoading(false);
    };
    getMeals();
  }, [mood]);

  return (
    <ScrollView>
      <Text>Meals for when you are feeling {mood}!</Text>

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        meals.map((meal) => (
          <View key={meal.id}>
            <Image source={{ uri: meal.image }} />
            <Text>{meal.title}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}
