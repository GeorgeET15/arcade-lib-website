import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

interface ExampleCard {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

const ExamplesPage = () => {
  // Mock data for examples
  const examples: ExampleCard[] = [
    {
      id: "platformer",
      title: "Simple Platformer",
      description:
        "Learn how to create a basic platformer game with gravity, jumping, and collision detection.",
      image:
        "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
      category: "platformer",
      difficulty: "beginner",
    },
    {
      id: "space-shooter",
      title: "Space Shooter",
      description:
        "Build a classic space shooter with enemies, projectiles, and power-ups.",
      image:
        "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
      category: "shooter",
      difficulty: "intermediate",
    },
    {
      id: "puzzle-game",
      title: "Puzzle Game",
      description:
        "Create a tile-matching puzzle game with animations and scoring.",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
      category: "puzzle",
      difficulty: "intermediate",
    },
    {
      id: "rpg-battle",
      title: "RPG Battle System",
      description:
        "Implement a turn-based battle system with characters, abilities, and stats.",
      image:
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
      category: "rpg",
      difficulty: "advanced",
    },
    {
      id: "physics-playground",
      title: "Physics Playground",
      description:
        "Experiment with the physics engine to create interactive objects and environments.",
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
      category: "physics",
      difficulty: "beginner",
    },
    {
      id: "isometric-game",
      title: "Isometric Game",
      description:
        "Learn how to create an isometric game with tile-based movement and depth sorting.",
      image:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80",
      category: "isometric",
      difficulty: "advanced",
    },
  ];

  // Filter options
  const categories = [
    "All",
    "platformer",
    "shooter",
    "puzzle",
    "rpg",
    "physics",
    "isometric",
  ];
  const difficulties = ["All", "beginner", "intermediate", "advanced"];

  return (
    <div className="bg-pixel-navy min-h-screen w-full flex flex-col items-center">
      <div className="container py-12 px-4 max-w-6xl">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 font-pixel pixel-shadow text-pixel-yellow drop-shadow-md">
            Examples & Demos
          </h1>
          <p className="text-xl text-pixel-light font-sans">
            Explore practical examples to learn how to use ARCADE in your games
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-6 mb-10 justify-center">
          <div>
            <p className="text-sm font-medium mb-2 font-pixel text-pixel-pink">
              Category
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-1.5 text-sm rounded-none font-pixel border-2 ${
                    category === "All"
                      ? "bg-pixel-teal text-pixel-dark border-pixel-pink"
                      : "bg-pixel-dark text-pixel-light border-pixel-yellow hover:bg-pixel-yellow hover:text-pixel-dark"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2 font-pixel text-pixel-pink">
              Difficulty
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  className={`px-4 py-1.5 text-sm rounded-none font-pixel border-2 ${
                    difficulty === "All"
                      ? "bg-pixel-teal text-pixel-dark border-pixel-pink"
                      : "bg-pixel-dark text-pixel-light border-pixel-yellow hover:bg-pixel-yellow hover:text-pixel-dark"
                  }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Example Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {examples.map((example) => (
            <Link to={`/examples/${example.id}`} key={example.id}>
              <Card className="bg-pixel-dark border-2 border-pixel-teal h-full transition-transform hover:scale-105">
                <div className="relative h-48 overflow-hidden rounded-t-[8px]">
                  <img
                    src={example.image}
                    alt={example.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-2 right-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-none font-pixel border-2 ${
                        example.difficulty === "beginner"
                          ? "bg-pixel-teal text-pixel-dark border-pixel-pink"
                          : example.difficulty === "intermediate"
                          ? "bg-pixel-yellow text-pixel-dark border-pixel-pink"
                          : "bg-pixel-pink text-pixel-dark border-pixel-yellow"
                      }`}
                    >
                      {example.difficulty}
                    </span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold mb-2 font-pixel text-pixel-teal">
                    {example.title}
                  </h3>
                  <p className="text-pixel-light text-sm font-sans">
                    {example.description}
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs bg-pixel-navy px-2 py-1 rounded-none font-pixel text-pixel-yellow border border-pixel-pink">
                      {example.category}
                    </span>
                    <span className="text-sm text-pixel-pink font-pixel hover:text-pixel-yellow">
                      View Details
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamplesPage;
