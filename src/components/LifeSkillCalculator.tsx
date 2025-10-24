import React, { useEffect, useState } from "react";
import { RECIPES } from "@/data/recipes";
import { INGREDIENTS, INGREDIENT_MAP, Ingredient } from "@/data/ingredients";
import RecipeCard from "@/components/RecipeCard";
import IngredientMaster from "@/components/IngredientMaster";

const LifeSkillCalculator: React.FC = () => {
  const [ingredients, setIngredients] = useState<Record<string, Ingredient>>(INGREDIENT_MAP);
  const [selectedSkill, setSelectedSkill] = useState<string>("All");

  // Only valid skills
  const validSkills = ["Smelting", "Gemcrafting", "Weaving"];

  // Group by skill
  const groupedRecipes = RECIPES.reduce((acc, r) => {
    if (validSkills.includes(r.skill)) {
      if (!acc[r.skill]) acc[r.skill] = [];
      acc[r.skill].push(r);
    }
    return acc;
  }, {} as Record<string, typeof RECIPES>);

  // 🧠 Load from localStorage
  useEffect(() => {
    const savedIngredients = localStorage.getItem("ingredients");
    const savedRecipes = localStorage.getItem("recipes");

    if (savedIngredients) setIngredients(JSON.parse(savedIngredients));
    if (savedRecipes) {
      const parsed = JSON.parse(savedRecipes);
      RECIPES.forEach((r) => {
        if (parsed[r.id]) r.sellValue = parsed[r.id].sellValue;
      });
    }
  }, []);

  // 💾 Save to localStorage
  useEffect(() => {
    localStorage.setItem("ingredients", JSON.stringify(ingredients));
  }, [ingredients]);

  useEffect(() => {
    const saveObj = Object.fromEntries(
      RECIPES.map((r) => [r.id, { sellValue: r.sellValue }])
    );
    localStorage.setItem("recipes", JSON.stringify(saveObj));
  }, [ingredients]);

  // Handlers
  const handleIngredientPriceChange = (id: string, newPrice: number) => {
    setIngredients((prev) => ({
      ...prev,
      [id]: { ...prev[id], defaultPrice: newPrice },
    }));
  };

  const handleRecipeSellValueChange = (id: string, newValue: number) => {
    const recipe = RECIPES.find((r) => r.id === id);
    if (recipe) recipe.sellValue = newValue;
  };

  // Filtered recipes
  const filteredRecipes =
    selectedSkill === "All"
      ? RECIPES.filter((r) => validSkills.includes(r.skill))
      : RECIPES.filter((r) => r.skill === selectedSkill);

  return (
    <div className="p-6 text-white min-h-screen bg-[#0B0E13]">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Life Skill Calculator
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        {/* 🧩 Recipe Section */}
        <div>
          {/* Life Skill Filter Bar */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {["All", ...validSkills].map((skill) => (
              <button
                key={skill}
                onClick={() => setSelectedSkill(skill)}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm tracking-wide border backdrop-blur-sm transition-all duration-200 transform
                  ${
                    selectedSkill === skill
                      ? "bg-blue-600/30 border-blue-400 text-blue-200 shadow-[0_0_10px_rgba(37,99,235,0.4)] scale-105"
                      : "bg-[#15181E]/60 border-[#232730] text-gray-300 hover:text-blue-200 hover:border-blue-500 hover:bg-[#1B1F26]/80"
                  }`}
              >
                {skill}
              </button>
            ))}
          </div>

          {/* Recipe Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                ingredients={ingredients}
                onIngredientPriceChange={handleIngredientPriceChange}
                onRecipeSellValueChange={handleRecipeSellValueChange}
              />
            ))}

            {filteredRecipes.length === 0 && (
              <p className="text-gray-400 text-center py-10">
                No recipes found for this lifeskill.
              </p>
            )}
          </div>
        </div>

        {/* 📋 Ingredient Master Sidebar */}
        <IngredientMaster
          ingredients={Object.values(ingredients)}
          onPriceChange={handleIngredientPriceChange}
        />
      </div>
    </div>
  );
};

export default LifeSkillCalculator;
