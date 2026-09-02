import { Card, Line, SceneFrame } from "@/components/illustrations/SceneFrame";

/* Palette shorthands, matching the design tokens. */
const V900 = "#2e0d44";
const V700 = "#562775";
const V500 = "#8a4db2";
const V200 = "#dac9e6";
const G600 = "#997033";
const G400 = "#c99a54";
const G200 = "#e9cea7";
const OK = "#126544";
const LINE = "#e7e2ee";

/* -------------------------------------------------------------------------
   Financial Accounting — a statement pack: layered documents and a trend
   ------------------------------------------------------------------------- */
export function AccountingScene() {
  return (
    <SceneFrame>
      {/* Back sheets, fanned */}
      <g transform="rotate(-8 150 150)">
        <Card x={92} y={62} w={150} h={182} />
      </g>
      <g transform="rotate(-3.5 150 150)">
        <Card x={104} y={56} w={150} h={182} />
      </g>
      {/* Front statement */}
      <Card x={118} y={48} w={158} h={190} />
      <Line x={138} y={70} w={62} h={9} fill={V900} />
      <Line x={138} y={90} w={102} />
      <Line x={138} y={104} w={84} />
      {/* Figure rows */}
      {[130, 150, 170].map((y, i) => (
        <g key={y}>
          <Line x={138} y={y} w={54} fill="#efeaf5" />
          <Line x={210} y={y} w={46} fill={i === 2 ? V200 : "#efeaf5"} />
        </g>
      ))}
      {/* Total rule + emphasis */}
      <rect x={138} y={190} width={118} height={1.5} fill={LINE} />
      <Line x={138} y={200} w={48} h={9} fill={V900} />
      <Line x={214} y={200} w={42} h={9} fill={G600} />
      {/* Trend chip, overlapping the pack */}
      <g transform="translate(246 148)">
        <Card x={0} y={0} w={116} h={78} r={10} />
        <polyline
          points="16,58 40,48 60,52 82,32 100,20"
          fill="none"
          stroke={G400}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="100" cy="20" r="4.5" fill="#fff" stroke={G600} strokeWidth="3" />
        <Line x={16} y={14} w={40} h={6} />
      </g>
    </SceneFrame>
  );
}

/* -------------------------------------------------------------------------
   Bookkeeping — a reconciliation checklist, every account ticked
   ------------------------------------------------------------------------- */
export function BookkeepingScene() {
  return (
    <SceneFrame>
      <Card x={96} y={54} w={208} h={176} />
      {/* Panel header */}
      <Line x={118} y={76} w={72} h={9} fill={V900} />
      <rect x={252} y={72} width={34} height={16} rx={8} fill="#e6f2ec" />
      <path
        d="M262 80l4 4 8-8"
        fill="none"
        stroke={OK}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x={118} y={98} width={168} height={1.5} fill={LINE} />
      {/* Ticked rows */}
      {[112, 142, 172].map((y) => (
        <g key={y}>
          <circle cx={126} cy={y + 10} r={9} fill="#e6f2ec" />
          <path
            d={`M121.5 ${y + 10} l3.5 3.5 6-7`}
            fill="none"
            stroke={OK}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Line x={146} y={y + 4} w={78} />
          <Line x={146} y={y + 16} w={52} h={5} fill="#efeaf5" />
          <Line x={248} y={y + 8} w={38} h={8} fill={V200} />
        </g>
      ))}
      {/* Closed badge */}
      <g transform="translate(232 206)">
        <rect x={0} y={0} width={104} height={38} rx={19} fill={V900} />
        <circle cx={22} cy={19} r={8} fill={G400} />
        <path
          d="M18.5 19l2.6 2.6L26 16.8"
          fill="none"
          stroke={V900}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Line x={38} y={15} w={50} h={8} fill="#ffffff" />
      </g>
    </SceneFrame>
  );
}

/* -------------------------------------------------------------------------
   Tax Services — a filing calendar with a form behind it
   ------------------------------------------------------------------------- */
