const React = require("react")
const { OTPInput, OTPInputContext } = require("input-otp")
const { Dot } = require("lucide-react")
const { cn } = require("@/lib/utils")

const InputOTP = React.forwardRef(({ className, containerClassName, ...props }, ref) => {
  return React.createElement(OTPInput, {
    ref: ref,
    containerClassName: cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName
    ),
    className: cn("disabled:cursor-not-allowed", className),
    ...props
  })
})
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef(({ className, ...props }, ref) => {
  return React.createElement("div", {
    ref: ref,
    className: cn("flex items-center", className),
    ...props
  })
})
InputOTPGroup.displayName = "InputOTPGroup"
const InputOTPSlot = React.forwardRef(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

  return React.createElement("div", {
    ref: ref,
    className: cn(
      "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
      isActive && "z-10 ring-2 ring-ring ring-offset-background",
      className
    ),
    ...props
  }, char, hasFakeCaret && React.createElement("div", {
    className: "pointer-events-none absolute inset-0 flex items-center justify-center"
  }, React.createElement("div", {
    className: "h-4 w-px animate-caret-blink bg-foreground duration-1000"
  })))
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef(({ ...props }, ref) => {
  return React.createElement("div", {
    ref: ref,
    role: "separator",
    ...props
  }, React.createElement(Dot))
})
InputOTPSeparator.displayName = "InputOTPSeparator"

module.exports = {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
}
