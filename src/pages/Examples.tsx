import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";

interface ExampleCard {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const ExamplesPage = () => {
  // Mock data for examples
  const examples: ExampleCard[] = [
    {
      id: 'platformer',
      title: 'Simple Platformer',
      description: 'Learn how to create a basic platformer game with gravity, jumping, and collision detection.',
      image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
      category: 'platformer',
      difficulty: 'beginner',
    },
    {
      id: 'space-shooter',
      title: 'Space Shooter',
      description: 'Build a classic space shooter with enemies, projectiles, and power-ups.',
      image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
      category: 'shooter',
      difficulty: 'intermediate',
    },
    {
      id: 'puzzle-game',
      title: 'Puzzle Game',
      description: 'Create a tile-matching puzzle game with animations and scoring.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
      category: 'puzzle',
      difficulty: 'intermediate',
    },
    {
      id: 'rpg-battle',
      title: 'RPG Battle System',
      description: 'Implement a turn-based battle system with characters, abilities, and stats.',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
      category: 'rpg',
      difficulty: 'advanced',
    },
    {
      id: 'physics-playground',
      title: 'Physics Playground',
      description: 'Experiment with the physics engine to create interactive objects and environments.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
      category: 'physics',
      difficulty: 'beginner',
    },
    {
      id: 'isometric-game',
      title: 'Isometric Game',
      description: 'Learn how to create an isometric game with tile-based movement and depth sorting.',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
      category: 'isometric',
      difficulty: 'advanced',
    },
  ];

  // Filter options
  const categories = ['All', 'platformer', 'shooter', 'puzzle', 'rpg', 'physics', 'isometric'];
  const difficulties = ['All', 'beginner', 'intermediate', 'advanced'];

  return (
    <div className="bg-pixel-navy min-h-screen w-full">
      <div className="container py-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 font-pixel pixel-shadow text-pixel-yellow drop-shadow-md">Examples & Demos</h1>
          <p className="text-xl text-muted-foreground">
            Explore practical examples to learn how to use PixelPortal in your games
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <div>
            <p className="text-sm font-medium mb-2 font-pixel text-pixel-pink">Category</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-3 py-1 text-sm rounded-full ${
                    category === 'All' 
                      ? 'bg-game-primary text-white' 
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium mb-2 font-pixel text-pixel-pink">Difficulty</p>
            <div className="flex flex-wrap gap-2">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  className={`px-3 py-1 text-sm rounded-full ${
                    difficulty === 'All' 
                      ? 'bg-game-primary text-white' 
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Example Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {examples.map((example) => (
            <Link to={`/examples/${example.id}`} key={example.id}>
              <Card className="game-card h-full">
                <div className="relative h-48 overflow-hidden rounded-t-xl">
                  <img 
                    src={example.image} 
                    alt={example.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                      example.difficulty === 'beginner' ? 'bg-green-100 text-green-800' : 
                      example.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {example.difficulty}
                    </span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold mb-2 font-pixel text-pixel-teal">{example.title}</h3>
                  <p className="text-muted-foreground text-sm">{example.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs bg-muted px-2 py-1 rounded-full">
                      {example.category}
                    </span>
                    <span className="text-sm text-game-primary font-medium">View Details</span>
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
