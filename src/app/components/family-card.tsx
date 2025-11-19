import { Family } from "../types/family";
import { SvgRenderer } from "./svg-renderer";

export function FamilyCard({ family }: { family: Family }) {
  const svg = family.images.alphabet.svg.replace(
    /<g fill="[^"]*"/g,
    `<g class="fill-card-foreground"`
  );
  return (
    <div
      key={family.idFont}
      className="px-12 py-8 gap-8 rounded-2xl bg-card-background text-card-foreground flex flex-col justify-end"
    >
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
    </div>
  );
}
