// Outfit colour palette shown as fabric swatches on a clothesline,
// like a shelf in a sari shop — each swatch hangs from a pin.

type DressSwatchesProps = {
  colors: string[];
};

export function DressSwatches({ colors }: DressSwatchesProps) {
  return (
    <div
      aria-label="Outfit colour palette"
      className="mt-4 flex justify-center px-1"
    >
      <div className="flex max-w-[19rem] flex-wrap items-start justify-center gap-x-1 gap-y-4 border-t-2 border-dashed border-wine/25 pt-0">
        {colors.map((c, i) => (
          <div
            key={c + i}
            className="group flex w-[2.6rem] flex-col items-center"
            style={{ marginTop: i % 2 === 1 ? 10 : 0 }}
          >
            {/* pin holding the swatch to the rope */}
            <span className="z-10 h-1.5 w-1.5 -translate-y-[3px] rounded-full bg-gold shadow-sm transition-transform duration-300 group-hover:scale-125" />
            {/* the fabric swatch */}
            <span
              className={`-mt-px block h-9 w-6 rounded-b-lg rounded-t-[3px] border border-foreground/15 shadow-sm transition-transform duration-300 group-hover:-rotate-2 group-hover:scale-110 ${
                i % 2 === 1 ? "rotate-3" : "-rotate-3"
              }`}
              style={{ backgroundColor: c }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
