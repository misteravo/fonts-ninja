import { FontFamily } from "../types/font-family";
import { Card } from "./card";
import { NavigationLink } from "./link";
import { SvgRenderer } from "./svg-renderer";

export function FamilyCard({ family }: { family: FontFamily }) {
  const svg = family.images.alphabet.svg.replace(
    /<g fill="[^"]*"/g,
    `<g class="fill-card-foreground"`
  );
  return (
    <NavigationLink href={family.url}>
      <Card className="flex flex-col justify-end gap-8">
        <SvgRenderer svg={svg} />
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col">
            <p className="font-bold">{family.name}</p>
            <p>{family.foundry.name}</p>
          </div>
          <div className="flex flex-col">
            <p>
              {family.price ? (
                `From ${family.price?.formatedPrice}`
              ) : (
                <>&nbsp;</>
              )}
            </p>
            <p>{family.totalFonts} styles</p>
          </div>
        </div>
      </Card>
    </NavigationLink>
  );
}
