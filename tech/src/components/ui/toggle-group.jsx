const React = require("react")
const ToggleGroupPrimitive = require("@radix-ui/react-toggle-group")
const { cn } = require("@/lib/utils")
const { toggleVariants } = require("@/components/ui/toggle")

const ToggleGroupContext = React.createContext({
  size: "default",
  variant: "default",
})

const ToggleGroup = React.forwardRef(({ className, variant, size, children, ...props }, ref) => {
  return React.createElement(ToggleGroupPrimitive.Root, {
    ref: ref,
    className: cn("flex items-center justify-center gap-1", className),
    ...props
  }, React.createElement(ToggleGroupContext.Provider, {
    value: { variant, size }
  }, children))
})
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

const ToggleGroupItem = React.forwardRef(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext)
  return React.createElement(ToggleGroupPrimitive.Item, {
    ref: ref,
    className: cn(
      toggleVariants({
        variant: context.variant || variant,
        size: context.size || size,
      }),
      className
    ),
    ...props
  }, children)
})
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

module.exports = { ToggleGroup, ToggleGroupItem }
