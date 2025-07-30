'use client';

import * as React from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {cn} from '@/lib/utils';
import {Leaf} from 'lucide-react';

const navItems = [
  {href: '/', label: 'Meal Plan'},
  {href: '/recipe-finder', label: 'Recipe Finder'},
  {href: '/grocery-list', label: 'Grocery List'},
  {href: '/profile', label: 'Profile'},
];

function HeaderComponent() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Leaf className="h-6 w-6 text-primary" />
          <span className="font-headline text-xl font-bold">
            Nourish Navigator
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm lg:gap-6">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname === item.href
                  ? 'text-foreground font-semibold'
                  : 'text-foreground/60'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export const Header = React.memo(HeaderComponent);
