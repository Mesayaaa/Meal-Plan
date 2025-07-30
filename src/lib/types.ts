export interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string;
  cuisine: string;
  dietaryRestrictions: string[];
  image?: string;
}

export type Day =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export type MealType = 'Breakfast' | 'Lunch' | 'Dinner';

export interface Meal {
  id: string; // e.g., 'Monday-Breakfast'
  day: Day;
  type: MealType;
  recipe: Recipe | null;
}

export type MealPlan = Record<
  Day,
  {
    Breakfast: Meal;
    Lunch: Meal;
    Dinner: Meal;
  }
>;

export interface UserPreferences {
  dietaryPreferences: string;
  cuisinePreferences: string;
}

export interface GroceryItem {
  name: string;
  completed: boolean;
}
