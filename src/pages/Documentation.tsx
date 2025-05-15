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
          <div className="space-y-6 text-pixel-white p-4 sm:p-6 md:p-8 rounded-lg">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pixel-white font-pixel">
              Introduction
            </h1>
            <div className="prose prose-invert max-w-none leading-relaxed text-base sm:text-lg text-pixel-light">
              <p>
                Arcade is a lightweight C library (v1.1.0) for building 2D retro
                games on Windows and Linux. It’s perfect for creating games like
                Flappy Bird or Pong with minimal setup. The ecosystem includes
                the Arcade CLI for project setup and the Arcade IDE for a
                retro-themed coding environment.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Supports window management, sprites, animations, and audio.
                </li>
                <li>
                  Cross-platform: Windows (Win32, GDI) and Linux (X11, aplay).
                </li>
                <li>
                  Developed by GeorgeET15.{" "}
                  <a
                    href="https://github.com/GeorgeET15/arcade-lib"
                    className="text-pixel-teal hover:underline"
                  >
                    GitHub
                  </a>
                  .
                </li>
                <li>
                  CLI:{" "}
                  <a
                    href="https://github.com/GeorgeET15/arcade-cli"
                    className="text-pixel-teal hover:underline"
                  >
                    Arcade CLI
                  </a>
                  .
                </li>
                <li>
                  IDE:{" "}
                  <a
                    href="https://github.com/GeorgeET15/arcade-ide"
                    className="text-pixel-teal hover:underline"
                  >
                    Arcade IDE
                  </a>
                  .
                </li>
                <li>
                  Wiki:{" "}
                  <a
                    href="https://arcade-lib.vercel.app/"
                    className="text-pixel-teal hover:underline"
                  >
                    ARCADE Wiki
                  </a>
                  .
                </li>
              </ul>
            </div>
          </div>
        );
      case "installation":
        return (
          <div className="space-y-6 text-pixel-white p-4 sm:p-6 md:p-8 rounded-lg">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pixel-white font-pixel">
              Installation
            </h1>
            <div className="prose prose-invert max-w-none leading-relaxed text-base sm:text-lg text-pixel-light">
              <p>Use the Arcade CLI for quick setup or install manually.</p>
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-pixel-teal font-pixel">
                Arcade CLI
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Install Node.js 16+ from{" "}
                  <a
                    href="https://nodejs.org/"
                    className="text-pixel-teal hover:underline"
                  >
                    nodejs.org
                  </a>
                  .
                </li>
                <li>
                  Install CLI:{" "}
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    npm install -g arcade-cli
                  </code>
                  .
                </li>
                <li>
                  Verify:{" "}
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade --help
                  </code>
                  .
                </li>
                <li>
                  Create project:{" "}
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade init my-game
                  </code>
                  .
                </li>
                <li>
                  Build and run:{" "}
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    cd my-game && make && make run
                  </code>
                  .
                </li>
                <li>
                  Needs: gcc (Linux: build-essential; Windows: MinGW), internet
                  for assets.
                </li>
                <li>
                  CLI GitHub:{" "}
                  <a
                    href="https://github.com/GeorgeET15/arcade-cli"
                    className="text-pixel-teal hover:underline"
                  >
                    arcade-cli
                  </a>
                  .
                </li>
              </ul>
              <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-4 text-pixel-teal font-pixel">
                Manual Setup
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Linux: Install{" "}
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    libx11-dev
                  </code>
                  ,{" "}
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    alsa-utils
                  </code>
                  .
                </li>
                <li>Windows: Install MinGW (includes gdi32, winmm).</li>
                <li>
                  Download STB libraries from{" "}
                  <a
                    href="https://github.com/nothings/stb"
                    className="text-pixel-teal hover:underline"
                  >
                    GitHub
                  </a>
                  .
                </li>
                <li>
                  Get{" "}
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade.h
                  </code>{" "}
                  from{" "}
                  <a
                    href="https://github.com/GeorgeET15/arcade-lib"
                    className="text-pixel-teal hover:underline"
                  >
                    arcade-lib
                  </a>
                  .
                </li>
                <li>
                  Compile:
                  <pre className="bg-pixel-navy/80 p-4 rounded-md border border-pixel-teal/50 text-pixel-white text-sm">
                    <code className="language-bash font-code">
                      # Linux gcc -o game game.c arcade.c -lX11 -lm
                    </code>
                  </pre>
                  <pre className="bg-pixel-navy/80 p-4 rounded-md border border-pixel-teal/50 text-pixel-white text-sm mt-2">
                    <code className="language-bash font-code">
                      # Windows gcc -o game game.c arcade.c -lgdi32 -lwinmm
                    </code>
                  </pre>
                </li>
                <li>Use PCM, 16-bit WAV files for audio.</li>
              </ul>
            </div>
          </div>
        );
      case "usage-example":
        return (
          <div className="space-y-6 text-pixel-white bg-pixel-dark p-4 sm:p-6 md:p-8 rounded-lg">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pixel-white font-pixel">
              Usage Example
            </h1>
            <div className="prose prose-invert max-w-none leading-relaxed text-base sm:text-lg text-pixel-light">
              <p>
                This example creates a game where a player moves a sprite and
                shoots a bullet at a moving target, scoring points on hits.
              </p>
              <pre className="bg-pixel-navy/80 p-4 rounded-md border border-pixel-teal/50 text-pixel-white overflow-x-auto line-numbers language-c">
                <code className="language-c font-code text-sm">
                  {`#define ARCADE_IMPLEMENTATION
#include "arcade.h"
typedef enum { Start, Playing, GameOver } GameState;
int main() {
    arcade_init(800, 600, "Game", 0x000000);
    ArcadeSprite player = {300, 500, 20, 20, 0, 0, 0xFF0000, 1};
    ArcadeSprite bullet = {0, 0, 5, 5, 0, 0, 0xFFFF00, 0};
    ArcadeSprite target = {300, 100, 30, 30, 2, 0, 0x00FF00, 1};
    SpriteGroup group; arcade_init_group(&group, 3);
    GameState state = Playing; int score = 0; char text[32];
    while (arcade_running() && arcade_update()) {
        float dt = arcade_delta_time() * 60.0f;
        snprintf(text, sizeof(text), "Score: %d", score);
        group.count = 0;
        arcade_add_sprite_to_group(&group, (ArcadeAnySprite){.sprite = player}, SPRITE_COLOR);
        if (bullet.active) arcade_add_sprite_to_group(&group, (ArcadeAnySprite){.sprite = bullet}, SPRITE_COLOR);
        arcade_add_sprite_to_group(&group, (ArcadeAnySprite){.sprite = target}, SPRITE_COLOR);
        arcade_render_group(&group);
        arcade_render_text(text, 10, 30, 0xFFFFFF);
        if (state == Playing) {
            if (arcade_key_pressed(a_right) == 2) player.vx = 5;
            else if (arcade_key_pressed(a_left) == 2) player.vx = -5;
            else player.vx = 0;
            player.x += player.vx * dt;
            if (player.x < 0) player.x = 0;
            else if (player.x > 780) player.x = 780;
            if (arcade_key_pressed_once(a_space) == 2 && !bullet.active) {
                bullet.x = player.x + 7.5; bullet.y = player.y;
                bullet.vy = -10; bullet.active = 1;
            }
            if (bullet.active) {
                bullet.y += bullet.vy * dt;
                if (bullet.y < 0) bullet.active = 0;
                if (arcade_check_collision(&bullet, &target)) {
                    bullet.active = 0; score++;
                    target.x = rand() % 750;
                }
            }
            target.x += target.vx * dt;
            if (target.x < 0 || target.x > 770) target.vx = -target.vx;
        }
        arcade_sleep(16);
    }
    arcade_free_group(&group);
    arcade_quit();
    return 0;
}`}
                </code>
              </pre>
              <ul className="list-disc pl-6 space-y-2">
                <li>Uses delta time for smooth movement.</li>
                <li>Manages sprites in a group for rendering.</li>
                <li>Press Space to shoot, arrows to move.</li>
              </ul>
            </div>
          </div>
        );
      case "core-functions":
        return (
          <div className="space-y-6 text-pixel-white p-4 sm:p-6 md:p-8 rounded-lg">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pixel-white font-pixel">
              Core Functions
            </h1>
            <div className="prose prose-invert max-w-none leading-relaxed text-base sm:text-lg text-pixel-light">
              <p>
                These functions set up and manage your game’s window and loop.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_init(width, height, title, bg_color)
                  </code>
                  : Opens a window (returns 0 if OK).
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_quit()
                  </code>
                  : Closes the window.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_update()
                  </code>
                  : Handles events (returns 1 to continue).
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_running()
                  </code>
                  : Checks if game is running (1 = yes).
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_set_running(value)
                  </code>
                  : Sets running state (0 = stop).
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_sleep(ms)
                  </code>
                  : Pauses (e.g., 16ms for 60 FPS).
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_delta_time()
                  </code>
                  : Gets time between frames.
                </li>
              </ul>
              <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-4 text-pixel-teal font-pixel">
                Example
              </h3>
              <pre className="bg-pixel-navy/80 p-4 rounded-md border border-pixel-teal/50 text-pixel-white overflow-x-auto line-numbers language-c">
                <code className="language-c font-code text-sm">
                  {`#define ARCADE_IMPLEMENTATION
#include "arcade.h"
typedef enum { Start, Playing } GameState;
int main() {
    if (arcade_init(800, 600, "Game", 0x000000) != 0) return 1;
    ArcadeSprite player = {300, 300, 20, 20, 0, 0, 0xFF0000, 1};
    SpriteGroup group; arcade_init_group(&group, 1);
    GameState state = Start;
    while (arcade_running() && arcade_update()) {
        float dt = arcade_delta_time() * 60.0f;
        group.count = 0;
        arcade_add_sprite_to_group(&group, (ArcadeAnySprite){.sprite = player}, SPRITE_COLOR);
        arcade_render_group(&group);
        if (state == Start && arcade_key_pressed_once(a_space) == 2) {
            arcade_clear_keys(); state = Playing;
        }
        if (state == Playing) {
            if (arcade_key_pressed(a_esc) == 2) arcade_set_running(0);
            if (arcade_key_pressed(a_right) == 2) player.x += 5 * dt;
        }
        arcade_sleep(16);
    }
    arcade_free_group(&group);
    arcade_quit();
    return 0;
}`}
                </code>
              </pre>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Check{" "}
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_init
                  </code>{" "}
                  for errors.
                </li>
                <li>
                  Use{" "}
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    delta_time
                  </code>{" "}
                  for smooth movement.
                </li>
              </ul>
            </div>
          </div>
        );
      case "input-handling":
        return (
          <div className="space-y-6 text-pixel-white  p-4 sm:p-6 md:p-8 rounded-lg">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pixel-white font-pixel">
              Input Handling
            </h1>
            <div className="prose prose-invert max-w-none leading-relaxed text-base sm:text-lg text-pixel-light">
              <p>Handle keyboard input with these functions.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_key_pressed(key)
                  </code>
                  : Checks if key is held (returns 2 if yes).
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_key_pressed_once(key)
                  </code>
                  : Checks one-time press (returns 2 if yes).
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_clear_keys()
                  </code>
                  : Resets key states.
                </li>
              </ul>
              <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-4 text-pixel-teal font-pixel">
                Example
              </h3>
              <pre className="bg-pixel-navy/80 p-4 rounded-md border border-pixel-teal/50 text-pixel-white overflow-x-auto line-numbers language-c">
                <code className="language-c font-code text-sm">
                  {`#define ARCADE_IMPLEMENTATION
#include "arcade.h"
typedef enum { Start, Playing } GameState;
int main() {
    arcade_init(800, 600, "Game", 0x000000);
    ArcadeSprite player = {300, 300, 20, 20, 0, 0, 0xFF0000, 1};
    SpriteGroup group; arcade_init_group(&group, 1);
    GameState state = Start;
    while (arcade_running() && arcade_update()) {
        float dt = arcade_delta_time() * 60.0f;
        group.count = 0;
        arcade_add_sprite_to_group(&group, (ArcadeAnySprite){.sprite = player}, SPRITE_COLOR);
        arcade_render_group(&group);
        if (state == Start && arcade_key_pressed_once(a_space) == 2) {
            arcade_clear_keys(); state = Playing;
        }
        if (state == Playing) {
            if (arcade_key_pressed(a_right) == 2) player.vx = 5;
            else if (arcade_key_pressed(a_left) == 2) player.vx = -5;
            else player.vx = 0;
            player.x += player.vx * dt;
            if (player.x < 0) player.x = 0;
            else if (player.x > 780) player.x = 780;
        }
        arcade_sleep(16);
    }
    arcade_free_group(&group);
    arcade_quit();
    return 0;
}`}
                </code>
              </pre>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Use keys like{" "}
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    a_right
                  </code>
                  ,{" "}
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    a_space
                  </code>
                  .
                </li>
                <li>Clear keys to avoid input bleed.</li>
              </ul>
            </div>
          </div>
        );
      case "rendering":
        return (
          <div className="space-y-6 text-pixel-white  p-4 sm:p-6 md:p-8 rounded-lg">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pixel-white font-pixel">
              Rendering
            </h1>
            <div className="prose prose-invert max-w-none leading-relaxed text-base sm:text-lg text-pixel-light">
              <p>Draw sprites and text to the screen.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_render_scene(sprites, count, types)
                  </code>
                  : Draws multiple sprites.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_render_text(text, x, y, color)
                  </code>
                  : Draws text at position.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_render_text_centered(text, y, color)
                  </code>
                  : Centers text horizontally.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_render_text_centered_blink(text, y, color, interval)
                  </code>
                  : Blinks centered text.
                </li>
              </ul>
              <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-4 text-pixel-teal font-pixel">
                Example
              </h3>
              <pre className="bg-pixel-navy/80 p-4 rounded-md border border-pixel-teal/50 text-pixel-white overflow-x-auto line-numbers language-c">
                <code className="language-c font-code text-sm">
                  {`#define ARCADE_IMPLEMENTATION
#include "arcade.h"
typedef enum { Start, Playing } GameState;
int main() {
    arcade_init(800, 600, "Game", 0x000000);
    ArcadeSprite player = {300, 300, 20, 20, 0, 0, 0xFF0000, 1};
    SpriteGroup group; arcade_init_group(&group, 1);
    GameState state = Start; char text[32] = "Press Space to Start";
    while (arcade_running() && arcade_update()) {
        group.count = 0;
        arcade_add_sprite_to_group(&group, (ArcadeAnySprite){.sprite = player}, SPRITE_COLOR);
        arcade_render_group(&group);
        if (state == Start) {
            arcade_render_text_centered_blink(text, 300, 0xFFFFFF, 30);
            if (arcade_key_pressed_once(a_space) == 2) {
                arcade_clear_keys(); state = Playing;
            }
        } else {
            arcade_render_text("Playing", 10, 30, 0xFFFFFF);
        }
        arcade_sleep(16);
    }
    arcade_free_group(&group);
    arcade_quit();
    return 0;
}`}
                </code>
              </pre>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Uses fixed fonts (Courier New on Windows, 9x15 on Linux).
                </li>
                <li>Render groups for multiple sprites.</li>
              </ul>
            </div>
          </div>
        );
      case "sprite-types":
        return (
          <div className="space-y-6 text-pixel-white  p-4 sm:p-6 md:p-8 rounded-lg">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pixel-white font-pixel">
              Sprite Types
            </h1>
            <div className="prose prose-invert max-w-none leading-relaxed text-base sm:text-lg text-pixel-light">
              <p>Different sprite types for your game.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    ArcadeSprite
                  </code>
                  : Color-based (e.g., platforms).
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    ArcadeImageSprite
                  </code>
                  : Image-based (e.g., characters).
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    ArcadeAnimatedSprite
                  </code>
                  : Multi-frame animations.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    ArcadeAnySprite
                  </code>
                  : Combines color/image for groups.
                </li>
              </ul>
              <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-4 text-pixel-teal font-pixel">
                Example
              </h3>
              <pre className="bg-pixel-navy/80 p-4 rounded-md border border-pixel-teal/50 text-pixel-white overflow-x-auto line-numbers language-c">
                <code className="language-c font-code text-sm">
                  {`#define ARCADE_IMPLEMENTATION
#include "arcade.h"
int main() {
    arcade_init(800, 600, "Game", 0x000000);
    ArcadeSprite platform = {100, 500, 200, 20, 0, 0, 0x00FF00, 1};
    ArcadeImageSprite player = arcade_create_image_sprite(100, 100, 50, 50, "player.png");
    if (!player.pixels) return 1;
    SpriteGroup group; arcade_init_group(&group, 2);
    while (arcade_running() && arcade_update()) {
        group.count = 0;
        arcade_add_sprite_to_group(&group, (ArcadeAnySprite){.sprite = platform}, SPRITE_COLOR);
        arcade_add_sprite_to_group(&group, (ArcadeAnySprite){.image_sprite = player}, SPRITE_IMAGE);
        arcade_render_group(&group);
        arcade_sleep(16);
    }
    arcade_free_image_sprite(&player);
    arcade_free_group(&group);
    arcade_quit();
    return 0;
}`}
                </code>
              </pre>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Set{" "}
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    active = 0
                  </code>{" "}
                  to hide sprites.
                </li>
                <li>
                  Check{" "}
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    pixels
                  </code>{" "}
                  for image sprite errors.
                </li>
              </ul>
            </div>
          </div>
        );
      case "sprite-operations":
        return (
          <div className="space-y-6 text-pixel-white  p-4 sm:p-6 md:p-8 rounded-lg">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pixel-white font-pixel">
              Sprite Operations
            </h1>
            <div className="prose prose-invert max-w-none leading-relaxed text-base sm:text-lg text-pixel-light">
              <p>Create and move sprites in your game.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_create_image_sprite(x, y, w, h, file)
                  </code>
                  : Loads PNG sprite.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_free_image_sprite(sprite)
                  </code>
                  : Frees sprite data.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_move_sprite(sprite, gravity, height)
                  </code>
                  : Moves color sprite.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_move_image_sprite(sprite, gravity, height)
                  </code>
                  : Moves image sprite.
                </li>
              </ul>
              <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-4 text-pixel-teal font-pixel">
                Example
              </h3>
              <pre className="bg-pixel-navy/80 p-4 rounded-md border border-pixel-teal/50 text-pixel-white overflow-x-auto line-numbers language-c">
                <code className="language-c font-code text-sm">
                  {`#define ARCADE_IMPLEMENTATION
#include "arcade.h"
int main() {
    arcade_init(800, 600, "Game", 0x000000);
    ArcadeImageSprite sprite = arcade_create_image_sprite(100, 100, 50, 50, "sprite.png");
    if (!sprite.pixels) return 1;
    SpriteGroup group; arcade_init_group(&group, 1);
    while (arcade_running() && arcade_update()) {
        float dt = arcade_delta_time() * 60.0f;
        arcade_move_image_sprite(&sprite, 0.2f * dt, 600);
        group.count = 0;
        arcade_add_sprite_to_group(&group, (ArcadeAnySprite){.image_sprite = sprite}, SPRITE_IMAGE);
        arcade_render_group(&group);
        arcade_sleep(16);
    }
    arcade_free_image_sprite(&sprite);
    arcade_free_group(&group);
    arcade_quit();
    return 0;
}`}
                </code>
              </pre>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Check{" "}
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    pixels
                  </code>{" "}
                  for errors.
                </li>
                <li>Scale gravity with delta time.</li>
              </ul>
            </div>
          </div>
        );
      case "animation":
        return (
          <div className="space-y-6 text-pixel-white  p-4 sm:p-6 md:p-8 rounded-lg">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pixel-white font-pixel">
              Animation
            </h1>
            <div className="prose prose-invert max-w-none leading-relaxed text-base sm:text-lg text-pixel-light">
              <p>Create and animate sprites with multiple frames.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_create_animated_sprite(x, y, w, h, files, count,
                    interval)
                  </code>
                  : Loads animation frames.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_free_animated_sprite(anim)
                  </code>
                  : Frees animation data.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_move_animated_sprite(anim, gravity, height)
                  </code>
                  : Moves and animates.
                </li>
              </ul>
              <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-4 text-pixel-teal font-pixel">
                Example
              </h3>
              <pre className="bg-pixel-navy/80 p-4 rounded-md border border-pixel-teal/50 text-pixel-white overflow-x-auto line-numbers language-c">
                <code className="language-c font-code text-sm">
                  {`#define ARCADE_IMPLEMENTATION
#include "arcade.h"
int main() {
    arcade_init(800, 600, "Game", 0x000000);
    const char *frames[] = {"bird1.png", "bird2.png"};
    ArcadeAnimatedSprite bird = arcade_create_animated_sprite(100, 100, 50, 50, frames, 2, 10);
    if (!bird.frames) return 1;
    SpriteGroup group; arcade_init_group(&group, 1);
    while (arcade_running() && arcade_update()) {
        float dt = arcade_delta_time() * 60.0f;
        if (arcade_key_pressed_once(a_space) == 2) bird.frames[0].vy = -6;
        arcade_move_animated_sprite(&bird, 0.2f * dt, 600);
        group.count = 0;
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
              <ul className="list-disc pl-6 space-y-2">
                <li>Frames must have same size.</li>
                <li>Interval (e.g., 10) sets animation speed.</li>
              </ul>
            </div>
          </div>
        );
      case "collision":
        return (
          <div className="space-y-6 text-pixel-white  p-4 sm:p-6 md:p-8 rounded-lg">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pixel-white font-pixel">
              Collision Detection
            </h1>
            <div className="prose prose-invert max-w-none leading-relaxed text-base sm:text-lg text-pixel-light">
              <p>Check for sprite collisions using AABB (box) method.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_check_collision(a, b)
                  </code>
                  : For color sprites.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_check_image_collision(a, b)
                  </code>
                  : For image sprites.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_check_animated_collision(anim, other)
                  </code>
                  : For animated vs. image.
                </li>
              </ul>
              <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-4 text-pixel-teal font-pixel">
                Example
              </h3>
              <pre className="bg-pixel-navy/80 p-4 rounded-md border border-pixel-teal/50 text-pixel-white overflow-x-auto line-numbers language-c">
                <code className="language-c font-code text-sm">
                  {`#define ARCADE_IMPLEMENTATION
#include "arcade.h"

int main() {
    if (arcade_init(800, 600, "Game", 0x000000) != 0) {
        fprintf(stderr, "Initialization failed");
        return 1; 
    }

    ArcadeSprite player = {300, 500, 20, 20, 0, 0, 0xFF0000, 1}; 
    ArcadeSprite enemy = {300, 100, 30, 30, 0, 2, 0x00FF00, 1};  
    SpriteGroup group;
    arcade_init_group(&group, 2);
    int score = 0; 
    char text[32];

    while (arcade_running() && arcade_update()) {
        float dt = arcade_delta_time() * 60.0f;
        if (dt <= 0) dt = 1.0f; 
        printf("dt: %f, enemy.y: %f, enemy.vy: %f", dt, enemy.y, enemy.vy); 

        snprintf(text, sizeof(text), "Score: %d", score);

        if (arcade_key_pressed(a_right) == 2) player.vx = 5;
        else if (arcade_key_pressed(a_left) == 2) player.vx = -5;
        else player.vx = 0;
        player.x += player.vx * dt;
        if (player.x < 0) player.x = 0;
        else if (player.x > 780) player.x = 780;

        enemy.vy = 2; 
        enemy.y += enemy.vy * dt;
        printf("After update, enemy.y: %f", enemy.y); 
        if (enemy.y > 600) {
            enemy.y = 0; 
            enemy.x = rand() % 750; 
            score++; 
        }

        group.count = 0;
        arcade_add_sprite_to_group(&group, (ArcadeAnySprite){.sprite = player}, SPRITE_COLOR);
        arcade_add_sprite_to_group(&group, (ArcadeAnySprite){.sprite = enemy}, SPRITE_COLOR);

        arcade_render_group(&group);
        arcade_render_text(text, 10, 30, 0xFFFFFF);

        if (arcade_check_collision(&player, &enemy)) {
            arcade_render_text_centered("Game Over!", 300, 0xFFFFFF);
            arcade_sleep(2000); 
            arcade_set_running(0);
        }

        arcade_sleep(16); 
    }

    arcade_free_group(&group);
    arcade_quit();
    return 0;
}`}
                </code>
              </pre>
              <ul className="list-disc pl-6 space-y-2">
                <li>Returns 1 for collision, 0 if none or inactive.</li>
                <li>Checks boxes, not pixels.</li>
              </ul>
            </div>
          </div>
        );
      case "sprite-groups":
        return (
          <div className="space-y-6 text-pixel-white  p-4 sm:p-6 md:p-8 rounded-lg">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pixel-white font-pixel">
              Sprite Groups
            </h1>
            <div className="prose prose-invert max-w-none leading-relaxed text-base sm:text-lg text-pixel-light">
              <p>Manage multiple sprites for easy rendering.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_init_group(group, capacity)
                  </code>
                  : Sets up group.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_add_sprite_to_group(group, sprite, type)
                  </code>
                  : Adds sprite.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_add_animated_to_group(group, anim)
                  </code>
                  : Adds animated sprite.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_render_group(group)
                  </code>
                  : Draws all sprites.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_free_group(group)
                  </code>
                  : Frees group.
                </li>
              </ul>
              <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-4 text-pixel-teal font-pixel">
                Example
              </h3>
              <pre className="bg-pixel-navy/80 p-4 rounded-md border border-pixel-teal/50 text-pixel-white overflow-x-auto line-numbers language-c">
                <code className="language-c font-code text-sm">
                  {`#define ARCADE_IMPLEMENTATION
#include "arcade.h"

typedef enum { Playing, GameOver } GameState;

int main() {
    if (arcade_init(800, 600, "Game", 0x000000) != 0) {
        fprintf(stderr, "Initialization failed");
        return 1; 
    }

    ArcadeSprite player = {300, 300, 20, 20, 0, 0, 0xFF0000, 1}; 
    ArcadeSprite enemy = {400, 300, 20, 20, 2, 0, 0x00FF00, 1};  
    SpriteGroup group;
    arcade_init_group(&group, 2);
    GameState state = Playing;
    int score = 0; 
    char text[32];

    while (arcade_running() && arcade_update()) {
        float dt = arcade_delta_time() * 60.0f;
        if (dt <= 0) dt = 1.0f;
        printf("dt: %f, enemy.x: %f, enemy.vx: %f", dt, enemy.x, enemy.vx);

        snprintf(text, sizeof(text), "Score: %d", score);

        group.count = 0;
        arcade_add_sprite_to_group(&group, (ArcadeAnySprite){.sprite = player}, SPRITE_COLOR);
        arcade_add_sprite_to_group(&group, (ArcadeAnySprite){.sprite = enemy}, SPRITE_COLOR);

        arcade_render_group(&group);
        arcade_render_text(text, 10, 30, 0xFFFFFF); 

        if (state == Playing) {
            
            if (arcade_key_pressed(a_right) == 2) player.vx = 5;
            else if (arcade_key_pressed(a_left) == 2) player.vx = -5;
            else player.vx = 0;
            player.x += player.vx * dt;
            if (player.x < 0) player.x = 0;
            else if (player.x > 780) player.x = 780;

            enemy.vx = (enemy.x > 780 || enemy.x < 0) ? -enemy.vx : enemy.vx; 
            enemy.x += enemy.vx * dt;
            printf("After update, enemy.x: %f", enemy.x); 
            if (enemy.x > 780 || enemy.x < 0) score++;

            if (arcade_check_collision(&player, &enemy)) {
                state = GameOver;
            }
        } else if (state == GameOver) {
            arcade_render_text_centered("Game Over! Press R", 300, 0xFFFFFF);
            if (arcade_key_pressed_once(a_r) == 2) {
                arcade_clear_keys(); 
                player.x = 300; player.vx = 0; 
                enemy.x = 400; enemy.vx = 2; 
                score = 0; 
                state = Playing;
            }
        }

        arcade_sleep(16);
    }

    arcade_free_group(&group);
    arcade_quit();
    return 0;
}`}
                </code>
              </pre>
              <ul className="list-disc pl-6 space-y-2">
                <li>Clear group count each frame.</li>
                <li>Free sprites separately.</li>
              </ul>
            </div>
          </div>
        );
      case "audio-system":
        return (
          <div className="space-y-6 text-pixel-white  p-4 sm:p-6 md:p-8 rounded-lg">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pixel-white font-pixel">
              Audio System
            </h1>
            <div className="prose prose-invert max-w-none leading-relaxed text-base sm:text-lg text-pixel-light">
              <p>Play and control WAV audio files.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_play_sound(file)
                  </code>
                  : Plays WAV async (returns 0 if OK).
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_stop_sound()
                  </code>
                  : Stops all sounds.
                </li>
              </ul>
              <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-4 text-pixel-teal font-pixel">
                Example
              </h3>
              <pre className="bg-pixel-navy/80 p-4 rounded-md border border-pixel-teal/50 text-pixel-white overflow-x-auto line-numbers language-c">
                <code className="language-c font-code text-sm">
                  {`#define ARCADE_IMPLEMENTATION
#include "arcade.h"
int main() {
    arcade_init(800, 600, "Game", 0x000000);
    ArcadeSprite player = {300, 300, 20, 20, 0, 0, 0xFF0000, 1};
    SpriteGroup group; arcade_init_group(&group, 1);
    while (arcade_running() && arcade_update()) {
        group.count = 0;
        arcade_add_sprite_to_group(&group, (ArcadeAnySprite){.sprite = player}, SPRITE_COLOR);
        arcade_render_group(&group);
        if (arcade_key_pressed_once(a_space) == 2) {
            arcade_play_sound("./assets/hit.wav");
        }
        if (arcade_key_pressed_once(a_s) == 2) {
            arcade_stop_sound();
        }
        arcade_sleep(16);
    }
    arcade_free_group(&group);
    arcade_quit();
    return 0;
}`}
                </code>
              </pre>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use PCM, 16-bit WAV files.</li>
                <li>Linux plays one sound at a time.</li>
              </ul>
            </div>
          </div>
        );
      case "image-manipulation":
        return (
          <div className="space-y-6 text-pixel-white  p-4 sm:p-6 md:p-8 rounded-lg">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pixel-white font-pixel">
              Image Manipulation
            </h1>
            <div className="prose prose-invert max-w-none leading-relaxed text-base sm:text-lg text-pixel-light">
              <p>Edit sprite images with these functions.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_flip_image(file, type)
                  </code>
                  : Flips image (0 = horizontal, 1 = vertical).
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_rotate_image(file, degrees)
                  </code>
                  : Rotates image (0, 90, 180, 270).
                </li>
              </ul>
              <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-4 text-pixel-teal font-pixel">
                Example
              </h3>
              <pre className="bg-pixel-navy/80 p-4 rounded-md border border-pixel-teal/50 text-pixel-white overflow-x-auto line-numbers language-c">
                <code className="language-c font-code text-sm">
                  {`#define ARCADE_IMPLEMENTATION
#include "arcade.h"
int main() {
    arcade_init(800, 600, "Game", 0x000000);
    char *flipped = arcade_flip_image("sprite.png", 0);
    if (!flipped) return 1;
    ArcadeImageSprite sprite = arcade_create_image_sprite(100, 100, 50, 50, flipped);
    if (!sprite.pixels) { free(flipped); return 1; }
    SpriteGroup group; arcade_init_group(&group, 1);
    while (arcade_running() && arcade_update()) {
        group.count = 0;
        arcade_add_sprite_to_group(&group, (ArcadeAnySprite){.image_sprite = sprite}, SPRITE_IMAGE);
        arcade_render_group(&group);
        arcade_sleep(16);
    }
    free(flipped);
    arcade_free_image_sprite(&sprite);
    arcade_free_group(&group);
    arcade_quit();
    return 0;
}`}
                </code>
              </pre>
              <ul className="list-disc pl-6 space-y-2">
                <li>Free returned file paths.</li>
                <li>Files saved in current dir (Windows) or /tmp (Linux).</li>
              </ul>
            </div>
          </div>
        );
      case "api-enums":
        return (
          <div className="space-y-6 text-pixel-white  p-4 sm:p-6 md:p-8 rounded-lg">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pixel-white font-pixel">
              Enumerations
            </h1>
            <div className="prose prose-invert max-w-none leading-relaxed text-base sm:text-lg text-pixel-light">
              <p>Sprite type identifiers for rendering.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    SPRITE_COLOR = 0
                  </code>
                  : Color-based sprite.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    SPRITE_IMAGE = 1
                  </code>
                  : Image-based sprite.
                </li>
              </ul>
              <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-4 text-pixel-teal font-pixel">
                Example
              </h3>
              <pre className="bg-pixel-navy/80 p-4 rounded-md border border-pixel-teal/50 text-pixel-white overflow-x-auto line-numbers language-c">
                <code className="language-c font-code text-sm">
                  {`#define ARCADE_IMPLEMENTATION
#include "arcade.h"
int main() {
    arcade_init(800, 600, "Game", 0x000000);
    ArcadeSprite sprite = {100, 100, 20, 20, 0, 0, 0xFF0000, 1};
    SpriteGroup group; arcade_init_group(&group, 1);
    while (arcade_running() && arcade_update()) {
        group.count = 0;
        arcade_add_sprite_to_group(&group, (ArcadeAnySprite){.sprite = sprite}, SPRITE_COLOR);
        arcade_render_group(&group);
        arcade_sleep(16);
    }
    arcade_free_group(&group);
    arcade_quit();
    return 0;
}`}
                </code>
              </pre>
              <ul className="list-disc pl-6 space-y-2">
                <li>Used in groups and rendering.</li>
              </ul>
            </div>
          </div>
        );
      case "api-keys":
        return (
          <div className="space-y-6 text-pixel-white  p-4 sm:p-6 md:p-8 rounded-lg">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pixel-white font-pixel">
              Key Definitions
            </h1>
            <div className="prose prose-invert max-w-none leading-relaxed text-base sm:text-lg text-pixel-light">
              <p>Key codes for input handling.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    a_up
                  </code>
                  ,{" "}
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    a_down
                  </code>
                  ,{" "}
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    a_left
                  </code>
                  ,{" "}
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    a_right
                  </code>
                  : Arrow keys.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    a_a
                  </code>
                  -
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    a_z
                  </code>
                  : Alphabet keys.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    a_0
                  </code>
                  -
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    a_9
                  </code>
                  : Number keys.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    a_space
                  </code>
                  ,{" "}
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    a_esc
                  </code>
                  : Space and Escape.
                </li>
              </ul>
              <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-4 text-pixel-teal font-pixel">
                Example
              </h3>
              <pre className="bg-pixel-navy/80 p-4 rounded-md border border-pixel-teal/50 text-pixel-white overflow-x-auto line-numbers language-c">
                <code className="language-c font-code text-sm">
                  {`#define ARCADE_IMPLEMENTATION
#include "arcade.h"
int main() {
    arcade_init(800, 600, "Game", 0x000000);
    ArcadeSprite player = {300, 300, 20, 20, 0, 0, 0xFF0000, 1};
    SpriteGroup group; arcade_init_group(&group, 1);
    while (arcade_running() && arcade_update()) {
        float dt = arcade_delta_time() * 60.0f;
        if (arcade_key_pressed_once(a_esc) == 2) arcade_set_running(0);
        if (arcade_key_pressed(a_right) == 2) player.x += 5 * dt;
        group.count = 0;
        arcade_add_sprite_to_group(&group, (ArcadeAnySprite){.sprite = player}, SPRITE_COLOR);
        arcade_render_group(&group);
        arcade_sleep(16);
    }
    arcade_free_group(&group);
    arcade_quit();
    return 0;
}`}
                </code>
              </pre>
              <ul className="list-disc pl-6 space-y-2">
                <li>Works on Windows and Linux.</li>
              </ul>
            </div>
          </div>
        );
      case "api-structures":
        return (
          <div className="space-y-6 text-pixel-white  p-4 sm:p-6 md:p-8 rounded-lg">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pixel-white font-pixel">
              Data Structures
            </h1>
            <div className="prose prose-invert max-w-none leading-relaxed text-base sm:text-lg text-pixel-light">
              <p>Structures for sprites and groups.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    ArcadeSprite
                  </code>
                  : x, y, width, height, vx, vy, color, active.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    ArcadeImageSprite
                  </code>
                  : x, y, width, height, vx, vy, pixels, active.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    ArcadeAnimatedSprite
                  </code>
                  : frames, frame_count, current_frame.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    ArcadeAnySprite
                  </code>
                  : Union of color/image sprites.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    SpriteGroup
                  </code>
                  : sprites, types, count, capacity.
                </li>
              </ul>
              <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-4 text-pixel-teal font-pixel">
                Example
              </h3>
              <pre className="bg-pixel-navy/80 p-4 rounded-md border border-pixel-teal/50 text-pixel-white overflow-x-auto line-numbers language-c">
                <code className="language-c font-code text-sm">
                  {`#define ARCADE_IMPLEMENTATION
#include "arcade.h"
int main() {
    arcade_init(800, 600, "Game", 0x000000);
    ArcadeSprite platform = {100, 500, 200, 20, 0, 0, 0x00FF00, 1};
    ArcadeImageSprite player = arcade_create_image_sprite(100, 100, 50, 50, "player.png");
    SpriteGroup group; arcade_init_group(&group, 2);
    while (arcade_running() && arcade_update()) {
        group.count = 0;
        arcade_add_sprite_to_group(&group, (ArcadeAnySprite){.sprite = platform}, SPRITE_COLOR);
        arcade_add_sprite_to_group(&group, (ArcadeAnySprite){.image_sprite = player}, SPRITE_IMAGE);
        arcade_render_group(&group);
        arcade_sleep(16);
    }
    arcade_free_image_sprite(&player);
    arcade_free_group(&group);
    arcade_quit();
    return 0;
}`}
                </code>
              </pre>
              <ul className="list-disc pl-6 space-y-2">
                <li>Free image sprites and groups.</li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    active
                  </code>{" "}
                  controls visibility.
                </li>
              </ul>
            </div>
          </div>
        );
      case "api-functions":
        return (
          <div className="space-y-6 text-pixel-white p-4 sm:p-6 md:p-8 rounded-lg">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pixel-white font-pixel">
              Functions
            </h1>
            <div className="prose prose-invert max-w-none leading-relaxed text-base sm:text-lg text-pixel-light">
              <p>
                All Arcade functions, grouped by purpose with one-line
                definitions.
              </p>
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-pixel-teal font-pixel">
                Core
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink text-pixel-pink">
                    arcade_init
                  </code>
                  : Initializes a game window with specified dimensions and
                  title.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_quit
                  </code>
                  : Closes the game window and cleans up resources.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_update
                  </code>
                  : Processes events and updates the game state.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_running
                  </code>
                  : Checks if the game loop is active.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_set_running
                  </code>
                  : Sets the game loop’s running state.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_sleep
                  </code>
                  : Pauses execution for a specified duration.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_delta_time
                  </code>
                  : Returns the time elapsed since the last frame.
                </li>
              </ul>
              <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-4 text-pixel-teal font-pixel">
                Input
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_key_pressed
                  </code>
                  : Checks if a key is currently held down.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_key_pressed_once
                  </code>
                  : Detects a single key press event.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_clear_keys
                  </code>
                  : Resets all key input states.
                </li>
              </ul>
              <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-4 text-pixel-teal font-pixel">
                Sprites
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_create_image_sprite
                  </code>
                  : Loads a PNG image as a sprite.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_free_image_sprite
                  </code>
                  : Frees memory used by an image sprite.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_move_sprite
                  </code>
                  : Updates a color sprite’s position with gravity.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_move_image_sprite
                  </code>
                  : Updates an image sprite’s position with gravity.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_check_collision
                  </code>
                  : Detects collisions between color sprites.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_check_image_collision
                  </code>
                  : Detects collisions between image sprites.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_create_animated_sprite
                  </code>
                  : Creates a sprite with multiple animation frames.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_free_animated_sprite
                  </code>
                  : Frees memory used by an animated sprite.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_move_animated_sprite
                  </code>
                  : Updates an animated sprite’s position and frame.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_check_animated_collision
                  </code>
                  : Detects collisions with animated sprites.
                </li>
              </ul>
              <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-4 text-pixel-teal font-pixel">
                Rendering
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_render_scene
                  </code>
                  : Draws multiple sprites to the screen.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_render_text
                  </code>
                  : Renders text at a specified position.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_render_text_centered
                  </code>
                  : Renders text centered horizontally.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_render_text_centered_blink
                  </code>
                  : Renders blinking centered text.
                </li>
              </ul>
              <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-4 text-pixel-teal font-pixel">
                Groups
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_init_group
                  </code>
                  : Initializes a sprite group with a capacity.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_add_sprite_to_group
                  </code>
                  : Adds a sprite to a group for rendering.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_add_animated_to_group
                  </code>
                  : Adds an animated sprite to a group.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_render_group
                  </code>
                  : Draws all sprites in a group.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_free_group
                  </code>
                  : Frees memory used by a sprite group.
                </li>
              </ul>
              <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-4 text-pixel-teal font-pixel">
                Audio
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_play_sound
                  </code>
                  : Plays a WAV audio file asynchronously.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_stop_sound
                  </code>
                  : Stops all currently playing sounds.
                </li>
              </ul>
              <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-4 text-pixel-teal font-pixel">
                Images
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_flip_image
                  </code>
                  : Flips an image horizontally or vertically.
                </li>
                <li>
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade_rotate_image
                  </code>
                  : Rotates an image by 0, 90, 180, or 270 degrees.
                </li>
              </ul>
            </div>
          </div>
        );
      case "arcade-cli":
        return (
          <div className="space-y-6 text-pixel-white  p-4 sm:p-6 md:p-8 rounded-lg">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pixel-white font-pixel">
              Arcade CLI
            </h1>
            <div className="prose prose-invert max-w-none leading-relaxed text-base sm:text-lg text-pixel-light">
              <p>A tool to quickly set up Arcade projects.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Creates{" "}
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade.h
                  </code>
                  , STB headers,{" "}
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    main.c
                  </code>
                  ,{" "}
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    Makefile
                  </code>
                  , and assets.
                </li>
                <li>
                  Install:{" "}
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    npm install -g arcade-cli
                  </code>{" "}
                  (needs Node.js 16+).
                </li>
                <li>
                  Use:{" "}
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade init my-game
                  </code>{" "}
                  or{" "}
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade init my-game --blank
                  </code>
                  .
                </li>
                <li>Needs: gcc, MinGW (Windows), libx11-dev (Linux).</li>
                <li>
                  GitHub:{" "}
                  <a
                    href="https://github.com/GeorgeET15/arcade-cli"
                    className="text-pixel-teal hover:underline"
                  >
                    arcade-cli
                  </a>
                  .
                </li>
                <li>Works with Arcade IDE.</li>
              </ul>
              <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-4 text-pixel-teal font-pixel">
                Example
              </h3>
              <pre className="bg-pixel-navy/80 p-4 rounded-md border border-pixel-teal/50 text-pixel-white overflow-x-auto line-numbers language-bash">
                <code className="language-bash font-code text-sm">
                  {`npm install -g arcade-cli
arcade init my-game
cd my-game
make
make run`}
                </code>
              </pre>
              <ul className="list-disc pl-6 space-y-2">
                <li>Demo includes a movable square and music.</li>
                <li>
                  Check{" "}
                  <code className="bg-pixel-dark/70 px-1 rounded font-code text-pixel-pink">
                    arcade --help
                  </code>
                  .
                </li>
              </ul>
            </div>
          </div>
        );
      case "arcade-ide":
        return (
          <div className="space-y-6 text-pixel-white  p-4 sm:p-6 md:p-8 rounded-lg">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pixel-white font-pixel">
              Arcade IDE
            </h1>
            <div className="prose prose-invert max-w-none leading-relaxed text-base sm:text-lg text-pixel-light">
              <p>A retro-themed IDE for Arcade game development.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Features: Monaco Editor, AI sprite generator, code snippets,
                  file navigation.
                </li>
                <li>
                  Install: Get .exe (Windows) or .deb (Linux) from{" "}
                  <a
                    href="https://github.com/GeorgeET15/arcade-ide/releases"
                    className="text-pixel-teal hover:underline"
                  >
                    releases
                  </a>
                  .
                </li>
                <li>Needs: gcc, make (or mingw32-make).</li>
                <li>AI sprites need Gemini/Remove.bg API keys.</li>
                <li>
                  GitHub:{" "}
                  <a
                    href="https://github.com/GeorgeET15/arcade-ide"
                    className="text-pixel-teal hover:underline"
                  >
                    arcade-ide
                  </a>
                  .
                </li>
                <li>Use with Arcade CLI for project setup.</li>
              </ul>
              <h3 className="text-xl sm:text-2xl font-semibold mt-6 mb-4 text-pixel-teal font-pixel">
                Example
              </h3>
              <pre className="bg-pixel-navy/80 p-4 rounded-md border border-pixel-teal/50 text-pixel-white overflow-x-auto line-numbers language-bash">
                <code className="language-bash font-code text-sm">
                  {`arcade init my-game
# Open my-game in Arcade IDE
# Code, build, and run`}
                </code>
              </pre>
              <ul className="list-disc pl-6 space-y-2">
                <li>Supports Windows and Linux.</li>
                <li>Edit code with syntax highlighting.</li>
              </ul>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-6 text-pixel-white  p-4 sm:p-6 md:p-8 rounded-lg">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pixel-white font-pixel">
              Not Found
            </h1>
            <p className="text-base sm:text-lg text-pixel-light">
              This section doesn’t exist. Try another from the sidebar.
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
        className={`mt-1 fixed inset-y-0 left-0 z-50 w-full sm:w-5/6 md:w-80 lg:w-96 bg-pixel-navy/95 p-4 md:p-6 border-r border-pixel-teal/50 transform transition-transform duration-300 ease-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:static md:transform-none md:block h-screen scrollbar-thin scrollbar-thumb-pixel-teal/60 scrollbar-track-pixel-dark/20 rounded-r-lg`}
      >
        <div className="mb-6">
          <h2 className="text-lg md:text-xl font-bold mb-4 text-pixel-teal font-pixel">
            Arcade Docs
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-pixel-teal/70" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-3 py-2 bg-pixel-dark/60 border border-pixel-teal/40 text-pixel-white placeholder-pixel-light/70 focus:ring-1 focus:ring-pixel-teal focus:border-pixel-teal text-sm rounded-md w-full"
            />
          </div>
        </div>
        <Accordion type="single" collapsible className="space-y-2">
          {filteredSections.map((section, index) => (
            <AccordionItem key={index} value={`section-${index}`}>
              <AccordionTrigger className="text-sm md:text-base font-semibold text-pixel-teal hover:text-pixel-cyan font-pixel py-2 px-3 rounded-md hover:bg-pixel-dark/30">
                {section.title}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-1 pl-3">
                  {section.items.map((item) => (
                    <li key={item.id}>
                      <Button
                        variant="link"
                        className={`text-sm text-pixel-light hover:text-pixel-teal font-pixel px-3 py-1 rounded-md w-full text-left ${
                          currentSection === item.id
                            ? "text-pixel-teal font-bold bg-pixel-dark/20"
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
