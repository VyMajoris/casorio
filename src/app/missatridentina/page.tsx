export const metadata = {
  title: "Mais sobre a Missa Tridentina"
};
const qas = [
  {
    q: "O que é a Missa Tridentina?",
    a: "É a celebração do rito romano segundo o Missal de 1962, conservando as práticas litúrgicas transmitidas ao longo dos séculos. Grupos como a FSSP, ICKSP e a Fraternidade São Pio X a apresentam como expressão da continuidade da tradição católica."
  },
  {
    q: "Por que a Missa é celebrada em latim?",
    a: "Segundo esses institutos, o latim ressalta a universalidade e a unidade da Igreja, além de favorecer uma atmosfera de reverência e de mistério."
  },
  {
    q: "Ela foi abolida após o Concílio Vaticano II?",
    a: "Não. Os grupos tradicionais explicam que o Vaticano II não proibiu o rito tridentino. Documentos como o motu proprio \"Summorum Pontificum\" confirmaram que ele continua permitido."
  },
  {
    q: "Como posso participar se não sei latim?",
    a: "A participação é antes de tudo interior. Missais bilíngues ajudam a acompanhar as orações e a meditar silenciosamente."
  },
  {
    q: "Posso comungar na boca e de joelhos?",
    a: "Sim. Esses grupos ensinam que a comunhão de joelhos e na boca demonstra respeito pela Presença Real de Cristo."
  },
  {
    q: "Qual a importância do silêncio na Missa?",
    a: "O silêncio favorece a oração pessoal. A liturgia tridentina reserva momentos de quietude para que o fiel se una interiormente ao Sacrifício."
  },
  {
    q: "As mulheres precisam usar véu?",
    a: "O uso do véu é uma tradição recomendada por muitos grupos tradicionais como sinal de modéstia e honra, mas não é obrigatório."
  },
  {
    q: "Quem está autorizado a celebrar esta Missa?",
    a: "Padres ligados à FSSP, ICKSP e outros institutos em plena comunhão celebram regularmente. A Fraternidade São Pio X também o faz, embora com status canônico próprio."
  },
  {
    q: "Como é a música nesta liturgia?",
    a: "Predominam o canto gregoriano e a polifonia sacra, considerados por esses institutos como tesouros da Tradição católica."
  },
  {
    q: "Como encontrar onde ela é celebrada?",
    a: "Sites e redes das comunidades tradicionais, como FSSP, ICKSP e SSPX, oferecem diretórios com localidades onde se celebra a Missa Tridentina."
  }
];


export default function MissaTridentinaPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl mb-6 text-center" style={{color: "var(--text-bronze)"}}>Mais informações sobre a Missa Tridentina</h1>
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
