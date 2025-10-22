import { INGREDIENTS, Ingredient } from './ingredients';

export interface RecipeIngredient {
  id: string;
  name: string;
  qty: number;
  unitPrice: number;
  cost: number;
}

export interface Recipe {
  id: string;
  name: string;
  skill: string;
  sellValue: number;
  output: number;
  craftingFocus: number;
  totalIngredientCost: number;
  focusEfficiency: number;
  ingredients: RecipeIngredient[];
  icon?: string;
}


// helper to get ingredient by id
function getIngredient(id: string): Ingredient {
  const ingredient = INGREDIENTS.find(i => i.id === id);
  if (!ingredient) throw new Error(`Ingredient not found: ${id}`);
  return ingredient;
}

// helper to calculate ingredient cost
function calcCost(qty: number, price: number): number {
  return qty * price;
}

export const RECIPES = [
  {
    id: "mystery_medal",
    name: "Mystery Medal",
    skill: "Unknown",
    sellValue: 2083.0,
    output: 1.0,
    craftingFocus: 10,
    ingredients: [
      { id: "baru_ore", qty: 3 },
      { id: "healing_herb", qty: 3 },
    ].map(i => {
      const ing = getIngredient(i.id);
      return {
        ...i,
        name: ing.name,
        unitPrice: ing.defaultPrice,
        cost: calcCost(i.qty, ing.defaultPrice)
      };
    }),
    totalIngredientCost: 0,
    focusEfficiency: 0
  },
  {
    "id": "baru_ore",
    "name": "Baru Ore",
    "skill": "Smelting",
    "sellValue": 180.0,
    "output": 8.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 18.0
  },
  {
    "id": "burning_powder",
    "name": "Burning Powder",
    "skill": "Unknown",
    "sellValue": 138.0,
    "output": 1.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 13.8
  },
  {
    "id": "nan",
    "name": "nan",
    "skill": "Unknown",
    "sellValue": NaN,
    "output": NaN,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": NaN
  },
  {
    "id": "fine_forgestone",
    "name": "Fine Forgestone",
    "skill": "Smelting",
    "sellValue": 2083.0,
    "output": 1.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 208.3
  },
  {
    "id": "luna_ore",
    "name": "Luna Ore",
    "skill": "Smelting",
    "sellValue": 180.0,
    "output": 8.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 18.0
  },
  {
    "id": "burning_powder",
    "name": "Burning Powder",
    "skill": "Unknown",
    "sellValue": 138.0,
    "output": 1.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 13.8
  },
  {
    "id": "nan",
    "name": "nan",
    "skill": "Unknown",
    "sellValue": NaN,
    "output": NaN,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": NaN
  },
  {
    "id": "radiant_stone",
    "name": "Radiant Stone",
    "skill": "Gemcrafting",
    "sellValue": 2083.0,
    "output": 1.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 208.3
  },
  {
    "id": "azte_ore",
    "name": "Azte Ore",
    "skill": "Smelting",
    "sellValue": 180.0,
    "output": 8.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 18.0
  },
  {
    "id": "burning_powder",
    "name": "Burning Powder",
    "skill": "Unknown",
    "sellValue": 138.0,
    "output": 1.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 13.8
  },
  {
    "id": "nan",
    "name": "nan",
    "skill": "Unknown",
    "sellValue": NaN,
    "output": NaN,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": NaN
  },
  {
    "id": "buri_mech_shard",
    "name": "Buri Mech Shard",
    "skill": "Gemology",
    "sellValue": 6000.0,
    "output": 1.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 600.0
  },
  {
    "id": "stokes_rich_ore",
    "name": "Stokes Rich Ore",
    "skill": "Smelting",
    "sellValue": 484.0,
    "output": 9.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 48.4
  },
  {
    "id": "fast_burning_powder",
    "name": "Fast-burning Powder",
    "skill": "Unknown",
    "sellValue": 473.0,
    "output": 3.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 47.3
  },
  {
    "id": "name",
    "name": "Name",
    "skill": "Unknown",
    "sellValue": 0.0,
    "output": 1,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 0.0
  },
  {
    "id": "ruby",
    "name": "Ruby",
    "skill": "Unknown",
    "sellValue": 3200.0,
    "output": 1.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 320.0
  },
  {
    "id": "starlight_ruby_lv_1",
    "name": "Starlight Ruby Lv.1",
    "skill": "Unknown",
    "sellValue": 144.0,
    "output": 7.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 14.4
  },
  {
    "id": "nan",
    "name": "nan",
    "skill": "Unknown",
    "sellValue": NaN,
    "output": NaN,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": NaN
  },
  {
    "id": "ruby_power_3",
    "name": "Ruby - Power 3",
    "skill": "Unknown",
    "sellValue": 6200.0,
    "output": 1.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 620.0
  },
  {
    "id": "starlight_ruby_lv_2",
    "name": "Starlight Ruby Lv.2",
    "skill": "Unknown",
    "sellValue": 144.0,
    "output": 5.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 14.4
  },
  {
    "id": "gem_wax",
    "name": "Gem Wax",
    "skill": "Gemcrafting",
    "sellValue": 138.0,
    "output": 2.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 13.8
  },
  {
    "id": "ruby",
    "name": "Ruby",
    "skill": "Unknown",
    "sellValue": 3200.0,
    "output": 1.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 320.0
  },
  {
    "id": "nan",
    "name": "nan",
    "skill": "Unknown",
    "sellValue": NaN,
    "output": NaN,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": NaN
  },
  {
    "id": "ruby_bulwark_3",
    "name": "Ruby - Bulwark 3",
    "skill": "Unknown",
    "sellValue": 6696.0,
    "output": 1.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 669.6
  },
  {
    "id": "starlight_ruby_lv_2",
    "name": "Starlight Ruby Lv.2",
    "skill": "Unknown",
    "sellValue": 144.0,
    "output": 5.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 14.4
  },
  {
    "id": "gem_wax",
    "name": "Gem Wax",
    "skill": "Gemcrafting",
    "sellValue": 138.0,
    "output": 2.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 13.8
  },
  {
    "id": "ruby",
    "name": "Ruby",
    "skill": "Unknown",
    "sellValue": 3200.0,
    "output": 1.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 320.0
  },
  {
    "id": "nan",
    "name": "nan",
    "skill": "Unknown",
    "sellValue": NaN,
    "output": NaN,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": NaN
  },
  {
    "id": "ruby_agility_3",
    "name": "Ruby - Agility 3",
    "skill": "Unknown",
    "sellValue": 6448.0,
    "output": 1.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 644.8
  },
  {
    "id": "starlight_ruby_lv_2",
    "name": "Starlight Ruby Lv.2",
    "skill": "Unknown",
    "sellValue": 144.0,
    "output": 5.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 14.4
  },
  {
    "id": "gem_wax",
    "name": "Gem Wax",
    "skill": "Gemcrafting",
    "sellValue": 138.0,
    "output": 2.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 13.8
  },
  {
    "id": "ruby",
    "name": "Ruby",
    "skill": "Unknown",
    "sellValue": 3200.0,
    "output": 1.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 320.0
  },
  {
    "id": "nan",
    "name": "nan",
    "skill": "Unknown",
    "sellValue": NaN,
    "output": NaN,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": NaN
  },
  {
    "id": "ruby_abyss_3",
    "name": "Ruby - Abyss 3",
    "skill": "Unknown",
    "sellValue": 6448.0,
    "output": 1.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 644.8
  },
  {
    "id": "starlight_ruby_lv_2",
    "name": "Starlight Ruby Lv.2",
    "skill": "Unknown",
    "sellValue": 144.0,
    "output": 5.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 14.4
  },
  {
    "id": "gem_wax",
    "name": "Gem Wax",
    "skill": "Gemcrafting",
    "sellValue": 138.0,
    "output": 2.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 13.8
  },
  {
    "id": "ruby",
    "name": "Ruby",
    "skill": "Unknown",
    "sellValue": 3200.0,
    "output": 1.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 320.0
  },
  {
    "id": "nan",
    "name": "nan",
    "skill": "Unknown",
    "sellValue": NaN,
    "output": NaN,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": NaN
  },
  {
    "id": "name",
    "name": "Name",
    "skill": "Unknown",
    "sellValue": 0.0,
    "output": 1,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 0.0
  },
  {
    "id": "red_dye",
    "name": "Red Dye",
    "skill": "Unknown",
    "sellValue": 2777.0,
    "output": 1.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 277.7
  },
  {
    "id": "natural_pigment_red",
    "name": "Natural Pigment - Red",
    "skill": "Unknown",
    "sellValue": 0.0,
    "output": 8.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 0.0
  },
  {
    "id": "boiled_water",
    "name": "Boiled Water",
    "skill": "Unknown",
    "sellValue": 0.0,
    "output": 1.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 0.0
  },
  {
    "id": "nan",
    "name": "nan",
    "skill": "Unknown",
    "sellValue": NaN,
    "output": NaN,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": NaN
  },
  {
    "id": "orange_dye",
    "name": "Orange Dye",
    "skill": "Unknown",
    "sellValue": 2777.0,
    "output": 1.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 277.7
  },
  {
    "id": "natural_pigment_orange",
    "name": "Natural Pigment - Orange",
    "skill": "Unknown",
    "sellValue": 0.0,
    "output": 8.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 0.0
  },
  {
    "id": "boiled_water",
    "name": "Boiled Water",
    "skill": "Unknown",
    "sellValue": 0.0,
    "output": 1.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 0.0
  },
  {
    "id": "nan",
    "name": "nan",
    "skill": "Unknown",
    "sellValue": NaN,
    "output": NaN,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": NaN
  },
  {
    "id": "yellow_dye",
    "name": "Yellow Dye",
    "skill": "Unknown",
    "sellValue": 2777.0,
    "output": 1.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 277.7
  },
  {
    "id": "natural_pigment_yellow",
    "name": "Natural Pigment - Yellow",
    "skill": "Unknown",
    "sellValue": 0.0,
    "output": 8.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 0.0
  },
  {
    "id": "boiled_water",
    "name": "Boiled Water",
    "skill": "Unknown",
    "sellValue": 0.0,
    "output": 1.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 0.0
  },
  {
    "id": "nan",
    "name": "nan",
    "skill": "Unknown",
    "sellValue": NaN,
    "output": NaN,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": NaN
  },
  {
    "id": "green_dye",
    "name": "Green Dye",
    "skill": "Unknown",
    "sellValue": 2777.0,
    "output": 1.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 277.7
  },
  {
    "id": "natural_pigment_green",
    "name": "Natural Pigment - Green",
    "skill": "Unknown",
    "sellValue": 0.0,
    "output": 9.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 0.0
  },
  {
    "id": "boiled_water",
    "name": "Boiled Water",
    "skill": "Unknown",
    "sellValue": 0.0,
    "output": 3.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 0.0
  },
  {
    "id": "nan",
    "name": "nan",
    "skill": "Unknown",
    "sellValue": NaN,
    "output": NaN,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": NaN
  },
  {
    "id": "cyan_dye",
    "name": "Cyan Dye",
    "skill": "Unknown",
    "sellValue": 2777.0,
    "output": NaN,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 277.7
  },
  {
    "id": "natural_pigment_cyan",
    "name": "Natural Pigment - Cyan",
    "skill": "Unknown",
    "sellValue": 0.0,
    "output": 8.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 0.0
  },
  {
    "id": "boiled_water",
    "name": "Boiled Water",
    "skill": "Unknown",
    "sellValue": 0.0,
    "output": 1.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 0.0
  },
  {
    "id": "nan",
    "name": "nan",
    "skill": "Unknown",
    "sellValue": NaN,
    "output": NaN,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": NaN
  },
  {
    "id": "blue_dye",
    "name": "Blue Dye",
    "skill": "Unknown",
    "sellValue": 2777.0,
    "output": 1.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 277.7
  },
  {
    "id": "natural_pigment_blue",
    "name": "Natural Pigment - Blue",
    "skill": "Unknown",
    "sellValue": 0.0,
    "output": 8.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 0.0
  },
  {
    "id": "boiled_water",
    "name": "Boiled Water",
    "skill": "Unknown",
    "sellValue": 0.0,
    "output": 1.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 0.0
  },
  {
    "id": "nan",
    "name": "nan",
    "skill": "Unknown",
    "sellValue": NaN,
    "output": NaN,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": NaN
  },
  {
    "id": "purple_dye",
    "name": "Purple Dye",
    "skill": "Unknown",
    "sellValue": 2777.0,
    "output": 1.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 277.7
  },
  {
    "id": "natural_pigment_purple",
    "name": "Natural Pigment - Purple",
    "skill": "Unknown",
    "sellValue": 0.0,
    "output": 3.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 0.0
  },
  {
    "id": "boiled_water",
    "name": "Boiled Water",
    "skill": "Unknown",
    "sellValue": 0.0,
    "output": 3.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 0.0
  },
  {
    "id": "nan",
    "name": "nan",
    "skill": "Unknown",
    "sellValue": NaN,
    "output": NaN,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": NaN
  },
  {
    "id": "name",
    "name": "Name",
    "skill": "Unknown",
    "sellValue": 0.0,
    "output": 1,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 0.0
  },
  {
    "id": "burning_powder",
    "name": "Burning Powder",
    "skill": "Unknown",
    "sellValue": 138.0,
    "output": 15.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 13.8
  },
  {
    "id": "charcoal",
    "name": "Charcoal",
    "skill": "Unknown",
    "sellValue": 180.0,
    "output": 1.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 18.0
  },
  {
    "id": "nan",
    "name": "nan",
    "skill": "Unknown",
    "sellValue": NaN,
    "output": NaN,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": NaN
  },
  {
    "id": "gem_wax",
    "name": "Gem Wax",
    "skill": "Gemcrafting",
    "sellValue": 128.0,
    "output": 15.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 12.8
  },
  {
    "id": "resin",
    "name": "Resin",
    "skill": "Unknown",
    "sellValue": 180.0,
    "output": 2.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 18.0
  },
  {
    "id": "nan",
    "name": "nan",
    "skill": "Unknown",
    "sellValue": NaN,
    "output": NaN,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": NaN
  },
  {
    "id": "fast_burning_powder",
    "name": "Fast Burning Powder",
    "skill": "Unknown",
    "sellValue": 472.0,
    "output": 3.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 47.2
  },
  {
    "id": "charcoal",
    "name": "Charcoal",
    "skill": "Unknown",
    "sellValue": 180.0,
    "output": 2.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 18.0
  },
  {
    "id": "nan",
    "name": "nan",
    "skill": "Unknown",
    "sellValue": NaN,
    "output": NaN,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": NaN
  },
  {
    "id": "charcoal",
    "name": "Charcoal",
    "skill": "Unknown",
    "sellValue": 660.0,
    "output": 10.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 66.0
  },
  {
    "id": "pine_timber",
    "name": "Pine Timber",
    "skill": "Unknown",
    "sellValue": 174.0,
    "output": 28.0,
    "craftingFocus": 10,
    "ingredients": [],
    "totalIngredientCost": 0,
    "focusEfficiency": 17.4
  }
] as const;