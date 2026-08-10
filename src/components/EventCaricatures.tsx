import { useEffect, useRef } from "react";

export function HaldiCaricature() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const style = document.createElement("style");
    style.textContent = `
      @keyframes sway {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-8px) rotate(1deg); }
      }
      @keyframes float-arms {
        0%, 100% { transform: translateX(0px); }
        50% { transform: translateX(6px); }
      }
      .haldi-figure { animation: sway 3s ease-in-out infinite; }
      .haldi-arms { animation: float-arms 2.5s ease-in-out infinite; }
    `;
    svg.appendChild(style);
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 200 240"
      width="120"
      height="140"
      className="haldi-figure"
    >
      {/* Head */}
      <circle cx="100" cy="60" r="28" fill="#f4a460" />
      
      {/* Hair */}
      <path
        d="M 72 60 Q 72 25 100 22 Q 128 25 128 60"
        fill="#8b4513"
        stroke="#654321"
        strokeWidth="2"
      />
      
      {/* Bindi */}
      <circle cx="100" cy="50" r="3" fill="#e74c3c" />
      
      {/* Face */}
      <circle cx="93" cy="58" r="2" fill="#333" />
      <circle cx="107" cy="58" r="2" fill="#333" />
      <path d="M 100 68 Q 100 72 97 74" stroke="#333" strokeWidth="1.5" fill="none" />
      
      {/* Yellow outfit (haldi dress) */}
      <ellipse cx="100" cy="130" rx="32" ry="45" fill="#ffd700" stroke="#daa520" strokeWidth="2" />
      
      {/* Arms */}
      <g className="haldi-arms">
        <line x1="68" y1="95" x2="40" y2="110" stroke="#f4a460" strokeWidth="8" strokeLinecap="round" />
        <line x1="132" y1="95" x2="160" y2="110" stroke="#f4a460" strokeWidth="8" strokeLinecap="round" />
      </g>
      
      {/* Hands */}
      <circle cx="38" cy="112" r="6" fill="#f4a460" />
      <circle cx="162" cy="112" r="6" fill="#f4a460" />
      
      {/* Legs */}
      <line x1="90" y1="170" x2="85" y2="210" stroke="#8b6914" strokeWidth="7" strokeLinecap="round" />
      <line x1="110" y1="170" x2="115" y2="210" stroke="#8b6914" strokeWidth="7" strokeLinecap="round" />
      
      {/* Feet */}
      <ellipse cx="85" cy="215" rx="6" ry="5" fill="#8b4513" />
      <ellipse cx="115" cy="215" rx="6" ry="5" fill="#8b4513" />
    </svg>
  );
}

export function SangeetCaricature() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const style = document.createElement("style");
    style.textContent = `
      @keyframes dance {
        0%, 100% { transform: translateX(0px) rotate(-2deg); }
        25% { transform: translateX(-10px) rotate(-3deg); }
        50% { transform: translateX(0px) rotate(2deg); }
        75% { transform: translateX(10px) rotate(3deg); }
      }
      @keyframes sway-head {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(4deg); }
      }
      .sangeet-figure { animation: dance 2.5s ease-in-out infinite; }
      .sangeet-head { animation: sway-head 2.5s ease-in-out infinite; }
    `;
    svg.appendChild(style);
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 200 240"
      width="120"
      height="140"
      className="sangeet-figure"
    >
      {/* Head */}
      <g className="sangeet-head" style={{ transformOrigin: "100px 60px" }}>
        <circle cx="100" cy="60" r="28" fill="#f4a460" />
        
        {/* Hair with jewelry */}
        <path
          d="M 72 60 Q 72 25 100 22 Q 128 25 128 60"
          fill="#1a1a1a"
          stroke="#000"
          strokeWidth="2"
        />
        
        {/* Earrings */}
        <circle cx="72" cy="70" r="4" fill="#ffd700" />
        <circle cx="128" cy="70" r="4" fill="#ffd700" />
      </g>
      
      {/* Face */}
      <circle cx="93" cy="58" r="2" fill="#333" />
      <circle cx="107" cy="58" r="2" fill="#333" />
      <path d="M 95 72 Q 100 77 105 72" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />
      
      {/* Red/Pink lehenga */}
      <ellipse cx="100" cy="130" rx="32" ry="45" fill="#e74c3c" stroke="#c0392b" strokeWidth="2" />
      
      {/* Gold embroidery on lehenga */}
      <circle cx="85" cy="110" r="3" fill="#ffd700" />
      <circle cx="100" cy="100" r="3" fill="#ffd700" />
      <circle cx="115" cy="110" r="3" fill="#ffd700" />
      <circle cx="100" cy="145" r="3" fill="#ffd700" />
      
      {/* Arms raised for dancing */}
      <line x1="68" y1="95" x2="45" y2="60" stroke="#f4a460" strokeWidth="8" strokeLinecap="round" />
      <line x1="132" y1="95" x2="155" y2="60" stroke="#f4a460" strokeWidth="8" strokeLinecap="round" />
      
      {/* Hands */}
      <circle cx="43" cy="58" r="6" fill="#f4a460" />
      <circle cx="157" cy="58" r="6" fill="#f4a460" />
      
      {/* Legs */}
      <line x1="90" y1="170" x2="85" y2="210" stroke="#a93226" strokeWidth="7" strokeLinecap="round" />
      <line x1="110" y1="170" x2="115" y2="210" stroke="#a93226" strokeWidth="7" strokeLinecap="round" />
      
      {/* Feet */}
      <ellipse cx="85" cy="215" rx="6" ry="5" fill="#8b4513" />
      <ellipse cx="115" cy="215" rx="6" ry="5" fill="#8b4513" />
    </svg>
  );
}

