const React = require("react")
const AvatarPrimitive = require("@radix-ui/react-avatar")
const { cn } = require("@/lib/utils")

const Avatar = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement(AvatarPrimitive.Root, {
    ref: ref,
    className: cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    ),
    ...props
  })
})
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement(AvatarPrimitive.Image, {
    ref: ref,
    className: cn("aspect-square h-full w-full", className),
    ...props
  })
})
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement(AvatarPrimitive.Fallback, {
    ref: ref,
    className: cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    ),
    ...props
  })
})
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

module.exports = {
  Avatar,
  AvatarImage,
  AvatarFallback,
}
