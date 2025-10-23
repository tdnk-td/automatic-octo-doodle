import { useEffect, useMemo, useState } from "react";
import { RECIPES } from "@/data/recipes";
import { INGREDIENTS, INGREDIENT_MAP } from "@/data/ingredients";
import { MetricCard } from "@/components/MetricCard";
import { IngredientMaster } from "@/components/IngredientMaster";

export default function LifeSkillCalculator() {
  const [selectedSkill, setSelectedSkill] = useState("All");
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>("");
  const [ingredientPrices, setIngredientPrices] = useState<Record<string, number>>({});
  const [recipeSellValue, setRecipeSellValue] = useState<number>(0);

  // --- Load saved prices ---
  useEffect(() => {
    const saved = localStorage.getItem("ingredientPrices");
    if (saved) setIngredientPrices(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("ingredientPrices", JSON.stringify(ingredientPrices));
  }, [ingredientPrices]);

  // --- Distinct skills ---
  const skills = useMemo(() => {
    const set = new Set(RECIPES.map((r) => r.skill));
    return ["All", ...Array.from(set)];
  }, []);

  // --- Filter recipes ---
  const filteredRecipes = useMemo(() => {
    return selectedSkill === "All"
      ? RECIPES
      : RECIPES.filter((r) => r.skill === selectedSkill);
  }, [selectedSkill]);

  // --- Current recipe ---
  const selectedRecipe = useMemo(
    () => filteredRecipes.find((r) => r.id === selectedRecipeId),
    [filteredRecipes, selectedRecipeId]
  );

  // --- Ingredient breakdown ---
  const ingredients = useMemo(() => {
    if (!selectedRecipe) return [];
    return selectedRecipe.ingredients.map((ing) => {
      const ingredient = INGREDIENT_MAP[ing.id];
      const price = ingredientPrices[ing.id] ?? ingredient?.defaultPrice ?? 0;
      return {
        ...ingredient,
        qty: ing.qty,
        price,
        total: price * ing.qty,
      };
    });
  }, [selectedRecipe, ingredientPrices]);

  const totalCost = ingredients.reduce((sum, i) => sum + i.total, 0);
  const sellValue =
    recipeSellValue || (selectedRecipe?.sellValue ? selectedRecipe.sellValue : 0);
  const profit = sellValue - totalCost;
  const roi = totalCost > 0 ? (profit / totalCost) * 100 : 0;

  const handleIngredientPriceChange = (id: string, newPrice: number) => {
    setIngredientPrices((prev) => ({ ...prev, [id]: newPrice }));
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-slate-100 flex flex-col md:flex-row p-6 gap-8">
      {/* LEFT PANEL — MAIN CALCULATOR */}
      <div className="flex-1 space-y-6">
        <h1 className="text-3xl font-bold text-center mb-2">Life Skill Calculator</h1>

        {/* Skill Selector */}
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {skills.map((skill) => (
            <button
              key={skill}
              onClick={() => {
                setSelectedSkill(skill);
                setSelectedRecipeId("");
              }}
              className={`px-3 py-1 rounded-xl text-sm transition-colors ${
                selectedSkill === skill
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {skill}
            </button>
          ))}
        </div>

        {/* Recipe Selector */}
        <div className="bg-slate-900 p-4 rounded-xl shadow-lg space-y-3">
          <label className="text-sm text-slate-400 block">Select Recipe</label>
          <select
            className="w-full bg-slate-800 text-slate-100 rounded-lg px-3 py-2"
            value={selectedRecipeId}
            onChange={(e) => {
              const recipe = filteredRecipes.find((r) => r.id === e.target.value);
              setSelectedRecipeId(e.target.value);
              setRecipeSellValue(recipe?.sellValue ?? 0);
            }}
          >
            <option value="">-- Choose a Recipe --</option>
            {filteredRecipes.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        {/* Recipe Card */}
        {selectedRecipe && (
          <div className="bg-slate-900 p-6 rounded-2xl shadow-lg space-y-4 border border-slate-700">
            <div className="flex items-center gap-3">
              {selectedRecipe.icon && (
                <img
                  src={selectedRecipe.icon}
                  alt={selectedRecipe.name}
                  className="w-15 h-15 rounded-xl"
                />
              )}
              <div>
                <h2 className="text-xl font-semibold">{selectedRecipe.name}</h2>
                <p className="text-sm text-slate-400">{selectedRecipe.skill}</p>
              </div>
            </div>

            {/* Editable Market Price */}
            <div className="flex items-center gap-3">
              <label className="text-slate-300 text-sm">Market Sell Value:</label>
              <input
                type="number"
                value={recipeSellValue}
                onChange={(e) => setRecipeSellValue(parseFloat(e.target.value) || 0)}
                className="w-32 bg-slate-800 rounded px-2 py-1 text-right"
              />
            </div>

            {/* Ingredients */}
            <div className="space-y-2">
              {ingredients.map((ing) => (
                <div
                  key={ing.id}
                  className="flex justify-between items-center bg-slate-800 p-2 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    {ing.icon && (
                      <img
                        src={ing.icon}
                        alt={ing.name}
                        className="w-6 h-6 rounded-md"
                      />
                    )}
                    <span>{ing.name}</span>
                    <span className="text-xs text-slate-400">x{ing.qty}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={ing.price}
                      onChange={(e) =>
                        handleIngredientPriceChange(
                          ing.id,
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="w-20 bg-slate-700 rounded px-2 py-1 text-right"
                    />
                    <span className="text-slate-400">= {ing.total.toFixed(0)}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* ROI / PROFIT Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              <MetricCard label="Total Cost" value={totalCost} />
              <MetricCard label="Expected Revenue" value={sellValue} />
              <MetricCard label="Profit" value={profit} roi={roi} />
            </div>
          </div>
        )}
      </div>

      {/* RIGHT PANEL — INGREDIENT MASTER */}
      <div className="md:w-80">
        <IngredientMaster
          ingredients={INGREDIENTS}
          ingredientPrices={ingredientPrices}
          onPriceChange={handleIngredientPriceChange}
        />
      </div>
    </div>
  );
}
