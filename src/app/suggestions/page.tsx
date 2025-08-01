"use client";

import * as React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  suggestRecipes,
  type SuggestRecipesOutput,
} from "@/ai/flows/suggest-recipes";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { RecipeCard } from "@/components/recipe-card";
import { useUserPreferences } from "@/hooks/use-user-preferences";
import { Loader2 } from "lucide-react";
import type { Recipe } from "@/lib/types";

const formSchema = z.object({
  ingredientsOnHand: z.string().min(1, "Please list at least one ingredient."),
});

type FormValues = z.infer<typeof formSchema>;

interface SuggestionsPageProps {
  onRecipeSelect?: (recipe: Recipe) => void;
}

export default function SuggestionsPage({
  onRecipeSelect,
}: SuggestionsPageProps) {
  const { toast } = useToast();
  const { preferences } = useUserPreferences();
  const [suggestedRecipes, setSuggestedRecipes] = React.useState<
    SuggestRecipesOutput["recipes"]
  >([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ingredientsOnHand: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setSuggestedRecipes([]);
    try {
      const result = await suggestRecipes({
        ...data,
        dietaryPreferences: preferences.dietaryPreferences,
        cuisinePreferences: preferences.cuisinePreferences,
      });
      setSuggestedRecipes(result.recipes);
    } catch (error) {
      console.error("Failed to get suggestions:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "Could not fetch recipe suggestions. Please try again later.",
      });
    }
    setIsLoading(false);
  };

  const pageTitle = onRecipeSelect ? "Find a Recipe" : "Get Recipe Suggestions";
  const pageDescription = onRecipeSelect
    ? "Find the perfect recipe to add to your meal plan."
    : "Tell us what you have, and we'll find recipes for you.";

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 pb-8">
      {!onRecipeSelect && (
        <div className="mb-8 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
            {pageTitle}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {pageDescription}
          </p>
        </div>
      )}

      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">
            What's in your pantry?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="ingredientsOnHand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ingredients You Have</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., chicken, rice, tomatoes"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Getting suggestions...
                  </>
                ) : (
                  "Suggest Recipes"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {suggestedRecipes.length > 0 && (
        <div className="mt-12 pb-8">
          <h2 className="font-headline mb-8 text-center text-3xl font-bold">
            Here's what we found...
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr px-2 sm:px-0">
            {suggestedRecipes.map((recipe, index) => (
              <RecipeCard
                key={index}
                recipe={recipe}
                onAddToPlan={onRecipeSelect}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
