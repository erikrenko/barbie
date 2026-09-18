import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Clock3,
  Expand,
  Glasses,
  Home as HomeIcon,
  Image as ImageIcon,
  Lightbulb,
  Palette,
  Pencil,
  Rocket,
  Sparkles,
  Stethoscope,
  Sun,
  X,
} from "lucide-react";

const ASSETS = {
  hero: "/manus-storage/barbie-hero_7ebe8515.png",
  ruth: "/manus-storage/ruth-handler-illustration_b3dff029.png",
  decades: "/manus-storage/barbie-decades_10d4eb95.png",
};

const pages = [
  { number: "01", label: "UVOD", title: "DOBRODOŠLA V BARBIJINI ZGODBI", kicker: "POTOVANJE SKOZI ČAS" },
  { number: "02", label: "USTVARJALKA", title: "KDO JE BILA RUTH HANDLER?", kicker: "IDEJA SE ZAČNE Z OPAZOVANJEM" },
  { number: "03", label: "ZAČETEK", title: "KAKO SE JE ZAČELA ZGODBA?", kicker: "PAPIRNATE LUTKE IN VELIKA IDEJA" },
  { number: "04", label: "1959", title: "BARBIE PRIDE NA SVET", kicker: "PRVO POGLAVJE" },
  { number: "05", label: "PRVA BARBIE", title: "PRVA BARBIE", kicker: "OBLAČILA POVEDO ZGODBO" },
  { number: "06", label: "POKLICI", title: "BARBIE IN NJENI POKLICI", kicker: "LAHKO SANJAŠ O VELIKIH STVAREH" },
  { number: "07", label: "DESETLETJA", title: "BARBIE SKOZI DESETLETJA", kicker: "MODO SPREMINJAJO ČAS IN IDEJE" },
  { number: "08", label: "GALERIJA", title: "SLIKOVNA GALERIJA", kicker: "POGLEJ, POVEČAJ, RAZIŠČI" },
  { number: "09", label: "KVIZ", title: "KVIZ IN USTVARJALNA NALOGA", kicker: "TVOJA DOMIŠLJIJA JE TVOJA SUPERMOČ" },
];

const gallery = [
  { src: ASSETS.hero, title: "Barbie leta 1959", text: "Ena prvih Barbie in začetek velike zgodbe." },
  { src: ASSETS.ruth, title: "Ideje za novo igračo", text: "Ustvarjanje se pogosto začne z risbo, vprašanjem in radovednostjo." },
  { src: ASSETS.decades, title: "Barbie skozi čas", text: "Oblačila, poklici in barve se skozi leta spreminjajo." },
];

const quizQuestions = [
  {
    question: "KDAJ SE JE BARBIE PRVIČ POJAVILA?",
    answers: ["LETA 1945", "LETA 1959", "LETA 2000"],
    correct: 1,
  },
  {
    question: "PO KOM JE BARBIE DOBILA IME?",
    answers: ["PO MESTU", "PO ROŽI", "PO BARBARI, HČERKI RUTH HANDLER"],
    correct: 2,
  },
  {
    question: "KAJ LAHKO OTROCI RAZISKUJEJO PRI IGRI?",
    answers: ["RAZLIČNE ZGODBE IN POKLICE", "SAMO ENO IGRO", "SAMO ŠPORT"],
    correct: 0,
  },
];

function SectionTag({ children, tone = "pink" }: { children: React.ReactNode; tone?: "pink" | "teal" | "yellow" | "purple" }) {
  return <span className={`section-tag tag-${tone}`}>{children}</span>;
}

function NextButton({ onClick, children = "NAPREJ" }: { onClick: () => void; children?: React.ReactNode }) {
  return (
    <button className="primary-button" onClick={onClick} type="button">
      {children}
      <ArrowRight size={20} strokeWidth={2.4} />
    </button>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="secondary-button" onClick={onClick} type="button">
      <ArrowLeft size={18} />
      NAZAJ
    </button>
  );
}

function DidYouKnow({ children }: { children: React.ReactNode }) {
  return (
    <aside className="fact-card">
      <div className="fact-icon"><Lightbulb size={20} fill="currentColor" /></div>
      <div>
        <div className="fact-title">ALI VEŠ?</div>
        <div className="fact-copy">{children}</div>
      </div>
    </aside>
  );
}

