"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Bell, Check, Trash } from "lucide-react"

type Notification = {
  id: number
  title: string
  description: string
  read: boolean
}

export function NotificationCenter({
  notifications,
  setNotifications,
  setNotificationCount,
}: {
  notifications: Notification[]
  setNotifications: (notifications: Notification[]) => void
  setNotificationCount: (count: number) => void
}) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("all")

  const unreadNotifications = notifications.filter((notification) => !notification.read)
  const readNotifications = notifications.filter((notification) => notification.read)

  const markAsRead = (id: number) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification,
    )
    setNotifications(updatedNotifications)
    setNotificationCount(updatedNotifications.filter((n) => !n.read).length)
    toast({
      title: "Notification marked as read",
      description: "The notification has been marked as read.",
    })
  }

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({ ...notification, read: true }))
    setNotifications(updatedNotifications)
    setNotificationCount(0)
    toast({
      title: "All notifications marked as read",
      description: "All notifications have been marked as read.",
    })
  }

  const deleteNotification = (id: number) => {
    const updatedNotifications = notifications.filter((notification) => notification.id !== id)
    setNotifications(updatedNotifications)
    setNotificationCount(updatedNotifications.filter((n) => !n.read).length)
    toast({
      title: "Notification deleted",
      description: "The notification has been deleted.",
    })
  }

  const clearAllNotifications = () => {
    setNotifications([])
    setNotificationCount(0)
    toast({
      title: "All notifications cleared",
      description: "All notifications have been cleared.",
    })
  }

  const displayNotifications =
    activeTab === "all" ? notifications : activeTab === "unread" ? unreadNotifications : readNotifications

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground">Manage your notifications</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Notification Center</CardTitle>
              <CardDescription>View and manage your notifications.</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={markAllAsRead} disabled={unreadNotifications.length === 0}>
                <Check className="mr-2 h-4 w-4" />
                Mark All as Read
              </Button>
              <Button variant="outline" onClick={clearAllNotifications} disabled={notifications.length === 0}>
                <Trash className="mr-2 h-4 w-4" />
                Clear All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">
                All
                <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs">{notifications.length}</span>
              </TabsTrigger>
              <TabsTrigger value="unread">
                Unread
                <span className="ml-2 rounded-full bg-primary/20 px-2 py-0.5 text-xs">
                  {unreadNotifications.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="read">
                Read
                <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs">{readNotifications.length}</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              {displayNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Bell className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium">No notifications</h3>
                  <p className="text-muted-foreground">
                    {activeTab === "all"
                      ? "You don't have any notifications yet."
                      : activeTab === "unread"
                        ? "You don't have any unread notifications."
                        : "You don't have any read notifications."}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {displayNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start justify-between p-4 rounded-lg border ${notification.read ? "bg-background" : "bg-primary/5 border-primary/20"}`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{notification.title}</h4>
                          {!notification.read && <span className="h-2 w-2 rounded-full bg-blue-500"></span>}
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.description}</p>
                      </div>
                      <div className="flex gap-2">
                        {!notification.read && (
                          <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                            <Check className="h-4 w-4" />
                            <span className="sr-only">Mark as read</span>
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

