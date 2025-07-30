'use client';

import * as React from 'react';
import {useForm, type SubmitHandler} from 'react-hook-form';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Checkbox} from '@/components/ui/checkbox';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {useMealPlan} from '@/hooks/use-meal-plan';
import {cn} from '@/lib/utils';
import {Trash2, Plus} from 'lucide-react';

type FormValues = {
  newItem: string;
};

export default function GroceryListPage() {
  const {groceryList, addManualGroceryItem, toggleGroceryItem, clearGroceryList} =
    useMealPlan();
  const {register, handleSubmit, reset} = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = data => {
    addManualGroceryItem(data.newItem);
    reset();
  };

  const sortedList = [...groceryList].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
          Your Grocery List
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          All the ingredients you need for your planned meals, plus your own
          additions.
        </p>
      </div>

      <Card className="mx-auto max-w-2xl">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-headline text-2xl">
            Shopping Items
          </CardTitle>
          <Button variant="destructive" size="sm" onClick={clearGroceryList}>
            <Trash2 className="mr-2 h-4 w-4" />
            Clear List
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="mb-6 flex gap-2">
            <Input
              {...register('newItem', {required: true})}
              placeholder="Add a manual item..."
              className="flex-grow"
            />
            <Button type="submit" size="icon" aria-label="Add item">
              <Plus className="h-4 w-4" />
            </Button>
          </form>

          {sortedList.length > 0 ? (
            <div className="space-y-3">
              {sortedList.map(item => (
                <div
                  key={item.name}
                  className="flex items-center gap-3 rounded-md border p-3 transition-colors hover:bg-muted/50"
                >
                  <Checkbox
                    id={item.name}
                    checked={item.completed}
                    onCheckedChange={() => toggleGroceryItem(item.name)}
                  />
                  <Label
                    htmlFor={item.name}
                    className={cn(
                      'flex-grow text-base',
                      item.completed && 'text-muted-foreground line-through'
                    )}
                  >
                    {item.name}
                  </Label>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-40 flex-col items-center justify-center rounded-lg border-2 border-dashed">
              <p className="text-muted-foreground">
                Your grocery list is empty.
              </p>
              <p className="text-sm text-muted-foreground">
                Add meals to your plan or manually add items above.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
