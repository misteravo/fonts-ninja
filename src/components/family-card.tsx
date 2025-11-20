import { cn } from "@/utils/classnames";
import { FontFamily } from "../types/font-family";
import { SvgRenderer } from "./svg-renderer";

export function FamilyCard({ family }: { family: FontFamily }) {
  const svg = family.images.alphabet.svg.replace(
    /<g fill="[^"]*"/g,
    `<g class="fill-card-foreground"`
  );
  return (
    <Card className="flex flex-col justify-end gap-8">
      <SvgRenderer svg={svg} />
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-col">
          <p className="font-bold">{family.name}</p>
          <p>{family.foundry.name}</p>
        </div>
        <div className="flex flex-col">
          <p>
            {family.price ? `From ${family.price?.formatedPrice}` : <>&nbsp;</>}
          </p>
          <p>{family.totalFonts} styles</p>
        </div>
      </div>
    </Card>
  );
}

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
