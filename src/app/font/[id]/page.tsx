import { Card } from "@/components/card";
import { NavigationLink } from "@/components/link";
import { SvgRenderer } from "@/components/svg-renderer";
import { FontFamilyDetailsResponse } from "@/types/font-family";
import { cn } from "@/utils/classnames";
import { notFound } from "next/navigation";

export default async function FontPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  if (!["pangram", "alphabet"].includes(id)) notFound();

  const fontResponse = (await fetch(
    `http://localhost:3000/api/familyDetails`
  ).then((response) => response.json())) as FontFamilyDetailsResponse;

  const svg =
    id === "pangram"
      ? fontResponse.images.pangram.svg
      : fontResponse.images.alphabet.svg;

  const renderedSvg = svg.replace(
    /<g fill="[^"]*"/g,
    `<g class="fill-card-foreground"`
  );

  return (
    <div className="flex gap-4">
      <Card className="flex-2 flex flex-col justify-between gap-40">
        <SvgRenderer svg={renderedSvg} />
        <div className="flex gap-4 text-xl">
          <NavigationLink
            href="/font/pangram"
            className={cn(id === "pangram" && "text-button-background")}
            disabled={id === "pangram"}
          >
            Pangram
          </NavigationLink>
          <NavigationLink
            href="/font/alphabet"
            className={cn(id === "alphabet" && "text-button-background")}
            disabled={id === "alphabet"}
          >
            Alphabet
          </NavigationLink>
        </div>
      </Card>
      <Card className="flex-1">
        <h1 className="font-bold text-card-foreground text-2xl">
          {fontResponse.name}
        </h1>
        <h2 className="text-card-foreground text-xl">
          {fontResponse.foundry.name}
        </h2>
      </Card>
    </div>
  );
}
