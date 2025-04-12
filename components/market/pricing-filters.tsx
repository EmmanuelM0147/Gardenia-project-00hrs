"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

/* Apply styles to the icons */
.icon {
  margin-right: 5px;
  width: 16px;
  height: 16px;
  color: var(--text-color);
}

:root {
  --dropdown-bg: #ffffff;
  --text-color: #333333;
  --hover-bg: #f0f0f0;
}

@media (prefers-color-scheme: dark) {
  :root {
    --dropdown-bg: #1a1a1a;
    --text-color: #ffffff;
  }
  --hover-bg: #333333;
}

/* Apply styles to the Select component */
[data-radix-popper-content-wrapper] {
  background-color: var(--dropdown-bg);
  color: var(--text-color);
}

[data-radix-popper-content-wrapper] * {
  color: var(--text-color);
}

/* Styles for the "Search within category" option */
.search-within-category {
  margin-top: 5px;
}

.search-within-category:hover {
  background-color: var(--hover-bg);
}

export function PricingFilters() {
  const [category, setCategory] = useState("all");
  const [market, setMarket] = useState("lagos");
  const [search, setSearch] = useState("");

  const handleCategoryChange = (value: string) => {
    if (value === "search_within") {
      const currentCategory = category !== "all" ? category : "";
      setSearch(prevSearch => {
        const categoryFilter = ` category:${currentCategory}`;
        return prevSearch.includes(" category:")
            ? prevSearch.replace(/ category:(\w+)?/, categoryFilter)
            : prevSearch + categoryFilter;
      });
    } else if (value !== "search_within") {
      setCategory(value);
    }
  };
  return (
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search commodities..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-8"
        />
      </div>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="fruits_vegetables">
                <span className="icon">🥕</span> Fruits & Vegetables
              </SelectItem>
              <SelectItem value="grains_cereals">
                <span className="icon">🌾</span> Grains & Cereals
              </SelectItem>
              <SelectItem value="livestock_poultry">
                <span className="icon">🐮</span> Livestock & Poultry
              </SelectItem>
              <SelectItem
                  value="search_within"
                  className="search-within-category"
              >
                <span className="icon"> 🔍 </span> Search within this category
              </SelectItem>
            </SelectContent>
          </SelectTrigger>
          <SelectValue placeholder="Category"/>
        </SelectTrigger>
      </Select>
          <SelectValue placeholder="Market"/>
        </SelectTrigger>
      </Select>
      <Select value={market} onValueChange={setMarket}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Market" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="lagos">Lagos</SelectItem>
          <SelectItem value="abuja">Abuja</SelectItem>
          <SelectItem value="kano">Kano</SelectItem>
          <SelectItem value="ibadan">Ibadan</SelectItem>
          <SelectItem value="port-harcourt">Port Harcourt</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}