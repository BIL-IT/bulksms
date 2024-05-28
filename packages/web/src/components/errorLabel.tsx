import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export default function ErrorLabel(props: ComponentProps<"p">) {
  return (
    <p
      {...props}
      className={cn(
        "text-xs font-bold text-red-400 select-none mt-1",
        props.className
      )}
    >
      {props.children}
    </p>
  );
}
