import { useState, useEffect, useRef, useCallback } from "react";
import {
  Search, Target, AlertTriangle, Trees, Clapperboard, Clock3,
  BookOpenText, PieChart, MessageCircle, Sparkles, Users,
  ChevronDown, X, School, BarChart3, EyeOff, ClipboardList,
  Scale, Building2, Landmark, PlayCircle
} from "lucide-react";

/* ===================================================
   TIPOS
=================================================== */
interface Secao {
  id: string;
  titulo: string;
  icon: React.ReactNode;
  conteudo: React.ReactNode;
}

/* ===================================================
   FOLHA ANIMADA
=================================================== */
function Folhas() {
  const folhas = [
    { emoji: "🍃", left: "8%",  delay: "0s",   dur: "14s", size: 18 },
    { emoji: "🍂", left: "22%", delay: "3.5s",  dur: "11s", size: 16 },
    { emoji: "🍃", left: "38%", delay: "7s",    dur: "16s", size: 20 },
    { emoji: "🍂", left: "55%", delay: "1.5s",  dur: "13s", size: 15 },
    { emoji: "🍃", left: "70%", delay: "5s",    dur: "18s", size: 22 },
    { emoji: "🍂", left: "85%", delay: "9s",    dur: "12s", size: 17 },
    { emoji: "🍃", left: "15%", delay: "11s",   dur: "15s", size: 19 },
    { emoji: "🍂", left: "92%", delay: "4s",    dur: "17s", size: 14 },
  ];

  return (
    <div className="folhas" aria-hidden>
      {folhas.map((f, i) => (
        <span
          key={i}
          className="folha"
          style={{
            left: f.left,
            animationDelay: f.delay,
            animationDuration: f.dur,
            fontSize: f.size,
          }}
        >
          {f.emoji}
        </span>
      ))}
    </div>
  );
}

/* ===================================================
   BARRA DE BUSCA
=================================================== */
interface BuscaProps {
  query: string;
  setQuery: (q: string) => void;
  resultados: number;
  onLimpar: () => void;
}

