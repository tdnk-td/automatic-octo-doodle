export function MetricCard({
  label,
  value,
  roi,
}: {
  label: string;
  value: number;
  roi?: number;
}) {
  return (
    <div
      className={`p-3 rounded-xl bg-gray-800 text-center ${
        label === "Profit" ? "border border-green-700" : ""
      }`}
    >
      <div className="text-sm text-gray-400">{label}</div>
      <div className="text-lg font-semibold text-white">{value.toFixed(0)}</div>
      {roi !== undefined && (
        <div className="text-xs text-gray-400 mt-1">
          ROI: {roi.toFixed(2)}%
        </div>
      )}
    </div>
  );
}
