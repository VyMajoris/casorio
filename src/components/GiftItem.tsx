import React from "react";
import Image from "next/image";
import { Gift } from "@/lib/gifts"; // Import the Gift interface

interface GiftItemProps {
  gift: Gift;
  isUnlocked: boolean;
}

const GiftItem: React.FC<GiftItemProps> = ({ gift, isUnlocked }) => {
  return (
    <div className="flex items-center space-x-4">
      <div
        className="rounded-lg overflow-hidden shadow-md"
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
        <div
          style={{
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to top, rgba(255,255,255,.4) 0%, rgba(0,0,0,0.0) 40%)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-start",
            padding: "1.5rem",
            pointerEvents: "none",
            zIndex: 1,
            position: "relative",
          }}
        >
          <div>
            <p className="text-2xl text-shadow-md" style={{ color: "white" }}>
              {gift.name}
            </p>
            <p className="text-shadow-md text-slate-100">
              R$ {Math.ceil(gift.value).toLocaleString("pt-BR")}
            </p>
          </div>
        </div>

        <div className="justify-start flex items-center mt-3">
          {isUnlocked && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default GiftItem;
