import type { ReactElement } from "react";

const common = { viewBox: "0 0 24 24", "aria-hidden": true } as const;
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
} as const;

export type IconName = "azure" | "gcp" | "onprem" | "calendar" | "dataplatforms" | "aisystems" | "mlops" | "cloud";

const ICONS: Record<IconName, ReactElement> = {
  azure: (
    <svg {...common} fill="currentColor">
      <path d="M8.5 3h5.1l-5.3 15.4L2 20.5 8.5 3z" />
      <path d="M14.2 3.8 8.9 18.6h11.7L15 9.4h-5l1.7-4.9z" />
    </svg>
  ),
  gcp: (
    <svg {...common} fill="currentColor">
      <path d="M14.5 8.3a5.6 5.6 0 0 0-5.4 4.1A4.3 4.3 0 0 0 5 16.6 4.3 4.3 0 0 0 9.3 21h9a4 4 0 0 0 .6-8 5.6 5.6 0 0 0-4.4-4.7z" />
    </svg>
  ),
  onprem: (
    <svg {...common} fill="currentColor">
      <rect x="3" y="4" width="18" height="4.5" rx="1" />
      <rect x="3" y="10" width="18" height="4.5" rx="1" />
      <rect x="3" y="16" width="18" height="4.5" rx="1" />
    </svg>
  ),
  dataplatforms: (
    <svg {...common} fill="currentColor">
      <path d="M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3z" />
      <path d="M4 9.5v3c0 1.7 3.6 3 8 3s8-1.3 8-3v-3c0 1.7-3.6 3-8 3s-8-1.3-8-3z" />
      <path d="M4 15.5V18c0 1.7 3.6 3 8 3s8-1.3 8-3v-2.5c0 1.7-3.6 3-8 3s-8-1.3-8-3z" />
    </svg>
  ),
  aisystems: (
    <svg {...common} fill="currentColor">
      <rect x="8" y="8" width="8" height="8" rx="1.5" />
      <rect x="10.5" y="2" width="3" height="4" rx="1" />
      <rect x="10.5" y="18" width="3" height="4" rx="1" />
      <rect x="2" y="10.5" width="4" height="3" rx="1" />
      <rect x="18" y="10.5" width="4" height="3" rx="1" />
    </svg>
  ),
  mlops: (
    <svg {...common} fill="currentColor">
      <path d="M12 5V2L8 5.5 12 9V6a5.5 5.5 0 0 1 5.4 6.6l1.9.5A7.5 7.5 0 0 0 12 5z" />
      <path d="M12 19v3l4-3.5L12 15v3a5.5 5.5 0 0 1-5.4-6.6l-1.9-.5A7.5 7.5 0 0 0 12 19z" />
    </svg>
  ),
  cloud: (
    <svg {...common} fill="currentColor">
      <path d="M7 18a5 5 0 0 1-.4-9.98 6 6 0 0 1 11.4 1.98A4.5 4.5 0 0 1 17.5 18H7z" />
    </svg>
  ),
  calendar: (
    <svg {...common} {...stroke}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </svg>
  )
};

export function IssuerIcon({ name, bare = false }: { name: IconName; bare?: boolean }) {
  return bare ? ICONS[name] : <span className="issuer-icon">{ICONS[name]}</span>;
}

export const PinIcon = () => (
  <svg {...common} {...stroke}>
    <path d="M20 10c0 5.25-8 11-8 11S4 15.25 4 10a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const GithubIcon = () => (
  <svg {...common} fill="currentColor">
    <path d="M12 2a10 10 0 0 0-3.16 19.5c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
  </svg>
);

export const LinkedinIcon = () => (
  <svg {...common} fill="currentColor">
    <path d="M6.94 8.5H3.56V20h3.38V8.5zM5.25 4a1.97 1.97 0 1 0 0 3.94A1.97 1.97 0 0 0 5.25 4zM20.45 20h-3.37v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V20h-3.37V8.5h3.24v1.57h.05c.45-.85 1.56-1.75 3.2-1.75 3.42 0 4.05 2.25 4.05 5.17V20z" />
  </svg>
);

export const MailIcon = () => (
  <svg {...common} {...stroke}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export const ArrowIcon = () => (
  <svg {...common} {...stroke} className="icon-arrow">
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);
