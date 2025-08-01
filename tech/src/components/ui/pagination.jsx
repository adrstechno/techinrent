import { createElement, forwardRef } from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const Pagination = ({ className, ...props }) => {
  return createElement("nav", {
    role: "navigation",
    "aria-label": "pagination",
    className: cn("mx-auto flex w-full justify-center", className),
    ...props
  })
}
Pagination.displayName = "Pagination"

const PaginationContent = forwardRef(({ className, ...props }, ref) => {
  return createElement("ul", {
    ref: ref,
    className: cn("flex flex-row items-center gap-1", className),
    ...props
  })
})
PaginationContent.displayName = "PaginationContent"

const PaginationItem = forwardRef(({ className, ...props }, ref) => {
  return createElement("li", {
    ref: ref,
    className: cn("", className),
    ...props
  })
})
PaginationItem.displayName = "PaginationItem"
const PaginationLink = ({ className, isActive, size = "icon", ...props }) => {
  return createElement("a", {
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
  return createElement(PaginationLink, {
    "aria-label": "Go to previous page",
    size: "default",
    className: cn("gap-1 pl-2.5", className),
    ...props
  }, createElement(ChevronLeft, {
    className: "h-4 w-4"
  }), "Previous")
}
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({ className, ...props }) => {
  return createElement(PaginationLink, {
    "aria-label": "Go to next page",
    size: "default",
    className: cn("gap-1 pr-2.5", className),
    ...props
  }, "Next", createElement(ChevronRight, {
    className: "h-4 w-4"
  }))
}
PaginationNext.displayName = "PaginationNext"
const PaginationEllipsis = ({ className, ...props }) => {
  return createElement("span", {
    "aria-hidden": true,
    className: cn("flex h-9 w-9 items-center justify-center", className),
    ...props
  }, createElement(MoreHorizontal, {
    className: "h-4 w-4"
  }), createElement("span", {
    className: "sr-only"
  }, "More pages"))
}
PaginationEllipsis.displayName = "PaginationEllipsis"

export  {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
