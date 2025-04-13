"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  HiOutlineChevronRight,
  HiOutlineCube,
  HiOutlineShoppingCart,
  HiOutlineSparkles,
} from "react-icons/hi";

const ProcessedProductsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  const subcategories = [
    {
      name: "Hibiscus",
      href: "/products?subcategory=hibiscus",
      icon: HiOutlineSparkles,
    },
    {
      name: "Food",
      href: "/products?subcategory=food",
      icon: HiOutlineCube,
    },
    {
      name: "Drinks",
      href: "/products?subcategory=drinks",
      icon: HiOutlineShoppingCart,
    },
    
  ];

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    timerRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 100); // Short delay to prevent accidental closure
  };

  const handleMouseEnter = () => {
    clearTimeout(timerRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    closeDropdown();
  };

  const clearTimer = () => {
    clearTimeout(timerRef.current);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as HTMLElement)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={toggleDropdown}
    >
      <button
        className={`
          flex items-center justify-between w-full px-4 py-2 text-sm font-bold 
          rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 
          focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
          transition-colors duration-200 ease-in-out
        `}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        Processed Products <HiOutlineChevronRight className="ml-2" />
      </button>
      {isOpen && (
        <ul
          className={`
            absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10
            opacity-0 animate-fade-in
          `}
          style={{ minWidth: "200px" }}
          role="menu"
          aria-label="Processed Products Subcategories"
        >
          {subcategories.map((sub, index) => {
            const Icon = sub.icon;
            return (
              <li
                key={index}
                role="menuitem"
                className="relative"
                onMouseEnter={clearTimer}
                onMouseLeave={closeDropdown}
              >
                <Link
                  href={sub.href}
                  onClick={closeDropdown}
                  className="
                    flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300
                    hover:bg-gray-100 dark:hover:bg-gray-700
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                    transition-colors duration-200 ease-in-out
                  "
                >
                  <Icon className="mr-2 h-5 w-5" />
                  {sub.name}
                </Link>
                {index < subcategories.length - 1 && (
                  <div className="border-b border-gray-200 dark:border-gray-700 my-1" />
                )}
              </li>
            );
          })}
        </ul>
      )}
      <style jsx>{`
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .dark ul {
          box-shadow: 0 2px 8px rgba(255, 255, 255, 0.1);
        }

        ul {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default ProcessedProductsDropdown;