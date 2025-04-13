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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWheatAwn, faSeedling, faBlender } from '@fortawesome/free-solid-svg-icons'
import styles from './header.module.css'
import { cn } from "@/lib/utils" // Assuming you have a utils file with a cn function for class names

import ProcessedProductsDropdown from './ProcessedProductsDropdown';
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

const farmInputsSubcategories = [
  { name: 'Fertilizers', href: '/products?subcategory=fertilizers' },
  { name: 'Seeds', href: '/products?subcategory=seeds' },
  { name: 'Pesticides', href: '/products?subcategory=pesticides' },
  { name: 'Veterinary Drugs', href: '/products?subcategory=veterinary' },
  { name: 'Supplements', href: '/products?subcategory=supplements' },
  { name: 'Equipment', href: '/products?subcategory=equipment' },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isFarmProduceOpen, setIsFarmProduceOpen] = useState(false);

  const toggleFarmProduce = () => {
    setIsFarmProduceOpen(!isFarmProduceOpen);
  };

  const closeFarmProduce = () => {
    setIsFarmProduceOpen(false);
  };

  const [isFarmInputsOpen, setIsFarmInputsOpen] = useState(false);
  const farmProduceRef = useRef<HTMLUListElement>(null);
  const farmInputsRef = useRef<HTMLUListElement>(null);

  const closeFarmInputs = () => {
    setIsFarmInputsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        farmProduceRef.current &&
        !farmProduceRef.current.contains(event.target as Node)
      ) {
        closeFarmProduce();
      }
      if (
        farmInputsRef.current &&
        !farmInputsRef.current.contains(event.target as Node)
      ) {
        closeFarmInputs();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [farmProduceRef, farmInputsRef]);


  const toggleFarmInputs = () => {
    setIsFarmInputsOpen(!isFarmInputsOpen);
  };

  const closeProcessedProducts = () => {
    setProcessedProductsOpen(false);
  };

  const [isProcessedProductsOpen, setProcessedProductsOpen] = useState(false);
  const processedProductsRef = useRef<HTMLUListElement>(null);

  const toggleProcessedProducts = () => {
    setProcessedProductsOpen(!isProcessedProductsOpen);
  };

  const [processedProductsSubcategories, setProcessedProductsSubcategories] = useState([
    { name: 'Hibiscus', href: '/products?subcategory=hibiscus' },
    { name: 'Food', href: '/products?subcategory=food' },
    { name: 'Drinks', href: '/products?subcategory=drinks' },
  ]);



  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${styles.header}`}
    >
      <div
        className={`container flex h-16 items-center justify-between ${styles.container}`} // Changed to justify-between
      >
        <Link
          href="/"
          className={`flex items-center space-x-2 ${styles.logo}`}
        >
          <span className="text-2xl font-bold">Gardenia</span>
        </Link>

        <div className="hidden md:flex items-center"> {/* Added items-center */}
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
                        onMouseEnter={toggleFarmProduce}
                        aria-expanded={isFarmProduceOpen}
                        aria-controls="farm-produce-menu"
                        aria-haspopup="true" // Added for accessibility
                      >
                        <FontAwesomeIcon
                          icon={faWheatAwn} // Assuming this icon is correct for "Farm Produce"
                          style={{ marginRight: '5px', fontSize: '16px' }}
                        />
                        Farm Produce
                      </button>
                      {isFarmProduceOpen && (
                        <div
                          id="farm-produce-menu"
                          className={`${styles.nestedDropdownContent} ${styles.farmProducePanel}`}
                          role="menu"
                          aria-label="Farm Produce Subcategories"
                          onMouseLeave={closeFarmProduce} // This might need to be adjusted to handle both dropdowns
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
                    <li className="relative" ref={farmInputsRef} >
                      <button
                        className={`flex items-center rounded-md px-3 py-2 text-sm font-medium leading-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none ${styles.menuItem}`}
                        onClick={toggleFarmInputs}
                        onMouseEnter={toggleFarmInputs}
                        aria-expanded={isFarmInputsOpen} // Corrected the state variable name
                        aria-controls="farm-inputs-menu"
                        aria-haspopup="true" // Added for accessibility
                      >
                        <FontAwesomeIcon
                          icon={faSeedling}
                          style={{ marginRight: '5px', fontSize: '16px' }}
                        />
                        Farm Inputs
                      </button>
                      {isFarmInputsOpen && (
                        <div
                          id="farm-inputs-menu"
                          className={`${styles.nestedDropdownContent} ${styles.farmInputsPanel}`}
                          role="menu"
                          aria-label="Farm Inputs Subcategories"
                          onMouseLeave={closeFarmInputs} // This might need adjustment as well
                        >
                          <button
                            className={styles.closeButton}
                            onClick={closeFarmInputs}
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <ul className="py-2">
                            {farmInputsSubcategories.map((sub) => (
                              <li key={sub.name}>
                                <Link
                                  href={sub.href}
                                  className={styles.dropdownItem}
                                  onClick={closeFarmInputs}
                                >
                                  {sub.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>

                    <li className="relative" ref={processedProductsRef}>
                      <button
                        className={`flex items-center rounded-md px-3 py-2 text-sm font-medium leading-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none ${styles.menuItem}`}
                        onClick={toggleProcessedProducts}
                        onMouseEnter={toggleProcessedProducts}
                        aria-expanded={isProcessedProductsOpen}
                        aria-controls="processed-products-menu"
                        aria-haspopup="true"
                      >
                        <FontAwesomeIcon
                          icon={faBlender}
                          style={{ marginRight: '5px', fontSize: '16px' }}
                        />
                        Processed Products
                      </button>
                      {isProcessedProductsOpen && (
                        <div
                          id="processed-products-menu"
                          className={`${styles.nestedDropdownContent} ${styles.processedProductsPanel}`}
                          role="menu"
                          aria-label="Processed Products Subcategories"
                          onMouseLeave={closeProcessedProducts}
                        >
                          <button
                            className={styles.closeButton}
                            onClick={closeProcessedProducts}
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <ul className="py-2">
                            {(processedProductsSubcategories.length > 0 ? processedProductsSubcategories : subcategories).map((sub) => (
                              <li key={sub.name}>
                                <Link
                                  href={sub.href}
                                  className={styles.dropdownItem}
                                  onClick={closeProcessedProducts}
                                >
                                  {sub.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>







                    {/* Example of a styled menu item, adapt as needed */}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/products" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    Products
                  </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>         
                <Link href="/chat" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                      AI Assistant
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className={`relative w-full max-w-md ${styles.searchContainer}`}> {/* Increased max-w-sm to max-w-md */}
          <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8"
          />
        </div>
        <div className="flex items-center space-x-2"> {/* Wrapped buttons in a div for better spacing control */}
          <Link href="/messages">  {/* Changed from "/chat" to "/messages" */}
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
        </div>
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

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
  );
}

export default Header;