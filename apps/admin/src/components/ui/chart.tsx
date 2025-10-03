"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { cn } from "../../lib/utils"

// Re-export all recharts components
export {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Funnel,
  FunnelChart,
  Label,
  LabelList,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  Rectangle,
  ReferenceArea,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Sector,
  Surface,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts"

// Custom chart components with consistent styling
export type ChartConfig = Record<
  string,
  {
    label: string
    color?: string // CSS color string (e.g., 'hsl(var(--primary))' or 'var(--chart-1)')
  }
>

export function ChartContainer({
  className,
  children,
  config,
  ...props
}: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer> & {
  className?: string
  config?: ChartConfig
}) {
  const styleVars: React.CSSProperties = {}
  if (config) {
    Object.entries(config).forEach(([key, value]) => {
      if (value?.color) {
        ;(styleVars as any)[`--color-${key}`] = value.color
      }
    })
  }
  return (
    <div className={cn("h-[200px] w-full", className)} style={styleVars}>
      <RechartsPrimitive.ResponsiveContainer {...props}>
        {children}
      </RechartsPrimitive.ResponsiveContainer>
    </div>
  )
}

// Optional configuration to map dataset keys to CSS variables and labels
export function ChartTooltipContent({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ value: number; dataKey: string; color?: string }>
  label?: string | number
}) {
  if (!active || !payload || payload.length === 0) return null

  return (
    <div className="z-50 min-w-[10rem] rounded-md border bg-popover p-3 text-popover-foreground shadow-md">
      <div className="mb-1 text-[0.70rem] font-medium uppercase text-muted-foreground">
        {label}
      </div>
      <div className="grid gap-2">
        {payload.map((entry, idx) => (
          <div key={idx} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-sm"
                style={{ background: entry.color }}
              />
              <span className="text-sm text-muted-foreground">
                {String(entry.dataKey)}
              </span>
            </div>
            <span className="text-sm font-medium">{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ChartTooltip({
  ...props
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip>) {
  return (
    <RechartsPrimitive.Tooltip
      {...props}
      content={({ active, payload, label }) => {
        return (
          <ChartTooltipContent
            active={active}
            payload={payload as any}
            label={label as any}
          />
        )
      }}
    />
  )
}

export function ChartLegend({
  ...props
}: React.ComponentProps<typeof RechartsPrimitive.Legend>) {
  return (
    <RechartsPrimitive.Legend
      {...props}
      className="flex items-center justify-center gap-4 [&_.recharts-legend-item]:flex [&_.recharts-legend-item]:items-center [&_.recharts-legend-item]:gap-2 [&_.recharts-legend-item-tooltip]:cursor-pointer [&_.recharts-legend-item-tooltip]:opacity-100 [&_.recharts-legend-item]:cursor-pointer [&_.recharts-legend-item]:opacity-70 [&_.recharts-legend-item]:transition-opacity hover:[&_.recharts-legend-item]:opacity-100"
    />
  )
}

// Default legend content that renders colored dots with labels
export function ChartLegendContent(
  props: {
    payload?: Array<{ value: string; color?: string; dataKey?: string }>
  }
) {
  const items = props?.payload ?? []
  if (!items.length) return null
  return (
    <div className="flex flex-wrap items-center gap-4 px-2 pb-2">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
          <span
            aria-hidden
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: item.color || 'currentColor' }}
          />
          <span className="leading-none">{item.value}</span>
        </div>
      ))}
    </div>
  )
}
