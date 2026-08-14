/* Hand-drawn style caricatures of an Indian couple for each celebration. */

type Props = { className?: string };

function Face({
  x,
  y,
  skin = "#e0a878",
  children,
}: {
  x: number;
  y: number;
  skin?: string;
  children?: React.ReactNode;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx="0" cy="0" r="22" fill={skin} stroke="#5b2b23" strokeWidth="2" />
      <circle cx="-7" cy="-2" r="2.2" fill="#3a1d18" />
      <circle cx="7" cy="-2" r="2.2" fill="#3a1d18" />
      <path d="M -7 9 Q 0 15 7 9" stroke="#3a1d18" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="-14" cy="4" r="3.4" fill="#e08a8a" opacity="0.55" />
      <circle cx="14" cy="4" r="3.4" fill="#e08a8a" opacity="0.55" />
      {children}
    </g>
  );
}

function BrideHair({ x, y, color = "#241612" }: { x: number; y: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d={`M -22 2 Q -24 -24 0 -24 Q 24 -24 22 2 Q 14 -10 0 -10 Q -14 -10 -22 2`} fill={color} />
      <path d="M 20 4 Q 34 18 26 40 Q 22 24 16 16" fill={color} />
    </g>
  );
}

export function HaldiCaricature({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 260 230" width="220" height="195" className={`cari ${className}`} role="img" aria-label="Caricature of the couple at the haldi ceremony">
      {/* turmeric splashes */}
      <g className="cari-spin" style={{ transformOrigin: "130px 40px" }}>
        <circle cx="60" cy="34" r="5" fill="#e8b53a" />
        <circle cx="200" cy="28" r="4" fill="#e8b53a" />
        <circle cx="130" cy="18" r="3.5" fill="#d99b22" />
      </g>

      {/* bride */}
      <g className="cari-sway">
        <path d="M 62 210 Q 52 150 84 138 Q 116 150 106 210 Z" fill="#f2d268" stroke="#a97c14" strokeWidth="2" />
        <path d="M 66 178 Q 84 186 102 178" stroke="#c99a1e" strokeWidth="2" fill="none" />
        <line x1="66" y1="146" x2="38" y2="176" stroke="#e0a878" strokeWidth="8" strokeLinecap="round" />
        <line x1="104" y1="146" x2="126" y2="168" stroke="#e0a878" strokeWidth="8" strokeLinecap="round" />
        {/* bangles */}
        <line x1="44" y1="168" x2="50" y2="172" stroke="#b5322f" strokeWidth="3" />
        <Face x={84} y={116}>
          <circle cx="0" cy="-14" r="2.6" fill="#b5322f" />
          <circle cx="-22" cy="6" r="3" fill="#e8b53a" />
          <circle cx="22" cy="6" r="3" fill="#e8b53a" />
        </Face>
        <BrideHair x={84} y={116} />
        <path d="M 60 118 Q 84 96 108 118" fill="none" stroke="#f2d268" strokeWidth="6" strokeLinecap="round" />
        {/* turmeric smear on cheek */}
        <ellipse cx="72" cy="124" rx="6" ry="3.5" fill="#e8b53a" opacity="0.8" />
      </g>

      {/* groom */}
      <g className="cari-sway-alt">
        <path d="M 150 210 Q 142 152 176 140 Q 210 152 202 210 Z" fill="#faf0cf" stroke="#a97c14" strokeWidth="2" />
        <line x1="158" y1="150" x2="136" y2="170" stroke="#c98a58" strokeWidth="8" strokeLinecap="round" />
        <line x1="196" y1="150" x2="222" y2="176" stroke="#c98a58" strokeWidth="8" strokeLinecap="round" />
        {/* haldi bowl */}
        <path d="M 118 168 h 26 l -5 12 h -16 z" fill="#b5322f" />
        <ellipse cx="131" cy="168" rx="13" ry="4" fill="#e8b53a" />
        <Face x={176} y={118} skin="#c98a58">
          <ellipse cx="0" cy="6" rx="9" ry="4" fill="#3a1d18" opacity="0.25" />
        </Face>
        <path d="M 154 118 Q 152 94 176 94 Q 200 94 198 118 Q 190 106 176 106 Q 162 106 154 118" fill="#241612" />
        <ellipse cx="176" cy="130" rx="9" ry="4" fill="#e8b53a" opacity="0.75" />
      </g>

      {/* marigold string */}
      <path d="M 10 46 Q 130 78 250 46" stroke="#e07a2f" strokeWidth="2" fill="none" strokeDasharray="2 7" strokeLinecap="round" />
    </svg>
  );
}

