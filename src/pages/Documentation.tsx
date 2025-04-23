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
import { Search } from "lucide-react";

const DocumentationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const sidebarSections = [
    {
      title: "Getting Started",
      items: [
        { id: "introduction", name: "Introduction" },
        { id: "installation", name: "Installation" },
        { id: "usage-example", name: "Usage Example" },
      ],
    },
    {
      title: "Core Features",
      items: [
        { id: "core-functions", name: "Core Functions" },
        { id: "input-handling", name: "Input Handling" },
        { id: "rendering", name: "Rendering" },
      ],
    },
    {
      title: "Sprite Management",
      items: [
        { id: "sprite-types", name: "Sprite Types" },
        { id: "sprite-operations", name: "Sprite Operations" },
        { id: "animation", name: "Animation" },
        { id: "collision", name: "Collision Detection" },
      ],
    },
    {
      title: "Advanced Features",
      items: [
        { id: "sprite-groups", name: "Sprite Groups" },
        { id: "audio-system", name: "Audio System" },
        { id: "image-manipulation", name: "Image Manipulation" },
      ],
    },
    {
      title: "API Reference",
      items: [
        { id: "api-enums", name: "Enumerations" },
        { id: "api-keys", name: "Key Definitions" },
        { id: "api-structures", name: "Data Structures" },
        { id: "api-functions", name: "Functions" },
      ],
    },
  ];

  const contentMap = useMemo(
    () => ({
      introduction: {
        title: "Introduction to Arcade Library",
        content: `The Arcade Library is a lightweight C library for creating 2D arcade-style games with cross-platform support for Windows (Win32) and Linux (X11). It provides window management, color and image-based sprites, sprite animation, collision detection, sound playback, text rendering, and image manipulation. Ideal for retro games like Flappy Bird or Pong with minimal dependencies. Author: GeorgeET15. Repository: https://github.com/GeorgeET15/arcade-lib. Key Features: Cross-platform window management, sprite handling, input processing, audio playback, and image manipulation.`,
      },
      installation: {
        title: "Installation",
        content: `Dependencies vary by platform: Linux: libX11 (window/rendering), libm (math), STB libraries (image processing), aplay (sound). Windows: gdi32 (rendering), winmm (sound), STB libraries. Compilation: - Linux: gcc -o game game.c arcade.c -lX11 -lm - Windows: gcc -o game game.c arcade.c -lgdi32 -lwinmm Setup: 1. Linux: Install libx11-dev, libm (sudo apt install libx11-dev), ensure alsa-utils for aplay. 2. Windows: Use MinGW or MSYS2; gdi32/winmm are included. 3. Download STB libraries (stb_image.h, stb_image_write.h, stb_image_resize2.h) from https://github.com/nothings/stb. 4. Include arcade.h in your project. Note: Ensure image/audio files are in the correct paths.`,
      },
      "usage-example": {
        title: "Usage Example",
        content: `Creates a window, loads an image sprite, and renders it in a ~60 FPS game loop. Example includes error handling and cross-platform frame rate control. Ensure sprite.png is accessible and WAV files are PCM, 16-bit.`,
      },
      "core-functions": {
        title: "Core Functions",
        content: `Manage the game environment: - arcade_init: Initializes window with width, height, title, background color. - arcade_quit: Frees resources, closes window. - arcade_update: Processes events (keys, window close). - arcade_running: Checks if game is running. - arcade_set_running: Sets running state (e.g., exit on ESC). - arcade_sleep: Pauses for milliseconds to control frame rate.`,
      },
      "input-handling": {
        title: "Input Handling",
        content: `Handle keyboard input: - arcade_key_pressed: Detects continuous key presses (e.g., movement). - arcade_key_pressed_once: Detects single key presses (e.g., jump). - arcade_clear_keys: Resets key states (e.g., on pause). Example: Move with a_right, jump with a_space.`,
      },
      rendering: {
        title: "Rendering",
        content: `Render sprites and text: - arcade_render_scene: Renders multiple sprites (color/image-based). - arcade_render_text: Renders text at a position. - arcade_render_text_centered: Renders horizontally centered text. - arcade_render_text_centered_blink: Renders blinking centered text. Uses GDI (Windows) or XImage (Linux) for double buffering.`,
      },
      "sprite-types": {
        title: "Sprite Types",
        content: `Supported sprite types: - ArcadeSprite: Color-based (position, size, velocity, color, active). - ArcadeImageSprite: Image-based (position, size, velocity, pixel data). - ArcadeAnimatedSprite: Multi-frame animated sprite. - ArcadeAnySprite: Union for color/image sprites. Used for rendering and collision detection.`,
      },
      "sprite-operations": {
        title: "Sprite Operations",
        content: `Manage sprites: - arcade_create_image_sprite: Loads image-based sprite from file. - arcade_free_image_sprite: Frees sprite pixel data. - arcade_move_sprite: Updates color-based sprite position with gravity. - arcade_move_image_sprite: Updates image-based sprite position. Always free sprites to avoid memory leaks.`,
      },
      animation: {
        title: "Animation",
        content: `Handle animated sprites: - arcade_create_animated_sprite: Creates sprite with multiple frames. - arcade_free_animated_sprite: Frees all frame data. - arcade_move_animated_sprite: Updates position and animation frame. Example: Flapping bird with frame1.png, frame2.png.`,
      },
      collision: {
        title: "Collision Detection",
        content: `AABB collision detection: - arcade_check_collision: For color-based sprites. - arcade_check_image_collision: For image-based sprites. - arcade_check_animated_collision: For animated vs. image-based sprites. Returns 1 if collision occurs, 0 otherwise.`,
      },
      "sprite-groups": {
        title: "Sprite Groups",
        content: `Manage multiple sprites: - arcade_init_group: Initializes group with capacity. - arcade_add_sprite_to_group: Adds sprite to group. - arcade_add_animated_to_group: Adds animated sprite’s current frame. - arcade_render_group: Renders all group sprites. - arcade_free_group: Frees group memory. Efficient for batch rendering.`,
      },
      "audio-system": {
        title: "Audio System",
        content: `Play WAV files: - arcade_play_sound: Plays audio asynchronously. Windows: Uses PlaySound (SND_FILENAME | SND_ASYNC); may have ~0.5s delay on old systems. Linux: Uses aplay (requires alsa-utils). Note: Use PCM, 16-bit WAV files. Preload sounds on Windows to reduce delays.`,
      },
      "image-manipulation": {
        title: "Image Manipulation",
        content: `Modify sprite images: - arcade_flip_image: Flips image vertically or horizontally. - arcade_rotate_image: Rotates image (0, 90, 180, 270 degrees). Creates temporary PNG files; caller must free returned paths.`,
      },
      "api-enums": {
        title: "Enumerations",
        content: `Sprite type identifiers: - SPRITE_COLOR (0): For ArcadeSprite. - SPRITE_IMAGE (1): For ArcadeImageSprite. Used in sprite groups and rendering.`,
      },
      "api-keys": {
        title: "Key Definitions",
        content: `Predefined key codes: - a_up, a_down, a_left, a_right, a_w, a_a, a_s, a_d, a_r, a_p, a_space, a_esc. Example: a_space (0x0020) for spacebar, a_esc (0xff1b) for escape. Platform-agnostic mappings for Windows and Linux.`,
      },
      "api-structures": {
        title: "Data Structures",
        content: `Core structures: - ArcadeSprite: x, y, width, height, vy, vx, color, active. - ArcadeImageSprite: x, y, width, height, vy, vx, pixels, image_width, image_height, active. - ArcadeAnimatedSprite: frames, frame_count, current_frame, frame_interval, frame_counter. - ArcadeAnySprite: Union (sprite, image_sprite). - SpriteGroup: sprites, types, count, capacity.`,
      },
      "api-functions": {
        title: "Functions",
        content: `All library functions: - Core: arcade_init, arcade_quit, arcade_update, arcade_running, arcade_set_running, arcade_sleep. - Input: arcade_key_pressed, arcade_key_pressed_once, arcade_clear_keys. - Sprites: arcade_move_sprite, arcade_move_image_sprite, arcade_check_collision, arcade_check_image_collision, arcade_create_image_sprite, arcade_free_image_sprite, arcade_create_animated_sprite, arcade_free_animated_sprite, arcade_move_animated_sprite, arcade_check_animated_collision. - Rendering: arcade_render_scene, arcade_render_text, arcade_render_text_centered, arcade_render_text_centered_blink. - Groups: arcade_init_group, arcade_add_sprite_to_group, arcade_add_animated_to_group, arcade_render_group, arcade_free_group. - Audio: arcade_play_sound. - Images: arcade_flip_image, arcade_rotate_image.`,
      },
    }),
    []
  );

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

  const handleSectionClick = (sectionId) => {
    navigate(`/docs/${sectionId}`);
  };

  const renderContent = () => {
    switch (currentSection) {
      case "introduction":
        return (
          <div className="space-y-8 text-pixel-white bg-gradient-to-b from-pixel-dark/80 to-pixel-navy/80 p-10 rounded-lg">
            <h1 className="text-4xl font-bold text-pixel-white font-pixel">
              Introduction to Arcade Library
            </h1>
            <div className="prose prose-invert max-w-none leading-relaxed text-lg text-pixel-light">
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
            <div className="bg-pixel-dark/50 p-6 rounded-md">
              <h3 className="text-2xl font-semibold mb-4 text-pixel-teal font-pixel">
                Library Overview
              </h3>
              <div className="prose prose-invert max-w-none leading-relaxed text-lg text-pixel-light">
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
                <h4 className="text-xl font-medium mt-6 text-pixel-teal font-pixel">
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
                <h4 className="text-xl font-medium mt-6 text-pixel-teal font-pixel">
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
          <div className="space-y-8 text-pixel-white bg-gradient-to-b from-pixel-dark/80 to-pixel-navy/80 p-10 rounded-lg">
            <h1 className="text-4xl font-bold text-pixel-white font-pixel">
              Installation
            </h1>
            <div className="bg-pixel-dark/50 p-6 rounded-md">
              <h3 className="text-2xl font-semibold mb-4 text-pixel-teal font-pixel">
                Dependencies
              </h3>
              <div className="prose prose-invert max-w-none leading-relaxed text-lg text-pixel-light">
                <h4 className="text-xl font-medium mt-6 text-pixel-teal font-pixel">
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
                <h4 className="text-xl font-medium mt-6 text-pixel-teal font-pixel">
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
                <h4 className="text-xl font-medium mt-6 text-pixel-teal font-pixel">
                  Compilation
                </h4>
                <p>
                  Compile with the appropriate flags, ensuring image and audio
                  files are in the correct paths:
                </p>
                <pre className="bg-pixel-dark/90 p-4 rounded-md border border-pixel-teal/50 text-pixel-white overflow-x-auto line-numbers language-bash">
                  <code className="language-bash font-code text-sm">
                    # Linux gcc -o game game.c arcade.c -lX11 -lm # Windows gcc
                    -o game game.c arcade.c -lgdi32 -lwinmm
                  </code>
                </pre>
                <h4 className="text-xl font-medium mt-6 text-pixel-teal font-pixel">
                  Setup Instructions
                </h4>
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
                <p>
                  <strong>Note</strong>: Ensure WAV files are PCM, 16-bit.
                  Windows may experience audio delays on old systems; consider
                  preloading sounds (see Audio System).
                </p>
              </div>
            </div>
          </div>
        );
      case "usage-example":
        return (
          <div className="space-y-8 text-pixel-white bg-gradient-to-b from-pixel-dark/80 to-pixel-navy/80 p-10 rounded-lg">
            <h1 className="text-4xl font-bold text-pixel-white font-pixel">
              Usage Example
            </h1>
            <div className="bg-pixel-dark/50 p-6 rounded-md">
              <h3 className="text-2xl font-semibold mb-4 text-pixel-teal font-pixel">
                Basic Game Setup
              </h3>
              <div className="prose prose-invert max-w-none leading-relaxed text-lg text-pixel-light">
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
}
   `}{" "}
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
          <div className="space-y-8 text-pixel-white bg-gradient-to-b from-pixel-dark/80 to-pixel-navy/80 p-10 rounded-lg">
            <h1 className="text-4xl font-bold text-pixel-white font-pixel">
              Core Functions
            </h1>
            <div className="bg-pixel-dark/50 p-6 rounded-md">
              <h3 className="text-2xl font-semibold mb-4 text-pixel-teal font-pixel">
                Overview
              </h3>
              <div className="prose prose-invert max-w-none leading-relaxed text-lg text-pixel-light">
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
                <h4 className="text-xl font-medium mt-6 text-pixel-teal font-pixel">
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
          <div className="space-y-8 text-pixel-white bg-gradient-to-b from-pixel-dark/80 to-pixel-navy/80 p-10 rounded-lg">
            <h1 className="text-4xl font-bold text-pixel-white font-pixel">
              Input Handling
            </h1>
            <div className="bg-pixel-dark/50 p-6 rounded-md">
              <h3 className="text-2xl font-semibold mb-4 text-pixel-teal font-pixel">
                Overview
              </h3>
              <div className="prose prose-invert max-w-none leading-relaxed text-lg text-pixel-light">
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
                <h4 className="text-xl font-medium mt-6 text-pixel-teal font-pixel">
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
          <div className="space-y-8 text-pixel-white bg-gradient-to-b from-pixel-dark/80 to-pixel-navy/80 p-10 rounded-lg">
            <h1 className="text-4xl font-bold text-pixel-white font-pixel">
              Rendering
            </h1>
            <div className="bg-pixel-dark/50 p-6 rounded-md">
              <h3 className="text-2xl font-semibold mb-4 text-pixel-teal font-pixel">
                Overview
              </h3>
              <div className="prose prose-invert max-w-none leading-relaxed text-lg text-pixel-light">
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
                <h4 className="text-xl font-medium mt-6 text-pixel-teal font-pixel">
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
          <div className="space-y-8 text-pixel-white bg-gradient-to-b from-pixel-dark/80 to-pixel-navy/80 p-10 rounded-lg">
            <h1 className="text-4xl font-bold text-pixel-white font-pixel">
              Sprite Types
            </h1>
            <div className="bg-pixel-dark/50 p-6 rounded-md">
              <h3 className="text-2xl font-semibold mb-4 text-pixel-teal font-pixel">
                Overview
              </h3>
              <div className="prose prose-invert max-w-none leading-relaxed text-lg text-pixel-light">
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
                <h4 className="text-xl font-medium mt-6 text-pixel-teal font-pixel">
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
          <div className="space-y-8 text-pixel-white bg-gradient-to-b from-pixel-dark/80 to-pixel-navy/80 p-10 rounded-lg">
            <h1 className="text-4xl font-bold text-pixel-white font-pixel">
              Sprite Operations
            </h1>
            <div className="bg-pixel-dark/50 p-6 rounded-md">
              <h3 className="text-2xl font-semibold mb-4 text-pixel-teal font-pixel">
                Overview
              </h3>
              <div className="prose prose-invert max-w-none leading-relaxed text-lg text-pixel-light">
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
                <h4 className="text-xl font-medium mt-6 text-pixel-teal font-pixel">
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
          <div className="space-y-8 text-pixel-white bg-gradient-to-b from-pixel-dark/80 to-pixel-navy/80 p-10 rounded-lg">
            <h1 className="text-4xl font-bold text-pixel-white font-pixel">
              Animation
            </h1>
            <div className="bg-pixel-dark/50 p-6 rounded-md">
              <h3 className="text-2xl font-semibold mb-4 text-pixel-teal font-pixel">
                Overview
              </h3>
              <div className="prose prose-invert max-w-none leading-relaxed text-lg text-pixel-light">
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
                <h4 className="text-xl font-medium mt-6 text-pixel-teal font-pixel">
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
          <div className="space-y-8 text-pixel-white bg-gradient-to-b from-pixel-dark/80 to-pixel-navy/80 p-10 rounded-lg">
            <h1 className="text-4xl font-bold text-pixel-white font-pixel">
              Collision Detection
            </h1>
            <div className="bg-pixel-dark/50 p-6 rounded-md">
              <h3 className="text-2xl font-semibold mb-4 text-pixel-teal font-pixel">
                Overview
              </h3>
              <div className="prose prose-invert max-w-none leading-relaxed text-lg text-pixel-light">
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
                <h4 className="text-xl font-medium mt-6 text-pixel-teal font-pixel">
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
          <div className="space-y-8 text-pixel-white bg-gradient-to-b from-pixel-dark/80 to-pixel-navy/80 p-10 rounded-lg">
            <h1 className="text-4xl font-bold text-pixel-white font-pixel">
              Sprite Groups
            </h1>
            <div className="bg-pixel-dark/50 p-6 rounded-md">
              <h3 className="text-2xl font-semibold mb-4 text-pixel-teal font-pixel">
                Overview
              </h3>
              <div className="prose prose-invert max-w-none leading-relaxed text-lg text-pixel-light">
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
                <h4 className="text-xl font-medium mt-6 text-pixel-teal font-pixel">
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
    arcade_add_sprite_to_group(&group, (ArcadeAnySprite){.image_sprite = sprite2}, SPRITE_IMAGE);
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
          <div className="space-y-8 text-pixel-white bg-gradient-to-b from-pixel-dark/80 to-pixel-navy/80 p-10 rounded-lg">
            <h1 className="text-4xl font-bold text-pixel-white font-pixel">
              Audio System
            </h1>
            <div className="bg-pixel-dark/50 p-6 rounded-md">
              <h3 className="text-2xl font-semibold mb-4 text-pixel-teal font-pixel">
                Overview
              </h3>
              <div className="prose prose-invert max-w-none leading-relaxed text-lg text-pixel-light">
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
                <h4 className="text-xl font-medium mt-6 text-pixel-teal font-pixel">
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
                <h4 className="text-xl font-medium mt-6 text-pixel-teal font-pixel">
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
          <div className="space-y-8 text-pixel-white bg-gradient-to-b from-pixel-dark/80 to-pixel-navy/80 p-10 rounded-lg">
            <h1 className="text-4xl font-bold text-pixel-white font-pixel">
              Image Manipulation
            </h1>
            <div className="bg-pixel-dark/50 p-6 rounded-md">
              <h3 className="text-2xl font-semibold mb-4 text-pixel-teal font-pixel">
                Overview
              </h3>
              <div className="prose prose-invert max-w-none leading-relaxed text-lg text-pixel-light">
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
                <h4 className="text-xl font-medium mt-6 text-pixel-teal font-pixel">
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
          <div className="space-y-8 text-pixel-white bg-gradient-to-b from-pixel-dark/80 to-pixel-navy/80 p-10 rounded-lg">
            <h1 className="text-4xl font-bold text-pixel-white font-pixel">
              Enumerations
            </h1>
            <div className="bg-pixel-dark/50 p-6 rounded-md">
              <h3 className="text-2xl font-semibold mb-4 text-pixel-teal font-pixel">
                Overview
              </h3>
              <div className="prose prose-invert max-w-none leading-relaxed text-lg text-pixel-light">
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
                <h4 className="text-xl font-medium mt-6 text-pixel-teal font-pixel">
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
          <div className="space-y-8 text-pixel-white bg-gradient-to-b from-pixel-dark/80 to-pixel-navy/80 p-10 rounded-lg">
            <h1 className="text-4xl font-bold text-pixel-white font-pixel">
              Key Definitions
            </h1>
            <div className="bg-pixel-dark/50 p-6 rounded-md">
              <h3 className="text-2xl font-semibold mb-4 text-pixel-teal font-pixel">
                Overview
              </h3>
              <div className="prose prose-invert max-w-none leading-relaxed text-lg text-pixel-light">
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
                <h4 className="text-xl font-medium mt-6 text-pixel-teal font-pixel">
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
          <div className="space-y-8 text-pixel-white bg-gradient-to-b from-pixel-dark/80 to-pixel-navy/80 p-10 rounded-lg">
            <h1 className="text-4xl font-bold text-pixel-white font-pixel">
              Data Structures
            </h1>
            <div className="bg-pixel-dark/50 p-6 rounded-md">
              <h3 className="text-2xl font-semibold mb-4 text-pixel-teal font-pixel">
                Overview
              </h3>
              <div className="prose prose-invert max-w-none leading-relaxed text-lg text-pixel-light">
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
                <h4 className="text-xl font-medium mt-6 text-pixel-teal font-pixel">
                  Example
                </h4>
                <pre className="bg-pixel-dark/90 p-4 rounded-md border border-pixel-teal/50 text-pixel-white overflow-x-auto line-numbers language-c">
                  <code className="language-c font-code text-sm">
                    #include "arcade.h"
                    {`SpriteGroup group;
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
          <div className="space-y-8 text-pixel-white bg-gradient-to-b from-pixel-dark/80 to-pixel-navy/80 p-10 rounded-lg">
            <h1 className="text-4xl font-bold text-pixel-white font-pixel">
              Functions
            </h1>
            <div className="bg-pixel-dark/50 p-6 rounded-md">
              <h3 className="text-2xl font-semibold mb-4 text-pixel-teal font-pixel">
                Overview
              </h3>
              <div className="prose prose-invert max-w-none leading-relaxed text-lg text-pixel-light">
                <p>All Arcade Library functions, grouped by category:</p>
                <h4 className="text-xl font-medium mt-6 text-pixel-teal font-pixel">
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
                    : Closes window.
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
                    : Checks running state.
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
                <h4 className="text-xl font-medium mt-6 text-pixel-teal font-pixel">
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
                    : Checks key hold.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      int{" "}
                      <span className="text-pixel-yellow">
                        arcade_key_pressed_once
                      </span>
                      (unsigned int key_val)
                    </code>
                    : Checks single press.
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
                <h4 className="text-xl font-medium mt-6 text-pixel-teal font-pixel">
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
                    : Moves color-based sprite with gravity and boundary checks.
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
                    : Moves image-based sprite with gravity and boundary checks.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      int{" "}
                      <span className="text-pixel-yellow">
                        arcade_check_collision
                      </span>
                      (ArcadeSprite *a, ArcadeSprite *b)
                    </code>
                    : Checks AABB collision between color-based sprites.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      int{" "}
                      <span className="text-pixel-yellow">
                        arcade_check_image_collision
                      </span>
                      (ArcadeImageSprite *a, ArcadeImageSprite *b)
                    </code>
                    : Checks AABB collision between image-based sprites.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      ArcadeImageSprite{" "}
                      <span className="text-pixel-yellow">
                        arcade_create_image_sprite
                      </span>
                      (float x, float y, float w, float h, const char *filename)
                    </code>
                    : Creates an image-based sprite from a file (e.g., PNG).
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      void{" "}
                      <span className="text-pixel-yellow">
                        arcade_free_image_sprite
                      </span>
                      (ArcadeImageSprite *sprite)
                    </code>
                    : Frees image sprite pixel data.
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
                    : Creates an animated sprite with multiple frames.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      void{" "}
                      <span className="text-pixel-yellow">
                        arcade_free_animated_sprite
                      </span>
                      (ArcadeAnimatedSprite *anim)
                    </code>
                    : Frees animated sprite and all frame data.
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
                    : Updates animated sprite position and frame.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      int{" "}
                      <span className="text-pixel-yellow">
                        arcade_check_animated_collision
                      </span>
                      (ArcadeAnimatedSprite *anim, ArcadeImageSprite *other)
                    </code>
                    : Checks AABB collision between animated and image-based
                    sprites.
                  </li>
                </ul>
                <h4 className="text-xl font-medium mt-6 text-pixel-teal font-pixel">
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
                    : Renders multiple sprites (color or image-based).
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      void{" "}
                      <span className="text-pixel-yellow">
                        arcade_render_text
                      </span>
                      (const char *text, float x, float y, unsigned int color)
                    </code>
                    : Renders text at specified position.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      void{" "}
                      <span className="text-pixel-yellow">
                        arcade_render_text_centered
                      </span>
                      (const char *text, float y, unsigned int color)
                    </code>
                    : Renders horizontally centered text.
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
                    : Renders blinking centered text.
                  </li>
                </ul>
                <h4 className="text-xl font-medium mt-6 text-pixel-teal font-pixel">
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
                    : Initializes a sprite group with specified capacity.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      void{" "}
                      <span className="text-pixel-yellow">
                        arcade_add_sprite_to_group
                      </span>
                      (SpriteGroup *group, ArcadeAnySprite sprite, int type)
                    </code>
                    : Adds a sprite (color or image-based) to the group.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      void{" "}
                      <span className="text-pixel-yellow">
                        arcade_add_animated_to_group
                      </span>
                      (SpriteGroup *group, ArcadeAnimatedSprite *anim)
                    </code>
                    : Adds an animated sprite’s current frame to the group.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      void{" "}
                      <span className="text-pixel-yellow">
                        arcade_render_group
                      </span>
                      (SpriteGroup *group)
                    </code>
                    : Renders all sprites in the group.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      void{" "}
                      <span className="text-pixel-yellow">
                        arcade_free_group
                      </span>
                      (SpriteGroup *group)
                    </code>
                    : Frees group memory (not sprite data).
                  </li>
                </ul>
                <h4 className="text-xl font-medium mt-6 text-pixel-teal font-pixel">
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
                    : Plays a WAV file asynchronously.
                  </li>
                </ul>
                <h4 className="text-xl font-medium mt-6 text-pixel-teal font-pixel">
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
                    : Flips image (0 = horizontal, 1 = vertical). Returns
                    temporary file path.
                  </li>
                  <li>
                    <code className="bg-pixel-dark/70 px-1 rounded font-code">
                      char *
                      <span className="text-pixel-yellow">
                        arcade_rotate_image
                      </span>
                      (const char *input_path, int degrees)
                    </code>
                    : Rotates image (0, 90, 180, 270 degrees). Returns temporary
                    file path.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-8 text-pixel-white bg-gradient-to-b from-pixel-dark/80 to-pixel-navy/80 p-10 rounded-lg">
            <h1 className="text-4xl font-bold text-pixel-white font-pixel">
              Section Not Found
            </h1>
            <p className="text-lg text-pixel-light">
              The requested documentation section is not available. Please
              select a valid section from the sidebar.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-pixel-dark text-pixel-white flex">
      <div className="w-80 bg-pixel-navy/80 p-6 border-r border-pixel-teal/30 flex flex-col gap-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pixel-teal" />
          <Input
            type="text"
            placeholder="Search documentation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-pixel-dark/50 border-pixel-teal/50 text-pixel-white placeholder-pixel-light focus:ring-pixel-teal"
          />
        </div>
        <Accordion type="single" collapsible className="space-y-2">
          {filteredSections.map((section, index) => (
            <AccordionItem key={index} value={section.title}>
              <AccordionTrigger className="text-pixel-teal font-pixel text-sm hover:text-pixel-white">
                {section.title}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item.id}>
                      <Button
                        variant={
                          currentSection === item.id ? "default" : "ghost"
                        }
                        className={`w-full text-left justify-start font-bold ${
                          currentSection === item.id
                            ? "bg-pixel-teal text-pixel-dark"
                            : "text-pixel-light hover:text-pixel-white hover:bg-pixel-teal/20"
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
      <div className="flex-1 p-10 overflow-auto">{renderContent()}</div>
    </div>
  );
};

export default DocumentationPage;
