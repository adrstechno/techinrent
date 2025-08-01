const React = require("react")
const SeparatorPrimitive = require("@radix-ui/react-separator")
const { cn } = require("@/lib/utils")

const Separator = React.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => {
  return React.createElement(SeparatorPrimitive.Root, {
    ref: ref,
    decorative: decorative,
    orientation: orientation,
    className: cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className
    ),
    ...props
  })
})
Separator.displayName = SeparatorPrimitive.Root.displayName

module.exports = { Separator }
