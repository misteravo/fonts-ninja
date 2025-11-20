import { notFound, redirect } from "next/navigation";
import { FamilyCard } from "../components/family-card";
import { NavigationButtons } from "../components/navigation";
import { FontFamiliesResponse } from "../types/font-family";

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