export function TaxScene() {
  return (
    <SceneFrame>
      {/* Form behind */}
      <g transform="rotate(6 250 140)">
        <Card x={196} y={46} w={132} h={168} />
        <Line x={214} y={68} w={54} h={8} fill={V200} />
        <Line x={214} y={86} w={84} />
        <Line x={214} y={100} w={70} />
        <Line x={214} y={122} w={90} h={6} fill="#efeaf5" />
        <Line x={214} y={136} w={90} h={6} fill="#efeaf5" />
        <Line x={214} y={150} w={62} h={6} fill="#efeaf5" />
      </g>
      {/* Calendar */}
      <Card x={78} y={70} w={188} h={166} />
      <path d="M78 82a12 12 0 0 1 12-12h164a12 12 0 0 1 12 12v22H78z" fill={V900} />
      <rect x={106} y={60} width={9} height={24} rx={4.5} fill={V700} />
      <rect x={229} y={60} width={9} height={24} rx={4.5} fill={V700} />
      <Line x={98} y={84} w={44} h={7} fill="#ffffff" />
      {/* Day grid */}
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2, 3, 4].map((col) => {
          const x = 98 + col * 32;
          const y = 122 + row * 28;
          const filed = (row === 0 && col === 1) || (row === 1 && col === 3);
          const due = row === 3 && col === 2;
          return (
            <g key={`${row}-${col}`}>
              <rect
                x={x}
                y={y}
                width={20}
                height={20}
                rx={6}
                fill={filed ? "#e6f2ec" : due ? G200 : "#f4f1f7"}
              />
              {filed ? (
                <path
                  d={`M${x + 5.5} ${y + 10.5} l3 3 6-6.5`}
                  fill="none"
                  stroke={OK}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : null}
              {due ? <circle cx={x + 10} cy={y + 10} r={4} fill={G600} /> : null}
            </g>
          );
        }),
      )}
    </SceneFrame>
  );
}

/* -------------------------------------------------------------------------
   Audit & Assurance — evidence under examination, with an opinion seal
   ------------------------------------------------------------------------- */
export function AuditScene() {
  return (
    <SceneFrame>
      <Card x={92} y={50} w={186} h={186} />
      <Line x={114} y={72} w={66} h={9} fill={V900} />
      <rect x={114} y={94} width={142} height={1.5} fill={LINE} />
      {[106, 130, 154, 178].map((y, i) => (
        <g key={y}>
          <Line x={114} y={y + 4} w={i === 1 ? 96 : 118} />
          <Line x={114} y={y + 16} w={i === 1 ? 62 : 80} h={5} fill="#efeaf5" />
        </g>
      ))}
      {/* Highlighted evidence row */}
      <rect x={106} y={126} width={158} height={30} rx={8} fill="#f8f3fb" stroke={V200} strokeWidth="1.5" />
      {/* Magnifier */}
      <g transform="translate(196 118)">
        <circle cx={46} cy={46} r={40} fill="#ffffff" fillOpacity="0.55" stroke={V700} strokeWidth="6" />
        <path d="M75 75l26 26" stroke={V700} strokeWidth="10" strokeLinecap="round" />
        <path d="M32 46l10 10 20-22" fill="none" stroke={G600} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* Opinion seal */}
      <g transform="translate(66 176)">
        <circle cx={30} cy={30} r={28} fill={V900} />
        <circle cx={30} cy={30} r={21} fill="none" stroke={G400} strokeWidth="2" />
        <path d="M22 30l6 6 12-13" fill="none" stroke={G400} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </SceneFrame>
  );
}

/* -------------------------------------------------------------------------
   Consulting — options weighed, one route chosen
   ------------------------------------------------------------------------- */
export function ConsultingScene() {
  return (
    <SceneFrame>
      {/* Considered routes, fading behind the recommended one */}
      <path
        d="M120 144c46 0 40-62 96-62"
        fill="none"
        stroke="#c9b8d9"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray="1 9"
      />
      <path
        d="M120 144c46 0 40 62 96 62"
        fill="none"
        stroke="#c9b8d9"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray="1 9"
      />
      {/* Recommended route */}
      <path d="M120 144h94" fill="none" stroke={G400} strokeWidth="5" strokeLinecap="round" />
      <path
        d="M212 136l10 8-10 8"
        fill="none"
        stroke={G400}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Starting point */}
      <circle cx={92} cy={144} r={28} fill={V900} />
      <circle cx={92} cy={144} r={12} fill={G400} />

      {/* Options considered */}
      <g opacity="0.6">
        <Card x={236} y={56} w={108} h={54} r={10} />
        <Line x={252} y={72} w={40} h={7} />
        <Line x={252} y={88} w={64} h={6} fill="#efeaf5" />
      </g>
      <g opacity="0.6">
        <Card x={236} y={178} w={108} h={54} r={10} />
        <Line x={252} y={194} w={40} h={7} />
        <Line x={252} y={210} w={64} h={6} fill="#efeaf5" />
      </g>

      {/* The recommendation */}
      <g>
        <Card x={232} y={114} w={130} h={60} r={12} />
        <rect x={232} y={114} width={5} height={60} rx={2.5} fill={G400} />
        <Line x={252} y={130} w={54} h={8} fill={V900} />
        <Line x={252} y={148} w={82} h={6} fill={V200} />
        <circle cx={342} cy={130} r={11} fill={V900} />
        <path
          d="M337 130l3.5 3.5 6.5-7"
          fill="none"
          stroke={G400}
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </SceneFrame>
  );
}

