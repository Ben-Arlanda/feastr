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
      <Text>Lets eat by your mood!</Text>
    </ScrollView>
  );
}
