import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PixelAnimation from "../components/PixelAnimation";

const HomePage = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="h-screen w-screen bg-pixel-dark relative overflow-hidden flex items-center justify-center">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left space-y-6">
              <h1
                className="text-4xl md:text-6xl font-pixel pixel-shadow tracking-widest text-pixel-teal drop-shadow-[0_6px_0px_rgba(0,0,0,0.7)] uppercase"
                style={{ letterSpacing: "4px" }}
              >
                ARCADE
              </h1>
              <div className="text-pixel-teal block text-lg font-sans">
                Awesome Rendering Control And Dynamics Engine
              </div>
              <p className="text-xl text-pixel-yellow font-sans">
                A powerful, lightweight 2D game development library for C
                programmers
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
                <Link to="/docs">
                  <Button
                    size="lg"
                    className="bg-pixel-yellow hover:bg-pixel-pink text-pixel-dark border-2 border-pixel-pink font-pixel rounded-none shadow-[0_4px_0_#FF7BDF]"
                  >
                    Get Started
                  </Button>
                </Link>
                <Link to="https://github.com/GeorgeET15">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-pixel-yellow border-pixel-yellow hover:bg-pixel-yellow hover:text-pixel-dark"
                  >
                    View Source
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <PixelAnimation />
            </div>
          </div>
          <div className="md:hidden mt-8">
            <PixelAnimation />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-14 md:py-20 bg-pixel-navy border-t-4 border-pixel-pink">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4 text-pixel-blue font-sans">
              Advanced Features for Game Creators
            </h2>
            <p className="text-lg text-pixel-white font-sans">
              Comprehensive tools for crafting high-performance 2D games in C
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-pixel-dark border-pixel-teal pixel-border">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-pixel-teal/20 text-pixel-teal flex items-center justify-center mb-4 pixel-border border-2 border-pixel-teal">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-pixel-teal font-sans">
                  Cross-Platform Rendering
                </h3>
                <p className="text-pixel-light font-sans">
                  Efficient X11 and Win32 rendering for rapid, low-latency 2D
                  visuals on Linux and Windows
                </p>
              </CardContent>
            </Card>
            <Card className="bg-pixel-dark border-pixel-yellow pixel-border">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-pixel-yellow/20 text-pixel-yellow flex items-center justify-center mb-4 pixel-border border-2 border-pixel-yellow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" x2="12" y1="8" y2="12" />
                    <line x1="12" x2="12.01" y1="16" y2="16" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-pixel-teal font-sans">
                  Core Physics
                </h3>
                <p className="text-pixel-light font-sans">
                  Integrated physics for seamless collision and motion handling
                </p>
              </CardContent>
            </Card>
            <Card className="bg-pixel-dark border-pixel-pink pixel-border">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-pixel-pink/20 text-pixel-pink flex items-center justify-center mb-4 pixel-border border-2 border-pixel-pink">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-pixel-teal font-sans">
                  Sprite Dynamics
                </h3>
                <p className="text-pixel-light font-sans">
                  Robust system for sprite animation and transformation
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Code Example Section */}
      <section className="py-14 md:py-20 bg-pixel-dark border-t-4 border-pixel-yellow">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-pixel-pink font-sans">
                Streamlined and Optimized
              </h2>
              <p className="text-pixel-light mb-6 font-sans">
                Efficient C API for high-performance game development with
                minimal dependencies
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-pixel-teal/30 text-pixel-teal flex items-center justify-center mt-0.5 pixel-border border border-pixel-teal">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
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
                  <div>
                    <h3 className="text-lg font-medium text-pixel-teal font-sans">
                      Pure C Implementation
                    </h3>
                    <p className="text-pixel-light text-sm font-sans">
                      Lightweight library with native X11 and Win32 integration
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-pixel-teal/30 text-pixel-teal flex items-center justify-center mt-0.5 pixel-border border border-pixel-teal">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
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
                  <div>
                    <h3 className="text-lg font-medium text-pixel-teal font-sans">
                      Extensive Documentation
                    </h3>
                    <p className="text-pixel-light text-sm font-sans">
                      In-depth guides and API references for developers
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-pixel-teal/30 text-pixel-teal flex items-center justify-center mt-0.5 pixel-border border border-pixel-teal">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
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
                  <div>
                    <h3 className="text-lg font-medium text-pixel-teal font-sans">
                      Open Source Ecosystem
                    </h3>
                    <p className="text-pixel-light text-sm font-sans">
                      Collaborate with developers building retro games with
                      ARCADE
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="code-block">
              <pre className="language-c text-sm font-code bg-pixel-navy text-pixel-pink border-pixel-pink border-2 rounded-none px-4 py-6 pixel-border">
                <code>
                  {`#include "arcade.h"

int main() {
    // Initialize game window
    arcade_init(800, 600, "My Game", 0x000000);
    
    // Create player sprite
    ArcadeSprite player = {
        .x = 400, .y = 300,
        .width = 50, .height = 50,
        .color = 0xFF0000, // Red
        .active = 1
    };

    // Game loop
    while (arcade_running() && arcade_update()) {
        // Handle player movement
        if (arcade_key_pressed(a_right)) 
            player.x += 5;
        
        // Render scene
        arcade_render_scene(&player, 1, 
            &(int){SPRITE_COLOR});
    }

    // Cleanup
    arcade_quit();
    return 0;
}`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 md:py-20 bg-pixel-pink text-pixel-dark border-t-4 border-pixel-teal">
        <div className="container text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 font-pixel text-pixel-yellow pixel-shadow uppercase tracking-widest"
            style={{ letterSpacing: "4px" }}
          >
            Start Coding Games
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8 font-sans font-bold">
            Join game developers creating retro-style 2D games with ARCADE
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/docs">
              <Button
                size="lg"
                variant="secondary"
                className="bg-pixel-yellow text-pixel-dark border-2 border-pixel-teal hover:bg-pixel-teal hover:text-pixel-yellow hover:border-pixel-yellow font-pixel rounded-none"
              >
                Get Started
              </Button>
            </Link>
            <Link to="/examples">
              <Button
                size="lg"
                variant="secondary"
                className="bg-pixel-yellow text-pixel-dark border-2 border-pixel-teal hover:bg-pixel-teal hover:text-pixel-yellow hover:border-pixel-yellow font-pixel rounded-none"
              >
                View Examples
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Arcade IDE Future Section */}
      <section className="py-14 md:py-20 bg-pixel-dark border-t-4 border-pixel-yellow">
        <div className="container">
          <div className="max-w-4xl mx-auto rounded-lg border-4 border-pixel-pink pixel-border bg-pixel-navy/80 p-10 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
            <div className="flex-1 text-left">
              <h2 className="text-3xl font-pixel text-pixel-yellow mb-4 pixel-shadow uppercase">
                Arcade IDE{" "}
                <span className="text-lg bg-pixel-pink/30 px-2 rounded text-pixel-dark font-pixel uppercase ml-2 align-middle">
                  Coming Soon
                </span>
              </h2>
              <p className="text-lg text-pixel-white mb-4 font-sans">
                Accelerate C game development: Arcade IDE is a tailored code
                editor for ARCADE, enhancing creativity and efficiency!
              </p>
              <ul className="list-disc pl-6 text-pixel-light space-y-2">
                <li>
                  <span className="font-bold text-pixel-yellow">
                    VS Code–Style Interface:
                  </span>
                  <span>
                    {" "}
                    Code and execute C in a user-friendly environment with
                    syntax highlighting and project navigation.
                  </span>
                </li>
                <li>
                  <span className="font-bold text-pixel-teal">
                    AI-Powered Sprite Tools:
                  </span>
                  <span>
                    {" "}
                    Create pixel art sprites or remove backgrounds effortlessly
                    with integrated AI features.
                  </span>
                </li>
                <li>
                  <span className="font-bold text-pixel-pink">
                    AI Coding Assistant:
                  </span>
                  <span>
                    {" "}
                    Receive instant C code support and guidance, leveraging
                    ARCADE’s documentation and expertise.
                  </span>
                </li>
              </ul>
              <p className="mt-6 text-pixel-yellow font-mono">
                Your ultimate ARCADE workflow — arriving soon!
              </p>
            </div>
            <div className="md:w-80 w-full flex-shrink-0 flex items-center justify-center">
              {/* Fake editor mockup */}
              <div className="rounded-lg shadow-lg bg-[#101725] border-2 border-pixel-yellow px-4 py-3 relative w-full max-w-xs">
                <div className="flex gap-1 mb-2">
                  <span className="w-3 h-3 rounded-full bg-pixel-pink inline-block" />
                  <span className="w-3 h-3 rounded-full bg-pixel-yellow inline-block" />
                  <span className="w-3 h-3 rounded-full bg-pixel-teal inline-block" />
                </div>
                <div className="text-xs font-mono text-pixel-light max-h-40 overflow-auto">
                  {`// Arcade IDE (future)
#include "arcade.h"

int main() {
    arcade_init(640, 480, "ARCADE IDE", 0x000000);
    // Your code goes here!
    return 0;
}
`}
                </div>
                <div className="absolute right-3 bottom-2 flex items-center gap-2">
                  <span className="bg-pixel-pink/80 rounded px-2 text-xs font-bold text-pixel-dark drop-shadow">
                    AI
                  </span>
                  <span className="bg-pixel-teal/80 rounded px-2 text-xs font-bold text-pixel-dark drop-shadow">
                    Sprite
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
