import { getSupabase, isSupabaseConfigured } from './supabase'

export interface LatinMassQA {
  question: string
  answer: string
}

export async function getLatinMassQuestions(): Promise<LatinMassQA[]> {
  try {
    if (!isSupabaseConfigured()) {
      console.log('Supabase not configured, skipping database fetch')
      return []
    }

    const supabase = getSupabase()
    if (!supabase) {
      console.log('Supabase client not available')
      return []
    }

    const { data, error } = await supabase
      .from('latin_mass')
      .select('question, answer')
      .order('id', { ascending: true })

    if (error) {
      console.error('Error fetching latin_mass questions:', error)
      return []
    }

    return (data as unknown as LatinMassQA[]) || []
  } catch (error) {
    console.error('Unexpected error fetching latin_mass questions:', error)
    return []
  }
}

const fallbackQuestions: LatinMassQA[] = [
  {
    question: 'O que é a Missa Tradicional (ou Tridentina)?',
    answer:
      'A Missa Tradicional, também conhecida como Missa Tridentina ou Forma Extraordinária do Rito Romano, é a forma da Missa Católica Romana que se desenvolveu ao longo de muitos séculos e foi codificada por São Pio V em 1570. É caracterizada pelo uso do latim, orientação do sacerdote ad orientem (para o leste), e uma ênfase particular na sacralidade e transcendência do Santo Sacrifício da Missa.'
  },
  {
    question: 'Por que a Missa é celebrada em latim?',
    answer:
      'O latim, como língua litúrgica universal da Igreja Ocidental, preserva a unidade e imutabilidade da doutrina católica. Não sendo uma língua vernácula moderna, está livre de mudanças semânticas e culturais, garantindo assim a precisão teológica através dos séculos. Além disso, o uso de uma língua sagrada ajuda a elevar nossas mentes ao divino e enfatiza o caráter transcendente do Santo Sacrifício.'
  },
  {
    question: "Por que o padre celebra 'de costas' para o povo?",
    answer:
      "Na realidade, o sacerdote não está 'de costas' para o povo, mas sim 'voltado para o Senhor' (ad orientem). Esta orientação antiga e venerável significa que padre e fiéis estão unidos, voltados na mesma direção, olhando juntos para o Oriente litúrgico, simbolizando nossa expectativa comum pela vinda de Cristo."
  },
  {
    question: 'Como posso participar ativamente se não entendo latim?',
    answer:
      'A participação ativa na Missa não se limita a respostas vocais, mas principalmente à união interior com o Santo Sacrifício. Os missais disponibilizam traduções lado a lado, permitindo acompanhar as orações. A própria estrutura da Missa, com seus gestos e movimentos significativos, facilita a compreensão e participação dos fiéis.'
  },
  {
    question: 'Qual a diferença entre a Missa Tradicional e a Missa Nova?',
    answer:
      'As principais diferenças incluem: o uso exclusivo do latim, a orientação ad orientem, um maior silêncio sagrado, orações mais explícitas sobre o Sacrifício, comunhão apenas na boca e de joelhos, e uma estrutura ritual mais definida e invariável. A Missa Tradicional enfatiza particularmente o aspecto sacrificial da Missa.'
  },
  {
    question: 'Por que há tanto silêncio durante a Missa Tradicional?',
    answer:
      'O silêncio sagrado, especialmente durante o Cânon da Missa, permite uma participação mais profunda no mistério que está sendo celebrado. Este silêncio não é vazio, mas cheio de reverência e adoração, permitindo que os fiéis se unam interiormente ao sacrifício de Cristo.'
  },
  {
    question: 'Como devo me vestir para a Missa Tradicional?',
    answer:
      'A vestimenta deve refletir a dignidade do Santo Sacrifício. Para homens: terno ou camisa social com calça social. Para mulheres: vestidos ou saias abaixo do joelho, ombros cobertos, e véu (mantilha) para a cabeça como sinal de reverência. A modéstia e o decoro são essenciais.'
  },
  {
    question: 'Por que as mulheres usam véu na Missa Tradicional?',
    answer:
      'O uso do véu por mulheres segue a tradição apostólica mencionada em 1 Coríntios 11. É um sinal de modéstia e reverência diante do Santíssimo Sacramento, reconhecendo a ordem sagrada da criação e a dignidade especial da mulher na Igreja.'
  },
  {
    question: 'A Missa Tradicional é válida e permitida pela Igreja?',
    answer:
      'Sim, absolutamente. O Papa Bento XVI, em seu Motu Proprio Summorum Pontificum (2007), confirmou que a Missa Tradicional nunca foi ab-rogada e que todo sacerdote tem o direito de celebrá-la. É uma das duas formas do mesmo Rito Romano.'
  },
  {
    question: 'Por que os jovens são atraídos pela Missa Tradicional?',
    answer:
      'Muitos jovens encontram na Missa Tradicional uma profunda sacralidade, beleza e sentido de transcendência que respondem à sua busca por autenticidade e tradição. A riqueza dos símbolos, a profundidade teológica e a continuidade com o passado da Igreja oferecem um antídoto ao relativismo e ao secularismo modernos.'
  }
]

export function getFallbackQuestions(): LatinMassQA[] {
  return fallbackQuestions
}
