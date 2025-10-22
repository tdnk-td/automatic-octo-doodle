import React, { useMemo, useState, useEffect } from "react";


/**
 * LifeSkillCalculator.tsx
 * Icons defined in code (local or URL)
 * Prices persist via localStorage
 * ROI / Profit UI intact
 */

type Ingredient = {
  id: string;
  name: string;
  defaultPrice: number;
  quantity: number;
  total: number;
  tradeFee: number;
  depositFee: number;
  profit: number;
  gatherCount: number;
  valuePerFocus: number;
  gatheringFocus: number;
  craftingFocus: number;
  icon?: string;
};

type RecipeIngredient = {
  id: string;
  qty: number;
};

type Recipe = {
  id: string;
  name: string;
  skill: string;
  ingredients: RecipeIngredient[];
  output: number;
  sellValue: number;
};

// 🧩 You can freely mix local paths or remote URLs here
const INGREDIENTS: Ingredient[] = [

];

// 🔧 Sample recipes (you’ll expand this later)
const RECIPES: Recipe[] = [
  {
    id: "mystery_metal",
    name: "Mystery Metal",
    skill: "Smelting",
    ingredients: [
      { id: "iron_ore", qty: 8 },
      { id: "coal", qty: 2 },
    ],
    output: 1,
    sellValue: 2000,
  },
  {
    id: "herbal_elixir",
    name: "Herbal Elixir",
    skill: "Alchemy",
    ingredients: [
      { id: "red_herb", qty: 3 },
      { id: "blue_herb", qty: 2 },
      { id: "pure_water", qty: 1 },
    ],
    output: 1,
    sellValue: 500,
  },
];

const LIFESKILLS = [
  "Gemology",
  "Botany",
  "Mineralogy",
  "Smelting",
  "Alchemy",
  "Gemcrafting",
  "Culinary",
  "Artisanry",
  "Weaving",
];

