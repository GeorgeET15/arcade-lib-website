import React, { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search, Menu, X } from "lucide-react";
import { sidebarSections, contentMap } from "../data";

const DocumentationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return sidebarSections;
    const query = searchQuery.toLowerCase();
    return sidebarSections
      .map((section) => {
        const filteredItems = section.items.filter((item) => {
          const sectionContent = contentMap[item.id];
          return (
            item.name.toLowerCase().includes(query) ||
            section.title.toLowerCase().includes(query) ||
            (sectionContent &&
              (sectionContent.title.toLowerCase().includes(query) ||
                sectionContent.content.toLowerCase().includes(query)))
          );
        });
        return { ...section, items: filteredItems };
      })
      .filter(
        (section) =>
          section.items.length > 0 ||
          section.title.toLowerCase().includes(query) ||
          section.items.some((item) =>
            contentMap[item.id]?.content.toLowerCase().includes(query)
          )
      );
  }, [searchQuery]);

  const currentSection = location.pathname.split("/docs/")[1] || "introduction";

  const handleSectionClick = (sectionId: string) => {
    navigate(`/docs/${sectionId}`);
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    switch (currentSection) {
      case "introduction":
        return (
          <div className="space-y-6 text-pixel-white bg-gradient-to-b from-pixel-dark/80 to-pixel-navy/80 p-4 sm:p-6 md:p-8 rounded-lg">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pixel-white font-pixel">
              Introduction to Arcade Library
            </h1>
            <div className="prose prose-invert max-w-none leading-relaxed text-base sm:text-lg text-pixel-light">
              <p>
                The Arcade Library is a lightweight C library designed for
                creating 2D arcade-style games with cross-platform support for
                Windows (Win32) and Linux (X11). It provides essential
                functionality for retro game development, including window
                management, color and image-based sprites, sprite animation,
                collision detection, sound playback, text rendering, and image
                manipulation. Ideal for games like Flappy Bird or Pong, it
                emphasizes minimal dependencies and simplicity.
              </p>
            </div>
            <div className="bg-pixel-dark/50 p-4 sm:p-6 rounded-md">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-pixel-teal font-pixel">
                Library Overview
              </h3>
              <div className="prose prose-invert max-w-none leading-relaxed text-base sm:text-lg text-pixel-light">
                <p>
                  Developed by GeorgeET15. Repository:{" "}
                  <a
                    href="https://github.com/GeorgeET15/arcade-lib"
                    className="text-pixel-teal hover:underline"
                  >
                    https://github.com/GeorgeET15/arcade-lib
                  </a>
                  .
                </p>
                <h4 className="text-lg sm:text-xl font-medium mt-4 sm:mt-6 text-pixel-teal font-pixel">
                  Key Features
                </h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Cross-platform window management (Win32, X11)</li>
                  <li>Color and image-based sprites</li>
                  <li>Sprite animation</li>
                  <li>AABB collision detection</li>
                  <li>WAV audio playback</li>
                  <li>Text rendering (fixed fonts)</li>
                  <li>Image manipulation (flip, rotate)</li>
                </ul>
                <h4 className="text-lg sm:text-xl font-medium mt-4 sm:mt-6 text-pixel-teal font-pixel">
                  Platforms
                </h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Windows: Uses GDI for rendering, winmm for audio.</li>
                  <li>Linux: Uses X11 for rendering, aplay for audio.</li>
                </ul>
              </div>
            </div>
          </div>
        );
      case "installation":
        return (
          <div className="space-y-6 text-pixel-white bg-gradient-to-b from-pixel-dark/80 to-pixel-navy/80 p-4 sm:p-6 md:p-8 rounded-lg">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pixel-white font-pixel">
              Installation
            </h1>
            <div className="bg-pixel-dark/50 p-4 sm:p-6 rounded-md">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-pixel-teal font-pixel">
                Dependencies
              </h3>
              <div className="prose prose-invert max-w-none leading-relaxed text-base sm:text-lg text-pixel-light">
                <h4 className="text-lg sm:text-xl font-medium mt-4 sm:mt-6 text-pixel-teal font-pixel">
                  Linux
                </h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      libX11
                    </code>
                    : Window creation and rendering.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      libm
                    </code>
                    : Math functions (used by STB libraries).
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      STB libraries
                    </code>
                    : Image processing (
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      stb_image.h
                    </code>
                    ,{" "}
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      stb_image_write.h
                    </code>
                    ,{" "}
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      stb_image_resize2.h
                    </code>
                    ).
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      aplay
                    </code>
                    : WAV audio playback (part of alsa-utils).
                  </li>
                </ul>
                <h4 className="text-lg sm:text-xl font-medium mt-4 sm:mt-6 text-pixel-teal font-pixel">
                  Windows
                </h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      gdi32
                    </code>
                    : Window rendering.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      winmm
                    </code>
                    : WAV audio playback.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      STB libraries
                    </code>
                    : Same as Linux.
                  </li>
                </ul>
                <h4 className="text-lg sm:text-xl font-medium mt-4 sm:mt-6 text-pixel-teal font-pixel">
                  Primary Setup: Arcade CLI
                </h4>
                <p>
                  The recommended way to set up an Arcade project is using the
                  Arcade CLI, a Node.js-based tool that automates project
                  initialization. It fetches{" "}
                  <code className="bg-pixel-dark/70 px-1 rounded font-code">
                    arcade.h
                  </code>
                  , STB headers, creates a demo{" "}
                  <code className="bg-pixel-dark/70 px-1 rounded font-code">
                    main.c
                  </code>
                  (with a movable red square, text, and background music),
                  generates a cross-platform{" "}
                  <code className="bg-pixel-dark/70 px-1 rounded font-code">
                    Makefile
                  </code>
                  , and sets up assets and configuration files. Compatible with
                  Arcade IDE v1.1.0+.
                </p>
                <h5 className="text-base sm:text-lg font-medium mt-4 text-pixel-teal font-pixel">
                  Prerequisites
                </h5>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Node.js</strong>: Version 16+ (install via{" "}
                    <a
                      href="https://nodejs.org/"
                      className="text-pixel-teal hover:underline"
                    >
                      nodejs.org
                    </a>
                    ).
                  </li>
                  <li>
                    <strong>gcc</strong>: For compiling projects (Linux:
                    included in{" "}
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      build-essential
                    </code>
                    ; Windows: MinGW via MSYS2).
                  </li>
                  <li>
                    <strong>Internet Connection</strong>: To download{" "}
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      arcade.h
                    </code>
                    , STB headers, and{" "}
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      background_music.wav
                    </code>
                    .
                  </li>
                </ul>
                <h5 className="text-base sm:text-lg font-medium mt-4 text-pixel-teal font-pixel">
                  Installation
                </h5>
                <p>Install the Arcade CLI globally using npm:</p>
                <pre className="bg-pixel-dark/90 p-4 rounded-md border border-pixel-teal/50 text-pixel-white overflow-x-auto line-numbers language-bash">
                  <code className="language-bash font-code text-sm">
                    npm install -g arcade-cli
                  </code>
                </pre>
                <p>Verify the installation:</p>
                <pre className="bg-pixel-dark/90 p-4 rounded-md border border-pixel-teal/50 text-pixel-white overflow-x-auto line-numbers language-bash">
                  <code className="language-bash font-code text-sm">
                    arcade --help
                  </code>
                </pre>
                <p>
                  The CLI is installed to your global npm directory (Linux:{" "}
                  <code className="bg-pixel-dark/70 px-1 rounded font-code">
                    ~/.npm-global/bin/arcade
                  </code>
                  ; Windows:{" "}
                  <code className="bg-pixel-dark/70 px-1 rounded font-code">
                    %APPDATA%\npm\arcade
                  </code>
                  ). Ensure this directory is in your system PATH.
                </p>
                <h5 className="text-base sm:text-lg font-medium mt-4 text-pixel-teal font-pixel">
                  Initializing a Project
                </h5>
                <p>
                  Create a full project with a demo or a minimal project with
                  the{" "}
                  <code className="bg-pixel-dark/70 px-1 rounded font-code">
                    -b
                  </code>{" "}
                  flag:
                </p>
                <pre className="bg-pixel-dark/90 p-4 rounded-md border border-pixel-teal/50 text-pixel-white overflow-x-auto line-numbers language-bash">
                  <code className="language-bash font-code text-sm">
                    # Full project with demo arcade init my-game # Minimal
                    project arcade init my-lib -b
                  </code>
                </pre>
                <p>
                  The CLI prompts for configuration (game name, version, binary
                  name, etc.), saved in{" "}
                  <code className="bg-pixel-dark/70 px-1 rounded font-code">
                    arcade.config.json
                  </code>
                  . The full project includes a demo with a red square movable
                  via arrow keys, a start screen, and background music.
                </p>
                <h5 className="text-base sm:text-lg font-medium mt-4 text-pixel-teal font-pixel">
                  Building and Running
                </h5>
                <p>
                  Navigate to your project directory and use the generated{" "}
                  <code className="bg-pixel-dark/70 px-1 rounded font-code">
                    Makefile
                  </code>
                  :
                </p>
                <pre className="bg-pixel-dark/90 p-4 rounded-md border border-pixel-teal/50 text-pixel-white overflow-x-auto line-numbers language-bash">
                  <code className="language-bash font-code text-sm">
                    cd my-game make make run
                  </code>
                </pre>
                <h5 className="text-base sm:text-lg font-medium mt-4 text-pixel-teal font-pixel">
                  Troubleshooting
                </h5>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>“arcade: command not found”</strong>: Add npm’s
                    global bin to PATH (Linux:{" "}
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      export PATH=~/.npm-global/bin:$PATH
                    </code>
                    ; Windows: Add{" "}
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      %APPDATA%\npm
                    </code>
                    ).
                  </li>
                  <li>
                    <strong>Network errors</strong>: Ensure internet access and
                    check{" "}
                    <a
                      href="https://www.githubstatus.com/"
                      className="text-pixel-teal hover:underline"
                    >
                      GitHub status
                    </a>
                    .
                  </li>
                  <li>
                    <strong>Missing assets</strong>: Verify{" "}
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      background_music.wav
                    </code>{" "}
                    downloaded correctly or fetch manually from{" "}
                    <a
                      href="https://github.com/GeorgeET15/arcade-lib"
                      className="text-pixel-teal hover:underline"
                    >
                      arcade-lib
                    </a>
                    .
                  </li>
                </ul>
                <h4 className="text-lg sm:text-xl font-medium mt-4 sm:mt-6 text-pixel-teal font-pixel">
                  Alternative: Manual Setup
                </h4>
                <p>
                  If you prefer manual setup or cannot use the CLI, follow these
                  steps:
                </p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>
                    Linux: Install dependencies (
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      sudo apt install libx11-dev alsa-utils
                    </code>
                    ). Windows: Use MinGW/MSYS2; gdi32/winmm are included.
                  </li>
                  <li>
                    Download the Arcade Library from{" "}
                    <a
                      href="https://github.com/GeorgeET15/arcade-lib"
                      className="text-pixel-teal hover:underline"
                    >
                      GitHub
                    </a>
                    .
                  </li>
                  <li>
                    Download STB libraries from{" "}
                    <a
                      href="https://github.com/nothings/stb"
                      className="text-pixel-teal hover:underline"
                    >
                      https://github.com/nothings/stb
                    </a>
                    .
                  </li>
                  <li>
                    Include{" "}
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      arcade.h
                    </code>{" "}
                    and link appropriately.
                  </li>
                </ol>
                <h5 className="text-base sm:text-lg font-medium mt-4 text-pixel-teal font-pixel">
                  Compilation
                </h5>
                <p>
                  Compile with the appropriate flags, ensuring files are in the
                  correct paths:
                </p>
                <pre className="bg-pixel-dark/90 p-4 rounded-md border border-pixel-teal/50 text-pixel-white overflow-x-auto line-numbers language-bash">
                  <code className="language-bash font-code text-sm">
                    # Linux gcc -o game game.c arcade.c -lX11 -lm # Windows gcc
                    -o game game.c arcade.c -lgdi32 -lwinmm
                  </code>
                </pre>
                <p>
                  <strong>Note</strong>: Ensure WAV files are PCM, 16-bit.
                  Windows may experience audio delays on old systems; consider
                  preloading sounds (see Audio System). For detailed examples,
                  refer to the{" "}
                  <a
                    href="https://arcade-lib.vercel.app/"
                    className="text-pixel-teal hover:underline"
                  >
                    ARCADE Wiki
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        );
      case "usage-example":
        return (
          <div className="space-y-6 text-pixel-white bg-gradient-to-b from-pixel-dark/80 to-pixel-navy/80 p-4 sm:p-6 md:p-8 rounded-lg">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pixel-white font-pixel">
              Usage Example
            </h1>
            <div className="bg-pixel-dark/50 p-4 sm:p-6 economía">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-pixel-teal font-pixel">
                Basic Game Setup
              </h3>
              <div className="prose prose-invert max-w-none leading-relaxed text-base sm:text-lg text-pixel-light">
                <p>
                  This example initializes a window, loads an image sprite, and
                  renders it in a game loop at ~60 FPS. It includes error
                  handling and uses{" "}
                  <code className="bg-pixel-dark/70 px-1 rounded font-code">
                    arcade_sleep
                  </code>{" "}
                  for cross-platform frame rate control:
                </p>
                <pre className="bg-pixel-dark/90 p-4 rounded-md border border-pixel-teal/50 text-pixel-white overflow-x-auto line-numbers language-c">
                  <code className="language-c font-code text-sm">
                    {`#include "arcade.h"
#include <stdio.h>
int main() {
    if (arcade_init(800, 600, "My Game", 0x000000)) {
        fprintf(stderr, "Failed to initialize arcade\\n");
        return 1;
    }
    ArcadeImageSprite sprite = arcade_create_image_sprite(100, 100, 50, 50, "sprite.png");
    if (!sprite.pixels) {
        fprintf(stderr, "Failed to load sprite.png\\n");
        arcade_quit();
        return 1;
    }
    SpriteGroup group;
    arcade_init_group(&group, 1);
    arcade_add_sprite_to_group(&group, (ArcadeAnySprite){.image_sprite = sprite}, SPRITE_IMAGE);
    while (arcade_running() && arcade_update()) {
        if (arcade_key_pressed_once(a_esc) == 2) {
            arcade_set_running(0);
        }
        arcade_render_group(&group);
        arcade_sleep(16); // ~60 FPS
    }
    arcade_free_image_sprite(&sprite);
    arcade_free_group(&group);
    arcade_quit();
    return 0;
}`}
                  </code>
                </pre>
                <p>
                  <strong>Notes</strong>:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Ensure{" "}
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      sprite.png
                    </code>{" "}
                    is in the project directory.
                  </li>
                  <li>
                    Use{" "}
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      arcade_sleep(16)
                    </code>{" "}
                    for ~60 FPS (16ms per frame).
                  </li>
                  <li>
                    Check return values of{" "}
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      arcade_init
                    </code>{" "}
                    and{" "}
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      arcade_create_image_sprite
                    </code>{" "}
                    for errors.
                  </li>
                  <li>
                    Free all sprites and groups before calling{" "}
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      arcade_quit
                    </code>
                    .
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      case "core-functions":
        return (
          <div className="space-y-6 text-pixel-white bg-gradient-to-b from-pixel-dark/80 to-pixel-navy/80 p-4 sm:p-6 md:p-8 rounded-lg">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pixel-white font-pixel">
              Core Functions
            </h1>
            <div className="bg-pixel-dark/50 p-4 sm:p-6 rounded-md">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-pixel-teal font-pixel">
                Overview
              </h3>
              <div className="prose prose-invert max-w-none leading-relaxed text-base sm:text-lg text-pixel-light">
                <p>
                  Core functions initialize and manage the game environment
                  across Windows and Linux:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      int arcade_init(int window_width, int window_height, const
                      char *window_title, uint32_t bg_color)
                    </code>
                    : Creates a window with specified dimensions, title, and
                    background color (0xRRGGBB). Returns 0 on success, non-zero
                    on failure.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      void arcade_quit(void)
                    </code>
                    : Frees resources and closes the window.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      int arcade_update(void)
                    </code>
                    : Processes events (e.g., key presses, window close).
                    Returns 1 to continue, 0 to stop.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      int arcade_running(void)
                    </code>
                    : Returns 1 if the game is running, 0 if stopped.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      void arcade_set_running(int value)
                    </code>
                    : Sets running state (1 = running, 0 = stopped).
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      void arcade_sleep(unsigned int milliseconds)
                    </code>
                    : Pauses execution (e.g., 16ms for ~60 FPS).
                  </li>
                </ul>
                <h4 className="text-lg sm:text-xl font-medium mt-4 sm:mt-6 text-pixel-teal font-pixel">
                  Example
                </h4>
                <pre className="bg-pixel-dark/90 p-4 rounded-md border border-pixel-teal/50 text-pixel-white overflow-x-auto line-numbers language-c">
                  <code className="language-c font-code text-sm">
                    {`#include "arcade.h"
#include <stdio.h>
int main() {
    if (arcade_init(800, 600, "Game", 0x000000)) {
        fprintf(stderr, "Init failed\\n");
        return 1;
    }
    while (arcade_running() && arcade_update()) {
        if (arcade_key_pressed_once(a_esc) == 2) {
            arcade_set_running(0);
        }
        arcade_sleep(16); // ~60 FPS
    }
    arcade_quit();
    return 0;
}`}
                  </code>
                </pre>
                <p>
                  <strong>Notes</strong>:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Always check{" "}
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      arcade_init
                    </code>{" "}
                    return value.
                  </li>
                  <li>
                    Use{" "}
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      arcade_sleep
                    </code>{" "}
                    for consistent frame rates across platforms.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      case "input-handling":
        return (
          <div className="space-y-6 text-pixel-white bg-gradient-to-b from-pixel-dark/80 to-pixel-navy/80 p-4 sm:p-6 md:p-8 rounded-lg">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pixel-white font-pixel">
              Input Handling
            </h1>
            <div className="bg-pixel-dark/50 p-4 sm:p-6 rounded-md">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-pixel-teal font-pixel">
                Overview
              </h3>
              <div className="prose prose-invert max-w-none leading-relaxed text-base sm:text-lg text-pixel-light">
                <p>
                  Functions for keyboard input detection, with platform-agnostic
                  key codes:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      int arcade_key_pressed(unsigned int key_val)
                    </code>
                    : Returns 2 if key is held, 0 if not.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      int arcade_key_pressed_once(unsigned int key_val)
                    </code>
                    : Returns 2 if key was pressed this frame, 0 otherwise.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      void arcade_clear_keys(void)
                    </code>
                    : Resets all key states.
                  </li>
                </ul>
                <h4 className="text-lg sm:text-xl font-medium mt-4 sm:mt-6 text-pixel-teal font-pixel">
                  Example
                </h4>
                <pre className="bg-pixel-dark/90 p-4 rounded-md border border-pixel-teal/50 text-pixel-white overflow-x-auto line-numbers language-c">
                  <code className="language-c font-code text-sm">
                    {`#include "arcade.h"
int main() {
    arcade_init(800, 600, "Game", 0x000000);
    ArcadeImageSprite player = arcade_create_image_sprite(100, 100, 50, 50, "player.png");
    while (arcade_running() && arcade_update()) {
        if (arcade_key_pressed(a_right) == 2) {
            player.vx = 5.0f; // Move right
        } else if (arcade_key_pressed(a_left) == 2) {
            player.vx = -5.0f; // Move left
        } else {
            player.vx = 0.0f;
        }
        if (arcade_key_pressed_once(a_space) == 2) {
            player.vy = -10.0f; // Jump
        }
        arcade_move_image_sprite(&player, 0.1f, 600);
        arcade_sleep(16);
    }
    arcade_free_image_sprite(&player);
    arcade_quit();
    return 0;
}`}
                  </code>
                </pre>
                <p>
                  <strong>Notes</strong>:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Use{" "}
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      arcade_key_pressed_once
                    </code>{" "}
                    for one-time actions (e.g., jumping).
                  </li>
                  <li>
                    Call{" "}
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      arcade_clear_keys
                    </code>{" "}
                    during state changes (e.g., pausing).
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      case "rendering":
        return (
          <div className="space-y-6 text-pixel-white bg-gradient-to-b from-pixel-dark/80 to-pixel-navy/80 p-4 sm:p-6 md:p-8 rounded-lg">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pixel-white font-pixel">
              Rendering
            </h1>
            <div className="bg-pixel-dark/50 p-4 sm:p-6 rounded-md">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-pixel-teal font-pixel">
                Overview
              </h3>
              <div className="prose prose-invert max-w-none leading-relaxed text-base sm:text-lg text-pixel-light">
                <p>
                  Rendering functions draw sprites and text using double
                  buffering (GDI on Windows, XImage on Linux):
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      void arcade_render_scene(ArcadeAnySprite *sprites, int
                      count, int *types)
                    </code>
                    : Renders multiple sprites (color or image-based).
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      void arcade_render_text(const char *text, float x, float
                      y, unsigned int color)
                    </code>
                    : Renders text at a position (Courier New on Windows, 9x15
                    on Linux).
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      void arcade_render_text_centered(const char *text, float
                      y, unsigned int color)
                    </code>
                    : Renders horizontally centered text.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      void arcade_render_text_centered_blink(const char *text,
                      float y, unsigned int color, int blink_interval)
                    </code>
                    : Renders blinking centered text (e.g., 30 frames for 1s at
                    60 FPS).
                  </li>
                </ul>
                <h4 className="text-lg sm:text-xl font-medium mt-4 sm:mt-6 text-pixel-teal font-pixel">
                  Example
                </h4>
                <pre className="bg-pixel-dark/90 p-4 rounded-md border border-pixel-teal/50 text-pixel-white overflow-x-auto line-numbers language-c">
                  <code className="language-c font-code text-sm">
                    {`#include "arcade.h"
int main() {
    arcade_init(800, 600, "Game", 0x000000);
    while (arcade_running() && arcade_update()) {
        arcade_render_text("Score: 100", 10, 10, 0xFFFFFF);
        arcade_render_text_centered_blink("Press Space to Start", 300, 0xFFFFFF, 30);
        arcade_sleep(16);
    }
    arcade_quit();
    return 0;
}`}
                  </code>
                </pre>
                <p>
                  <strong>Notes</strong>:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Text rendering uses fixed fonts; ensure font availability.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      arcade_render_scene
                    </code>{" "}
                    clears the screen before drawing.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      case "sprite-types":
        return (
          <div className="space-y-6 text-pixel-white bg-gradient-to-b from-pixel-dark/80 to-pixel-navy/80 p-4 sm:p-6 md:p-8 rounded-lg">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pixel-white font-pixel">
              Sprite Types
            </h1>
            <div className="bg-pixel-dark/50 p-4 sm:p-6 rounded-md">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-pixel-teal font-pixel">
                Overview
              </h3>
              <div className="prose prose-invert max-w-none leading-relaxed text-base sm:text-lg text-pixel-light">
                <p>The library supports multiple sprite types:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      ArcadeSprite
                    </code>
                    : Color-based sprite (x, y, width, height, vy, vx, color,
                    active). Used for simple shapes (e.g., platforms).
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      ArcadeImageSprite
                    </code>
                    : Image-based sprite (x, y, width, height, vy, vx, pixels,
                    image_width, image_height, active). Used for detailed
                    graphics (e.g., characters).
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      ArcadeAnimatedSprite
                    </code>
                    : Animated sprite (frames, frame_count, current_frame,
                    frame_interval, frame_counter). Used for animations (e.g.,
                    walking).
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      ArcadeAnySprite
                    </code>
                    : Union (sprite, image_sprite). Used in sprite groups for
                    mixed types.
                  </li>
                </ul>
                <h4 className="text-lg sm:text-xl font-medium mt-4 sm:mt-6 text-pixel-teal font-pixel">
                  Example
                </h4>
                <pre className="bg-pixel-dark/90 p-4 rounded-md border border-pixel-teal/50 text-pixel-white overflow-x-auto line-numbers language-c">
                  <code className="language-c font-code text-sm">
                    {`#include "arcade.h"
ArcadeSprite platform = {100.0f, 500.0f, 200.0f, 20.0f, 0.0f, 0.0f, 0x00FF00, 1};
ArcadeImageSprite player = arcade_create_image_sprite(100.0f, 100.0f, 50.0f, 50.0f, "player.png");
ArcadeAnySprite any_sprite = {.image_sprite = player};`}
                  </code>
                </pre>
                <p>
                  <strong>Notes</strong>:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Set{" "}
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      active = 0
                    </code>{" "}
                    to skip rendering/collisions.
                  </li>
                  <li>
                    Free image-based sprites with{" "}
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      arcade_free_image_sprite
                    </code>
                    .
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      case "sprite-operations":
        return (
          <div className="space-y-6 text-pixel-white bg-gradient-to-b from-pixel-dark/80 to-pixel-navy/80 p-4 sm:p-6 md:p-8 rounded-lg">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pixel-white font-pixel">
              Sprite Operations
            </h1>
            <div className="bg-pixel-dark/50 p-4 sm:p-6 rounded-md">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-pixel-teal font-pixel">
                Overview
              </h3>
              <div className="prose prose-invert max-w-none leading-relaxed text-base sm:text-lg text-pixel-light">
                <p>Functions for creating and moving sprites:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      ArcadeImageSprite arcade_create_image_sprite(float x,
                      float y, float w, float h, const char *filename)
                    </code>
                    : Loads an image sprite (e.g., PNG).
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      void arcade_free_image_sprite(ArcadeImageSprite *sprite)
                    </code>
                    : Frees sprite pixel data.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      void arcade_move_sprite(ArcadeSprite *sprite, float
                      gravity, int window_height)
                    </code>
                    : Updates color-based sprite position with gravity and
                    boundary checks.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      void arcade_move_image_sprite(ArcadeImageSprite *sprite,
                      float gravity, int window_height)
                    </code>
                    : Updates image-based sprite position.
                  </li>
                </ul>
                <h4 className="text-lg sm:text-xl font-medium mt-4 sm:mt-6 text-pixel-teal font-pixel">
                  Example
                </h4>
                <pre className="bg-pixel-dark/90 p-4 rounded-md border border-pixel-teal/50 text-pixel-white overflow-x-auto line-numbers language-c">
                  <code className="language-c font-code text-sm">
                    {`#include "arcade.h"
int main() {
    arcade_init(800, 600, "Game", 0x000000);
    ArcadeImageSprite sprite = arcade_create_image_sprite(100, 100, 50, 50, "sprite.png");
    while (arcade_running() && arcade_update()) {
        arcade_move_image_sprite(&sprite, 0.1f, 600);
        arcade_sleep(16);
    }
    arcade_free_image_sprite(&sprite);
    arcade_quit();
    return 0;
}`}
                  </code>
                </pre>
                <p>
                  <strong>Notes</strong>:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Check{" "}
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      sprite.pixels
                    </code>{" "}
                    for loading errors.
                  </li>
                  <li>
                    Gravity is in pixels per frame² (e.g., 0.1f for gentle
                    fall).
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      case "animation":
        return (
          <div className="space-y-6 text-pixel-white bg-gradient-to-b from-pixel-dark/80 to-pixel-navy/80 p-4 sm:p-6 md:p-8 rounded-lg">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pixel-white font-pixel">
              Animation
            </h1>
            <div className="bg-pixel-dark/50 p-4 sm:p-6 rounded-md">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-pixel-teal font-pixel">
                Overview
              </h3>
              <div className="prose prose-invert max-w-none leading-relaxed text-base sm:text-lg text-pixel-light">
                <p>Functions for managing animated sprites:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      ArcadeAnimatedSprite arcade_create_animated_sprite(float
                      x, float y, float w, float h, const char **filenames, int
                      frame_count, int frame_interval)
                    </code>
                    : Creates an animated sprite with multiple frames.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      void arcade_free_animated_sprite(ArcadeAnimatedSprite
                      *anim)
                    </code>
                    : Frees all frame data.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      void arcade_move_animated_sprite(ArcadeAnimatedSprite
                      *anim, float gravity, int window_height)
                    </code>
                    : Updates position and animation frame.
                  </li>
                </ul>
                <h4 className="text-lg sm:text-xl font-medium mt-4 sm:mt-6 text-pixel-teal font-pixel">
                  Example
                </h4>
                <pre className="bg-pixel-dark/90 p-4 rounded-md border border-pixel-teal/50 text-pixel-white overflow-x-auto line-numbers language-c">
                  <code className="language-c font-code text-sm">
                    {`#include "arcade.h"
int main() {
    arcade_init(800, 600, "Game", 0x000000);
    const char *frames[] = {"bird1.png", "bird2.png", "bird3.png"};
    ArcadeAnimatedSprite bird = arcade_create_animated_sprite(100, 100, 50, 50, frames, 3, 5);
    SpriteGroup group;
    arcade_init_group(&group, 1);
    while (arcade_running() && arcade_update()) {
        arcade_move_animated_sprite(&bird, 0.1f, 600);
        arcade_add_animated_to_group(&group, &bird);
        arcade_render_group(&group);
        arcade_sleep(16);
    }
    arcade_free_animated_sprite(&bird);
    arcade_free_group(&group);
    arcade_quit();
    return 0;
}`}
                  </code>
                </pre>
                <p>
                  <strong>Notes</strong>:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      frame_interval
                    </code>{" "}
                    controls animation speed (e.g., 5 frames = 83ms at 60 FPS).
                  </li>
                  <li>All frames must have the same dimensions.</li>
                </ul>
              </div>
            </div>
          </div>
        );
      case "collision":
        return (
          <div className="space-y-6 text-pixel-white bg-gradient-to-b from-pixel-dark/80 to-pixel-navy/80 p-4 sm:p-6 md:p-8 rounded-lg">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pixel-white font-pixel">
              Collision Detection
            </h1>
            <div className="bg-pixel-dark/50 p-4 sm:p-6 rounded-md">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-pixel-teal font-pixel">
                Overview
              </h3>
              <div className="prose prose-invert max-w-none leading-relaxed text-base sm:text-lg text-pixel-light">
                <p>
                  Axis-aligned bounding box (AABB) collision detection for
                  sprites:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      int arcade_check_collision(ArcadeSprite *a, ArcadeSprite
                      *b)
                    </code>
                    : Checks collision between color-based sprites.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      int arcade_check_image_collision(ArcadeImageSprite *a,
                      ArcadeImageSprite *b)
                    </code>
                    : Checks collision between image-based sprites.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      int arcade_check_animated_collision(ArcadeAnimatedSprite
                      *anim, ArcadeImageSprite *other)
                    </code>
                    : Checks collision between animated and image-based sprites.
                  </li>
                </ul>
                <h4 className="text-lg sm:text-xl font-medium mt-4 sm:mt-6 text-pixel-teal font-pixel">
                  Example
                </h4>
                <pre className="bg-pixel-dark/90 p-4 rounded-md border border-pixel-teal/50 text-pixel-white overflow-x-auto line-numbers language-c">
                  <code className="language-c font-code text-sm">
                    {`#include "arcade.h"
int main() {
    arcade_init(800, 600, "Game", 0x000000);
    ArcadeImageSprite player = arcade_create_image_sprite(100, 100, 50, 50, "player.png");
    ArcadeImageSprite enemy = arcade_create_image_sprite(150, 100, 50, 50, "enemy.png");
    while (arcade_running() && arcade_update()) {
        if (arcade_check_image_collision(&player, &enemy)) {
            arcade_set_running(0); // Game over
        }
        arcade_sleep(16);
    }
    arcade_free_image_sprite(&player);
    arcade_free_image_sprite(&enemy);
    arcade_quit();
    return 0;
}`}
                  </code>
                </pre>
                <p>
                  <strong>Notes</strong>:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Returns 0 for inactive or null sprites.</li>
                  <li>
                    Only checks bounding boxes, not pixel-level collisions.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      case "sprite-groups":
        return (
          <div className="space-y-6 text-pixel-white bg-gradient-to-b from-pixel-dark/80 to-pixel-navy/80 p-4 sm:p-6 md:p-8 rounded-lg">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pixel-white font-pixel">
              Sprite Groups
            </h1>
            <div className="bg-pixel-dark/50 p-4 sm:p-6 rounded-md">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-pixel-teal font-pixel">
                Overview
              </h3>
              <div className="prose prose-invert max-w-none leading-relaxed text-base sm:text-lg text-pixel-light">
                <p>
                  Sprite groups manage multiple sprites for efficient batch
                  rendering:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      void arcade_init_group(SpriteGroup *group, int capacity)
                    </code>
                    : Initializes a group with specified capacity.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      void arcade_add_sprite_to_group(SpriteGroup *group,
                      ArcadeAnySprite sprite, int type)
                    </code>
                    : Adds a sprite (color or image-based).
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      void arcade_add_animated_to_group(SpriteGroup *group,
                      ArcadeAnimatedSprite *anim)
                    </code>
                    : Adds an animated sprite’s current frame.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      void arcade_render_group(SpriteGroup *group)
                    </code>
                    : Renders all sprites in the group.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      void arcade_free_group(SpriteGroup *group)
                    </code>
                    : Frees group memory (not sprite data).
                  </li>
                </ul>
                <h4 className="text-lg sm:text-xl font-medium mt-4 sm:mt-6 text-pixel-teal font-pixel">
                  Example
                </h4>
                <pre className="bg-pixel-dark/90 p-4 rounded-md border border-pixel-teal/50 text-pixel-white overflow-x-auto line-numbers language-c">
                  <code className="language-c font-code text-sm">
                    {`#include "arcade.h"
int main() {
    arcade_init(800, 600, "Game", 0x000000);
    SpriteGroup group;
    arcade_init_group(&group, 2);
    ArcadeImageSprite sprite1 = arcade_create_image_sprite(100, 100, 50, 50, "sprite1.png");
    ArcadeImageSprite sprite2 = arcade_create_image_sprite(200, 100, 50, 50, "sprite2.png");
    arcade_add_sprite_to_group(&group, (ArcadeAnySprite){.image_sprite = sprite1}, SPRITE_IMAGE);
    arcade_add_sprite to_group(&group, (ArcadeAnySprite){.image_sprite = sprite2}, SPRITE_IMAGE);
    while (arcade_running() && arcade_update()) {
        arcade_render_group(&group);
        arcade_sleep(16);
    }
    arcade_free_image_sprite(&sprite1);
    arcade_free_image_sprite(&sprite2);
    arcade_free_group(&group);
    arcade_quit();
    return 0;
}`}
                  </code>
                </pre>
                <p>
                  <strong>Notes</strong>:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Free individual sprite data separately.</li>
                  <li>
                    Update animated sprites each frame with{" "}
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      arcade_add_animated_to_group
                    </code>
                    .
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      case "audio-system":
        return (
          <div className="space-y-6 text-pixel-white bg-gradient-to-b from-pixel-dark/80 to-pixel-navy/80 p-4 sm:p-6 md:p-8 rounded-lg">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pixel-white font-pixel">
              Audio System
            </h1>
            <div className="bg-pixel-dark/50 p-4 sm:p-6 rounded-md">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-pixel-teal font-pixel">
                Overview
              </h3>
              <div className="prose prose-invert max-w-none leading-relaxed text-base sm:text-lg text-pixel-light">
                <p>Plays WAV audio files asynchronously:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      int arcade_play_sound(const char *audio_file_path)
                    </code>
                    : Plays a WAV file, returning 0 on success, non-zero on
                    failure.
                  </li>
                </ul>
                <h4 className="text-lg sm:text-xl font-medium mt-4 sm:mt-6 text-pixel-teal font-pixel">
                  Platform Details
                </h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Windows</strong>: Uses{" "}
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      PlaySound
                    </code>{" "}
                    with{" "}
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      SND_FILENAME | SND_ASYNC
                    </code>
                    . May have ~0.5s delay on old systems due to disk I/O.
                  </li>
                  <li>
                    <strong>Linux</strong>: Uses{" "}
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      aplay
                    </code>{" "}
                    (requires alsa-utils).
                  </li>
                </ul>
                <h4 className="text-lg sm:text-xl font-medium mt-4 sm:mt-6 text-pixel-teal font-pixel">
                  Example
                </h4>
                <pre className="bg-pixel-dark/90 p-4 rounded-md border border-pixel-teal/50 text-pixel-white overflow-x-auto line-numbers language-c">
                  <code className="language-c font-code text-sm">
                    {`#include "arcade.h"
int main() {
    arcade_init(800, 600, "Game", 0x000000);
    while (arcade_running() && arcade_update()) {
        if (arcade_key_pressed_once(a_space) == 2) {
            if (arcade_play_sound("sfx_jump.wav")) {
                fprintf(stderr, "Failed to play sound\\n");
            }
        }
        arcade_sleep(16);
    }
    arcade_quit();
    return 0;
}`}
                  </code>
                </pre>
                <p>
                  <strong>Notes</strong>:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use PCM, 16-bit WAV files for compatibility.</li>
                  <li>
                    Windows: Preload sounds into memory to reduce delays (e.g.,
                    using a custom{" "}
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      ArcadeSound
                    </code>{" "}
                    struct with{" "}
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      SND_MEMORY
                    </code>
                    ).
                  </li>
                  <li>
                    Linux: Ensure{" "}
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      aplay
                    </code>{" "}
                    is installed (
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      sudo apt install alsa-utils
                    </code>
                    ).
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      case "image-manipulation":
        return (
          <div className="space-y-6 text-pixel-white bg-gradient-to-b from-pixel-dark/80 to-pixel-navy/80 p-4 sm:p-6 md:p-8 rounded-lg">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pixel-white font-pixel">
              Image Manipulation
            </h1>
            <div className="bg-pixel-dark/50 p-4 sm:p-6 rounded-md">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-pixel-teal font-pixel">
                Overview
              </h3>
              <div className="prose prose-invert max-w-none leading-relaxed text-base sm:text-lg text-pixel-light">
                <p>
                  Functions for manipulating sprite images using STB libraries:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      char *arcade_flip_image(const char *input_path, int
                      flip_type)
                    </code>
                    : Flips image (1 = vertical, 0 = horizontal). Returns path
                    to temporary file.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      char *arcade_rotate_image(const char *input_path, int
                      degrees)
                    </code>
                    : Rotates image (0, 90, 180, 270 degrees). Returns path to
                    temporary file.
                  </li>
                </ul>
                <h4 className="text-lg sm:text-xl font-medium mt-4 sm:mt-6 text-pixel-teal font-pixel">
                  Example
                </h4>
                <pre className="bg-pixel-dark/90 p-4 rounded-md border border-pixel-teal/50 text-pixel-white overflow-x-auto line-numbers language-c">
                  <code className="language-c font-code text-sm">
                    {`#include "arcade.h"
#include <stdlib.h>
int main() {
    arcade_init(800, 600, "Game", 0x000000);
    char *flipped = arcade_flip_image("sprite.png", 0);
    if (flipped) {
        ArcadeImageSprite sprite = arcade_create_image_sprite(100, 100, 50, 50, flipped);
        free(flipped);
        while (arcade_running() && arcade_update()) {
            arcade_sleep(16);
        }
        arcade_free_image_sprite(&sprite);
    }
    arcade_quit();
    return 0;
}`}
                  </code>
                </pre>
                <p>
                  <strong>Notes</strong>:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Free returned paths to avoid memory leaks.</li>
                  <li>
                    Temporary files are created in the current directory
                    (Windows) or /tmp (Linux).
                  </li>
                  <li>Ensure write permissions for the output directory.</li>
                </ul>
              </div>
            </div>
          </div>
        );
      case "api-enums":
        return (
          <div className="space-y-6 text-pixel-white bg-gradient-to-b from-pixel-dark/80 to-pixel-navy/80 p-4 sm:p-6 md:p-8 rounded-lg">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pixel-white font-pixel">
              Enumerations
            </h1>
            <div className="bg-pixel-dark/50 p-4 sm:p-6 rounded-md">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-pixel-teal font-pixel">
                Overview
              </h3>
              <div className="prose prose-invert max-w-none leading-relaxed text-base sm:text-lg text-pixel-light">
                <p>
                  Enumerations for sprite types used in rendering and groups:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      SPRITE_COLOR = 0
                    </code>
                    : Color-based sprite (
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      ArcadeSprite
                    </code>
                    ).
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      SPRITE_IMAGE = 1
                    </code>
                    : Image-based sprite (
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      ArcadeImageSprite
                    </code>
                    ).
                  </li>
                </ul>
                <h4 className="text-lg sm:text-xl font-medium mt-4 sm:mt-6 text-pixel-teal font-pixel">
                  Example
                </h4>
                <pre className="bg-pixel-dark/90 p-4 rounded-md border border-pixel-teal/50 text-pixel-white overflow-x-auto line-numbers language-c">
                  <code className="language-c font-code text-sm">
                    {`#include "arcade.h"
int main() {
    SpriteGroup group;
    arcade_init_group(&group, 1);
    ArcadeImageSprite sprite = arcade_create_image_sprite(100, 100, 50, 50, "sprite.png");
    arcade_add_sprite_to_group(&group, (ArcadeAnySprite){.image_sprite = sprite}, SPRITE_IMAGE);
    arcade_free_image_sprite(&sprite);
    arcade_free_group(&group);
    return 0;
}`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        );
      case "api-keys":
        return (
          <div className="space-y-6 text-pixel-white bg-gradient-to-b from-pixel-dark/80 to-pixel-navy/80 p-4 sm:p-6 md:p-8 rounded-lg">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pixel-white font-pixel">
              Key Definitions
            </h1>
            <div className="bg-pixel-dark/50 p-4 sm:p-6 rounded-md">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-pixel-teal font-pixel">
                Overview
              </h3>
              <div className="prose prose-invert max-w-none leading-relaxed text-base sm:text-lg text-pixel-light">
                <p>
                  Predefined key codes for input handling, mapped to
                  platform-specific codes (Win32 virtual keys, X11 keycodes):
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      a_up (0xff52)
                    </code>
                    : Up arrow key.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      a_down (0xff54)
                    </code>
                    : Down arrow key.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      a_left (0xff51)
                    </code>
                    : Left arrow key.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      a_right (0xff53)
                    </code>
                    : Right arrow key.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      a_w (0x0077)
                    </code>
                    : W key.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      a_a (0x0061)
                    </code>
                    : A key.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      a_s (0x0073)
                    </code>
                    : S key.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      a_d (0x0064)
                    </code>
                    : D key.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      a_r (0x0072)
                    </code>
                    : R key.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      a_p (0x0070)
                    </code>
                    : P key.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      a_space (0x0020)
                    </code>
                    : Spacebar.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      a_esc (0xff1b)
                    </code>
                    : Escape key.
                  </li>
                </ul>
                <h4 className="text-lg sm:text-xl font-medium mt-4 sm:mt-6 text-pixel-teal font-pixel">
                  Example
                </h4>
                <pre className="bg-pixel-dark/90 p-4 rounded-md border border-pixel-teal/50 text-pixel-white overflow-x-auto line-numbers language-c">
                  <code className="language-c font-code text-sm">
                    {`#include "arcade.h"
int main() {
    arcade_init(800, 600, "Game", 0x000000);
    while (arcade_running() && arcade_update()) {
        if (arcade_key_pressed_once(a_esc) == 2) {
            arcade_set_running(0);
        }
        arcade_sleep(16);
    }
    arcade_quit();
    return 0;
}`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        );
      case "api-structures":
        return (
          <div className="space-y-6 text-pixel-white bg-gradient-to-b from-pixel-dark/80 to-pixel-navy/80 p-4 sm:p-6 md:p-8 rounded-lg">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pixel-white font-pixel">
              Data Structures
            </h1>
            <div className="bg-pixel-dark/50 p-4 sm:p-6 rounded-md">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-pixel-teal font-pixel">
                Overview
              </h3>
              <div className="prose prose-invert max-w-none leading-relaxed text-base sm:text-lg text-pixel-light">
                <p>Core data structures for sprites and groups:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      ArcadeSprite
                    </code>
                    : Color-based sprite with fields: x, y, width, height, vy,
                    vx, color (0xRRGGBB), active.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      ArcadeImageSprite
                    </code>
                    : Image-based sprite with fields: x, y, width, height, vy,
                    vx, pixels (RGBA), image_width, image_height, active.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      ArcadeAnimatedSprite
                    </code>
                    : Animated sprite with fields: frames (array of
                    ArcadeImageSprite), frame_count, current_frame,
                    frame_interval, frame_counter.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      ArcadeAnySprite
                    </code>
                    : Union with fields: sprite (ArcadeSprite), image_sprite
                    (ArcadeImageSprite).
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      SpriteGroup
                    </code>
                    : Sprite collection with fields: sprites (array of
                    ArcadeAnySprite), types (array of
                    SPRITE_COLOR/SPRITE_IMAGE), count, capacity.
                  </li>
                </ul>
                <h4 className="text-lg sm:text-xl font-medium mt-4 sm:mt-6 text-pixel-teal font-pixel">
                  Example
                </h4>
                <pre className="bg-pixel-dark/90 p-4 rounded-md border border-pixel-teal/50 text-pixel-white overflow-x-auto line-numbers language-c">
                  <code className="language-c font-code text-sm">
                    {`#include "arcade.h"
SpriteGroup group;
ArcadeSprite platform = {100.0f, 500.0f, 200.0f, 20.0f, 0.0f, 0.0f, 0x00FF00, 1};
ArcadeImageSprite player = arcade_create_image_sprite(100.0f, 100.0f, 50.0f, 50.0f, "player.png");
arcade_init_group(&group, 2);
arcade_add_sprite_to_group(&group, (ArcadeAnySprite){.sprite = platform}, SPRITE_COLOR);
arcade_add_sprite_to_group(&group, (ArcadeAnySprite){.image_sprite = player}, SPRITE_IMAGE);`}
                  </code>
                </pre>
                <p>
                  <strong>Notes</strong>:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Free image sprite pixels and groups to avoid memory leaks.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      active
                    </code>{" "}
                    controls rendering/collision eligibility.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      case "api-functions":
        return (
          <div className="space-y-6 text-pixel-white bg-gradient-to-b from-pixel-dark/80 to-pixel-navy/80 p-4 sm:p-6 md:p-8 rounded-lg">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pixel-white font-pixel">
              Functions
            </h1>
            <div className="bg-pixel-dark/50 p-4 sm:p-6 rounded-md">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-pixel-teal font-pixel">
                Overview
              </h3>
              <div className="prose prose-invert max-w-none leading-relaxed text-base sm:text-lg text-pixel-light">
                <p>All Arcade Library functions, grouped by category:</p>
                <h4 className="text-lg sm:text-xl font-medium mt-4 sm:mt-6 text-pixel-teal font-pixel">
                  Core Functions
                </h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      int <span className="text-pixel-yellow">arcade_init</span>
                      (int window_width, int window_height, const char
                      *window_title, uint32_t bg_color)
                    </code>
                    : Initializes window.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      void{" "}
                      <span className="text-pixel-yellow">arcade_quit</span>
                      (void)
                    </code>
                    : Frees resources and closes window.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      int{" "}
                      <span className="text-pixel-yellow">arcade_update</span>
                      (void)
                    </code>
                    : Processes events.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      int{" "}
                      <span className="text-pixel-yellow">arcade_running</span>
                      (void)
                    </code>
                    : Checks if game is running.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      void{" "}
                      <span className="text-pixel-yellow">
                        arcade_set_running
                      </span>
                      (int value)
                    </code>
                    : Sets running state.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      void{" "}
                      <span className="text-pixel-yellow">arcade_sleep</span>
                      (unsigned int milliseconds)
                    </code>
                    : Pauses execution.
                  </li>
                </ul>
                <h4 className="text-lg sm:text-xl font-medium mt-4 sm:mt-6 text-pixel-teal font-pixel">
                  Input Handling
                </h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      int{" "}
                      <span className="text-pixel-yellow">
                        arcade_key_pressed
                      </span>
                      (unsigned int key_val)
                    </code>
                    : Detects continuous key presses.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      int{" "}
                      <span className="text-pixel-yellow">
                        arcade_key_pressed_once
                      </span>
                      (unsigned int key_val)
                    </code>
                    : Detects single key presses.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      void{" "}
                      <span className="text-pixel-yellow">
                        arcade_clear_keys
                      </span>
                      (void)
                    </code>
                    : Resets key states.
                  </li>
                </ul>
                <h4 className="text-lg sm:text-xl font-medium mt-4 sm:mt-6 text-pixel-teal font-pixel">
                  Sprite Operations
                </h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      void{" "}
                      <span className="text-pixel-yellow">
                        arcade_move_sprite
                      </span>
                      (ArcadeSprite *sprite, float gravity, int window_height)
                    </code>
                    : Moves color-based sprite.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      void{" "}
                      <span className="text-pixel-yellow">
                        arcade_move_image_sprite
                      </span>
                      (ArcadeImageSprite *sprite, float gravity, int
                      window_height)
                    </code>
                    : Moves image-based sprite.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      int{" "}
                      <span className="text-pixel-yellow">
                        arcade_check_collision
                      </span>
                      (ArcadeSprite *a, ArcadeSprite *b)
                    </code>
                    : Checks collision for color-based sprites.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      int{" "}
                      <span className="text-pixel-yellow">
                        arcade_check_image_collision
                      </span>
                      (ArcadeImageSprite *a, ArcadeImageSprite *b)
                    </code>
                    : Checks collision for image-based sprites.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      ArcadeImageSprite{" "}
                      <span className="text-pixel-yellow">
                        arcade_create_image_sprite
                      </span>
                      (float x, float y, float w, float h, const char *filename)
                    </code>
                    : Creates image sprite.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      void{" "}
                      <span className="text-pixel-yellow">
                        arcade_free_image_sprite
                      </span>
                      (ArcadeImageSprite *sprite)
                    </code>
                    : Frees image sprite.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      ArcadeAnimatedSprite{" "}
                      <span className="text-pixel-yellow">
                        arcade_create_animated_sprite
                      </span>
                      (float x, float y, float w, float h, const char
                      **filenames, int frame_count, int frame_interval)
                    </code>
                    : Creates animated sprite.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      void{" "}
                      <span className="text-pixel-yellow">
                        arcade_free_animated_sprite
                      </span>
                      (ArcadeAnimatedSprite *anim)
                    </code>
                    : Frees animated sprite.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      void{" "}
                      <span className="text-pixel-yellow">
                        arcade_move_animated_sprite
                      </span>
                      (ArcadeAnimatedSprite *anim, float gravity, int
                      window_height)
                    </code>
                    : Moves animated sprite.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      int{" "}
                      <span className="text-pixel-yellow">
                        arcade_check_animated_collision
                      </span>
                      (ArcadeAnimatedSprite *anim, ArcadeImageSprite *other)
                    </code>
                    : Checks collision for animated sprite.
                  </li>
                </ul>
                <h4 className="text-lg sm:text-xl font-medium mt-4 sm:mt-6 text-pixel-teal font-pixel">
                  Rendering
                </h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      void{" "}
                      <span className="text-pixel-yellow">
                        arcade_render_scene
                      </span>
                      (ArcadeAnySprite *sprites, int count, int *types)
                    </code>
                    : Renders sprites.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      void{" "}
                      <span className="text-pixel-yellow">
                        arcade_render_text
                      </span>
                      (const char *text, float x, float y, unsigned int color)
                    </code>
                    : Renders text.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      void{" "}
                      <span className="text-pixel-yellow">
                        arcade_render_text_centered
                      </span>
                      (const char *text, float y, unsigned int color)
                    </code>
                    : Renders centered text.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      void{" "}
                      <span className="text-pixel-yellow">
                        arcade_render_text_centered_blink
                      </span>
                      (const char *text, float y, unsigned int color, int
                      blink_interval)
                    </code>
                    : Renders blinking text.
                  </li>
                </ul>
                <h4 className="text-lg sm:text-xl font-medium mt-4 sm:mt-6 text-pixel-teal font-pixel">
                  Sprite Groups
                </h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      void{" "}
                      <span className="text-pixel-yellow">
                        arcade_init_group
                      </span>
                      (SpriteGroup *group, int capacity)
                    </code>
                    : Initializes sprite group.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      void{" "}
                      <span className="text-pixel-yellow">
                        arcade_add_sprite_to_group
                      </span>
                      (SpriteGroup *group, ArcadeAnySprite sprite, int type)
                    </code>
                    : Adds sprite to group.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      void{" "}
                      <span className="text-pixel-yellow">
                        arcade_add_animated_to_group
                      </span>
                      (SpriteGroup *group, ArcadeAnimatedSprite *anim)
                    </code>
                    : Adds animated sprite.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      void{" "}
                      <span className="text-pixel-yellow">
                        arcade_render_group
                      </span>
                      (SpriteGroup *group)
                    </code>
                    : Renders group.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      void{" "}
                      <span className="text-pixel-yellow">
                        arcade_free_group
                      </span>
                      (SpriteGroup *group)
                    </code>
                    : Frees group.
                  </li>
                </ul>
                <h4 className="text-lg sm:text-xl font-medium mt-4 sm:mt-6 text-pixel-teal font-pixel">
                  Audio
                </h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      int{" "}
                      <span className="text-pixel-yellow">
                        arcade_play_sound
                      </span>
                      (const char *audio_file_path)
                    </code>
                    : Plays WAV audio asynchronously.
                  </li>
                </ul>
                <h4 className="text-lg sm:text-xl font-medium mt-4 sm:mt-6 text-pixel-teal font-pixel">
                  Image Manipulation
                </h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      char *
                      <span className="text-pixel-yellow">
                        arcade_flip_image
                      </span>
                      (const char *input_path, int flip_type)
                    </code>
                    : Flips image (0 = horizontal, 1 = vertical).
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      char *
                      <span className="text-pixel-yellow">
                        arcade_rotate_image
                      </span>
                      (const char *input_path, int degrees)
                    </code>
                    : Rotates image (0, 90, 180, 270 degrees).
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-6 text-pixel-white bg-gradient-to-b from-pixel-dark/80 to-pixel-navy/80 p-4 sm:p-6 md:p-8 rounded-lg">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pixel-white font-pixel">
              Not Found
            </h1>
            <p className="text-base sm:text-lg text-pixel-light">
              The requested documentation section could not be found.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-pixel-dark text-pixel-white">
      {/* Mobile Sidebar Toggle Button */}
      <div className="md:hidden sticky top-0 z-50 p-3 bg-pixel-navy/90 flex justify-between items-center shadow-md">
        <h2 className="text-lg sm:text-xl font-bold font-pixel text-pixel-teal">
          Arcade Docs
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          className="hover:bg-pixel-teal/20 rounded-full transition-colors"
        >
          {isSidebarOpen ? (
            <X className="h-5 w-5 text-pixel-teal" />
          ) : (
            <Menu className="h-5 w-5 text-pixel-teal" />
          )}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-4/5 sm:w-3/5 md:w-64 lg:w-80 bg-pixel-navy/90 p-4 md:p-6 border-r border-pixel-teal/30 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:static md:transform-none md:block h-full overflow-y-auto scrollbar-thin scrollbar-thumb-pixel-teal scrollbar-track-pixel-dark`}
      >
        <div className="mb-6">
          <h2 className="text-lg md:text-xl font-bold mb-4 text-pixel-teal font-pixel">
            Arcade Library Docs
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-pixel-light" />
            <Input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-pixel-dark/50 border-pixel-teal/50 text-pixel-white placeholder-pixel-light focus:ring-pixel-teal focus:border-pixel-teal text-sm rounded-md"
            />
          </div>
        </div>
        <Accordion type="single" collapsible className="space-y-2">
          {filteredSections.map((section, index) => (
            <AccordionItem key={index} value={`section-${index}`}>
              <AccordionTrigger className="text-sm md:text-base font-semibold text-pixel-teal hover:text-pixel-white font-pixel py-2">
                {section.title}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-1 pl-4">
                  {section.items.map((item) => (
                    <li key={item.id}>
                      <Button
                        variant="link"
                        className={`text-xs md:text-sm text-pixel-light hover:text-pixel-teal font-pixel transition-colors ${
                          currentSection === item.id
                            ? "text-pixel-teal font-bold"
                            : ""
                        }`}
                        onClick={() => handleSectionClick(item.id)}
                      >
                        {item.name}
                      </Button>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto max-w-full">
        <div className="max-w-4xl mx-auto">{renderContent()}</div>
      </div>
    </div>
  );
};

export default DocumentationPage;
