"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info, Eye, EyeOff } from "lucide-react"

const AngelOneLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
        <path d="M12 6L7 18H9.5L10.5 15H13.5L14.5 18H17L12 6ZM11 13L12 9.6L13 13H11Z" fill="currentColor"/>
    </svg>
)


export default function SettingsPage() {
  const { toast } = useToast()
  const [apiKey, setApiKey] = useState("")
  const [tempApiKey, setTempApiKey] = useState("")
  const [isEditing, setIsEditing] = useState(true)
  const [isKeyVisible, setIsKeyVisible] = useState(false)

  const handleSave = () => {
    setApiKey(tempApiKey);
    setIsEditing(false);
    setIsKeyVisible(false);
    toast({
      title: "Settings Saved",
      description: "Your Angel API key has been saved successfully.",
    })
  }

  const handleEdit = () => {
    setTempApiKey(apiKey);
    setIsEditing(true);
    setIsKeyVisible(true);
  }

  const handleCancel = () => {
      setTempApiKey("");
      if (!apiKey) {
          setIsEditing(true);
      } else {
          setIsEditing(false);
      }
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>API Settings</CardTitle>
          <CardDescription>
            Connect your Angel One account to unlock live data and trading.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
                <div className="flex items-center">
                    <AngelOneLogo />
                    <Label htmlFor="api-key" className="text-base font-semibold">Angel One API Key</Label>
                </div>

                {isEditing ? (
                    <div className="relative">
                        <Input
                            id="api-key"
                            placeholder="Enter your Angel API Key"
                            value={tempApiKey}
                            onChange={(e) => setTempApiKey(e.target.value)}
                            type={isKeyVisible ? "text" : "password"}
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
                            onClick={() => setIsKeyVisible(!isKeyVisible)}
                        >
                            {isKeyVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                    </div>
                ) : (
                    <div className="flex items-center justify-between rounded-md border border-input bg-muted px-3 py-2">
                        <span className="text-sm font-mono text-muted-foreground tracking-wider">************{apiKey.slice(-4)}</span>
                    </div>
                )}
            </div>
            <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Feature Coming Soon!</AlertTitle>
                <AlertDescription>
                    Please note: This is a demo application. The API key settings are not yet connected to a live data source. All market data is currently for demonstration purposes only.
                </AlertDescription>
            </Alert>
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4 flex gap-2">
            {isEditing ? (
                <>
                    <Button onClick={handleSave}>Save</Button>
                    {apiKey && <Button variant="outline" onClick={handleCancel}>Cancel</Button>}
                </>
            ) : (
                <Button onClick={handleEdit}>Edit</Button>
            )}
        </CardFooter>
      </Card>
    </div>
  )
}
