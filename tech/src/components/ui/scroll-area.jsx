import { forwardRef, createElement } from "react"
import { Root, Viewport, Corner, Scrollbar, Thumb } from "@radix-ui/react-scroll-area"
import { cn } from "@/lib/utils"

const ScrollArea = forwardRef(({ className, children, ...props }, ref) => {
  return createElement(Root, {
    ref: ref,
    className: cn("relative overflow-hidden", className),
    ...props
  }, createElement(Viewport, {
    className: "h-full w-full rounded-[inherit]"
  }, children), createElement(ScrollBar), createElement(Corner))
})
ScrollArea.displayName = Root.displayName
const ScrollBar = forwardRef(({ className, orientation = "vertical", ...props }, ref) => {
  return createElement(Scrollbar, {
    ref: ref,
    orientation: orientation,
    className: cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    ),
    ...props
  }, createElement(Thumb, {
    className: "relative flex-1 rounded-full bg-border"
  }))
})
ScrollBar.displayName = Scrollbar.displayName

export  { ScrollArea, ScrollBar }