/* -------------------------------------------------------------------------
   Risk & Financial Advisory — a shield over a rated risk grid
   ------------------------------------------------------------------------- */
export function RiskScene() {
  return (
    <SceneFrame>
      <Card x={96} y={56} w={208} h={172} />
      <Line x={118} y={78} w={64} h={9} fill={V900} />
      <rect x={118} y={100} width={168} height={1.5} fill={LINE} />
      {/* Risk rows with severity chips */}
      {[
        { y: 114, c: "#f6e0de", d: "#a91d13" },
        { y: 146, c: "#f7ebdc", d: G600 },
        { y: 178, c: "#e6f2ec", d: OK },
      ].map((r) => (
        <g key={r.y}>
          <Line x={118} y={r.y + 6} w={96} />
          <Line x={118} y={r.y + 18} w={62} h={5} fill="#efeaf5" />
          <rect x={236} y={r.y + 2} width={50} height={22} rx={11} fill={r.c} />
          <circle cx={248} cy={r.y + 13} r={4} fill={r.d} />
          <Line x={258} y={r.y + 9} w={20} h={7} fill={r.d} />
        </g>
      ))}
      {/* Shield */}
      <g transform="translate(56 96)">
        <path
          d="M44 0l40 15v34c0 28-17 45-40 54-23-9-40-26-40-54V15z"
          fill={V900}
        />
        <path
          d="M44 10l30 11v27c0 21-12 34-30 41-18-7-30-20-30-41V21z"
          fill="none"
          stroke={G400}
          strokeWidth="2"
        />
        <path d="M32 52l9 9 20-22" fill="none" stroke={G400} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </SceneFrame>
  );
}

/* -------------------------------------------------------------------------
   Financial Analytics — a reporting surface: donut, bars and a trend
   ------------------------------------------------------------------------- */
export function AnalyticsScene() {
  const R = 26;
  const C = 2 * Math.PI * R;
  const segs = [
    { frac: 0.42, color: V700 },
    { frac: 0.24, color: G400 },
    { frac: 0.18, color: V500 },
    { frac: 0.16, color: V200 },
  ];
  let off = 0;
  return (
    <SceneFrame>
      <Card x={86} y={48} w={216} h={192} />
      <Line x={108} y={68} w={68} h={9} fill={V900} />
      <rect x={108} y={88} width={172} height={1.5} fill={LINE} />

      {/* Composition mix */}
      <g transform="rotate(-90 142 136)">
        <circle cx={142} cy={136} r={R} fill="none" stroke="#f4f1f7" strokeWidth={14} />
        {segs.map((s) => {
          const len = s.frac * C;
          const el = (
            <circle
              key={s.color}
              cx={142}
              cy={136}
              r={R}
              fill="none"
              stroke={s.color}
              strokeWidth={14}
              strokeDasharray={`${len} ${C - len}`}
              strokeDashoffset={-off}
            />
          );
          off += len;
          return el;
        })}
      </g>

      {/* Legend */}
      {segs.map((s, i) => (
        <g key={`legend-${i}`}>
          <circle cx={196} cy={110 + i * 20} r={5} fill={s.color} />
          <Line x={208} y={106 + i * 20} w={i % 2 ? 44 : 62} h={7} />
        </g>
      ))}

      <rect x={108} y={180} width={172} height={1.5} fill={LINE} />

      {/* Period comparison */}
      <g transform="translate(108 224)">
        {[18, 26, 21, 30, 25, 34].map((h, i) => (
          <rect
            key={i}
            x={i * 30}
            y={-h}
            width={15}
            height={h}
            rx={4}
            fill={i === 5 ? G400 : "#e4dcec"}
          />
        ))}
      </g>
    </SceneFrame>
  );
}

/* -------------------------------------------------------------------------
   Merchant Services — terminal, card and phone checkout.
   Deliberately unbranded: no card-network marks, no bank names, no digits
   beyond a masked last-four.
   ------------------------------------------------------------------------- */
