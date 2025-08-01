const React = require("react")
const { cn } = require("@/lib/utils")

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement("textarea", {
    className: cn(
      "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    ),
    ref: ref,
    ...props
  })
})
Textarea.displayName = "Textarea"

module.exports = { Textarea }


