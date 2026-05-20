import { useState, useEffect, useRef, useCallback } from "react";
import {
  Search, Target, AlertTriangle, Trees, Clapperboard, Clock3,
  BookOpenText, PieChart, MessageCircle, Sparkles, Users,
  ChevronDown, X, School, BarChart3, EyeOff, ClipboardList,
  Scale, Building2, Landmark, PlayCircle, Feather
} from "lucide-react";

/* ===================================================
   TIPOS
=================================================== */
interface Secao {
  id: string;
  titulo: string;
  descricao: string;
  icon: React.ReactNode;
  conteudo: React.ReactNode;
}

/* ===================================================
   SPLASH SCREEN
=================================================== */
function SplashScreen({ onFim }: { onFim: () => void }) {
  const letras = [
    { l: "A", w: "Accountability" },
    { l: "T", w: "Trajetórias" },
    { l: "I", w: "Indígenas" },
    { l: "V", w: "Vivências" },
    { l: "A", w: "Acadêmicas" },
  ];
  const [saindo, setSaindo] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setSaindo(true);
      setTimeout(onFim, 600);
    }, 3400);
    return () => clearTimeout(t);
  }, [onFim]);

  return (
    <div className={`splash${saindo ? " splash-saindo" : ""}`}>
      <div className="splash-letras">
        {letras.map(({ l, w }, i) => (
          <div key={i} className="splash-item" style={{ animationDelay: `${i * 0.38}s` }}>
            <span className="splash-letra">{l}</span>
            <span className="splash-palavra">{w}</span>
          </div>
        ))}
      </div>
      <p className="splash-sub" style={{ animationDelay: "2.2s" }}>
        Projeto de pesquisa — EEEP Raimundo Célio Rodrigues
      </p>
    </div>
  );
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
  onBuscar: (q: string) => void;
  destaques: string[];
}

