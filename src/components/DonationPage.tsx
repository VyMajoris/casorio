"use client";

import { useEffect, useState } from "react";
import { getFallbackGifts, getGifts, Gift } from "@/lib/gifts";
import ProgressBar from "./ProgressBar";

import GiftList from "./GiftList";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowTopRightOnSquareIcon,
  ArrowUturnLeftIcon,
  ArrowUturnUpIcon,
  ClipboardIcon,
} from "@heroicons/react/24/outline";
// Import the Libre Baskerville font from next/font/google
import { Libre_Baskerville, Kablammo } from "next/font/google";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

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

  function copytoClipboard(text: string) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Copied to clipboard:", text);
        const copyButton = document.getElementById("pix-copy-btn");
        if (copyButton) {
          copyButton.textContent = "Copiado!";
          setTimeout(() => {
            copyButton.textContent = "Copiar";
          }, 2000);
        }
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  }

  return (
    <div
      className={`min-h-screen flex flex-col items-center py-10 px-4  ${libreBaskerville.className}`}
    >
      <div className="w-full relative max-w-2xl shadow-2xl rounded-lg   bg-white/20">
        <div className="z-20 p-8 relative mt-20 ">
          {/* Header Section */}
          <header className="text-center mb-8">
            <h1
              className="text-4xl font-bold mb-3 text-shadow-gold"
              style={{
                color: "var(--accent-blue)",
              }}
            >
              Lista de Presentes
            </h1>
            <h2 className={`text-3xl mb-3 italic  `}>
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
            className="mb-8 p-6 rounded-md shadow-sm w-full border border-amber-100 relative overflow-hidden"
            style={{
              backgroundColor: "rgba(255,255,255,0.35)",
            }}
          >
            {/* Vatican background image */}
            <Image
              src="/vatican.webp"
              alt="Vatican"
              fill
              style={{
                objectFit: "cover",
                zIndex: 0,
                objectPosition: "center 100px",
                scale: 1,
                opacity: 0.08,
              }}
              className="absolute inset-0 pointer-events-none"
              priority={false}
            />
            <div className="relative z-10">
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
                className="text font-light text-center mb-6 px-20 mt-3"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--text-bronze)",
                }}
              >
                Buscamos sua ajuda para construir nosso lar e  para criarmos nossos
                filhos na beleza e santidade.
              </h4>
              <div className="flex flex-col items-center">
                <div
                  className=" rounded-lg border-2 mb-4"
                  style={{
                    borderColor: "var(--accent-blue)",
                    backgroundColor: "white",
                  }}
                >
                  <Image
                    src="/qr-code.svg"
                    alt="Contribua com um presente"
                    width={280}
                    height={280}
                    className=" rounded-lg"
                    placeholder="blur"
                    blurDataURL="/images/donation-placeholder-blur.jpg"
                  />
                </div>

                <div className="flex flex-col items-center">
                  <div className="items-center flex flex-row text-sm rounded-lg px-2.5 py-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-200 ">
                    <span className="mr-4">Chave PIX: 11 995645748</span>
                    <button
                      type="button"
                      onClick={async () => {
                        copytoClipboard("11 995645748");
                      }}
                      id="pix-copy-btn"
                      className=" cursor-pointer  text-gray-900 dark:text-gray-400  bg-gray-800 border-gray-600 hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center justify-center  border h-8"
                    >
                      {" "}
                      <ClipboardIcon className="w-5 h-5" />
                      <span>Copiar</span>
                    </button>
                  </div>

                  <button
                    className="mt-3 px-2.5 py-2 items-center cursor-pointer flex flex-row text-sm rounded-lg  bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-200 "
                    style={{ height: 48 }}
                    onClick={() => {
                      const modal = document.getElementById(
                        "my_modal_2"
                      ) as HTMLDialogElement | null;
                      if (modal) {
                        modal.showModal();
                      }
                    }}
                  >
                    Usar cartão de crédito
                  </button>
                  <p className="text-sm mt-5">
                    Atualizamos o valor arrecadado manualmente.
                  </p>
                </div>
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
            <div className="flex flex-col items-center mb-5">
              <button
                className="mt-3 px-2.5 py-2 items-center cursor-pointer flex flex-row text-sm rounded-lg  bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-200 "
                onClick={() => {}}
              >
                Link para o convite
              </button>
              <button
                className="mt-3 px-2.5 py-2 items-center cursor-pointer flex flex-row text-sm rounded-lg  bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-200 "
                onClick={() => {}}
              >
                Mais informações sobre a missa tridentina
              </button>
              <button
                className="mt-3 px-2.5 py-2 items-center cursor-pointer flex flex-row text-sm rounded-lg  bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-200 "
                onClick={() => {}}
              >
                Dicas de vestimenta
              </button>
            </div>

            <p className="mb-3 text-lg" style={{ color: "var(--text-bronze)" }}>
              Agradecemos de coração por sua generosidade!
            </p>
            <p
              className="italic text-base "
              style={{
                color: "var(--accent-blue)",
                fontFamily: "var(--font-serif)",
              }}
            >
              Nolite conformari huic sæculo
            </p>

            <div className="flex justify-center ">
              <Image
                src="/amdg.png"
                alt="AMDG"
                className="z-40"
                width={200}
                height={60}
                style={{ objectFit: "contain" }}
              />
            </div>
          </footer>
        </div>
        <div
          className="z-10 rounded-lg "
          style={{
            width: "100%",
            height: "400px",
            top: 0,
            left: 0,

            mixBlendMode: "multiply",
            backgroundImage: "url('/bg_flowers_1.webp')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top center",
            backgroundSize: "cover",
            opacity: 0.3,
            filter: "blur(0.4px) sepia(10%)",
            transform: "scaleY(-1) ",
            position: "absolute",
            overflow: "hidden",
          }}
        />

        <div
          className="absolute bottom-0 rotate-270 sepia-30"
          style={{
            width: "220px",
            height: "220px",
            pointerEvents: "none",
          }}
        >
          <Image
            src="/corner_ornamentation.png"
            alt="Ornamentação de canto"
            className=""
            width={1020}
            height={100}
            style={{ objectFit: "contain" }}
            priority
          />
        </div>

        <div
          className="absolute bottom-0 right-0  rotate-90 sepia-30"
          style={{
            width: "220px",
            height: "220px",
            pointerEvents: "none",
            transform: "scaleX(-1)",
          }}
        >
          <Image
            src="/corner_ornamentation.png"
            alt="Ornamentação de canto"
            className=""
            width={1020}
            height={100}
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
      </div>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Um momento!</h3>
          <p className="py-4">
            O Mercado Pago oferece opção de PIX, mas não recomendamos, pois há
            cobrança de taxa.
            <br />
            <br /> Prefira o PIX da página principal, que cai direto na nossa
            conta, sem custos.
            <br />
            Use o Mercado Pago apenas se for pagar com cartão de crédito.
            <br />
            <br />
            Obrigado!
          </p>
          <div className="flex justify-between">
            <button
              className="btn text-gray-300"
              onClick={() => {
                const modal = document.getElementById(
                  "my_modal_2"
                ) as HTMLDialogElement | null;
                if (modal) {
                  modal.close();
                }
              }}
            >
              Voltar <ArrowUturnLeftIcon className="w-5 h-5" />
            </button>

            <button
              className="btn text-bronze"
              onClick={() => {
                window.open(
                  "https://link.mercadopago.com.br/liliaeeduardo",
                  "_blank"
                );
                const modal = document.getElementById(
                  "my_modal_2"
                ) as HTMLDialogElement | null;
                if (modal) {
                  modal.close();
                }
              }}
            >
              Continuar <ArrowTopRightOnSquareIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
