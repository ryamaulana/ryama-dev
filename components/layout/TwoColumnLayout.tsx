import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TwoColumnLayoutProps {
  leftContent: ReactNode;
  rightContent: ReactNode;
  className?: string;
  leftClassName?: string;
  rightClassName?: string;
}

/**
 * Split layout: scrollable left column + sticky right canvas panel.
 * The right column uses `position: sticky; top: 0; height: 100vh`
 * so the 3D canvas stays fixed while the left content scrolls.
 */
export function TwoColumnLayout({
  leftContent,
  rightContent,
  className,
  leftClassName,
  rightClassName,
}: TwoColumnLayoutProps) {
  return (
    <div className={cn("flex flex-col lg:flex-row w-full", className)}>
      {/* Left: scrollable content column */}
      <div
        className={cn(
          "w-full lg:w-1/2 z-10",
          leftClassName
        )}
      >
        {leftContent}
      </div>

      {/* Right: sticky 3D canvas — stays in viewport as left scrolls */}
      <div
        className={cn(
          "hidden lg:block w-full lg:w-1/2 z-0",
          rightClassName
        )}
        style={{ position: "sticky", top: 0, height: "100vh", alignSelf: "flex-start" }}
      >
        {rightContent}
      </div>
    </div>
  );
}
