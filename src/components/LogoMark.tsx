const WAVE =
  "M106.0 257.0 C114.7 252.7 140.0 231.5 158.0 231.0 C176.0 230.5 196.3 245.0 214.0 254.0 C231.7 263.0 245.3 277.5 264.0 285.0 C282.7 292.5 307.3 299.2 326.0 299.0 C344.7 298.8 362.7 291.0 376.0 284.0 C389.3 277.0 401.0 261.5 406.0 257.0";

// Four quarter arcs between the node centres, clockwise from the right node.
const ARCS = [
  "M406 256A150 150 0 0 1 256 406",
  "M256 406A150 150 0 0 1 106 256",
  "M106 256A150 150 0 0 1 256 106",
  "M256 106A150 150 0 0 1 406 256"
];

// Faint ring of dots around the logo (hero only). Rounded so server and client agree.
const DOTS = Array.from({ length: 18 }, (_, i) => {
  const angle = (i * 20 * Math.PI) / 180;
  return {
    x: (256 + 205 * Math.cos(angle)).toFixed(1),
    y: (256 + 205 * Math.sin(angle)).toFixed(1),
    r: i % 3 === 0 ? 5 : 3
  };
});

type LogoMarkProps = {
  /** Unique per instance on a page: SVG ids (filter, gradient) must not collide. */
  uid: string;
  /** Ring that closes and reopens. Static dashes when false. */
  animated?: boolean;
  /** Neon glow around the strokes (costly: use it sparingly). */
  glow?: boolean;
  /** Soft aura and the ring of dots behind the mark. */
  decor?: boolean;
  /** Accessible name. Omit when the mark sits next to text that already says it. */
  label?: string;
  className?: string;
};

export function LogoMark({ uid, animated = false, glow = false, decor = false, label, className }: LogoMarkProps) {
  const filter = glow ? `url(#${uid}-glow)` : undefined;
  const classes = ["logo", animated ? "logo--animated" : "", className ?? ""].filter(Boolean).join(" ");
  return (
    <svg
      className={classes}
      viewBox="0 0 512 512"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <defs>
        {glow && (
          <filter id={`${uid}-glow`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
        {decor && (
          <radialGradient id={`${uid}-aura`}>
            <stop className="logo__aura-stop" offset="0" stopOpacity=".3" />
            <stop className="logo__aura-stop" offset="1" stopOpacity="0" />
          </radialGradient>
        )}
      </defs>

      {decor && <circle className="logo__aura" cx="256" cy="256" r="230" fill={`url(#${uid}-aura)`} />}
      {decor && (
        // Outer wrapper: extra momentum during the intro, settling to 0.
        // Inner group: the slow, endless spin. Both rotate the same way, so the
        // intro hands over to the page animation without a jump.
        <g className="logo__dots-spin">
          <g className="logo__dots">
            {DOTS.map((dot, i) => (
              <circle key={i} cx={dot.x} cy={dot.y} r={dot.r} />
            ))}
          </g>
        </g>
      )}

      {/* One glow filter for the whole mark: several filtered groups animating at
          once render a black square in Chrome (seen during the intro). */}
      <g filter={filter}>
        <g fill="none" strokeLinecap="round" strokeWidth={14}>
          {ARCS.map((d, i) => (
            <path
              key={d}
              className={`logo__q logo__q${i + 1}`}
              pathLength={100}
              d={d}
              strokeDasharray="42 58"
              strokeDashoffset={-29}
            />
          ))}
        </g>

        <path
          className="logo__wave"
          pathLength={100}
          d={WAVE}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={22}
        />

        <g strokeWidth={20}>
          <circle className="logo__node logo__node--light" cx="106" cy="256" r="32" />
          <circle className="logo__node logo__node--light" cx="406" cy="256" r="32" />
          <circle className="logo__node logo__node--accent" cx="256" cy="106" r="32" />
          <circle className="logo__node logo__node--accent logo__node--bottom" cx="256" cy="406" r="32" />
        </g>
      </g>
    </svg>
  );
}
