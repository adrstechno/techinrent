import { forwardRef, createElement } from "react"
import { Root, Track, Range, Thumb } from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"

const Slider = forwardRef(({ className, ...props }, ref) => {
  return createElement(Root, {
    ref: ref,
    className: cn(
      "relative flex w-full touch-none select-none items-center",
      className
    ),
    ...props
  }, createElement(Track, {
    className: "relative h-2 w-full grow overflow-hidden rounded-full bg-secondary"
  }, createElement(Range, {
    className: "absolute h-full bg-primary"
  })), createElement(Thumb, {
    className: "block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
  }))
})
Slider.displayName = Root.displayName

export  { Slider }
