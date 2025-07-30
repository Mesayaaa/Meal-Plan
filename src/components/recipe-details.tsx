'use client';

import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {Badge} from '@/components/ui/badge';
import type {Recipe} from '@/lib/types';

interface RecipeDetailsProps {
  recipe: Recipe | null;
  onOpenChange: (open: boolean) => void;
}

export function RecipeDetails({recipe, onOpenChange}: RecipeDetailsProps) {
  if (!recipe) return null;

  return (
    <Dialog open={!!recipe} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="relative h-48 w-full overflow-hidden rounded-lg">
            <Image
              src={recipe.image || 'https://placehold.co/600x400.png'}
              alt={recipe.name}
              layout="fill"
              objectFit="cover"
              data-ai-hint="recipe food"
            />
          </div>
          <DialogTitle className="font-headline mt-4 text-3xl">
            {recipe.name}
          </DialogTitle>
          <DialogDescription className="flex flex-wrap gap-2 pt-2">
            <Badge variant="secondary">{recipe.cuisine}</Badge>
            {recipe.dietaryRestrictions.map(restriction => (
              <Badge key={restriction} variant="outline">
                {restriction}
              </Badge>
            ))}
          </DialogDescription>
        </DialogHeader>
        <div className="grid max-h-[50vh] gap-6 overflow-y-auto p-1 py-4">
          <div>
            <h3 className="font-headline mb-2 text-xl font-semibold">
              Ingredients
            </h3>
            <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
              {recipe.ingredients.map(ingredient => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-headline mb-2 text-xl font-semibold">
              Instructions
            </h3>
            <p className="whitespace-pre-wrap text-muted-foreground">
              {recipe.instructions}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
