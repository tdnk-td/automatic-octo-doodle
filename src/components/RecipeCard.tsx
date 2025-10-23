import { Recipe } from "@/data/recipes";
import { INGREDIENT_MAP } from "@/data/ingredients";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <div className="bg-gray-800 rounded-2xl p-4 shadow-lg hover:shadow-blue-500/20 transition-all">
      <h3 className="text-lg font-semibold text-white text-center mb-1">
        {recipe.name}
      </h3>
      <p className="text-center text-gray-400 text-sm mb-3">{recipe.skill}</p>

      <div className="text-sm space-y-1 text-gray-200">
        <p>
          <span className="font-medium text-gray-300">Sell Value:</span>{" "}
          {recipe.sellValue.toLocaleString()}
        </p>
        <p>
          <span className="font-medium text-gray-300">Total Cost:</span>{" "}
          {recipe.totalIngredientCost.toLocaleString()}
        </p>
        <p>
          <span className="font-medium text-gray-300">Efficiency:</span>{" "}
          {recipe.focusEfficiency.toFixed(2)} / Focus
        </p>
      </div>

      <div className="mt-3 border-t border-gray-700 pt-2 space-y-1 text-sm">
        {recipe.ingredients.map((ing) => {
          const item = INGREDIENT_MAP[ing.id];
          return (
            <div
              key={ing.id}
              className="flex justify-between items-center text-gray-300"
            >
              <div className="flex items-center gap-2">
                <img
                  src={item ? item.icon ?? "" : ""}
                  alt={item?.name ?? ing.id}
                  className="w-5 h-5 rounded"
                />
                <span>{item ? item.name : ing.id}</span>
              </div>
              <span>x{ing.qty}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
