import { notFound, redirect } from "next/navigation";
import { FamilyCard } from "./components/family-card";
import { NavigationButtons } from "./components/navigation";
import { FamilyData } from "./types/family";

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
  const searchParams = await props.searchParams;

  if (!searchParams.page) redirect("/?page=1");

  const page = Number(searchParams.page);
  if (Number.isNaN(page) || page <= 0) notFound();

  const familyData = (await fetch(
    `http://localhost:3000/api/families?page=${page}`
  ).then((response) => response.json())) as FamilyData;

  const families = familyData.families;

  return (
    <div className="min-h-screen bg-gray-200 text-black flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-8">
        {families.map((family) => (
          <FamilyCard key={`family-${family.idFont}`} family={family} />
        ))}
      </div>
      <NavigationButtons currentPage={page} numberOfPages={3} />
    </div>
  );
}
