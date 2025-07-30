'use client';

import * as React from 'react';
import type {UserPreferences} from '@/lib/types';

const defaultPreferences: UserPreferences = {
  dietaryPreferences: 'vegetarian',
  cuisinePreferences: 'Italian',
};

export function useUserPreferences() {
  const [preferences, setPreferences] = React.useState<UserPreferences>(defaultPreferences);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    try {
      const storedPreferences = localStorage.getItem('userPreferences');
      if (storedPreferences) {
        setPreferences(JSON.parse(storedPreferences));
      }
    } catch (error) {
      console.error('Failed to load preferences from localStorage', error);
    }
    setIsLoaded(true);
  }, []);

  React.useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('userPreferences', JSON.stringify(preferences));
      } catch (error) {
        console.error('Failed to save preferences to localStorage', error);
      }
    }
  }, [preferences, isLoaded]);
  
  return {preferences, setPreferences, isLoaded};
}
