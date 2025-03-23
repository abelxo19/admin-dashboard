"use client"

import { useState, useEffect } from "react"
import { Activity, Users, DollarSign, ShoppingCart, Search, Bell, Sun, Moon, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Chart, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { DashboardActivity } from "@/components/dashboard-activity"

export default function Dashboard() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // After mounting, we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile sidebar toggle */}
      <Button
        variant="outline"
        size="icon"
        className="fixed left-4 top-4 z-50 md:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-40 w-64 border-r bg-card transition-transform duration-200 ease-in-out md:relative md:translate-x-0 md:z-0`}
      >
        <div className="flex h-16 items-center border-b px-6">
          <h2 className="text-lg font-semibold">Admin Dashboard</h2>
        </div>
        <nav className="space-y-1 p-4">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Activity className="h-4 w-4" />
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            Users
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground">
            <ShoppingCart className="h-4 w-4" />
            Products
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            Finances
          </Button>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b px-6">
          <div className="flex items-center gap-4 md:ml-0 ml-10">
            <div className="relative w-64">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-8" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@user" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="grid gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, you have 12 new notifications.</p>
            </div>

            {/* Stats */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 border-blue-500/20">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">New Customers</CardTitle>
                  <Users className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+2,350</div>
                  <p className="text-xs text-muted-foreground">+18.1% from last month</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-500/20 to-green-500/5 border-green-500/20">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+12,234</div>
                  <p className="text-xs text-muted-foreground">+12.2% from last month</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 border-purple-500/20">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <Activity className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+573</div>
                  <p className="text-xs text-muted-foreground">+201 since last hour</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="col-span-2">
                    <CardHeader>
                      <CardTitle>Revenue Over Time</CardTitle>
                      <CardDescription>Monthly revenue for the current year</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                      <RevenueChart />
                    </CardContent>
                  </Card>
                  <DashboardActivity />
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="col-span-2">
                    <CardHeader>
                      <CardTitle>Gross Profit & Margin</CardTitle>
                      <CardDescription>Monthly profit and margin percentage</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                      <ProfitMarginChart />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Traffic Sources</CardTitle>
                      <CardDescription>Visitor acquisition channels</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                      <TrafficSourcesChart />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="analytics" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Analytics</CardTitle>
                    <CardDescription>Detailed analytics data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Analytics content will appear here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reports" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Reports</CardTitle>
                    <CardDescription>Generated reports</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Reports content will appear here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Data Table */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>A list of recent orders from your store</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>A list of your recent orders.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.product}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell className="text-right">{order.amount}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              order.status === "Completed"
                                ? "default"
                                : order.status === "Processing"
                                  ? "secondary"
                                  : order.status === "Pending"
                                    ? "outline"
                                    : "destructive"
                            }
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Top Referrers */}
            <Card>
              <CardHeader>
                <CardTitle>Top Referrers</CardTitle>
                <CardDescription>Websites driving traffic to your store</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {referrers.map((referrer) => (
                    <div key={referrer.source} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="font-medium">{referrer.source}</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-sm text-muted-foreground">{referrer.visitors} visitors</div>
                        <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${(referrer.visitors / 5000) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

// Sample data for charts
function RevenueChart() {
  const data = [
    { name: "Jan", revenue: 18000 },
    { name: "Feb", revenue: 22000 },
    { name: "Mar", revenue: 32000 },
    { name: "Apr", revenue: 26000 },
    { name: "May", revenue: 42000 },
    { name: "Jun", revenue: 35000 },
    { name: "Jul", revenue: 31000 },
    { name: "Aug", revenue: 48000 },
    { name: "Sep", revenue: 52000 },
    { name: "Oct", revenue: 45000 },
    { name: "Nov", revenue: 55000 },
    { name: "Dec", revenue: 68000 },
  ]

  return (
    <Chart
      type="line"
      data={data}
      x="name"
      y="revenue"
      className="h-full w-full"
      tooltip={
        <ChartTooltip>
          <ChartTooltipContent className="p-2">
            {({ payload }) => (
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">{payload?.[0]?.payload.name}</p>
                <p className="text-sm font-medium">${payload?.[0]?.payload.revenue.toLocaleString()}</p>
              </div>
            )}
          </ChartTooltipContent>
        </ChartTooltip>
      }
    />
  )
}

function SalesDistributionChart() {
  const data = [
    { name: "Electronics", value: 35 },
    { name: "Clothing", value: 25 },
    { name: "Home", value: 20 },
    { name: "Beauty", value: 15 },
    { name: "Other", value: 5 },
  ]

  return (
    <Chart
      type="pie"
      data={data}
      index="name"
      valueKey="value"
      className="h-full w-full"
      tooltip={
        <ChartTooltip>
          <ChartTooltipContent className="p-2">
            {({ payload }) => (
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">{payload?.[0]?.name}</p>
                <p className="text-sm font-medium">{payload?.[0]?.value}%</p>
              </div>
            )}
          </ChartTooltipContent>
        </ChartTooltip>
      }
    />
  )
}

function ProfitMarginChart() {
  const data = [
    { name: "Jan", profit: 7200, margin: 40 },
    { name: "Feb", profit: 9900, margin: 45 },
    { name: "Mar", profit: 14400, margin: 45 },
    { name: "Apr", profit: 10400, margin: 40 },
    { name: "May", profit: 18900, margin: 45 },
    { name: "Jun", profit: 15750, margin: 45 },
    { name: "Jul", profit: 13950, margin: 45 },
    { name: "Aug", profit: 21600, margin: 45 },
    { name: "Sep", profit: 23400, margin: 45 },
    { name: "Oct", profit: 20250, margin: 45 },
    { name: "Nov", profit: 24750, margin: 45 },
    { name: "Dec", profit: 30600, margin: 45 },
  ]

  return (
    <Chart
      type="bar"
      data={data}
      x="name"
      y="profit"
      className="h-full w-full"
      tooltip={
        <ChartTooltip>
          <ChartTooltipContent className="p-2">
            {({ payload }) => (
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">{payload?.[0]?.payload.name}</p>
                <p className="text-sm font-medium">Profit: ${payload?.[0]?.payload.profit.toLocaleString()}</p>
                <p className="text-sm font-medium">Margin: {payload?.[0]?.payload.margin}%</p>
              </div>
            )}
          </ChartTooltipContent>
        </ChartTooltip>
      }
    />
  )
}

function TrafficSourcesChart() {
  const data = [
    { name: "Direct", visitors: 1200 },
    { name: "Organic", visitors: 2100 },
    { name: "Social", visitors: 800 },
    { name: "Referral", visitors: 600 },
    { name: "Email", visitors: 300 },
  ]

  return (
    <Chart
      type="bar"
      data={data}
      x="name"
      y="visitors"
      className="h-full w-full"
      tooltip={
        <ChartTooltip>
          <ChartTooltipContent className="p-2">
            {({ payload }) => (
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">{payload?.[0]?.payload.name}</p>
                <p className="text-sm font-medium">{payload?.[0]?.payload.visitors.toLocaleString()} visitors</p>
              </div>
            )}
          </ChartTooltipContent>
        </ChartTooltip>
      }
    />
  )
}

// Sample data for table
const orders = [
  {
    id: "ORD-001",
    customer: "John Smith",
    product: "Premium Headphones",
    date: "2023-06-12",
    amount: "$299.99",
    status: "Completed",
  },
  {
    id: "ORD-002",
    customer: "Sarah Johnson",
    product: "Wireless Keyboard",
    date: "2023-06-13",
    amount: "$89.99",
    status: "Processing",
  },
  {
    id: "ORD-003",
    customer: "Michael Brown",
    product: "Smart Watch",
    date: "2023-06-14",
    amount: "$199.99",
    status: "Completed",
  },
  {
    id: "ORD-004",
    customer: "Emily Davis",
    product: "Bluetooth Speaker",
    date: "2023-06-15",
    amount: "$129.99",
    status: "Pending",
  },
  {
    id: "ORD-005",
    customer: "David Wilson",
    product: "Laptop Stand",
    date: "2023-06-16",
    amount: "$49.99",
    status: "Completed",
  },
  {
    id: "ORD-006",
    customer: "Jessica Taylor",
    product: "External SSD",
    date: "2023-06-17",
    amount: "$159.99",
    status: "Cancelled",
  },
]

// Sample data for referrers
const referrers = [
  { source: "google.com", visitors: 4250 },
  { source: "facebook.com", visitors: 2100 },
  { source: "twitter.com", visitors: 1500 },
  { source: "instagram.com", visitors: 1200 },
  { source: "youtube.com", visitors: 950 },
]

