import React, { useState, useEffect } from "react";
import { INGREDIENTS } from "@/data/ingredients";

type Gatherable = {
  id: string;
  name: string;
  focusCost: number;
  marketValue: number;
  procAmount: number;
  icon?: string;
};

export default function FocusEfficiency(): JSX.Element {
  const [gatherables, setGatherables] = useState<Gatherable[]>([]);

  // Helper to build base gatherables from ingredients
  const loadFromIngredients = (): Gatherable[] =>
    INGREDIENTS.filter((ing) => ing.defaultPrice && ing.defaultPrice > 0).map(
      (ing) => ({
        id: ing.id,
        name: ing.name,
        focusCost: ing.gatheringFocus ?? 20,
        marketValue: ing.defaultPrice,
        procAmount: ing.gatherCount ?? 10,
        icon: ing.icon,
      })
    );

  // 🧠 Load data on mount
  useEffect(() => {
    const base = loadFromIngredients();
    const saved = localStorage.getItem("focusEfficiencyData");

    if (saved) {
      const parsed = JSON.parse(saved);
      const merged = base.map((g) => ({
        ...g,
        ...(parsed[g.id] || {}),
      }));
      setGatherables(merged);
    } else {
      setGatherables(base);
    }
  }, []);

  // 💾 Save data when changed
  useEffect(() => {
    if (gatherables.length > 0) {
      const saveObj = Object.fromEntries(
        gatherables.map((g) => [
          g.id,
          { focusCost: g.focusCost, marketValue: g.marketValue },
        ])
      );
      localStorage.setItem("focusEfficiencyData", JSON.stringify(saveObj));
    }
  }, [gatherables]);

  const handleValueChange = (
    id: string,
    key: "focusCost" | "marketValue",
    val: number
  ) => {
    setGatherables((prev) => {
      const updated = prev.map((g) =>
        g.id === id ? { ...g, [key]: val } : g
      );
      return sortGatherables(updated);
    });
  };

  const handleReset = () => {
    const base = loadFromIngredients();
    setGatherables(sortGatherables(base));
    localStorage.removeItem("focusEfficiencyData");
  };

  const sortGatherables = (list: Gatherable[]) => {
    return [...list].sort(
      (a, b) =>
        (b.marketValue * b.procAmount) / b.focusCost -
        (a.marketValue * a.procAmount) / a.focusCost
    );
  };

  // Pre-sort initially
  useEffect(() => {
    if (gatherables.length > 0) {
      setGatherables((prev) => sortGatherables(prev));
    }
  }, []);

  // Calculate average efficiency (for ROI %)
  const avgEfficiency =
    gatherables.length > 0
      ? gatherables.reduce(
          (sum, g) => sum + (g.marketValue * g.procAmount) / g.focusCost,
          0
        ) / gatherables.length
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#07111a] to-[#0b0f14] text-slate-200 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">
            ⚡ Focus Efficiency per Gather
          </h1>
          <button
            onClick={handleReset}
            className="px-3 py-1.5 bg-[#122230] border border-[#1f3548] text-sm rounded-md hover:bg-[#1a2e40] transition-colors"
          >
            Reset Data
          </button>
        </div>

        <div className="grid gap-3">
          {gatherables.map((g) => {
            const efficiency = (g.marketValue * g.procAmount) / g.focusCost;
            const roiPercent =
              avgEfficiency > 0
                ? ((efficiency - avgEfficiency) / avgEfficiency) * 100
                : 0;
            const color =
              efficiency > 20
                ? "text-green-400"
                : efficiency > 10
                ? "text-yellow-400"
                : "text-red-400";
            const roiColor =
              roiPercent > 0
                ? "text-green-400"
                : roiPercent < 0
                ? "text-red-400"
                : "text-slate-400";

            return (
              <div
                key={g.id}
                className="p-4 rounded-xl bg-[#0a121c] border border-[#1a2530] flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  {g.icon && (
                    <img
                      src={g.icon}
                      alt={g.name}
                      className="w-8 h-8 rounded-md object-cover"
                    />
                  )}
                  <div>
                    <div className="font-medium text-lg">{g.name}</div>
                    <div className="text-sm text-slate-400">
                      Focus: {g.focusCost} | Proc: {g.procAmount} | Value:{" "}
                      {g.marketValue}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-right">
                  <input
                    type="number"
                    value={g.focusCost}
                    onChange={(e) =>
                      handleValueChange(g.id, "focusCost", +e.target.value)
                    }
                    className="w-20 bg-[#07121a] border border-[#1f2937] rounded-md p-1 text-right"
                  />
                  <input
                    type="number"
                    value={g.marketValue}
                    onChange={(e) =>
                      handleValueChange(g.id, "marketValue", +e.target.value)
                    }
                    className="w-20 bg-[#07121a] border border-[#1f2937] rounded-md p-1 text-right"
                  />
                  <div>
                    <div className={`font-semibold ${color}`}>
                      {efficiency.toFixed(2)}
                    </div>
                    <div className={`text-xs ${roiColor}`}>
                      {roiPercent >= 0 ? "+" : ""}
                      {roiPercent.toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {gatherables.length === 0 && (
            <div className="text-slate-400 text-center py-10">
              No valid ingredients with prices found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
