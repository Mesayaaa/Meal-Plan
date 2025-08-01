"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMealPlan } from "@/hooks/use-meal-plan";
import type { Day, MealType, Recipe } from "@/lib/types";
import { RecipeDetails } from "@/components/recipe-details";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import SuggestionsPage from "@/app/suggestions/page";

const days: Day[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const mealTypes: MealType[] = ["Breakfast", "Lunch", "Dinner"];

export default function MealCalendarPage() {
  const { mealPlan, addMeal } = useMealPlan();
  const [selectedRecipe, setSelectedRecipe] = React.useState<Recipe | null>(
    null
  );
  const [addMealDialogOpen, setAddMealDialogOpen] = React.useState(false);
  const [mealSlot, setMealSlot] = React.useState<{
    day: Day;
    type: MealType;
  } | null>(null);

  const handleAddMeal = (recipe: Recipe) => {
    if (mealSlot) {
      addMeal(mealSlot.day, mealSlot.type, recipe);
      setAddMealDialogOpen(false);
      setMealSlot(null);
    }
  };

  const openAddMealDialog = (day: Day, type: MealType) => {
    setMealSlot({ day, type });
    setAddMealDialogOpen(true);
  };

  const closeAddMealDialog = () => {
    setAddMealDialogOpen(false);
    setMealSlot(null);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
          Your Weekly Meal Plan
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Organize your meals for the week ahead.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {days.map((day) => (
          <Card key={day} className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">{day}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-4">
              {mealTypes.map((type) => {
                const meal = mealPlan[day][type];
                const isCurrentSlot =
                  mealSlot?.day === day && mealSlot?.type === type;
                return (
                  <div key={type}>
                    <h4 className="font-semibold text-muted-foreground">
                      {type}
                    </h4>
                    <div className="mt-1 flex min-h-[4rem] items-center justify-between rounded-lg border border-dashed p-2">
                      {meal.recipe ? (
                        <>
                          <span className="font-medium">
                            {meal.recipe.name}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedRecipe(meal.recipe)}
                          >
                            View
                          </Button>
                        </>
                      ) : (
                        <Dialog
                          open={addMealDialogOpen && isCurrentSlot}
                          onOpenChange={(isOpen) =>
                            !isOpen && closeAddMealDialog()
                          }
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              className="w-full text-muted-foreground"
                              onClick={() => openAddMealDialog(day, type)}
                            >
                              <PlusCircle className="mr-2 h-4 w-4" />
                              Add Meal
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh]">
                            <DialogHeader>
                              <DialogTitle className="font-headline">
                                Find a recipe for {day} {type}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="max-h-[75vh] overflow-y-auto p-1 pb-4">
                              <SuggestionsPage onRecipeSelect={handleAddMeal} />
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        ))}
      </div>

      <RecipeDetails
        recipe={selectedRecipe}
        onOpenChange={() => setSelectedRecipe(null)}
      />
    </div>
  );
}
