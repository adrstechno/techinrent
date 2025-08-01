import { forwardRef, createElement } from "react"
import { Root, Trigger, Group, Portal, Sub, RadioGroup, SubTrigger, SubContent, Content, Item, CheckboxItem, ItemIndicator, RadioItem, Label, Separator } from "@radix-ui/react-context-menu"
import { Check, ChevronRight, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

const ContextMenu = Root
const ContextMenuTrigger = Trigger
const ContextMenuGroup = Group
const ContextMenuPortal = Portal
const ContextMenuSub = Sub
const ContextMenuRadioGroup = RadioGroup

const ContextMenuSubTrigger = forwardRef(({ className, inset, children, ...props }, ref) => {
  return createElement(SubTrigger, {
    ref: ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className
    ),
    ...props
  }, children, createElement(ChevronRight, {
    className: "ml-auto h-4 w-4"
  }))
})
ContextMenuSubTrigger.displayName = SubTrigger.displayName
const ContextMenuSubContent = forwardRef(({ className, ...props }, ref) => {
  return createElement(SubContent, {
    ref: ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  })
})
ContextMenuSubContent.displayName = SubContent.displayName

const ContextMenuContent = forwardRef(({ className, ...props }, ref) => {
  return createElement(Portal, null,
    createElement(Content, {
      ref: ref,
      className: cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      ),
      ...props
    })
  )
})
ContextMenuContent.displayName = Content.displayName
const ContextMenuItem = forwardRef(({ className, inset, ...props }, ref) => {
  return createElement(Item, {
    ref: ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  })
})
ContextMenuItem.displayName = Item.displayName

const ContextMenuCheckboxItem = forwardRef(({ className, children, checked, ...props }, ref) => {
  return createElement(CheckboxItem, {
    ref: ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked: checked,
    ...props
  }, createElement("span", {
    className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center"
  }, createElement(ItemIndicator, null,
    createElement(Check, {
      className: "h-4 w-4"
    })
  )), children)
})
ContextMenuCheckboxItem.displayName = CheckboxItem.displayName
const ContextMenuRadioItem = forwardRef(({ className, children, ...props }, ref) => {
  return createElement(RadioItem, {
    ref: ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props
  }, createElement("span", {
    className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center"
  }, createElement(ItemIndicator, null,
    createElement(Circle, {
      className: "h-2 w-2 fill-current"
    })
  )), children)
})
ContextMenuRadioItem.displayName = RadioItem.displayName

const ContextMenuLabel = forwardRef(({ className, inset, ...props }, ref) => {
  return createElement(Label, {
    ref: ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold text-foreground",
      inset && "pl-8",
      className
    ),
    ...props
  })
})
ContextMenuLabel.displayName = Label.displayName
const ContextMenuSeparator = forwardRef(({ className, ...props }, ref) => {
  return createElement(Separator, {
    ref: ref,
    className: cn("-mx-1 my-1 h-px bg-border", className),
    ...props
  })
})
ContextMenuSeparator.displayName = Separator.displayName

const ContextMenuShortcut = ({ className, ...props }) => {
  return createElement("span", {
    className: cn(
      "ml-auto text-xs tracking-widest text-muted-foreground",
      className
    ),
    ...props
  })
}
ContextMenuShortcut.displayName = "ContextMenuShortcut"

export  {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}
