const React = require("react")
const AccordionPrimitive = require("@radix-ui/react-accordion")
const { ChevronDown } = require("lucide-react")
const { cn } = require("@/lib/utils")

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement(AccordionPrimitive.Item, {
    ref: ref,
    className: cn("border-b", className),
    ...props
  })
})
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => {
  return React.createElement(AccordionPrimitive.Header, {
    className: "flex"
  }, React.createElement(AccordionPrimitive.Trigger, {
    ref: ref,
    className: cn(
      "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props
  }, children, React.createElement(ChevronDown, {
    className: "h-4 w-4 shrink-0 transition-transform duration-200"
  })))
})
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => {
  return React.createElement(AccordionPrimitive.Content, {
    ref: ref,
    className: "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props
  }, React.createElement("div", {
    className: cn("pb-4 pt-0", className)
  }, children))
})
AccordionContent.displayName = AccordionPrimitive.Content.displayName

module.exports = {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
}
