import { useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Home as HomeIcon,
  Lightbulb,
  Pencil,
  Rocket,
  Sparkles,
  Star,
  WandSparkles,
} from "lucide-react";

const SUPABASE_PROJECT_URL = "https://cwkwdstkqfsuawpdhuka.supabase.co";
const photo = (filename: string) => `${SUPABASE_PROJECT_URL}/storage/v1/object/public/barb/${encodeURIComponent(filename)}`;

const assets = {
  hero: "/manus-storage/barbie-hero_7ebe8515.png",
  ruth: photo("ruth-handler-portret.jpg"),
  sketches: photo("barbie-sketches.jpg"),
  first: photo("barbie-1959-original.jpg"),
  ken: photo("barbie-ken.jpg"),
  home: photo("barbie-first-dreamhouse.jpg"),
  car: photo("barbie-first-car.jpg"),
  camper: photo("barbie-first-camper.jpg"),
  astronaut: photo("barbie-astronaut.jpg"),
  careers: photo("barbie-1960s.jpg"),
  fashion: photo("barbie-look.jpg"),
  world: photo("barbie-dolls-of-the-world.jpg"),
  diversity: photo("barbie-razlicne.jpg"),
  screen: photo("barbie-gabby.jpg"),
};

type Page = { number: string; label: string; title: string; kicker: string };
const pages: Page[] = [
  { number: "01", label: "UVOD", title: "DOBRODOŠLA V BARBIJINI ZGODBI", kicker: "POTOVANJE SKOZI ČAS" },
  { number: "02", label: "USTVARJALKA", title: "KDO JE BILA RUTH HANDLER?", kicker: "IDEJA SE ZAČNE Z OPAZOVANJEM" },
  { number: "03", label: "ZAČETEK", title: "KAKO SE JE ZAČELA ZGODBA?", kicker: "PAPIRNATE LUTKE IN VELIKA IDEJA" },
  { number: "04", label: "PREDHODNICA", title: "PRED BARBIE JE BILA LILLI", kicker: "IDEJA JE PRIŠLA IZ EVROPE" },
  { number: "05", label: "1959", title: "BARBIE PRIDE NA SVET", kicker: "PRVO POGLAVJE" },
  { number: "06", label: "PRVA BARBIE", title: "PRVA BARBIE", kicker: "OBLAČILA POVEDO ZGODBO" },
  { number: "07", label: "KEN", title: "PRIDE TUDI KEN", kicker: "PRIJATELJ ZA NOVE ZGODBE" },
  { number: "08", label: "DOM", title: "BARBIE DOBI SVOJ DOM", kicker: "DREAMHOUSE IN DOMIŠLJIJA" },
  { number: "09", label: "AVTO", title: "BARBIE DOBI AVTO", kicker: "NA POTI JE VEDNO NOVA ZGODBA" },
  { number: "10", label: "ASTRONAVTKA", title: "BARBIE GLEDA PROTI ZVEZDAM", kicker: "KAJ VSE LAHKO POSTANEŠ?" },
  { number: "11", label: "AVTODOM", title: "BARBIE DOBI AVTODOM", kicker: "VELIKE PUSTOLOVŠČINE V NARAVI" },
  { number: "12", label: "POKLICI", title: "BARBIE IN ŠTEVILNI POKLICI", kicker: "LAHKO RAZISKUJEŠ, POMAGAŠ IN USTVARJAŠ" },
  { number: "13", label: "USTVARJALCI", title: "ZA VSAKIM VIDEZOM JE IDEJA", kicker: "OBLIKOVANJE JE TUDI POKLIC" },
  { number: "14", label: "DESETLETJA", title: "BARBIE SKOZI DESETLETJA", kicker: "ČAS SPREMINJA MODE IN IDEJE" },
  { number: "15", label: "SVET", title: "BARBIE OKOLI SVETA", kicker: "RAZLIČNI KRAJI, VELIKO ZGODB" },
  { number: "16", label: "RAZNOLIKOST", title: "BARBIE ZA VSAKOGAR", kicker: "RAZLIČNOSTI SO DEL ZGODBE" },
  { number: "17", label: "NA ZASLONU", title: "BARBIE POSTANE JUNAKINJA", kicker: "RISANKE, KNJIGE, VIDEI IN FILMI" },
  { number: "18", label: "DANES", title: "KAJ POMENI BARBIE DANES?", kicker: "NOVE IDEJE, NOVE MOŽNOSTI" },
  { number: "19", label: "POVZETEK", title: "KAJ SI ODKRILA?", kicker: "SESTAVI SVOJO POT SKOZI ZGODBO" },
  { number: "20", label: "USTVARJANJE", title: "ZDAJ SI NA VRSTI TI", kicker: "USTVARI SVOJO JUNAKINJO" },
];

