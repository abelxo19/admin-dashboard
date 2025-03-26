import { useState } from "react"

type Toast = {
  title: string
  description?: string
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = (newToast: Toast) => {
    setToasts((prevToasts) => [...prevToasts, newToast])
    // Automatically remove the toast after a delay (e.g., 3 seconds)
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.slice(1))
    }, 3000)
  }

  return { toast, toasts }
}