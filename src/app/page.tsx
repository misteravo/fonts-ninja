import Image from "next/image";
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
  price: {
    formatedPrice: string;
    amount: number;
    currency: string;
  };
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
      width: number;
      height: number;
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
    <div className="bg-gray-200 grid grid-cols-3 gap-8">
      {families.map((family) => (
        <FamilyCard key={family.idFont} family={family} />
      ))}
    </div>
  );
}

function FamilyCard({ family }: { family: Family }) {
  const encodedSvg = encodeURIComponent(family.images.alphabet.svg);
  const dataUrl = `data:image/svg+xml,${encodedSvg}`;
  return (
    <div
      key={family.idFont}
      className="h-[314px] px-2 py-4 rounded-2xl bg-white flex flex-col items-center justify-center"
    >
      <Image
        src={dataUrl}
        alt={`${family.name} preview`}
        width={family.images.alphabet.width}
        height={family.images.alphabet.height}
      />
    </div>
  );
}
