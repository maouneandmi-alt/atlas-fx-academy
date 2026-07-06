import { useState, useRef, useEffect } from "react";

/* ---------------- Traductions ---------------- */
const T = {
  fr: {
    dir: "ltr",
    demo: "Données de démonstration",
    nav: { method: "Méthode", path: "Parcours", journal: "Journal", pricing: "Tarifs", cta: "Commencer gratuitement" },
    hero: {
      h1a: "On ne te donne pas des signaux.",
      h1b: "On te rend meilleur.",
      sub1: "Un ",
      subStrong: "coach IA disponible 24/7",
      sub2: " qui t'apprend à analyser le marché, à gérer ton risque et à tenir ta discipline — sur le forex et l'or (XAU/USD), en français, pensé pour le Maroc et l'Afrique francophone.",
    },
    chat: {
      head: "Coach IA — session éducative",
      welcome: "Salam ! Je suis ton coach. Ici on ne parle pas de signaux — on parle de méthode, de risque et de discipline. Par où on commence ?",
      thinking: "le coach réfléchit",
      placeholder: "Pose ta question au coach…",
      send: "Envoyer",
      disclaimer: "CONTENU ÉDUCATIF — AUCUN CONSEIL EN INVESTISSEMENT",
      errEmpty: "Je n'ai pas pu formuler de réponse. Reformule ta question et on réessaie.",
      errNet: "Connexion au coach impossible pour le moment. Vérifie ta connexion et réessaie dans un instant.",
      chips: ["C'est quoi un order block ?", "Comment calculer ma taille de position ?", "Comment éviter le revenge trading ?", "Explique-moi le ratio risque/rendement"],
      langInstruction: "Réponds en français.",
    },
    pillars: {
      eyebrow: "Méthode",
      h2: "Trois piliers, une méthode",
      lead: "Le trading rentable n'est pas une affaire de chance ni de gourous. C'est une compétence qui s'apprend, pilier par pilier.",
      items: [
        { tag: "Pilier 01", h3: "Technique", p: "Lis le marché comme les institutionnels : concepts SMC/ICT, order blocks, fair value gaps, structure de marché et liquidité — expliqués simplement, sans jargon inutile." },
        { tag: "Pilier 02", h3: "Risque", p: "Le capital d'abord. Position sizing rigoureux, ratio risque/rendement, règles d'exposition : tu apprends à survivre avant d'apprendre à gagner." },
        { tag: "Pilier 03", h3: "Psychologie", p: "Revenge trading, FOMO, sur-trading : ton pire adversaire est dans le miroir. On travaille la discipline comme un athlète travaille son mental." },
      ],
    },
    path: {
      eyebrow: "Parcours",
      h2: "Un chemin clair, quel que soit ton niveau",
      items: [
        { tag: "Débutant", h3: "Poser les fondations", p: "Objectif : comprendre le fonctionnement du forex et de l'or, maîtriser le vocabulaire et ouvrir un compte démo avec les bons réflexes dès le premier jour." },
        { tag: "Intermédiaire", h3: "Construire son plan", p: "Objectif : bâtir un plan de trading complet — setup, gestion du risque, routine d'analyse — et le tester en démo avec la rigueur d'un professionnel." },
        { tag: "Confirmé", h3: "Devenir constant", p: "Objectif : éliminer les écarts de discipline, affiner l'exécution et transformer une stratégie qui marche parfois en processus qui tient dans la durée." },
      ],
    },
    journal: {
      eyebrow: "Premium",
      h2: "Ton journal MT5, analysé par l'IA",
      lead: "Exporte ton historique MetaTrader 5, et le coach le passe au crible. Pas pour te juger — pour te montrer, chiffres à l'appui, où tu perds ton edge.",
      bullets: [
        { b: "Écarts au plan détectés", t: " — chaque trade hors setup est identifié et expliqué." },
        { b: "R:R planifié vs réalisé", t: " — l'écart entre ton intention et ton exécution, noir sur blanc." },
        { b: "Schémas comportementaux", t: " — sorties prématurées, revenge trading, sur-exposition : l'IA repère ce que tu ne vois plus." },
      ],
      mHead: "Rapport d'analyse — exemple",
      rows: { trades: "Trades analysés", plan: "Respect du plan", rrPlan: "R:R planifié", rrReal: "R:R réalisé" },
      pattern: "⚠ Schéma détecté : sorties prématurées — 68 % des gains clôturés avant le TP planifié.",
    },
    pricing: {
      eyebrow: "Tarifs",
      h2: "Commence gratuitement, progresse à ton rythme",
      unit0: "MAD",
      unit: "MAD / 3 mois",
      popular: "Populaire",
      plans: [
        { name: "Découverte", price: "0", features: ["Modules fondamentaux (forex & or)", "Coach IA — 10 questions / mois", "Glossaire & quiz interactifs"], cta: "Créer mon compte" },
        { name: "Trader", price: "1 500", features: ["Coach IA illimité 24/7", "Analyse de journal MT5 par l'IA", "Parcours complet SMC/ICT", "Ateliers risque & psychologie"], cta: "Choisir Trader" },
        { name: "Pro", price: "3 000", features: ["Tout le plan Trader", "Mentor humain — 6 sessions / trimestre", "Revue de plan de trading personnalisée", "Accès prioritaire aux nouveautés"], cta: "Choisir Pro" },
      ],
    },
    footer: {
      warnTitle: "AVERTISSEMENT SUR LES RISQUES.",
      warn: " ATLAS FX Academy est une plateforme exclusivement éducative. Aucun contenu proposé — y compris les réponses du coach IA — ne constitue un conseil en investissement, une recommandation d'achat ou de vente, ni une incitation à trader. Le trading du forex et des métaux précieux comporte un risque élevé de perte en capital et ne convient pas à tous les profils. Les performances passées ne préjugent pas des performances futures. Ne tradez jamais avec de l'argent dont vous ne pouvez pas vous permettre la perte.",
      legal: "ATLAS TRADE CORP SARL A.U. — Casablanca, Maroc. Tous droits réservés.",
    },
  },

  en: {
    dir: "ltr",
    demo: "Demo data",
    nav: { method: "Method", path: "Learning path", journal: "Journal", pricing: "Pricing", cta: "Start for free" },
    hero: {
      h1a: "We don't give you signals.",
      h1b: "We make you better.",
      sub1: "An ",
      subStrong: "AI coach available 24/7",
      sub2: " that teaches you to read the market, manage your risk and hold your discipline — on forex and gold (XAU/USD), built for Morocco and French-speaking Africa.",
    },
    chat: {
      head: "AI Coach — educational session",
      welcome: "Hey! I'm your coach. No signals here — we talk method, risk and discipline. Where do we start?",
      thinking: "the coach is thinking",
      placeholder: "Ask the coach a question…",
      send: "Send",
      disclaimer: "EDUCATIONAL CONTENT — NOT INVESTMENT ADVICE",
      errEmpty: "I couldn't produce an answer. Rephrase your question and let's try again.",
      errNet: "Can't reach the coach right now. Check your connection and try again in a moment.",
      chips: ["What is an order block?", "How do I size my positions?", "How do I avoid revenge trading?", "Explain the risk/reward ratio"],
      langInstruction: "Respond in English.",
    },
    pillars: {
      eyebrow: "Method",
      h2: "Three pillars, one method",
      lead: "Profitable trading isn't about luck or gurus. It's a skill you build, pillar by pillar.",
      items: [
        { tag: "Pillar 01", h3: "Technique", p: "Read the market like the institutions: SMC/ICT concepts, order blocks, fair value gaps, market structure and liquidity — explained simply, without needless jargon." },
        { tag: "Pillar 02", h3: "Risk", p: "Capital first. Rigorous position sizing, risk/reward ratios, exposure rules: you learn to survive before you learn to win." },
        { tag: "Pillar 03", h3: "Psychology", p: "Revenge trading, FOMO, over-trading: your worst opponent is in the mirror. We train discipline the way an athlete trains their mind." },
      ],
    },
    path: {
      eyebrow: "Learning path",
      h2: "A clear path, whatever your level",
      items: [
        { tag: "Beginner", h3: "Build the foundations", p: "Goal: understand how forex and gold work, master the vocabulary and open a demo account with the right habits from day one." },
        { tag: "Intermediate", h3: "Build your plan", p: "Goal: build a complete trading plan — setup, risk management, analysis routine — and test it in demo with professional rigor." },
        { tag: "Advanced", h3: "Become consistent", p: "Goal: eliminate discipline slippage, refine execution and turn a strategy that sometimes works into a process that lasts." },
      ],
    },
    journal: {
      eyebrow: "Premium",
      h2: "Your MT5 journal, analyzed by AI",
      lead: "Export your MetaTrader 5 history and the coach puts it under the microscope. Not to judge you — to show you, with numbers, where you're losing your edge.",
      bullets: [
        { b: "Plan deviations detected", t: " — every off-setup trade is flagged and explained." },
        { b: "Planned vs realized R:R", t: " — the gap between your intention and your execution, in black and white." },
        { b: "Behavioral patterns", t: " — early exits, revenge trading, over-exposure: the AI spots what you no longer see." },
      ],
      mHead: "Analysis report — sample",
      rows: { trades: "Trades analyzed", plan: "Plan adherence", rrPlan: "Planned R:R", rrReal: "Realized R:R" },
      pattern: "⚠ Pattern detected: early exits — 68% of winners closed before the planned TP.",
    },
    pricing: {
      eyebrow: "Pricing",
      h2: "Start free, progress at your own pace",
      unit0: "MAD",
      unit: "MAD / 3 months",
      popular: "Popular",
      plans: [
        { name: "Discovery", price: "0", features: ["Core modules (forex & gold)", "AI coach — 10 questions / month", "Glossary & interactive quizzes"], cta: "Create my account" },
        { name: "Trader", price: "1,500", features: ["Unlimited AI coach 24/7", "AI analysis of your MT5 journal", "Full SMC/ICT curriculum", "Risk & psychology workshops"], cta: "Choose Trader" },
        { name: "Pro", price: "3,000", features: ["Everything in Trader", "Human mentor — 6 sessions / quarter", "Personalized trading plan review", "Priority access to new features"], cta: "Choose Pro" },
      ],
    },
    footer: {
      warnTitle: "RISK WARNING.",
      warn: " ATLAS FX Academy is an educational platform only. No content provided — including the AI coach's answers — constitutes investment advice, a buy or sell recommendation, or an inducement to trade. Trading forex and precious metals carries a high risk of capital loss and is not suitable for everyone. Past performance is no guarantee of future results. Never trade with money you cannot afford to lose.",
      legal: "ATLAS TRADE CORP SARL A.U. — Casablanca, Morocco. All rights reserved.",
    },
  },

  ar: {
    dir: "rtl",
    demo: "بيانات تجريبية",
    nav: { method: "المنهج", path: "المسار", journal: "السجل", pricing: "الأسعار", cta: "ابدأ مجانًا" },
    hero: {
      h1a: "نحن لا نعطيك إشارات.",
      h1b: "نحن نجعلك أفضل.",
      sub1: "",
      subStrong: "مدرب ذكاء اصطناعي متاح 24/7",
      sub2: " يعلّمك تحليل السوق، وإدارة المخاطر، والالتزام بالانضباط — في الفوركس والذهب (XAU/USD)، مصمَّم للمغرب وإفريقيا الفرنكوفونية.",
    },
    chat: {
      head: "المدرب الذكي — جلسة تعليمية",
      welcome: "السلام! أنا مدربك. هنا لا نتحدث عن الإشارات — بل عن المنهج والمخاطر والانضباط. من أين نبدأ؟",
      thinking: "المدرب يفكر",
      placeholder: "اطرح سؤالك على المدرب…",
      send: "إرسال",
      disclaimer: "محتوى تعليمي — ليس نصيحة استثمارية",
      errEmpty: "لم أتمكن من صياغة إجابة. أعد صياغة سؤالك ولنحاول مجددًا.",
      errNet: "تعذّر الاتصال بالمدرب حاليًا. تحقّق من اتصالك وحاول بعد قليل.",
      chips: ["ما هو الأوردر بلوك؟", "كيف أحسب حجم صفقتي؟", "كيف أتجنب التداول الانتقامي؟", "اشرح لي نسبة المخاطرة إلى العائد"],
      langInstruction: "أجب باللغة العربية.",
    },
    pillars: {
      eyebrow: "المنهج",
      h2: "ثلاث ركائز، منهج واحد",
      lead: "التداول المربح ليس مسألة حظ ولا معلّمين ملهمين. إنها مهارة تُكتسب، ركيزة تلو الأخرى.",
      items: [
        { tag: "الركيزة 01", h3: "التقنية", p: "اقرأ السوق كما تقرؤه المؤسسات: مفاهيم SMC/ICT، الأوردر بلوك، فجوات القيمة العادلة، بنية السوق والسيولة — بشرح مبسّط دون تعقيد." },
        { tag: "الركيزة 02", h3: "المخاطر", p: "رأس المال أولًا. تحديد دقيق لحجم الصفقات، نسبة المخاطرة إلى العائد، وقواعد التعرّض: تتعلم البقاء قبل أن تتعلم الربح." },
        { tag: "الركيزة 03", h3: "علم النفس", p: "التداول الانتقامي، الخوف من فوات الفرصة، الإفراط في التداول: أسوأ خصم لك هو في المرآة. نبني الانضباط كما يبني الرياضي عقليته." },
      ],
    },
    path: {
      eyebrow: "المسار",
      h2: "طريق واضح مهما كان مستواك",
      items: [
        { tag: "مبتدئ", h3: "بناء الأساسات", p: "الهدف: فهم آلية عمل الفوركس والذهب، وإتقان المصطلحات، وفتح حساب تجريبي بعادات صحيحة من اليوم الأول." },
        { tag: "متوسط", h3: "بناء خطتك", p: "الهدف: بناء خطة تداول متكاملة — الإعداد، إدارة المخاطر، روتين التحليل — واختبارها على الحساب التجريبي بصرامة المحترفين." },
        { tag: "متقدم", h3: "تحقيق الثبات", p: "الهدف: القضاء على تجاوزات الانضباط، وصقل التنفيذ، وتحويل استراتيجية تنجح أحيانًا إلى منهج يدوم." },
      ],
    },
    journal: {
      eyebrow: "بريميوم",
      h2: "سجلك على MT5، بتحليل الذكاء الاصطناعي",
      lead: "صدّر سجلك من MetaTrader 5 وسيفحصه المدرب بدقة. ليس ليحكم عليك — بل ليريك بالأرقام أين تفقد أفضليتك.",
      bullets: [
        { b: "رصد الانحرافات عن الخطة", t: " — كل صفقة خارج الإعداد تُحدَّد وتُشرح." },
        { b: "المخاطرة/العائد المخطط مقابل المحقق", t: " — الفجوة بين نيّتك وتنفيذك، بوضوح تام." },
        { b: "الأنماط السلوكية", t: " — الخروج المبكر، التداول الانتقامي، الإفراط في التعرّض: الذكاء الاصطناعي يرصد ما لم تعد تراه." },
      ],
      mHead: "تقرير التحليل — نموذج",
      rows: { trades: "الصفقات المحلَّلة", plan: "الالتزام بالخطة", rrPlan: "م/ع المخطط", rrReal: "م/ع المحقق" },
      pattern: "⚠ نمط مرصود: خروج مبكر — 68٪ من الصفقات الرابحة أُغلقت قبل الهدف المخطط.",
    },
    pricing: {
      eyebrow: "الأسعار",
      h2: "ابدأ مجانًا وتقدّم بوتيرتك",
      unit0: "درهم",
      unit: "درهم / 3 أشهر",
      popular: "الأكثر طلبًا",
      plans: [
        { name: "اكتشاف", price: "0", features: ["الوحدات الأساسية (فوركس وذهب)", "المدرب الذكي — 10 أسئلة شهريًا", "قاموس مصطلحات واختبارات تفاعلية"], cta: "إنشاء حسابي" },
        { name: "متداول", price: "1 500", features: ["مدرب ذكي غير محدود 24/7", "تحليل سجل MT5 بالذكاء الاصطناعي", "مسار SMC/ICT كامل", "ورشات المخاطر وعلم النفس"], cta: "اختيار متداول" },
        { name: "برو", price: "3 000", features: ["كل مزايا خطة متداول", "مرشد بشري — 6 جلسات كل فصل", "مراجعة شخصية لخطة تداولك", "أولوية الوصول إلى الميزات الجديدة"], cta: "اختيار برو" },
      ],
    },
    footer: {
      warnTitle: "تحذير من المخاطر.",
      warn: " منصة ATLAS FX Academy منصة تعليمية حصريًا. لا يشكّل أي محتوى مقدَّم — بما في ذلك إجابات المدرب الذكي — نصيحة استثمارية أو توصية بالشراء أو البيع أو تحريضًا على التداول. ينطوي تداول الفوركس والمعادن الثمينة على مخاطر عالية لخسارة رأس المال ولا يناسب الجميع. الأداء السابق لا يضمن النتائج المستقبلية. لا تتداول أبدًا بأموال لا تستطيع تحمّل خسارتها.",
      legal: "ATLAS TRADE CORP SARL A.U. — الدار البيضاء، المغرب. جميع الحقوق محفوظة.",
    },
  },
};

