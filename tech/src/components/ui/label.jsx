const React = require("react")
const { Root } = require("@radix-ui/react-label")
const { cva } = require("class-variance-authority")
const { cn } = require("@/lib/utils")

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement(Root, {
    ref: ref,
    className: cn(labelVariants(), className),
    ...props
  })
})
Label.displayName = Root.displayName

module.exports = { Label }

