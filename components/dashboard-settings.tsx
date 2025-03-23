"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Check, Moon, Save, Sun } from "lucide-react"

export function DashboardSettings() {
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      browser: true,
      sms: false,
    },
    privacy: {
      shareData: false,
      collectAnalytics: true,
      storeHistory: true,
    },
    appearance: {
      theme: theme || "light",
      sidebarCollapsed: false,
      denseMode: false,
      animationsEnabled: true,
    },
  })

  const handleSaveSettings = () => {
    // In a real app, this would save to a backend
    localStorage.setItem("dashboard-settings", JSON.stringify(settings))
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your dashboard preferences</p>
      </div>

      <Tabs defaultValue="appearance">
        <TabsList className="mb-4">
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how the dashboard looks and feels.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Theme</h3>
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <Button
                      variant={theme === "light" ? "default" : "outline"}
                      className="flex items-center gap-2 justify-start"
                      onClick={() => {
                        setTheme("light")
                        setSettings({
                          ...settings,
                          appearance: {
                            ...settings.appearance,
                            theme: "light",
                          },
                        })
                      }}
                    >
                      <Sun className="h-5 w-5" />
                      Light
                      {theme === "light" && <Check className="ml-auto h-4 w-4" />}
                    </Button>
                    <Button
                      variant={theme === "dark" ? "default" : "outline"}
                      className="flex items-center gap-2 justify-start"
                      onClick={() => {
                        setTheme("dark")
                        setSettings({
                          ...settings,
                          appearance: {
                            ...settings.appearance,
                            theme: "dark",
                          },
                        })
                      }}
                    >
                      <Moon className="h-5 w-5" />
                      Dark
                      {theme === "dark" && <Check className="ml-auto h-4 w-4" />}
                    </Button>
                    <Button
                      variant={theme === "system" ? "default" : "outline"}
                      className="flex items-center gap-2 justify-start"
                      onClick={() => {
                        setTheme("system")
                        setSettings({
                          ...settings,
                          appearance: {
                            ...settings.appearance,
                            theme: "system",
                          },
                        })
                      }}
                    >
                      <span className="flex h-5 w-5 items-center justify-center">
                        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      </span>
                      System
                      {theme === "system" && <Check className="ml-auto h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sidebar-collapsed">Collapsed Sidebar</Label>
                    <Switch
                      id="sidebar-collapsed"
                      checked={settings.appearance.sidebarCollapsed}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          appearance: {
                            ...settings.appearance,
                            sidebarCollapsed: checked,
                          },
                        })
                      }
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    When enabled, the sidebar will be collapsed by default.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="dense-mode">Dense Mode</Label>
                    <Switch
                      id="dense-mode"
                      checked={settings.appearance.denseMode}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          appearance: {
                            ...settings.appearance,
                            denseMode: checked,
                          },
                        })
                      }
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">When enabled, UI elements will be more compact.</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="animations">Enable Animations</Label>
                    <Switch
                      id="animations"
                      checked={settings.appearance.animationsEnabled}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          appearance: {
                            ...settings.appearance,
                            animationsEnabled: checked,
                          },
                        })
                      }
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">When enabled, UI elements will have animations.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Configure how you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <Switch
                      id="email-notifications"
                      checked={settings.notifications.email}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          notifications: {
                            ...settings.notifications,
                            email: checked,
                          },
                        })
                      }
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">Receive notifications via email.</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <Switch
                      id="push-notifications"
                      checked={settings.notifications.push}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          notifications: {
                            ...settings.notifications,
                            push: checked,
                          },
                        })
                      }
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">Receive push notifications on your device.</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="browser-notifications">Browser Notifications</Label>
                    <Switch
                      id="browser-notifications"
                      checked={settings.notifications.browser}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          notifications: {
                            ...settings.notifications,
                            browser: checked,
                          },
                        })
                      }
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">Receive notifications in your browser.</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-notifications">SMS Notifications</Label>
                    <Switch
                      id="sms-notifications"
                      checked={settings.notifications.sms}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          notifications: {
                            ...settings.notifications,
                            sms: checked,
                          },
                        })
                      }
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">Receive notifications via SMS.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy</CardTitle>
              <CardDescription>Manage your privacy settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="share-data">Share Usage Data</Label>
                    <Switch
                      id="share-data"
                      checked={settings.privacy.shareData}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          privacy: {
                            ...settings.privacy,
                            shareData: checked,
                          },
                        })
                      }
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Share anonymous usage data to help improve our services.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="collect-analytics">Collect Analytics</Label>
                    <Switch
                      id="collect-analytics"
                      checked={settings.privacy.collectAnalytics}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          privacy: {
                            ...settings.privacy,
                            collectAnalytics: checked,
                          },
                        })
                      }
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">Allow us to collect analytics data on your usage.</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="store-history">Store History</Label>
                    <Switch
                      id="store-history"
                      checked={settings.privacy.storeHistory}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          privacy: {
                            ...settings.privacy,
                            storeHistory: checked,
                          },
                        })
                      }
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Store your activity history for personalized experiences.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings}>
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}

