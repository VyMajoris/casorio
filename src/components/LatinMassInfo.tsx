"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { Libre_Baskerville } from "next/font/google";
import { useEffect, useState } from "react";
import {
  getLatinMassQuestions,
  getFallbackQuestions,
  type LatinMassQA,
} from "@/lib/latin_mass";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export default function LatinMassInfo() {
  const [questions, setQuestions] = useState<LatinMassQA[]>([]);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        let qs = await getLatinMassQuestions();
        if (!qs || qs.length === 0) {
          qs = getFallbackQuestions();
        }
        setQuestions(qs);
      } catch (err) {
        console.error("Error fetching latin mass questions", err);
        setQuestions(getFallbackQuestions());
      }
    }
    fetchQuestions();
  }, []);
  return (
    <div className={`min-h-screen flex flex-col items-center py-10 px-4 ${libreBaskerville.className}`}>
      <div className="w-full relative max-w-2xl shadow-2xl rounded-lg bg-white/20">
        <div className="z-20 p-8 relative mt-20">
          <header className="text-center mb-8">
            <h1
              className="text-4xl font-bold mb-3 text-shadow-gold"
              style={{
                color: "var(--accent-blue)",
              }}
            >
              A Santa Missa Tradicional
            </h1>
            <div className="flex justify-center">
              <Image
                src="/vatican.webp"
                alt="Vatican"
                width={280}
                height={280}
                className="rounded-lg shadow-lg"
              />
            </div>
          </header>

          <section className="mb-8 space-y-6">
            {questions.map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-md shadow-sm border border-amber-100"
                style={{
                  backgroundColor: "rgba(255,255,255,0.35)",
                }}
              >
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{
                    color: "var(--text-bronze)",
                  }}
                >
                    {item.question}
                </h3>
                <p
                  className="text-base"
                  style={{
                    color: "var(--text-warm)",
                  }}
                >
                    {item.answer}
                </p>
              </div>
            ))}
          </section>

          <footer
            className="text-center mt-10 pt-6 border-t"
            style={{ borderColor: "var(--accent-blue)" }}
          >
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 text-sm rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors"
            >
              <ArrowUturnLeftIcon className="w-5 h-5 mr-2" />
              Voltar para a página principal
            </Link>

            <p className="mt-6 mb-3 text-lg" style={{ color: "var(--text-bronze)" }}>
              Ad majorem Dei gloriam
            </p>

            <div className="flex justify-center">
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
          className="z-10 rounded-lg absolute top-0 left-0 w-full h-64 sm:h-[400px]"
          style={{
            mixBlendMode: "multiply",
            backgroundImage: "url('/bg_flowers_1.webp')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top center",
            backgroundSize: "cover",
            opacity: 0.3,
            filter: "blur(0.4px) sepia(10%)",
            transform: "scaleY(-1)",
            overflow: "hidden",
          }}
        />

        <div
          className="absolute bottom-0 rotate-270 sepia-30 w-24 h-24 sm:w-[220px] sm:h-[220px]"
          style={{ pointerEvents: "none" }}
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
          className="absolute bottom-0 right-0 rotate-90 sepia-30 w-24 h-24 sm:w-[220px] sm:h-[220px]"
          style={{ pointerEvents: "none", transform: "scaleX(-1)" }}
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
    </div>
  );
}