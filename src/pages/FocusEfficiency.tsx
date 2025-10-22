import React, { useState } from "react";

type Gatherable = {
  id: string;
  name: string;
  focusCost: 20;
  marketValue: number;
  procAmount: number;
};

const GATHERABLES: Gatherable[] = [
  { id: "baru_ore", name: "Baru Ore", focusCost: 20, marketValue: 180, procAmount: 10 },
  { id: "azte_ore", name: "Blue Herb", focusCost: 20, marketValue: 180, procAmount: 10 },
  { id: "luna_ore", name: "Rare Crystal", focusCost: 20, marketValue: 180, procAmount: 10 },
  { id: "starlight_ruby1", name: "Starlight Ruby Lv.1", focusCost: 20, marketValue: 144, procAmount: 9 },
  { id: "starlight_ruby2", name: "Starlight Ruby Lv.2", focusCost: 20, marketValue: 218, procAmount: 7 },

];

export default function FocusEfficiency(): JSX.Element {
  const [gatherables, setGatherables] = useState(GATHERABLES);

  const handleValueChange = (id: string, key: "focusCost" | "marketValue", val: number) => {
    setGatherables((prev) =>
      prev.map((g) => (g.id === id ? { ...g, [key]: val } : g))
    );
  };

  const sorted = [...gatherables].sort((a, b) => (b.marketValue / b.focusCost) - (a.marketValue / a.focusCost));

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#07111a] to-[#0b0f14] text-slate-200 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">⚡ Focus Efficiency per Gather</h1>

        <div className="grid gap-3">
          {sorted.map((g) => {
            const efficiency = (g.marketValue * g.procAmount) / g.focusCost;
            const color =
              efficiency > 20 ? "text-green-400" :
              efficiency > 10 ? "text-yellow-400" : "text-red-400";
            return (
              <div key={g.id} className="p-4 rounded-xl bg-[#0a121c] border border-[#1a2530] flex justify-between items-center">
                <div>
                  <div className="font-medium text-lg">{g.name}</div>
                  <div className="text-sm text-slate-400">
                    Focus: {g.focusCost} | Proc: {g.procAmount} | Value: {g.marketValue}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={g.focusCost}
                    onChange={(e) => handleValueChange(g.id, "focusCost", +e.target.value)}
                    className="w-20 bg-[#07121a] border border-[#1f2937] rounded-md p-1 text-right"
                  />
                  <input
                    type="number"
                    value={g.marketValue}
                    onChange={(e) => handleValueChange(g.id, "marketValue", +e.target.value)}
                    className="w-20 bg-[#07121a] border border-[#1f2937] rounded-md p-1 text-right"
                  />
                  <div className={`font-semibold ${color}`}>
                    {efficiency.toFixed(2)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
