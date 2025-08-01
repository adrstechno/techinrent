const React = require("react")
const CheckboxPrimitive = require("@radix-ui/react-checkbox")
const { Check } = require("lucide-react")
const { cn } = require("@/lib/utils")

const Checkbox = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement(CheckboxPrimitive.Root, {
    ref: ref,
    className: cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    ),
    ...props
  }, React.createElement(CheckboxPrimitive.Indicator, {
    className: cn("flex items-center justify-center text-current")
  }, React.createElement(Check, {
    className: "h-4 w-4"
  })))
})
Checkbox.displayName = CheckboxPrimitive.Root.displayName

module.exports = { Checkbox }