export function WeddingCaricature() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const style = document.createElement("style");
    style.textContent = `
      @keyframes bow {
        0%, 100% { transform: rotateX(0deg); }
        50% { transform: rotateX(-15deg); }
      }
      @keyframes shine {
        0%, 100% { opacity: 0.6; }
        50% { opacity: 1; }
      }
      .wedding-figure { animation: bow 2.8s ease-in-out infinite; }
      .wedding-crown { animation: shine 2.5s ease-in-out infinite; }
    `;
    svg.appendChild(style);
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 200 240"
      width="120"
      height="140"
      className="wedding-figure"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Crown */}
      <g className="wedding-crown">
        <path
          d="M 75 35 L 80 20 L 85 30 L 92 18 L 100 28 L 108 18 L 115 30 L 120 20 L 125 35"
          fill="none"
          stroke="#ffd700"
          strokeWidth="2"
        />
        <circle cx="80" cy="22" r="2" fill="#ff1493" />
        <circle cx="93" cy="19" r="2" fill="#00ced1" />
        <circle cx="107" cy="19" r="2" fill="#ff1493" />
        <circle cx="120" cy="22" r="2" fill="#00ced1" />
      </g>
      
      {/* Head */}
      <circle cx="100" cy="60" r="28" fill="#f4a460" />
      
      {/* Hair */}
      <path
        d="M 72 60 Q 72 25 100 22 Q 128 25 128 60"
        fill="#1a1a1a"
        stroke="#000"
        strokeWidth="2"
      />
      
      {/* Tilaka/Bindi */}
      <circle cx="100" cy="50" r="4" fill="#ff1493" />
      
      {/* Face */}
      <circle cx="93" cy="58" r="2" fill="#333" />
      <circle cx="107" cy="58" r="2" fill="#333" />
      <path d="M 95 72 Q 100 76 105 72" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />
      
      {/* White/Cream wedding outfit */}
      <ellipse cx="100" cy="130" rx="32" ry="45" fill="#fff8dc" stroke="#daa520" strokeWidth="2" />
      
      {/* Gold embroidery patterns */}
      <path d="M 80 100 Q 85 105 90 100" stroke="#ffd700" strokeWidth="1.5" fill="none" />
      <path d="M 110 100 Q 115 105 120 100" stroke="#ffd700" strokeWidth="1.5" fill="none" />
      <circle cx="85" cy="125" r="2" fill="#ffd700" />
      <circle cx="100" cy="115" r="2" fill="#ffd700" />
      <circle cx="115" cy="125" r="2" fill="#ffd700" />
      
      {/* Arms at sides (formal posture) */}
      <line x1="68" y1="95" x2="45" y2="125" stroke="#f4a460" strokeWidth="8" strokeLinecap="round" />
      <line x1="132" y1="95" x2="155" y2="125" stroke="#f4a460" strokeWidth="8" strokeLinecap="round" />
      
      {/* Hands */}
      <circle cx="43" cy="127" r="6" fill="#f4a460" />
      <circle cx="157" cy="127" r="6" fill="#f4a460" />
      
      {/* Legs */}
      <line x1="90" y1="170" x2="85" y2="210" stroke="#d4a574" strokeWidth="7" strokeLinecap="round" />
      <line x1="110" y1="170" x2="115" y2="210" stroke="#d4a574" strokeWidth="7" strokeLinecap="round" />
      
      {/* Feet */}
      <ellipse cx="85" cy="215" rx="6" ry="5" fill="#8b4513" />
      <ellipse cx="115" cy="215" rx="6" ry="5" fill="#8b4513" />
    </svg>
  );
}
