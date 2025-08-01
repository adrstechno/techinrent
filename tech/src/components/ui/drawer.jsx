import { createElement, forwardRef } from "react"
import { Root, Trigger, Portal, Close, Overlay, Content, Title, Description } from "vaul"
import { cn } from "@/lib/utils"

const Drawer = ({ shouldScaleBackground = true, ...props }) => {
  return createElement(Root, {
    shouldScaleBackground: shouldScaleBackground,
    ...props
  })
}
Drawer.displayName = "Drawer"

const DrawerTrigger = Trigger
const DrawerPortal = Portal
const DrawerClose = Close

const DrawerOverlay = forwardRef(({ className, ...props }, ref) => {
  return createElement(Overlay, {
    ref: ref,
    className: cn("fixed inset-0 z-50 bg-black/80", className),
    ...props
  })
})
DrawerOverlay.displayName = Overlay.displayName
const DrawerContent = forwardRef(({ className, children, ...props }, ref) => {
  return createElement(DrawerPortal, null,
    createElement(DrawerOverlay),
    createElement(Content, {
      ref: ref,
      className: cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
        className
      ),
      ...props
    }, createElement("div", {
      className: "mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted"
    }), children)
  )
})
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = ({ className, ...props }) => {
  return createElement("div", {
    className: cn("grid gap-1.5 p-4 text-center sm:text-left", className),
    ...props
  })
}
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({ className, ...props }) => {
  return createElement("div", {
    className: cn("mt-auto flex flex-col gap-2 p-4", className),
    ...props
  })
}
DrawerFooter.displayName = "DrawerFooter"
const DrawerTitle = forwardRef(({ className, ...props }, ref) => {
  return createElement(Title, {
    ref: ref,
    className: cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  })
})
DrawerTitle.displayName = Title.displayName

const DrawerDescription = forwardRef(({ className, ...props }, ref) => {
  return createElement(Description, {
    ref: ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  })
})
DrawerDescription.displayName = Description.displayName

export  {
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
