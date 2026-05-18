import React from "react";

export interface MandalaProps extends React.SVGProps<SVGSVGElement> {
  variant: "procedural-1" | "procedural-2" | "mandala-1" | "mandala-2" | "custom";
  customSvgPath?: string;
  speed?: number;
  reverse?: boolean;
  spin?: boolean;
}

export const MandalaProceduralOne = ({
  className,
  style,
  speed = 300,
  reverse = false,
  spin = true,
  ...props
}: Omit<MandalaProps, "variant">) => {
  const circles = [
    30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390,
  ];
  const starPoints = 24;
  const outerPetals = 36;
  const flowerOfLifeCount = 18;

  const animationStyle = spin
    ? {
        animation: `spin ${speed}s linear infinite${reverse ? " reverse" : ""}`,
      }
    : {};

  return (
    <svg
      viewBox="0 0 800 800"
      className={className}
      style={{ ...animationStyle, ...style }}
      {...props}
    >
      <defs>
        <radialGradient id="mandala-grad-1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
          <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.08" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g transform="translate(400, 400)">
        <circle r="380" fill="url(#mandala-grad-1)" />

        {circles.map((r, idx) => (
          <circle
            key={`c-${idx}`}
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth={idx % 4 === 0 ? "1.5" : "0.5"}
            strokeDasharray={
              idx % 2 === 0 ? "1 3" : idx % 3 === 0 ? "4 4 1 4" : undefined
            }
            opacity={0.3 + (1 - r / 400) * 0.6}
          />
        ))}

        {Array.from({ length: starPoints }).map((_, idx) => {
          const angle = (idx * 360) / starPoints;
          return (
            <g key={`star-${idx}`} transform={`rotate(${angle})`}>
              <polygon
                points="0,-360 -45,-180 0,-90 45,-180"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.75"
                opacity="0.2"
              />
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="-380"
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.2"
                strokeDasharray="2 6"
              />
            </g>
          );
        })}

        {Array.from({ length: outerPetals }).map((_, idx) => {
          const angle = (idx * 360) / outerPetals;
          return (
            <path
              key={`petal-${idx}`}
              d="M0 -150 C-40 -250, -40 -350, 0 -380 C40 -350, 40 -250, 0 -150"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.15"
              transform={`rotate(${angle})`}
            />
          );
        })}

        {Array.from({ length: flowerOfLifeCount }).map((_, idx) => {
          const angle = (idx * 360) / flowerOfLifeCount;
          const distance = 120;
          return (
            <circle
              key={`fol-${idx}`}
              cx={distance * Math.cos((angle * Math.PI) / 180)}
              cy={distance * Math.sin((angle * Math.PI) / 180)}
              r="120"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.15"
            />
          );
        })}

        {Array.from({ length: 12 }).map((_, idx) => {
          const angle = (idx * 360) / 12;
          return (
            <path
              key={`center-node-${idx}`}
              d="M0 0 L-15 -45 L0 -90 L15 -45 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.4"
              transform={`rotate(${angle})`}
            />
          );
        })}
      </g>
    </svg>
  );
};

export const MandalaProceduralTwo = ({
  className,
  style,
  speed = 250,
  reverse = true,
  spin = true,
  ...props
}: Omit<MandalaProps, "variant">) => {
  const circles = [30, 60, 90, 120, 150, 180, 210, 240, 270];
  const ellipses = 36;
  const outerStars = 8;
  const spiralArms = 12;

  const animationStyle = spin
    ? {
        animation: `spin ${speed}s linear infinite${reverse ? " reverse" : ""}`,
      }
    : {};

  return (
    <svg
      viewBox="0 0 600 600"
      className={className}
      style={{ ...animationStyle, ...style }}
      {...props}
    >
      <defs>
        <radialGradient id="mandala-grad-2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
          <stop offset="60%" stopColor="var(--primary)" stopOpacity="0.08" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g transform="translate(300, 300)">
        <circle r="280" fill="url(#mandala-grad-2)" />

        {circles.map((r, idx) => (
          <circle
            key={`c2-${idx}`}
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth={idx % 2 === 0 ? "1" : "0.5"}
            strokeDasharray={
              idx % 3 === 0 ? "3 6" : idx % 4 === 0 ? "1 4" : undefined
            }
            opacity={0.2 + (1 - r / 300) * 0.5}
          />
        ))}

        {Array.from({ length: ellipses }).map((_, idx) => {
          const angle = (idx * 360) / ellipses;
          return (
            <ellipse
              key={`ell-${idx}`}
              cx="0"
              cy="0"
              rx="240"
              ry="40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.15"
              transform={`rotate(${angle})`}
            />
          );
        })}

        {Array.from({ length: outerStars }).map((_, idx) => {
          const angle = (idx * 45) / 2;
          return (
            <g key={`oct-${idx}`} transform={`rotate(${angle})`}>
              <polygon
                points="0,-260 50,-100 260,0 50,100 0,260 -50,100 -260,0 -50,-100"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.15"
              />
            </g>
          );
        })}

        {Array.from({ length: spiralArms }).map((_, idx) => {
          const angle = (idx * 360) / spiralArms;
          return (
            <path
              key={`spiral-${idx}`}
              d="M0 0 C50 -50, 150 -50, 200 -200"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.25"
              transform={`rotate(${angle})`}
            />
          );
        })}

        <circle
          r="15"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.5"
        />
        <circle r="5" fill="currentColor" opacity="0.8" />
      </g>
    </svg>
  );
};