function BarraBusca({ onBuscar, destaques = [] }: BuscaProps) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [valor, setValor] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const ultimoScroll = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const atual = window.scrollY;
      if (atual > ultimoScroll.current && atual > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setScrolled(atual > 10);
      ultimoScroll.current = atual;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setValor(v);
    onBuscar(v);
  };

  const limpar = () => {
    setValor("");
    onBuscar("");
    inputRef.current?.focus();
  };

  return (
    <div
      className={`ativa-search${scrolled ? " scrolled" : ""}${hidden ? " escondida" : ""}`}
    >
      <div className="ativa-search-inner">
        <div className="search-icon">
          <Search size={16} />
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder="Pesquisar no ATIVA..."
          value={valor}
          onChange={handleChange}
          aria-label="Pesquisar seções"
        />
        {valor.length > 0 && (
          <>
            {destaques.length > 0 && (
              <span className="search-results-badge">
                {destaques.length} resultado{destaques.length !== 1 ? "s" : ""}
              </span>
            )}
            <button className="search-clear" onClick={limpar} aria-label="Limpar busca">
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
  descricao: string;
  icon: React.ReactNode;
  conteudo: React.ReactNode;
  aberto: boolean;
  onToggle: () => void;
  destaque: boolean;
}

function Grupo({ id, titulo, descricao, icon, conteudo, aberto, onToggle, destaque }: GrupoProps) {
  return (
    <div className={`grupo${destaque ? " destaque-busca" : ""}`} id={id}>
      <button
        className={`tab${aberto ? " ativo" : ""}`}
        aria-expanded={aberto}
        onClick={onToggle}
      >
        <span className="tab-body">
          <span className="tab-icon">
            {icon}
            {titulo}
          </span>
          {!aberto && <span className="tab-descricao">{descricao}</span>}
        </span>
        <ChevronDown size={17} className="tab-seta" />
      </button>

      <div className={`info${aberto ? " aberto" : ""}`}>
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

      {/* Banner com foto */}
      <div className="cultura-banner">
        <img
          src="https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=735319997539934"
          alt="Natureza — Serra da Aratanha, Ceará"
          className="cultura-foto"
          loading="lazy"
        />
        <div className="cultura-overlay">
          <Trees size={28} />
          <p>"A cultura indígena não está distante de nós — ela faz parte da história da nossa própria região."</p>
          <span>Povo Pitaguary — Serra da Aratanha, Ceará</span>
        </div>
      </div>

      <div className="cards" style={{ marginTop: 24 }}>
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

  const [atual, setAtual] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const anterior = () => setAtual((i) => (i === 0 ? relatos.length - 1 : i - 1));
  const proximo  = () => setAtual((i) => (i === relatos.length - 1 ? 0 : i + 1));
  const r = relatos[atual];

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? proximo() : anterior();
    touchStartX.current = null;
  };

  return (
    <>
      <h2><MessageCircle size={20} /> Relatos e Reflexões</h2>
      <p className="intro-relatos">
        Falas de lideranças indígenas sobre educação, pertencimento e cultura.
      </p>

      <div
        className="carousel-relato"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="aspas-deco">"</div>
        <span className="tema-relato">{r.tema}</span>
        <p className="fala-carousel">{r.fala}</p>
        <span className="autor-relato">— {r.autor}</span>

        <div className="carousel-nav">
          <button onClick={anterior} aria-label="Anterior" className="carousel-btn">‹</button>
          <div className="carousel-dots">
            {relatos.map((_, i) => (
              <button
                key={i}
                className={`dot${i === atual ? " dot-ativo" : ""}`}
                onClick={() => setAtual(i)}
                aria-label={`Ir para relato ${i + 1}`}
              />
            ))}
          </div>
          <button onClick={proximo} aria-label="Próximo" className="carousel-btn">›</button>
        </div>
        <span className="swipe-hint">deslize para navegar</span>
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
   PADRÃO GEOMÉTRICO INDÍGENA
=================================================== */
function PadraoIndigena({ opacidade = 1 }: { opacidade?: number }) {
  return (
    <div className="padrao-indigena" aria-hidden="true" style={{ opacity: opacidade }}>
      <svg width="100%" height="32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="zig-ind" x="0" y="0" width="56" height="32" patternUnits="userSpaceOnUse">
            {/* Linha superior — ziguezague principal */}
            <polyline points="0,10 14,2 28,10 42,2 56,10"
              fill="none" stroke="rgba(214,178,122,0.55)" strokeWidth="1.8" strokeLinejoin="round" />
            {/* Linha inferior — espelho */}
            <polyline points="0,22 14,30 28,22 42,30 56,22"
              fill="none" stroke="rgba(214,178,122,0.28)" strokeWidth="1.2" strokeLinejoin="round" />
            {/* Losango central */}
            <polygon points="28,8 33,16 28,24 23,16"
              fill="rgba(214,178,122,0.10)" stroke="rgba(214,178,122,0.45)" strokeWidth="1" />
            {/* Pontos de junção */}
            <circle cx="0"  cy="10" r="2" fill="rgba(214,178,122,0.4)" />
            <circle cx="14" cy="2"  r="2" fill="rgba(214,178,122,0.4)" />
            <circle cx="28" cy="10" r="2" fill="rgba(214,178,122,0.4)" />
            <circle cx="42" cy="2"  r="2" fill="rgba(214,178,122,0.4)" />
            <circle cx="56" cy="10" r="2" fill="rgba(214,178,122,0.4)" />
          </pattern>
        </defs>
        <rect width="100%" height="32" fill="url(#zig-ind)" />
      </svg>
    </div>
  );
}

/* ===================================================
   BARRA DE PROGRESSO DE LEITURA
=================================================== */
function ProgressoLeitura() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const atualizar = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      setPct(total > 0 ? Math.min(100, (window.scrollY / total) * 100) : 0);
    };
    window.addEventListener("scroll", atualizar, { passive: true });
    return () => window.removeEventListener("scroll", atualizar);
  }, []);

  return (
    <div className="progresso-trilha" aria-hidden="true">
      <div className="progresso-barra" style={{ width: `${pct}%` }} />
    </div>
  );
}

