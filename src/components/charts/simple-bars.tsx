"use client";

import { useMemo, useState } from "react";

export interface SimpleBarDatum {
  name: string;
  value: number;
  color: string;
}

interface SimpleBarsProps {
  data: SimpleBarDatum[];
  height?: number;
  domain?: [number, number];
  yAxisLabel?: string;
}

export function SimpleBars({
  data,
  height = 240,
  domain: domainProp,
  yAxisLabel,
}: SimpleBarsProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [min, max] = useMemo(() => {
    if (domainProp) return domainProp;
    if (data.length === 0) return [0, 10];
    const vals = data.map((d) => d.value);
    const mx = Math.max(...vals);
    return mx <= 0 ? [0, 10] : [0, Math.ceil(mx * 1.15)];
  }, [data, domainProp]);
  const range = max - min || 1;

  const yTicks = useMemo(() => {
    const ticks: number[] = [];
    const step = range / 5;
    for (let i = 0; i <= 5; i++) {
      ticks.push(min + i * step);
    }
    return ticks;
  }, [min, range]);

  const pad = { top: 12, right: 12, bottom: 48, left: 40 };
  const svgW = 600;
  const innerW = svgW - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;
  const barAreaW = innerW / data.length;
  const barW = Math.max(8, Math.min(barAreaW * 0.55, 64));

  const yScale = (v: number) =>
    pad.top + innerH - ((v - min) / range) * innerH;

  if (data.length === 0) {
    return <div style={{ height }} />;
  }

  return (
    <div className="relative" style={{ height }}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${svgW} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        className="overflow-visible"
      >
        {yTicks.map((tick) => (
          <g key={tick}>
            <line
              x1={pad.left}
              x2={svgW - pad.right}
              y1={yScale(tick)}
              y2={yScale(tick)}
              stroke="#e2e8f0"
              strokeWidth={1}
              strokeDasharray="4,4"
            />
            <text
              x={pad.left - 6}
              y={yScale(tick) + 4}
              textAnchor="end"
              fill="#475569"
              fontSize={12}
            >
              {tick % 1 === 0 ? tick.toFixed(0) : tick.toFixed(1)}
            </text>
          </g>
        ))}

        {yAxisLabel && (
          <text
            x={-height / 2}
            y={12}
            textAnchor="middle"
            fill="#475569"
            fontSize={12}
            fontWeight={500}
            transform={`rotate(-90)`}
          >
            {yAxisLabel}
          </text>
        )}

        {data.map((d, i) => {
          const x = pad.left + i * barAreaW + (barAreaW - barW) / 2;
          const barH = Math.max(3, ((d.value - min) / range) * innerH);
          const y = pad.top + innerH - barH;
          const isHovered = hovered === i;

          return (
            <g key={d.name}>
              <rect
                x={x}
                y={y}
                width={barW}
                height={barH}
                rx={4}
                fill={d.color}
                fillOpacity={isHovered ? 1 : hovered !== null ? 0.3 : 0.85}
                stroke={d.color}
                strokeWidth={isHovered ? 2 : 0}
                className="transition-all duration-150"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer" }}
              />
              {isHovered && (
                <g>
                  <rect
                    x={Math.max(2, Math.min(svgW - 104, x + barW / 2 - 48))}
                    y={Math.max(0, y - 30)}
                    width={96}
                    height={22}
                    rx={4}
                    fill="white"
                    stroke="#e2e8f0"
                    strokeWidth={1}
                    filter="drop-shadow(0 1px 2px rgba(0,0,0,0.1))"
                  />
                  <text
                    x={Math.max(50, Math.min(svgW - 56, x + barW / 2))}
                    y={y - 14}
                    textAnchor="middle"
                    fill="#1e293b"
                    fontSize={12}
                    fontWeight={600}
                  >
                    {d.value.toFixed(1)}
                  </text>
                </g>
              )}
              <text
                x={x + barW / 2}
                y={height - 6}
                textAnchor="end"
                fill="#475569"
                fontSize={11}
                transform={`rotate(-25, ${x + barW / 2}, ${height - 6})`}
              >
                {d.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
