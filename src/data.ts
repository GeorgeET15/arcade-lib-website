export const sidebarSections = [
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
  // Added section for ecosystem tools
  {
    title: "Ecosystem Tools",
    items: [
      { id: "arcade-cli", name: "Arcade CLI" },
      { id: "arcade-ide", name: "Arcade IDE" },
    ],
  },
];

export const contentMap = {
  introduction: {
    title: "Introduction to Arcade Library",
    content: `The Arcade Library is a lightweight C library (v1.1.0) for creating 2D arcade-style games with cross-platform support for Windows (Win32) and Linux (X11). It provides window management, color and image-based sprites, sprite animation, collision detection, sound playback, text rendering, and image manipulation. Ideal for retro games like Flappy Bird or Pong with minimal dependencies. Author: GeorgeET15. Repository: https://github.com/GeorgeET15/arcade-lib. Key Features: Cross-platform window management, sprite handling, input processing, audio playback with stop functionality, and image manipulation. The Arcade ecosystem includes the Arcade CLI for project initialization (https://github.com/GeorgeET15/arcade-cli) and Arcade IDE for a retro-themed development environment (https://github.com/GeorgeET15/arcade-ide). Learn more at the Arcade Wiki: https://arcade-lib.vercel.app/.`, // Added version, CLI, IDE, and Wiki
  },
  installation: {
    title: "Installation",
    content: `Dependencies vary by platform: Linux: libX11 (window/rendering), libm (math), STB libraries (image processing), aplay (sound). Windows: gdi32 (rendering), winmm (sound), STB libraries. Compilation: - Linux: gcc -o game game.c arcade.c -lX11 -lm - Windows: gcc -o game game.c arcade.c -lgdi32 -lwinmm. Setup: 1. Linux: Install libx11-dev, libm (sudo apt install libx11-dev build-essential), ensure alsa-utils for aplay. 2. Windows: Install MinGW/MSYS2; gdi32/winmm are included. 3. Download STB libraries (stb_image.h, stb_image_write.h, stb_image_resize2.h) from https://github.com/nothings/stb. 4. Include arcade.h in your project. Alternatively, use Arcade CLI (requires Node.js 16+): Install globally with npm install -g arcade-cli, then run arcade init my-game to set up arcade.h, STB headers, main.c, Makefile, and assets. Verify with arcade --help. CLI prerequisites: gcc, MinGW (Windows), libx11-dev (Linux). See https://github.com/GeorgeET15/arcade-cli for details. Note: Ensure image/audio files (e.g., PNG, PCM 16-bit WAV) are in correct paths.`, // Added CLI prerequisites and repository link
  },
  "usage-example": {
    title: "Usage Example",
    content: `Creates a window, loads an image sprite, and renders it in a ~60 FPS game loop with keyboard input and audio control. Below is a sample program:\n\n#include "arcade/arcade.h"\nint main() {\n    if (arcade_init(800, 600, "My Game", 0x000000)) return 1;\n    ArcadeImageSprite sprite = arcade_create_image_sprite(100.0f, 100.0f, 50.0f, 50.0f, "assets/sprite.png");\n    SpriteGroup group;\n    arcade_init_group(&group, 1);\n    arcade_add_sprite_to_group(&group, (ArcadeAnySprite){.image_sprite = sprite}, SPRITE_IMAGE);\n    while (arcade_running() && arcade_update()) {\n        if (arcade_key_pressed(a_right)) sprite.x += 5.0f;\n        if (arcade_key_pressed_once(a_space)) arcade_play_sound("assets/sound.wav");\n        if (arcade_key_pressed_once(a_s)) arcade_stop_sound();\n        arcade_render_group(&group);\n        arcade_render_text("Press Space for Sound", 10.0f, 10.0f, 0xFFFFFF);\n        arcade_sleep(16);\n    }\n    arcade_free_image_sprite(&sprite);\n    arcade_free_group(&group);\n    arcade_quit();\n    return 0;\n}\n\nEnsure sprite.png and sound.wav (PCM, 16-bit) are in assets/. Use Arcade CLI (arcade init my-game) to set up this structure. The example demonstrates error handling, input, rendering, and audio with stop functionality.`, // Added code snippet and CLI reference
  },
  "core-functions": {
    title: "Core Functions",
    content: `Manage the game environment: - arcade_init: Initializes window with width, height, title, background color (returns 0 on success). - arcade_quit: Frees resources, closes window. - arcade_update: Processes events (keys, window close; returns 1 to continue, 0 to stop). - arcade_running: Checks if game is running (1 = running, 0 = stopped). - arcade_set_running: Sets running state (e.g., exit on ESC). - arcade_sleep: Pauses for milliseconds to control frame rate (e.g., 16ms for ~60 FPS). - arcade_delta_time: Calculates elapsed time in seconds for frame-rate-independent updates (clamped to 0.1s). Use in game loops for consistent updates across platforms.`, // Clarified return values
  },
  "input-handling": {
    title: "Input Handling",
    content: `Handle keyboard input: - arcade_key_pressed: Detects continuous key presses (e.g., movement; returns 2 if pressed, 0 if not). - arcade_key_pressed_once: Detects single key presses (e.g., jump; returns 2 on first press, 0 otherwise). - arcade_clear_keys: Resets key states (e.g., on pause). Example: Move with a_right, jump with a_space, stop sound with a_s. See Key Definitions for key codes.`, // Referenced key definitions
  },
  rendering: {
    title: "Rendering",
    content: `Render sprites and text: - arcade_render_scene: Renders multiple sprites (color/image-based) with double buffering (GDI on Windows, XImage on Linux). - arcade_render_text: Renders text at a position with fixed font (Courier New on Windows, 9x15 on Linux). - arcade_render_text_centered: Renders horizontally centered text. - arcade_render_text_centered_blink: Renders blinking centered text (e.g., for start screens). Clear screen with background color before rendering.`, // Added font details
  },
  "sprite-types": {
    title: "Sprite Types",
    content: `Supported sprite types: - ArcadeSprite: Color-based (position, size, velocity, color, active; e.g., platforms). - ArcadeImageSprite: Image-based (position, size, velocity, pixel data; e.g., characters). - ArcadeAnimatedSprite: Multi-frame animated sprite (e.g., walking cycles). - ArcadeAnySprite: Union for color/image sprites, used in sprite groups and rendering. Active field (1 = active, 0 = ignored) controls rendering/collisions.`, // Added active field explanation
  },
  "sprite-operations": {
    title: "Sprite Operations",
    content: `Manage sprites: - arcade_create_image_sprite: Loads image-based sprite from PNG file (sets active = 1 on success). - arcade_free_image_sprite: Frees sprite pixel data to prevent leaks. - arcade_move_sprite: Updates color-based sprite position with gravity and window bounds. - arcade_move_image_sprite: Updates image-based sprite position. Always free sprites before arcade_quit to avoid memory leaks.`, // Clarified active field
  },
  animation: {
    title: "Animation",
    content: `Handle animated sprites: - arcade_create_animated_sprite: Creates sprite with multiple PNG frames (sets first frame active). - arcade_free_animated_sprite: Frees all frame data. - arcade_move_animated_sprite: Updates position and animation frame based on frame_interval. Example: Flapping bird with frame1.png, frame2.png, frame3.png. Ensure consistent frame dimensions.`, // Added frame dimension note
  },
  collision: {
    title: "Collision Detection",
    content: `Axis-aligned bounding box (AABB) collision detection: - arcade_check_collision: For color-based sprites. - arcade_check_image_collision: For image-based sprites. - arcade_check_animated_collision: For animated vs. image-based sprites. Returns 1 if collision occurs, 0 if no collision or sprites are inactive/null. Only active sprites are checked.`, // Clarified return conditions
  },
  "sprite-groups": {
    title: "Sprite Groups",
    content: `Manage multiple sprites: - arcade_init_group: Initializes group with capacity for sprites. - arcade_add_sprite_to_group: Adds sprite (color/image) to group. - arcade_add_animated_to_group: Adds animated sprite’s current frame. - arcade_render_group: Renders all group sprites efficiently. - arcade_free_group: Frees group memory (not sprite pixel data). Use for batch rendering in game loops.`, // Clarified memory freeing
  },
  "audio-system": {
    title: "Audio System",
    content: `Play and control WAV files: - arcade_play_sound: Plays PCM, 16-bit WAV files asynchronously (Windows: PlaySound with SND_FILENAME | SND_ASYNC; Linux: aplay with background process). - arcade_stop_sound: Stops all playing sounds (Windows: PlaySound(NULL); Linux: pkill aplay, may affect other aplay processes). Example: Play sound on a_space, stop on a_s. Preload sounds on Windows to reduce ~0.5s delay. Linux supports one sound at a time. Ensure WAV files are in assets/.`, // Clarified platform behaviors and limitations
  },
  "image-manipulation": {
    title: "Image Manipulation",
    content: `Modify sprite images: - arcade_flip_image: Flips image vertically (flip_type = 1) or horizontally (flip_type = 0), returns temporary PNG path. - arcade_rotate_image: Rotates image (0, 90, 180, 270 degrees), returns temporary PNG path. Caller must free returned paths. Uses STB libraries; ensure write permissions for temp files (Windows: current dir, Linux: /tmp).`, // Added temp file details
  },
  "api-enums": {
    title: "Enumerations",
    content: `Sprite type identifiers: - SPRITE_COLOR (0): For ArcadeSprite (color-based). - SPRITE_IMAGE (1): For ArcadeImageSprite (image-based). Used in arcade_add_sprite_to_group and arcade_render_scene for type-safe rendering.`, // Clarified usage
  },
  "api-keys": {
    title: "Key Definitions",
    content: `Predefined key codes for input handling: - a_up, a_down, a_left, a_right, a_w, a_a, a_s, a_d, a_r, a_p, a_space, a_esc, a_shift, a_ctrl, a_alt, a_tab, a_capslock, a_backspace, etc. Example: a_space (0x0020) for sound triggers, a_esc (0xff1b) for exit, a_s (0x0073) for stopping sounds. Platform-agnostic mappings for Windows (virtual keys) and Linux (X11 keycodes). See arcade_key_pressed and arcade_key_pressed_once.`, // Added examples
  },
  "api-structures": {
    title: "Data Structures",
    content: `Core structures: - ArcadeSprite: x, y, width, height, vy, vx, color (0xRRGGBB), active (1/0). - ArcadeImageSprite: x, y, width, height, vy, vx, pixels (RGBA), image_width, image_height, active. - ArcadeAnimatedSprite: frames (image sprites), frame_count, current_frame, frame_interval, frame_counter. - ArcadeAnySprite: Union (sprite, image_sprite) for mixed types. - SpriteGroup: sprites (ArcadeAnySprite array), types, count, capacity. Used for rendering, movement, and collisions.`, // Added field details
  },
  "api-functions": {
    title: "Functions",
    content: `All library functions: - Core: arcade_init, arcade_quit, arcade_update, arcade_running, arcade_set_running, arcade_sleep, arcade_delta_time. - Input: arcade_key_pressed, arcade_key_pressed_once, arcade_clear_keys. - Sprites: arcade_move_sprite, arcade_move_image_sprite, arcade_check_collision, arcade_check_image_collision, arcade_create_image_sprite, arcade_free_image_sprite, arcade_create_animated_sprite, arcade_free_animated_sprite, arcade_move_animated_sprite, arcade_check_animated_collision. - Rendering: arcade_render_scene, arcade_render_text, arcade_render_text_centered, arcade_render_text_centered_blink. - Groups: arcade_init_group, arcade_add_sprite_to_group, arcade_add_animated_to_group, arcade_render_group, arcade_free_group. - Audio: arcade_play_sound, arcade_stop_sound. - Images: arcade_flip_image, arcade_rotate_image. See individual sections for details. Use with Arcade CLI/IDE for streamlined development.`, // Added CLI/IDE reference
  },
  // Added CLI and IDE sections
  "arcade-cli": {
    title: "Arcade CLI",
    content: `The Arcade CLI is a command-line tool for initializing Arcade projects. Features: Sets up arcade.h, STB headers, main.c (with demo or blank), Makefile, and assets. Install: npm install -g arcade-cli (requires Node.js 16+). Usage: arcade init my-game [--blank] to create a project. The demo includes a movable red square, start screen, and background music. Prerequisites: gcc, MinGW (Windows), libx11-dev (Linux). Repository: https://github.com/GeorgeET15/arcade-cli. Use with Arcade IDE for a complete workflow. Run arcade --help for details.`, // New section
  },
  "arcade-ide": {
    title: "Arcade IDE",
    content: `The Arcade IDE is a retro-themed environment for developing arcade.h-based games. Features: Monaco Editor with syntax highlighting, AI sprite generator (requires Gemini/Remove.bg API keys), code snippets, file tree navigation, and cross-platform support (Windows/Linux). Install: Download .exe (Windows) or .deb (Linux) from https://github.com/GeorgeET15/arcade-ide/releases. Prerequisites: gcc, make (or mingw32-make). Use with Arcade CLI to initialize projects and IDE to code, build, and generate sprites. Repository: https://github.com/GeorgeET15/arcade-ide.`, // New section
  },
};
