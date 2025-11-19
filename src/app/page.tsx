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
    formatedPrice?: string;
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
    <div className="bg-gray-200 text-black grid grid-cols-3 gap-8">
      {families.map((family) => (
        <FamilyCard key={family.idFont} family={family} />
      ))}
    </div>
  );
}

function FamilyCard({ family }: { family: Family }) {
  const encodedSvg = encodeURIComponent(family.images.alphabet.svg);
  const dataUrl = `data:image/svg+xml,${encodedSvg}`;
  const svgWidth = family.images.alphabet.width;
  const svgHeight = family.images.alphabet.height;
  return (
    <div
      key={family.idFont}
      className="px-12 py-8 gap-8 rounded-2xl bg-white flex flex-col justify-end"
    >
      <Image
        src={dataUrl}
        alt={`${family.name} preview`}
        width={svgWidth}
        height={svgHeight}
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
    </div>
  );
}
