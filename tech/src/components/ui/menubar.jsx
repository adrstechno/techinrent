const React = require("react")
const MenubarPrimitive = require("@radix-ui/react-menubar")
const { Check, ChevronRight, Circle } = require("lucide-react")
const { cn } = require("@/lib/utils")

const MenubarMenu = MenubarPrimitive.Menu
const MenubarGroup = MenubarPrimitive.Group
const MenubarPortal = MenubarPrimitive.Portal
const MenubarSub = MenubarPrimitive.Sub
const MenubarRadioGroup = MenubarPrimitive.RadioGroup

const Menubar = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement(MenubarPrimitive.Root, {
    ref: ref,
    className: cn(
      "flex h-10 items-center space-x-1 rounded-md border bg-background p-1",
      className
    ),
    ...props
  })
})
Menubar.displayName = MenubarPrimitive.Root.displayName

const MenubarTrigger = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement(MenubarPrimitive.Trigger, {
    ref: ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      className
    ),
    ...props
  })
})
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName
const MenubarSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => {
  return React.createElement(MenubarPrimitive.SubTrigger, {
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
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName

const MenubarSubContent = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement(MenubarPrimitive.SubContent, {
    ref: ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  })
})
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName
const MenubarContent = React.forwardRef(({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }, ref) => {
  return React.createElement(MenubarPrimitive.Portal, null,
    React.createElement(MenubarPrimitive.Content, {
      ref: ref,
      align: align,
      alignOffset: alignOffset,
      sideOffset: sideOffset,
      className: cn(
        "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      ),
      ...props
    })
  )
})
MenubarContent.displayName = MenubarPrimitive.Content.displayName
const MenubarItem = React.forwardRef(({ className, inset, ...props }, ref) => {
  return React.createElement(MenubarPrimitive.Item, {
    ref: ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  })
})
MenubarItem.displayName = MenubarPrimitive.Item.displayName

const MenubarCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => {
  return React.createElement(MenubarPrimitive.CheckboxItem, {
    ref: ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked: checked,
    ...props
  }, React.createElement("span", {
    className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center"
  }, React.createElement(MenubarPrimitive.ItemIndicator, null,
    React.createElement(Check, {
      className: "h-4 w-4"
    })
  )), children)
})
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName
const MenubarRadioItem = React.forwardRef(({ className, children, ...props }, ref) => {
  return React.createElement(MenubarPrimitive.RadioItem, {
    ref: ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props
  }, React.createElement("span", {
    className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center"
  }, React.createElement(MenubarPrimitive.ItemIndicator, null,
    React.createElement(Circle, {
      className: "h-2 w-2 fill-current"
    })
  )), children)
})
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName

const MenubarLabel = React.forwardRef(({ className, inset, ...props }, ref) => {
  return React.createElement(MenubarPrimitive.Label, {
    ref: ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    ),
    ...props
  })
})
MenubarLabel.displayName = MenubarPrimitive.Label.displayName
const MenubarSeparator = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement(MenubarPrimitive.Separator, {
    ref: ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  })
})
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName

const MenubarShortcut = ({ className, ...props }) => {
  return React.createElement("span", {
    className: cn(
      "ml-auto text-xs tracking-widest text-muted-foreground",
      className
    ),
    ...props
  })
}
MenubarShortcut.displayName = "MenubarShortcut"

module.exports = {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
}
