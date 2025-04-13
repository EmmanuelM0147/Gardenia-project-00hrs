"use client";

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

async function fetchProducts(): Promise<Product[]> {
  const res = await fetch("/api/products");
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("All");

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === "All") return true;
    if (product.category !== selectedCategory) return false;
    if (selectedSubcategory === "All") return true;
    return product.subcategory === selectedSubcategory;
  });

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
    setSelectedSubcategory("All");
  };

  const handleSubcategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedSubcategory(event.target.value);
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (filteredProducts.length === 0) {
    return (
      <p>No products found matching the selected filters.</p>
    );
  }

  return (
    <div>
      <h1>Products</h1>

      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="All">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {selectedCategory in subcategories && (
        <select value={selectedSubcategory} onChange={handleSubcategoryChange}>
          <option value="All">All Subcategories</option>
          {subcategories[selectedCategory].map((subcategory) => (
            <option key={subcategory} value={subcategory}>
              {subcategory}
            </option>
          ))}
        </select>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
        {filteredProducts.map((product) => (
          <div key={product.id} style={{ border: "1px solid #ccc", padding: "1rem" }}>
            <img src={product.imageUrl} alt={product.name} style={{ maxWidth: "100%", height: "auto" }} />
            <h3>{product.name}</h3>
            <p>Category: {product.category}</p>
            {product.subcategory && <p>Subcategory: {product.subcategory}</p>}
            <p>Price: ${product.price} / {product.unit}</p>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}