import React, { useState, useEffect, useRef } from "react";

// Custom pixel colors using Tailwind's pixel theme
const pixelColors = [
  "bg-pixel-teal",
  "bg-pixel-pink",
  "bg-pixel-yellow",
  "bg-pixel-blue",
  "bg-pixel-magenta",
];

// Type for Pixel props
interface PixelProps {
  delay: number;
  color: string;
  animation: string;
  isVisible: boolean;
}

// One pixel with dynamic animation
const Pixel: React.FC<PixelProps> = ({
  delay,
  color,
  animation,
  isVisible,
}) => (
  <div
    className={`w-4 h-4 ${color} rounded-[3px] mx-[3px] my-[3px] shadow-md ${animation} ${
      isVisible ? "" : "opacity-0"
    }`}
    style={{
      animationDelay: `${delay}s`,
      boxShadow: "0 3px 0 #FF7BDF",
    }}
  />
);

const PixelAnimation: React.FC = () => {
  const rows = 8;
  const cols = 13;
  const pixelSize = 16; // Pixel width/height in pixels
  const gridWidth = cols * (pixelSize + 6); // Including 3px margin on each side
  const gridHeight = rows * (pixelSize + 6);

  const [animation, setAnimation] = useState<
    "animate-fall-in" | "animate-pixel-float" | ""
  >("animate-fall-in");
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [gameState, setGameState] = useState<"initial" | "playing" | "won">(
    "initial"
  );
  const [activePixels, setActivePixels] = useState<[number, number][]>([]);
  const [paddleState, setPaddleState] = useState({
    x: gridWidth / 2 - 40,
    y: gridHeight + 20,
    width: 80,
    height: 10,
  });
  const ballRef = useRef({
    x: gridWidth / 2,
    y: gridHeight - 30,
    radius: 5,
    dx: 2.5,
    dy: -2.5,
    isHorizontal: false,
    horizontalTime: 0,
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  // Initialize pixels and switch to float animation
  useEffect(() => {
    const delayPerPixel = 0.1;
    const aPixelCount = 34;
    const fallDuration = aPixelCount * delayPerPixel + 3; // 6.4s
    const timer = setTimeout(() => {
      setAnimation("animate-pixel-float");
      setShowPlayButton(true);
      // Initialize active pixels (all "A" pixels)
      const pixels: [number, number][] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 2; c <= 10; c++) {
          if (isPixelInA(r, c)) {
            pixels.push([r, c]);
          }
        }
      }
      setActivePixels(pixels);
    }, fallDuration * 1000);

    return () => clearTimeout(timer);
  }, []);

  // Game loop
  useEffect(() => {
    if (gameState !== "playing" || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d")!;
    const ball = ballRef.current;
    const paddle = paddleState;
    const frameTime = 1 / 60; // Assume 60 FPS

    const updateGame = () => {
      // Clear canvas
      ctx.clearRect(0, 0, gridWidth, gridHeight + 30);

      // Update ball position
      ball.x += ball.dx;
      ball.y += ball.dy;

      // Update horizontal mode timer
      if (ball.isHorizontal) {
        ball.horizontalTime += frameTime;
        if (ball.horizontalTime > 0.5) {
          // Reduced to 0.5s for less disruption
          ball.isHorizontal = false;
          ball.dy = -2.5;
          ball.radius = 5;
          ball.horizontalTime = 0;
        }
      }

      // Wall collisions
      if (ball.x + ball.radius > gridWidth || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
      }
      if (!ball.isHorizontal && ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
      }
      // Reset ball if it goes below grid
      if (ball.y + ball.radius > gridHeight + 30) {
        ball.x = gridWidth / 2;
        ball.y = gridHeight - 30;
        ball.dx = 2.5 * (Math.random() > 0.5 ? 1 : -1); // Randomize direction
        ball.dy = -2.5;
        ball.isHorizontal = false;
        ball.horizontalTime = 0;
        ball.radius = 5;
      }

      // Paddle collision (rectangle-circle)
      const closestX = Math.max(
        paddle.x,
        Math.min(ball.x, paddle.x + paddle.width)
      );
      const closestY = Math.max(
        paddle.y,
        Math.min(ball.y, paddle.y + paddle.height)
      );
      const distX = ball.x - closestX;
      const distY = ball.y - closestY;
      const distance = Math.sqrt(distX * distX + distY * distY);
      if (distance <= ball.radius) {
        // Improved paddle collision: adjust angle based on hit position
        const hitPos = (ball.x - paddle.x) / paddle.width; // 0 to 1
        const angle = (hitPos - 0.5) * Math.PI * 0.5; // -45 to 45 degrees
        const speed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy) || 3.5;
        ball.dx = speed * Math.sin(angle);
        ball.dy = -speed * Math.cos(angle);
        if (ball.isHorizontal) {
          ball.isHorizontal = false;
          ball.radius = 5;
          ball.horizontalTime = 0;
        }
      }

      // Pixel (brick) collisions with improved detection
      setActivePixels((prev) => {
        const newPixels = prev.filter(([r, c]) => {
          const pixelX = c * (pixelSize + 6) + 3;
          const pixelY = r * (pixelSize + 6) + 3; // Removed -40 translation
          const pixelRight = pixelX + pixelSize;
          const pixelBottom = pixelY + pixelSize;

          // AABB collision check for more reliable detection
          const ballLeft = ball.x - ball.radius;
          const ballRight = ball.x + ball.radius;
          const ballTop = ball.y - ball.radius;
          const ballBottom = ball.y + ball.radius;

          if (
            ballRight > pixelX &&
            ballLeft < pixelRight &&
            ballBottom > pixelY &&
            ballTop < pixelBottom
          ) {
            // Determine collision side based on ball's direction
            const dx = ball.x - (pixelX + pixelSize / 2);
            const dy = ball.y - (pixelY + pixelSize / 2);
            if (Math.abs(dx) > Math.abs(dy)) {
              ball.dx = -ball.dx;
            } else {
              if (!ball.isHorizontal) {
                ball.dy = -ball.dy;
              }
            }
            if (r <= 3 && !ball.isHorizontal) {
              // Upper half hit: go horizontal briefly
              ball.radius = 3;
              ball.dy = 0;
              ball.isHorizontal = true;
              ball.horizontalTime = 0;
            }
            console.log(`Hit pixel at row ${r}, col ${c}`); // Debug log
            return false; // Remove pixel
          }
          return true;
        });

        // Reset pixels on win
        if (newPixels.length === 0) {
          const pixels: [number, number][] = [];
          for (let r = 0; r < rows; r++) {
            for (let c = 2; c <= 10; c++) {
              if (isPixelInA(r, c)) {
                pixels.push([r, c]);
              }
            }
          }
          return pixels; // Reset instead of setting "won"
        }
        return newPixels;
      });

      // Draw paddle
      ctx.fillStyle = "#FF7BDF"; // pixel-pink
      ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

      // Draw ball
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#ffda41"; // pixel-yellow
      ctx.fill();
      ctx.closePath();

      animationFrameRef.current = requestAnimationFrame(updateGame);
    };

    // Start game loop
    animationFrameRef.current = requestAnimationFrame(updateGame);

    // Mouse movement for paddle
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvasRef.current!.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      setPaddleState((prev) => ({
        ...prev,
        x: Math.max(
          0,
          Math.min(mouseX - prev.width / 2, gridWidth - prev.width)
        ),
      }));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameState, paddleState]);

  // Define the pixel pattern for the capital A
  const isPixelInA = (r: number, c: number): boolean => {
    const adjustedCol = c - 2;
    if (adjustedCol < 0 || adjustedCol > 8) return false;
    return (
      (r === 0 && adjustedCol >= 3 && adjustedCol <= 5) ||
      (r === 1 &&
        (adjustedCol === 2 ||
          adjustedCol === 3 ||
          adjustedCol === 5 ||
          adjustedCol === 6)) ||
      (((r >= 2 && r <= 3) || (r >= 5 && r <= 7)) &&
        (adjustedCol === 1 ||
          adjustedCol === 2 ||
          adjustedCol === 6 ||
          adjustedCol === 7)) ||
      (r === 4 && adjustedCol >= 1 && adjustedCol <= 7)
    );
  };

  // Define falling order for A pixels
  const aPixels: [number, number][] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 2; c <= 10; c++) {
      if (isPixelInA(r, c)) {
        aPixels.push([r, c]);
      }
    }
  }

  // Map each pixel to its falling index
  const getFallIndex = (r: number, c: number): number => {
    if (!isPixelInA(r, c)) return -1;
    return aPixels.findIndex(([ar, ac]) => ar === r && ac === c);
  };

  const startGame = () => {
    setGameState("playing");
    setShowPlayButton(false);
    setAnimation(""); // Stop wave animation
  };

  return (
    <div
      className="flex flex-col items-center w-full mb-8 relative select-none"
      aria-hidden
    >
      {/* Pixel Grid and Canvas Container */}
      <div
        className="relative"
        style={{ width: gridWidth, height: gridHeight + 30 }}
      >
        {/* Pixel Grid */}
        <div
          className={`inline-flex flex-col transition-transform duration-500 ${
            gameState === "playing" ? "-translate-y-10" : ""
          }`}
          style={{ width: gridWidth, height: gridHeight }}
        >
          {Array.from({ length: rows }).map((_, r) => (
            <div key={r} className="flex">
              {Array.from({ length: cols }).map((_, c) => {
                const color = pixelColors[(r + c) % pixelColors.length];
                const fallIndex = getFallIndex(r, c);
                const fallDelay = fallIndex >= 0 ? fallIndex * 0.1 : 0;
                const floatDelay = ((c + r * 1.1) % cols) * 0.09;
                const isVisible =
                  gameState === "playing"
                    ? activePixels.some(([ar, ac]) => ar === r && ac === c)
                    : isPixelInA(r, c);
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
        {/* Canvas for paddle and ball */}
        {gameState === "playing" && (
          <canvas
            ref={canvasRef}
            width={gridWidth}
            height={gridHeight + 30}
            className="absolute top-0 left-0"
            style={{ pointerEvents: "auto" }}
          />
        )}
      </div>
      {/* Play Button */}
      {showPlayButton && (
        <button
          onClick={startGame}
          className="mt-4 px-4 py-1 bg-pixel-teal text-pixel-white font-pixel text-xs rounded-sm shadow-sm animate-button-appear hover:bg-pixel-blue transition-colors"
        >
          Play
        </button>
      )}
    </div>
  );
};

export default PixelAnimation;
