'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ThemeToggle } from '@/components/theme-toggle'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { NestedDropdownMenu } from '@/components/ui/nested-dropdown'
import { MessageSquare, Search, ShoppingCart, Menu, X } from 'lucide-react'
import styles from './header.module.css'

const subcategories = [
  { name: 'Tubers', href: '/products?subcategory=tubers' },
  { name: 'Legumes', href: '/products?subcategory=legumes' },
  { name: 'Cereals/Grains', href: '/products?subcategory=cereals' },
  { name: 'Honey', href: '/products?subcategory=honey' },
  { name: 'Vegetables', href: '/products?subcategory=vegetables' },
  { name: 'Fruits', href: '/products?subcategory=fruits' },
  { name: 'Livestock', href: '/products?subcategory=livestock' },
  { name: 'Others', href: '/products?subcategory=others' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isFarmProduceOpen, setIsFarmProduceOpen] = useState(false);
  const farmProduceRef = useRef<HTMLElement>(null);

  const toggleFarmProduce = () => {
    setIsFarmProduceOpen(!isFarmProduceOpen);
  };

  const closeFarmProduce = () => {
    setIsFarmProduceOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        farmProduceRef.current &&
        !farmProduceRef.current.contains(event.target as Node)
      ) {
        closeFarmProduce();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [farmProduceRef]);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${styles.header}`}
    >
      <div
        className={`container flex h-16 items-center justify-around ${styles.container}`}
      >
        <Link
          href="/"
          className={`flex items-center space-x-2 ${styles.logo}`}
        >
          <span className="text-2xl font-bold">Gardenia</span>
        </Link>

        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent className={styles.menuContent}>
                  <ul className={`grid gap-3 p-4 ${styles.menuList}`}>
                    <li className="relative" ref={farmProduceRef}>
                      <button
                        className={`flex items-center rounded-md px-3 py-2 text-sm font-medium leading-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none ${styles.menuItem}`}
                        onClick={toggleFarmProduce}
                        onMouseEnter={toggleFarmProduce} // Optional: for hover effect
                        aria-expanded={isFarmProduceOpen}
                        aria-controls="farm-produce-menu"
                      >
                        <i
                          className="fa-solid fa-wheat-awn"
                          style={{ marginRight: '5px', fontSize: '16px' }}
                        ></i>
                        Farm Produce
                      </button>
                      {isFarmProduceOpen && (
                        <div
                          id="farm-produce-menu"
                          className={`${styles.nestedDropdownContent} ${styles.farmProducePanel}`}
                          role="menu"
                          aria-label="Farm Produce Subcategories"
                          onMouseLeave={closeFarmProduce} // Optional: for hover effect
                        >
                          <button
                            className={styles.closeButton}
                            onClick={closeFarmProduce}
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <ul className="py-2">
                            {subcategories.map((sub) => (
                              <li key={sub.name}>
                                <Link
                                  href={sub.href}
                                  className={styles.dropdownItem}
                                  onClick={closeFarmProduce}
                                >
                                  {sub.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                    <li>
                      <Link
                        href="/products?category=farminputs"
                        className={`flex items-center rounded-md px-3 py-2 text-sm font-medium leading-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none ${styles.menuItem}`}
                      >
                        <i className="fa-solid fa-carrot" style={{ marginRight: '5px', fontSize: '16px' }} />
                        Farm Inputs
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/products?category=processedproducts"
                        className={`flex items-center rounded-md px-3 py-2 text-sm font-medium leading-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none ${styles.menuItem}`}
                      >
                        <i className="fa-solid fa-blender" style={{ marginRight: '5px', fontSize: '16px' }}></i>
                        Processed Products
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/products" legacyBehavior passHref>
                  <NavigationMenuLink
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    Products
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/chat" legacyBehavior passHref>
                  <NavigationMenuLink
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    AI Assistant
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className={`relative w-full max-w-sm ${styles.searchContainer}`}>
          <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8"
          />
        </div>
        <Link href="/chat">
          <Button variant="outline" size="icon">
            <MessageSquare className="h-4 w-4" />
          </Button>
        </Link>
        <Button variant="outline" size="icon">
          <ShoppingCart className="h-4 w-4" />
        </Button>
        <ThemeToggle />
        <Link href="/auth/sign-in">
          <Button>Sign In</Button>
        </Link>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 space-y-4">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}