function HomePage({ go }: { go: (n: number) => void }) {
  return (
    <div className="page-grid hero-page">
      <div className="hero-copy">
        <SectionTag tone="teal">PRVI DEL · 9 POSTAJ</SectionTag>
        <h1>BARBIJINA<br /><em>ZGODBA</em></h1>
        <p className="hero-lede">Majhna lutka. Velika domišljija. Potuj skozi leta in odkrij, kako se je začela zgodba Barbie.</p>
        <div className="hero-actions">
          <NextButton onClick={() => go(1)}>ZAČNI ZGODBO</NextButton>
          <button className="text-button" type="button" onClick={() => go(7)}><ImageIcon size={18} /> ODPRETI GALERIJO</button>
        </div>
        <div className="mini-note"><Sparkles size={16} /> Narejeno za radovedne bralke</div>
      </div>
      <div className="hero-art-wrap">
        <img src={ASSETS.hero} alt="Ilustracija modne lutke in časovne skicirke" className="hero-art" />
        <div className="year-sticker"><span>OD</span><strong>1959</strong><span>DO DANES</span></div>
        <div className="floating-note note-one"><Sparkles size={15} /> 65+ LET IDEJ</div>
        <div className="floating-note note-two"><Palette size={15} /> USTVARJAJ</div>
      </div>
      <div className="hero-bottom-line">
        <div><span className="line-number">01</span><span>ZAČNIMO PRI ZAČETKU</span></div>
        <div className="scroll-hint"><span className="scroll-dot" /> PODRSNI ZA NADALJEVANJE</div>
      </div>
    </div>
  );
}

function RuthPage({ go }: { go: (n: number) => void }) {
  return (
    <div className="page-grid story-page split-page">
      <div className="story-art-card art-card-coral">
        <img src={ASSETS.ruth} alt="Ilustracija ustvarjalke pri delu" />
        <div className="image-caption"><span>USTVARJALKA</span><strong>RUTH HANDLER</strong></div>
        <div className="stamp">IDEJA<br />+<br />POGUM</div>
      </div>
      <div className="story-copy">
        <SectionTag tone="pink">02 · USTVARJALKA</SectionTag>
        <h2>KDO JE BILA<br /><em>RUTH HANDLER?</em></h2>
        <p>Ruth Handler je bila ena od ustvarjalk Barbie. Skupaj z možem Elliotom in prijateljem Haroldom je pomagala ustanoviti podjetje Mattel.</p>
        <p>Ruth je opazovala otroke in razmišljala, katere igrače bi jim lahko pomagale pri igri. Hotela je, da bi si otroci lahko predstavljali veliko različnih stvari.</p>
        <DidYouKnow>Ruth ni bila samo oblikovalka igrač. Pomagala je tudi voditi podjetje in sprejemati pomembne odločitve.</DidYouKnow>
        <div className="question-prompt"><CircleHelp size={21} /><span>KATERO IGRAČO BI TI IZUMILA?</span></div>
        <div className="page-actions"><BackButton onClick={() => go(0)} /><NextButton onClick={() => go(2)} /></div>
      </div>
    </div>
  );
}

function IdeaPage({ go }: { go: (n: number) => void }) {
  return (
    <div className="page-grid story-page idea-page">
      <div className="idea-copy">
        <SectionTag tone="yellow">03 · ZAČETEK</SectionTag>
        <h2>KAKO SE JE<br /><em>ZAČELA ZGODBA?</em></h2>
        <p>Ruth je opazovala svojo hčerko Barbaro pri igri. Barbara se je rada igrala s papirnatimi lutkami.</p>
        <p>Ruth je pomislila: <strong>»Kaj pa, če bi imela takšna lutka pravo tridimenzionalno obliko?«</strong></p>
        <p>Tako se je začela razvijati velika zamisel.</p>
        <DidYouKnow>Barbie je dobila ime po Barbari, hčerki Ruth Handler.</DidYouKnow>
        <div className="page-actions"><BackButton onClick={() => go(1)} /><NextButton onClick={() => go(3)} /></div>
      </div>
      <div className="paper-desk">
        <div className="paper-desk-label"><Pencil size={15} /> USTVARJALNI KOTIČEK</div>
        <div className="paper-sheet sheet-back"><span>IDEJE</span><div className="scribble-line" /></div>
        <div className="paper-sheet sheet-front">
          <div className="paper-doll"><div className="doll-head" /><div className="doll-body" /><div className="doll-leg left" /><div className="doll-leg right" /></div>
          <div className="paper-outfit outfit-one" />
          <div className="paper-outfit outfit-two" />
          <div className="paper-caption">KAKŠNA<br />BO NJENA<br />ZGODBA?</div>
        </div>
        <div className="scissors">✂</div><div className="pencil">✎</div>
      </div>
    </div>
  );
}