const story: Record<number, { image?: string; alt?: string; paragraphs: string[]; fact?: string; question?: string; tone?: "pink" | "teal" | "yellow" | "purple"; chips?: string[] }> = {
  1: { image: assets.ruth, alt: "Ruth Handler", paragraphs: ["Ruth Handler je bila ena od ustvarjalk Barbie. Skupaj z možem Elliotom in prijateljem Haroldom je pomagala ustanoviti podjetje Mattel.", "Opazila je, da se otroci radi igrajo s papirnatimi lutkami in jim izmišljajo različne vloge. Pomislila je, da bi bila prava lutka, ki lahko postane katera koli junakinja, še bolj zanimiva."], fact: "Velike ideje se pogosto začnejo z opazovanjem in vprašanjem.", question: "KAJ BI TI IZUMILA?", tone: "pink" },
  2: { image: assets.sketches, alt: "Skice oblačil", paragraphs: ["Ruth je opazovala svojo hčerko Barbaro pri igri. Barbara je papirnatim lutkam izmišljala oblačila, prijatelje in dogodivščine.", "Ruth je pomislila: Kaj pa, če bi imela takšna lutka pravo tridimenzionalno obliko? Ideja je potrebovala risbe, poskuse in pogum."], fact: "Barbie je dobila ime po Barbari, hčerki Ruth Handler.", question: "KAKŠNA BI BILA TVOJA LUTKA?", tone: "yellow" },
  3: { paragraphs: ["Preden je nastala Barbie, je v Nemčiji obstajala lutka Lilli. Ruth Handler jo je videla na potovanju in opazila, da ni podobna dojenčici.", "Lilli ni bila Barbie in Barbie ni njena kopija. Pomagala pa je Ruth razmišljati o novi vrsti lutke: lutki z odraslim videzom, oblačili in lastnimi zgodbami."], fact: "Dobra ideja lahko nastane tako, da nekaj opazujemo in si predstavljamo drugačno možnost.", question: "KAJ BI SPREMENILA?", tone: "purple" },
  4: { image: assets.first, alt: "Prva Barbie", paragraphs: ["Barbie se je prvič predstavila 9. marca 1959 na sejmu igrač v New Yorku. Nosila je črno-bele črtaste kopalke in imela svetle lase.", "Ni bila dojenčica. Bila je modna najstnica, ki je lahko odšla na zabavo, potovanje ali v novo pustolovščino."], fact: "Prva Barbie je imela dve različni pričeski in zelo majhno garderobo v primerjavi z današnjim svetom igre.", question: "KAM BI ŠLA PRVA BARBIE?", tone: "pink" },
  5: { image: assets.first, alt: "Barbie iz leta 1959", paragraphs: ["Prva Barbie je prišla z eno pomembno idejo: otrok lahko zamenja njeno obleko in ji izmisli novo vlogo.", "Oblačila niso bila samo okras. Povedala so, kam Barbie gre, kaj počne in kakšno zgodbo lahko začne."], fact: "Barbie je bila predstavljena kot najstniška modna manekenka.", question: "KAKŠNO ZGODBO POVE OBLEKA?", tone: "pink", chips: ["NA ZABAVO", "NA DELO", "NA PUSTOLOVŠČINO"] },
  6: { image: assets.ken, alt: "Barbie in Ken", paragraphs: ["Leta 1961 se je Barbiejinemu svetu pridružil Ken. Otroci so lahko z njima ustvarili zgodbe o prijateljstvu, izletih in druženju.", "Pozneje so prišle še Midge, Skipper, Christie in druge prijateljice ter družinski člani. Barbijin svet je postal večji."], fact: "Ken je dobil ime po sinu Ruth in Elliota Handlerja.", question: "KDO BI BIL V TVOJI ZGODBI?", tone: "teal" },
  7: { image: assets.home, alt: "Dreamhouse", paragraphs: ["Leta 1962 je Barbie dobila svoj dom. Dreamhouse ni bil samo predmet, ampak prostor, kjer se je lahko zgodilo marsikaj.", "V domu se lahko nekdo pripravi na delo, povabi prijatelje, skuha kosilo ali načrtuje novo pustolovščino."], fact: "Barbiejin prvi dom je bil bolj podoben mestnemu stanovanju kot današnji veliki hiši.", question: "KAJ MORA IMETI TVOJ DOM?", tone: "yellow" },
  8: { image: assets.car, alt: "Barbiejin prvi avto", paragraphs: ["Leta 1962 je Barbie dobila tudi avto. Z njim se je lahko odpeljala iz doma in odprla novo poglavje zgodbe.", "Avto v igri pomeni gibanje: lahko pelje na plažo, v službo, po prijateljico ali na kraj, ki ga še nihče ne pozna."], fact: "Ko dobi junakinja vozilo, se njen svet igre razširi na cesto in nove kraje.", question: "KAM BI SE ODPELJALA?", tone: "teal" },
  9: { image: assets.astronaut, alt: "Barbie kot astronavtka", paragraphs: ["Leta 1965 je Barbie postala astronavtka. Takrat je bilo žensk v vesoljskih poklicih zelo malo.", "Vesolje tukaj ni samo stvar, ki jo kupiš. Je primer poklica in sanj: kaj lahko raziskuješ, kaj se lahko naučiš in kaj lahko postaneš."], fact: "Barbie je bila astronavtka že pred prvim človekom na Luni.", question: "KAJ BI RAZISKOVALA?", tone: "purple", chips: ["ODKRIVAM", "POMAGAM", "USTVARJAM", "NAČRTUJEM"] },
  10: { image: assets.camper, alt: "Barbiejin avtodom", paragraphs: ["Leta 1971 je Barbie dobila avtodom. Z njim se je lahko odpravila v naravo, na izlet in na velike pustolovščine.", "Dom, avto in avtodom so predmeti, ki razširijo svet igre. Poklici pa so drugačna tema: pokažejo, kaj lahko nekdo dela in v čem lahko postane dober."], fact: "Avtodom združi dve stvari: potovanje in občutek doma.", question: "KAM BI ŠLA NA IZLET?", tone: "yellow" },
  11: { image: assets.careers, alt: "Različni Barbiejini poklici", paragraphs: ["Barbie je skozi leta postala zdravnica, pilotka, znanstvenica, računalniška inženirka, fotografinja, športnica in še marsikaj.", "Poklic ni samo obleka. Za vsakim poklicem so znanje, vaja, pripomočki in ljudje, ki sodelujejo."], fact: "Lahko poskusiš več stvari. Tvoja pot ni nujno samo ena.", question: "KAJ TE NAJBOLJ ZANIMA?", tone: "teal", chips: ["ODKRIVAM", "POMAGAM", "USTVARJAM", "VODIM"] },
  12: { image: assets.fashion, alt: "Barbiejin modni videz", paragraphs: ["Za vsakim Barbiejinim videzom je ideja. Nekdo izbere barve, nariše načrt, izbere blago in oblačilo izdela.", "Oblikovalke, ilustratorke, fotografinje in stilistke sodelujejo, da videz pomaga povedati zgodbo."], fact: "Ustvarjalni poklici potrebujejo domišljijo, načrtovanje, natančnost in veliko vaje.", question: "KAKŠNO OBLEKO BI OBLIKOVALA?", tone: "pink", chips: ["NARIŠI", "IZBERI", "IZDELAJ", "POKAŽI"] },
  13: { image: assets.careers, alt: "Barbie skozi desetletja", paragraphs: ["Barbie se je skozi leta spreminjala. Spreminjali so se njeni lasje, oblačila, poklici, prijatelji in pripomočki.", "Ko pogledamo staro igračo, lahko opazimo tudi, kako so se spreminjali moda, tehnologija in predstave o tem, kaj lahko počnejo dekleta."], fact: "Zgodovina ni samo zbirka letnic. Je zgodba o tem, kako se spreminjajo ideje.", question: "KATERA SPREMEMBA TE JE PRESENETILA?", tone: "yellow", chips: ["1959", "1965", "1971", "2016", "2019", "2023"] },
  14: { image: assets.world, alt: "Barbie iz različnih krajev sveta", paragraphs: ["Barbie so spoznavali ljudje v številnih delih sveta. Nastajale so lutke, ki so se navdihovale pri različnih krajih, oblačilih in tradicijah.", "Pri tem je pomembno biti radoveden in spoštljiv. Nobena lutka ne more predstaviti vseh ljudi iz neke države. Lahko pa nas spodbudi, da se učimo in poslušamo prave zgodbe."], fact: "Kultura ni kostum. Za vsako podobo obstajajo resnični ljudje, zgodbe in tradicije.", question: "KATERO VPRAŠANJE BI POSTAVILA?", tone: "purple" },
  15: { image: assets.diversity, alt: "Različne Barbie", paragraphs: ["Ljudje niso vsi videti enako, se ne gibljejo enako in ne živijo na enak način. Zato so se spreminjale tudi Barbie in njene prijateljice.", "Raznolikost pomeni, da smo ljudje različni. Vključevanje pa pomeni, da lahko vsi sodelujemo in se v zgodbi prepoznamo."], fact: "Vsakdo si zasluži, da je v zgodbi viden, sprejet in dobrodošel.", question: "KAKO LAHKO VKLJUČIŠ DRUGE?", tone: "teal", chips: ["POSLUŠAM", "VPRAŠAM", "PRILAGODIM", "POVABIM"] },
  16: { image: assets.screen, alt: "Barbie v sodobni zgodbi", paragraphs: ["Barbie je prišla tudi v knjige, risanke, spletne videe in filme. Na zaslonu ni bila samo lutka, ampak junakinja, ki rešuje težave in se uči iz napak.", "Leta 2023 je film Barbie odprl nove pogovore o tem, kaj Barbie pomeni različnim ljudem. Njena zgodba se nadaljuje vsakič, ko si nekdo izmisli novo pustolovščino."], fact: "En lik lahko živi v knjigi, risanki, videu, filmu ali otroški igri.", question: "KAKO BI POVEDALA SVOJO ZGODBO?", tone: "pink", chips: ["KNJIGA", "RISANKA", "VIDEO", "GLEDALIŠČE"] },
  17: { paragraphs: ["Danes Barbie povezuje igro, modo, poklice, prijateljstvo, raznolikost in ustvarjanje.", "Najpomembnejše vprašanje ni, katera Barbie je najboljša. Vprašanje je: katera zgodba tebe najbolj zanima?"], fact: "Barbiejina zgodba se še vedno spreminja, ker jo vsaka generacija bere na svoj način.", question: "KAJ BI TI DODALA V NJENO ZGODBO?", tone: "yellow" },
};

