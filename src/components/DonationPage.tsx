"use client";

import { useEffect, useState } from "react";
import { getFallbackGifts, getGifts, Gift } from "@/lib/gifts";
import ProgressBar from "./ProgressBar";
import DonationForm from "./DonationForm";
import GiftList from "./GiftList";
import Image from "next/image";
import Link from "next/link";

interface DonationPageProps {
  initialDonated?: number;
}

export default function DonationPage({}: DonationPageProps) {
  // State to hold the total amount donated
  const [totalDonated, setTotalDonated] = useState(0);

  const [gifts, setGifts] = useState<Gift[]>([]);

  useEffect(() => {
    async function fetchGifts() {
      try {
        let fetchedGifts = await getGifts();
        if (!fetchedGifts || fetchedGifts.length === 0) {
          console.log("No gifts found in Supabase, using fallback data");
          fetchedGifts = await getFallbackGifts();
        }
        localStorage.setItem("gifts", JSON.stringify(fetchedGifts));
        setGifts(fetchedGifts);
      } catch (error) {
        console.error("Error fetching gifts from Supabase:", error);
        const fallbackGifts = await getFallbackGifts();
        setGifts(fallbackGifts);
      }
    }
    fetchGifts();
  }, []);

  // Calculate the goal from all gift values
  const goal = gifts.reduce((sum, gift) => sum + gift.value, 0);

  // Function to handle donation submission
  const handleDonate = (amount: number) => {
    setTotalDonated((prevTotal) => prevTotal + amount);
    // In a real app, you'd trigger a payment process here
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center py-10 px-4"
      style={{ fontFamily: "var(--font-body)" }}
    >
      <div
        className="w-full max-w-2xl shadow-2xl rounded-lg p-8 border border-amber-200"
        style={{ backgroundColor: "var(--card-background)" }}
      >
        {/* Header Section */}
        <header className="text-center mb-8">
          <h1
            className="text-4xl font-bold mb-3 text-shadow-gold"
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--accent-blue)",
            }}
          >
            Lista de Presentes
          </h1>
          <h2
            className="text-2xl mb-3"
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--text-bronze)",
            }}
          >
            <div style={{ lineHeight: 1 }}>Lília</div>
            <div style={{ lineHeight: 1 }}>&</div>
            <div style={{ lineHeight: 1 }}>Eduardo</div>
          </h2>
          <div className="flex justify-center">
            <Image
              src="/logo_colorido_4.png"
              alt="Contribua com um presente"
              width={280}
              height={280}
              placeholder="blur"
              blurDataURL="/images/donation-placeholder-blur.jpg"
            />
          </div>
        </header>

        {/* Progress Bar Section */}
        <section className="mb-8 w-full">
          <ProgressBar currentValue={totalDonated} maxValue={goal} />
        </section>

        {/* Donation Form Section */}
        <section
          className="mb-8 p-6 rounded-md shadow-sm w-full border border-amber-100"
          style={{ backgroundColor: "rgba(212, 175, 55, 0.05)" }}
        >
          <h3
            className="text-2xl font-semibold text-center "
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--text-bronze)",
            }}
          >
            Ajude-nos a realizar nosso sonho:
          </h3>
          <h4
            className="text font-light text-center mb-6"
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--text-bronze)",
            }}
          >
            Buscamos sua ajuda para construir um lar para criarmos nossos filhos
            na beleza e santidade.
          </h4>
          <div className="flex flex-col items-center">
            <div
              className="p-4 rounded-lg border-2 mb-4"
              style={{
                borderColor: "var(--accent-blue)",
                backgroundColor: "white",
              }}
            >
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                alt="Contribua com um presente"
                width={280}
                height={280}
                className=""
                placeholder="blur"
                blurDataURL="/images/donation-placeholder-blur.jpg"
              />
            </div>
            <div className="text-center">
              <div className="flex flex-row items-center">
                <div
                  className="text-lg font-semibold mr-5"
                  style={{ color: "var(--text-bronze)" }}
                >
                  Chave PIX: 11 995645748
                </div>

                <button
                  className=" bg-slate-600 cursor-pointer  px-3 py-3 rounded-md transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg"
                  onClick={() => {}}
                >
                  Copiar chave
                </button>
              </div>

              <Link
                href="#"
                className="inline-block mt-2 px-6 py-3 rounded-md transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg"
                style={{
                  backgroundColor: "var(--accent-blue)",
                  color: "white",
                  fontFamily: "var(--font-body)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "var(--text-bronze)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "var(--accent-blue)")
                }
              >
                Usar cartão de crédito
              </Link>
              <p className="text-xs mt-5">
                Atualizamos o valor arrecadado manualmente.
              </p>
            </div>
          </div>
        </section>

        {/* Gift List Section */}
        <section className="w-full">
          <div className="text-center mb-6">
            <div
              className="w-12 h-0.5 mx-auto"
              style={{ backgroundColor: "var(--text-bronze)" }}
            ></div>
          </div>
          <GiftList gifts={gifts} totalDonated={totalDonated} />
        </section>

        {/* Footer Section */}
        <footer
          className="text-center mt-10 pt-6 border-t"
          style={{ borderColor: "var(--accent-blue)" }}
        >
          <button
            className=" bg-slate-600 cursor-pointer  px-3 py-3 rounded-md transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg"
            onClick={() => {}}
          >
            Link para o convite
          </button>
          <button
            className=" bg-slate-600 cursor-pointer  px-3 py-3 rounded-md transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg"
            onClick={() => {}}
          >
            Mais informações sobre a missa tridentina
          </button>
           <button
            className=" bg-slate-600 cursor-pointer  px-3 py-3 rounded-md transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg"
            onClick={() => {}}
          >
            Dicas de vestimenta
          </button>
          <p className="mb-3 text-lg" style={{ color: "var(--text-bronze)" }}>
            Agradecemos de coração por sua generosidade!
          </p>
          <p
            className="italic text-base mb-4"
            style={{
              color: "var(--text-warm)",
              fontFamily: "var(--font-serif)",
            }}
          >
            Nolite conformari huic sæculo
          </p>
          <div
            className="w-24 h-0.5 mx-auto mb-3"
            style={{ backgroundColor: "var(--accent-blue)" }}
          ></div>
          <p className="text-sm" style={{ color: "var(--text-warm)" }}>
            &copy; 2025 - Lília & Eduardo
          </p>
        </footer>
      </div>
    </div>
  );
}
