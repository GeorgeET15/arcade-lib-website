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

const ExamplesPage = () => {
  // Video data
  const videos = [
    {
      id: "setup-project",
      title: "Setting up a Project",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder YouTube embed URL
    },
    {
      id: "install-ide",
      title: "Installing the IDE and Setting it up",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder YouTube embed URL
    },
  ];

  // Game data
  const games: GameCard[] = [
    {
      id: "asteroids",
      title: "Asteroids",
      description:
        "A classic space shooter where you control a spaceship, shoot asteroids, and avoid collisions in a thrilling arcade experience.",
      thumbnail:
        "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
      screenshots: [
        "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
      ],
      repoLink: "https://github.com/arcade-games/asteroids",
      features: [
        "Player movement and rotation using arrow keys",
        "Shooting mechanics with spacebar",
        "Collision detection and scoring",
        "Game states (Start, Playing, Game Over)",
      ],
    },
    {
      id: "paddleball",
      title: "Paddleball",
      description:
        "A breakout-style game where you bounce a ball with a paddle to break bricks, aiming to clear the screen.",
      thumbnail:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
      screenshots: [
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
      ],
      repoLink: "https://github.com/arcade-games/paddleball",
      features: [
        "Paddle movement with arrow keys",
        "Ball physics with bouncing mechanics",
        "Brick-breaking and scoring",
        "Game states (Start, Playing, Won, Lost)",
      ],
    },
    {
      id: "flappy-bird",
      title: "Flappy Bird",
      description:
        "A clone of Flappy Bird where you navigate a bird through a series of pipes by flapping with the spacebar.",
      thumbnail:
        "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
      screenshots: [
        "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
        "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
      ],
      repoLink: "https://github.com/arcade-games/flappy-bird",
      features: [
        "Bird movement with spacebar to flap",
        "Randomly generated pipes for endless gameplay",
        "Collision detection with pipes and ground",
        "Scoring based on pipes passed",
      ],
    },
    {
      id: "super-jump-adventure",
      title: "Super Jump Adventure",
      description:
        "A 2D platformer where you jump, shoot, and navigate platforms to reach a flag while avoiding enemies.",
      thumbnail:
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
      screenshots: [
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
        "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
      ],
      repoLink: "https://github.com/arcade-games/super-jump-adventure",
      features: [
        "Player movement (left/right), jumping (double jump), and shooting with spacebar",
        "Platform navigation with coyote time for better jump mechanics",
        "Enemies that patrol platforms and can be defeated with bullets",
        "Game states (Start, Playing, Won, Lost) with best-time tracking",
        "Sprite animations for player and enemies",
      ],
    },
  ];

  // Dialog state
  const [selectedGame, setSelectedGame] = useState<GameCard | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Handle carousel navigation
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

  return (
    <div className="bg-gradient-to-b from-pixel-navy to-pixel-dark min-h-screen w-full flex flex-col items-center">
      <div className="container py-16 px-4 max-w-7xl">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 font-pixel text-pixel-yellow drop-shadow-[2px_2px_0_#ff00ff] tracking-wide">
            Arcade Examples
          </h1>
          <p className="text-lg sm:text-xl text-pixel-light font-sans leading-relaxed">
            Learn Arcade with setup guides and playable game demos
          </p>
        </div>

        {/* Videos Section */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-pixel-teal font-pixel text-center">
            Setup Tutorials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((video) => (
              <div key={video.id} className="flex flex-col items-center">
                <div className="w-full aspect-video bg-pixel-dark border-4 border-pixel-teal/80 rounded-lg overflow-hidden shadow-[6px_6px_0_#ff00ff]">
                  <iframe
                    src={video.embedUrl}
                    title={video.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-pixel-yellow font-pixel">
                  {video.title}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Games Section */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-pixel-teal font-pixel text-center">
            Example Games
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {games.map((game) => (
              <Dialog.Root
                key={game.id}
                onOpenChange={(open) => {
                  if (open) {
                    setSelectedGame(game);
                    setCarouselIndex(0);
                  } else {
                    setSelectedGame(null);
                  }
                }}
              >
                <Dialog.Trigger asChild>
                  <Card className="bg-pixel-dark border-4 border-pixel-teal/80 h-full transition-all hover:scale-105 hover:border-pixel-yellow/80 shadow-[6px_6px_0_#ff00ff] cursor-pointer">
                    <div className="relative h-40 overflow-hidden rounded-t-[8px]">
                      <img
                        src={game.thumbnail}
                        alt={game.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-bold mb-2 font-pixel text-pixel-teal">
                        {game.title}
                      </h3>
                      <p className="text-pixel-light text-sm font-sans line-clamp-2">
                        {game.description}
                      </p>
                      <div className="mt-4">
                        <span className="text-sm text-pixel-pink font-pixel hover:text-pixel-yellow transition-colors">
                          View Details
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 bg-pixel-navy/80 backdrop-blur-sm z-50" />
                  <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-pixel-navy to-pixel-dark/90 border-4 border-pixel-teal/80 rounded-lg shadow-[6px_6px_0_#ff00ff] w-[90vw] max-w-3xl p-8 z-50 max-h-[95vh] overflow-y-auto">
                    <Dialog.Close className="absolute top-4 right-4 text-pixel-light hover:text-pixel-yellow">
                      <X className="h-8 w-8" />
                    </Dialog.Close>
                    {selectedGame && (
                      <div className="space-y-8">
                        {/* Carousel */}
                        <div className="relative">
                          <img
                            src={selectedGame.screenshots[carouselIndex]}
                            alt={`${selectedGame.title} screenshot ${
                              carouselIndex + 1
                            }`}
                            className="w-full h-80 object-cover rounded-lg border-4 border-pixel-teal/80 transition-opacity duration-300"
                          />
                          <button
                            onClick={handlePrev}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-pixel-dark/80 text-pixel-yellow p-3 rounded-full hover:bg-pixel-yellow hover:text-pixel-dark transition-colors"
                          >
                            <ChevronLeft className="h-8 w-8" />
                          </button>
                          <button
                            onClick={handleNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-pixel-dark/80 text-pixel-yellow p-3 rounded-full hover:bg-pixel-yellow hover:text-pixel-dark transition-colors"
                          >
                            <ChevronRight className="h-8 w-8" />
                          </button>
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                            {selectedGame.screenshots.map((_, index) => (
                              <span
                                key={index}
                                className={`h-3 w-3 rounded-full ${
                                  index === carouselIndex
                                    ? "bg-pixel-teal"
                                    : "bg-pixel-light/50"
                                } transition-colors`}
                              />
                            ))}
                          </div>
                        </div>
                        {/* Game Info */}
                        <div>
                          <h2 className="text-3xl font-extrabold mb-3 font-pixel text-pixel-yellow drop-shadow-[2px_2px_0_#ff00ff]">
                            {selectedGame.title}
                          </h2>
                          <p className="text-pixel-light text-lg font-sans mb-6 leading-relaxed">
                            {selectedGame.description}
                          </p>
                          <h3 className="text-xl font-bold mb-3 text-pixel-teal font-pixel">
                            Features
                          </h3>
                          <ul className="space-y-3 mb-6">
                            {selectedGame.features.map((feature, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-3 text-pixel-light text-base font-sans"
                              >
                                <div className="w-6 h-6 rounded-full bg-pixel-teal/20 text-pixel-teal flex items-center justify-center mt-0.5 flex-shrink-0">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <polyline points="20 6 9 17 4 12" />
                                  </svg>
                                </div>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                          <Button
                            asChild
                            className="bg-pixel-yellow text-pixel-dark font-pixel text-lg px-8 py-3 border-4 border-pixel-pink hover:bg-pixel-pink hover:text-pixel-yellow transition-colors"
                          >
                            <a
                              href={selectedGame.repoLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View on GitHub
                            </a>
                          </Button>
                        </div>
                      </div>
                    )}
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamplesPage;
