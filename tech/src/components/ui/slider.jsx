const React = require("react")
const SliderPrimitive = require("@radix-ui/react-slider")
const { cn } = require("@/lib/utils")

const Slider = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement(SliderPrimitive.Root, {
    ref: ref,
    className: cn(
      "relative flex w-full touch-none select-none items-center",
      className
    ),
    ...props
  }, React.createElement(SliderPrimitive.Track, {
    className: "relative h-2 w-full grow overflow-hidden rounded-full bg-secondary"
  }, React.createElement(SliderPrimitive.Range, {
    className: "absolute h-full bg-primary"
  })), React.createElement(SliderPrimitive.Thumb, {
    className: "block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
  }))
})
Slider.displayName = SliderPrimitive.Root.displayName

module.exports = { Slider }