const SYSTEM_PROMPT_BASE = `Tu es le Coach IA d'ATLAS FX Academy, une plateforme EXCLUSIVEMENT ÉDUCATIVE de trading forex et or (XAU/USD) pour le Maroc et l'Afrique francophone.

TON RÔLE : coach pédagogue et exigeant sur la discipline. Tu expliques les concepts (SMC/ICT, order blocks, fair value gaps, position sizing, ratio risque/rendement, psychologie du trading), tu débriefes les trades PASSÉS que l'utilisateur décrit, et tu l'aides à construire son plan de trading personnel.

RÈGLE ABSOLUE ET NON NÉGOCIABLE : tu ne donnes JAMAIS de recommandation d'achat ou de vente, JAMAIS de niveaux d'entrée, de take profit ou de stop loss, JAMAIS de prédiction de marché ("l'or va monter/descendre"). Si on te le demande, refuse poliment et recentre immédiatement sur l'éducation : propose plutôt d'expliquer COMMENT l'utilisateur peut analyser lui-même la situation et construire son propre plan.

Tu rappelles le risque élevé de perte en capital quand c'est pertinent (levier, taille de position, gestion émotionnelle).

Style : ton de coach sportif — bienveillant mais direct, tutoiement, réponses de 150 mots maximum. Va droit au but, pose une question de suivi quand c'est utile pour faire réfléchir.`;

