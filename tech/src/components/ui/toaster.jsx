import { createElement } from "react"
import { useToast } from '@/hooks/use-toast'
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast"

function Toaster() {
  const { toasts } = useToast()

  return createElement(ToastProvider, null,
    toasts.map(function ({ id, title, description, action, ...props }) {
      return createElement(Toast, { key: id, ...props },
        createElement("div", { className: "grid gap-1" },
          title && createElement(ToastTitle, null, title),
          description && createElement(ToastDescription, null, description)
        ),
        action,
        createElement(ToastClose)
      )
    }),
    createElement(ToastViewport)
  )
}

export { Toaster }

