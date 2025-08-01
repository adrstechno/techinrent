import { createElement } from "react"
import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }) {
  return createElement("div", {
    className: cn("animate-pulse rounded-md bg-muted", className),
    ...props
  })
}

export  { Skeleton }
