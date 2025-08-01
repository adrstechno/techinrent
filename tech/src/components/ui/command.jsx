import { forwardRef, createElement } from "react"
import { Command as _Command, Input, List, Empty, Group, Separator, Item } from "cmdk"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const Command = forwardRef(({ className, ...props }, ref) => {
  return createElement(_Command, {
    ref: ref,
    className: cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    ),
    ...props
  })
})
Command.displayName = _Command.displayName

const CommandDialog = ({ children, ...props }) => {
  return createElement(Dialog, props,
    createElement(DialogContent, {
      className: "overflow-hidden p-0 shadow-lg"
    }, createElement(Command, {
      className: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"
    }, children))
  )
}
const CommandInput = forwardRef(({ className, ...props }, ref) => {
  return createElement("div", {
    className: "flex items-center border-b px-3"
  }, createElement(Search, {
    className: "mr-2 h-4 w-4 shrink-0 opacity-50"
  }), createElement(Input, {
    ref: ref,
    className: cn(
      "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
      className
    ),
    ...props
  }))
})
CommandInput.displayName = Input.displayName

const CommandList = forwardRef(({ className, ...props }, ref) => {
  return createElement(List, {
    ref: ref,
    className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className),
    ...props
  })
})
CommandList.displayName = List.displayName
const CommandEmpty = forwardRef((props, ref) => {
  return createElement(Empty, {
    ref: ref,
    className: "py-6 text-center text-sm",
    ...props
  })
})
CommandEmpty.displayName = Empty.displayName

const CommandGroup = forwardRef(({ className, ...props }, ref) => {
  return createElement(Group, {
    ref: ref,
    className: cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    ),
    ...props
  })
})
CommandGroup.displayName = Group.displayName

const CommandSeparator = forwardRef(({ className, ...props }, ref) => {
  return createElement(Separator, {
    ref: ref,
    className: cn("-mx-1 h-px bg-border", className),
    ...props
  })
})
CommandSeparator.displayName = Separator.displayName
const CommandItem = forwardRef(({ className, ...props }, ref) => {
  return createElement(Item, {
    ref: ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50",
      className
    ),
    ...props
  })
})
CommandItem.displayName = Item.displayName

const CommandShortcut = ({ className, ...props }) => {
  return createElement("span", {
    className: cn(
      "ml-auto text-xs tracking-widest text-muted-foreground",
      className
    ),
    ...props
  })
}
CommandShortcut.displayName = "CommandShortcut"

export  {
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
