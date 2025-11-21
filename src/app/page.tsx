import { Card } from "@/components/card";
import { NavigationLink } from "@/components/link";
import { SvgRenderer } from "@/components/svg-renderer";
import { notFound, redirect } from "next/navigation";
import { NavigationButtons } from "../components/navigation";
import { FontFamiliesResponse, FontFamily } from "../types/font-family";

export async function generateMetadata(props: {
  searchParams: Promise<{ page?: string }>;
}) {
  const searchParams = await props.searchParams;

  const page = Number(searchParams.page);
  if (Number.isNaN(page) || page <= 0) return { title: "Home - Invalid page" };

  return { title: `Home - Page ${page}` };
}

export default async function Home(props: {
  searchParams: Promise<{ page?: string }>;
}) {
  const numberOfPages = 3;
  const searchParams = await props.searchParams;

  if (!searchParams.page) redirect("/?page=1");

  const page = Number(searchParams.page);
  if (Number.isNaN(page) || !Number.isInteger(page)) notFound();
  if (page <= 0 || page > numberOfPages) notFound();

  const familyData = (await fetch(
    `http://localhost:3000/api/families?page=${page}`
  ).then((response) => response.json())) as FontFamiliesResponse;

  const families = familyData.families;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col gap-6">
      <div className="grid grid-cols-3 gap-4">
        {families.map((family) => (
          <FamilyCard key={`family-${family.idFont}`} family={family} />
        ))}
      </div>
      <NavigationButtons
        currentPage={page}
        numberOfPages={numberOfPages}
        className="px-4"
      />
    </div>
  );
}

function FamilyCard({ family }: { family: FontFamily }) {
  return (
    <Card className="flex flex-col justify-end gap-8 relative">
      <NavigationLink href={family.url} className="absolute inset-0" />
      <SvgRenderer
        svg={family.images.alphabet.svg}
        parseOptions={{
          replace: (domNode) => {
            if (domNode.type === "tag") {
              if (domNode.name === "svg") {
                const ratio = 153 / Number(domNode.attribs.height);
                domNode.attribs.width = String(
                  Number(domNode.attribs.width) * ratio
                );
                domNode.attribs.height = "153";
              }
              if (domNode.name === "g")
                domNode.attribs.className = "fill-card-foreground";
            }
          },
        }}
      />
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
