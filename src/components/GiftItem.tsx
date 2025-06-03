import React from "react";
import { Gift } from "@/lib/gifts"; // Import the Gift interface

interface GiftItemProps {
  gift: Gift;
  isUnlocked: boolean;
}

const GiftItem: React.FC<GiftItemProps> = ({ gift, isUnlocked }) => {
  return (
    <div
      className="relative rounded-lg overflow-hidden shadow-lg w-full aspect-[4/3] sm:aspect-square"
        style={{
          backgroundImage: gift.image_url
            ? `url(${
                gift.image_url.startsWith("http")
                  ? gift.image_url
                  : `/${gift.image_url}`
              })`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: !gift.image_url ? "#f5f5f5" : undefined,
        }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-gray-600/30 to-transparent flex items-end p-6 pointer-events-none">
          <div>
            <p className="text-2xl text-shadow-md text-amber-50">
              {gift.name}
            </p>
            <p className="text-shadow-lg text-slate-200">
              R$ {Math.ceil(gift.value).toLocaleString("pt-BR")}
            </p>
          </div>
        </div>
      {isUnlocked && (
        <div className="absolute bottom-4 left-4">
          <span
            className="text-xs font-semibold px-4 py-2 rounded-full shadow-md"
            style={{
              backgroundColor: "var(--accent-blue)",
              color: "white",
              fontFamily: "var(--font-body)",
            }}
          >
            Recebido com gratidão 🙏
          </span>
        </div>
      )}
    </div>
  );
};

export default GiftItem;
