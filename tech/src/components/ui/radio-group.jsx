import { forwardRef, createElement } from "react"
import { Root, Item, Indicator } from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"
import { cn } from "@/lib/utils"

const RadioGroup = forwardRef(({ className, ...props }, ref) => {
  return createElement(Root, {
    className: cn("grid gap-2", className),
    ...props,
    ref: ref
  })
})
RadioGroup.displayName = Root.displayName

const RadioGroupItem = forwardRef(({ className, ...props }, ref) => {
  return createElement(Item, {
    ref: ref,
    className: cn(
      "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    ),
    ...props
  }, createElement(Indicator, {
    className: "flex items-center justify-center"
  }, createElement(Circle, {
    className: "h-2.5 w-2.5 fill-current text-current"
  })))
})
RadioGroupItem.displayName = Item.displayName

export  { RadioGroup, RadioGroupItem }
