import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export default function Section(
  props: PropsWithChildren<{ className?: string }>
) {
  return (
    <section className={cn("px-4 w-full", props.className)}>
      {props.children}
    </section>
  );
}
