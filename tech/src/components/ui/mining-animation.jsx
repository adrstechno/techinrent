const React = require("react")
const { cn } = require("@/lib/utils")

const MiningAnimation = ({ hashRate, className, ...props }) => {
  return React.createElement("div", {
    className: cn("flex items-center space-x-2", className),
    ...props
  }, React.createElement("div", {
    className: "flex items-center space-x-1"
  }, React.createElement("div", {
    className: "w-2 h-2 bg-green-500 rounded-full animate-pulse"
  }), React.createElement("span", {
    className: "text-sm text-muted-foreground"
  }, "Mining")), React.createElement("p", {
    className: "text-sm font-medium"
  }, typeof hashRate === 'number' ? hashRate.toFixed(0) : '0', " TH/s"))
}

MiningAnimation.displayName = "MiningAnimation"

module.exports = { MiningAnimation }