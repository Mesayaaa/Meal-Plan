# Nourish Navigator

Nourish Navigator is a modern, AI-powered meal planning application designed to simplify your weekly meal organization and grocery shopping. Built with Next.js and Genkit, it provides personalized recipe suggestions and helps you build a cohesive meal plan with ease.

## ✨ Featuress

- **Weekly Meal Planner**: A visual calendar to plan your breakfast, lunch, and dinner for every day of the week.
- **AI-Powered Recipe Suggestions**: Leveraging Genkit and Google's Gemini AI, get recipe ideas based on ingredients you already have and your personal taste profile.
- **Dynamic Recipe Search**: Find and add new recipes to your meal plan directly from the calendar view.
- **Smart Grocery List**: Your shopping list is automatically generated from the recipes in your meal plan. You can also add and manage manual items.
- **Personalized User Profile**: Save your dietary restrictions and favorite cuisines to receive tailored recipe recommendations.
- **Interactive Recipe Cards**: View detailed recipe information, including ingredients and step-by-step instructions, in a clean, accessible dialog.
- **Persistent State**: Your meal plan, user preferences, and grocery list are automatically saved to your browser's local storage, so your data is always there when you return.
- **Responsive Design**: A seamless experience across desktop and mobile devices.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/) for beautiful, accessible components.
- **Generative AI**: [Genkit](https://firebase.google.com/docs/genkit) for seamless integration with Google's AI models.
- **State Management**: React Hooks (`useState`, `useContext`, `useEffect`) for efficient and predictable state handling.
- **Forms**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for robust form validation.

## 🚀 Getting Started

Follow these steps to get the application running locally on your machine.

### Prerequisites

- Node.js (v18 or later recommended)
- npm, yarn, or pnpm

### 1. Installation

Clone the repository and install the project dependencies:

```bash
git clone <repository-url>
cd nourish-navigator
npm install
```

### 2. Environment Variables

Create a `.env` file in the root of the project. You will need to add your Gemini API key for the AI features to work.

```env
# Get your API key from Google AI Studio: https://aistudio.google.com/app/apikey
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

### 3. Running the Development Server

Start the Next.js development server:

```bash
npm run dev
```

The application will be available at `http://localhost:9002`.

## 📂 Project Structure

- `src/app/`: Main application pages using the Next.js App Router.
- `src/components/`: Reusable React components, including UI components from shadcn/ui.
- `src/ai/`: Contains all Genkit-related code, including AI flows and prompts.
- `src/hooks/`: Custom React hooks for managing state like the meal plan, user preferences, and toast notifications.
- `src/lib/`: Utility functions, type definitions, and static