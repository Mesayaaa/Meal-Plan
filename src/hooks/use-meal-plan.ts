'use client';

import * as React from 'react';
import type {
  MealPlan,
  Day,
  MealType,
  Recipe,
  GroceryItem,
} from '@/lib/types';

const days: Day[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
const mealTypes: MealType[] = ['Breakfast', 'Lunch', 'Dinner'];

function createEmptyMealPlan(): MealPlan {
  const plan = {} as MealPlan;
  for (const day of days) {
    plan[day] = {
      Breakfast: {id: `${day}-Breakfast`, day, type: 'Breakfast', recipe: null},
      Lunch: {id: `${day}-Lunch`, day, type: 'Lunch', recipe: null},
      Dinner: {id: `${day}-Dinner`, day, type: 'Dinner', recipe: null},
    };
  }
  return plan;
}

interface MealPlanContextType {
  mealPlan: MealPlan;
  addMeal: (day: Day, type: MealType, recipe: Recipe) => void;
  removeMeal: (day: Day, type: MealType) => void;
  groceryList: GroceryItem[];
  addManualGroceryItem: (name: string) => void;
  toggleGroceryItem: (name: string) => void;
  clearGroceryList: () => void;
}

const MealPlanContext = React.createContext<MealPlanContextType | undefined>(
  undefined
);

export function MealPlanProvider({children}: {children: React.ReactNode}) {
  const [mealPlan, setMealPlan] = React.useState<MealPlan>(
    createEmptyMealPlan()
  );
  const [manualGroceryItems, setManualGroceryItems] = React.useState<
    GroceryItem[]
  >([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    try {
      const storedPlan = localStorage.getItem('mealPlan');
      if (storedPlan) {
        setMealPlan(JSON.parse(storedPlan));
      }
      const storedGroceries = localStorage.getItem('manualGroceryItems');
      if (storedGroceries) {
        setManualGroceryItems(JSON.parse(storedGroceries));
      }
    } catch (error) {
      console.error('Failed to load state from localStorage', error);
    }
    setIsLoaded(true);
  }, []);

  React.useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('mealPlan', JSON.stringify(mealPlan));
        localStorage.setItem(
          'manualGroceryItems',
          JSON.stringify(manualGroceryItems)
        );
      } catch (error) {
        console.error('Failed to save state to localStorage', error);
      }
    }
  }, [mealPlan, manualGroceryItems, isLoaded]);

  const addMeal = (day: Day, type: MealType, recipe: Recipe) => {
    setMealPlan(prevPlan => ({
      ...prevPlan,
      [day]: {
        ...prevPlan[day],
        [type]: {...prevPlan[day][type], recipe},
      },
    }));
  };

  const removeMeal = (day: Day, type: MealType) => {
    setMealPlan(prevPlan => ({
      ...prevPlan,
      [day]: {
        ...prevPlan[day],
        [type]: {...prevPlan[day][type], recipe: null},
      },
    }));
  };

  const addManualGroceryItem = (name: string) => {
    if (name.trim() && !manualGroceryItems.some(item => item.name.toLowerCase() === name.trim().toLowerCase())) {
      setManualGroceryItems(prev => [...prev, {name: name.trim(), completed: false}]);
    }
  };

  const toggleGroceryItem = (name: string) => {
    setManualGroceryItems(prev =>
      prev.map(item =>
        item.name === name ? {...item, completed: !item.completed} : item
      )
    );
  };
  
  const clearGroceryList = () => {
    setManualGroceryItems([]);
    setMealPlan(createEmptyMealPlan());
  };

  const groceryList = React.useMemo(() => {
    const fromMeals = Object.values(mealPlan)
      .flatMap(day => Object.values(day))
      .filter(meal => meal.recipe)
      .flatMap(meal => meal.recipe!.ingredients)
      .map(name => name.toLowerCase());

    const uniqueFromMeals = [...new Set(fromMeals)];

    const combined = [...manualGroceryItems];
    uniqueFromMeals.forEach(name => {
      if (!combined.some(item => item.name.toLowerCase() === name)) {
        combined.push({name, completed: false});
      }
    });

    return combined;
  }, [mealPlan, manualGroceryItems]);
  
  if (!isLoaded) {
    return null; 
  }

  return (
    <MealPlanContext.Provider
      value={{
        mealPlan,
        addMeal,
        removeMeal,
        groceryList,
        addManualGroceryItem,
        toggleGroceryItem,
        clearGroceryList,
      }}
    >
      {children}
    </MealPlanContext.Provider>
  );
}

export function useMealPlan() {
  const context = React.useContext(MealPlanContext);
  if (context === undefined) {
    throw new Error('useMealPlan must be used within a MealPlanProvider');
  }
  return context;
}