export function MerchantScene() {
  return (
    <SceneFrame tone="gold">
      {/* Payment card, tilted behind */}
      <g transform="rotate(-12 236 92)">
        <rect x={186} y={54} width={140} height={88} rx={12} fill={V900} />
        <rect x={186} y={54} width={140} height={88} rx={12} fill="url(#cardsheen)" />
        <rect x={200} y={78} width={26} height={19} rx={4} fill={G400} />
        <path d="M206 78v19M213 78v19M220 78v19" stroke={V900} strokeWidth="1.2" opacity="0.5" />
        {/* Masked last four, as bars plus four dots */}
        <g fill="#ffffff" opacity="0.9">
          {[0, 1, 2].map((g) =>
            [0, 1, 2, 3].map((d) => (
              <circle key={`${g}-${d}`} cx={202 + g * 30 + d * 6} cy={116} r={2} />
            )),
          )}
          <rect x={292} y={112} width={22} height={7} rx={3.5} />
        </g>
        {/* Contactless */}
        <g fill="none" stroke={G200} strokeWidth="2" strokeLinecap="round" opacity="0.9">
          <path d="M300 66a10 10 0 0 1 0 14" />
          <path d="M306 62a16 16 0 0 1 0 22" />
        </g>
      </g>

      {/* Terminal */}
      <g transform="translate(92 72)">
        <rect x={0} y={0} width={126} height={172} rx={20} fill="#ffffff" stroke={LINE} strokeWidth="1.5" />
        {/* Screen: an approved sale */}
        <rect x={14} y={14} width={98} height={78} rx={12} fill={V900} />
        <Line x={28} y={28} w={38} h={6} fill="#8a7796" />
        <Line x={28} y={42} w={66} h={13} fill="#ffffff" />
        <g transform="translate(28 66)">
          <circle cx={7} cy={7} r={7} fill={OK} />
          <path
            d="M4 7l2.4 2.4L10.5 5"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Line x={20} y={3} w={40} h={8} fill={G400} />
        </g>
        {/* Contactless reader */}
        <g fill="none" stroke={V200} strokeWidth="2.4" strokeLinecap="round">
          <path d="M96 108a9 9 0 0 1 0 12" />
          <path d="M102 103a17 17 0 0 1 0 22" />
        </g>
        {/* Keypad */}
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => (
            <rect
              key={`${r}-${c}`}
              x={20 + c * 24}
              y={104 + r * 20}
              width={17}
              height={14}
              rx={4}
              fill="#f4f1f7"
            />
          )),
        )}
        {/* Card slot */}
        <rect x={22} y={164} width={82} height={5} rx={2.5} fill="#efeaf5" />
      </g>

      {/* Phone checkout, front right */}
      <g transform="translate(250 128)">
        <rect x={0} y={0} width={96} height={140} rx={16} fill="#ffffff" stroke={LINE} strokeWidth="1.5" />
        <rect x={34} y={9} width={28} height={5} rx={2.5} fill="#efeaf5" />
        <Line x={16} y={30} w={40} h={6} />
        <Line x={16} y={44} w={58} h={11} fill={V900} />
        <rect x={16} y={68} width={64} height={12} rx={6} fill="#f4f1f7" />
        <rect x={16} y={88} width={64} height={12} rx={6} fill="#f4f1f7" />
        <rect x={16} y={112} width={64} height={16} rx={8} fill={V900} />
        <Line x={34} y={117} w={28} h={6} fill="#ffffff" />
      </g>

      <defs>
        <linearGradient id="cardsheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
    </SceneFrame>
  );
}

/* -------------------------------------------------------------------------
   Internal Audit — a control cycle running around a tested control set
   ------------------------------------------------------------------------- */
export function InternalAuditScene() {
  const nodes = [
    { x: 200, y: 62 },
    { x: 274, y: 136 },
    { x: 200, y: 210 },
    { x: 126, y: 136 },
  ];
  return (
    <SceneFrame>
      {/* Cycle track */}
      <circle cx={200} cy={136} r={74} fill="none" stroke={V200} strokeWidth="3" strokeDasharray="1 9" strokeLinecap="round" />
      {nodes.map((n, i) => (
        <g key={`${n.x}-${n.y}`}>
          <circle cx={n.x} cy={n.y} r={16} fill={i === 0 ? V900 : "#ffffff"} stroke={i === 0 ? V900 : LINE} strokeWidth="1.5" />
          <circle cx={n.x} cy={n.y} r={6} fill={i === 0 ? G400 : V200} />
        </g>
      ))}

      {/* Tested controls, listed alongside */}
      <g transform="translate(236 176)">
        <Card x={0} y={0} w={132} h={82} r={12} />
        <Line x={16} y={16} w={54} h={7} fill={V900} />
        {[34, 52].map((y, i) => (
          <g key={y}>
            <circle cx={22} cy={y + 5} r={7} fill="#e6f2ec" />
            <path
              d={`M18.5 ${y + 5} l2.8 2.8 5-5.6`}
              fill="none"
              stroke={OK}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Line x={38} y={y + 1} w={i ? 58 : 76} h={6} />
          </g>
        ))}
      </g>

      {/* Control owner tile */}
      <g transform="translate(38 60)">
        <Card x={0} y={0} w={110} h={70} r={12} />
        <rect x={16} y={16} width={26} height={26} rx={8} fill={V900} />
        <path d="M23 29l4 4 8-9" fill="none" stroke={G400} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        <Line x={52} y={18} w={40} h={7} fill={V900} />
        <Line x={52} y={32} w={30} h={6} fill="#efeaf5" />
        <Line x={16} y={52} w={78} h={6} fill="#efeaf5" />
      </g>
    </SceneFrame>
  );
}

