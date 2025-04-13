'use client';

import { useState, useEffect } from 'react';
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ProductGrid from "@/components/products/product-grid";

async function getProducts() {
  const supabase = createServerComponentClient({ cookies });
  
  try {
    const { data: products, error } = await supabase
      .from("products")
      .select(`
        *,\
        category:categories(name),\
        images:product_images(url, alt_text, is_primary)\
      `)
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error);
      return [];
    }

    return products || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (!products || products.length === 0) {
    return <p>No products found</p>;
  }

  return <ProductGrid products={products} />;
};

export default ProductList;