function SectionTag({ children, tone = "pink" }: { children: ReactNode; tone?: "pink" | "teal" | "yellow" | "purple" }) { return <span className={`section-tag tag-${tone}`}>{children}</span>; }
function NextButton({ onClick, children = "NAPREJ" }: { onClick: () => void; children?: ReactNode }) { return <button className="primary-button" onClick={onClick} type="button">{children}<ArrowRight size={19} /></button>; }
function BackButton({ onClick }: { onClick: () => void }) { return <button className="secondary-button" onClick={onClick} type="button"><ArrowLeft size={17} /> NAZAJ</button>; }
function Fact({ children }: { children: ReactNode }) { return <aside className="fact-card"><div className="fact-icon"><Lightbulb size={19} fill="currentColor" /></div><div><div className="fact-title">ALI VEŠ?</div><div className="fact-copy">{children}</div></div></aside>; }

function HomePage({ go }: { go: (n: number) => void }) {
  return <div className="home-page page-grid"><div className="hero-copy"><SectionTag tone="teal">20 STRANI · SLOVENSKA ZGODBA</SectionTag><h1>BARBIJINA<br /><em>ZGODBA</em></h1><p className="hero-lede">Majhna lutka. Velika domišljija. Potuj skozi leta in odkrij, kako so iz ene zamisli nastale številne zgodbe, poklici in pustolovščine.</p><div className="hero-actions"><NextButton onClick={() => go(1)}>ZAČNI ZGODBO</NextButton><button className="text-button" type="button" onClick={() => go(18)}><Star size={17} /> KAJ SI ODKRILA?</button></div><div className="mini-note"><Sparkles size={16} /> Narejeno za radovedne bralke</div></div><div className="hero-art-wrap"><img src={assets.hero} className="hero-art" alt="Ilustracija Barbiejine zgodbe" /><div className="year-sticker"><span>OD</span><strong>1959</strong><span>DO DANES</span></div><div className="floating-note note-one"><Sparkles size={14} /> 65+ LET IDEJ</div><div className="floating-note note-two"><Pencil size={14} /> USTVARJAJ</div></div><div className="hero-bottom-line"><span><b>01</b> NA ZAČETEK</span><span className="scroll-hint"><i /> PODRSNI ZA NADALJEVANJE</span></div></div>;
}

