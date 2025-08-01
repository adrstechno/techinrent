import { forwardRef, createElement } from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

const Breadcrumb = forwardRef(({ ...props }, ref) => {
  return createElement("nav", {
    ref: ref,
    "aria-label": "breadcrumb",
    ...props
  })
})
Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbList = forwardRef(({ className, ...props }, ref) => {
  return createElement("ol", {
    ref: ref,
    className: cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
      className
    ),
    ...props
  })
})
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = forwardRef(({ className, ...props }, ref) => {
  return createElement("li", {
    ref: ref,
    className: cn("inline-flex items-center gap-1.5", className),
    ...props
  })
})
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = forwardRef(({ asChild = false, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"
  return createElement(Comp, {
    ref: ref,
    className: cn("transition-colors hover:text-foreground", className),
    ...props
  })
})
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = forwardRef(({ className, ...props }, ref) => {
  return createElement("span", {
    ref: ref,
    role: "link",
    "aria-disabled": "true",
    "aria-current": "page",
    className: cn("font-normal text-foreground", className),
    ...props
  })
})
BreadcrumbPage.displayName = "BreadcrumbPage"

const BreadcrumbSeparator = ({ children, className, ...props }) => {
  return createElement("li", {
    role: "presentation",
    "aria-hidden": "true",
    className: cn("[&>svg]:size-3.5", className),
    ...props
  }, children ?? createElement(ChevronRight))
}
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

const BreadcrumbEllipsis = ({ className, ...props }) => {
  return createElement("span", {
    role: "presentation",
    "aria-hidden": "true",
    className: cn("flex h-9 w-9 items-center justify-center", className),
    ...props
  }, createElement(MoreHorizontal, {
    className: "h-4 w-4"
  }), createElement("span", {
    className: "sr-only"
  }, "More"))
}
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis"

export  {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
