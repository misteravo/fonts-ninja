import { cn } from "@/utils/classnames";

export function Card(props: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "px-12 py-12 rounded-3xl bg-card-background text-card-foreground",
        props.className
      )}
    >
      {props.children}
    </div>
  );
}
