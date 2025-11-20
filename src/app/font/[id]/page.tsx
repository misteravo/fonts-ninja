import { Card } from "@/components/family-card";
import { SvgRenderer } from "@/components/svg-renderer";
import { FontFamilyDetailsResponse } from "@/types/font-family";

export default async function FontPage() {
  const fontResponse = (await fetch(
    `http://localhost:3000/api/familyDetails`
  ).then((response) => response.json())) as FontFamilyDetailsResponse;

  const pangramSvg = fontResponse.images.pangram.svg.replace(
    /<g fill="[^"]*"/g,
    `<g class="fill-card-foreground"`
  );

  return (
    <div className="flex flex-row gap-4">
      <Card className="col-span-1 flex-2">
        <SvgRenderer svg={pangramSvg} />
      </Card>
      <Card className="col-span-1 flex-1">
        <h1 className="font-bold text-card-foreground text-2xl">
          {fontResponse.name}
        </h1>
        <h2 className="text-card-foreground text-lg">
          {fontResponse.foundry.name}
        </h2>
      </Card>
    </div>
  );
}