function LaunchPage({ go }: { go: (n: number) => void }) {
  return (
    <div className="page-grid story-page launch-page">
      <div className="launch-copy">
        <SectionTag tone="purple">04 · 1959</SectionTag>
        <h2>BARBIE<br /><em>PRIDE NA SVET</em></h2>
        <div className="big-year">1959</div>
        <p>Barbie se je prvič pojavila leta <strong>1959</strong>. Takrat je bila drugačna od številnih lutk, ki so jih poznali otroci.</p>
        <p>Ni bila dojenčica. Z njo so lahko ustvarjali zgodbe o odraščanju, modi in pustolovščinah.</p>
        <DidYouKnow>Leto 1959 je prvo leto Barbiejine zgodbe.</DidYouKnow>
        <div className="page-actions"><BackButton onClick={() => go(2)} /><NextButton onClick={() => go(4)} /></div>
      </div>
      <div className="launch-art"><img src={ASSETS.hero} alt="Zgodovinska ilustracija modne lutke iz leta 1959" /><div className="launch-ribbon">PRVO<br />POGLAVJE</div></div>
    </div>
  );
}

function FirstBarbiePage({ go }: { go: (n: number) => void }) {
  return (
    <div className="page-grid story-page first-page">
      <div className="first-art">
        <div className="portrait-frame"><div className="generic-doll"><div className="doll-hair" /><div className="doll-face" /><div className="doll-neck" /><div className="doll-suit" /><div className="doll-shoe left" /><div className="doll-shoe right" /></div><div className="frame-label">ORIGINALNI VIDEZ · 1959</div></div>
        <div className="accessory-card"><span className="accessory-sun">◌</span><span className="accessory-shoe">⌁</span><span className="accessory-bag">▱</span><div>SONČNA OČALA · ČEVLJI · TORBICA</div></div>
      </div>
      <div className="story-copy first-copy">
        <SectionTag tone="teal">05 · PRVA BARBIE</SectionTag>
        <h2>OBLAČILA<br /><em>POVEDO ZGODBO</em></h2>
        <p>Prva Barbie je imela posebno pričesko in modna oblačila. Nosila je črno-bel črtast kopalni kostum.</p>
        <p>Ko se oblačila spremenijo, se lahko spremeni tudi zgodba. Barbie lahko gre na plažo, na zabavo ali na izlet.</p>
        <DidYouKnow>Njena urejena pričeska je bila značilna za modo poznih petdesetih let.</DidYouKnow>
        <div className="question-prompt"><CircleHelp size={21} /><span>KATERI DODATEK BI DODALA?</span></div>
        <div className="page-actions"><BackButton onClick={() => go(3)} /><NextButton onClick={() => go(5)} /></div>
      </div>
    </div>
  );
}

function CareersPage({ go }: { go: (n: number) => void }) {
  const careers = [
    { name: "ZDRAVNICA", icon: Stethoscope, color: "pink" },
    { name: "UMETNICA", icon: Palette, color: "yellow" },
    { name: "ASTRONAVTKA", icon: Rocket, color: "purple" },
    { name: "FOTOGRAFINJA", icon: Camera, color: "teal" },
    { name: "RAZISKOVALKA", icon: Glasses, color: "orange" },
    { name: "PISATELJICA", icon: BookOpen, color: "blue" },
  ];
  return (
    <div className="page-grid careers-page">
      <div className="careers-intro">
        <SectionTag tone="pink">06 · POKLICI</SectionTag>
        <h2>LAHKO SANJAŠ<br /><em>O VELIKIH STVAREH</em></h2>
        <p>Barbie je imela veliko različnih poklicev. Skozi igro lahko raziskuješ, kaj te zanima.</p>
        <div className="quote-card">»DANES SI LAHKO ZDRAVNICA. JUTRI PA RAZISKOVALKA VESOLJA.«</div>
        <div className="page-actions"><BackButton onClick={() => go(4)} /><NextButton onClick={() => go(6)} /></div>
      </div>
      <div className="career-grid">
        {careers.map(({ name, icon: Icon, color }) => <button className={`career-card career-${color}`} key={name} type="button"><Icon size={28} /><strong>{name}</strong><span>ODPRI IDEJO <ArrowRight size={15} /></span></button>)}
      </div>
    </div>
  );
}

