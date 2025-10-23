import React from "react";
import { Recipe } from "@/data/recipes";
import { Ingredient } from "@/data/ingredients";

interface RecipeCardProps {
  recipe: Recipe;
  ingredients: Record<string, Ingredient>;
  onIngredientPriceChange: (id: string, newPrice: number) => void;
  onRecipeSellValueChange: (id: string, newValue: number) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  ingredients,
  onIngredientPriceChange,
  onRecipeSellValueChange,
}) => {
  if (!recipe) return null;

  const totalCost = recipe.ingredients.reduce((sum, { id, qty }) => {
    const ing = ingredients[id];
    return sum + (ing?.defaultPrice || 0) * qty;
  }, 0);

  const profit = recipe.sellValue - totalCost;
  const roi = totalCost > 0 ? (profit / totalCost) * 100 : 0;

  return (
    <div className="bg-[#0E1117] text-white p-6 rounded-2xl shadow-md border border-[#1B1F27] w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {recipe.icon && (
            <img
              src={recipe.icon}
              alt={recipe.name}
              className="w-10 h-10 rounded-xl object-cover"
            />
          )}
          <div>
            <h3 className="text-lg font-semibold">{recipe.name}</h3>
            <p className="text-sm text-gray-400">{recipe.skill}</p>
          </div>
        </div>
        <div className="text-right">
          <label className="text-xs text-gray-400">Market Price:</label>
          <input
            type="number"
            className="ml-2 w-24 bg-[#1A1D23] text-sm text-right px-2 py-1 rounded-md border border-[#2A2E36] focus:ring-1 focus:ring-blue-600 focus:outline-none"
            value={recipe.sellValue}
            onChange={(e) => onRecipeSellValueChange(recipe.id, parseFloat(e.target.value))}
          />
        </div>
      </div>

      {/* Ingredients */}
      <div className="space-y-3 mb-5">
        {recipe.ingredients.map(({ id, qty }) => {
          const ing = ingredients[id];
          if (!ing) return null;

          return (
            <div
              key={id}
              className="flex items-center justify-between bg-[#15181E] hover:bg-[#1A1E26] transition-colors rounded-xl p-3 border border-[#232730]"
            >
              <div className="flex items-center space-x-3">
                {ing.icon && (
                  <img
                    src={ing.icon}
                    alt={ing.name}
                    className="w-7 h-7 rounded-md object-cover"
                  />
                )}
                <div>
                  <p className="text-sm font-medium">{ing.name}</p>
                  <p className="text-xs text-gray-400">Needed: {qty}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={ing.defaultPrice}
                  onChange={(e) =>
                    onIngredientPriceChange(id, parseFloat(e.target.value))
                  }
                  className="w-20 bg-[#1A1D23] text-right text-sm px-2 py-1 rounded-md border border-[#2A2E36] focus:ring-1 focus:ring-blue-600 focus:outline-none"
                />
                <span className="text-sm text-gray-400">
                  = {(ing.defaultPrice * qty).toFixed(0)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[#15181E] p-3 rounded-xl border border-[#232730] text-center">
          <p className="text-xs text-gray-400">Total Cost</p>
          <p className="text-lg font-semibold">{totalCost.toFixed(0)}</p>
        </div>
        <div className="bg-[#15181E] p-3 rounded-xl border border-[#232730] text-center">
          <p className="text-xs text-gray-400">Expected Revenue</p>
          <p className="text-lg font-semibold">{recipe.sellValue.toFixed(0)}</p>
        </div>
        <div
          className={`p-3 rounded-xl border text-center ${
            profit >= 0
              ? "bg-[#102618] border-green-700"
              : "bg-[#261010] border-red-700"
          }`}
        >
          <p className="text-xs text-gray-400">Profit</p>
          <p className="text-lg font-semibold">
            {profit.toFixed(0)}{" "}
            <span className="text-sm text-gray-400">({roi.toFixed(2)}%)</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
