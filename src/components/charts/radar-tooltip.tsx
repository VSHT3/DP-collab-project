"use client";

import { useRadar } from "./radar-context";

export function RadarTooltip() {
  const { hoveredIndex, data, metrics, size } = useRadar();

  if (hoveredIndex === null || !data[hoveredIndex]) return null;

  const item = data[hoveredIndex];
  const pad = 10;
  const lh = 18;
  const headerH = 22;
  const c1w = 110;
  const c2w = 35;
  const tw = c1w + c2w + pad * 2 + 2;
  const th = headerH + metrics.length * lh + pad * 2;
  const x = size / 2 - tw - 8;
  const y = -size / 2 + 8;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={tw}
        height={th}
        fill="white"
        rx={6}
        stroke="#e2e8f0"
        strokeWidth={1}
        filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
      />
      <text
        x={x + pad}
        y={y + pad + 14}
        fill={item.color || "#1e293b"}
        fontSize={13}
        fontWeight={700}
      >
        {item.label}
      </text>
      {metrics.map((metric, i) => (
        <g key={metric.key}>
          <text
            x={x + pad}
            y={y + pad + headerH + i * lh + 12}
            fill="#475569"
            fontSize={11}
          >
            {metric.label}
          </text>
          <text
            x={x + tw - pad}
            y={y + pad + headerH + i * lh + 12}
            fill="#1e293b"
            fontSize={11}
            fontWeight={600}
            textAnchor="end"
          >
            {item.values[metric.key]?.toFixed(1) ?? "—"}
          </text>
        </g>
      ))}
    </g>
  );
}
