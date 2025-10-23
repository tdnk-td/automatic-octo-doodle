import React, { useEffect, useState } from "react";
import { RECIPES } from "@/data/recipes";
import { INGREDIENTS, INGREDIENT_MAP, Ingredient } from "@/data/ingredients";
import RecipeCard from "@/components/RecipeCard";
import IngredientMaster from "@/components/IngredientMaster";

// Group recipes by their life skill for easier browsing
const groupRecipesBySkill = () => {
  const grouped: Record<string, typeof RECIPES> = {};
  RECIPES.forEach((r) => {
    if (!grouped[r.skill]) grouped[r.skill] = [];
    grouped[r.skill].push(r);
  });
  return grouped;
};

const LifeSkillCalculator: React.FC = () => {
  const [ingredients, setIngredients] = useState<Record<string, Ingredient>>(
    INGREDIENT_MAP
  );
  const [selectedRecipe, setSelectedRecipe] = useState(RECIPES[0]);
  const [groupedRecipes, setGroupedRecipes] = useState(groupRecipesBySkill());

  // 🧠 Load stored prices (persist across sessions)
  useEffect(() => {
    const savedIngredients = localStorage.getItem("ingredients");
    const savedRecipes = localStorage.getItem("recipes");
    if (savedIngredients) {
      setIngredients(JSON.parse(savedIngredients));
    }
    if (savedRecipes) {
      const parsed = JSON.parse(savedRecipes);
      // merge updated sell values with existing recipe data
      RECIPES.forEach((r) => {
        if (parsed[r.id]) r.sellValue = parsed[r.id].sellValue;
      });
      setGroupedRecipes(groupRecipesBySkill());
    }
  }, []);

  // 📝 Save ingredients when they change
  useEffect(() => {
    localStorage.setItem("ingredients", JSON.stringify(ingredients));
  }, [ingredients]);

  // 📝 Save recipes when prices change
  useEffect(() => {
    const saveObj = Object.fromEntries(
      RECIPES.map((r) => [r.id, { sellValue: r.sellValue }])
    );
    localStorage.setItem("recipes", JSON.stringify(saveObj));
  }, [selectedRecipe]);

  // 🔧 Handlers
  const handleIngredientPriceChange = (id: string, newPrice: number) => {
    setIngredients((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        defaultPrice: newPrice,
      },
    }));
  };

  const handleRecipeSellValueChange = (id: string, newValue: number) => {
    const recipe = RECIPES.find((r) => r.id === id);
    if (recipe) {
      recipe.sellValue = newValue;
      setSelectedRecipe({ ...recipe });
    }
  };

  return (
    <div className="p-6 text-white min-h-screen bg-[#0B0E13]">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Life Skill Calculator
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        {/* 🧩 Recipe Section */}
        <div>
          {/* Life Skill Tabs */}
          <div className="flex flex-wrap gap-3 mb-4">
            {Object.keys(groupedRecipes).map((skill) => (
              <button
                key={skill}
                onClick={() => setSelectedRecipe(groupedRecipes[skill][0])}
                className={`px-3 py-1 rounded-lg border text-sm font-medium transition-colors ${
                  groupedRecipes[skill].some((r) => r.id === selectedRecipe?.id)
                    ? "bg-blue-600 border-blue-700"
                    : "bg-[#15181E] border-[#232730] hover:bg-[#1A1E26]"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>

          {/* Recipe Selector */}
          <div className="mb-4">
            <label className="block text-sm mb-1 text-gray-400">
              Select Recipe
            </label>
            <select
              className="w-full bg-[#1A1D23] border border-[#2A2E36] text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              value={selectedRecipe.id}
              onChange={(e) => {
                const recipe = RECIPES.find((r) => r.id === e.target.value);
                if (recipe) setSelectedRecipe(recipe);
              }}
            >
              {Object.entries(groupedRecipes).map(([skill, recipes]) => (
                <optgroup key={skill} label={skill}>
                  {recipes.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Recipe Card */}
          {selectedRecipe && (
            <RecipeCard
              recipe={selectedRecipe}
              ingredients={ingredients}
              onIngredientPriceChange={handleIngredientPriceChange}
              onRecipeSellValueChange={handleRecipeSellValueChange}
            />
          )}
        </div>

        {/* 📋 Ingredient Master Panel */}
        <IngredientMaster
          ingredients={Object.values(ingredients)}
          onPriceChange={handleIngredientPriceChange}
        />
      </div>
    </div>
  );
};

export default LifeSkillCalculator;
