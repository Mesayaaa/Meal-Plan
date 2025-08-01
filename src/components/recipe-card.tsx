"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import type { Day, MealType, Recipe } from "@/lib/types";
import { RecipeDetails } from "./recipe-details";
import { Plus } from "lucide-react";
import { useMealPlan } from "@/hooks/use-meal-plan";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getRecipeImageUrl, getPlaceholderImage } from "@/lib/recipe-images";

interface RecipeCardProps {
  recipe: Recipe;
  onAddToPlan?: (recipe: Recipe) => void;
}

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

function RecipeCardComponent({ recipe, onAddToPlan }: RecipeCardProps) {
  const { toast } = useToast();
  const { addMeal } = useMealPlan();
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [addToPlanOpen, setAddToPlanOpen] = React.useState(false);
  const [selectedDay, setSelectedDay] = React.useState<Day | null>(null);
  const [selectedMealType, setSelectedMealType] =
    React.useState<MealType | null>(null);
  const [imageError, setImageError] = React.useState(false);

  // Get the best image URL for this recipe
  const getImageUrl = () => {
    if (imageError) {
      return getPlaceholderImage();
    }
    return recipe.image || getRecipeImageUrl(recipe.name, recipe.cuisine);
  };

  const handleAddToPlan = () => {
    if (onAddToPlan) {
      onAddToPlan(recipe);
    } else {
      if (selectedDay && selectedMealType) {
        addMeal(selectedDay, selectedMealType, recipe);
        toast({
          title: "Recipe Added to Plan",
          description: `${recipe.name} has been added to ${selectedDay} ${selectedMealType}.`,
        });
        setAddToPlanOpen(false);
        setSelectedDay(null);
        setSelectedMealType(null);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please select a day and meal type.",
        });
      }
    }
  };

  const handleTriggerClick = () => {
    if (onAddToPlan) {
      onAddToPlan(recipe);
    } else {
      setAddToPlanOpen(true);
    }
  };

  return (
    <>
      <Card className="flex flex-col overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 h-full min-h-[400px]">
        <CardHeader className="p-0 flex-shrink-0">
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={getImageUrl()}
              alt={recipe.name}
              fill
              className="object-cover transition-transform duration-200 hover:scale-105"
              data-ai-hint="delicious meal"
              onError={() => setImageError(true)}
            />
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-4 pb-2 flex flex-col justify-between">
          <CardTitle className="font-headline text-xl leading-tight line-clamp-2 mb-2">
            {recipe.name}
          </CardTitle>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 bg-muted/50 p-4 pt-3 mt-auto">
          <div className="flex w-full gap-2">
            <Button
              variant="outline"
              onClick={() => setDetailsOpen(true)}
              className="flex-1 h-9 text-sm min-h-[36px] whitespace-nowrap"
            >
              View Recipe
            </Button>

            <Dialog open={addToPlanOpen} onOpenChange={setAddToPlanOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={handleTriggerClick}
                  className="flex-1 h-9 text-sm min-h-[36px] whitespace-nowrap"
                >
                  <Plus className="mr-2 h-4 w-4 flex-shrink-0" />
                  Add to Plan
                </Button>
              </DialogTrigger>
              {!onAddToPlan && (
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add "{recipe.name}" to your plan</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label>Day</label>
                      <Select
                        onValueChange={(value: Day) => setSelectedDay(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a day" />
                        </SelectTrigger>
                        <SelectContent>
                          {days.map((day) => (
                            <SelectItem key={day} value={day}>
                              {day}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label>Meal</label>
                      <Select
                        onValueChange={(value: MealType) =>
                          setSelectedMealType(value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a meal time" />
                        </SelectTrigger>
                        <SelectContent>
                          {mealTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button onClick={handleAddToPlan} className="w-full">
                      Confirm
                    </Button>
                  </div>
                </DialogContent>
              )}
            </Dialog>
          </div>
        </CardFooter>
      </Card>
      <RecipeDetails
        recipe={detailsOpen ? recipe : null}
        onOpenChange={setDetailsOpen}
      />
    </>
  );
}

export const RecipeCard = React.memo(RecipeCardComponent);
