const React = require("react")
const { cn } = require("@/lib/utils")

function Skeleton({ className, ...props }) {
  return React.createElement("div", {
    className: cn("animate-pulse rounded-md bg-muted", className),
    ...props
  })
}

module.exports = { Skeleton }
