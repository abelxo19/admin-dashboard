"use client"

import { useState, useEffect } from "react"
import { User, Clock, DollarSign, ShoppingCart, AlertCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Activity = {
  id: string
  user: {
    name: string
    avatar: string
    initials: string
  }
  action: string
  target: string
  time: string
  type: "purchase" | "login" | "alert" | "refund"
  amount?: string
  status?: "positive" | "negative" | "warning"
}

export function DashboardActivity() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  // Simulate real-time activity updates
  useEffect(() => {
    // Initial activities
    setActivities(recentActivities)
    setLoading(false)

    // Add new activity every 8-15 seconds
    const interval = setInterval(
      () => {
        const randomActivity = generateRandomActivity()
        setActivities((prev) => [randomActivity, ...prev.slice(0, 9)])
      },
      Math.floor(Math.random() * 7000) + 8000,
    )

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="col-span-full lg:col-span-1">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Live Activity</CardTitle>
            <CardDescription>Real-time user activity feed</CardDescription>
          </div>
          <Badge variant="outline" className="bg-primary/10">
            Live
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="max-h-[400px] overflow-auto">
        {loading ? (
          <div className="flex items-center justify-center h-[300px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 animate-fadeIn">
                <Avatar className="h-9 w-9 border-2 border-background">
                  <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                  <AvatarFallback>{activity.user.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium leading-none">{activity.user.name}</p>
                    {activity.status && (
                      <Badge
                        variant={
                          activity.status === "positive"
                            ? "default"
                            : activity.status === "negative"
                              ? "destructive"
                              : "outline"
                        }
                        className="ml-auto"
                      >
                        {activity.amount}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {activity.action} <span className="font-medium">{activity.target}</span>
                  </p>
                  <div className="flex items-center pt-1">
                    <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                  {activity.type === "purchase" && <ShoppingCart className="h-4 w-4" />}
                  {activity.type === "login" && <User className="h-4 w-4" />}
                  {activity.type === "alert" && <AlertCircle className="h-4 w-4" />}
                  {activity.type === "refund" && <DollarSign className="h-4 w-4" />}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Sample data
const recentActivities: Activity[] = [
  {
    id: "act-1",
    user: {
      name: "John Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JS",
    },
    action: "purchased",
    target: "Premium Headphones",
    time: "Just now",
    type: "purchase",
    amount: "$299.99",
    status: "positive",
  },
  {
    id: "act-2",
    user: {
      name: "Emily Davis",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "ED",
    },
    action: "logged in from",
    target: "New York, USA",
    time: "2 minutes ago",
    type: "login",
  },
  {
    id: "act-3",
    user: {
      name: "Michael Brown",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MB",
    },
    action: "requested a refund for",
    target: "Wireless Keyboard",
    time: "5 minutes ago",
    type: "refund",
    amount: "$89.99",
    status: "negative",
  },
  {
    id: "act-4",
    user: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SJ",
    },
    action: "added 5 items to cart worth",
    target: "$450.95",
    time: "10 minutes ago",
    type: "purchase",
    amount: "$450.95",
    status: "positive",
  },
  {
    id: "act-5",
    user: {
      name: "David Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "DW",
    },
    action: "triggered inventory alert for",
    target: "Bluetooth Speakers",
    time: "15 minutes ago",
    type: "alert",
    status: "warning",
  },
]

// Generate random activities for the live feed
function generateRandomActivity(): Activity {
  const users = [
    { name: "John Smith", avatar: "/placeholder.svg?height=32&width=32", initials: "JS" },
    { name: "Emily Davis", avatar: "/placeholder.svg?height=32&width=32", initials: "ED" },
    { name: "Michael Brown", avatar: "/placeholder.svg?height=32&width=32", initials: "MB" },
    { name: "Sarah Johnson", avatar: "/placeholder.svg?height=32&width=32", initials: "SJ" },
    { name: "David Wilson", avatar: "/placeholder.svg?height=32&width=32", initials: "DW" },
    { name: "Jessica Taylor", avatar: "/placeholder.svg?height=32&width=32", initials: "JT" },
    { name: "Robert Miller", avatar: "/placeholder.svg?height=32&width=32", initials: "RM" },
    { name: "Lisa Anderson", avatar: "/placeholder.svg?height=32&width=32", initials: "LA" },
  ]

  const products = [
    "Premium Headphones",
    "Wireless Keyboard",
    "Smart Watch",
    "Bluetooth Speaker",
    "Laptop Stand",
    "External SSD",
    "Wireless Mouse",
    "Monitor Stand",
    "USB-C Hub",
  ]

  const locations = [
    "New York, USA",
    "London, UK",
    "Tokyo, Japan",
    "Sydney, Australia",
    "Paris, France",
    "Berlin, Germany",
    "Toronto, Canada",
    "Mumbai, India",
  ]

  const activityTypes = ["purchase", "login", "alert", "refund"] as const
  const type = activityTypes[Math.floor(Math.random() * activityTypes.length)]

  const randomUser = users[Math.floor(Math.random() * users.length)]
  const randomProduct = products[Math.floor(Math.random() * products.length)]
  const randomLocation = locations[Math.floor(Math.random() * locations.length)]

  let action, target, amount, status

  switch (type) {
    case "purchase":
      action = "purchased"
      target = randomProduct
      amount = `$${(Math.random() * 500 + 50).toFixed(2)}`
      status = "positive"
      break
    case "login":
      action = "logged in from"
      target = randomLocation
      break
    case "alert":
      action = "triggered inventory alert for"
      target = randomProduct
      status = "warning"
      break
    case "refund":
      action = "requested a refund for"
      target = randomProduct
      amount = `$${(Math.random() * 200 + 30).toFixed(2)}`
      status = "negative"
      break
  }

  return {
    id: `act-${Date.now()}`,
    user: randomUser,
    action,
    target,
    time: "Just now",
    type,
    amount,
    status: status as any,
  }
}