export function SangeetCaricature({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 260 230" width="220" height="195" className={`cari ${className}`} role="img" aria-label="Caricature of the couple dancing at the sangeet">
      {/* disco ball */}
      <g className="cari-spin" style={{ transformOrigin: "130px 26px" }}>
        <line x1="130" y1="0" x2="130" y2="14" stroke="#8a8fa3" strokeWidth="2" />
        <circle cx="130" cy="26" r="12" fill="#b9bdd0" stroke="#7d7f95" strokeWidth="1.5" />
        <path d="M 118 26 h 24 M 130 14 v 24 M 121 18 l 18 16 M 139 18 l -18 16" stroke="#7d7f95" strokeWidth="1" />
      </g>
      <g className="cari-twinkle">
        <path d="M 60 46 l 3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 z" fill="#c9a24a" />
        <path d="M 206 52 l 2.5 7 7 2.5 -7 2.5 -2.5 7 -2.5 -7 -7 -2.5 7 -2.5 z" fill="#9b7fbf" />
      </g>

      {/* bride dancing */}
      <g className="cari-dance">
        <path d="M 58 212 Q 46 152 82 140 Q 116 152 104 212 Z" fill="#b34a63" stroke="#7a2b3d" strokeWidth="2" />
        <circle cx="70" cy="176" r="2.6" fill="#e8c05a" />
        <circle cx="90" cy="188" r="2.6" fill="#e8c05a" />
        <circle cx="82" cy="164" r="2.6" fill="#e8c05a" />
        <line x1="62" y1="148" x2="34" y2="112" stroke="#e0a878" strokeWidth="8" strokeLinecap="round" />
        <line x1="102" y1="148" x2="124" y2="120" stroke="#e0a878" strokeWidth="8" strokeLinecap="round" />
        <Face x={82} y={118}>
          <circle cx="0" cy="-14" r="2.6" fill="#b5322f" />
          <circle cx="-22" cy="8" r="4" fill="#e8c05a" />
          <circle cx="22" cy="8" r="4" fill="#e8c05a" />
        </Face>
        <BrideHair x={82} y={118} />
        {/* maang tikka */}
        <path d="M 82 96 v -10" stroke="#e8c05a" strokeWidth="2" />
      </g>

      {/* groom dancing */}
      <g className="cari-dance-alt">
        <path d="M 152 212 Q 146 150 178 138 Q 212 150 206 212 Z" fill="#5b4a86" stroke="#3b2f5c" strokeWidth="2" />
        <path d="M 178 138 v 74" stroke="#e8c05a" strokeWidth="2" strokeDasharray="4 5" />
        <line x1="156" y1="150" x2="128" y2="128" stroke="#c98a58" strokeWidth="8" strokeLinecap="round" />
        <line x1="202" y1="150" x2="230" y2="112" stroke="#c98a58" strokeWidth="8" strokeLinecap="round" />
        <Face x={178} y={116} skin="#c98a58">
          {/* sunglasses */}
          <rect x="-16" y="-7" width="12" height="9" rx="3" fill="#2b2b33" />
          <rect x="4" y="-7" width="12" height="9" rx="3" fill="#2b2b33" />
          <line x1="-4" y1="-3" x2="4" y2="-3" stroke="#2b2b33" strokeWidth="2" />
        </Face>
        <path d="M 156 116 Q 154 92 178 92 Q 202 92 200 116 Q 192 104 178 104 Q 164 104 156 116" fill="#241612" />
      </g>

      {/* dhol */}
      <ellipse cx="26" cy="196" rx="16" ry="10" fill="#8c5a2b" stroke="#5c3a19" strokeWidth="2" />
      <path d="M 10 196 v 12 a 16 10 0 0 0 32 0 v -12" fill="#a86b33" stroke="#5c3a19" strokeWidth="2" />
    </svg>
  );
}

