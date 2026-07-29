import React, { useState, useMemo } from "react";
import {
  LayoutDashboard, Rabbit, Heart, Dna, Warehouse, Wheat, Stethoscope,
  Wallet, ShoppingCart, Users, Search, Bell, Plus, X, ChevronRight,
  Menu, Baby, ArrowUpRight, ArrowDownRight, TriangleAlert, CircleCheck,
  Clock, Trash2, Sparkles
} from "lucide-react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, PieChart, Pie, Cell
} from "recharts";

/* ---------------------------------------------------------------
   TOKENS
   Palette named for the physical world of a rabbit warren:
   burrow-dark greens, straw gold, clay-red alert, bone paper.
----------------------------------------------------------------*/
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

.gv-app {
  --burrow-950:#182A20; --burrow-900:#1E3529; --burrow-700:#2E5240;
  --moss-600:#4C7A5B; --moss-400:#7BA487;
  --straw-500:#CE9A3E; --straw-300:#E6C27E; --straw-100:#FBF0DA;
  --clay-600:#B5563A; --clay-100:#F6E1D9;
  --sky-600:#3E6E8E; --sky-100:#E1EDF3;
  --paper:#F8F6F0; --card:#FFFFFF;
  --ink-900:#20261F; --ink-600:#5B6459; --ink-400:#8B9285;
  --line:#E5E1D4;
  --font-display: 'Fraunces', serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'IBM Plex Mono', monospace;
  font-family: var(--font-body);
  color: var(--ink-900);
  background: var(--paper);
}
.gv-app * { box-sizing: border-box; }
.gv-scroll::-webkit-scrollbar { width: 8px; height: 8px; }
.gv-scroll::-webkit-scrollbar-thumb { background: var(--line); border-radius: 4px; }

