import type {Metadata} from 'next';
import './globals.css';
import {Alegreya, PT_Sans} from 'next/font/google';
import {cn} from '@/lib/utils';
import {Header} from '@/components/header';
import {Toaster} from '@/components/ui/toaster';
import {MealPlanProvider} from '@/hooks/use-meal-plan';

const fontSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-sans',
});

const fontSerif = Alegreya({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'Nourish Navigator',
  description:
    'A personalized meal planning app to organize weekly meals and simplify grocery shopping.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700&family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
          fontSans.variable,
          fontSerif.variable
        )}
      >
        <MealPlanProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
          <Toaster />
        </MealPlanProvider>
      </body>
    </html>
  );
}