export function WeddingCaricature({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 260 230" width="220" height="195" className={`cari ${className}`} role="img" aria-label="Caricature of the bride and groom at the wedding ceremony">
      {/* floral toran */}
      <path d="M 8 26 Q 130 60 252 26" stroke="#c0562f" strokeWidth="2" fill="none" />
      {[30, 70, 110, 150, 190, 230].map((x, i) => (
        <circle key={x} cx={x} cy={i % 2 ? 46 : 40} r="5" fill={i % 2 ? "#e0913a" : "#c94f4f"} />
      ))}

      {/* bride */}
      <g className="cari-sway">
        <path d="M 58 212 Q 48 150 84 138 Q 118 150 108 212 Z" fill="#b02f43" stroke="#7a1c2c" strokeWidth="2" />
        <path d="M 58 190 Q 84 200 108 190" stroke="#e0b64a" strokeWidth="3" fill="none" />
        <circle cx="74" cy="168" r="2.4" fill="#e0b64a" />
        <circle cx="94" cy="176" r="2.4" fill="#e0b64a" />
        <line x1="64" y1="150" x2="44" y2="182" stroke="#e0a878" strokeWidth="8" strokeLinecap="round" />
        <line x1="104" y1="150" x2="126" y2="164" stroke="#e0a878" strokeWidth="8" strokeLinecap="round" />
        <Face x={84} y={116}>
          <circle cx="0" cy="-14" r="3" fill="#b5322f" />
          <circle cx="-23" cy="8" r="4" fill="#e0b64a" />
          <circle cx="23" cy="8" r="4" fill="#e0b64a" />
        </Face>
        <BrideHair x={84} y={116} />
        {/* red dupatta veil */}
        <path d="M 58 116 Q 84 84 110 116 L 112 142 Q 84 128 56 142 Z" fill="#c2394d" opacity="0.85" stroke="#e0b64a" strokeWidth="1.5" />
      </g>

      {/* groom */}
      <g className="cari-sway-alt">
        <path d="M 150 212 Q 144 150 178 138 Q 212 150 206 212 Z" fill="#f3e4c4" stroke="#b08a3c" strokeWidth="2" />
        <path d="M 178 138 v 74" stroke="#b08a3c" strokeWidth="2" />
        <circle cx="178" cy="158" r="2.2" fill="#b02f43" />
        <circle cx="178" cy="178" r="2.2" fill="#b02f43" />
        <line x1="156" y1="150" x2="132" y2="170" stroke="#c98a58" strokeWidth="8" strokeLinecap="round" />
        <line x1="202" y1="150" x2="224" y2="180" stroke="#c98a58" strokeWidth="8" strokeLinecap="round" />
        <Face x={178} y={116} skin="#c98a58">
          <path d="M -8 8 Q 0 13 8 8" stroke="#3a1d18" strokeWidth="2" fill="none" />
        </Face>
        {/* turban with kalgi */}
        <path d="M 154 112 Q 156 84 178 84 Q 200 84 202 112 Q 178 100 154 112" fill="#e0913a" stroke="#a8611c" strokeWidth="2" />
        <path d="M 178 84 v -14 l 8 6" stroke="#b02f43" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* sehra strands */}
        <path d="M 160 104 v 22 M 168 102 v 26 M 188 102 v 26 M 196 104 v 22" stroke="#f0e2b8" strokeWidth="2" strokeDasharray="3 4" />
      </g>

      {/* jaimala garland between them */}
      <path d="M 108 150 Q 130 176 152 150" stroke="#e0913a" strokeWidth="3" fill="none" strokeDasharray="1 6" strokeLinecap="round" />
    </svg>
  );
}

