const React = require("react")
const ContextMenuPrimitive = require("@radix-ui/react-context-menu")
const { Check, ChevronRight, Circle } = require("lucide-react")
const { cn } = require("@/lib/utils")

const ContextMenu = ContextMenuPrimitive.Root
const ContextMenuTrigger = ContextMenuPrimitive.Trigger
const ContextMenuGroup = ContextMenuPrimitive.Group
const ContextMenuPortal = ContextMenuPrimitive.Portal
const ContextMenuSub = ContextMenuPrimitive.Sub
const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup

const ContextMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => {
  return React.createElement(ContextMenuPrimitive.SubTrigger, {
    ref: ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className
    ),
    ...props
  }, children, React.createElement(ChevronRight, {
    className: "ml-auto h-4 w-4"
  }))
})
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName
const ContextMenuSubContent = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement(ContextMenuPrimitive.SubContent, {
    ref: ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  })
})
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName

const ContextMenuContent = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement(ContextMenuPrimitive.Portal, null,
    React.createElement(ContextMenuPrimitive.Content, {
      ref: ref,
      className: cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      ),
      ...props
    })
  )
})
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName
const ContextMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => {
  return React.createElement(ContextMenuPrimitive.Item, {
    ref: ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  })
})
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName

const ContextMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => {
  return React.createElement(ContextMenuPrimitive.CheckboxItem, {
    ref: ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked: checked,
    ...props
  }, React.createElement("span", {
    className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center"
  }, React.createElement(ContextMenuPrimitive.ItemIndicator, null,
    React.createElement(Check, {
      className: "h-4 w-4"
    })
  )), children)
})
ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName
const ContextMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => {
  return React.createElement(ContextMenuPrimitive.RadioItem, {
    ref: ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props
  }, React.createElement("span", {
    className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center"
  }, React.createElement(ContextMenuPrimitive.ItemIndicator, null,
    React.createElement(Circle, {
      className: "h-2 w-2 fill-current"
    })
  )), children)
})
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName

const ContextMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => {
  return React.createElement(ContextMenuPrimitive.Label, {
    ref: ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold text-foreground",
      inset && "pl-8",
      className
    ),
    ...props
  })
})
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName
const ContextMenuSeparator = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement(ContextMenuPrimitive.Separator, {
    ref: ref,
    className: cn("-mx-1 my-1 h-px bg-border", className),
    ...props
  })
})
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName

const ContextMenuShortcut = ({ className, ...props }) => {
  return React.createElement("span", {
    className: cn(
      "ml-auto text-xs tracking-widest text-muted-foreground",
      className
    ),
    ...props
  })
}
ContextMenuShortcut.displayName = "ContextMenuShortcut"

module.exports = {
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
