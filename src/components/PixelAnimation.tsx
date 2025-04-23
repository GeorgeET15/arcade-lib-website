// PixelAnimation.tsx
import React, { useState, useEffect } from "react";

// Custom pixel colors using Tailwind's pixel theme
const pixelColors = [
  "bg-pixel-teal",
  "bg-pixel-pink",
  "bg-pixel-yellow",
  "bg-pixel-blue",
  "bg-pixel-magenta",
];

// One pixel with dynamic animation
const Pixel = ({
  delay,
  color,
  animation,
  isVisible,
}: {
  delay: number;
  color: string;
  animation: string;
  isVisible: boolean;
}) => (
  <div
    className={`w-3 h-3 ${color} rounded-[2px] mx-[2px] my-[2px] shadow-md ${animation} ${
      isVisible ? "" : "opacity-0"
    }`}
    style={{
      animationDelay: `${delay}s`,
      boxShadow: "0 2px 0 #FF7BDF", // Pink shadow
    }}
  />
);

export default function PixelAnimation() {
  const rows = 8;
  const cols = 13;
  const [animation, setAnimation] = useState("animate-fall-in");

  // Switch to float animation after fall-in completes
  useEffect(() => {
    const delayPerPixel = 0.1; // Delay between each A pixel's fall
    const aPixelCount = 34; // Number of pixels in A
    const fallDuration = aPixelCount * delayPerPixel + 3; // 3.4s delays + 3s animation
    const timer = setTimeout(() => {
      setAnimation("animate-pixel-float");
    }, fallDuration * 1000); // Convert to ms

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  // Define the pixel pattern for the capital A in a 8x9 subgrid (cols 2-10)
  const isPixelInA = (r: number, c: number): boolean => {
    // Adjust column to center 8x9 grid (cols 2-10)
    const adjustedCol = c - 2;
    if (adjustedCol < 0 || adjustedCol > 8) return false;

    // 8x9 pixel A pattern:
    // Row 0: 0 0 0 1 1 1 0 0 0  (cols 5-7)
    // Row 1: 0 0 1 1 0 1 1 0 0  (cols 4-5, 6-7)
    // Row 2: 0 1 1 0 0 0 1 1 0  (cols 3-4, 7-8)
    // Row 3: 0 1 1 0 0 0 1 1 0  (cols 3-4, 7-8)
    // Row 4: 0 1 1 1 1 1 1 1 0  (cols 3-9)
    // Row 5: 0 1 1 0 0 0 1 1 0  (cols 3-4, 7-8)
    // Row 6: 0 1 1 0 0 0 1 1 0  (cols 3-4, 7-8)
    // Row 7: 0 1 1 0 0 0 1 1 0  (cols 3-4, 7-8)
    return (
      (r === 0 && adjustedCol >= 3 && adjustedCol <= 5) || // Apex (cols 5-7)
      (r === 1 &&
        (adjustedCol === 2 ||
          adjustedCol === 3 ||
          adjustedCol === 5 ||
          adjustedCol === 6)) || // Sides (cols 4-5, 6-7)
      (((r >= 2 && r <= 3) || (r >= 5 && r <= 7)) &&
        (adjustedCol === 1 ||
          adjustedCol === 2 ||
          adjustedCol === 6 ||
          adjustedCol === 7)) || // Sides (cols 3-4, 7-8)
      (r === 4 && adjustedCol >= 1 && adjustedCol <= 7) // Crossbar (cols 3-9)
    );
  };

  // Define falling order for A pixels (top to bottom, left to right)
  const aPixels: [number, number][] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 2; c <= 10; c++) {
      if (isPixelInA(r, c)) {
        aPixels.push([r, c]);
      }
    }
  }

  // Map each pixel to its falling index (-1 for non-A pixels)
  const getFallIndex = (r: number, c: number): number => {
    if (!isPixelInA(r, c)) return -1;
    return aPixels.findIndex(([ar, ac]) => ar === r && ac === c);
  };

  return (
    <div
      className="flex flex-col items-center w-full mb-8 relative select-none"
      aria-hidden
    >
      <div className="inline-flex flex-col">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="flex">
            {Array.from({ length: cols }).map((_, c) => {
              // Cycle colors for all pixels, A pixels will be visible
              const color = pixelColors[(r + c) % pixelColors.length];
              const fallIndex = getFallIndex(r, c);
              const fallDelay = fallIndex >= 0 ? fallIndex * 0.1 : 0; // 0s, 0.1s, ..., 3.3s for A pixels
              const floatDelay = ((c + r * 1.1) % cols) * 0.09; // Float wave delay
              const isVisible = isPixelInA(r, c);
              const currentAnimation =
                animation === "animate-fall-in" && fallIndex < 0
                  ? ""
                  : animation;
              return (
                <Pixel
                  key={c}
                  delay={
                    animation === "animate-fall-in" ? fallDelay : floatDelay
                  }
                  color={color}
                  animation={currentAnimation}
                  isVisible={isVisible}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
