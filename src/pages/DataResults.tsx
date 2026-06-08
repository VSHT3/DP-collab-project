import { useState } from "react";
import { RadarChart as BklitRadarChart } from "../components/charts/radar-chart";
import { RadarGrid } from "../components/charts/radar-grid";
import { RadarAxis } from "../components/charts/radar-axis";
import { RadarLabels } from "../components/charts/radar-labels";
import { RadarArea } from "../components/charts/radar-area";
import { RadarTooltip } from "../components/charts/radar-tooltip";
import {
  SimpleBars,
  type SimpleBarDatum,
} from "../components/charts/simple-bars";
import {
  products,
  axes,
  mainAxes,
  subMetrics,
  type ProductKey,
  type AxisKey,
  type SubMetricKey,
} from "../data/products";

const productKeys = Object.keys(products) as ProductKey[];

function fmt(v: number | null): string {
  return v === null ? "—" : v.toFixed(1);
}

function pearsonR(xs: number[], ys: number[]): number {
  const n = xs.length;
  if (n < 2) return 0;
  const mx = xs.reduce((a, b) => a + b, 0) / n;
  const my = ys.reduce((a, b) => a + b, 0) / n;
  const num = xs.reduce((s, x, i) => s + (x - mx) * (ys[i] - my), 0);
  const dx = Math.sqrt(xs.reduce((s, x) => s + (x - mx) ** 2, 0));
  const dy = Math.sqrt(ys.reduce((s, y) => s + (y - my) ** 2, 0));
  return dx === 0 || dy === 0 ? 0 : num / (dx * dy);
}

