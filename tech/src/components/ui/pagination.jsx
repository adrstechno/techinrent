const React = require("react")
const { ChevronLeft, ChevronRight, MoreHorizontal } = require("lucide-react")
const { cn } = require("@/lib/utils")
const { buttonVariants } = require("@/components/ui/button")

const Pagination = ({ className, ...props }) => {
  return React.createElement("nav", {
    role: "navigation",
    "aria-label": "pagination",
    className: cn("mx-auto flex w-full justify-center", className),
    ...props
  })
}
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement("ul", {
    ref: ref,
    className: cn("flex flex-row items-center gap-1", className),
    ...props
  })
})
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement("li", {
    ref: ref,
    className: cn("", className),
    ...props
  })
})
PaginationItem.displayName = "PaginationItem"
const PaginationLink = ({ className, isActive, size = "icon", ...props }) => {
  return React.createElement("a", {
    "aria-current": isActive ? "page" : undefined,
    className: cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size: size,
      }),
      className
    ),
    ...props
  })
}
PaginationLink.displayName = "PaginationLink"
const PaginationPrevious = ({ className, ...props }) => {
  return React.createElement(PaginationLink, {
    "aria-label": "Go to previous page",
    size: "default",
    className: cn("gap-1 pl-2.5", className),
    ...props
  }, React.createElement(ChevronLeft, {
    className: "h-4 w-4"
  }), "Previous")
}
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({ className, ...props }) => {
  return React.createElement(PaginationLink, {
    "aria-label": "Go to next page",
    size: "default",
    className: cn("gap-1 pr-2.5", className),
    ...props
  }, "Next", React.createElement(ChevronRight, {
    className: "h-4 w-4"
  }))
}
PaginationNext.displayName = "PaginationNext"
const PaginationEllipsis = ({ className, ...props }) => {
  return React.createElement("span", {
    "aria-hidden": true,
    className: cn("flex h-9 w-9 items-center justify-center", className),
    ...props
  }, React.createElement(MoreHorizontal, {
    className: "h-4 w-4"
  }), React.createElement("span", {
    className: "sr-only"
  }, "More pages"))
}
PaginationEllipsis.displayName = "PaginationEllipsis"

module.exports = {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
