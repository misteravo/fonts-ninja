import { MoveLeft, MoveRight } from "lucide-react";
import { cn } from "../utils/classnames";

export function NavigationButtons(props: {
  currentPage: number;
  numberOfPages: number;
}) {
  return (
    <div className="flex flex-row gap-2 items-center justify-start">
      <MoveLeft className="w-4 h-4" />
      {Array.from({ length: props.numberOfPages }).map((_, pageIndex) => {
        const isCurrentPage = pageIndex + 1 === props.currentPage;
        return (
          <a
            key={`navigation-button-${pageIndex + 1}`}
            className={cn(
              "px-4 py-2 rounded-2xl",
              isCurrentPage
                ? "bg-button-background text-button-foreground"
                : "text-foreground"
            )}
            href={`/?page=${pageIndex + 1}`}
          >
            {pageIndex + 1}
          </a>
        );
      })}
      <MoveRight className="w-4 h-4" />
    </div>
  );
}
