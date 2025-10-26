import React, { useEffect, useRef, useState } from "react";
import { INGREDIENTS } from "@/data/ingredients";

type Gatherable = {
  id: string;
  name: string;
  focusCost: number;
  marketValue: number;
  procAmount: number;
  icon?: string;
};

const STORAGE_KEY = "focusEfficiencyData";

export default function FocusEfficiency(): JSX.Element {
  const [gatherablesMap, setGatherablesMap] = useState<Record<string, Gatherable>>({});
  const [savedIndicator, setSavedIndicator] = useState(false);
  const [showLowEfficiency, setShowLowEfficiency] = useState(true);
  const saveTimer = useRef<NodeJS.Timeout | null>(null);

  // Build base map once
  useEffect(() => {
    const base: Record<string, Gatherable> = {};
    for (const ing of INGREDIENTS) {
      if (!ing.defaultPrice || ing.defaultPrice <= 0) continue;
      base[ing.id] = {
        id: ing.id,
        name: ing.name,
        focusCost: ing.gatheringFocus ?? 20,
        marketValue: ing.defaultPrice,
        procAmount: ing.gatherCount ?? 10,
        icon: ing.icon,
      };
    }

    const savedRaw = localStorage.getItem(STORAGE_KEY);
    if (savedRaw) {
      try {
        const saved = JSON.parse(savedRaw);
        for (const id in saved) {
          if (base[id]) {
            base[id].focusCost = saved[id].focusCost ?? base[id].focusCost;
            base[id].marketValue = saved[id].marketValue ?? base[id].marketValue;
          }
        }
      } catch {
        console.warn("⚠️ Failed to parse saved focus data, using defaults");
      }
    }

    setGatherablesMap(base);
  }, []);

  // Debounced persistence
  useEffect(() => {
    if (!Object.keys(gatherablesMap).length) return;

    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      const saveObj: Record<string, { focusCost: number; marketValue: number }> = {};
      for (const [id, g] of Object.entries(gatherablesMap)) {
        saveObj[id] = { focusCost: g.focusCost, marketValue: g.marketValue };
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saveObj));
      setSavedIndicator(true);
      setTimeout(() => setSavedIndicator(false), 1000);
    }, 300);
  }, [gatherablesMap]);

  // Update handlers
  const handleValueChange = (
    id: string,
    key: "focusCost" | "marketValue",
    val: number
  ) => {
    setGatherablesMap((prev) => ({
      ...prev,
      [id]: { ...prev[id], [key]: val },
    }));
  };

const handleReset = () => {
  localStorage.removeItem(STORAGE_KEY);
  setGatherablesMap((prev) => {
    const resetMap: typeof prev = {};
    for (const ing of INGREDIENTS) {
      if (!ing.defaultPrice || ing.defaultPrice <= 0) continue;
      resetMap[ing.id] = {
        id: ing.id,
        name: ing.name,
        focusCost: ing.gatheringFocus ?? 20,
        marketValue: ing.defaultPrice,
        procAmount: ing.gatherCount ?? 10,
        icon: ing.icon,
      };
    }
    return resetMap;
  });
};


  // Derived sorted list
  const gatherables = Object.values(gatherablesMap);
  const sorted = gatherables
    .map((g) => ({
      ...g,
      efficiency: (g.marketValue * g.procAmount) / (g.focusCost || 1),
    }))
    .filter((g) => (showLowEfficiency ? true : g.efficiency > 10))
    .sort((a, b) => b.efficiency - a.efficiency);

  const avgEff =
    sorted.reduce((sum, g) => sum + g.efficiency, 0) / (sorted.length || 1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#07111a] to-[#0b0f14] text-slate-200 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">⚡ Focus Efficiency per Gather</h1>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={showLowEfficiency}
                onChange={(e) => setShowLowEfficiency(e.target.checked)}
              />
              Show All
            </label>
            <button
              onClick={handleReset}
              className="px-3 py-1.5 bg-[#122230] border border-[#1f3548] text-sm rounded-md hover:bg-[#1a2e40] transition-colors"
            >
              Erase Data
            </button>
          </div>
        </div>

        {/* 💾 Saved indicator */}
        {savedIndicator && (
          <div className="text-green-400 text-sm mb-2 text-right animate-pulse">
            Saved ✔
          </div>
        )}

        <div className="grid gap-3">
          {sorted.map((g) => {
            const roiPercent =
              avgEff > 0 ? ((g.efficiency - avgEff) / avgEff) * 100 : 0;
            const color =
              g.efficiency > 20
                ? "text-green-400"
                : g.efficiency > 10
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
                      {g.efficiency.toFixed(2)}
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

          {sorted.length === 0 && (
            <div className="text-slate-400 text-center py-10">
              No valid ingredients with prices found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
