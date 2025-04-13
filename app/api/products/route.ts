import { NextResponse } from 'next/server';

interface Product {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  price: number;
  unit: string;
  description: string;
  imageUrl: string;
  stock: number;
}

const categories = [
  "Processed Products",
  "Tubers",
  "Legumes",
  "Cereals/Grains",
  "Honey",
  "Vegetables",
  "Fruits",
  "Livestock",
  "Others",
];

const subcategories = {
  "Processed Products": ["Hibiscus", "Food", "Drinks"],
};

// Mock product data (replace with your actual data source)
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Yam",
    category: "Tubers",
    price: 2.5,
    unit: "kg",
    description: "Freshly harvested yam.",
    imageUrl: "/images/yam.jpg", // Replace with actual image path
    stock: 100,
  },
  {
    id: "2",
    name: "Beans",
    category: "Legumes",
    price: 1.8,
    unit: "kg",
    description: "High-quality beans.",
    imageUrl: "/images/beans.jpg", // Replace with actual image path
    stock: 150,
  },
  {
    id: "3",
    name: "Honey",
    category: "Honey",
    price: 5.0,
    unit: "500g",
    description: "Pure and natural honey.",
    imageUrl: "/images/honey.jpg", // Replace with actual image path
    stock: 50,
  },
  {
    id: "4",
    name: "Hibiscus Drink",
    category: "Processed Products",
    subcategory: "Drinks",
    price: 3.0,
    unit: "bottle",
    description: "Refreshing hibiscus drink.",
    imageUrl: "/images/hibiscus.jpg", // Replace with actual image path
    stock: 80,
  },
  // Add more mock products as needed
];

export async function GET() {
  try {
    // In a real application, you would fetch data from a database here
    // Example: const products = await db.query("SELECT * FROM products");
    const products = mockProducts;

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export const revalidate = 3600;
