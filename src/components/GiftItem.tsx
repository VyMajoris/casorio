import React from "react";
import { Gift } from "@/lib/gifts"; // Import the Gift interface

interface GiftItemProps {
  gift: Gift;
  isUnlocked: boolean;
}

const GiftItem: React.FC<GiftItemProps> = ({ gift, isUnlocked }) => {
  return (
    <div
      className="relative rounded-lg overflow-hidden shadow-lg w-full aspect-square"
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
      <div className="absolute inset-0 bg-gradient-to-t from-gray-600/30 to-transparent flex items-end p-2 sm:p-6 pointer-events-none">
        <div>
          <p className="text-shadow-md text-amber-50 text-[13px] xs:text-base md:text-xl ">
            {gift.name}
          </p>
          <p className="text-shadow-lg text-slate-200 text-xs sm:text-base ">
            R$ {Math.ceil(gift.value).toLocaleString("pt-BR")}
          </p>
        </div>
      </div>
      {isUnlocked && (
        <div className="absolute inset-0 bg-gradient-to-b from-amber-200/80 to-transparent to-40% flex items-start">
          <div
            style={{ textShadow: "0 0 10px #5b5b5b" }}
            className="xs:mt-2 xs:ml-2 xs:px-4 xs:py-2 p-2  text-white bg-transparent flex items-center"
          >
            <span className="text-blue-400 font-bold text-[13px] xs:text-2xl  mr-2 xs:mr-4">✓</span>
            <span className="not-italic xs:italic  tracking-widest text-[10px] xs:text-sm mr-2 xs:mr-4">Recebido</span>

          </div>
        </div>
      )}
    </div>
  );
};

export default GiftItem;
