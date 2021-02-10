import React, { useState, useEffect } from "react";

import * as spots from "services/spots";

import { Category } from "pages/Edit/Categories/Category";
import { Group, Label, Input } from "components/Layout";

export const Categories = ({ categories, setCategories }) => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    spots.getCategories(setData);
  }, []);

  const onClick = (e, target) => {
    e.preventDefault();
    const exists = categories.find((category) => category.name === target.name);
    if (exists) {
      const newCategories = categories.filter(
        (category) => category.name !== target.name
      );
      setCategories(newCategories, "categories");
    } else {
      const newCategories = [...categories, target];
      setCategories(newCategories, "categories");
    }
  };

  const filteredCategories = data
    ? data.filter((category) => {
        const match = category.name
          .toLowerCase()
          .includes(search.toLocaleLowerCase());
        const selected = categories.find((c) => c.name === category.name);
        return match && !selected && search.length > 2;
      })
    : [];

  return (
    <div>
      <Group>
        <Label htmlFor="categories">Categories</Label>
        <Input
          id="categories"
          type="text"
          placeholder={data ? "Search categories" : "Loading categories..."}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Group>
      <ul>
        {categories.map((category) => (
          <Category
            key={category.name}
            category={category}
            background="#60A5FA"
            onClick={onClick}
          />
        ))}
        {filteredCategories.map((category) => (
          <Category
            key={category.name}
            category={category}
            background="#D8D8D8"
            onClick={onClick}
          />
        ))}
      </ul>
    </div>
  );
};
