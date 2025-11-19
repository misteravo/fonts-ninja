import { MoveLeft, MoveRight } from "lucide-react";
import { cn } from "../utils/classnames";

export function NavigationButtons(props: {
  currentPage: number;
  numberOfPages: number;
}) {
  return (
    <div className="flex flex-row gap-2 items-center justify-start">
      <NavigationLink
        href={`/?page=${props.currentPage - 1}`}
        disabled={props.currentPage === 1}
      >
        <MoveLeft
          className={cn(
            "w-4 h-4",
            props.currentPage === 1
              ? "text-foreground-disabled"
              : "text-foreground"
          )}
        />
      </NavigationLink>
      {Array.from({ length: props.numberOfPages }).map((_, pageIndex) => {
        const isCurrentPage = pageIndex + 1 === props.currentPage;
        return (
          <NavigationLink
            key={`navigation-button-${pageIndex + 1}`}
            className={cn(
              "px-4 py-2 rounded-2xl",
              isCurrentPage
                ? "bg-button-background text-button-foreground"
                : "text-foreground"
            )}
            href={`/?page=${pageIndex + 1}`}
            disabled={isCurrentPage}
          >
            {pageIndex + 1}
          </NavigationLink>
        );
      })}
      <NavigationLink
        href={`/?page=${props.currentPage + 1}`}
        disabled={props.currentPage === props.numberOfPages}
      >
        <MoveRight
          className={cn(
            "w-4 h-4",
            props.currentPage === props.numberOfPages
              ? "text-foreground-disabled"
              : "text-foreground"
          )}
        />
      </NavigationLink>
    </div>
  );
}

function NavigationLink(props: {
  children: React.ReactNode;
  href: string;
  className?: string;
  disabled?: boolean;
}) {
  if (props.disabled)
    return <span className={props.className}>{props.children}</span>;
  return (
    <a href={props.href} className={props.className}>
      {props.children}
    </a>
  );
}
