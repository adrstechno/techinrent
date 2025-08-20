import { forwardRef, createElement } from "react";
import {
  Root,
  Item,
  Header,
  Trigger,
  Content,
} from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Accordion = Root;

const AccordionItem = forwardRef(({ className, ...props }, ref) => {
  return createElement(Item, {
    ref: ref,
    className: cn("border-b", className),
    ...props,
  });
});
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = forwardRef(
  ({ className, children, ...props }, ref) => {
    return createElement(
      Header,
      {
        className: "flex",
      },
      createElement(
        Trigger,
        {
          ref: ref,
          className: cn(
            "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
            className
          ),
          ...props,
        },
        children,
        createElement(ChevronDown, {
          className: "h-4 w-4 shrink-0 transition-transform duration-200",
        })
      )
    );
  }
);
AccordionTrigger.displayName = Trigger.displayName;

const AccordionContent = forwardRef(
  ({ className, children, ...props }, ref) => {
    return createElement(
      Content,
      {
        ref: ref,
        className:
          "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
        ...props,
      },
      createElement(
        "div",
        {
          className: cn("pb-4 pt-0", className),
        },
        children
      )
    );
  }
);
AccordionContent.displayName = Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
