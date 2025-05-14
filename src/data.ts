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
];

export const contentMap = {
  introduction: {
    title: "Introduction to Arcade Library",
    content: `The Arcade Library is a lightweight C library for creating 2D arcade-style games with cross-platform support for Windows (Win32) and Linux (X11). It provides window management, color and image-based sprites, sprite animation, collision detection, sound playback, text rendering, and image manipulation. Ideal for retro games like Flappy Bird or Pong with minimal dependencies. Author: GeorgeET15. Repository: https://github.com/GeorgeET15/arcade-lib. Key Features: Cross-platform window management, sprite handling, input processing, audio playback (with stop functionality), and image manipulation.`,
  },
  installation: {
    title: "Installation",
    content: `Dependencies vary by platform: Linux: libX11 (window/rendering), libm (math), STB libraries (image processing), aplay (sound). Windows: gdi32 (rendering), winmm (sound), STB libraries. Compilation: - Linux: gcc -o game game.c arcade.c -lX11 -lm - Windows: gcc -o game game.c arcade.c -lgdi32 -lwinmm Setup: 1. Linux: Install libx11-dev, libm (sudo apt install libx11-dev), ensure alsa-utils for aplay. 2. Windows: Use MinGW or MSYS2; gdi32/winmm are included. 3. Download STB libraries (stb_image.h, stb_image_write.h, stb_image_resize2.h) from https://github.com/nothings/stb. 4. Include arcade.h in your project. Alternatively, use Arcade CLI to initialize projects: Install globally with npm install -g arcade-cli, then run arcade init my-game to set up arcade.h, STB headers, main.c, Makefile, and assets. Verify with arcade --help. Note: Ensure image/audio files are in the correct paths.`,
  },
  "usage-example": {
    title: "Usage Example",
    content: `Creates a window, loads an image sprite, and renders it in a ~60 FPS game loop. Example includes error handling, cross-platform frame rate control, and audio playback with stop functionality. Ensure sprite.png is accessible and WAV files are PCM, 16-bit.`,
  },
  "core-functions": {
    title: "Core Functions",
    content: `Manage the game environment: - arcade_init: Initializes window with width, height, title, background color. - arcade_quit: Frees resources, closes window. - arcade_update: Processes events (keys, window close). - arcade_running: Checks if game is running. - arcade_set_running: Sets running state (e.g., exit on ESC). - arcade_sleep: Pauses for milliseconds to control frame rate. - arcade_delta_time: Calculates elapsed time for frame-rate-independent updates.`,
  },
  "input-handling": {
    title: "Input Handling",
    content: `Handle keyboard input: - arcade_key_pressed: Detects continuous key presses (e.g., movement). - arcade_key_pressed_once: Detects single key presses (e.g., jump). - arcade_clear_keys: Resets key states (e.g., on pause). Example: Move with a_right, jump with a_space, stop sound with a_s.`,
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
    content: `Play and control WAV files: - arcade_play_sound: Plays audio asynchronously (Windows: PlaySound with SND_FILENAME | SND_ASYNC; Linux: aplay). - arcade_stop_sound: Stops all currently playing sounds (Windows: PlaySound(NULL); Linux: pkill aplay). Note: Use PCM, 16-bit WAV files. Preload sounds on Windows to reduce ~0.5s delay. Example: Play sound on a_space, stop on a_s.`,
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
    content: `Predefined key codes: - a_up, a_down, a_left, a_right, a_w, a_a, a_s, a_d, a_r, a_p, a_space, a_esc, a_shift, a_ctrl, a_alt, a_tab, a_capslock, a_backspace. Example: a_space (0x0020) for spacebar, a_esc (0xff1b) for escape, a_s (0x0073) for stopping sounds. Platform-agnostic mappings for Windows and Linux.`,
  },
  "api-structures": {
    title: "Data Structures",
    content: `Core structures: - ArcadeSprite: x, y, width, height, vy, vx, color, active. - ArcadeImageSprite: x, y, width, height, vy, vx, pixels, image_width, image_height, active. - ArcadeAnimatedSprite: frames, frame_count, current_frame, frame_interval, frame_counter. - ArcadeAnySprite: Union (sprite, image_sprite). - SpriteGroup: sprites, types, count, capacity.`,
  },
  "api-functions": {
    title: "Functions",
    content: `All library functions: - Core: arcade_init, arcade_quit, arcade_update, arcade_running, arcade_set_running, arcade_sleep, arcade_delta_time. - Input: arcade_key_pressed, arcade_key_pressed_once, arcade_clear_keys. - Sprites: arcade_move_sprite, arcade_move_image_sprite, arcade_check_collision, arcade_check_image_collision, arcade_create_image_sprite, arcade_free_image_sprite, arcade_create_animated_sprite, arcade_free_animated_sprite, arcade_move_animated_sprite, arcade_check_animated_collision. - Rendering: arcade_render_scene, arcade_render_text, arcade_render_text_centered, arcade_render_text_centered_blink. - Groups: arcade_init_group, arcade_add_sprite_to_group, arcade_add_animated_to_group, arcade_render_group, arcade_free_group. - Audio: arcade_play_sound, arcade_stop_sound. - Images: arcade_flip_image, arcade_rotate_image.`,
  },
};
