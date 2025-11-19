import { notFound, redirect } from "next/navigation";

type FamilyData = {
  families: Family[];
  totalFamilies: number;
};

type Family = {
  idFont: number;
  url: string;
  idRegularFont: number;
  vendorId: string;
  price: null;
  idFamily: string;
  name: string;
  totalFonts: number;
  foundry: {
    id: string;
    name: string;
    totalFamilies: number;
  };
  images: {
    alphabet: {
      svg: string;
    };
  };
};

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
    <div className="grid grid-cols-3 gap-4">
      {families.map((family) => (
        <div key={family.idFont}>{family.name}</div>
      ))}
    </div>
  );
}