/* -------------------------------------------------------------------------
   Agreed-Upon Procedures — defined steps, factual findings, no opinion.
   Deliberately carries no seal: an AUP engagement reports findings only.
   ------------------------------------------------------------------------- */
export function ProceduresScene() {
  return (
    <SceneFrame>
      {/* Agreed procedure list */}
      <Card x={72} y={54} w={150} h={180} />
      <Line x={90} y={74} w={58} h={8} fill={V900} />
      <rect x={90} y={94} width={114} height={1.5} fill={LINE} />
      {[106, 134, 162, 190].map((y, i) => (
        <g key={y}>
          <rect x={90} y={y} width={16} height={16} rx={5} fill={i < 3 ? V900 : "#f4f1f7"} />
          <Line x={114} y={y + 2} w={i % 2 ? 62 : 84} h={6} fill={i < 3 ? "#d1c9dd" : "#efeaf5"} />
          <Line x={114} y={y + 12} w={i % 2 ? 44 : 56} h={5} fill="#efeaf5" />
        </g>
      ))}

      {/* Findings report, overlapping */}
      <g transform="translate(196 92)">
        <Card x={0} y={0} w={166} h={152} r={14} />
        <Line x={20} y={20} w={64} h={9} fill={V900} />
        <Line x={20} y={38} w={44} h={6} fill={G600} />
        <rect x={20} y={56} width={126} height={1.5} fill={LINE} />
        {[68, 96, 124].map((y, i) => (
          <g key={y}>
            <Line x={20} y={y} w={90} h={6} />
            <Line x={20} y={y + 12} w={i === 1 ? 58 : 74} h={5} fill="#efeaf5" />
            <rect x={122} y={y - 3} width={24} height={14} rx={7} fill={i === 1 ? "#f7ebdc" : "#e6f2ec"} />
            <circle cx={134} cy={y + 4} r={3.5} fill={i === 1 ? G600 : OK} />
          </g>
        ))}
      </g>
    </SceneFrame>
  );
}

/* -------------------------------------------------------------------------
   Services overview — the three strands of the practice, stacked
   ------------------------------------------------------------------------- */
export function ServicesOverviewScene() {
  return (
    <SceneFrame>
      {/* Back card — advisory */}
      <g transform="rotate(-7 200 140)">
        <Card x={92} y={70} w={182} h={116} r={14} />
        <Line x={112} y={90} w={48} h={7} fill={V200} />
        <polyline
          points="112,152 142,138 168,144 196,118 232,104"
          fill="none"
          stroke={V500}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      {/* Middle card — tax */}
      <g transform="rotate(4 200 150)">
        <Card x={112} y={88} w={186} h={120} r={14} />
        <Line x={132} y={108} w={56} h={7} fill={V900} />
        <rect x={132} y={126} width={148} height={1.5} fill={LINE} />
        {[136, 156, 176].map((y, i) => (
          <g key={y}>
            <Line x={132} y={y} w={i === 1 ? 68 : 92} h={6} fill="#efeaf5" />
            <rect x={252} y={y - 3} width={28} height={13} rx={6.5} fill={i === 0 ? "#e6f2ec" : "#f4f1f7"} />
          </g>
        ))}
      </g>
      {/* Front card — accounting close */}
      <g transform="translate(0 6)">
        <Card x={130} y={122} w={196} h={104} r={14} />
        <Line x={152} y={142} w={62} h={8} fill={V900} />
        {[162, 184].map((y, i) => (
          <g key={y}>
            <circle cx={160} cy={y + 8} r={8} fill="#e6f2ec" />
            <path
              d={`M156 ${y + 8} l3 3 5.5-6`}
              fill="none"
              stroke={OK}
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Line x={178} y={y + 4} w={i ? 62 : 86} h={7} />
            <Line x={272} y={y + 4} w={34} h={7} fill={i ? V200 : G200} />
          </g>
        ))}
      </g>
    </SceneFrame>
  );
}
