import { RadarChart } from "../components/charts/radar-chart"
import { RadarGrid } from "../components/charts/radar-grid"
import { RadarAxis } from "../components/charts/radar-axis"
import { RadarLabels } from "../components/charts/radar-labels"
import { RadarArea } from "../components/charts/radar-area"

const metrics = [
  { key: "safety", label: "Safety" },
  { key: "chemistry", label: "Chemistry" },
  { key: "performance", label: "Performance" },
  { key: "environment", label: "Environment" },
  { key: "cost", label: "Cost" },
]

const data = [
  { label: "Naturella", color: "#34d399", values: { safety: 50, chemistry: 40, performance: 59, environment: 20, cost: 30 } },
  { label: "Always", color: "#60a5fa", values: { safety: 50, chemistry: 40, performance: 86, environment: 20, cost: 37 } },
  { label: "Ria Pad", color: "#22d3ee", values: { safety: 50, chemistry: 35, performance: 55, environment: 25, cost: 23 } },
]

export default function RadarTest() {
  return (
    <div className="p-16">
      <h1 className="text-2xl font-bold mb-8">Bklit Radar Test</h1>
      <div className="w-[500px] h-[500px]">
        <RadarChart data={data} metrics={metrics} size={500} levels={5}>
          <RadarGrid />
          <RadarAxis />
          <RadarLabels offset={28} fontSize={12} />
          {data.map((item, i) => (
            <RadarArea key={item.label} index={i} />
          ))}
        </RadarChart>
      </div>
    </div>
  )
}