.gv-card { background: var(--card); border: 1px solid var(--line); border-radius: 14px; }
.gv-navitem { display:flex; align-items:center; gap:10px; padding:9px 12px; border-radius:10px; color:#CFE0D3; font-size:14px; font-weight:500; cursor:pointer; transition: background .15s; }
.gv-navitem:hover { background: rgba(255,255,255,0.07); }
.gv-navitem.active { background: var(--straw-500); color: var(--burrow-950); }
.gv-navsection { font-size:11px; letter-spacing:.08em; color:#7FA089; text-transform:uppercase; font-weight:600; padding: 18px 12px 6px; }

.gv-badge { display:inline-flex; align-items:center; gap:5px; padding: 4px 10px; border-radius: 100px; font-size: 12px; font-weight: 600; white-space:nowrap; }
.gv-badge.success { background: var(--moss-400); background: #E1EEE2; color: #2C5A38; }
.gv-badge.warning { background: var(--straw-100); color: #8A5F17; }
.gv-badge.danger  { background: var(--clay-100); color: #8C3A22; }
.gv-badge.info    { background: var(--sky-100); color: #2A5573; }
.gv-badge.neutral { background: #EFEDE3; color: var(--ink-600); }

.gv-th { text-align:left; font-size:11px; letter-spacing:.06em; text-transform:uppercase; color: var(--ink-400); font-weight:600; padding: 10px 16px; border-bottom: 1px solid var(--line); white-space:nowrap; }
.gv-td { padding: 14px 16px; border-bottom: 1px solid var(--line); font-size: 14px; vertical-align: middle; }
.gv-row:hover { background: #FBFAF6; }

.gv-btn-primary { background: var(--burrow-900); color: #F8F6F0; border:none; padding:10px 16px; border-radius:10px; font-weight:600; font-size:14px; display:inline-flex; align-items:center; gap:6px; cursor:pointer; }
.gv-btn-primary:hover { background: var(--burrow-700); }
.gv-btn-ghost { background: transparent; border:1px solid var(--line); color: var(--ink-900); padding:9px 14px; border-radius:10px; font-weight:500; font-size:14px; cursor:pointer; }
.gv-btn-ghost:hover { border-color: var(--ink-400); }

.gv-input, .gv-select {
  width:100%; border:1px solid var(--line); border-radius:9px; padding:9px 11px;
  font-size:14px; font-family: var(--font-body); color: var(--ink-900); background:#fff;
}
.gv-input:focus, .gv-select:focus { outline:none; border-color: var(--moss-600); box-shadow: 0 0 0 3px rgba(76,122,91,0.15); }
.gv-label { font-size:12px; font-weight:600; color: var(--ink-600); margin-bottom:6px; display:block; }

.gv-tab { padding: 9px 4px; margin-right:22px; font-size:14px; font-weight:600; color: var(--ink-400); border-bottom:2px solid transparent; cursor:pointer; }
.gv-tab.active { color: var(--burrow-900); border-color: var(--straw-500); }

.gv-earTag { font-family: var(--font-mono); font-size: 12px; background: var(--straw-100); color:#7A5514; padding: 2px 8px; border-radius: 6px; letter-spacing: .03em; }
`;

/* ---------------------------------------------------------------
   MOCK DATA
----------------------------------------------------------------*/
const RACES = [
  { id: "r1", nom: "Fauve de Bourgogne", origine: "France", poidsAdulte: "4 – 5 kg", aptitude: "Chair, rustique", note: "Robe fauve uniforme, très bonne mère." },
  { id: "r2", nom: "Néo-Zélandais Blanc", origine: "États-Unis", poidsAdulte: "4 – 5.5 kg", aptitude: "Chair, croissance rapide", note: "Standard des élevages commerciaux." },
  { id: "r3", nom: "Californien", origine: "États-Unis", poidsAdulte: "3.5 – 4.5 kg", aptitude: "Chair", note: "Extrémités colorées, carcasse recherchée." },
  { id: "r4", nom: "Géant des Flandres", origine: "Belgique", poidsAdulte: "6 – 9 kg", aptitude: "Chair, gabarit", note: "Grande taille, croissance lente." },
  { id: "r5", nom: "Papillon Français", origine: "France", poidsAdulte: "3.5 – 4.5 kg", aptitude: "Chair, exposition", note: "Taches noires caractéristiques." },
];

const CLAPIERS = [
  { id: "c1", zone: "Rangée A", numero: "A-01", capacite: 1, occupant: "Pixel", statut: "Occupé" },
  { id: "c2", zone: "Rangée A", numero: "A-02", capacite: 1, occupant: "Lisette", statut: "Occupé" },
  { id: "c3", zone: "Rangée A", numero: "A-03", capacite: 1, occupant: "Luna", statut: "Occupé" },
  { id: "c4", zone: "Rangée A", numero: "A-04", capacite: 1, occupant: null, statut: "Nettoyage" },
  { id: "c5", zone: "Rangée B", numero: "B-01", capacite: 1, occupant: "TheKing", statut: "Occupé" },
  { id: "c6", zone: "Rangée B", numero: "B-02", capacite: 1, occupant: "Noisette", statut: "Occupé" },
  { id: "c7", zone: "Rangée B", numero: "B-03", capacite: 1, occupant: null, statut: "Libre" },
  { id: "c8", zone: "Engraissement", numero: "E-01", capacite: 8, occupant: "6 lapereaux (portée Lisette)", statut: "Occupé" },
];

const RABBITS_INIT = [
  { id: "l1", tag: "LP-014", nom: "Pixel", sexe: "F", race: "Néo-Zélandais Blanc", naissance: "2025-02-11", clapier: "A-01", statut: "Reproductrice", poids: 4.2, pere: null, mere: null },
  { id: "l2", tag: "LP-015", nom: "Lisette", sexe: "F", race: "Fauve de Bourgogne", naissance: "2024-11-03", clapier: "A-02", statut: "Reproductrice", poids: 4.6, pere: null, mere: null },
  { id: "l3", tag: "LP-016", nom: "Luna", sexe: "F", race: "Californien", naissance: "2024-09-20", clapier: "A-03", statut: "Reproductrice", poids: 3.9, pere: null, mere: null },
  { id: "l4", tag: "LP-002", nom: "TheKing", sexe: "M", race: "Néo-Zélandais Blanc", naissance: "2024-05-14", clapier: "B-01", statut: "Reproducteur", poids: 4.8, pere: null, mere: null },
  { id: "l5", tag: "LP-021", nom: "Noisette", sexe: "F", race: "Papillon Français", naissance: "2025-01-08", clapier: "B-02", statut: "Reproductrice", poids: 3.7, pere: "TheKing", mere: "Lisette" },
  { id: "l6", tag: "LP-030", nom: "Réglisse", sexe: "M", race: "Géant des Flandres", naissance: "2025-03-02", clapier: "E-01", statut: "Engraissement", poids: 2.1, pere: "TheKing", mere: "Luna" },
  { id: "l7", tag: "LP-031", nom: "Praline", sexe: "F", race: "Fauve de Bourgogne", naissance: "2025-03-02", clapier: "E-01", statut: "Engraissement", poids: 2.0, pere: "TheKing", mere: "Luna" },
];

const SAILLIES_INIT = [
  { id: "s1", femelle: "Pixel", male: "TheKing", date: "2026-07-29", diagnostic: "En attente" },
  { id: "s2", femelle: "Lisette", male: "TheKing", date: "2026-06-26", diagnostic: "Positif" },
  { id: "s3", femelle: "Luna", male: "TheKing", date: "2026-06-11", diagnostic: "Positif" },
];

const MATERNITE_INIT = [
  { id: "m1", femelle: "Lisette", dateMiseBas: "2026-07-28", nesVivants: 8, nesMorts: 1, sevrage: "2026-08-25" },
  { id: "m2", femelle: "Luna", dateMiseBas: "2026-07-13", nesVivants: 6, nesMorts: 0, sevrage: "2026-08-10" },
];

const ALIMENTATION_INIT = [
  { id: "f1", aliment: "Granulés croissance", stock: 85, seuil: 40, unite: "kg", conso: "6 kg / jour" },
  { id: "f2", aliment: "Granulés reproduction", stock: 32, seuil: 30, unite: "kg", conso: "3.5 kg / jour" },
  { id: "f3", aliment: "Foin", stock: 120, seuil: 50, unite: "kg", conso: "8 kg / jour" },
  { id: "f4", aliment: "Complément minéral", stock: 9, seuil: 10, unite: "kg", conso: "0.4 kg / jour" },
];

const SANTE_INIT = [
  { id: "h1", lapin: "Pixel", type: "Vaccination", produit: "VHD + Myxomatose", date: "2026-06-02", rappel: "2026-12-02" },
  { id: "h2", lapin: "TheKing", type: "Contrôle", produit: "Examen général", date: "2026-07-10", rappel: "2027-01-10" },
  { id: "h3", lapin: "Réglisse", type: "Traitement", produit: "Antiparasitaire", date: "2026-07-20", rappel: "2026-08-20" },
  { id: "h4", lapin: "Noisette", type: "Vaccination", produit: "VHD + Myxomatose", date: "2026-05-15", rappel: "2026-11-15" },
];

const TRANSACTIONS_INIT = [
  { id: "t1", date: "2026-07-26", type: "Recette", categorie: "Vente lapins", montant: 45000, description: "Vente de 3 lapins engraissés" },
  { id: "t2", date: "2026-07-20", type: "Dépense", categorie: "Alimentation", montant: -28000, description: "Achat granulés + foin" },
  { id: "t3", date: "2026-07-15", type: "Dépense", categorie: "Santé", montant: -6000, description: "Vaccins VHD/Myxomatose" },
  { id: "t4", date: "2026-07-05", type: "Recette", categorie: "Vente reproducteurs", montant: 30000, description: "Vente d'un couple reproducteur" },
];

const VENTES_INIT = [
  { id: "v1", date: "2026-07-26", client: "Koffi Marché Central", lapins: "3 lapins engraissés", quantite: 3, prixUnitaire: 15000, total: 45000 },
  { id: "v2", date: "2026-07-05", client: "Ferme Aya", lapins: "1 couple reproducteur", quantite: 2, prixUnitaire: 15000, total: 30000 },
  { id: "v3", date: "2026-06-18", client: "Restaurant Le Terroir", lapins: "5 lapins engraissés", quantite: 5, prixUnitaire: 14000, total: 70000 },
];

const CLIENTS_INIT = [
  { id: "cl1", nom: "Koffi Marché Central", contact: "07 01 23 45 67", ville: "Abidjan", totalAchats: 45000, dernierAchat: "2026-07-26" },
  { id: "cl2", nom: "Ferme Aya", contact: "05 44 56 78 90", ville: "Yamoussoukro", totalAchats: 30000, dernierAchat: "2026-07-05" },
  { id: "cl3", nom: "Restaurant Le Terroir", contact: "01 22 33 44 55", ville: "Abidjan", totalAchats: 70000, dernierAchat: "2026-06-18" },
];

const NAISSANCES_MOIS = [
  { mois: "Fév", naissances: 5 }, { mois: "Mars", naissances: 9 }, { mois: "Avr", naissances: 6 },
  { mois: "Mai", naissances: 11 }, { mois: "Juin", naissances: 8 }, { mois: "Juil", naissances: 14 },
];

const PIE_COLORS = ["#4C7A5B", "#CE9A3E", "#3E6E8E", "#B5563A", "#7BA487"];

/* ---------------------------------------------------------------
   GÉNÉALOGIE — détection déterministe du risque de consanguinité
   (calcul exact sur les liens de parenté enregistrés, pas une
   estimation du modèle — l'IA n'intervient qu'ensuite pour
   formuler la recommandation en langage naturel)
----------------------------------------------------------------*/
function findRabbit(name, rabbits) {
  return rabbits.find((r) => r.nom === name);
}

function relatedness(nameA, nameB, rabbits) {
  if (!nameA || !nameB || nameA === nameB) return { level: "none", label: "—" };
  const a = findRabbit(nameA, rabbits);
  const b = findRabbit(nameB, rabbits);
  if (!a || !b) return { level: "none", label: "Généalogie inconnue" };

  const aParents = [a.pere, a.mere].filter(Boolean);
  const bParents = [b.pere, b.mere].filter(Boolean);

  if (aParents.includes(b.nom) || bParents.includes(a.nom)) {
    return { level: "high", label: "Ascendance directe (parent / enfant)" };
  }
  const shared = aParents.filter((p) => bParents.includes(p));
  if (shared.length === 2) return { level: "high", label: "Frère et sœur" };
  if (shared.length === 1) return { level: "medium", label: "Demi-frère / demi-sœur" };

  const grandparentsOf = (r) => {
    const gp = [];
    [r.pere, r.mere].forEach((pname) => {
      const p = pname && findRabbit(pname, rabbits);
      if (p) gp.push(p.pere, p.mere);
    });
    return gp.filter(Boolean);
  };
  const aWide = [...aParents, ...grandparentsOf(a)];
  const bWide = [...bParents, ...grandparentsOf(b)];
  if (aWide.some((x) => bWide.includes(x))) {
    return { level: "medium", label: "Ancêtre commun (lien éloigné)" };
  }
  return { level: "none", label: "Aucun lien de parenté connu" };
}

function relatednessOrder(level) {
  return level === "none" ? 0 : level === "medium" ? 1 : 2;
}

function relatednessBadge(rel) {
  if (rel.level === "high") return <Badge variant="danger">{rel.label}</Badge>;
  if (rel.level === "medium") return <Badge variant="warning">{rel.label}</Badge>;
  return <Badge variant="success">{rel.label}</Badge>;
}

/* ---------------------------------------------------------------
   ASSISTANT IA — appel au modèle Claude pour les recommandations
   de reproduction et les prédictions de portée en langage naturel
----------------------------------------------------------------*/
async function askAI(prompt) {
  try {
    // Appel à notre propre serveur (server.js), qui relaie vers l'API Anthropic
    // avec la clé secrète. Le navigateur n'appelle jamais api.anthropic.com
    // directement (la clé ne doit jamais être exposée côté client).
    const response = await fetch("/api/claude", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 500,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    const data = await response.json();
    if (data.error) return `Assistant indisponible : ${data.error.message || data.error}`;
    const text = (data.content || [])
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();
    return text || "L'assistant n'a pas pu générer de réponse.";
  } catch (err) {
    return "Impossible de contacter l'assistant IA pour le moment. Réessayez dans un instant.";
  }
}

/* ---------------------------------------------------------------
   SMALL UI PRIMITIVES
----------------------------------------------------------------*/
function Badge({ variant = "neutral", children }) {
  return <span className={`gv-badge ${variant}`}>{children}</span>;
}

function fmtDate(iso) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}
function fmtFCFA(n) {
  return `${n.toLocaleString("fr-FR")} FCFA`;
}

function StatCard({ icon: Icon, label, value, delta, deltaType }) {
  return (
    <div className="gv-card" style={{ padding: "18px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-400)", textTransform: "uppercase", letterSpacing: ".04em", margin: 0 }}>{label}</p>
          <p style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 600, margin: "6px 0 0" }}>{value}</p>
        </div>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--straw-100)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={18} color="#8A5F17" />
        </div>
      </div>
      {delta && (
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 10, fontSize: 12.5, fontWeight: 600, color: deltaType === "up" ? "#2C5A38" : "#8C3A22" }}>
          {deltaType === "up" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {delta}
        </div>
      )}
    </div>
  );
}

function Table({ columns, rows, emptyLabel = "Aucune donnée pour le moment." }) {
  return (
    <div className="gv-card gv-scroll" style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>{columns.map((c) => <th key={c.key} className="gv-th">{c.label}</th>)}</tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr><td className="gv-td" colSpan={columns.length} style={{ color: "var(--ink-400)", textAlign: "center", padding: 32 }}>{emptyLabel}</td></tr>
          )}
          {rows.map((row, i) => (
            <tr className="gv-row" key={row.id || i}>
              {columns.map((c) => <td key={c.key} className="gv-td">{c.render ? c.render(row) : row[c.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PageHeader({ title, subtitle, actionLabel, onAction }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 22, flexWrap: "wrap", gap: 12 }}>
      <div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 600, margin: 0 }}>{title}</h1>
        {subtitle && <p style={{ color: "var(--ink-600)", fontSize: 14, margin: "4px 0 0" }}>{subtitle}</p>}
      </div>
      {actionLabel && (
        <button className="gv-btn-primary" onClick={onAction}><Plus size={16} />{actionLabel}</button>
      )}
    </div>
  );
}

/* Generic add-record modal driven by a field schema.
   Optional `insight(values)` renders live computed feedback (e.g. inbreeding risk).
   Optional `aiAssist` = { label, buildPrompt(values) } wires a Claude-powered helper. */
function Modal({ title, fields, onClose, onSubmit, insight, aiAssist }) {
  const [values, setValues] = useState(() => {
    const init = {};
    fields.forEach((f) => { init[f.key] = f.default ?? (f.type === "select" ? f.options?.[0]?.value ?? "" : ""); });
    return init;
  });
  const set = (k, v) => setValues((s) => ({ ...s, [k]: v }));
  const [aiLoading, setAiLoading] = useState(false);
  const [aiText, setAiText] = useState("");

  const runAI = async () => {
    setAiLoading(true);
    setAiText("");
    const res = await askAI(aiAssist.buildPrompt(values));
    setAiText(res);
    setAiLoading(false);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(24,42,32,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: 16 }} onClick={onClose}>
      <div className="gv-card" style={{ width: 460, maxWidth: "100%", maxHeight: "88vh", overflowY: "auto", padding: 24 }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 600, margin: 0 }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink-400)" }}><X size={20} /></button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {fields.map((f) => (
            <div key={f.key}>
              <label className="gv-label">{f.label}</label>
              {f.type === "select" ? (
                <select className="gv-select" value={values[f.key]} onChange={(e) => set(f.key, e.target.value)}>
                  {f.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              ) : (
                <input
                  className="gv-input"
                  type={f.type || "text"}
                  value={values[f.key]}
                  placeholder={f.placeholder}
                  onChange={(e) => set(f.key, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>

        {insight && <div style={{ marginTop: 16 }}>{insight(values)}</div>}

        {aiAssist && (
          <div className="gv-card" style={{ marginTop: 14, padding: 14, background: "var(--straw-100)", border: "1px solid var(--straw-300)" }}>
            <button className="gv-btn-ghost" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#fff" }} onClick={runAI} disabled={aiLoading}>
              <Sparkles size={15} /> {aiLoading ? "Analyse en cours…" : aiAssist.label}
            </button>
            {aiText && <p style={{ fontSize: 13.5, marginTop: 10, lineHeight: 1.55, color: "var(--ink-900)" }}>{aiText}</p>}
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 22 }}>
          <button className="gv-btn-ghost" onClick={onClose}>Annuler</button>
          <button className="gv-btn-primary" onClick={() => { onSubmit(values); onClose(); }}>Enregistrer</button>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   NAV CONFIG
----------------------------------------------------------------*/
const NAV = [
  { section: "Élevage", items: [
    { key: "dashboard", label: "Tableau de bord", icon: LayoutDashboard },
    { key: "cheptel", label: "Cheptel", icon: Rabbit },
    { key: "reproduction", label: "Reproduction", icon: Heart },
    { key: "races", label: "Races", icon: Dna },
    { key: "clapiers", label: "Clapiers", icon: Warehouse },
    { key: "assistant", label: "Assistant IA", icon: Sparkles },
  ]},
  { section: "Soin & alimentation", items: [
    { key: "alimentation", label: "Alimentation", icon: Wheat },
    { key: "sante", label: "Santé", icon: Stethoscope },
  ]},
  { section: "Finance & ventes", items: [
    { key: "comptabilite", label: "Comptabilité", icon: Wallet },
    { key: "ventes", label: "Ventes", icon: ShoppingCart },
    { key: "clients", label: "Clients", icon: Users },
  ]},
];

const PAGE_META = {
  dashboard: { title: "Tableau de bord", subtitle: "Vue d'ensemble de la garenne" },
  cheptel: { title: "Cheptel", subtitle: "Registre de tous les lapins de l'élevage" },
  reproduction: { title: "Reproduction", subtitle: "Accouplement, diagnostic de gestation et mise bas" },
  races: { title: "Races", subtitle: "Référentiel des races élevées" },
  clapiers: { title: "Clapiers", subtitle: "Occupation des cages et zones d'élevage" },
  assistant: { title: "Assistant IA", subtitle: "Prédictions de portée et prévention de la consanguinité" },
  alimentation: { title: "Alimentation", subtitle: "Stocks et consommation quotidienne" },
  sante: { title: "Santé", subtitle: "Vaccinations, traitements et rappels" },
  comptabilite: { title: "Comptabilité", subtitle: "Recettes et dépenses de l'élevage" },
  ventes: { title: "Ventes", subtitle: "Historique des ventes de lapins" },
  clients: { title: "Clients", subtitle: "Acheteurs et historique d'achats" },
};

/* Row with an on-demand AI prediction for one pregnant female */
function PredictionRow({ saillie, rabbits }) {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const f = findRabbit(saillie.femelle, rabbits);

  const run = async () => {
    setLoading(true);
    setText("");
    const prompt = `Tu es un conseiller en élevage cunicole. La femelle ${saillie.femelle} (race ${f?.race || "inconnue"}) a été saillie le ${fmtDate(saillie.date)} et est diagnostiquée gestante. En français et en 2 phrases maximum, donne une estimation réaliste de la taille de portée attendue (nombre de lapereaux) et un conseil de préparation pour la mise bas.`;
    const res = await askAI(prompt);
    setText(res);
    setLoading(false);
  };

  return (
    <div style={{ borderTop: "1px solid var(--line)", padding: "12px 0", display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
      <div style={{ flex: 1, minWidth: 220 }}>
        <p style={{ fontWeight: 600, fontSize: 14, margin: 0 }}>
          {saillie.femelle} <span style={{ color: "var(--ink-400)", fontWeight: 400 }}>— saillie le {fmtDate(saillie.date)}, mise bas attendue vers le {fmtDate(addDays(saillie.date, 31))}</span>
        </p>
        {text && <p style={{ fontSize: 13.5, marginTop: 8, color: "var(--ink-900)", lineHeight: 1.55 }}>{text}</p>}
      </div>
      <button className="gv-btn-ghost" onClick={run} disabled={loading} style={{ whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: 6 }}>
        <Sparkles size={14} /> {loading ? "Analyse…" : "Prédire avec l'IA"}
      </button>
    </div>
  );
}

/* ---------------------------------------------------------------
   MAIN APP
----------------------------------------------------------------*/
export default function GarenneApp() {
  const [page, setPage] = useState("dashboard");
  const [reproTab, setReproTab] = useState("saillies");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [modal, setModal] = useState(null); // {title, fields, onSubmit}
  const [query, setQuery] = useState("");

  const [rabbits, setRabbits] = useState(RABBITS_INIT);
  const [saillies, setSaillies] = useState(SAILLIES_INIT);
  const [maternite, setMaternite] = useState(MATERNITE_INIT);
  const [clapiers, setClapiers] = useState(CLAPIERS);
  const [races, setRaces] = useState(RACES);
  const [alimentation, setAlimentation] = useState(ALIMENTATION_INIT);
  const [sante, setSante] = useState(SANTE_INIT);
  const [transactions, setTransactions] = useState(TRANSACTIONS_INIT);
  const [ventes, setVentes] = useState(VENTES_INIT);
  const [clients, setClients] = useState(CLIENTS_INIT);
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [aiAsking, setAiAsking] = useState(false);

  const femelles = rabbits.filter((r) => r.sexe === "F");
  const males = rabbits.filter((r) => r.sexe === "M");

  const revenus = transactions.filter(t => t.montant > 0).reduce((s, t) => s + t.montant, 0);
  const depenses = transactions.filter(t => t.montant < 0).reduce((s, t) => s + t.montant, 0);
  const solde = revenus + depenses;

  const raceRepartition = useMemo(() => {
    const map = {};
    rabbits.forEach((r) => { map[r.race] = (map[r.race] || 0) + 1; });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [rabbits]);

  const gestantes = saillies.filter((s) => s.diagnostic === "Positif").length;

  const openModal = (cfg) => setModal(cfg);
  const closeModal = () => setModal(null);
  const uid = (p) => `${p}${Date.now()}`;

  /* ---- modal openers per entity ---- */
  const addRabbit = () => openModal({
    title: "Ajouter un lapin",
    fields: [
      { key: "nom", label: "Nom" },
      { key: "sexe", label: "Sexe", type: "select", options: [{ value: "F", label: "Femelle" }, { value: "M", label: "Mâle" }] },
      { key: "race", label: "Race", type: "select", options: races.map((r) => ({ value: r.nom, label: r.nom })) },
      { key: "naissance", label: "Date de naissance", type: "date", default: "2026-07-29" },
      { key: "clapier", label: "Clapier", type: "select", options: clapiers.map((c) => ({ value: c.numero, label: c.numero })) },
      { key: "statut", label: "Statut", type: "select", options: [{ value: "Reproducteur", label: "Reproducteur" }, { value: "Reproductrice", label: "Reproductrice" }, { value: "Engraissement", label: "Engraissement" }] },
      { key: "poids", label: "Poids (kg)", type: "number" },
      { key: "pere", label: "Père (facultatif — pour le suivi généalogique)", type: "select", options: [{ value: "", label: "Inconnu / fondateur" }, ...males.map((m) => ({ value: m.nom, label: m.nom }))] },
      { key: "mere", label: "Mère (facultative — pour le suivi généalogique)", type: "select", options: [{ value: "", label: "Inconnue / fondatrice" }, ...femelles.map((f) => ({ value: f.nom, label: f.nom }))] },
    ],
    onSubmit: (v) => setRabbits((s) => [...s, { id: uid("l"), tag: `LP-${String(s.length + 1).padStart(3, "0")}`, ...v, poids: parseFloat(v.poids) || 0, pere: v.pere || null, mere: v.mere || null }]),
  });

  const addSaillie = () => openModal({
    title: "Nouvelle saillie",
    fields: [
      { key: "femelle", label: "Femelle", type: "select", options: femelles.map((f) => ({ value: f.nom, label: f.nom })) },
      { key: "male", label: "Mâle", type: "select", options: males.map((m) => ({ value: m.nom, label: m.nom })) },
      { key: "date", label: "Date de saillie", type: "date", default: "2026-07-29" },
    ],
    insight: (v) => {
      const rel = relatedness(v.femelle, v.male, rabbits);
      return (
        <div>
          <label className="gv-label">Analyse généalogique automatique</label>
          {relatednessBadge(rel)}
          {rel.level === "high" && (
            <p style={{ fontSize: 12.5, color: "#8C3A22", marginTop: 6 }}>
              Accouplement fortement déconseillé : risque élevé de consanguinité. Choisissez un autre mâle si possible.
            </p>
          )}
          {rel.level === "medium" && (
            <p style={{ fontSize: 12.5, color: "#8A5F17", marginTop: 6 }}>
              Un lien de parenté existe. Un accouplement occasionnel reste envisageable mais évitez de le répéter sur plusieurs générations.
            </p>
          )}
        </div>
      );
    },
    aiAssist: {
      label: "Demander l'avis de l'IA sur ce couple",
      buildPrompt: (v) => {
        const rel = relatedness(v.femelle, v.male, rabbits);
        const f = findRabbit(v.femelle, rabbits);
        const m = findRabbit(v.male, rabbits);
        return `Tu es un conseiller en élevage cunicole. Projet d'accouplement :
Femelle : ${v.femelle}, race ${f?.race || "inconnue"}, née le ${f?.naissance || "?"}, parents connus : ${f?.pere || "inconnu"} x ${f?.mere || "inconnue"}.
Mâle : ${v.male}, race ${m?.race || "inconnue"}, né le ${m?.naissance || "?"}, parents connus : ${m?.pere || "inconnu"} x ${m?.mere || "inconnue"}.
Résultat de l'analyse généalogique automatique : ${rel.label}.
En 3 phrases maximum, en français, donne un avis concis à l'éleveur : opportunité génétique ou risque de consanguinité, et une recommandation pratique (poursuivre l'accouplement ou choisir un autre reproducteur).`;
      },
    },
    onSubmit: (v) => setSaillies((s) => [...s, { id: uid("s"), ...v, diagnostic: "En attente" }]),
  });

  const addMiseBas = () => openModal({
    title: "Enregistrer une mise bas",
    fields: [
      { key: "femelle", label: "Femelle", type: "select", options: femelles.map((f) => ({ value: f.nom, label: f.nom })) },
      { key: "dateMiseBas", label: "Date de mise bas", type: "date", default: "2026-07-29" },
      { key: "nesVivants", label: "Nés vivants", type: "number" },
      { key: "nesMorts", label: "Nés morts", type: "number" },
      { key: "sevrage", label: "Date de sevrage prévue", type: "date" },
    ],
    onSubmit: (v) => setMaternite((s) => [...s, { id: uid("m"), ...v, nesVivants: parseInt(v.nesVivants) || 0, nesMorts: parseInt(v.nesMorts) || 0 }]),
  });

  const addRace = () => openModal({
    title: "Ajouter une race",
    fields: [
      { key: "nom", label: "Nom de la race" },
      { key: "origine", label: "Origine" },
      { key: "poidsAdulte", label: "Poids adulte", placeholder: "ex. 4 – 5 kg" },
      { key: "aptitude", label: "Aptitude" },
      { key: "note", label: "Note" },
    ],
    onSubmit: (v) => setRaces((s) => [...s, { id: uid("r"), ...v }]),
  });

  const addClapier = () => openModal({
    title: "Ajouter un clapier",
    fields: [
      { key: "zone", label: "Zone" },
      { key: "numero", label: "Numéro" },
      { key: "capacite", label: "Capacité", type: "number", default: "1" },
      { key: "occupant", label: "Occupant (optionnel)" },
      { key: "statut", label: "Statut", type: "select", options: [{ value: "Libre", label: "Libre" }, { value: "Occupé", label: "Occupé" }, { value: "Nettoyage", label: "Nettoyage" }] },
    ],
    onSubmit: (v) => setClapiers((s) => [...s, { id: uid("c"), ...v, capacite: parseInt(v.capacite) || 1, occupant: v.occupant || null }]),
  });

  const addAliment = () => openModal({
    title: "Ajouter un aliment au stock",
    fields: [
      { key: "aliment", label: "Nom de l'aliment" },
      { key: "stock", label: "Stock actuel (kg)", type: "number" },
      { key: "seuil", label: "Seuil d'alerte (kg)", type: "number" },
      { key: "conso", label: "Consommation", placeholder: "ex. 5 kg / jour" },
    ],
    onSubmit: (v) => setAlimentation((s) => [...s, { id: uid("f"), ...v, stock: parseFloat(v.stock) || 0, seuil: parseFloat(v.seuil) || 0, unite: "kg" }]),
  });

  const addSante = () => openModal({
    title: "Ajouter un suivi santé",
    fields: [
      { key: "lapin", label: "Lapin", type: "select", options: rabbits.map((r) => ({ value: r.nom, label: r.nom })) },
      { key: "type", label: "Type", type: "select", options: [{ value: "Vaccination", label: "Vaccination" }, { value: "Traitement", label: "Traitement" }, { value: "Contrôle", label: "Contrôle" }] },
      { key: "produit", label: "Produit / acte" },
      { key: "date", label: "Date", type: "date", default: "2026-07-29" },
      { key: "rappel", label: "Date de rappel", type: "date" },
    ],
    onSubmit: (v) => setSante((s) => [...s, { id: uid("h"), ...v }]),
  });

  const addTransaction = () => openModal({
    title: "Ajouter une écriture",
    fields: [
      { key: "date", label: "Date", type: "date", default: "2026-07-29" },
      { key: "type", label: "Type", type: "select", options: [{ value: "Recette", label: "Recette" }, { value: "Dépense", label: "Dépense" }] },
      { key: "categorie", label: "Catégorie" },
      { key: "montant", label: "Montant (FCFA)", type: "number" },
      { key: "description", label: "Description" },
    ],
    onSubmit: (v) => {
      const amt = Math.abs(parseFloat(v.montant) || 0);
      setTransactions((s) => [...s, { id: uid("t"), ...v, montant: v.type === "Dépense" ? -amt : amt }]);
    },
  });

  const addVente = () => openModal({
    title: "Enregistrer une vente",
    fields: [
      { key: "date", label: "Date", type: "date", default: "2026-07-29" },
      { key: "client", label: "Client", type: "select", options: clients.map((c) => ({ value: c.nom, label: c.nom })) },
      { key: "lapins", label: "Description", placeholder: "ex. 2 lapins engraissés" },
      { key: "quantite", label: "Quantité", type: "number", default: "1" },
      { key: "prixUnitaire", label: "Prix unitaire (FCFA)", type: "number" },
    ],
    onSubmit: (v) => {
      const qte = parseInt(v.quantite) || 1;
      const pu = parseFloat(v.prixUnitaire) || 0;
      setVentes((s) => [...s, { id: uid("v"), ...v, quantite: qte, prixUnitaire: pu, total: qte * pu }]);
    },
  });

  const addClient = () => openModal({
    title: "Ajouter un client",
    fields: [
      { key: "nom", label: "Nom" },
      { key: "contact", label: "Contact" },
      { key: "ville", label: "Ville" },
    ],
    onSubmit: (v) => setClients((s) => [...s, { id: uid("cl"), ...v, totalAchats: 0, dernierAchat: "—" }]),
  });

  const handleAskQuestion = async () => {
    if (!aiQuestion.trim()) return;
    setAiAsking(true);
    setAiAnswer("");
    const herdSummary = rabbits
      .map((r) => `${r.nom} (${r.sexe === "F" ? "femelle" : "mâle"}, ${r.race}, parents connus: ${r.pere || "inconnu"} x ${r.mere || "inconnue"})`)
      .join("; ");
    const prompt = `Tu es un assistant d'élevage cunicole pour un petit élevage familial. Voici le cheptel actuel : ${herdSummary}.
Question de l'éleveur : "${aiQuestion}"
Réponds en français, de façon concise (5 phrases maximum), en tenant compte des risques de consanguinité si la question s'y prête.`;
    const res = await askAI(prompt);
    setAiAnswer(res);
    setAiAsking(false);
  };

  /* ---------------------------------------------------------------
     PAGE RENDERERS
  ----------------------------------------------------------------*/
  function renderDashboard() {
    const alertesStock = alimentation.filter((a) => a.stock <= a.seuil);
    const rappelsSante = [...sante].sort((a, b) => a.rappel.localeCompare(b.rappel)).slice(0, 4);
    return (
      <>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 20 }}>
          <StatCard icon={Rabbit} label="Effectif total" value={rabbits.length} delta="+2 ce mois" deltaType="up" />
          <StatCard icon={Heart} label="Femelles gestantes" value={gestantes} />
          <StatCard icon={Baby} label="Naissances (30j)" value={maternite.reduce((s, m) => s + m.nesVivants, 0)} delta="+14 vs mois dernier" deltaType="up" />
          <StatCard icon={Wallet} label="Solde du mois" value={fmtFCFA(solde)} delta={solde >= 0 ? "Excédentaire" : "Déficitaire"} deltaType={solde >= 0 ? "up" : "down"} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16, marginBottom: 20 }}>
          <div className="gv-card" style={{ padding: 20 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600, margin: "0 0 14px" }}>Naissances par mois</h3>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={NAISSANCES_MOIS}>
                  <CartesianGrid vertical={false} stroke="#EFEBDD" />
                  <XAxis dataKey="mois" tick={{ fontSize: 12, fill: "#8B9285" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "#8B9285" }} axisLine={false} tickLine={false} width={26} />
                  <Tooltip cursor={{ fill: "#F8F6F0" }} contentStyle={{ fontSize: 13, borderRadius: 8, border: "1px solid #E5E1D4" }} />
                  <Bar dataKey="naissances" fill="#4C7A5B" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="gv-card" style={{ padding: 20 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600, margin: "0 0 14px" }}>Répartition par race</h3>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={raceRepartition} dataKey="value" nameKey="name" innerRadius={45} outerRadius={75} paddingAngle={2}>
                    {raceRepartition.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #E5E1D4" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div className="gv-card" style={{ padding: 20 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600, margin: "0 0 14px", display: "flex", alignItems: "center", gap: 8 }}>
              <TriangleAlert size={16} color="#B5563A" /> Alertes stock
            </h3>
            {alertesStock.length === 0 ? (
              <p style={{ fontSize: 13.5, color: "var(--ink-600)" }}>Aucun stock sous le seuil d'alerte.</p>
            ) : alertesStock.map((a) => (
              <div key={a.id} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid var(--line)", fontSize: 13.5 }}>
                <span>{a.aliment}</span>
                <Badge variant="danger">{a.stock} {a.unite} restants</Badge>
              </div>
            ))}
          </div>
          <div className="gv-card" style={{ padding: 20 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600, margin: "0 0 14px", display: "flex", alignItems: "center", gap: 8 }}>
              <Clock size={16} color="#3E6E8E" /> Prochains rappels santé
            </h3>
            {rappelsSante.map((h) => (
              <div key={h.id} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid var(--line)", fontSize: 13.5 }}>
                <span>{h.lapin} — {h.produit}</span>
                <span style={{ color: "var(--ink-400)", fontFamily: "var(--font-mono)", fontSize: 12.5 }}>{fmtDate(h.rappel)}</span>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  function renderCheptel() {
    const filtered = rabbits.filter((r) => r.nom.toLowerCase().includes(query.toLowerCase()) || r.race.toLowerCase().includes(query.toLowerCase()));
    return (
      <>
        <PageHeader {...PAGE_META.cheptel} actionLabel="Ajouter un lapin" onAction={addRabbit} />
        <Table
          columns={[
            { key: "tag", label: "Identifiant", render: (r) => <span className="gv-earTag">{r.tag}</span> },
            { key: "nom", label: "Nom", render: (r) => <strong>{r.nom}</strong> },
            { key: "sexe", label: "Sexe", render: (r) => r.sexe === "F" ? "Femelle" : "Mâle" },
            { key: "race", label: "Race" },
            { key: "naissance", label: "Naissance", render: (r) => fmtDate(r.naissance) },
            { key: "clapier", label: "Clapier" },
            { key: "poids", label: "Poids", render: (r) => `${r.poids} kg` },
            { key: "statut", label: "Statut", render: (r) => <Badge variant={r.statut.includes("Engraissement") ? "warning" : "success"}>{r.statut}</Badge> },
          ]}
          rows={filtered}
        />
      </>
    );
  }

  function renderReproduction() {
    return (
      <>
        <PageHeader
          {...PAGE_META.reproduction}
          actionLabel={reproTab === "saillies" ? "Nouvelle saillie" : "Enregistrer une mise bas"}
          onAction={reproTab === "saillies" ? addSaillie : addMiseBas}
        />
        <div style={{ display: "flex", borderBottom: "1px solid var(--line)", marginBottom: 18 }}>
          <div className={`gv-tab ${reproTab === "saillies" ? "active" : ""}`} onClick={() => setReproTab("saillies")}>Saillies</div>
          <div className={`gv-tab ${reproTab === "maternite" ? "active" : ""}`} onClick={() => setReproTab("maternite")}>Maternité</div>
        </div>
        {reproTab === "saillies" ? (
          <Table
            columns={[
              { key: "femelle", label: "Femelle", render: (r) => <strong>{r.femelle}</strong> },
              { key: "male", label: "Mâle" },
              { key: "date", label: "Date saillie", render: (r) => fmtDate(r.date) },
              { key: "diagnostic", label: "Diagnostic", render: (r) => (
                <Badge variant={r.diagnostic === "Positif" ? "success" : r.diagnostic === "Négatif" ? "danger" : "warning"}>{r.diagnostic}</Badge>
              )},
              { key: "risque", label: "Risque généalogique", render: (r) => relatednessBadge(relatedness(r.femelle, r.male, rabbits)) },
              { key: "suivi", label: "Suivi", render: (r) => {
                if (r.diagnostic === "En attente") return `Diagnostic possible à partir du ${fmtDate(addDays(r.date, 10))}`;
                if (r.diagnostic === "Positif") return `Mise bas attendue vers le ${fmtDate(addDays(r.date, 31))}`;
                return "—";
              }},
            ]}
            rows={saillies}
          />
        ) : (
          <Table
            columns={[
              { key: "femelle", label: "Femelle", render: (r) => <strong>{r.femelle}</strong> },
              { key: "dateMiseBas", label: "Mise bas", render: (r) => fmtDate(r.dateMiseBas) },
              { key: "nesVivants", label: "Nés vivants", render: (r) => <Badge variant="success">{r.nesVivants}</Badge> },
              { key: "nesMorts", label: "Nés morts", render: (r) => r.nesMorts > 0 ? <Badge variant="danger">{r.nesMorts}</Badge> : "0" },
              { key: "sevrage", label: "Sevrage prévu", render: (r) => r.sevrage ? fmtDate(r.sevrage) : "—" },
            ]}
            rows={maternite}
          />
        )}
      </>
    );
  }

  function renderRaces() {
    return (
      <>
        <PageHeader {...PAGE_META.races} actionLabel="Ajouter une race" onAction={addRace} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
          {races.map((r) => (
            <div key={r.id} className="gv-card" style={{ padding: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: "var(--moss-400)", opacity: 0.25 }} />
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16.5, fontWeight: 600, margin: 0, marginLeft: -38, color: "#20261F" }}>{r.nom}</h3>
              </div>
              <p style={{ fontSize: 13, color: "var(--ink-600)", margin: "10px 0 4px" }}>Origine — {r.origine}</p>
              <p style={{ fontSize: 13, color: "var(--ink-600)", margin: "4px 0" }}>Poids adulte — {r.poidsAdulte}</p>
              <p style={{ fontSize: 13, color: "var(--ink-600)", margin: "4px 0 10px" }}>Aptitude — {r.aptitude}</p>
              <p style={{ fontSize: 13, color: "var(--ink-900)", margin: 0, paddingTop: 10, borderTop: "1px solid var(--line)" }}>{r.note}</p>
            </div>
          ))}
        </div>
      </>
    );
  }

  function renderClapiers() {
    return (
      <>
        <PageHeader {...PAGE_META.clapiers} actionLabel="Ajouter un clapier" onAction={addClapier} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 14 }}>
          {clapiers.map((c) => (
            <div key={c.id} className="gv-card" style={{ padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <span className="gv-earTag">{c.numero}</span>
                <Badge variant={c.statut === "Occupé" ? "success" : c.statut === "Libre" ? "info" : "warning"}>{c.statut}</Badge>
              </div>
              <p style={{ fontSize: 12.5, color: "var(--ink-400)", margin: "12px 0 2px", textTransform: "uppercase", letterSpacing: ".04em" }}>{c.zone}</p>
              <p style={{ fontSize: 14, margin: "2px 0 0" }}>{c.occupant || "Aucun occupant"}</p>
              <p style={{ fontSize: 12.5, color: "var(--ink-400)", margin: "8px 0 0" }}>Capacité : {c.capacite}</p>
            </div>
          ))}
        </div>
      </>
    );
  }

  function renderAlimentation() {
    return (
      <>
        <PageHeader {...PAGE_META.alimentation} actionLabel="Ajouter un aliment" onAction={addAliment} />
        <Table
          columns={[
            { key: "aliment", label: "Aliment", render: (r) => <strong>{r.aliment}</strong> },
            { key: "stock", label: "Stock", render: (r) => `${r.stock} ${r.unite}` },
            { key: "seuil", label: "Seuil d'alerte", render: (r) => `${r.seuil} ${r.unite}` },
            { key: "conso", label: "Consommation" },
            { key: "statut", label: "Statut", render: (r) => r.stock <= r.seuil ? <Badge variant="danger">Stock bas</Badge> : <Badge variant="success">Suffisant</Badge> },
          ]}
          rows={alimentation}
        />
      </>
    );
  }

  function renderSante() {
    return (
      <>
        <PageHeader {...PAGE_META.sante} actionLabel="Ajouter un suivi" onAction={addSante} />
        <Table
          columns={[
            { key: "lapin", label: "Lapin", render: (r) => <strong>{r.lapin}</strong> },
            { key: "type", label: "Type", render: (r) => <Badge variant={r.type === "Vaccination" ? "info" : r.type === "Traitement" ? "warning" : "neutral"}>{r.type}</Badge> },
            { key: "produit", label: "Produit / acte" },
            { key: "date", label: "Date", render: (r) => fmtDate(r.date) },
            { key: "rappel", label: "Prochain rappel", render: (r) => r.rappel ? fmtDate(r.rappel) : "—" },
          ]}
          rows={sante}
        />
      </>
    );
  }

  function renderComptabilite() {
    return (
      <>
        <PageHeader {...PAGE_META.comptabilite} actionLabel="Ajouter une écriture" onAction={addTransaction} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 18 }}>
          <StatCard icon={ArrowUpRight} label="Recettes" value={fmtFCFA(revenus)} />
          <StatCard icon={ArrowDownRight} label="Dépenses" value={fmtFCFA(Math.abs(depenses))} />
          <StatCard icon={Wallet} label="Solde" value={fmtFCFA(solde)} />
        </div>
        <Table
          columns={[
            { key: "date", label: "Date", render: (r) => fmtDate(r.date) },
            { key: "type", label: "Type", render: (r) => <Badge variant={r.type === "Recette" ? "success" : "danger"}>{r.type}</Badge> },
            { key: "categorie", label: "Catégorie" },
            { key: "description", label: "Description" },
            { key: "montant", label: "Montant", render: (r) => <span style={{ fontFamily: "var(--font-mono)", color: r.montant >= 0 ? "#2C5A38" : "#8C3A22", fontWeight: 600 }}>{r.montant >= 0 ? "+" : ""}{r.montant.toLocaleString("fr-FR")} FCFA</span> },
          ]}
          rows={transactions}
        />
      </>
    );
  }

  function renderVentes() {
    return (
      <>
        <PageHeader {...PAGE_META.ventes} actionLabel="Enregistrer une vente" onAction={addVente} />
        <Table
          columns={[
            { key: "date", label: "Date", render: (r) => fmtDate(r.date) },
            { key: "client", label: "Client", render: (r) => <strong>{r.client}</strong> },
            { key: "lapins", label: "Détail" },
            { key: "quantite", label: "Quantité" },
            { key: "prixUnitaire", label: "Prix unitaire", render: (r) => fmtFCFA(r.prixUnitaire) },
            { key: "total", label: "Total", render: (r) => <strong>{fmtFCFA(r.total)}</strong> },
          ]}
          rows={ventes}
        />
      </>
    );
  }

  function renderClients() {
    return (
      <>
        <PageHeader {...PAGE_META.clients} actionLabel="Ajouter un client" onAction={addClient} />
        <Table
          columns={[
            { key: "nom", label: "Nom", render: (r) => <strong>{r.nom}</strong> },
            { key: "contact", label: "Contact" },
            { key: "ville", label: "Ville" },
            { key: "totalAchats", label: "Total achats", render: (r) => fmtFCFA(r.totalAchats) },
            { key: "dernierAchat", label: "Dernier achat", render: (r) => r.dernierAchat === "—" ? "—" : fmtDate(r.dernierAchat) },
          ]}
          rows={clients}
        />
      </>
    );
  }

  function renderAssistant() {
    const gestantes = saillies.filter((s) => s.diagnostic === "Positif");
    const h3Style = { fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600, margin: "0 0 6px" };
    const pStyle = { fontSize: 13.5, color: "var(--ink-600)", margin: "0 0 14px" };
    return (
      <>
        <PageHeader {...PAGE_META.assistant} />

        <div className="gv-card" style={{ padding: 20, marginBottom: 18 }}>
          <h3 style={h3Style}>Suggestions d'accouplement</h3>
          <p style={pStyle}>Classement des mâles disponibles pour chaque femelle reproductrice, du plus sûr au plus risqué, calculé automatiquement à partir de la généalogie enregistrée.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {femelles.filter((f) => f.statut.includes("Reproductrice")).map((f) => {
              const ranked = males
                .map((m) => ({ m, rel: relatedness(f.nom, m.nom, rabbits) }))
                .sort((a, b) => relatednessOrder(a.rel.level) - relatednessOrder(b.rel.level));
              return (
                <div key={f.id} style={{ borderTop: "1px solid var(--line)", paddingTop: 12 }}>
                  <p style={{ fontWeight: 600, fontSize: 14, margin: "0 0 8px" }}>{f.nom} <span style={{ color: "var(--ink-400)", fontWeight: 400 }}>({f.race})</span></p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {ranked.map(({ m, rel }) => (
                      <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 7, border: "1px solid var(--line)", borderRadius: 9, padding: "6px 10px" }}>
                        <span style={{ fontSize: 13, fontWeight: 500 }}>{m.nom}</span>
                        {relatednessBadge(rel)}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="gv-card" style={{ padding: 20, marginBottom: 18 }}>
          <h3 style={h3Style}>Prédictions de portée</h3>
          <p style={pStyle}>Pour chaque femelle diagnostiquée gestante, générez une estimation IA de la taille de portée et un conseil de préparation.</p>
          {gestantes.length === 0 && <p style={{ fontSize: 13.5, color: "var(--ink-400)" }}>Aucune femelle gestante actuellement.</p>}
          {gestantes.map((s) => <PredictionRow key={s.id} saillie={s} rabbits={rabbits} />)}
        </div>

        <div className="gv-card" style={{ padding: 20 }}>
          <h3 style={h3Style}>Poser une question à l'assistant</h3>
          <p style={pStyle}>Ex. « Quel mâle conseiller pour Noisette ? » ou « Y a-t-il un risque de consanguinité dans mon cheptel actuel ? »</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <input
              className="gv-input"
              style={{ flex: 1, minWidth: 220 }}
              placeholder="Écrivez votre question…"
              value={aiQuestion}
              onChange={(e) => setAiQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAskQuestion()}
            />
            <button className="gv-btn-primary" onClick={handleAskQuestion} disabled={aiAsking || !aiQuestion.trim()}>
              <Sparkles size={15} /> {aiAsking ? "Réflexion…" : "Demander"}
            </button>
          </div>
          {aiAnswer && (
            <p style={{ fontSize: 13.5, marginTop: 14, lineHeight: 1.6, background: "var(--straw-100)", padding: 12, borderRadius: 9, color: "var(--ink-900)" }}>{aiAnswer}</p>
          )}
        </div>
      </>
    );
  }

  const renderers = {
    dashboard: renderDashboard, cheptel: renderCheptel, reproduction: renderReproduction,
    races: renderRaces, clapiers: renderClapiers, alimentation: renderAlimentation,
    sante: renderSante, comptabilite: renderComptabilite, ventes: renderVentes, clients: renderClients,
    assistant: renderAssistant,
  };

  return (
    <div className="gv-app" style={{ minHeight: "100vh", display: "flex" }}>
      <style>{CSS}</style>

      {/* Sidebar */}
      <aside style={{
        width: 240, background: "var(--burrow-950)", flexShrink: 0, padding: "20px 14px",
        position: mobileNavOpen ? "fixed" : "static", inset: mobileNavOpen ? 0 : "auto", zIndex: 40,
        display: mobileNavOpen ? "block" : undefined,
      }} className="gv-scroll">
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 10px 20px" }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: "var(--straw-500)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Rabbit size={18} color="var(--burrow-950)" />
          </div>
          <div>
            <p style={{ color: "#F8F6F0", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15.5, margin: 0 }}>La Garenne</p>
            <p style={{ color: "#7FA089", fontSize: 11.5, margin: 0 }}>Gestion d'élevage cunicole</p>
          </div>
        </div>
        {NAV.map((sec) => (
          <div key={sec.section}>
            <div className="gv-navsection">{sec.section}</div>
            {sec.items.map((item) => (
              <div key={item.key} className={`gv-navitem ${page === item.key ? "active" : ""}`} onClick={() => { setPage(item.key); setMobileNavOpen(false); }}>
                <item.icon size={16} />
                {item.label}
              </div>
            ))}
          </div>
        ))}
      </aside>

      {/* Main */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Topbar */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 26px", borderBottom: "1px solid var(--line)", background: "#FFFFFFAA" }}>
          <button className="gv-btn-ghost" style={{ display: "none", padding: 8 }} onClick={() => setMobileNavOpen((s) => !s)}><Menu size={18} /></button>
          <div style={{ position: "relative", flex: 1, maxWidth: 380 }}>
            <Search size={16} color="var(--ink-400)" style={{ position: "absolute", left: 12, top: 11 }} />
            <input className="gv-input" style={{ paddingLeft: 34 }} placeholder="Rechercher un lapin…" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <div style={{ flex: 1 }} />
          <button className="gv-btn-ghost" style={{ padding: 9, position: "relative" }}>
            <Bell size={17} />
            <span style={{ position: "absolute", top: 6, right: 7, width: 6, height: 6, borderRadius: "50%", background: "var(--clay-600)" }} />
          </button>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--moss-600)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 13 }}>A</div>
        </div>

        <main style={{ padding: "24px 26px 60px", maxWidth: 1180 }}>
          {renderers[page]()}
        </main>
      </div>

      {modal && <Modal title={modal.title} fields={modal.fields} onClose={closeModal} onSubmit={modal.onSubmit} />}
    </div>
  );
}

function addDays(iso, days) {
  const d = new Date(iso);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}