function DecadesPage({ go }: { go: (n: number) => void }) {
  const decades = ["1950-TA", "1960-TA", "1970-TA", "1980-TA", "1990-TA", "DANES"];
  return (
    <div className="page-grid timeline-page">
      <div className="timeline-heading"><SectionTag tone="yellow">07 · DESETLETJA</SectionTag><h2>BARBIE<br /><em>SKOZI ČAS</em></h2><p>Spreminjali so se lasje, oblačila, domovi in poklici. Najpomembnejša stvar pa je ostala enaka: domišljija.</p></div>
      <div className="timeline-visual"><img src={ASSETS.decades} alt="Ilustrirani časovni trak Barbie skozi desetletja" /><div className="timeline-years">{decades.map((d, i) => <span key={d} className={i === 0 ? "active" : ""}>{d}</span>)}</div></div>
      <div className="timeline-bottom"><div className="mini-timeline-fact"><Clock3 size={20} /><span><strong>ALI VEŠ?</strong> Ko pogledamo stare igrače, lahko opazimo, kako se je spreminjal tudi svet.</span></div><div className="page-actions"><BackButton onClick={() => go(5)} /><NextButton onClick={() => go(7)} /></div></div>
    </div>
  );
}

function GalleryPage({ go, openImage }: { go: (n: number) => void; openImage: (i: number) => void }) {
  return (
    <div className="page-grid gallery-page">
      <div className="gallery-heading"><SectionTag tone="teal">08 · GALERIJA</SectionTag><h2>POGLEJ.<br /><em>POVEČAJ. RAZIŠČI.</em></h2><p>Tapni na sliko, da jo povečaš. Nato preberi kratek napis.</p></div>
      <div className="gallery-grid">{gallery.map((item, i) => <button className="gallery-card" key={item.title} type="button" onClick={() => openImage(i)}><img src={item.src} alt={item.title} /><span className="gallery-expand"><Expand size={17} /></span><div className="gallery-meta"><strong>{item.title}</strong><span>{item.text}</span></div></button>)}</div>
      <div className="gallery-footer"><div className="mini-note"><ImageIcon size={16} /> Vsaka slika potrebuje urejen vir ali dovoljenje.</div><div className="page-actions"><BackButton onClick={() => go(6)} /><NextButton onClick={() => go(8)} /></div></div>
    </div>
  );
}

function QuizPage({ go }: { go: (n: number) => void }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [created, setCreated] = useState(false);
  const current = quizQuestions[questionIndex];
  const answerCorrect = selected === current.correct;

  const choose = (i: number) => setSelected(i);
  const nextQuestion = () => {
    setSelected(null);
    setQuestionIndex((i) => (i + 1) % quizQuestions.length);
  };
  return (
    <div className="page-grid quiz-page">
      <div className="quiz-heading"><SectionTag tone="purple">09 · KVIZ</SectionTag><h2>PREVERI<br /><em>SVOJE ZNANJE</em></h2><p>Vsaka dobra zgodba se začne z idejo. Zdaj preveri, kaj si si zapomnila.</p></div>
      <div className="quiz-layout">
        <div className="quiz-card"><div className="quiz-topline"><span>VPRAŠANJE {questionIndex + 1} / {quizQuestions.length}</span><div className="quiz-progress"><i style={{ width: `${((questionIndex + 1) / quizQuestions.length) * 100}%` }} /></div></div><h3>{current.question}</h3><div className="answers">{current.answers.map((answer, i) => <button key={answer} className={`answer ${selected !== null && i === selected ? (answerCorrect ? "answer-correct" : "answer-wrong") : ""}`} type="button" onClick={() => choose(i)}><span className="answer-letter">{String.fromCharCode(65 + i)}</span>{answer}{selected !== null && i === selected && answerCorrect && <Check size={20} />}</button>)}</div>{selected !== null && <div className={`quiz-feedback ${answerCorrect ? "feedback-good" : "feedback-soft"}`}>{answerCorrect ? "ODLIČNO! TO SI SI DOBRO ZAPOMNILA." : "SKORAJ! POSKUSI ŠE ENKRAT."}</div>}{selected !== null && answerCorrect && <button className="next-question" type="button" onClick={nextQuestion}>NASLEDNJE VPRAŠANJE <ArrowRight size={17} /></button>}</div>
        <div className="create-card"><div className="create-sparkle"><Sparkles size={22} /></div><span className="create-eyebrow">USTVARJALNA NALOGA</span><h3>USTVARI<br /><em>SVOJO BARBIE</em></h3><p>Izberi idejo za njeno službo, dom in veliko pustolovščino.</p><div className="create-fields"><span>IME</span><span>POKLIC</span><span>POSEBNA MOČ</span></div><button className="outline-light" type="button" onClick={() => setCreated(!created)}>{created ? "TVOJA IDEJA JE SHRANJENA!" : "ODPRI RISALNO KARTICO"} <Pencil size={17} /></button></div>
      </div>
      <div className="quiz-footer"><button className="secondary-button" type="button" onClick={() => go(0)}><HomeIcon size={17} /> NA ZAČETEK</button><span className="end-note"><Sun size={16} /> TVOJA DOMIŠLJIJA JE TVOJA SUPERMOČ.</span></div>
    </div>
  );
}

