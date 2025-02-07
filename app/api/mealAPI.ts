import axios from 'axios';

const API_KEY = process.env.EXPO_PUBLIC_API_KEY as string;

const BASE_URL = process.env.EXPO_PUBLIC_API_URL as string;

export const MealsByMood = async (mood: string) => {
  let query = '';

  switch (mood) {
    case 'happy':
      query = 'healthy';
      break;
    case 'sad':
      query = 'comfort food';
      break;
    case 'tired':
      query = 'energy';
      break;
    case 'stressed':
      query = 'calming';
      break;
    case 'excited':
      query = 'spicy';
      break;
    default:
      query = 'popular';
  }

  try {
    const response = await axios.get(`${BASE_URL}/complexSearch`, {
      params: {
        query,
        number: 3,
        apiKey: API_KEY,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error('Error fetching meals:', error);
    return [];
  }
};
