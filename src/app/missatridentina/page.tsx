export const metadata = {
  title: "Mais sobre a Missa Tridentina"
};

const qas = [
  {
    q: "O que é a Missa Tridentina?",
    a: "\u00c9 a celebra\u00e7\u00e3o do rito romano segundo o Missal de 1962, conservando as pr\u00e1ticas lit\u00fargicas transmitidas ao longo dos s\u00e9culos. Grupos como a FSSP, ICKSP e a Fraternidade S\u00e3o Pio X a apresentam como express\u00e3o da continuidade da tradi\u00e7\u00e3o cat\u00f3lica." 
  },
  {
    q: "Por que a Missa \u00e9 celebrada em latim?",
    a: "Segundo esses institutos, o latim ressalta a universalidade e a unidade da Igreja, al\u00e9m de favorecer uma atmosfera de rever\u00eancia e de mist\u00e9rio." 
  },
  {
    q: "Ela foi abolida ap\u00f3s o Conc\u00edlio Vaticano II?",
    a: "N\u00e3o. Os grupos tradicionais explicam que o Vaticano II n\u00e3o proibiu o rito tridentino. Documentos como o motu proprio \"Summorum Pontificum\" confirmaram que ele continua permitido." 
  },
  {
    q: "Como posso participar se n\u00e3o sei latim?",
    a: "A participa\u00e7\u00e3o \u00e9 antes de tudo interior. Missais bil\u00edngues ajudam a acompanhar as ora\u00e7\u00f5es e a meditar silenciosamente." 
  },
  {
    q: "Posso comungar na boca e de joelhos?",
    a: "Sim. Esses grupos ensinam que a comunh\u00e3o de joelhos e na boca demonstra respeito pela Presen\u00e7a Real de Cristo." 
  },
  {
    q: "Qual a import\u00e2ncia do sil\u00eancio na Missa?",
    a: "O sil\u00eancio favorece a ora\u00e7\u00e3o pessoal. A liturgia tridentina reserva momentos de quietude para que o fi\u00e9l se una interiormente ao Sacrif\u00edcio." 
  },
  {
    q: "As mulheres precisam usar v\u00e9u?",
    a: "O uso do v\u00e9u \u00e9 uma tradi\u00e7\u00e3o recomendada por muitos grupos tradicionais como sinal de modestia e honra, mas n\u00e3o \u00e9 obrigat\u00f3rio." 
  },
  {
    q: "Quem est\u00e1 autorizado a celebrar esta Missa?",
    a: "Padres ligados \u00e0 FSSP, ICKSP e outros institutos em plena comunh\u00e3o celebram regularmente. A Fraternidade S\u00e3o Pio X tamb\u00e9m o faz, embora com status can\u00f4nico pr\u00f3prio." 
  },
  {
    q: "Como \u00e9 a m\u00fasica nesta liturgia?",
    a: "Predominam o canto gregoriano e a polifonia sacra, considerados por esses institutos como tesouros da Tradi\u00e7\u00e3o cat\u00f3lica." 
  },
  {
    q: "Como encontrar onde ela \u00e9 celebrada?",
    a: "Sites e redes das comunidades tradicionais, como FSSP, ICKSP e SSPX, oferecem diret\u00f3rios com localidades onde se celebra a Missa Tridentina." 
  }
];

export default function MissaTridentinaPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl mb-6 text-center" style={{color: "var(--text-bronze)"}}>Mais informa\u00e7\u00f5es sobre a Missa Tridentina</h1>
      <div className="space-y-4">
        {qas.map(({q, a}) => (
          <details key={q} className="bg-white border border-gray-300 rounded-lg p-4">
            <summary className="cursor-pointer font-semibold" style={{color: "var(--accent-blue)"}}>{q}</summary>
            <p className="mt-2" style={{color: "var(--text-bronze)"}}>{a}</p>
          </details>
        ))}
      </div>
    </main>
  );
}
