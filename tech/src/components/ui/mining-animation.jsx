import { createElement } from "react"
import { cn } from "@/lib/utils"

const MiningAnimation = ({ hashRate, className, ...props }) => {
  return createElement("div", {
    className: cn("flex items-center space-x-2", className),
    ...props
  }, createElement("div", {
    className: "flex items-center space-x-1"
  }, createElement("div", {
    className: "w-2 h-2 bg-green-500 rounded-full animate-pulse"
  }), createElement("span", {
    className: "text-sm text-muted-foreground"
  }, "Mining")), createElement("p", {
    className: "text-sm font-medium"
  }, typeof hashRate === 'number' ? hashRate.toFixed(0) : '0', " TH/s"))
}

MiningAnimation.displayName = "MiningAnimation"

export  { MiningAnimation }