function StoryPage({ index, go }: { index: number; go: (n: number) => void }) {
  const item = story[index];
  const meta = pages[index];
  return <div className="story-page page-grid"><div className="story-media">{item.image ? <img src={item.image} alt={item.alt || meta.title} /> : <div className={`illustrated-placeholder tone-${item.tone || "pink"}`}><Sparkles size={44} /><strong>{meta.label}</strong></div>}<div className="media-label">{meta.number} · {meta.label}</div></div><div className="story-copy"><SectionTag tone={item.tone || "pink"}>{meta.number} · {meta.label}</SectionTag><h2>{meta.title.split(" ").slice(0, -1).join(" ")} <em>{meta.title.split(" ").slice(-1)}</em></h2>{item.paragraphs.map((p, i) => <p key={i}>{p}</p>)}{item.fact && <Fact>{item.fact}</Fact>}{item.chips && <div className="chip-row">{item.chips.map((chip) => <span key={chip} className="choice-chip">{chip}</span>)}</div>}{item.question && <div className="question-prompt"><Star size={18} /> {item.question}</div>}<div className="page-actions"><BackButton onClick={() => go(index - 1)} /><NextButton onClick={() => go(index + 1)} /></div></div></div>;
}

const summaryCards = ["RUTH IN IDEJA", "BARBIE LETA 1959", "KEN IN PRIJATELJI", "DOM IN POTOVANJE", "POKLICI IN SANJE", "RAZNOLIKOST IN NOVE ZGODBE"];
const reasons = ["KER ME JE PRESENETILA", "KER MI JE BILA VŠEČ FOTOGRAFIJA", "KER BI TO RADA POSKUSILA TUDI SAMA", "KER SEM SE NEKAJ NOVEGA NAUČILA"];
function SummaryPage({ go }: { go: (n: number) => void }) {
  const [selected, setSelected] = useState<string[]>([summaryCards[0], summaryCards[4], summaryCards[5]]);
  const [reason, setReason] = useState(reasons[0]);
  const toggle = (card: string) => setSelected((current) => current.includes(card) ? current.filter((x) => x !== card) : current.length < 3 ? [...current, card] : current);
  return <div className="summary-page page-grid"><div className="summary-intro"><SectionTag tone="yellow">19 · POVZETEK</SectionTag><h2>KAJ SI <em>ODKRILA?</em></h2><p>Izberi tri postaje, ki so ti najbolj ostale v spominu. To ni test. To je tvoja različica Barbijine zgodbe.</p><div className="summary-statement"><span>MOJA ZGODBA</span><strong>{selected.length ? selected.join(" → ") : "IZBERI TRI POSTAJE"}</strong><small>Najbolj mi je ostala v spominu, ker {reason.toLowerCase()}.</small></div><div className="page-actions"><BackButton onClick={() => go(17)} /><NextButton onClick={() => go(19)}>USTVARI JUNAKINJO</NextButton></div></div><div className="summary-panel"><div className="panel-heading"><span>IZBERI TRI POSTAJE</span><b>{selected.length}/3</b></div><div className="summary-card-grid">{summaryCards.map((card) => <button type="button" key={card} className={`summary-card ${selected.includes(card) ? "is-selected" : ""}`} onClick={() => toggle(card)}><span>{selected.includes(card) ? <Check size={17} /> : <span className="card-dot" />}</span>{card}</button>)}</div><div className="reason-block"><div className="panel-heading"><span>ZAKAJ?</span></div><div className="reason-row">{reasons.map((item) => <button key={item} type="button" className={reason === item ? "reason-chip is-selected" : "reason-chip"} onClick={() => setReason(item)}>{item}</button>)}</div></div></div></div>;
}

