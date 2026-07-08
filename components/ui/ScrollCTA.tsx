"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ScrollCTAProps {
  label: string;
  href?: string;
  onClick?: () => void;
  /** data-cursor attribute value shown in custom cursor on hover */
  cursorLabel?: string;
  className?: string;
  accentColor?: string;
}

/**
 * Reusable plain-text CTA with animated underline + arrow.
 * Spec: "plain text with an arrow (→), NOT a boxed button"
 */
export function ScrollCTA({
  label,
  href,
  onClick,
  cursorLabel = "VIEW",
  className = "",
  accentColor,
}: ScrollCTAProps) {
  const isExternal = href?.startsWith("http://") || href?.startsWith("https://");

  const commonProps = {
    className: `scroll-cta ${className}`,
    "data-cursor": cursorLabel,
    ...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {}),
  };

  const content = (
    <>
      <span>{label}</span>
      <ArrowRight
        className="cta-arrow w-4 h-4 shrink-0"
        aria-hidden="true"
        strokeWidth={1.5}
        style={accentColor ? { color: accentColor } : undefined}
      />
    </>
  );


  if (href) {
    return (
      <Link href={href} {...commonProps}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} {...commonProps}>
      {content}
    </button>
  );
}
