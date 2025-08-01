const React = require("react")
const RadioGroupPrimitive = require("@radix-ui/react-radio-group")
const { Circle } = require("lucide-react")
const { cn } = require("@/lib/utils")

const RadioGroup = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement(RadioGroupPrimitive.Root, {
    className: cn("grid gap-2", className),
    ...props,
    ref: ref
  })
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement(RadioGroupPrimitive.Item, {
    ref: ref,
    className: cn(
      "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    ),
    ...props
  }, React.createElement(RadioGroupPrimitive.Indicator, {
    className: "flex items-center justify-center"
  }, React.createElement(Circle, {
    className: "h-2.5 w-2.5 fill-current text-current"
  })))
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

module.exports = { RadioGroup, RadioGroupItem }
