const React = require("react")
const ScrollAreaPrimitive = require("@radix-ui/react-scroll-area")
const { cn } = require("@/lib/utils")

const ScrollArea = React.forwardRef(({ className, children, ...props }, ref) => {
  return React.createElement(ScrollAreaPrimitive.Root, {
    ref: ref,
    className: cn("relative overflow-hidden", className),
    ...props
  }, React.createElement(ScrollAreaPrimitive.Viewport, {
    className: "h-full w-full rounded-[inherit]"
  }, children), React.createElement(ScrollBar), React.createElement(ScrollAreaPrimitive.Corner))
})
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName
const ScrollBar = React.forwardRef(({ className, orientation = "vertical", ...props }, ref) => {
  return React.createElement(ScrollAreaPrimitive.Scrollbar, {
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
  }, React.createElement(ScrollAreaPrimitive.Thumb, {
    className: "relative flex-1 rounded-full bg-border"
  }))
})
ScrollBar.displayName = ScrollAreaPrimitive.Scrollbar.displayName

module.exports = { ScrollArea, ScrollBar }