export const MandalaCustom = ({
  className,
  style,
  speed = 300,
  reverse = false,
  spin = true,
  customSvgPath,
}: Omit<MandalaProps, "variant">) => {
  const uniqueId = React.useId().replace(/:/g, "-");

  if (typeof window !== "undefined") {
    return null;
  }

  try {
    const fs = require("fs");
    const path = require("path");

    const resolvedPath = customSvgPath
      ? path.resolve(process.cwd(), customSvgPath)
      : path.join(process.cwd(), "src", "assets", "Img", "mandala1.svg");

    if (!fs.existsSync(resolvedPath)) {
      console.warn("SVG file not found at path:", resolvedPath);
      return null;
    }

    let svgContent = fs.readFileSync(resolvedPath, "utf8");
    const svgStart = svgContent.indexOf("<svg");
    if (svgStart !== -1) {
      svgContent = svgContent.substring(svgStart);
    }

    svgContent = svgContent.replace(/<rect[^>]*fill:\s*#FFFFFF[^>]*\/>/gi, "");
    svgContent = svgContent.replace(/<rect[^>]*fill="#FFFFFF"[^>]*\/>/gi, "");
    svgContent = svgContent.replace(
      /<rect[^>]*style="[^"]*fill:\s*#FFFFFF[^"]*"[^>]*\/>/gi,
      "",
    );

    svgContent = svgContent.replace(/fill:#BFBFBF/gi, "fill:currentColor");
    svgContent = svgContent.replace(/fill="#BFBFBF"/gi, 'fill="currentColor"');
    svgContent = svgContent.replace(/fill:#2C3A49/gi, "fill:currentColor");
    svgContent = svgContent.replace(/fill="#2C3A49"/gi, 'fill="currentColor"');

    let viewBoxWidth = 4000;
    let viewBoxHeight = 4000;
    const viewBoxMatch = svgContent.match(/viewBox=["']([^"']+)["']/i);
    if (viewBoxMatch) {
      const parts = viewBoxMatch[1].trim().split(/\s+/);
      if (parts.length === 4) {
        viewBoxWidth = parseFloat(parts[2]) || 4000;
        viewBoxHeight = parseFloat(parts[3]) || 4000;
      }
    }

    const cx = viewBoxWidth / 2;
    const cy = viewBoxHeight / 2;
    const r = Math.min(viewBoxWidth, viewBoxHeight) / 2;

    const svgHeaderMatch = svgContent.match(/<svg([^>]*)>/i);
    if (svgHeaderMatch) {
      const svgHeader = svgHeaderMatch[0];
      const headerIndex = svgContent.indexOf(svgHeader);
      const innerStart = headerIndex + svgHeader.length;
      const innerEnd = svgContent.lastIndexOf("</svg>");
      if (innerEnd !== -1) {
        let innerContent = svgContent.substring(innerStart, innerEnd);
        const maskDefs = `<defs><radialGradient id="grad-${uniqueId}" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.55" /><stop offset="30%" stop-color="#ffffff" stop-opacity="0.40" /><stop offset="65%" stop-color="#ffffff" stop-opacity="0.18" /><stop offset="85%" stop-color="#ffffff" stop-opacity="0.05" /><stop offset="100%" stop-color="#ffffff" stop-opacity="0" /></radialGradient><mask id="mask-${uniqueId}" maskUnits="userSpaceOnUse" x="0" y="0" width="${viewBoxWidth}" height="${viewBoxHeight}"><circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#grad-${uniqueId})" /></mask></defs>`;
        innerContent = `${maskDefs}<g mask="url(#mask-${uniqueId})">${innerContent}</g>`;
        svgContent = svgContent.substring(0, innerStart) + innerContent + "</svg>";
      }
    }

    svgContent = svgContent.replace(
      /<svg([^>]*)/,
      (match: string, attrs: string) => {
        const cleanAttrs = attrs.replace(
          /\b(class|style|width|height|enable-background)=["'][^"']*["']/g,
          "",
        );

        const animationStyle = spin
          ? `animation: spin ${speed}s linear infinite${reverse ? " reverse" : ""}`
          : "";

        let customStyleStr = "";
        if (style && typeof style === "object") {
          customStyleStr = Object.entries(style)
            .map(
              ([k, v]) =>
                `${k.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}: ${v}`,
            )
            .join("; ");
        } else if (typeof style === "string") {
          customStyleStr = style;
        }

        const mergedStyle = [animationStyle, customStyleStr]
          .filter(Boolean)
          .join("; ");

        return `<svg${cleanAttrs} class="${className || ""}" style="${mergedStyle}"`;
      },
    );

    return (
      <div
        dangerouslySetInnerHTML={{ __html: svgContent }}
        className="contents"
      />
    );
  } catch (error) {
    console.error("Error loading custom mandala SVG:", error);
    return null;
  }
};

export default function Mandala({ variant, ...props }: MandalaProps) {
  switch (variant) {
    case "procedural-1":
      return <MandalaProceduralOne {...props} />;
    case "procedural-2":
      return <MandalaProceduralTwo {...props} />;
    case "mandala-1":
      return <MandalaCustom {...props} customSvgPath="src/assets/Img/mandala1.svg" />;
    case "mandala-2":
      return <MandalaCustom {...props} customSvgPath="src/assets/Img/mandala-2.svg" />;
    case "custom":
      return <MandalaCustom {...props} />;
    default:
      return null;
  }
}
