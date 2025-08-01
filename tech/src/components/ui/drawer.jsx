const React = require("react")
const DrawerPrimitive = require("vaul")
const { cn } = require("@/lib/utils")

const Drawer = ({ shouldScaleBackground = true, ...props }) => {
  return React.createElement(DrawerPrimitive.Root, {
    shouldScaleBackground: shouldScaleBackground,
    ...props
  })
}
Drawer.displayName = "Drawer"

const DrawerTrigger = DrawerPrimitive.Trigger
const DrawerPortal = DrawerPrimitive.Portal
const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement(DrawerPrimitive.Overlay, {
    ref: ref,
    className: cn("fixed inset-0 z-50 bg-black/80", className),
    ...props
  })
})
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName
const DrawerContent = React.forwardRef(({ className, children, ...props }, ref) => {
  return React.createElement(DrawerPortal, null,
    React.createElement(DrawerOverlay),
    React.createElement(DrawerPrimitive.Content, {
      ref: ref,
      className: cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
        className
      ),
      ...props
    }, React.createElement("div", {
      className: "mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted"
    }), children)
  )
})
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = ({ className, ...props }) => {
  return React.createElement("div", {
    className: cn("grid gap-1.5 p-4 text-center sm:text-left", className),
    ...props
  })
}
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({ className, ...props }) => {
  return React.createElement("div", {
    className: cn("mt-auto flex flex-col gap-2 p-4", className),
    ...props
  })
}
DrawerFooter.displayName = "DrawerFooter"
const DrawerTitle = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement(DrawerPrimitive.Title, {
    ref: ref,
    className: cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  })
})
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement(DrawerPrimitive.Description, {
    ref: ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  })
})
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

module.exports = {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
