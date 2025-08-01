const React = require("react")
const LabelPrimitive = require("@radix-ui/react-label")
const { Slot } = require("@radix-ui/react-slot")
const {
  Controller,
  FormProvider,
  useFormContext,
} = require("react-hook-form")
const { cn } = require("@/lib/utils")
const { Label } = require("@/components/ui/label")

const Form = FormProvider

const FormFieldContext = React.createContext({})

const FormField = ({ ...props }) => {
  return React.createElement(FormFieldContext.Provider, {
    value: { name: props.name }
  }, React.createElement(Controller, props))
}

const FormItemContext = React.createContext({})

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id: fieldContext.name,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}
const FormItem = React.forwardRef(({ className, ...props }, ref) => {
  const id = React.useId()
  return React.createElement(FormItemContext.Provider, {
    value: { id }
  }, React.createElement("div", {
    ref: ref,
    className: cn("space-y-2", className),
    ...props
  }))
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()
  return React.createElement(Label, {
    ref: ref,
    className: cn(error && "text-destructive", className),
    htmlFor: formItemId,
    ...props
  })
})
FormLabel.displayName = "FormLabel"
const FormControl = React.forwardRef(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()
  return React.createElement(Slot, {
    ref: ref,
    id: formItemId,
    "aria-describedby": !error
      ? `${formDescriptionId}`
      : `${formDescriptionId} ${formMessageId}`,
    "aria-invalid": !!error,
    ...props
  })
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()
  return React.createElement("p", {
    ref: ref,
    id: formDescriptionId,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  })
})
FormDescription.displayName = "FormDescription"
const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return React.createElement("p", {
    ref: ref,
    id: formMessageId,
    className: cn("text-sm font-medium text-destructive", className),
    ...props
  }, body)
})
FormMessage.displayName = "FormMessage"

module.exports = {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}