/** Hero characters: Ayushi & Vishwas waving, in everyday festive wear. */
export function CoupleWaving({ className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 260 230"
      className={`cari h-auto w-full ${className}`}
      role="img"
      aria-label="Illustration of Ayushi and Vishwas waving"
    >
      {/* confetti */}
      <g className="cari-twinkle">
        <circle cx="30" cy="30" r="4" fill="#e8b53a" />
        <circle cx="232" cy="44" r="3.4" fill="#c9548a" />
        <circle cx="128" cy="16" r="3" fill="#8fae7a" />
      </g>

      {/* Ayushi */}
      <g className="cari-sway">
        <path d="M 60 212 Q 48 150 84 138 Q 120 150 108 212 Z" fill="#c9548a" stroke="#7d2a45" strokeWidth="2" />
        <path d="M 62 184 Q 84 192 106 184" stroke="#f2d268" strokeWidth="2.5" fill="none" />
        {/* waving arm */}
        <line x1="66" y1="148" x2="40" y2="112" stroke="#e0a878" strokeWidth="8" strokeLinecap="round" />
        <circle cx="38" cy="106" r="6" fill="#e0a878" stroke="#5b2b23" strokeWidth="1.5" />
        <line x1="104" y1="148" x2="124" y2="176" stroke="#e0a878" strokeWidth="8" strokeLinecap="round" />
        <Face x={84} y={116}>
          <circle cx="0" cy="-15" r="2.6" fill="#b5322f" />
          <circle cx="-22" cy="7" r="3.2" fill="#e8b53a" />
          <circle cx="22" cy="7" r="3.2" fill="#e8b53a" />
        </Face>
        <BrideHair x={84} y={116} />
      </g>

      {/* Vishwas */}
      <g className="cari-sway-alt">
        <path d="M 152 212 Q 144 152 178 140 Q 212 152 204 212 Z" fill="#7d8f5f" stroke="#4a5a35" strokeWidth="2" />
        <line x1="160" y1="150" x2="136" y2="176" stroke="#c98a58" strokeWidth="8" strokeLinecap="round" />
        <line x1="198" y1="150" x2="224" y2="114" stroke="#c98a58" strokeWidth="8" strokeLinecap="round" />
        <circle cx="226" cy="108" r="6" fill="#c98a58" stroke="#5b2b23" strokeWidth="1.5" />
        <Face x={178} y={118} skin="#c98a58">
          <ellipse cx="0" cy="6" rx="9" ry="4" fill="#3a1d18" opacity="0.25" />
        </Face>
        <path d="M 156 118 Q 154 94 178 94 Q 202 94 200 118 Q 192 106 178 106 Q 164 106 156 118" fill="#241612" />
      </g>

      {/* little heart between them */}
      <path
        className="cari-twinkle"
        d="M 130 96 c -6 -8 -18 -2 -12 8 c 4 7 12 12 12 12 s 8 -5 12 -12 c 6 -10 -6 -16 -12 -8 z"
        fill="#c9548a"
      />
    </svg>
  );
}

/** Small peeking characters for corners of sections. */
export function CouplePeeking({ className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 140 90"
      className={`cari h-auto w-full ${className}`}
      role="img"
      aria-label="Illustration of the couple peeking over an edge"
    >
      <g className="cari-sway">
        <Face x={44} y={46}>
          <circle cx="0" cy="-15" r="2.4" fill="#b5322f" />
        </Face>
        <BrideHair x={44} y={46} />
        <path d="M 20 74 h 100" stroke="#7d2a45" strokeWidth="0" />
      </g>
      <g className="cari-sway-alt">
        <Face x={96} y={48} skin="#c98a58" />
        <path d="M 74 48 Q 72 26 96 26 Q 120 26 118 48 Q 110 36 96 36 Q 82 36 74 48" fill="#241612" />
      </g>
    </svg>
  );
}
