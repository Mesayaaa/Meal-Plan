'use client';

import * as React from 'react';
import {useForm, type SubmitHandler} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {useUserPreferences} from '@/hooks/use-user-preferences';
import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {useToast} from '@/hooks/use-toast';

const profileSchema = z.object({
  dietaryPreferences: z.string().min(1, 'Please enter at least one preference.'),
  cuisinePreferences: z.string().min(1, 'Please enter at least one preference.'),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const {preferences, setPreferences} = useUserPreferences();
  const {toast} = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: preferences,
  });

  React.useEffect(() => {
    form.reset(preferences);
  }, [preferences, form]);

  const onSubmit: SubmitHandler<ProfileFormValues> = data => {
    setPreferences(data);
    toast({
      title: 'Preferences Saved',
      description: 'Your profile has been updated successfully.',
    });
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
          User Profile
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Manage your preferences to get tailored recipe suggestions.
        </p>
      </div>

      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Your Preferences</CardTitle>
          <CardDescription>
            These settings will help us suggest recipes you'll love.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="dietaryPreferences"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Dietary Preferences</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., vegetarian, gluten-free, low-carb"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Separate different preferences with a comma.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cuisinePreferences"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Favorite Cuisines</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Italian, Mexican, Thai"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Separate different cuisines with a comma.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Save Preferences</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
