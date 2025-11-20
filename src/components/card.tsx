import { cn } from "@/utils/classnames";

export function Card(props: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "px-16 py-16 rounded-3xl bg-card-background text-card-foreground",
        props.className
      )}
    >
      {props.children}
    </div>
  );
}