const interests = ["ODKRIVA", "POMAGA", "USTVARJA", "NAČRTUJE", "RAZISKUJE NARAVO", "UČI SE NOVIH STVARI"];
const careers = ["ASTRONAVTKA", "ZDRAVNICA", "RAZISKOVALKA", "UMETNICA", "FOTOGRAFINJA", "PILOTKA", "VETERINARKA", "OBLIKOVALKA", "NEKAJ ČISTO SVOJEGA"];
const places = ["MESTO", "MORJE", "GOZD", "VESOLJE", "DELAVNICA", "ČAROBNI SVET"];
const objects = ["DALJNOGLED", "FOTOAPARAT", "ZEMLJEVID", "ČOPIČ", "STETOSKOP", "VESOLJSKA ČELADA", "KNJIGA"];
const messages = ["VSAKDO LAHKO POSKUSI.", "RAZLIČNOSTI NAS BOGATIJO.", "VELIKE IDEJE POTREBUJEJO ČAS.", "PRIJATELJI SI POMAGAJO.", "ZGODBO LAHKO USTVARIŠ TUDI TI."];
function CreatorPage({ go }: { go: (n: number) => void }) {
  const [name, setName] = useState(""); const [interest, setInterest] = useState(interests[0]); const [career, setCareer] = useState(careers[0]); const [place, setPlace] = useState(places[0]); const [object, setObject] = useState(objects[0]); const [message, setMessage] = useState(messages[0]); const [custom, setCustom] = useState(false);
  const displayName = name.trim() || "MOJA JUNAKINJA";
  return <div className="creator-page page-grid"><div className="creator-form"><SectionTag tone="purple">20 · USTVARJANJE</SectionTag><h2>ZDAJ SI <em>NA VRSTI TI</em></h2><p>Ustvari junakinjo po svoji zamisli. Izbire se sproti pokažejo na kartici.</p><div className="form-scroll"><label>IME JUNAKINJE<input value={name} onChange={(e) => setName(e.target.value.toUpperCase())} placeholder="NAPIŠI IME" maxLength={20} /></label><Choice label="KAJ JO ZANIMA?" items={interests} value={interest} onChange={setInterest} multi /><Choice label="POKLIC, HOBI ALI SANJE" items={careers} value={career} onChange={(v) => { setCareer(v); setCustom(v === "NEKAJ ČISTO SVOJEGA"); }} /><Choice label="KJE SE ZAČNE PUSTOLOVŠČINA?" items={places} value={place} onChange={setPlace} /><Choice label="KAJ VZAME S SEBOJ?" items={objects} value={object} onChange={setObject} /><Choice label="NJENO SPOROČILO" items={messages} value={message} onChange={setMessage} /></div><div className="page-actions"><BackButton onClick={() => go(18)} /><button type="button" className="secondary-button" onClick={() => { setName(""); setInterest(interests[0]); setCareer(careers[0]); setPlace(places[0]); setObject(objects[0]); setMessage(messages[0]); setCustom(false); }}><WandSparkles size={17} /> NOVA</button></div></div><div className="character-preview"><div className="preview-top"><span>MOJA JUNAKINJA</span><Sparkles size={19} /></div><div className={`character-illustration place-${place.toLowerCase().replaceAll(" ", "-")}`}><div className="character-star"><Star size={30} fill="currentColor" /></div><div className="character-silhouette"><div className="char-head" /><div className="char-body" /><div className="char-leg left" /><div className="char-leg right" /></div><span className="object-badge">{object}</span></div><h3>{displayName}</h3><div className="preview-line"><span>RADA</span><strong>{interest}</strong></div><div className="preview-line"><span>POKLIC / HOBI</span><strong>{custom ? "TVOJA IDEJA" : career}</strong></div><div className="preview-line"><span>KRAJ</span><strong>{place}</strong></div><blockquote>»{message}«</blockquote><p className="auto-story"><b>{displayName}</b> je {custom ? "ustvarjalka svoje poti" : career.toLowerCase()}. Rada {interest.toLowerCase()} in svojo zgodbo začne v kraju <b>{place.toLowerCase()}</b>. S seboj vzame <b>{object.toLowerCase()}</b>.</p><div className="preview-actions"><button type="button" className="primary-button" onClick={() => alert("KARTICA JE PRIPRAVLJENA! ZDAJ JO LAHKO POKAŽEŠ ODRASLI OSEBI.")}>KONČAJ KARTICO <Check size={18} /></button><button type="button" className="text-button" onClick={() => go(0)}><HomeIcon size={17} /> NA ZAČETEK</button></div></div></div>;
}
function Choice({ label, items, value, onChange, multi = false }: { label: string; items: string[]; value: string; onChange: (v: string) => void; multi?: boolean }) { return <div className="choice-group"><div className="choice-label">{label}</div><div className="choice-options">{items.map((item) => <button type="button" key={item} className={`choice-option ${value === item ? "is-selected" : ""}`} onClick={() => onChange(item)}>{value === item && <Check size={14} />}{item}</button>)}</div>{multi && <small>IZBERI ENO ZA ZAČETEK — POZNEJE LAHKO DODAŠ ŠE VEČ.</small>}</div>; }

