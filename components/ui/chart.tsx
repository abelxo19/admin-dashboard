"use client"

import type React from "react"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts"

export function Chart({
  type,
  data,
  x,
  y,
  index,
  valueKey,
  className,
  tooltip,
}: {
  type: "line" | "bar" | "pie"
  data: any[]
  x?: string
  y?: string
  index?: string
  valueKey?: string
  className?: string
  tooltip?: React.ReactNode
}) {
  if (type === "line") {
    return (
      <ResponsiveContainer width="100%" height="100%" className={className}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={x} />
          <YAxis />
          <Tooltip contentStyle={{ background: "white", border: "1px solid gray" }} wrapperStyle={{ zIndex: 1000 }} />
          <Line type="monotone" dataKey={y} stroke="#8884d8" activeDot={{ r: 8 }} />
          {tooltip}
        </LineChart>
      </ResponsiveContainer>
    )
  }

  if (type === "bar") {
    return (
      <ResponsiveContainer width="100%" height="100%" className={className}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={x} />
          <YAxis />
          <Tooltip contentStyle={{ background: "white", border: "1px solid gray" }} wrapperStyle={{ zIndex: 1000 }} />
          <Bar dataKey={y} fill="#8884d8" />
          {tooltip}
        </BarChart>
      </ResponsiveContainer>
    )
  }

  if (type === "pie") {
    return (
      <ResponsiveContainer width="100%" height="100%" className={className}>
        <PieChart>
          <Pie data={data} dataKey={valueKey} nameKey={index} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ background: "white", border: "1px solid gray" }} wrapperStyle={{ zIndex: 1000 }} />
          {tooltip}
        </PieChart>
      </ResponsiveContainer>
    )
  }

  return <div>Chart type not supported</div>
}

export function ChartContainer({ children }: { children: React.ReactNode }) {
  return <div className="relative">{children}</div>
}

export function ChartTooltip({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div></div>
        </TooltipTrigger>
        <TooltipContent>{children}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function ChartTooltipContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}

