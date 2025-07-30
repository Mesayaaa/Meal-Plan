import type {Recipe} from './types';

export const dummyRecipes: Recipe[] = [
  {
    name: 'Classic Spaghetti Carbonara',
    ingredients: [
      'Spaghetti',
      '2 large eggs',
      '1/2 cup grated Pecorino Romano',
      '4 slices of guanciale or pancetta',
      '2 cloves garlic',
      'Black pepper',
      'Salt',
    ],
    instructions: `1. Cook spaghetti according to package directions.
2. While pasta is cooking, fry guanciale until crisp.
3. In a bowl, whisk eggs, cheese, and a generous amount of black pepper.
4. Drain pasta, reserving some pasta water.
5. Combine pasta with guanciale. Remove from heat and quickly stir in egg mixture. Add pasta water if needed to create a creamy sauce. Serve immediately.`,
    cuisine: 'Italian',
    dietaryRestrictions: [],
    image: 'https://placehold.co/600x400.png',
  },
  {
    name: 'Avocado Toast with Egg',
    ingredients: [
      '2 slices of whole-wheat bread',
      '1 ripe avocado',
      '2 eggs',
      'Red pepper flakes',
      'Salt and pepper',
      '1 tsp lemon juice',
    ],
    instructions: `1. Toast bread to your liking.
2. Mash avocado with lemon juice, salt, and pepper.
3. Cook eggs as desired (fried, poached, or scrambled).
4. Spread mashed avocado on toast. Top with eggs and a sprinkle of red pepper flakes.`,
    cuisine: 'American',
    dietaryRestrictions: ['Vegetarian'],
    image: 'https://placehold.co/600x400.png',
  },
  {
    name: 'Chicken and Veggie Stir-fry',
    ingredients: [
      '1 lb chicken breast, sliced',
      '1 head of broccoli, chopped',
      '1 red bell pepper, sliced',
      '1 carrot, julienned',
      '1/4 cup soy sauce',
      '2 tbsp honey',
      '1 tbsp ginger, minced',
      '2 cloves garlic, minced',
      'Cooked rice for serving',
    ],
    instructions: `1. In a wok or large skillet, heat oil over medium-high heat.
2. Add chicken and cook until browned.
3. Add vegetables and stir-fry for 5-7 minutes until tender-crisp.
4. In a small bowl, mix soy sauce, honey, ginger, and garlic.
5. Pour sauce over chicken and vegetables, cook for another 2 minutes until sauce thickens. Serve over rice.`,
    cuisine: 'Asian',
    dietaryRestrictions: ['Dairy-Free'],
    image: 'https://placehold.co/600x400.png',
  },
];
