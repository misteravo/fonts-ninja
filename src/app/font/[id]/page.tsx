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
  searchParams: Promise<{ display?: "alphabet" | "pangram" }>;
}) {
  const params = await props.params;
  if (params.id.indexOf("-") === -1) notFound();

  const searchParams = await props.searchParams;
  const svgMode = searchParams.display === "alphabet" ? "alphabet" : "pangram";

  const fontResponse = (await fetch(
    `http://localhost:3000/api/familyDetails`
  ).then((response) => response.json())) as FontFamilyDetailsResponse;

  const svg =
    svgMode === "alphabet"
      ? fontResponse.images.alphabet.svg
      : fontResponse.images.pangram.svg;

  return (
    <div className="flex gap-4">
      <Card className="flex-2 flex flex-col justify-between gap-40 h-[592px]">
        <SvgRenderer
          svg={svg}
          parseOptions={{
            replace: (domNode) => {
              if (domNode.type === "tag") {
                if (domNode.name === "svg") {
                  const width = Number(domNode.attribs.width);
                  const height = Number(domNode.attribs.height);
                  const newHeight = 348;
                  const newWidth = width * (newHeight / height);
                  domNode.attribs.width = String(newWidth);
                  domNode.attribs.height = String(newHeight);
                }
                if (domNode.name === "g")
                  domNode.attribs.className = "fill-card-foreground";
              }
            },
          }}
        />
        <div className="flex gap-4 text-xl">
          <NavigationLink
            href="?display=pangram"
            className={cn(svgMode === "pangram" && "text-button-background")}
            disabled={svgMode === "pangram"}
          >
            Pangram
          </NavigationLink>
          <NavigationLink
            href="?display=alphabet"
            className={cn(svgMode === "alphabet" && "text-button-background")}
            disabled={svgMode === "alphabet"}
          >
            Alphabet
          </NavigationLink>
        </div>
      </Card>
      <Card className="flex-1 flex flex-col gap-1.5">
        <h1 className="font-bold text-card-foreground text-3xl">
          {fontResponse.name}
        </h1>
        <h2 className="text-card-foreground text-xl">
          {fontResponse.foundry.name}
        </h2>
      </Card>
    </div>
  );
}
