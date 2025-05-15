import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface GameCard {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  screenshots: string[];
  repoLink: string;
  features: string[];
}

const Examples = () => {
  const videos = [
    {
      id: "setup-demo-project",
      title: "Demo Project Setup",
      src: "/videos/Demo Project Setup.mp4",
      poster: "/images/Demo_Project_Setup.png",
    },
    {
      id: "setup-blank-project",
      title: "Blank Project Setup",
      src: "/videos/Blank Project Setup.mp4",
      poster: "/images/Blank_Project_Setup.png",
    },
    {
      id: "install-ide",
      title: "Installing and Setting up the IDE",
      src: "/videos/IDE Install and Setup.mp4",
      poster: "/images/Ide.png",
    },
  ];

  const [selectedGame, setSelectedGame] = useState<GameCard | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handlePrev = () => {
    setCarouselIndex((prev) =>
      prev === 0 ? (selectedGame?.screenshots.length || 1) - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCarouselIndex((prev) =>
      prev === (selectedGame?.screenshots.length || 1) - 1 ? 0 : prev + 1
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;
    if (deltaX > 50) handlePrev(); // Swipe right
    else if (deltaX < -50) handleNext(); // Swipe left
    setTouchStartX(null);
  };

  return (
    <div className="bg-gradient-to-b from-pixel-navy to-pixel-dark min-h-screen w-full flex flex-col items-center">
      <div className="container py-8 px-2 sm:px-4 max-w-7xl">
        <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-4 font-pixel text-pixel-yellow drop-shadow-[2px_2px_0_#ff00ff] tracking-wide">
            Arcade Examples
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-pixel-light font-sans leading-relaxed">
            Learn Arcade with setup guides and playable game demos
          </p>
        </div>

        {/* Videos Section */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-pixel-teal font-pixel text-center">
            Setup Tutorials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {videos.map((video) => (
              <div key={video.id} className="flex flex-col items-center">
                <div className="w-full max-w-full aspect-video bg-pixel-dark border-4  rounded-lg overflow-hidden ">
                  <video
                    src={video.src}
                    poster={video.poster}
                    controls
                    className="w-full h-full object-contain"
                  >
                    <source src={video.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold text-pixel-yellow font-pixel">
                  {video.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Examples;