/* ===================================================
   BOTÃO VOLTAR AO TOPO
=================================================== */
function BotaoTopo() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisivel(window.scrollY > 380);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      className={`botao-topo${visivel ? " visivel" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Voltar ao topo"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polyline points="3,12 9,5 15,12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

/* ===================================================
   TEXTO DO ORIENTADOR
=================================================== */
function TextoOrientador() {
  const paragrafos = [
    "A inserção de estudantes indígenas em escolas profissionalizantes evidencia uma das contradições mais profundas da educação brasileira contemporânea: a coexistência entre o discurso da inclusão e a manutenção de estruturas curriculares incapazes de reconhecer a pluralidade sociocultural do país. Quando estudantes oriundos de escolas localizadas em territórios indígenas ingressam em Escolas Estaduais de Educação Profissional (EEEPs), frequentemente se deparam com um modelo pedagógico rigidamente orientado por desempenho, produtividade e padronização curricular, destoando radicalmente das experiências educativas vivenciadas em suas comunidades de origem.",
    "A educação escolar indígena, respaldada pela Constituição Federal de 1988 e pela Lei de Diretrizes e Bases da Educação Nacional, fundamenta-se nos princípios da interculturalidade, do bilinguismo e da valorização dos saberes tradicionais. Entretanto, ao ingressarem nas EEEPs, muitos estudantes indígenas passam a enfrentar um ambiente educacional estruturado sob uma lógica técnico-gerencial, marcada pela intensificação das avaliações externas, pela centralidade dos indicadores de desempenho e pela cultura da alta performance acadêmica. Nesse contexto, ocorre uma ruptura pedagógica e identitária: os conhecimentos, ritmos e experiências construídos nas aldeias tornam-se invisibilizados diante de um currículo que privilegia competências alinhadas às demandas do mercado e aos índices institucionais de rendimento.",
    "Essa disparidade torna-se evidente nos resultados das avaliações diagnósticas promovidas pela SEDUC. Historicamente, estudantes indígenas aparecem nos níveis crítico ou muito crítico, sobretudo nas áreas de Língua Portuguesa e Matemática, apresentando percentuais de acerto frequentemente entre 20% e 30%. Todavia, interpretar esses dados apenas sob a ótica do déficit cognitivo ou da baixa aprendizagem constitui uma leitura simplista e profundamente injusta. Tais indicadores revelam, antes de tudo, a incapacidade do sistema educacional em construir instrumentos avaliativos sensíveis às especificidades culturais, linguísticas e epistemológicas desses sujeitos.",
    "As avaliações padronizadas operam a partir de uma concepção homogênea de conhecimento, desconsiderando que muitos estudantes indígenas possuem trajetórias escolares atravessadas por outras formas de produção de saber, outras temporalidades e outras relações com a linguagem e com o mundo. Desse modo, o baixo desempenho não pode ser dissociado das desigualdades estruturais, das barreiras linguísticas, da ausência de políticas de transição curricular e da insuficiência de práticas pedagógicas interculturais nas escolas profissionalizantes.",
    "Além disso, a própria lógica da Accountability presente nas EEEPs aprofunda esse problema. Inspirada em modelos gerenciais de educação, a Accountability estabelece mecanismos de responsabilização baseados em metas, resultados quantitativos e desempenho institucional. Na prática, escolas, gestores e professores passam a ser pressionados por índices e rankings, criando uma cultura educacional orientada pela eficiência e pela competitividade. Nesse cenário, estudantes indígenas acabam sendo percebidos, muitas vezes, como sujeitos que \"comprometem\" os indicadores da escola, reforçando processos sutis — e por vezes explícitos — de exclusão pedagógica.",
    "O problema central reside justamente na incompatibilidade entre a lógica da Accountability e as experiências socioculturais dos povos indígenas. Enquanto a educação indígena valoriza coletividade, territorialidade, ancestralidade e diversidade de saberes, o modelo gerencial das EEEPs prioriza padronização, desempenho individual e produtividade mensurável. Trata-se, portanto, de um choque entre racionalidades distintas de educação e de formação humana.",
    "Nesse sentido, discutir o baixo rendimento de estudantes indígenas sem problematizar as estruturas curriculares e avaliativas das escolas profissionalizantes significa responsabilizar os próprios sujeitos por uma exclusão produzida institucionalmente. A questão não é apenas pedagógica, mas política e epistemológica. O desafio da educação brasileira não consiste em \"adaptar\" o estudante indígena à lógica da escola profissionalizante, mas em transformar a própria escola para que ela seja efetivamente intercultural, plural e socialmente justa.",
    "Portanto, enfrentar essa realidade exige mais do que políticas compensatórias ou reforço escolar. É necessário repensar profundamente os currículos, os processos avaliativos e os mecanismos de Accountability que organizam a educação pública contemporânea. Sem isso, a escola continuará reproduzindo desigualdades históricas sob o discurso da meritocracia e da eficiência, perpetuando a marginalização de sujeitos cujas experiências e saberes permanecem sistematicamente silenciados dentro das instituições escolares.",
  ];

  const totalPalavras = paragrafos.join(" ").split(/\s+/).length;
  const minutos = Math.ceil(totalPalavras / 200);

  return (
    <>
      <h2><Feather size={20} /> Texto do Orientador</h2>

      <div className="tempo-leitura">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
        {minutos} min de leitura · {totalPalavras} palavras
      </div>

      <div className="orientador-header">
        <img
          src="https://i.ibb.co/PGRMQnqw/dd590e55-a705-4635-9adb-9177fa7ed51f.jpg"
          alt="Gabriel Xavier"
          className="orientador-avatar"
        />
        <div className="orientador-info">
          <strong>Gabriel Xavier</strong>
          <span>Professor Orientador</span>
          <span>EEEP Raimundo Célio Rodrigues</span>
        </div>
      </div>

      <blockquote className="texto-destaque">
        "O desafio da educação brasileira não consiste em 'adaptar' o estudante indígena à lógica da escola
        profissionalizante, mas em transformar a própria escola para que ela seja efetivamente intercultural,
        plural e socialmente justa."
      </blockquote>

      <div className="texto-corpo">
        {paragrafos.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </>
  );
}

/* ===================================================
   COMPONENTE PRINCIPAL
=================================================== */
export default function App() {
  const [abertos, setAbertos] = useState<Record<string, boolean>>({ objetivos: true });
  const [destaques, setDestaques] = useState<string[]>([]);
  const [splashVisivel, setSplashVisivel] = useState(() => {
    try { return !sessionStorage.getItem("ativa-splash"); } catch { return false; }
  });

  const onSplashFim = useCallback(() => {
    try { sessionStorage.setItem("ativa-splash", "1"); } catch {}
    setSplashVisivel(false);
  }, []);

  const MAPA_BUSCA: Record<string, string> = {
    objetivos:   "objetivo objetivos inclusão respeito eeep",
    desafios:    "desafio desafios preconceito adaptação invisibilidade pressão emocional",
    cultura:     "cultura local pitaguary maracanaú pacatuba ceará resistência representatividade",
    conteudos:   "conteudo conteudos playlist video interculturalidade",
    trajetoria:  "trajetoria trajetória colonização constituição 1988 intercultural bilíngue",
    realidade:   "realidade educacional inclusão contradição currículo padronizado accountability",
    dados:       "dados pesquisa grafico diagnóstico estudantes",
    relatos:     "relato relatos krenak guajajara raoni pertencimento",
    reflexoes:   "reflexão reflexoes diversidade escuta transformação",
    orientador:  "orientador gabriel xavier texto análise accountability currículo avaliação estrutural",
    integrantes: "integrante integrantes orientador equipe membros gabriel xavier isabelle",
  };

  const secoes: Secao[] = [
    { id: "objetivos",   titulo: "Objetivos",               descricao: "O que o projeto busca alcançar e por quê",              icon: <Target size={16} />,       conteudo: <Objetivos /> },
    { id: "desafios",    titulo: "Desafios",                descricao: "Preconceito, adaptação e invisibilidade cultural",       icon: <AlertTriangle size={16} />, conteudo: <Desafios /> },
    { id: "cultura",     titulo: "Cultura Local",           descricao: "O Povo Pitaguary e a resistência indígena no Ceará",     icon: <Trees size={16} />,         conteudo: <CulturaLocal /> },
    { id: "conteudos",   titulo: "Conteúdos",               descricao: "Playlist com vídeos e reflexões sobre educação indígena",icon: <Clapperboard size={16} />,  conteudo: <Conteudos /> },
    { id: "trajetoria",  titulo: "Trajetória da Educação",  descricao: "Da colonização até a educação intercultural atual",      icon: <Clock3 size={16} />,        conteudo: <Trajetoria /> },
    { id: "realidade",   titulo: "Realidade Educacional",   descricao: "A contradição entre inclusão no acesso e na permanência",icon: <BookOpenText size={16} />,  conteudo: <RealidadeEducacional /> },
    { id: "dados",       titulo: "Dados da Pesquisa",       descricao: "Resultados do questionário aplicado na EEEP",            icon: <PieChart size={16} />,      conteudo: <DadosPesquisa /> },
    { id: "relatos",     titulo: "Relatos",                 descricao: "Falas de lideranças indígenas sobre educação e cultura",  icon: <MessageCircle size={16} />, conteudo: <Relatos /> },
    { id: "reflexoes",   titulo: "Reflexões",               descricao: "Inclusão, pertencimento e transformação coletiva",       icon: <Sparkles size={16} />,      conteudo: <Reflexoes /> },
    { id: "orientador",  titulo: "Texto do Orientador",     descricao: "Análise do Prof. Gabriel Xavier sobre accountability e educação indígena", icon: <Feather size={16} />, conteudo: <TextoOrientador /> },
    { id: "integrantes", titulo: "Integrantes",             descricao: "Equipe responsável pelo projeto A.T.I.V.A.",             icon: <Users size={16} />,         conteudo: <Integrantes /> },
  ];

  // Abre a aba clicada, fecha todas as outras (igual ao JS original)
  const toggleSecao = useCallback((id: string) => {
    setAbertos((prev) => {
      const jaAtivo = !!prev[id];
      if (jaAtivo) {
        // já estava aberta: fecha tudo
        return {};
      }
      // fecha tudo e abre só essa
      return { [id]: true };
    });

    // rola até o conteúdo da aba (igual ao info.scrollIntoView do JS original)
    setTimeout(() => {
      const grupo = document.getElementById(id);
      if (grupo) {
        const info = grupo.querySelector(".info");
        if (info) {
          info.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          grupo.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }, 60);
  }, []);

  // Navegação rápida: abre a aba e rola
  const irPara = useCallback((id: string) => {
    setAbertos({ [id]: true });
    setTimeout(() => {
      const grupo = document.getElementById(id);
      if (grupo) {
        const info = grupo.querySelector(".info");
        if (info) {
          info.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }, 60);
  }, []);

  // Busca em tempo real enquanto digita
  const handleBuscar = useCallback((valor: string) => {
    if (!valor.trim()) {
      setDestaques([]);
      return;
    }
    const q = valor.toLowerCase().trim();

    const encontrados = secoes
      .filter((s) => {
        const texto = (s.titulo + " " + s.descricao + " " + (MAPA_BUSCA[s.id] ?? "")).toLowerCase();
        return texto.includes(q);
      })
      .map((s) => s.id);

    setDestaques(encontrados);

    if (encontrados.length > 0) {
      const primeiroId = encontrados[0];
      const el = document.getElementById(primeiroId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <>
      {splashVisivel && <SplashScreen onFim={onSplashFim} />}

      <ProgressoLeitura />
      <BotaoTopo />
      <Folhas />

      <BarraBusca
        onBuscar={handleBuscar}
        destaques={destaques}
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

          {/* Card da sigla */}
          <div className="sigla-card">
            {[
              { letra: "A", palavra: "Accountability" },
              { letra: "T", palavra: "Trajetórias" },
              { letra: "I", palavra: "Indígenas" },
              { letra: "V", palavra: "Vivências" },
              { letra: "A", palavra: "Acadêmicas" },
            ].map((item, i) => (
              <div className="sigla-item" key={i}>
                <span className="sigla-letra">{item.letra}</span>
                <span className="sigla-palavra">{item.palavra}</span>
              </div>
            ))}
          </div>

          {/* Separador geométrico indígena */}
          <PadraoIndigena />

          {/* Acordeão */}
          <div className="botoes">
            {secoes.map((s) => (
              <Grupo
                key={s.id}
                id={s.id}
                titulo={s.titulo}
                descricao={s.descricao}
                icon={s.icon}
                conteudo={s.conteudo}
                aberto={!!abertos[s.id]}
                onToggle={() => toggleSecao(s.id)}
                destaque={destaques.includes(s.id)}
              />
            ))}
          </div>

          <footer className="site-footer">
            <PadraoIndigena opacidade={0.6} />

            <div className="footer-grid">
              <div className="footer-bloco">
                <span className="footer-label">Projeto</span>
                <strong>A.T.I.V.A.</strong>
                <span>Accountability e Trajetórias Indígenas<br />em Vivências Acadêmicas</span>
              </div>

              <div className="footer-bloco">
                <span className="footer-label">Escola</span>
                <strong>EEEP Raimundo Célio Rodrigues</strong>
                <span>Serra — Ceará · Brasil</span>
              </div>

              <div className="footer-bloco">
                <span className="footer-label">Disciplina &amp; Período</span>
                <strong>Projeto de Vida</strong>
                <span>2º Ano — Automação Industrial<br />1º Semestre · 2025</span>
              </div>

              <div className="footer-bloco">
                <span className="footer-label">Orientação</span>
                <strong>Prof. Gabriel Xavier</strong>
                <span>Ciências Sociais</span>
              </div>
            </div>

            <div className="footer-rodape">
              <span>Desenvolvido com dedicação pelos integrantes do grupo ATIVA</span>
              <span className="footer-sep">·</span>
              <span>Todos os direitos sobre o conteúdo reservados · 2025</span>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}