function Home() {
  const [page, setPage] = useState(0); const [caps, setCaps] = useState(true); const go = (next: number) => setPage(Math.max(0, Math.min(19, next)));
  const current = pages[page];
  return <div className={`app-shell ${caps ? "caps-on" : ""}`}><header className="site-header"><button className="brand" type="button" onClick={() => go(0)}><span className="brand-mark">B</span><span>BARBIJINA<br /><b>ZGODBA</b></span></button><div className="header-center"><span>{current.label}</span><i /><b>{current.number} / 20</b></div><div className="header-actions"><button className={`caps-toggle ${caps ? "is-on" : ""}`} type="button" onClick={() => setCaps(!caps)}><span className="toggle-icon">A</span>{caps ? "VELIKE ČRKE" : "OBIČAJNE ČRKE"}</button><button className="home-button" type="button" onClick={() => go(0)} aria-label="Na začetek"><HomeIcon size={18} /></button></div></header><main className="site-main">{page === 0 && <HomePage go={go} />}{page >= 1 && page <= 17 && <StoryPage index={page} go={go} />}{page === 18 && <SummaryPage go={go} />}{page === 19 && <CreatorPage go={go} />}</main><footer className="site-footer"><button type="button" onClick={() => go(page - 1)} disabled={page === 0}><ChevronLeft size={18} /> PREJŠNJA</button><div className="progress-track"><span style={{ width: `${((page + 1) / 20) * 100}%` }} /></div><button type="button" onClick={() => go(page + 1)} disabled={page === 19}>NASLEDNJA <ChevronRight size={18} /></button></footer></div>;
}

export default Home;