export default function Home() {
  const [page, setPage] = useState(0);
  const [caps, setCaps] = useState(() => localStorage.getItem("barbie-caps") === "true");
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  useEffect(() => { localStorage.setItem("barbie-caps", String(caps)); }, [caps]);
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [page]);

  const go = (nextPage: number) => setPage(Math.max(0, Math.min(pages.length - 1, nextPage)));
  const current = pages[page];
  const pageContent = useMemo(() => {
    if (page === 0) return <HomePage go={go} />;
    if (page === 1) return <RuthPage go={go} />;
    if (page === 2) return <IdeaPage go={go} />;
    if (page === 3) return <LaunchPage go={go} />;
    if (page === 4) return <FirstBarbiePage go={go} />;
    if (page === 5) return <CareersPage go={go} />;
    if (page === 6) return <DecadesPage go={go} />;
    if (page === 7) return <GalleryPage go={go} openImage={setGalleryIndex} />;
    return <QuizPage go={go} />;
  }, [page]);

  return (
    <div className={`app-shell ${caps ? "caps-mode" : ""}`}>
      <header className="site-header">
        <button className="brand" type="button" onClick={() => go(0)} aria-label="Domov"><span className="brand-mark"><Sparkles size={15} fill="currentColor" /></span><span>BARBIJINA<br /><b>ZGODBA</b></span></button>
        <div className="header-center"><span className="header-kicker">NEODVISEN DRUŽINSKI PROJEKT</span><span className="header-divider" /><span className="header-page">{current.number} / 09</span></div>
        <div className="header-actions"><button className={`caps-toggle ${caps ? "is-on" : ""}`} type="button" onClick={() => setCaps(!caps)}><span className="toggle-icon">A/a</span><span>{caps ? "OBIČAJNE ČRKE" : "VELIKE ČRKE"}</span></button><button className="home-button" type="button" onClick={() => go(0)} aria-label="Domov"><HomeIcon size={18} /></button></div>
      </header>
      <main className="site-main"><div className="page-kicker"><span>{current.label}</span><span className="kicker-line" /><span>{current.kicker}</span></div>{pageContent}</main>
      <footer className="site-footer"><div className="footer-progress">{pages.map((item, i) => <button key={item.number} type="button" className={`progress-dot ${i === page ? "active" : ""} ${i < page ? "visited" : ""}`} onClick={() => go(i)} aria-label={`Pojdi na stran ${i + 1}`}><span>{item.number}</span></button>)}</div><div className="footer-credit">BARBIJINA ZGODBA <span>·</span> SLOVENIJA <span>·</span> 2026</div></footer>
      {galleryIndex !== null && <div className="lightbox" role="dialog" aria-modal="true"><button className="lightbox-close" type="button" onClick={() => setGalleryIndex(null)} aria-label="Zapri"><X size={24} /></button><button className="lightbox-arrow left" type="button" onClick={() => setGalleryIndex((galleryIndex + gallery.length - 1) % gallery.length)} aria-label="Prejšnja slika"><ChevronLeft size={28} /></button><div className="lightbox-content"><img src={gallery[galleryIndex].src} alt={gallery[galleryIndex].title} /><div><span>{gallery[galleryIndex].title}</span><p>{gallery[galleryIndex].text}</p></div></div><button className="lightbox-arrow right" type="button" onClick={() => setGalleryIndex((galleryIndex + 1) % gallery.length)} aria-label="Naslednja slika"><ChevronRight size={28} /></button></div>}
    </div>
  );
}

export { pages };

const unused = { Clock3 };
void unused;
