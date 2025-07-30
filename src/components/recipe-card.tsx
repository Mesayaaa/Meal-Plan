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
import type {Recipe} from '@/lib/types';
import {RecipeDetails} from './recipe-details';
import {Plus} from 'lucide-react';
import {dummyRecipes} from '@/lib/dummy-data';

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({recipe}: RecipeCardProps) {
  const {toast} = useToast();
  const [detailsOpen, setDetailsOpen] = React.useState(false);

  const handleAddToPlan = () => {
    // This is a placeholder. In a real app, this would open a dialog
    // to select a day and meal type.
    if (!dummyRecipes.find(r => r.name === recipe.name)) {
      dummyRecipes.push(recipe);
    }
    toast({
      title: 'Recipe Added',
      description: `${recipe.name} is now available to add to your meal plan.`,
    });
  };

  return (
    <>
      <Card className="flex flex-col overflow-hidden">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={recipe.image || 'https://placehold.co/600x400.png'}
              alt={recipe.name}
              layout="fill"
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
          <Button onClick={handleAddToPlan}>
            <Plus className="mr-2 h-4 w-4" />
            Add to Library
          </Button>
        </CardFooter>
      </Card>
      <RecipeDetails
        recipe={detailsOpen ? recipe : null}
        onOpenChange={setDetailsOpen}
      />
    </>
  );
}
