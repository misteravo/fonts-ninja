import Image from "next/image";
import { Family } from "../types/family";

export function FamilyCard({ family }: { family: Family }) {
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