const TICKER = [
  { pair: "XAU/USD", price: "3 412.50", chg: "+0.42%", up: true },
  { pair: "EUR/USD", price: "1.0874", chg: "-0.11%", up: false },
  { pair: "GBP/USD", price: "1.2731", chg: "+0.08%", up: true },
  { pair: "USD/JPY", price: "156.42", chg: "+0.23%", up: true },
  { pair: "USD/MAD", price: "9.87", chg: "-0.05%", up: false },
];

function Candles() {
  const candles = [
    { x: 10, o: 120, c: 95, h: 88, l: 128 },
    { x: 40, o: 95, c: 105, h: 90, l: 112 },
    { x: 70, o: 105, c: 78, h: 72, l: 110 },
    { x: 100, o: 78, c: 88, h: 70, l: 95 },
    { x: 130, o: 88, c: 62, h: 55, l: 92 },
    { x: 160, o: 62, c: 74, h: 58, l: 80 },
    { x: 190, o: 74, c: 50, h: 44, l: 78 },
    { x: 220, o: 50, c: 58, h: 45, l: 66 },
    { x: 250, o: 58, c: 38, h: 32, l: 62 },
    { x: 280, o: 38, c: 46, h: 33, l: 52 },
  ];
  return (
    <svg viewBox="0 0 310 150" className="candles" aria-hidden="true">
      <line x1="0" y1="40" x2="310" y2="40" className="grid-line" />
      <line x1="0" y1="80" x2="310" y2="80" className="grid-line" />
      <line x1="0" y1="120" x2="310" y2="120" className="grid-line" />
      {candles.map((k, i) => {
        const bull = k.c < k.o;
        const top = Math.min(k.o, k.c);
        const h = Math.max(Math.abs(k.o - k.c), 2);
        return (
          <g key={i}>
            <line x1={k.x + 7} y1={k.h} x2={k.x + 7} y2={k.l} stroke={bull ? "#3DBE8B" : "#E0564F"} strokeWidth="1.5" />
            <rect x={k.x} y={top} width="14" height={h} rx="1.5" fill={bull ? "#3DBE8B" : "#E0564F"} opacity="0.9" />
          </g>
        );
      })}
      <path d="M10,118 L70,96 L130,80 L190,62 L250,48 L295,38" fill="none" stroke="#E4B54A" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.7" />
    </svg>
  );
}