export default function LifeSkillCalculator(): JSX.Element {
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [recipePrices, setRecipePrices] = useState<Record<string, number>>({});
  const [search, setSearch] = useState("");
  const [openSkill, setOpenSkill] = useState<string | null>(null);

  // 🗃 Load from localStorage or defaults
  useEffect(() => {
    const storedPrices = localStorage.getItem("ingredientPrices");
    const storedRecipePrices = localStorage.getItem("recipePrices");

    if (storedPrices)
      setPrices(JSON.parse(storedPrices));
    else
      setPrices(Object.fromEntries(INGREDIENTS.map((i) => [i.id, i.defaultPrice])));

    if (storedRecipePrices)
      setRecipePrices(JSON.parse(storedRecipePrices));
    else
      setRecipePrices(Object.fromEntries(RECIPES.map((r) => [r.id, r.sellValue])));
  }, []);

  // 💾 Save to localStorage
  useEffect(() => {
    localStorage.setItem("ingredientPrices", JSON.stringify(prices));
  }, [prices]);

  useEffect(() => {
    localStorage.setItem("recipePrices", JSON.stringify(recipePrices));
  }, [recipePrices]);

  // 🔍 Group by LifeSkill
  const groupedRecipes = useMemo(() => {
    const map = LIFESKILLS.reduce((acc, skill) => {
      acc[skill] = [] as Recipe[];
      return acc;
    }, {} as Record<string, Recipe[]>);

    for (const r of RECIPES) {
      if (!map[r.skill]) map[r.skill] = [];
      map[r.skill].push(r);
    }
    return map;
  }, []);

  // 🔎 Filter ingredients for master list
  const filteredIngredients = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return INGREDIENTS;
    return INGREDIENTS.filter(
      (ing) => ing.name.toLowerCase().includes(q) || ing.id.toLowerCase().includes(q)
    );
  }, [search]);

  const updatePrice = (id: string, value: number) =>
    setPrices((prev) => ({ ...prev, [id]: Number(value) || 0 }));

  const updateRecipePrice = (id: string, value: number) =>
    setRecipePrices((prev) => ({ ...prev, [id]: Number(value) || 0 }));

  /* -------------------- UI -------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#07111a] to-[#0b0f14] text-slate-200 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold">Life Skill Calculator</h1>
          <p className="text-slate-400 mt-1">Auto-saves market data locally.</p>
        </header>

        <div className="grid md:grid-cols-[2fr_1fr] gap-6">
          {/* ---------- LEFT: Recipes ---------- */}
          <section>
            {LIFESKILLS.map((skill) => {
              const recipes = groupedRecipes[skill] ?? [];
              return (
                <div key={skill} className="mb-8 border-b border-[#14202a] pb-4">
                  <button
                    className="w-full flex items-center justify-between text-left pb-2 hover:text-slate-100 transition"
                    onClick={() =>
                      setOpenSkill(openSkill === skill ? null : skill)
                    }
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-md bg-gradient-to-tr from-[#2a6bff] to-[#9b5de5] flex items-center justify-center font-semibold">
                        {skill.charAt(0)}
                      </div>
                      <div>
                        <div className="text-lg font-semibold">{skill}</div>
                        <div className="text-xs text-slate-400">
                          {recipes.length} recipes
                        </div>
                      </div>
                    </div>
                    <div className="text-slate-400">
                      {openSkill === skill ? "▲" : "▼"}
                    </div>
                  </button>

                  {openSkill === skill && (
                    <div className="mt-4 space-y-4">
                      {recipes.length === 0 ? (
                        <div className="p-4 rounded-lg bg-[#07121a] border border-[#12202a] text-slate-400 italic">
                          No recipes yet.
                        </div>
                      ) : (
                        recipes.map((r) => {
                          const ingDetails = r.ingredients.map((ing) => {
                            const meta = INGREDIENTS.find((x) => x.id === ing.id);
                            const unitPrice =
                              prices[ing.id] ?? meta?.defaultPrice ?? 0;
                            return {
                              ...meta,
                              qty: ing.qty,
                              unitPrice,
                              subtotal: unitPrice * ing.qty,
                            };
                          });

                          const totalCost = ingDetails.reduce(
                            (s, it) => s + (it.subtotal ?? 0),
                            0
                          );
                          const sellValue = recipePrices[r.id] ?? r.sellValue;
                          const revenue = sellValue * r.output;
                          const profit = revenue - totalCost;
                          const roi =
                            totalCost > 0 ? (profit / totalCost) * 100 : 0;

                          return (
                            <article
                              key={r.id}
                              className="p-4 rounded-xl bg-gradient-to-br from-[#07121a] to-[#07121a] border border-[#14202a] hover:shadow-lg transition"
                            >
                              <div className="flex items-start justify-between">
                                <div>
                                  <div className="text-lg font-semibold">
                                    {r.name}
                                  </div>
                                  <div className="text-sm text-slate-400">
                                    Output: {r.output}
                                  </div>
                                </div>

                                <div className="flex flex-col text-right">
                                  <label className="text-xs text-slate-400 mb-1">
                                    Market Price
                                  </label>
                                  <input
                                    type="number"
                                    value={String(sellValue)}
                                    onChange={(e) =>
                                      updateRecipePrice(
                                        r.id,
                                        Number(e.target.value)
                                      )
                                    }
                                    className="w-28 bg-[#0b1420] border border-[#1f2937] rounded-md p-2 text-right"
                                  />
                                </div>
                              </div>

                              {/* Ingredient List */}
                              <div className="mt-4 space-y-3">
                                {ingDetails.map((it) => (
                                  <div
                                    key={it.id}
                                    className="flex items-center justify-between p-3 rounded-lg bg-[#0b1620] border border-[#12202a]"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 rounded-md bg-[#0f1725] flex items-center justify-center overflow-hidden">
                                        {it.icon ? (
                                          <img
                                            src={it.icon}
                                            alt={it.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) =>
                                              (e.currentTarget.style.display =
                                                "none")
                                            }
                                          />
                                        ) : (
                                          <span className="text-xl">🔸</span>
                                        )}
                                      </div>
                                      <div>
                                        <div className="font-medium">
                                          {it.name}
                                        </div>
                                        <div className="text-xs text-slate-400">
                                          Needed: {it.qty}
                                        </div>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                      <div className="text-sm text-slate-400">
                                        Price
                                      </div>
                                      <input
                                        type="number"
                                        value={String(it.unitPrice)}
                                        onChange={(e) =>
                                          updatePrice(
                                            it.id ?? "",
                                            Number(e.target.value)
                                          )
                                        }
                                        className="w-24 bg-[#0b1420] border border-[#1f2937] rounded-md p-2 text-right"
                                      />
                                      <div className="text-sm text-slate-400">
                                        = {it.subtotal.toFixed(0)}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* Summary */}
                              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="p-3 rounded-lg bg-[#07121a] border border-[#14202a] text-center">
                                  <div className="text-xs text-slate-400">
                                    Total Cost
                                  </div>
                                  <div className="text-xl font-semibold">
                                    {totalCost.toFixed(0)}
                                  </div>
                                </div>
                                <div className="p-3 rounded-lg bg-[#07121a] border border-[#14202a] text-center">
                                  <div className="text-xs text-slate-400">
                                    Expected Revenue
                                  </div>
                                  <div className="text-xl font-semibold">
                                    {revenue.toFixed(0)}
                                  </div>
                                </div>
                                <div
                                  className={`p-3 rounded-lg text-center border ${
                                    profit >= 0
                                      ? "bg-[#031617] border-[#0f8f7a]"
                                      : "bg-[#2a0b0b] border-[#7b1f1f]"
                                  }`}
                                >
                                  <div className="text-xs text-slate-400">
                                    Profit
                                  </div>
                                  <div
                                    className={`text-xl font-semibold ${
                                      profit >= 0
                                        ? "text-green-400"
                                        : "text-red-400"
                                    }`}
                                  >
                                    {profit.toFixed(0)}
                                  </div>
                                  <div className="text-xs text-slate-400 mt-1">
                                    ROI: {roi.toFixed(2)}%
                                  </div>
                                </div>
                              </div>
                            </article>
                          );
                        })
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </section>

          {/* ---------- RIGHT: Ingredient Master ---------- */}
          <aside>
            <div className="bg-[#0a121c] rounded-xl border border-[#12202a] p-4 sticky top-6">
              <h2 className="text-lg font-semibold mb-3">
                🌿 Ingredient Master
              </h2>
              <input
                type="text"
                placeholder="Search ingredient..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full mb-3 p-2 bg-[#0f1725] border border-[#1f2937] rounded-md text-slate-300"
              />

              <div className="grid gap-2 max-h-[60vh] overflow-y-auto pr-1">
                {filteredIngredients.map((ing) => (
                  <div
                    key={ing.id}
                    className="flex items-center justify-between p-2 rounded-md hover:bg-[#071520] transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-[#0f1725] flex items-center justify-center overflow-hidden">
                        {ing.icon ? (
                          <img
                            src={ing.icon}
                            alt={ing.name}
                            className="w-full h-full object-cover"
                            onError={(e) =>
                              (e.currentTarget.style.display = "none")
                            }
                          />
                        ) : (
                          <span>🔸</span>
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{ing.name}</div>
                        <div className="text-xs text-slate-400">
                          Default: {ing.defaultPrice}
                        </div>
                      </div>
                    </div>
                    <input
                      type="number"
                      value={String(prices[ing.id] ?? ing.defaultPrice)}
                      onChange={(e) =>
                        updatePrice(ing.id, Number(e.target.value))
                      }
                      className="w-20 bg-[#07121a] border border-[#1f2937] rounded-md p-1 text-right"
                    />
                  </div>
                ))}
                {filteredIngredients.length === 0 && (
                  <div className="text-slate-400 italic p-2">
                    No ingredients found.
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
