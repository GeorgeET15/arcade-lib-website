import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PixelAnimation from "../components/PixelAnimation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HomePage = () => {
  const [copied, setCopied] = useState(false);

  const codeContent = `npm install -g arcade-cli`;

  const displayContent = `# Install Arcade-CLI
npm install -g arcade-cli

# Initialize a demo project
arcade init my-game

# Build and run
cd my-game
make
make run`;
  const handleCopy = () => {
    navigator.clipboard.writeText(codeContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-[80vh] w-full bg-pixel-dark relative overflow-hidden flex items-center justify-center"
      >
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="text-center md:text-left space-y-4">
              <h1
                className="mt-5 text-3xl sm:text-4xl md:text-5xl font-pixel pixel-shadow tracking-widest text-pixel-teal drop-shadow-[0_4px_0px_rgba(0,0,0,0.7)] uppercase"
                style={{ letterSpacing: "3px" }}
              >
                ARCADE
              </h1>
              <div className="text-pixel-teal text-base sm:text-lg font-sans">
                Awesome Rendering Control And Dynamics Engine
              </div>
              <p className="text-lg sm:text-xl text-pixel-yellow font-sans">
                A powerful, lightweight 2D game development library for C
                programmers
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
                <Link to="/docs">
                  <Button
                    size="lg"
                    className="bg-pixel-yellow hover:bg-pixel-pink text-pixel-dark border-2 border-pixel-pink font-pixel rounded-none shadow-[0_3px_0_#FF7BDF] text-sm sm:text-base px-4 py-2"
                  >
                    Get Started
                  </Button>
                </Link>
                <Link to="https://github.com/GeorgeET15/arcade-lib/">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-pixel-yellow border-pixel-yellow hover:bg-pixel-yellow hover:text-pixel-dark text-sm sm:text-base px-4 py-2"
                  >
                    View Source
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mt-6 md:mt-0">
              <PixelAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* Arcade Ecosystem Section */}
      <section
        id="ecosystem"
        className="py-10 sm:py-14 md:py-16 bg-pixel-navy border-t-4 border-pixel-pink"
      >
        <div className="container px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-pixel-yellow font-pixel">
              The ARCADE Ecosystem
            </h2>
            <p className="text-base sm:text-lg text-pixel-white font-sans">
              A cohesive set of tools and community resources for retro 2D game
              development
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                title: "Arcade Library",
                description:
                  "Core C library for high-performance 2D game rendering, physics, and sprite management.",
                icon: <path d="M17 3h4v18h-4M7 3H3v18h4m10-18H7v18h10V3Z" />,
                color: "pixel-teal",
              },
              {
                title: "Arcade-CLI",
                description: "Command-line tool for project setup.",
                icon: (
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                ),
                color: "pixel-yellow",
              },
              {
                title: "Arcade IDE",
                description:
                  "IDE with AI-powered sprite generation, debugging, and code completion.",
                icon: (
                  <>
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <path d="M9 3v18" />
                    <path d="M15 3v18" />
                  </>
                ),
                color: "pixel-pink",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="bg-pixel-dark border-2 border-pixel-teal pixel-border"
              >
                <CardContent className="pt-5">
                  <div
                    className={`w-10 h-10 rounded-lg bg-${item.color}/20 text-${item.color} flex items-center justify-center mb-3 pixel-border border-2 border-${item.color}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {item.icon}
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-pixel-teal font-sans">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-pixel-light font-sans">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Code Example Section */}
      <section
        id="code-example"
        className="py-10 sm:py-14 md:py-16 bg-pixel-dark border-t-4 border-pixel-yellow"
      >
        <div className="container px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-pixel-pink font-sans">
                Streamlined and Optimized
              </h2>
              <p className="text-base sm:text-lg text-pixel-light mb-4 font-sans">
                Efficient C API for high-performance game development with
                minimal dependencies
              </p>
              <div className="space-y-3">
                {[
                  {
                    title: "Pure C Implementation",
                    description:
                      "Lightweight library with native X11 and Win32 integration",
                  },
                  {
                    title: "Extensive Documentation",
                    description:
                      "In-depth guides and API references for developers",
                  },
                  {
                    title: "Open Source Ecosystem",
                    description:
                      "Collaborate with developers building retro games with ARCADE",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-pixel-teal/30 text-pixel-teal flex items-center justify-center mt-0.5 pixel-border border border-pixel-teal">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
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
                      <h3 className="text-base sm:text-lg font-medium text-pixel-teal font-sans">
                        {item.title}
                      </h3>
                      <p className="text-sm text-pixel-light font-sans">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2 shadow-lg bg-pixel-navy border-2 border-pixel-yellow relative rounded-none px-3 py-5 pixel-border">
              <div className="flex gap-1 mb-3">
                <span className="w-2 h-2 rounded-full bg-pixel-pink inline-block" />
                <span className="w-2 h-2 rounded-full bg-pixel-yellow inline-block" />
                <span className="w-2 h-2 rounded-full bg-pixel-teal inline-block" />
              </div>
              <pre className="language-c text-xs sm:text-sm font-code text-pixel-pink overflow-x-auto">
                <code>
                  {` #define ARCADE_IMPLEMENTATION
 #include "arcade.h"

 int main() {
    if (arcade_init(800, 600, "My Game", 0x000000) != 0) {
       return 1;
    }

    ArcadeSprite player = {
       .x = 400.0f, .y = 300.0f, // Center (800/2, 600/2)
       .width = 50.0f, .height = 50.0f,
       .vx = 0.0f, .vy = 0.0f,
       .color = 0xFF0000, // Red
       .active = 1
    };

    SpriteGroup group;
    arcade_init_group(&group, 1);

  
    while (arcade_running() && arcade_update()) {
       
       arcade_play_sound("assets/background_music.mp3");
       group.count = 0;

       player.vx = 0.0f;
       if (arcade_key_pressed(a_right) == 2) player.vx = 5.0f;
       if (arcade_key_pressed(a_left) == 2) player.vx = -5.0f;

       player.x += player.vx;
       if (player.x < 0) player.x = 0;
       if (player.x > 750) player.x = 750; // 800 - 50

       arcade_add_sprite_to_group(&group, 
       (ArcadeAnySprite){.sprite = player}, SPRITE_COLOR);

       arcade_render_group(&group);
       arcade_render_text("Move: Left/Right", 10.0f, 10.0f, 0xFFFFFF);

       arcade_sleep(16);
    }
    arcade_free_group(&group);
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
      <section
        id="cta"
        className="py-10 sm:py-14 md:py-16 bg-pixel-pink text-pixel-dark border-t-4 border-pixel-teal"
      >
        <div className="container px-4 sm:px-6 text-center">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 font-pixel text-pixel-yellow pixel-shadow uppercase tracking-widest"
            style={{ letterSpacing: "3px" }}
          >
            Start Coding Games
          </h2>
          <p className="text-base sm:text-lg opacity-90 max infuse -xl mx-auto mb-6 font-sans font-bold">
            Join game developers creating retro-style 2D games with ARCADE
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/docs">
              <Button
                size="lg"
                variant="secondary"
                className="bg-pixel-yellow text-pixel-dark border-2 border-pixel-teal hover:bg-pixel-teal hover:text-pixel-yellow hover:border-pixel-yellow font-pixel rounded-none text-sm sm:text-base px-4 py-2"
              >
                Get Started
              </Button>
            </Link>
            <Link to="/examples">
              <Button
                size="lg"
                variant="secondary"
                className="bg-pixel-yellow text-pixel-dark border-2 border-pixel-teal hover:bg-pixel-teal hover:text-pixel-yellow hover:border-pixel-yellow font-pixel rounded-none text-sm sm:text-base px-4 py-2"
              >
                View Examples
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-10 sm:py-14 md:py-16 bg-pixel-dark border-t-4 border-pixel-yellow"
      >
        <div className="container px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-pixel-teal font-pixel">
              Advanced Features for Game Creators
            </h2>
            <p className="text-base sm:text-lg text-pixel-white font-sans">
              Comprehensive tools for crafting high-performance 2D games in C
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                title: "Cross-Platform Rendering",
                description:
                  "Efficient X11 and Win32 rendering for rapid, low-latency 2D visuals on Linux and Windows",
                icon: (
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                ),
                color: "pixel-teal",
              },
              {
                title: "Core Physics",
                description:
                  "Integrated physics for seamless collision and motion handling",
                icon: (
                  <>
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" x2="12" y1="8" y2="12" />
                    <line x1="12" x2="12.01" y1="16" y2="16" />
                  </>
                ),
                color: "pixel-yellow",
              },
              {
                title: "Sprite Dynamics",
                description:
                  "Robust system for sprite animation and transformation",
                icon: (
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                ),
                color: "pixel-pink",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-pixel-navy border-2 border-pixel-teal pixel-border"
              >
                <CardContent className="pt-5">
                  <div
                    className={`w-10 h-10 rounded-lg bg-${feature.color}/20 text-${feature.color} flex items-center justify-center mb-3 pixel-border border-2 border-${feature.color}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {feature.icon}
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-pixel-teal font-sans">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-pixel-light font-sans">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Arcade-CLI Section */}
      <section
        id="arcade-cli"
        className="py-10 sm:py-14 md:py-16 bg-pixel-navy border-t-4 border-pixel-teal"
      >
        <div className="container px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-3xl font-bold mb-3 text-pixel-yellow font-pixel pixel-shadow">
              ARCADE CLI
            </h2>
            <p className="text-base sm:text-lg text-pixel-white font-sans">
              Kickstart your ARCADE projects with a command-line tool for rapid
              setup
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="order-2 md:order-1">
              <p className="text-base sm:text-lg text-pixel-light mb-4 font-sans">
                Arcade-CLI is a Node.js-based tool that initializes retro 2D
                game projects with `arcade.h`, STB libraries, and a
                cross-platform Makefile.
              </p>
              <div className="space-y-3">
                {[
                  {
                    title: "Project Initialization",
                    description:
                      "Run `arcade init my-game` to create a demo project with a movable red square, background music, and `arcade.config.json`.",
                  },
                  {
                    title: "Cross-Platform Builds",
                    description:
                      "Generates a Makefile for Windows (`gdi32`, `winmm`) and Linux (`X11`, `libm`) with normalized paths.",
                  },
                  {
                    title: "Interactive Setup",
                    description:
                      "Prompts for game name, version, and assets, saving metadata in `arcade.config.json`.",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-pixel-pink/30 text-pixel-pink flex items-center justify-center mt-0.5 pixel-border border border-pixel-pink">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
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
                      <h3 className="text-base sm:text-lg font-medium text-pixel-pink font-sans">
                        {item.title}
                      </h3>
                      <p className="text-sm text-pixel-light font-sans">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link to="https://www.npmjs.com/package/arcade-cli">
                  <Button
                    size="lg"
                    className="bg-pixel-yellow hover:bg-pixel-pink text-pixel-dark border-2 border-pixel-teal font-pixel rounded-none text-sm sm:text-base px-4 py-2"
                  >
                    View CLI On NPM
                  </Button>
                </Link>
              </div>
            </div>
            <div className="order-1 md:order-2 shadow-lg bg-gradient-to-br from-pixel-dark to-pixel-navy/80 border-2 border-pixel-teal relative rounded-none px-4 py-6 pixel-border transition-transform hover:scale-[1.02]">
              <div className="flex gap-1 mb-3">
                <span className="w-2 h-2 rounded-full bg-pixel-pink inline-block" />
                <span className="w-2 h-2 rounded-full bg-pixel-yellow inline-block" />
                <span className="w-2 h-2 rounded-full bg-pixel-teal inline-block" />
              </div>
              <div className="flex justify-end mb-3">
                <Button
                  onClick={handleCopy}
                  className="
                  bg-pixel-yellow hover:bg-pixel-pink text-pixel-dark 
                  border-2 border-pixel-teal font-pixel rounded-none 
                  text-xs sm:text-sm px-3 py-1 h-8
                  pixel-border transition-all hover:shadow-[0_2px_0_#FF7BDF]
                "
                  aria-label={copied ? "Code copied" : "Copy code"}
                >
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
              <pre className="language-bash text-sm sm:text-base font-mono bg-pixel-dark/50 text-pixel-teal overflow-x-auto rounded-lg p-4 border border-pixel-teal/50 shadow-inner">
                <code className="leading-relaxed">{displayContent}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>
      {/* Arcade IDE Section */}
      <section
        id="arcade-ide"
        className="py-12 sm:py-16 md:py-20 bg-pixel-dark border-t-4 border-pixel-yellow"
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-pixel text-pixel-yellow mb-4 pixel-shadow uppercase tracking-wider">
              Arcade IDE
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-pixel-white font-sans leading-relaxed">
              A retro-inspired development environment powered by `arcade.h`.
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Features List */}
            <div className="space-y-4">
              <ul className="space-y-4">
                {[
                  {
                    title: "Monaco Editor Integration",
                    description:
                      "Craft C code with advanced syntax highlighting and `arcade.h` support.",
                    color: "pixel-yellow",
                  },
                  {
                    title: "AI-Powered Sprite Generation",
                    description:
                      "Design retro-style pixel art with Gemini and Remove.bg APIs.",
                    color: "pixel-teal",
                  },
                  {
                    title: "Intuitive File Management",
                    description:
                      "Organize `.c` files, sprites, and audio with a user-friendly interface.",
                    color: "pixel-pink",
                  },
                  {
                    title: "Code Snippet Library",
                    description:
                      "Use pre-built templates for `arcade.h` tasks like sprite creation.",
                    color: "pixel-yellow",
                  },
                  {
                    title: "Cross-Platform Compatibility",
                    description:
                      "Build games on Windows and Linux with `gcc` and `make`.",
                    color: "pixel-teal",
                  },
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div
                      className={`w-6 h-6 rounded-full bg-${feature.color}/20 text-${feature.color} flex items-center justify-center border-2 border-${feature.color}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
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
                      <h3
                        className={`text-base sm:text-lg font-medium text-${feature.color} font-sans`}
                      >
                        {feature.title}
                      </h3>
                      <p className="text-sm text-pixel-light font-sans">
                        {feature.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link to="https://github.com/GeorgeET15/arcade-ide/">
                <Button
                  size="sm"
                  variant="secondary"
                  className=" mt-10 w-full sm:w-auto bg-pixel-yellow text-pixel-dark border-2 border-pixel-teal hover:bg-pixel-yellow hover:border-pixel-pink font-pixel rounded-none text-sm px-4 py-2"
                >
                  View IDE on Github
                </Button>
              </Link>
            </div>

            {/* Carousel */}
            <div>
              <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                className="w-full"
              >
                {[
                  {
                    src: "https://raw.githubusercontent.com/GeorgeET15/arcade-ide/refs/heads/master/screenshots/ide_1.png",
                    alt: "IDE Image",
                  },
                  {
                    src: "https://raw.githubusercontent.com/GeorgeET15/arcade-ide/refs/heads/master/screenshots/ide_2.png",
                    alt: "IDE Image",
                  },
                  {
                    src: "https://raw.githubusercontent.com/GeorgeET15/arcade-ide/refs/heads/master/screenshots/ide_3.png",
                    alt: "IDE Image",
                  },
                  {
                    src: "https://raw.githubusercontent.com/GeorgeET15/arcade-ide/refs/heads/master/screenshots/ide_4.png",
                    alt: "IDE Image",
                  },
                  {
                    src: "https://raw.githubusercontent.com/GeorgeET15/arcade-ide/refs/heads/master/screenshots/ide_5.png",
                    alt: "IDE Image",
                  },
                ].map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="border-4 border-pixel-yellow">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-auto max-h-[300px] sm:max-h-[400px] object-contain"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Link to="https://github.com/GeorgeET15/arcade-ide/releases/download/v1.0.0/ArcadeIDE-1.0.0-x64.exe">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-full sm:w-auto bg-pixel-teal text-pixel-dark border-2 border-pixel-pink hover:bg-pixel-yellow hover:border-pixel-teal font-pixel rounded-none text-sm px-4 py-2"
                  >
                    Download for Windows
                  </Button>
                </Link>
                <Link to="https://github.com/GeorgeET15/arcade-ide/releases/download/v1.0.0/arcade-ide_1.0.0_amd64.deb">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-full sm:w-auto bg-pixel-pink text-pixel-dark border-2 border-pixel-teal hover:bg-pixel-yellow hover:border-pixel-pink font-pixel rounded-none text-sm px-4 py-2"
                  >
                    Download for Linux
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Open Source & Community Section */}
      <section
        id="open-source"
        className="py-8 sm:py-10 md:py-14 bg-pixel-navy border-t-4 border-pixel-teal"
      >
        <div className="container px-2 sm:px-4 text-center">
          <h2
            className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 text-pixel-yellow font-pixel uppercase"
            style={{ letterSpacing: "2px" }}
          >
            Open Source & Community Driven
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-pixel-light max-w-3xl mx-auto mb-4 sm:mb-6 font-sans">
            ARCADE, Arcade-CLI, and Arcade IDE are fully open-source and free to
            use. Join our vibrant community of developers to contribute ideas,
            code, or feedback and help shape the future of retro 2D game
            development!
          </p>
          <Link to="https://github.com/GeorgeET15/arcade-lib">
            <Button
              size="lg"
              className="bg-pixel-yellow hover:bg-pixel-pink text-pixel-dark border-2 border-pixel-pink font-pixel rounded-none shadow-[0_3px_0_#FF7BDF] text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 min-w-[44px] min-h-[44px]"
            >
              Contribute on GitHub
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
