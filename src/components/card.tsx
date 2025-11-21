import { cn } from "@/utils/classnames";

export function Card(props: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "p-12 rounded-4xl bg-card-background text-card-foreground",
        props.className
      )}
    >
      {props.children}
    </div>
  );
}
