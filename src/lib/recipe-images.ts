/**
 * Utility functions for generating recipe images
 */

// Curated list of high-quality food images from Unsplash
const FOOD_IMAGES = {
  // Breakfast items
  breakfast: [
    '1551218808-fbd922b8b42a', // pancakes
    '1484723091739-30a097e8f929', // eggs benedict
    '1506084868230-bb9d95c24759', // avocado toast
    '1525351326368-efbb5cb6435d', // oatmeal
    '1558618047-3c512c78c7e4', // french toast
    '1571091718767-18b5b1457add', // breakfast sandwich
    '1533089860892-a9c6a049fc8e', // breakfast bowl
    '1504674900247-0877df9cc836', // toast with eggs
  ],
  
  // Pasta dishes
  pasta: [
    '1565299624946-3fb6ac7614dd', // spaghetti
    '1551183053-bf91a1d81141', // pasta with sauce
    '1563379091339-03fa3c4b4d40', // carbonara
    '1621996346205-f0b67c2ec7e8', // penne
    '1598866594230-2c3c2c2c2c2c', // lasagna
  ],
  
  // Salads
  salad: [
    '1512621776951-a57141f2eefd', // green salad
    '1540420773420-3366772f4999', // caesar salad
    '1546793665-c74683f339c1', // mixed salad
    '1505576391880-9c3163c6c5e2', // fruit salad
  ],
  
  // Meat dishes
  meat: [
    '1546833999-946b90aaaa2d', // grilled chicken
    '1565299507177-4ee19f04e67f', // steak
    '1544025162-18861d2de8a3', // roasted meat
    '1529692236671-f1f6cf9683ba', // beef dish
  ],
  
  // Sandwiches
  sandwich: [
    '1568901346375-23c9450c58cd', // club sandwich
    '1571091718767-18b5b1457add', // grilled sandwich
    '1565299585323-38dd0054c3bf', // burger
    '1586190848861-99aa4a171e90', // panini
  ],
  
  // Soups
  soup: [
    '1547592180-85f173990554', // tomato soup
    '1547592166-23ac45744acd', // vegetable soup
    '1578662996442-374dcbcf3b2f', // chicken soup
  ],
  
  // Desserts
  dessert: [
    '1551024506-0bccd0e7dcc2', // chocolate cake
    '1563805042-6e88d27e3ef8', // ice cream
    '1578985545622-7c14a934dff8', // cookies
    '1571115177098-24ec42ed204d', // pie
  ],
  
  // Asian cuisine
  asian: [
    '1565299624946-3fb6ac7614dd', // noodles
    '1546833999-946b90aaaa2d', // stir fry
    '1563379091339-03fa3c4b4d40', // rice dish
    '1598866594230-2c3c2c2c2c2c', // sushi
  ],
  
  // Mexican cuisine
  mexican: [
    '1565299585323-38dd0054c3bf', // tacos
    '1586190848861-99aa4a171e90', // burrito
    '1547592180-85f173990554', // quesadilla
  ],
  
  // Italian cuisine
  italian: [
    '1565299624946-3fb6ac7614dd', // pasta
    '1551183053-bf91a1d81141', // pizza
    '1563379091339-03fa3c4b4d40', // risotto
  ],
  
  // Default/general
  general: [
    '1565299624946-3fb6ac7614dd',
    '1551183053-bf91a1d81141',
    '1546833999-946b90aaaa2d',
    '1568901346375-23c9450c58cd',
    '1512621776951-a57141f2eefd',
  ]
};

/**
 * Get a random image URL for a recipe based on its name and cuisine
 */
export function getRecipeImageUrl(recipeName: string, cuisine?: string): string {
  const name = recipeName.toLowerCase();
  const cuisineType = cuisine?.toLowerCase() || '';
  
  let imageCategory = 'general';
  
  // Determine category based on recipe name
  if (name.includes('pasta') || name.includes('spaghetti') || name.includes('carbonara') || name.includes('penne')) {
    imageCategory = 'pasta';
  } else if (name.includes('salad')) {
    imageCategory = 'salad';
  } else if (name.includes('sandwich') || name.includes('burger') || name.includes('panini')) {
    imageCategory = 'sandwich';
  } else if (name.includes('soup') || name.includes('broth')) {
    imageCategory = 'soup';
  } else if (name.includes('cake') || name.includes('dessert') || name.includes('cookie') || name.includes('ice cream')) {
    imageCategory = 'dessert';
  } else if (name.includes('chicken') || name.includes('beef') || name.includes('steak') || name.includes('meat')) {
    imageCategory = 'meat';
  } else if (name.includes('pancake') || name.includes('toast') || name.includes('breakfast') || name.includes('eggs')) {
    imageCategory = 'breakfast';
  }
  
  // Override with cuisine-specific images if available
  if (cuisineType.includes('italian')) {
    imageCategory = 'italian';
  } else if (cuisineType.includes('mexican')) {
    imageCategory = 'mexican';
  } else if (cuisineType.includes('asian') || cuisineType.includes('chinese') || cuisineType.includes('japanese')) {
    imageCategory = 'asian';
  }
  
  const images = FOOD_IMAGES[imageCategory as keyof typeof FOOD_IMAGES] || FOOD_IMAGES.general;
  const randomImage = images[Math.floor(Math.random() * images.length)];
  
  return `https://images.unsplash.com/photo-${randomImage}?w=600&h=400&fit=crop&crop=center&auto=format&q=80`;
}

/**
 * Fallback function to get a placeholder image
 */
export function getPlaceholderImage(): string {
  return 'https://images.unsplash.com/photo-1565299624946-3fb6ac7614dd?w=600&h=400&fit=crop&crop=center&auto=format&q=80';
}
