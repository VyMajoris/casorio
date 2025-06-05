"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { Libre_Baskerville } from "next/font/google";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const questions = [
  {
    q: "O que é a Missa Tradicional (ou Tridentina)?",
    a: "A Missa Tradicional, também conhecida como Missa Tridentina ou Forma Extraordinária do Rito Romano, é a forma da Missa Católica Romana que se desenvolveu ao longo de muitos séculos e foi codificada por São Pio V em 1570. É caracterizada pelo uso do latim, orientação do sacerdote ad orientem (para o leste), e uma ênfase particular na sacralidade e transcendência do Santo Sacrifício da Missa."
  },
  {
    q: "Por que a Missa é celebrada em latim?",
    a: "O latim, como língua litúrgica universal da Igreja Ocidental, preserva a unidade e imutabilidade da doutrina católica. Não sendo uma língua vernácula moderna, está livre de mudanças semânticas e culturais, garantindo assim a precisão teológica através dos séculos. Além disso, o uso de uma língua sagrada ajuda a elevar nossas mentes ao divino e enfatiza o caráter transcendente do Santo Sacrifício."
  },
  {
    q: "Por que o padre celebra 'de costas' para o povo?",
    a: "Na realidade, o sacerdote não está 'de costas' para o povo, mas sim 'voltado para o Senhor' (ad orientem). Esta orientação antiga e venerável significa que padre e fiéis estão unidos, voltados na mesma direção, olhando juntos para o Oriente litúrgico, simbolizando nossa expectativa comum pela vinda de Cristo."
  },
  {
    q: "Como posso participar ativamente se não entendo latim?",
    a: "A participação ativa na Missa não se limita a respostas vocais, mas principalmente à união interior com o Santo Sacrifício. Os missais disponibilizam traduções lado a lado, permitindo acompanhar as orações. A própria estrutura da Missa, com seus gestos e movimentos significativos, facilita a compreensão e participação dos fiéis."
  },
  {
    q: "Qual a diferença entre a Missa Tradicional e a Missa Nova?",
    a: "As principais diferenças incluem: o uso exclusivo do latim, a orientação ad orientem, um maior silêncio sagrado, orações mais explícitas sobre o Sacrifício, comunhão apenas na boca e de joelhos, e uma estrutura ritual mais definida e invariável. A Missa Tradicional enfatiza particularmente o aspecto sacrificial da Missa."
  },
  {
    q: "Por que há tanto silêncio durante a Missa Tradicional?",
    a: "O silêncio sagrado, especialmente durante o Cânon da Missa, permite uma participação mais profunda no mistério que está sendo celebrado. Este silêncio não é vazio, mas cheio de reverência e adoração, permitindo que os fiéis se unam interiormente ao sacrifício de Cristo."
  },
  {
    q: "Como devo me vestir para a Missa Tradicional?",
    a: "A vestimenta deve refletir a dignidade do Santo Sacrifício. Para homens: terno ou camisa social com calça social. Para mulheres: vestidos ou saias abaixo do joelho, ombros cobertos, e véu (mantilha) para a cabeça como sinal de reverência. A modéstia e o decoro são essenciais."
  },
  {
    q: "Por que as mulheres usam véu na Missa Tradicional?",
    a: "O uso do véu por mulheres segue a tradição apostólica mencionada em 1 Coríntios 11. É um sinal de modéstia e reverência diante do Santíssimo Sacramento, reconhecendo a ordem sagrada da criação e a dignidade especial da mulher na Igreja."
  },
  {
    q: "A Missa Tradicional é válida e permitida pela Igreja?",
    a: "Sim, absolutamente. O Papa Bento XVI, em seu Motu Proprio Summorum Pontificum (2007), confirmou que a Missa Tradicional nunca foi ab-rogada e que todo sacerdote tem o direito de celebrá-la. É uma das duas formas do mesmo Rito Romano."
  },
  {
    q: "Por que os jovens são atraídos pela Missa Tradicional?",
    a: "Muitos jovens encontram na Missa Tradicional uma profunda sacralidade, beleza e sentido de transcendência que respondem à sua busca por autenticidade e tradição. A riqueza dos símbolos, a profundidade teológica e a continuidade com o passado da Igreja oferecem um antídoto ao relativismo e ao secularismo modernos."
  }
];

export default function LatinMassInfo() {
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
                  {item.q}
                </h3>
                <p
                  className="text-base"
                  style={{
                    color: "var(--text-warm)",
                  }}
                >
                  {item.a}
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