function ScatterPlot({
  data,
  xLabel,
  yLabel,
  r,
}: {
  data: { x: number; y: number; name: string; color: string }[];
  xLabel: string;
  yLabel: string;
  r: number;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const h = 480;
  const pad = { top: 24, right: 24, bottom: 52, left: 56 };
  const svgW = 720;
  const innerW = svgW - pad.left - pad.right;
  const innerH = h - pad.top - pad.bottom;
  const xScale = (v: number) => pad.left + (v / 10) * innerW;
  const yScale = (v: number) => pad.top + innerH - (v / 10) * innerH;

  return (
    <div>
      <svg
        width="100%"
        height={h}
        viewBox={`0 0 ${svgW} ${h}`}
        preserveAspectRatio="xMidYMid meet"
        className="overflow-visible"
      >
        {/* Grid */}
        {[0, 2, 4, 6, 8, 10].map((t) => (
          <g key={t}>
            <line
              x1={xScale(t)}
              x2={xScale(t)}
              y1={pad.top}
              y2={pad.top + innerH}
              stroke="#e2e8f0"
              strokeWidth={1}
              strokeDasharray="4,4"
            />
            <line
              x1={pad.left}
              x2={pad.left + innerW}
              y1={yScale(t)}
              y2={yScale(t)}
              stroke="#e2e8f0"
              strokeWidth={1}
              strokeDasharray="4,4"
            />
            <text
              x={pad.left - 6}
              y={yScale(t) + 4}
              textAnchor="end"
              fill="#475569"
              fontSize={14}
            >
              {t}
            </text>
            <text
              x={xScale(t)}
              y={h - pad.bottom + 16}
              textAnchor="middle"
              fill="#475569"
              fontSize={14}
            >
              {t}
            </text>
          </g>
        ))}

        {/* Axis labels */}
        <text
          x={pad.left + innerW / 2}
          y={h - 6}
          textAnchor="middle"
          fill="#334155"
          fontSize={14}
          fontWeight={600}
        >
          {xLabel}
        </text>
        <text
          x={14}
          y={pad.top + innerH / 2}
          textAnchor="middle"
          fill="#334155"
          fontSize={14}
          fontWeight={600}
          transform={`rotate(-90, 12, ${pad.top + innerH / 2})`}
        >
          {yLabel}
        </text>

        {/* Points */}
        {data.map((d, i) => {
          const cx = xScale(d.x);
          const cy = yScale(d.y);
          const isHovered = hovered === i;
          return (
            <g key={d.name}>
              <circle
                cx={cx}
                cy={cy}
                r={isHovered ? 9 : 7}
                fill={d.color}
                fillOpacity={isHovered ? 1 : hovered !== null ? 0.3 : 0.85}
                stroke="white"
                strokeWidth={1.5}
                style={{ cursor: "pointer", transition: "r 0.1s" }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              />
              {isHovered && (
                <>
                  <text
                    x={cx}
                    y={cy - 28}
                    textAnchor="middle"
                    fill="#1e293b"
                    fontSize={15}
                    fontWeight={700}
                  >
                    {d.name}
                  </text>
                  <text
                    x={cx}
                    y={cy - 8}
                    textAnchor="middle"
                    fill="#475569"
                    fontSize={13}
                  >
                    {xLabel}: {d.x.toFixed(1)} · {yLabel}: {d.y.toFixed(1)}
                  </text>
                </>
              )}
            </g>
          );
        })}
      </svg>
      <p className="text-sm text-slate-600 mt-3">
        Pearson r = <strong className="text-slate-900">{r.toFixed(3)}</strong>
        {" · "}
        {data.length} products with data on both axes
      </p>
    </div>
  );
}

export default function DataResults() {
  const [sortKey, setSortKey] = useState<string>("performance");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [visibleProducts, setVisibleProducts] = useState<Set<ProductKey>>(
    new Set(["naturella_pad", "jessa_cloth"]),
  );
  const [xAxis, setXAxis] = useState<string>("performance");
  const [yAxis, setYAxis] = useState<string>("environment");

  function toggleProduct(k: ProductKey) {
    setVisibleProducts((prev) => {
      const next = new Set(prev);
      if (next.has(k)) {
        next.delete(k);
      } else {
        next.add(k);
      }
      return next;
    });
  }

  function handleSort(key: string) {
    if (key === sortKey) {
      setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  function getSortValue(k: ProductKey, key: string): number {
    if (key === "price") return products[k].price ?? -1;
    if (key === "absorptionRate") return products[k].absorptionRate ?? -1;
    if (key === "annualCost") return products[k].subMetrics.annualCost ?? -1;
    return products[k].scores[key as AxisKey] ?? -1;
  }

  const allMetricKeys = [...new Set([...axes.map(a => a.key), ...subMetrics.map(sm => sm.key)])];

  const sortedKeys = [...productKeys].sort((a, b) => {
    const va = getSortValue(a, sortKey);
    const vb = getSortValue(b, sortKey);
    return sortDir === "desc" ? vb - va : va - vb;
  });

  function getMetricValue(k: ProductKey, key: string): number | null {
    const axisKey = key as AxisKey;
    if (axes.some(a => a.key === axisKey)) return products[k].scores[axisKey];
    const smKey = key as SubMetricKey;
    const raw = getSubMetric(k, smKey);
    if (raw === null) return null;
    return normalizeSubMetric(smKey, raw, productKeys.map(pk => getSubMetric(pk, smKey)));
  }

  const visibleKeys = productKeys.filter((k) => visibleProducts.has(k));

  function getSubMetric(k: ProductKey, key: SubMetricKey): number | null {
    if (key === "capacity") return products[k].scores.capacity;
    if (key === "rate") return products[k].scores.rate;
    return products[k].subMetrics[key];
  }

  const lowerBetterKeys: SubMetricKey[] = [
    "tssRisk",
    "chemicalExposure",
    "environmentalImpact",
    "annualCost",
  ];

  function normalizeSubMetric(
    key: SubMetricKey,
    val: number | null,
    allVals: (number | null)[],
  ): number {
    if (val === null) return NaN;
    if (key === "capacity" || key === "rate" || key === "skinIrritation")
      return val;
    const nums = allVals.filter((v): v is number => v !== null);
    if (nums.length === 0) return NaN;
    const mn = Math.min(...nums);
    const mx = Math.max(...nums);
    if (mn === mx) return 5;
    const raw = (val - mn) / (mx - mn);
    return lowerBetterKeys.includes(key) ? (1 - raw) * 10 : raw * 10;
  }

  const mainBklitData = visibleKeys.map((k) => ({
    label: products[k].label,
    color: products[k].color,
    values: Object.fromEntries(
      mainAxes.map((a) => [a.key, products[k].scores[a.key] ?? 0]),
    ),
  }));

  const subBklitData = visibleKeys.map((k) => ({
    label: products[k].label,
    color: products[k].color,
    values: Object.fromEntries(
      subMetrics.map((sm) => [
        sm.key,
        normalizeSubMetric(
          sm.key,
          getSubMetric(k, sm.key),
          productKeys.map((pk) => getSubMetric(pk, sm.key)),
        ),
      ]),
    ),
  }));

  return (
    <div className="px-8 lg:px-16 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="text-sm font-semibold tracking-widest text-rose-500 uppercase">
            Data & Results
          </span>
          <h1 className="text-4xl font-bold text-slate-950 mt-2 mb-3">
            Findings
          </h1>
          <p className="text-lg text-slate-700 max-w-3xl">
            All scores 0–10 (higher = better). Safety, Chemistry, and
            Environment scores populated from published literature research.
          </p>
        </div>

        {/* Product toggle legend */}
        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          {productKeys.map((k) => (
            <button
              key={k}
              onClick={() => toggleProduct(k)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 ${
                visibleProducts.has(k)
                  ? "border-transparent text-white"
                  : "border-slate-300 text-slate-600 bg-white hover:border-rose-300"
              }`}
              style={
                visibleProducts.has(k) ? { background: products[k].color } : {}
              }
            >
              {products[k].label}
            </button>
          ))}
        </div>

        {/* Radar charts — two side by side */}
        <div className="grid grid-cols-2 gap-10 mb-8">
          {/* Left — main axes scores */}
          <div className="border border-slate-200 rounded-2xl p-10 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950 mb-1">
              Overall Scores
            </h2>
            <p className="text-base text-slate-700 mb-4">
              Safety, Chemistry, Performance, Environment, Cost
            </p>
            <div className="flex justify-center">
              <BklitRadarChart
                data={mainBklitData}
                metrics={mainAxes}
                size={380}
              >
                <RadarGrid />
                <RadarAxis />
                <RadarLabels offset={28} fontSize={12} />
                {mainBklitData.map((item, i) => (
                  <RadarArea key={item.label} index={i} />
                ))}
                <RadarTooltip />
              </BklitRadarChart>
            </div>
          </div>

          {/* Right — specific measurements */}
          <div className="border border-slate-200 rounded-2xl p-10 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950 mb-1">
              Specific Measurements
            </h2>
            <p className="text-base text-slate-700 mb-4">
              Metrics from each science
            </p>
            <div className="flex justify-center">
              <BklitRadarChart
                data={subBklitData}
                metrics={subMetrics}
                size={380}
              >
                <RadarGrid />
                <RadarAxis />
                <RadarLabels offset={28} fontSize={12} />
                {subBklitData.map((item, i) => (
                  <RadarArea key={item.label} index={i} />
                ))}
                <RadarTooltip />
              </BklitRadarChart>
            </div>
          </div>
        </div>

        {/* Per-axis bar charts — main scores */}
        <h2 className="text-xl font-bold text-slate-950 mb-4">
          Score Breakdown
        </h2>
        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          {mainAxes.map(({ key, label, description }) => {
            const barData: SimpleBarDatum[] = productKeys.map((k) => ({
              name: products[k].label,
              value: products[k].scores[key] ?? 0,
              color: products[k].color,
            }));
            return (
              <div
                key={key}
                className="border border-slate-200 rounded-2xl p-10 shadow-sm"
              >
                <h3 className="text-lg font-bold text-slate-950 mb-1">
                  {label}
                </h3>
                <p className="text-sm text-slate-700 mb-4">{description}</p>
                <SimpleBars data={barData} domain={[0, 10]} height={280} />
              </div>
            );
          })}
        </div>

        {/* Per-axis bar charts — specific measurements */}
        <h2 className="text-xl font-bold text-slate-950 mb-4">
          Specific Measurements
        </h2>
        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          {subMetrics.map(({ key, label, description }) => {
            const barData: SimpleBarDatum[] = productKeys.map((k) => {
              const val = getSubMetric(k, key);
              return {
                name: products[k].label,
                value: val ?? 0,
                color: products[k].color,
              };
            });
            return (
              <div
                key={key}
                className="border border-slate-200 rounded-2xl p-10 shadow-sm"
              >
                <h3 className="text-lg font-bold text-slate-950 mb-1">
                  {label}
                </h3>
                <p className="text-sm text-slate-700 mb-4">{description}</p>
                <SimpleBars data={barData} height={280} />
              </div>
            );
          })}
        </div>

        {/* Rankings table */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm mb-10">
          <div className="px-6 py-4 bg-slate-50 flex items-center justify-between">
            <span className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Rankings
            </span>
            <span className="text-sm text-slate-600">
              Click axis header to sort
            </span>
          </div>
          <table className="w-full text-lg">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-6 py-4 text-left font-bold text-slate-800">
                  Product
                </th>
                {axes.map((a) => (
                  <th
                    key={a.key}
                    onClick={() => handleSort(a.key)}
                    className="px-5 py-4 text-center font-bold text-slate-800 cursor-pointer hover:text-rose-500 select-none transition-colors duration-200 hover:bg-rose-50/50"
                  >
                    {a.label}
                    {sortKey === a.key && (
                      <span className="ml-1 text-rose-500">
                        {sortDir === "desc" ? "↓" : "↑"}
                      </span>
                    )}
                  </th>
                ))}
                <th
                  onClick={() => handleSort("price")}
                  className="px-5 py-4 text-center font-bold text-slate-800 cursor-pointer hover:text-rose-500 select-none transition-colors duration-200 hover:bg-rose-50/50"
                >
                  € Price
                  {sortKey === "price" && (
                    <span className="ml-1 text-rose-500">
                      {sortDir === "desc" ? "↓" : "↑"}
                    </span>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedKeys.map((k, i) => (
                <tr key={k} className={`${i % 2 === 0 ? "" : "bg-slate-50/50"} hover:bg-rose-50/30 transition-colors duration-150`}>
                  <td className="px-6 py-4 font-semibold text-slate-950">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ background: products[k].color }}
                      />
                      {products[k].label}
                    </div>
                  </td>
                  {axes.map((a) => (
                    <td
                      key={a.key}
                      className={`px-5 py-4 text-center ${sortKey === a.key ? "font-bold text-slate-950" : "text-slate-700"}`}
                    >
                      {fmt(products[k].scores[a.key])}
                    </td>
                  ))}
                  <td className={`px-5 py-4 text-center ${sortKey === "price" ? "font-bold text-slate-950" : "text-slate-700"}`}>
                    {products[k].price !== null
                      ? `€${products[k].price.toFixed(2)}`
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Statistical summary */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 bg-slate-50">
            <span className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Statistical Summary
            </span>
            <span className="text-sm text-slate-500 ml-3">
              mean · min · max · σ across all products
            </span>
          </div>
          <div className="p-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {axes.map(({ key, label }) => {
              const values = productKeys
                .map((k) => products[k].scores[key])
                .filter((v): v is number => v !== null);
              if (values.length === 0) return null;
              const mean = values.reduce((a, b) => a + b, 0) / values.length;
              const min = Math.min(...values);
              const max = Math.max(...values);
              const std = Math.sqrt(
                values.reduce((s, v) => s + (v - mean) ** 2, 0) / values.length,
              );
              return (
                <div
                  key={key}
                  className="border border-slate-200 rounded-xl p-5 bg-white hover:shadow-sm transition-shadow duration-200"
                >
                  <p className="text-sm font-bold text-slate-800 mb-3">{label}</p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                    <span className="text-slate-500">Mean</span>
                    <span className="font-semibold text-slate-900 text-right">{mean.toFixed(2)}</span>
                    <span className="text-slate-500">Min</span>
                    <span className="font-semibold text-slate-900 text-right">{min.toFixed(1)}</span>
                    <span className="text-slate-500">Max</span>
                    <span className="font-semibold text-slate-900 text-right">{max.toFixed(1)}</span>
                    <span className="text-slate-500">σ</span>
                    <span className="font-semibold text-slate-900 text-right">{std.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    n = {values.length} of {productKeys.length}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Correlation scatter */}
        <div className="border border-slate-200 rounded-2xl p-10 shadow-sm mt-10">
          <h2 className="text-xl font-bold text-slate-950 mb-1">
            Correlation Explorer
          </h2>
          <p className="text-base text-slate-700 mb-6">
            Select two metrics to visualise their relationship. All values
            normalised 0–10. Each dot is one product.
          </p>

          <div className="flex gap-10 mb-6 flex-wrap">
            {(["x", "y"] as const).map((axis) => {
              const selected = axis === "x" ? xAxis : yAxis;
              return (
                <div key={axis}>
                  <label className="text-sm font-bold text-slate-800 uppercase tracking-wider block mb-2">
                    {axis.toUpperCase()} Axis
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {allMetricKeys.map((key) => {
                      const label = axes.find(a => a.key === key)?.label ?? subMetrics.find(sm => sm.key === key)?.label ?? key;
                      const hasData = productKeys.some(
                        (k) => getMetricValue(k, key) !== null && !isNaN(getMetricValue(k, key)!),
                      );
                      return (
                        <button
                          key={key}
                          disabled={!hasData}
                          onClick={() =>
                            axis === "x" ? setXAxis(key) : setYAxis(key)
                          }
                          className={`px-3 py-1.5 rounded-lg text-sm border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 ${
                            selected === key
                              ? "bg-rose-500 text-white border-rose-500"
                              : hasData
                                ? "border-slate-300 text-slate-700 hover:border-rose-300"
                                : "border-slate-200 text-slate-400 cursor-not-allowed"
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {(() => {
            const scatterData = productKeys
              .filter(
                (k) => {
                  const xVal = getMetricValue(k, xAxis);
                  const yVal = getMetricValue(k, yAxis);
                  return xVal !== null && yVal !== null && !isNaN(xVal) && !isNaN(yVal);
                },
              )
              .map((k) => ({
                x: getMetricValue(k, xAxis)!,
                y: getMetricValue(k, yAxis)!,
                name: products[k].label,
                color: products[k].color,
              }));

            if (scatterData.length < 2) {
              return (
                <div className="h-64 flex items-center justify-center text-slate-600 text-base">
                  Not enough data yet — select axes with collected data
                </div>
              );
            }

            const r = pearsonR(
              scatterData.map((d) => d.x),
              scatterData.map((d) => d.y),
            );

            const xLabel = axes.find((a) => a.key === xAxis)?.label ?? subMetrics.find(sm => sm.key === xAxis)?.label ?? xAxis;
            const yLabel = axes.find((a) => a.key === yAxis)?.label ?? subMetrics.find(sm => sm.key === yAxis)?.label ?? yAxis;

            return (
              <ScatterPlot
                data={scatterData}
                xLabel={xLabel}
                yLabel={yLabel}
                r={r}
              />
            );
          })()}
        </div>
      </div>
    </div>
  );
}
