const React = require("react")
const { useToast } = require('@/hooks/use-toast')
const {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} = require("@/components/ui/toast")

function Toaster() {
  const { toasts } = useToast()

  return React.createElement(ToastProvider, null,
    toasts.map(function ({ id, title, description, action, ...props }) {
      return React.createElement(Toast, { key: id, ...props },
        React.createElement("div", { className: "grid gap-1" },
          title && React.createElement(ToastTitle, null, title),
          description && React.createElement(ToastDescription, null, description)
        ),
        action,
        React.createElement(ToastClose)
      )
    }),
    React.createElement(ToastViewport)
  )
}

module.exports = { Toaster }

