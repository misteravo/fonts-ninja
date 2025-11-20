import { Card } from "@/components/card";
import { NavigationLink } from "@/components/link";
import { SvgRenderer } from "@/components/svg-renderer";
import { FontFamilyDetailsResponse } from "@/types/font-family";
import { cn } from "@/utils/classnames";
import { notFound } from "next/navigation";

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const titleWords = params.id.split("-").slice(0, -1);
  if (titleWords.length < 1) return { title: "Font - Invalid ID" };
  return { title: titleWords.join(" ") };
}

export default async function FontPage(props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ svg?: "alphabet" | "pangram" }>;
}) {
  const params = await props.params;
  if (params.id.indexOf("-") === -1) notFound();

  const searchParams = await props.searchParams;
  const svgMode = searchParams.svg === "alphabet" ? "alphabet" : "pangram";

  const fontResponse = (await fetch(
    `http://localhost:3000/api/familyDetails`
  ).then((response) => response.json())) as FontFamilyDetailsResponse;

  const svg =
    svgMode === "alphabet"
      ? fontResponse.images.alphabet.svg
      : fontResponse.images.pangram.svg;

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
            href="?svg=pangram"
            className={cn(svgMode === "pangram" && "text-button-background")}
            disabled={svgMode === "pangram"}
          >
            Pangram
          </NavigationLink>
          <NavigationLink
            href="?svg=alphabet"
            className={cn(svgMode === "alphabet" && "text-button-background")}
            disabled={svgMode === "alphabet"}
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
