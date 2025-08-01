const React = require("react")
const { Slot } = require("@radix-ui/react-slot")
const { ChevronRight, MoreHorizontal } = require("lucide-react")
const { cn } = require("@/lib/utils")

const Breadcrumb = React.forwardRef(({ ...props }, ref) => {
  return React.createElement("nav", {
    ref: ref,
    "aria-label": "breadcrumb",
    ...props
  })
})
Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbList = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement("ol", {
    ref: ref,
    className: cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
      className
    ),
    ...props
  })
})
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement("li", {
    ref: ref,
    className: cn("inline-flex items-center gap-1.5", className),
    ...props
  })
})
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef(({ asChild = false, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"
  return React.createElement(Comp, {
    ref: ref,
    className: cn("transition-colors hover:text-foreground", className),
    ...props
  })
})
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement("span", {
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
  return React.createElement("li", {
    role: "presentation",
    "aria-hidden": "true",
    className: cn("[&>svg]:size-3.5", className),
    ...props
  }, children ?? React.createElement(ChevronRight))
}
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

const BreadcrumbEllipsis = ({ className, ...props }) => {
  return React.createElement("span", {
    role: "presentation",
    "aria-hidden": "true",
    className: cn("flex h-9 w-9 items-center justify-center", className),
    ...props
  }, React.createElement(MoreHorizontal, {
    className: "h-4 w-4"
  }), React.createElement("span", {
    className: "sr-only"
  }, "More"))
}
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis"

module.exports = {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