export default function AtlasFxAcademy() {
  const [lang, setLang] = useState("fr");
  const t = T[lang];
  const isRtl = t.dir === "rtl";

  const [messages, setMessages] = useState([{ role: "assistant", content: T.fr.chat.welcome }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, loading]);

  const switchLang = (l) => {
    if (l === lang) return;
    setLang(l);
    // Réinitialise l'accueil du coach dans la nouvelle langue si aucune conversation n'a commencé
    setMessages((prev) => (prev.length === 1 && prev[0].role === "assistant" ? [{ role: "assistant", content: T[l].chat.welcome }] : prev));
  };

  const send = async (text) => {
    const clean = (text || "").trim();
    if (!clean || loading) return;
    const history = [...messages, { role: "user", content: clean }];
    setMessages(history);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: SYSTEM_PROMPT_BASE + "\n\nLANGUE DE RÉPONSE : " + t.chat.langInstruction,
          messages: history.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = (data.content || [])
        .filter((b) => b.type === "text")
        .map((b) => b.text)
        .join("\n")
        .trim();
      setMessages([...history, { role: "assistant", content: reply || t.chat.errEmpty }]);
    } catch (e) {
      setMessages([...history, { role: "assistant", content: t.chat.errNet }]);
    } finally {
      setLoading(false);
    }
  };

  const tickerItems = [...TICKER, ...TICKER, ...TICKER];

  return (
    <div className={`afx ${isRtl ? "rtl" : ""}`} dir={t.dir} lang={lang}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap');

        .afx {
          --bg: #0C1220;
          --panel: #131B2C;
          --border: #1F2A42;
          --gold: #E4B54A;
          --green: #3DBE8B;
          --red: #E0564F;
          --text: #E8ECF4;
          --muted: #8B96AC;
          --display: 'Space Grotesk', sans-serif;
          --mono: 'IBM Plex Mono', monospace;
          background: var(--bg);
          color: var(--text);
          font-family: var(--display);
          min-height: 100vh;
          line-height: 1.55;
        }
        .afx.rtl { --display: 'IBM Plex Sans Arabic', 'Space Grotesk', sans-serif; }
        .afx *, .afx *::before, .afx *::after { box-sizing: border-box; margin: 0; }
        .afx a { color: inherit; text-decoration: none; }
        .afx button { font-family: inherit; cursor: pointer; }
        .afx :focus-visible { outline: 2px solid var(--gold); outline-offset: 2px; border-radius: 4px; }

        /* ---------- Ticker ---------- */
        .ticker-wrap {
          border-bottom: 1px solid var(--border);
          background: #0A0F1A;
          overflow: hidden;
          display: flex;
          align-items: center;
          font-family: var(--mono);
          font-size: 12px;
          direction: ltr; /* le ticker reste LTR : données numériques */
        }
        .ticker-demo {
          flex: 0 0 auto;
          padding: 8px 14px;
          color: var(--muted);
          border-right: 1px solid var(--border);
          background: #0A0F1A;
          z-index: 2;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          font-size: 10px;
          white-space: nowrap;
        }
        .afx.rtl .ticker-demo { font-family: var(--display); letter-spacing: 0; }
        .ticker-track {
          display: flex;
          gap: 36px;
          white-space: nowrap;
          padding: 8px 0;
          animation: afx-scroll 38s linear infinite;
        }
        @keyframes afx-scroll { from { transform: translateX(0); } to { transform: translateX(-33.33%); } }
        @media (prefers-reduced-motion: reduce) { .ticker-track { animation: none; } }
        .tick { display: inline-flex; gap: 10px; align-items: baseline; }
        .tick .pair { color: var(--text); font-weight: 600; }
        .tick .price { color: var(--muted); }
        .tick .up { color: var(--green); }
        .tick .down { color: var(--red); }

        /* ---------- Nav ---------- */
        .nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 18px 28px;
          border-bottom: 1px solid var(--border);
          flex-wrap: wrap;
        }
        .logo { font-weight: 700; font-size: 18px; letter-spacing: 0.02em; font-family: 'Space Grotesk', sans-serif; }
        .logo .fx { color: var(--gold); }
        .logo small {
          display: block;
          font-family: var(--mono);
          font-size: 9px;
          font-weight: 400;
          color: var(--muted);
          letter-spacing: 0.28em;
          text-transform: uppercase;
        }
        .nav-right { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
        .nav-links { display: flex; gap: 26px; font-size: 14px; color: var(--muted); flex-wrap: wrap; }
        .nav-links a:hover { color: var(--text); }
        .lang-switch {
          display: flex;
          border: 1px solid var(--border);
          border-radius: 8px;
          overflow: hidden;
          font-family: var(--mono);
          font-size: 12px;
        }
        .lang-switch button {
          background: transparent;
          border: none;
          color: var(--muted);
          padding: 7px 11px;
          transition: color .12s, background .12s;
        }
        .lang-switch button + button { border-inline-start: 1px solid var(--border); }
        .lang-switch button:hover { color: var(--text); }
        .lang-switch button.active { background: var(--gold); color: #14100A; font-weight: 600; }
        .btn-gold {
          background: var(--gold);
          color: #14100A;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          padding: 10px 18px;
          transition: transform .12s ease, filter .12s ease;
        }
        .btn-gold:hover { filter: brightness(1.08); transform: translateY(-1px); }

        /* ---------- Hero ---------- */
        .hero {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 44px;
          padding: 60px 28px 70px;
          max-width: 1180px;
          margin: 0 auto;
          align-items: center;
        }
        .hero h1 { font-size: clamp(30px, 4.4vw, 52px); line-height: 1.18; font-weight: 700; letter-spacing: -0.015em; }
        .afx.rtl .hero h1 { letter-spacing: 0; line-height: 1.35; }
        .hero h1 em { font-style: normal; color: var(--gold); }
        .hero .sub { margin-top: 18px; color: var(--muted); font-size: 16px; max-width: 46ch; }
        .hero .sub strong { color: var(--text); font-weight: 600; }
        .candles { width: 100%; max-width: 340px; margin-top: 30px; display: block; }
        .grid-line { stroke: var(--border); stroke-width: 1; }

        /* ---------- Chat ---------- */
        .chat {
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: 14px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.35);
        }
        .chat-head {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 13px 16px;
          border-bottom: 1px solid var(--border);
          font-family: var(--mono);
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .afx.rtl .chat-head { font-family: var(--display); letter-spacing: 0; }
        .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--green); flex: 0 0 auto; }
        .chat-body {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          height: 320px;
          overflow-y: auto;
          scroll-behavior: smooth;
        }
        .msg { max-width: 88%; padding: 10px 13px; border-radius: 10px; font-size: 14px; white-space: pre-wrap; }
        .msg.ai { background: #0F1626; border: 1px solid var(--border); align-self: flex-start; }
        .msg.user { background: rgba(228,181,74,0.12); border: 1px solid rgba(228,181,74,0.35); align-self: flex-end; }
        .thinking { font-family: var(--mono); font-size: 12px; color: var(--muted); align-self: flex-start; padding: 6px 2px; }
        .afx.rtl .thinking { font-family: var(--display); }
        .thinking::after { content: '…'; animation: afx-blink 1.2s steps(4) infinite; }
        @keyframes afx-blink { 50% { opacity: 0.2; } }
        .chips { display: flex; flex-wrap: wrap; gap: 8px; padding: 0 16px 12px; }
        .chip {
          background: transparent;
          border: 1px solid var(--border);
          color: var(--muted);
          border-radius: 999px;
          padding: 6px 12px;
          font-size: 12px;
          transition: border-color .12s, color .12s;
        }
        .chip:hover:not(:disabled) { border-color: var(--gold); color: var(--gold); }
        .chip:disabled { opacity: 0.45; cursor: default; }
        .chat-input { display: flex; gap: 8px; padding: 12px 16px; border-top: 1px solid var(--border); }
        .chat-input input {
          flex: 1;
          background: #0F1626;
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 10px 12px;
          color: var(--text);
          font-family: var(--display);
          font-size: 14px;
        }
        .chat-input input::placeholder { color: var(--muted); }
        .chat-input button {
          background: var(--gold);
          border: none;
          border-radius: 8px;
          color: #14100A;
          font-weight: 600;
          padding: 10px 16px;
          font-size: 14px;
        }
        .chat-input button:disabled { opacity: 0.5; cursor: default; }
        .chat-disclaimer {
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.08em;
          color: var(--gold);
          text-align: center;
          padding: 9px 12px;
          border-top: 1px solid var(--border);
          background: rgba(228,181,74,0.06);
        }
        .afx.rtl .chat-disclaimer { font-family: var(--display); letter-spacing: 0; font-size: 11px; }

        /* ---------- Sections ---------- */
        .section { max-width: 1180px; margin: 0 auto; padding: 64px 28px; }
        .eyebrow {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 12px;
        }
        .afx.rtl .eyebrow { font-family: var(--display); letter-spacing: 0.04em; font-size: 13px; }
        .section h2 { font-size: clamp(24px, 3vw, 34px); font-weight: 700; letter-spacing: -0.01em; }
        .afx.rtl .section h2 { letter-spacing: 0; }
        .section .lead { color: var(--muted); margin-top: 10px; max-width: 60ch; }

        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 34px; }
        .card { background: var(--panel); border: 1px solid var(--border); border-radius: 12px; padding: 24px; }
        .card h3 { font-size: 18px; font-weight: 600; margin-bottom: 8px; }
        .card p { color: var(--muted); font-size: 14px; }
        .card .tag {
          display: inline-block;
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--gold);
          border: 1px solid rgba(228,181,74,0.4);
          border-radius: 4px;
          padding: 3px 8px;
          margin-bottom: 14px;
        }
        .afx.rtl .card .tag { font-family: var(--display); letter-spacing: 0.02em; font-size: 11px; }

        /* ---------- Journal ---------- */
        .journal { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }
        .metrics { background: var(--panel); border: 1px solid var(--border); border-radius: 14px; padding: 22px; font-family: var(--mono); }
        .afx.rtl .metrics { font-family: var(--display); }
        .metrics .m-head {
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted);
          padding-bottom: 14px;
          border-bottom: 1px solid var(--border);
          margin-bottom: 6px;
        }
        .afx.rtl .metrics .m-head { letter-spacing: 0.02em; font-size: 12px; }
        .m-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid var(--border);
          font-size: 13px;
        }
        .m-row:last-child { border-bottom: none; }
        .m-row .label { color: var(--muted); }
        .m-row .val { font-family: var(--mono); }
        .badge { border-radius: 5px; padding: 3px 9px; font-size: 12px; font-weight: 600; font-family: var(--mono); }
        .badge.ok { color: var(--green); background: rgba(61,190,139,0.12); border: 1px solid rgba(61,190,139,0.4); }
        .badge.ko { color: var(--red); background: rgba(224,86,79,0.12); border: 1px solid rgba(224,86,79,0.4); }
        .pattern {
          margin-top: 14px;
          border: 1px dashed rgba(228,181,74,0.5);
          border-radius: 8px;
          padding: 12px 14px;
          font-size: 12px;
          color: var(--gold);
        }
        .journal-text ul { margin: 18px 0 0; padding-inline-start: 20px; color: var(--muted); font-size: 15px; }
        .journal-text li { margin-bottom: 10px; }
        .journal-text li strong { color: var(--text); }

        /* ---------- Pricing ---------- */
        .pricing { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 34px; align-items: stretch; }
        .price-card { position: relative; display: flex; flex-direction: column; }
        .price-card.featured { border-color: var(--gold); box-shadow: 0 0 0 1px var(--gold), 0 18px 50px rgba(228,181,74,0.12); }
        .pop {
          position: absolute;
          top: -11px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--gold);
          color: #14100A;
          font-family: var(--mono);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          border-radius: 5px;
          padding: 3px 10px;
          white-space: nowrap;
        }
        .afx.rtl .pop { font-family: var(--display); letter-spacing: 0; font-size: 11px; }
        .price { font-family: var(--mono); font-size: 34px; font-weight: 600; margin: 12px 0 2px; direction: ltr; }
        .afx.rtl .price { text-align: right; }
        .price .unit { font-size: 13px; color: var(--muted); font-weight: 400; font-family: var(--display); }
        .price-card ul { list-style: none; padding: 0; margin: 18px 0 22px; font-size: 14px; color: var(--muted); flex: 1; }
        .price-card li { padding: 6px 0; padding-inline-start: 22px; position: relative; }
        .price-card li::before { content: '—'; position: absolute; inset-inline-start: 0; color: var(--gold); }
        .btn-outline {
          background: transparent;
          border: 1px solid var(--border);
          border-radius: 8px;
          color: var(--text);
          font-weight: 600;
          font-size: 14px;
          padding: 11px 16px;
          width: 100%;
          transition: border-color .12s;
        }
        .btn-outline:hover { border-color: var(--gold); }
        .price-card.featured .btn-outline { background: var(--gold); border-color: var(--gold); color: #14100A; }

        /* ---------- Footer ---------- */
        .footer { border-top: 1px solid var(--border); padding: 40px 28px 50px; max-width: 1180px; margin: 0 auto; }
        .footer .warn {
          font-family: var(--mono);
          font-size: 11.5px;
          line-height: 1.8;
          color: var(--muted);
          border: 1px solid var(--border);
          border-inline-start: 3px solid var(--gold);
          border-radius: 8px;
          padding: 16px 18px;
          max-width: 900px;
        }
        .afx.rtl .footer .warn { font-family: var(--display); font-size: 13px; }
        .footer .warn strong { color: var(--gold); letter-spacing: 0.08em; }
        .afx.rtl .footer .warn strong { letter-spacing: 0; }
        .footer .legal { margin-top: 22px; font-size: 13px; color: var(--muted); }

        /* ---------- Responsive ---------- */
        @media (max-width: 900px) {
          .hero { grid-template-columns: 1fr; padding-top: 40px; }
          .grid-3, .pricing { grid-template-columns: 1fr; }
          .journal { grid-template-columns: 1fr; }
          .nav-links { display: none; }
        }
      `}</style>

      {/* 1. Ticker */}
      <div className="ticker-wrap">
        <span className="ticker-demo">{t.demo}</span>
        <div className="ticker-track" aria-hidden="true">
          {tickerItems.map((k, i) => (
            <span className="tick" key={i}>
              <span className="pair">{k.pair}</span>
              <span className="price">{k.price}</span>
              <span className={k.up ? "up" : "down"}>{k.chg}</span>
            </span>
          ))}
        </div>
      </div>

      {/* 2. Nav */}
      <nav className="nav">
        <div className="logo">
          ATLAS<span className="fx">FX</span>
          <small>Academy</small>
        </div>
        <div className="nav-right">
          <div className="nav-links">
            <a href="#methode">{t.nav.method}</a>
            <a href="#parcours">{t.nav.path}</a>
            <a href="#journal">{t.nav.journal}</a>
            <a href="#tarifs">{t.nav.pricing}</a>
          </div>
          <div className="lang-switch" role="group" aria-label="Langue / Language / اللغة">
            {["fr", "en", "ar"].map((l) => (
              <button key={l} className={lang === l ? "active" : ""} onClick={() => switchLang(l)} aria-pressed={lang === l}>
                {l === "fr" ? "FR" : l === "en" ? "EN" : "ع"}
              </button>
            ))}
          </div>
          <button className="btn-gold">{t.nav.cta}</button>
        </div>
      </nav>

      {/* 3. Hero */}
      <header className="hero">
        <div>
          <h1>
            {t.hero.h1a}
            <br />
            <em>{t.hero.h1b}</em>
          </h1>
          <p className="sub">
            {t.hero.sub1}
            <strong>{t.hero.subStrong}</strong>
            {t.hero.sub2}
          </p>
          <Candles />
        </div>

        <div className="chat">
          <div className="chat-head">
            <span className="dot" />
            {t.chat.head}
          </div>
          <div className="chat-body" ref={chatRef}>
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.role === "assistant" ? "ai" : "user"}`}>
                {m.content}
              </div>
            ))}
            {loading && <div className="thinking">{t.chat.thinking}</div>}
          </div>
          <div className="chips">
            {t.chat.chips.map((q) => (
              <button key={q} className="chip" disabled={loading} onClick={() => send(q)}>
                {q}
              </button>
            ))}
          </div>
          <div className="chat-input">
            <input
              value={input}
              placeholder={t.chat.placeholder}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") send(input);
              }}
              aria-label={t.chat.head}
            />
            <button onClick={() => send(input)} disabled={loading || !input.trim()}>
              {t.chat.send}
            </button>
          </div>
          <div className="chat-disclaimer">{t.chat.disclaimer}</div>
        </div>
      </header>

      {/* 4. Trois piliers */}
      <section className="section" id="methode">
        <div className="eyebrow">{t.pillars.eyebrow}</div>
        <h2>{t.pillars.h2}</h2>
        <p className="lead">{t.pillars.lead}</p>
        <div className="grid-3">
          {t.pillars.items.map((c) => (
            <div className="card" key={c.h3}>
              <span className="tag">{c.tag}</span>
              <h3>{c.h3}</h3>
              <p>{c.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Parcours */}
      <section className="section" id="parcours">
        <div className="eyebrow">{t.path.eyebrow}</div>
        <h2>{t.path.h2}</h2>
        <div className="grid-3">
          {t.path.items.map((c) => (
            <div className="card" key={c.h3}>
              <span className="tag">{c.tag}</span>
              <h3>{c.h3}</h3>
              <p>{c.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Journal MT5 */}
      <section className="section" id="journal">
        <div className="journal">
          <div className="journal-text">
            <div className="eyebrow">{t.journal.eyebrow}</div>
            <h2>{t.journal.h2}</h2>
            <p className="lead">{t.journal.lead}</p>
            <ul>
              {t.journal.bullets.map((b) => (
                <li key={b.b}>
                  <strong>{b.b}</strong>
                  {b.t}
                </li>
              ))}
            </ul>
          </div>
          <div className="metrics">
            <div className="m-head">{t.journal.mHead}</div>
            <div className="m-row">
              <span className="label">{t.journal.rows.trades}</span>
              <span className="val">47</span>
            </div>
            <div className="m-row">
              <span className="label">{t.journal.rows.plan}</span>
              <span className="badge ko">61 %</span>
            </div>
            <div className="m-row">
              <span className="label">{t.journal.rows.rrPlan}</span>
              <span className="badge ok">1:2.4</span>
            </div>
            <div className="m-row">
              <span className="label">{t.journal.rows.rrReal}</span>
              <span className="badge ko">1:1.1</span>
            </div>
            <div className="pattern">{t.journal.pattern}</div>
          </div>
        </div>
      </section>

      {/* 7. Tarifs */}
      <section className="section" id="tarifs">
        <div className="eyebrow">{t.pricing.eyebrow}</div>
        <h2>{t.pricing.h2}</h2>
        <div className="pricing">
          {t.pricing.plans.map((p, idx) => (
            <div className={`card price-card ${idx === 1 ? "featured" : ""}`} key={p.name}>
              {idx === 1 && <span className="pop">{t.pricing.popular}</span>}
              <h3>{p.name}</h3>
              <div className="price">
                {p.price} <span className="unit">{idx === 0 ? t.pricing.unit0 : t.pricing.unit}</span>
              </div>
              <ul>
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <button className="btn-outline">{p.cta}</button>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="footer">
        <div className="warn">
          <strong>{t.footer.warnTitle}</strong>
          {t.footer.warn}
        </div>
        <p className="legal">© {new Date().getFullYear()} {t.footer.legal}</p>
      </footer>
    </div>
  );
}
