const React = require("react")
const CommandPrimitive = require("cmdk")
const { Search } = require("lucide-react")
const { cn } = require("@/lib/utils")
const { Dialog, DialogContent } = require("@/components/ui/dialog")

const Command = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement(CommandPrimitive.Command, {
    ref: ref,
    className: cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    ),
    ...props
  })
})
Command.displayName = CommandPrimitive.Command.displayName

const CommandDialog = ({ children, ...props }) => {
  return React.createElement(Dialog, props,
    React.createElement(DialogContent, {
      className: "overflow-hidden p-0 shadow-lg"
    }, React.createElement(Command, {
      className: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"
    }, children))
  )
}
const CommandInput = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement("div", {
    className: "flex items-center border-b px-3"
  }, React.createElement(Search, {
    className: "mr-2 h-4 w-4 shrink-0 opacity-50"
  }), React.createElement(CommandPrimitive.Input, {
    ref: ref,
    className: cn(
      "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
      className
    ),
    ...props
  }))
})
CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement(CommandPrimitive.List, {
    ref: ref,
    className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className),
    ...props
  })
})
CommandList.displayName = CommandPrimitive.List.displayName
const CommandEmpty = React.forwardRef((props, ref) => {
  return React.createElement(CommandPrimitive.Empty, {
    ref: ref,
    className: "py-6 text-center text-sm",
    ...props
  })
})
CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement(CommandPrimitive.Group, {
    ref: ref,
    className: cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    ),
    ...props
  })
})
CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandSeparator = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement(CommandPrimitive.Separator, {
    ref: ref,
    className: cn("-mx-1 h-px bg-border", className),
    ...props
  })
})
CommandSeparator.displayName = CommandPrimitive.Separator.displayName
const CommandItem = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement(CommandPrimitive.Item, {
    ref: ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50",
      className
    ),
    ...props
  })
})
CommandItem.displayName = CommandPrimitive.Item.displayName

const CommandShortcut = ({ className, ...props }) => {
  return React.createElement("span", {
    className: cn(
      "ml-auto text-xs tracking-widest text-muted-foreground",
      className
    ),
    ...props
  })
}
CommandShortcut.displayName = "CommandShortcut"

module.exports = {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
