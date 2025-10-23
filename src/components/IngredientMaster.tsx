import { useState } from "react";

export function IngredientMaster({
  ingredients,
  ingredientPrices,
  onPriceChange,
}: {
  ingredients: any[];
  ingredientPrices: Record<string, number>;
  onPriceChange: (id: string, newPrice: number) => void;
}) {
  const [search, setSearch] = useState("");

  const filtered = ingredients.filter((ing) =>
    ing.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-900 rounded-2xl p-4 h-full space-y-3">
      <h2 className="text-xl font-semibold text-white text-center">
        Ingredient Master
      </h2>

      <input
        type="text"
        placeholder="Search ingredient..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-gray-800 rounded px-3 py-1 text-gray-100"
      />

      <div className="overflow-y-auto max-h-[70vh] space-y-2">
        {filtered.map((ing) => (
          <div
            key={ing.id}
            className="flex justify-between items-center bg-gray-800 p-2 rounded-lg"
          >
            <div className="flex items-center gap-2">
              {ing.icon && <img src={ing.icon} alt={ing.name} className="w-5 h-5" />}
              <span>{ing.name}</span>
            </div>
            <input
              type="number"
              value={ingredientPrices[ing.id] ?? ing.defaultPrice}
              onChange={(e) =>
                onPriceChange(ing.id, parseFloat(e.target.value) || 0)
              }
              className="w-20 bg-gray-700 rounded px-2 py-1 text-right"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
