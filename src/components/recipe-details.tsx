"use client";

import * as React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { Recipe } from "@/lib/types";
import { getRecipeImageUrl, getPlaceholderImage } from "@/lib/recipe-images";

interface RecipeDetailsProps {
  recipe: Recipe | null;
  onOpenChange: (open: boolean) => void;
}

function RecipeDetailsComponent({ recipe, onOpenChange }: RecipeDetailsProps) {
  const [imageError, setImageError] = React.useState(false);

  if (!recipe) return null;

  const getImageUrl = () => {
    if (imageError) {
      return getPlaceholderImage();
    }
    return recipe.image || getRecipeImageUrl(recipe.name, recipe.cuisine);
  };

  return (
    <Dialog open={!!recipe} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="relative h-48 w-full overflow-hidden rounded-lg">
            <Image
              src={getImageUrl()}
              alt={recipe.name}
              fill
              className="object-cover"
              data-ai-hint="recipe food"
              onError={() => setImageError(true)}
            />
          </div>
          <DialogTitle className="font-headline mt-4 text-3xl">
            {recipe.name}
          </DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-wrap gap-2 pt-2 mb-2">
              <Badge variant="secondary">{recipe.cuisine}</Badge>
              {recipe.dietaryRestrictions.map((restriction) => (
                <Badge key={restriction} variant="outline">
                  {restriction}
                </Badge>
              ))}
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="grid max-h-[50vh] gap-6 overflow-y-auto p-1 py-4">
          <div>
            <h3 className="font-headline mb-2 text-xl font-semibold">
              Ingredients
            </h3>
            <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
              {recipe.ingredients.map((ingredient) => (
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

export const RecipeDetails = React.memo(RecipeDetailsComponent);
