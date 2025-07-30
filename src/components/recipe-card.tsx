'use client';

import * as React from 'react';
import Image from 'next/image';
import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {useToast} from '@/hooks/use-toast';
import type {Day, MealType, Recipe} from '@/lib/types';
import {RecipeDetails} from './recipe-details';
import {Plus} from 'lucide-react';
import {useMealPlan} from '@/hooks/use-meal-plan.tsx';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface RecipeCardProps {
  recipe: Recipe;
  onAddToPlan?: (recipe: Recipe) => void;
}

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

function RecipeCardComponent({recipe, onAddToPlan}: RecipeCardProps) {
  const {toast} = useToast();
  const {addMeal} = useMealPlan();
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [addToPlanOpen, setAddToPlanOpen] = React.useState(false);
  const [selectedDay, setSelectedDay] = React.useState<Day | null>(null);
  const [selectedMealType, setSelectedMealType] = React.useState<MealType | null>(
    null
  );

  const handleAddToPlan = () => {
    if (onAddToPlan) {
      onAddToPlan(recipe);
    } else {
      if (selectedDay && selectedMealType) {
        addMeal(selectedDay, selectedMealType, recipe);
        toast({
          title: 'Recipe Added to Plan',
          description: `${recipe.name} has been added to ${selectedDay} ${selectedMealType}.`,
        });
        setAddToPlanOpen(false);
        setSelectedDay(null);
        setSelectedMealType(null);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Please select a day and meal type.',
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
  }

  return (
    <>
      <Card className="flex flex-col overflow-hidden">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={recipe.image || 'https://placehold.co/600x400.png'}
              alt={recipe.name}
              fill
              objectFit="cover"
              data-ai-hint="delicious meal"
            />
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <CardTitle className="font-headline text-xl">{recipe.name}</CardTitle>
        </CardContent>
        <CardFooter className="flex justify-between bg-muted/50 p-4">
          <Button variant="outline" onClick={() => setDetailsOpen(true)}>
            View Recipe
          </Button>

          <Dialog open={addToPlanOpen} onOpenChange={setAddToPlanOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleTriggerClick}>
                <Plus className="mr-2 h-4 w-4" />
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
                        {days.map(day => (
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
                        {mealTypes.map(type => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={handleAddToPlan}>Confirm</Button>
              </DialogContent>
            )}
          </Dialog>
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