function BarraBusca({ query, setQuery, resultados, onLimpar }: BuscaProps) {
  const [scrolled, setScrolled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`ativa-search${scrolled ? " scrolled" : ""}`}>
      <div className="ativa-search-inner">
        <div className="search-icon">
          <Search size={16} />
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder="Pesquisar no ATIVA..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Pesquisar seções"
        />
        {query.length > 0 && (
          <>
            <span className="search-results-badge">
              {resultados} resultado{resultados !== 1 ? "s" : ""}
            </span>
            <button className="search-clear" onClick={onLimpar} aria-label="Limpar busca">
              <X size={15} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ===================================================
   ACORDEÃO
=================================================== */
interface GrupoProps {
  id: string;
  titulo: string;
  icon: React.ReactNode;
  conteudo: React.ReactNode;
  aberto: boolean;
  onToggle: () => void;
  destaque: boolean;
}

function Grupo({ id, titulo, icon, conteudo, aberto, onToggle, destaque }: GrupoProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`grupo${destaque ? " destaque-busca" : ""}`} id={id}>
      <button
        className={`tab${aberto ? " ativo" : ""}`}
        aria-expanded={aberto}
        onClick={onToggle}
      >
        <span className="tab-icon">
          {icon}
          {titulo}
        </span>
        <ChevronDown size={17} className="tab-seta" />
      </button>

      <div ref={contentRef} className={`info${aberto ? " aberto" : ""}`}>
        {conteudo}
      </div>
    </div>
  );
}

/* ===================================================
   CONTEÚDOS DAS SEÇÕES
=================================================== */

function Objetivos() {
  return (
    <>
      <h2><Target size={20} /> Objetivos do Projeto</h2>
      <p>
        O projeto A.T.I.V.A. tem como principal objetivo discutir e conscientizar
        sobre os desafios enfrentados por estudantes indígenas em escolas
        profissionalizantes, principalmente nas EEEPs.
      </p>
      <p>
        Muitos estudantes indígenas precisam lidar diariamente com dificuldades
        de adaptação, invisibilidade cultural, preconceitos e pressão acadêmica.
      </p>
      <p>
        O projeto busca incentivar reflexões sobre inclusão, respeito,
        acolhimento e permanência estudantil.
      </p>
    </>
  );
}

function Desafios() {
  const items = [
    { titulo: "Preconceito", texto: "Muitos estudantes indígenas ainda enfrentam comentários ofensivos, julgamentos e exclusão dentro das escolas." },
    { titulo: "Adaptação Escolar", texto: "A rotina intensa das EEEPs pode tornar o ambiente cansativo e difícil de acompanhar." },
    { titulo: "Invisibilidade Cultural", texto: "Muitas vezes a cultura indígena não recebe valorização dentro do ambiente escolar." },
    { titulo: "Pressão Emocional", texto: "A cobrança acadêmica e os desafios sociais podem afetar emocionalmente os estudantes indígenas." },
  ];

  return (
    <>
      <h2><AlertTriangle size={20} /> Desafios Enfrentados</h2>
      <div className="cards">
        {items.map((c) => (
          <div className="card" key={c.titulo}>
            <strong>{c.titulo}</strong>
            <span>{c.texto}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function CulturaLocal() {
  const items = [
    { titulo: "Povos indígenas próximos da nossa realidade", texto: "A EEEP Raimundo Célio Rodrigues está localizada em uma região marcada pela presença histórica de povos indígenas, principalmente o Povo Pitaguary, presente entre Pacatuba e Maracanaú, na região da Serra da Aratanha." },
    { titulo: "Resistência cultural", texto: "Os Pitaguary preservam tradições, conhecimentos ancestrais, espiritualidade e a relação com a terra, representando um importante símbolo de resistência indígena no Ceará." },
    { titulo: "Educação e representatividade", texto: "A Constituição Federal de 1988 garante aos povos indígenas o direito a uma educação que respeite suas culturas, línguas e formas próprias de aprendizagem." },
    { titulo: "Diversidade regional", texto: "Valorizar culturas indígenas locais contribui para uma educação mais diversa, inclusiva e conectada à identidade regional da nossa comunidade." },
  ];

  return (
    <>
      <h2><Trees size={20} /> Cultura Local</h2>
      <p className="intro-cultura">
        "A cultura indígena não está distante de nós — ela faz parte da história da nossa própria região."
      </p>
      <div className="cards">
        {items.map((c) => (
          <div className="card" key={c.titulo}>
            <strong>{c.titulo}</strong>
            <span>{c.texto}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function Conteudos() {
  return (
    <>
      <h2><Clapperboard size={20} /> Conteúdos para Aprofundamento</h2>
      <p>
        Para ampliar a discussão sobre educação indígena, currículo escolar
        e diversidade cultural, reunimos uma playlist com vídeos e reflexões
        utilizadas como base para o desenvolvimento do projeto A.T.I.V.A.
      </p>
      <p>
        Os conteúdos abordam temas como invisibilidade cultural, educação indígena,
        interculturalidade, resistência dos povos originários, currículo escolar
        e os impactos da padronização educacional dentro das escolas profissionalizantes.
      </p>
      <div className="cards">
        <div className="card filme">
          <h4 style={{ color: "var(--gold)", display: "flex", alignItems: "center", gap: 8, justifyContent: "center", marginBottom: 12 }}>
            <PlayCircle size={18} /> Playlist de Reflexão
          </h4>
          <p style={{ marginBottom: 0 }}>
            Playlist utilizada como referência para compreender a trajetória
            da educação indígena, os desafios enfrentados pelos estudantes
            indígenas e a importância da valorização cultural dentro do ambiente escolar.
          </p>
          <a
            href="https://youtube.com/playlist?list=PLvX2M9aj0YUno4Xwe4m69B_b4lhJhPaHU&si=gIKLOaq4C9HttH0a"
            target="_blank"
            rel="noopener noreferrer"
            className="botao-playlist"
          >
            Acessar playlist
          </a>
        </div>
      </div>
    </>
  );
}

function Trajetoria() {
  const eventos = [
    { ano: "Educação Tradicional Indígena", texto: "Antes da imposição do modelo escolar europeu, os povos indígenas já possuíam formas próprias de educação, baseadas na oralidade, ancestralidade, convivência coletiva e relação com a natureza." },
    { ano: "Colonização e Apagamento Cultural", texto: "Durante o processo de colonização, a educação foi utilizada como instrumento de catequização e apagamento cultural, desvalorizando línguas, costumes e conhecimentos indígenas." },
    { ano: "Luta pelo Direito à Educação", texto: "Ao longo dos anos, movimentos indígenas passaram a reivindicar uma educação que respeitasse identidades culturais, línguas originárias e os modos próprios de aprendizagem." },
    { ano: "Constituição Federal de 1988", texto: "A Constituição reconheceu o direito dos povos indígenas à diferença cultural, garantindo o respeito às línguas, tradições e processos próprios de ensino." },
    { ano: "Educação Escolar Indígena", texto: "A educação indígena passou a ser reconhecida como intercultural, bilíngue e específica, buscando valorizar conhecimentos tradicionais e fortalecer identidades culturais." },
    { ano: "Entrada nas Escolas Profissionalizantes", texto: "O acesso de estudantes indígenas às EEEPs representa novas oportunidades acadêmicas, mas também evidencia desafios relacionados à adaptação curricular, pertencimento e invisibilidade cultural." },
    { ano: "Desafios Atuais", texto: "Muitos estudantes indígenas ainda enfrentam dificuldades causadas pela padronização curricular, pressão por desempenho, ausência de representatividade e falta de práticas interculturais dentro das escolas profissionalizantes." },
    { ano: "Construção de uma Educação Intercultural", texto: "O debate atual busca construir uma educação mais plural, humana e inclusiva, capaz de reconhecer os saberes indígenas como parte fundamental da formação educacional brasileira." },
  ];

  return (
    <>
      <h2><Clock3 size={20} /> Trajetória da Educação Indígena</h2>
      <p className="intro-timeline">
        A trajetória da educação indígena no Brasil é marcada por resistência,
        apagamento cultural, luta por direitos e busca por reconhecimento dentro
        das instituições educacionais.
      </p>
      <div className="timeline">
        {eventos.map((e) => (
          <div className="evento" key={e.ano}>
            <span className="ano">{e.ano}</span>
            <p>{e.texto}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function RealidadeEducacional() {
  const blocos = [
    { icon: <School size={24} />, titulo: "Ruptura Curricular", texto: "Muitos estudantes indígenas passam de uma educação intercultural para um modelo técnico e padronizado." },
    { icon: <BarChart3 size={24} />, titulo: "Avaliações Padronizadas", texto: "Provas tradicionais frequentemente ignoram diferenças culturais e linguísticas." },
    { icon: <EyeOff size={24} />, titulo: "Invisibilidade Cultural", texto: "Conhecimentos indígenas muitas vezes não aparecem nos conteúdos escolares nem nos materiais didáticos." },
    { icon: <ClipboardList size={24} />, titulo: "Pressão Acadêmica", texto: "As EEEPs possuem uma rotina intensa baseada em desempenho e produtividade escolar." },
  ];

  return (
    <>
      <h2><BookOpenText size={20} /> A Contradição da Inclusão</h2>

      <div className="banner-realidade">
        "A escola inclui no acesso, mas muitas vezes exclui na permanência."
      </div>

      <p>
        A inserção de estudantes indígenas em escolas profissionalizantes
        evidencia uma contradição profunda da educação brasileira: enquanto
        o discurso institucional defende inclusão e diversidade, muitas
        estruturas curriculares continuam incapazes de reconhecer a pluralidade
        sociocultural do país.
      </p>

      <div className="numeros-impacto">
        <div className="numero-card">
          <strong>20%–30%</strong>
          <span>Média de acertos em alguns diagnósticos educacionais indígenas</span>
        </div>
        <div className="numero-card">
          <strong>1988</strong>
          <span>Ano em que a Constituição reconheceu direitos educacionais indígenas</span>
        </div>
        <div className="numero-card">
          <strong>Inter&shy;cultural&shy;idade</strong>
          <span>Educação indígena valoriza ancestralidade, coletividade e diversidade</span>
        </div>
      </div>

      <div className="blocos-realidade">
        {blocos.map((b) => (
          <div className="bloco-realidade" key={b.titulo}>
            {b.icon}
            <h3>{b.titulo}</h3>
            <p>{b.texto}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 32 }}>
        <h3 style={{ color: "#d8ead3", display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <Scale size={18} /> Diferenças no Processo de Adaptação
        </h3>
        <div className="comparacao-grid">
          <div className="comparacao-box">
            <div className="titulo-comparacao">
              <Building2 size={18} /> Escolas Regulares
            </div>
            <ul>
              <li>Maior familiaridade com avaliações padronizadas</li>
              <li>Currículo semelhante ao modelo das EEEPs</li>
              <li>Menor ruptura cultural</li>
              <li>Adaptação mais próxima da rotina técnica</li>
            </ul>
          </div>
          <div className="comparacao-box indigena-box">
            <div className="titulo-comparacao">
              <Trees size={18} /> Escolas Indígenas
            </div>
            <ul>
              <li>Diferenças linguísticas e culturais</li>
              <li>Ruptura entre modelos educacionais</li>
              <li>Invisibilidade de saberes tradicionais</li>
              <li>Maior pressão de adaptação curricular</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="citacao-impacto">
        "O desafio não é adaptar o estudante indígena à escola,
        mas transformar a escola em um espaço verdadeiramente intercultural."
      </div>
    </>
  );
}

function DadosPesquisa() {
  const perguntas = [
    {
      num: "01",
      texto: "Você sabe qual é o currículo escolar de uma escola profissionalizante?",
      img: "https://i.ibb.co/27k7GYGZ/2404-E228-4397-40-A6-B771-DD9-C0-A1-B50-A0.png",
    },
    {
      num: "02",
      texto: "No cotidiano escolar, há um entendimento sobre diversidade cultural?",
      img: "https://i.ibb.co/xSx337HH/IMG-5434.png",
    },
    {
      num: "03",
      texto: "Existe adaptação ao currículo para estudantes indígenas?",
      img: "https://i.ibb.co/WpRXxmmm/IMG-5435.png",
    },
    {
      num: "04",
      texto: "Você já ouviu relatos de estudantes indígenas sobre não se sentirem representados?",
      img: "https://i.ibb.co/pvr4Rv9V/IMG-5437.png",
    },
    {
      num: "05",
      texto: "A escola profissional atende as necessidades reais dos estudantes indígenas?",
      img: "https://i.ibb.co/FLGywrxQ/IMG-5436.png",
    },
  ];

  return (
    <>
      <h2><PieChart size={20} /> Resultados da Pesquisa</h2>
      <p>
        A pesquisa foi realizada com estudantes de diferentes turmas da EEEP,
        buscando compreender percepções sobre diversidade cultural, currículo
        escolar e adaptação de estudantes indígenas.
      </p>
      <div className="graficos-pesquisa">
        {perguntas.map((p) => (
          <div className="pergunta" key={p.num}>
            <h3>Pergunta {p.num}<br />{p.texto}</h3>
            <div className="grafico">
              <img src={p.img} alt={`Gráfico Pergunta ${p.num}`} loading="lazy" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function Relatos() {
  const relatos = [
    { tema: "Educação e pertencimento", fala: "A educação precisa respeitar os diferentes modos de existir.", autor: "Gersem Baniwa" },
    { tema: "Invisibilidade cultural", fala: "Muitos querem falar sobre os povos indígenas sem ouvir os próprios indígenas.", autor: "Ailton Krenak" },
    { tema: "Valorização da cultura", fala: "Nossos conhecimentos também são ciência.", autor: "Davi Kopenawa Yanomami" },
    { tema: "Resistência indígena", fala: "Nossa luta também é pelo direito de continuar existindo.", autor: "Cacique Raoni" },
    { tema: "Representatividade", fala: "Valorizar culturas indígenas é reconhecer a riqueza dos povos originários.", autor: "Joenia Wapichana" },
    { tema: "Cultura e ancestralidade", fala: "A floresta é nossa casa, nossa memória e nossa vida.", autor: "Sonia Guajajara" },
  ];

  return (
    <>
      <h2><MessageCircle size={20} /> Relatos e Reflexões</h2>
      <p className="intro-relatos">
        As falas abaixo reforçam discussões sobre educação, pertencimento,
        invisibilidade cultural e a importância da valorização dos povos
        indígenas dentro da sociedade e das escolas.
      </p>
      <div className="relatos-container">
        {relatos.map((r) => (
          <div className="relato" key={r.autor}>
            <span className="tema-relato">{r.tema}</span>
            <p>"{r.fala}"</p>
            <span className="autor-relato">— {r.autor}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function Reflexoes() {
  const items = [
    { titulo: "Inclusão Escolar", texto: "Inclusão não significa apenas permitir entrada, mas garantir acolhimento, respeito e permanência." },
    { titulo: "Diversidade Cultural", texto: "Reconhecer e valorizar diferentes culturas enriquece o ambiente escolar para todos os estudantes." },
    { titulo: "Educação Intercultural", texto: "Uma educação plural reconhece diferentes modos de aprender, existir e construir conhecimento." },
    { titulo: "Pertencimento", texto: "Sentir-se parte do ambiente escolar é fundamental para o desenvolvimento acadêmico e emocional." },
    { titulo: "Escuta Ativa", texto: "Ouvir as experiências dos próprios estudantes indígenas é o primeiro passo para uma escola mais justa." },
    { titulo: "Transformação Coletiva", texto: "A mudança começa quando toda a comunidade escolar se envolve na construção de um ambiente mais inclusivo." },
  ];

  return (
    <>
      <h2><Sparkles size={20} /> Reflexões</h2>
      <div className="reflexoes-grid">
        {items.map((r) => (
          <div className="reflexao-card" key={r.titulo}>
            <strong>{r.titulo}</strong>
            <p>{r.texto}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function Integrantes() {
  const orientador = {
    nome: "Gabriel Xavier",
    papel: "Orientador",
    foto: "https://i.ibb.co/PGRMQnqw/dd590e55-a705-4635-9adb-9177fa7ed51f.jpg",
  };

  const membros = [
    { nome: "Isabelle Cavalcante da Silva",      papel: "Estudante do 2º ano Automação", foto: "https://i.ibb.co/jvHpnpmK/8674ecda-fe26-4ade-9f10-9507b3286d52.jpg" },
    { nome: "Jefferson Belo Lima Barbosa",        papel: "Estudante do 2º ano Automação", foto: "https://i.ibb.co/hJfdh6bL/bf3ca98a-ca86-47dd-bba4-b05bb568e1cf.jpg" },
    { nome: "Laís Alves de Sousa",               papel: "Estudante do 2º ano Automação", foto: "https://i.ibb.co/994fCjvd/4a3002a4-334b-446c-b9d3-1ab45dcb1181.jpg" },
    { nome: "Letícia Cavalcante Lima",            papel: "Estudante do 2º ano Automação", foto: "https://i.ibb.co/prGc48Kf/IMG-5394.jpg" },
    { nome: "Maria Eduarda Rocha Cavalcante",     papel: "Estudante do 2º ano Automação", foto: "https://i.ibb.co/Bhq1010/8c8d5f95-92c8-4fd1-aba4-ff20903244a4.jpg" },
    { nome: "Maria Izabelle do Nascimento Santos",papel: "Estudante do 2º ano Automação", foto: "https://i.ibb.co/pBySDQ19/a57fbeaf-636e-4126-8ede-209933cf6e18.jpg" },
    { nome: "Mikaely Xavier Soares",              papel: "Estudante do 2º ano Automação", foto: "https://i.ibb.co/G3JpszPg/15088f15-aeb9-4bb1-862c-c0d49fbace39.jpg" },
    { nome: "Naylla Laiane Holanda de Lima",      papel: "Estudante do 2º ano Automação", foto: "https://i.ibb.co/3yx5yqYC/3b560465-64aa-464b-866a-e169588f7957.jpg" },
  ];

  return (
    <>
      <h2><Users size={20} /> Integrantes do Grupo</h2>

      <div className="integrantes-grid">
        <div className="integrante-card destaque">
          <img
            src={orientador.foto}
            alt={orientador.nome}
            className="foto-integrante"
          />
          <h4>{orientador.nome}</h4>
          <p className="cargo">{orientador.papel}</p>
        </div>

        {membros.map((m) => (
          <div className="integrante-card" key={m.nome}>
            <img
              src={m.foto}
              alt={m.nome}
              className="foto-integrante"
              loading="lazy"
            />
            <h4>{m.nome}</h4>
            <p className="turma">{m.papel}</p>
          </div>
        ))}
      </div>
    </>
  );
}

/* ===================================================
   COMPONENTE PRINCIPAL
=================================================== */
export default function App() {
  const [query, setQuery] = useState("");
  const [abertos, setAbertos] = useState<Record<string, boolean>>({});
  const [destaques, setDestaques] = useState<string[]>([]);

  const secoes: Secao[] = [
    { id: "objetivos",    titulo: "Objetivos",                   icon: <Target size={16} />,       conteudo: <Objetivos /> },
    { id: "desafios",     titulo: "Desafios",                    icon: <AlertTriangle size={16} />, conteudo: <Desafios /> },
    { id: "cultura",      titulo: "Cultura Local",               icon: <Trees size={16} />,         conteudo: <CulturaLocal /> },
    { id: "conteudos",    titulo: "Conteúdos",                   icon: <Clapperboard size={16} />,  conteudo: <Conteudos /> },
    { id: "trajetoria",   titulo: "Trajetória da Educação",      icon: <Clock3 size={16} />,        conteudo: <Trajetoria /> },
    { id: "realidade",    titulo: "Realidade Educacional",       icon: <BookOpenText size={16} />,  conteudo: <RealidadeEducacional /> },
    { id: "dados",        titulo: "Dados da Pesquisa",           icon: <PieChart size={16} />,      conteudo: <DadosPesquisa /> },
    { id: "relatos",      titulo: "Relatos",                     icon: <MessageCircle size={16} />, conteudo: <Relatos /> },
    { id: "reflexoes",    titulo: "Reflexões",                   icon: <Sparkles size={16} />,      conteudo: <Reflexoes /> },
    { id: "integrantes",  titulo: "Integrantes",                 icon: <Users size={16} />,         conteudo: <Integrantes /> },
  ];

  const toggleSecao = useCallback((id: string) => {
    setAbertos((prev) => {
      const isOpen = !!prev[id];
      if (isOpen) {
        return { ...prev, [id]: false };
      }
      return { [id]: true };
    });
  }, []);

  const irPara = useCallback((id: string) => {
    setAbertos({ [id]: true });
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  }, []);

  // Busca reativa
  useEffect(() => {
    if (!query.trim()) {
      setDestaques([]);
      return;
    }
    const q = query.toLowerCase().trim();
    const mapa: Record<string, string> = {
      objetivos:   "Objetivos do Projeto inclusão respeito EEEPs",
      desafios:    "Desafios preconceito adaptação escolar invisibilidade cultural pressão emocional",
      cultura:     "Cultura Local Pitaguary Maracanaú Pacatuba Ceará resistência representatividade",
      conteudos:   "Conteúdos playlist vídeos interculturalidade resistência",
      trajetoria:  "Trajetória colonização constituição 1988 educação intercultural bilíngue",
      realidade:   "Realidade educacional inclusão contradição currículo padronizado pressão acadêmica",
      dados:       "Dados pesquisa gráficos diagnóstico estudantes",
      relatos:     "Relatos Ailton Krenak Sonia Guajajara Raoni reflexões pertencimento",
      reflexoes:   "Reflexões inclusão diversidade pertencimento escuta transformação",
      integrantes: "Integrantes projeto orientadora equipe membros",
    };
    const encontrados = secoes
      .filter((s) => {
        const texto = (s.titulo + " " + (mapa[s.id] ?? "")).toLowerCase();
        return texto.includes(q);
      })
      .map((s) => s.id);

    setDestaques(encontrados);

    if (encontrados.length > 0) {
      const novosAbertos: Record<string, boolean> = {};
      encontrados.forEach((id) => { novosAbertos[id] = true; });
      setAbertos((prev) => ({ ...prev, ...novosAbertos }));
      setTimeout(() => {
        const el = document.getElementById(encontrados[0]);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  }, [query]);

  const limparBusca = () => {
    setQuery("");
    setDestaques([]);
  };

  return (
    <>
      <Folhas />

      <BarraBusca
        query={query}
        setQuery={setQuery}
        resultados={destaques.length}
        onLimpar={limparBusca}
      />

      <div className="page-wrapper">
        <main className="hero">
          <h1>ATIVA</h1>

          <p className="subtitulo">
            Accountability e Trajetórias Indígenas em Vivências Acadêmicas
          </p>

          <p className="frase">
            "Valorizar culturas também é transformar a educação."
          </p>

          <p className="intro">
            O projeto A.T.I.V.A. busca conscientizar sobre os desafios enfrentados por
            estudantes indígenas em escolas profissionalizantes, principalmente nas EEEPs.
          </p>

          {/* Navegação rápida */}
          <nav className="nav-rapida" aria-label="Navegação rápida">
            {secoes.map((s) => (
              <button
                key={s.id}
                className="nav-pill"
                onClick={() => irPara(s.id)}
                aria-label={`Ir para ${s.titulo}`}
              >
                {s.titulo}
              </button>
            ))}
          </nav>

          {/* Acordeão */}
          <div className="botoes">
            {secoes.map((s) => (
              <Grupo
                key={s.id}
                id={s.id}
                titulo={s.titulo}
                icon={s.icon}
                conteudo={s.conteudo}
                aberto={!!abertos[s.id]}
                onToggle={() => toggleSecao(s.id)}
                destaque={destaques.includes(s.id)}
              />
            ))}
          </div>

          <footer className="site-footer">
            <p>Projeto A.T.I.V.A. — EEEP Raimundo Célio Rodrigues</p>
            <p>Conscientização sobre estudantes indígenas nas EEEPs</p>
          </footer>
        </main>
      </div>
    </>
  );
}
