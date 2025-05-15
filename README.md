# Arcade Library Website

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)](http://arcade-lib.vercel.app/)

A retro-themed website showcasing games built with the [ARCADE C library](https://github.com/GeorgeET15/arcade-lib), a powerful and lightweight 2D game development library written in C. Browse, discover, and submit your own ARCADE games in a pixel-art-inspired interface.

## About

The Arcade Library Website is a platform to explore and share games created using the ARCADE C library. Featuring a retro pixel-art design, the website allows users to view featured games, submit their own projects, and access GitHub repositories for each game. Built with modern web technologies, it combines a nostalgic aesthetic with seamless functionality.

## Features

- **Game Showcase**: Browse a grid of game cards with cover images, titles, creators, and categories (two cards per row on mobile).
- **Game Submission**: Submit your ARCADE game via a form, including name, creator, description, category, GitHub URL, and screenshots.
- **Retro Design**: Pixel-art-inspired UI with Press Start 2P font and Tailwind CSS styling.
- **Responsive Layout**: Optimized for mobile, tablet, and desktop devices.
- **Supabase Integration**: Backend for storing and retrieving game data.
- **Interactive Dialogs**: View game details with screenshot carousels and GitHub links.

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL)
- **Form Handling**: React Hook Form, Zod
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Notifications**: Sonner
- **Carousel**: Swiper
- **Linting**: ESLint
- **Deployment**: Vercel

## Setup

Follow these steps to run the project locally:

### Prerequisites

- [Node.js](https://nodejs.org/) (>=18.0.0)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/GeorgeET15/arcade-lib-website.git
   cd arcade-lib-website
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add your Supabase credentials:

   ```env
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

   Obtain these from your [Supabase project dashboard](https://supabase.com/).

4. **Run the development server**:

   ```bash
   npm run dev
   ```

   Open `http://localhost:5173` in your browser.

5. **Build for production**:

   ```bash
   npm run build
   ```

6. **Preview the build**:
   ```bash
   npm run preview
   ```

## Usage

- **Browse Games**: Navigate to the homepage to view featured games in a responsive grid (two cards per row on mobile).
- **View Details**: Click a game card to open a dialog with a screenshot carousel, description, and GitHub link.
- **Submit a Game**: Click "Submit Your Game" to open the instructions dialog, then fill out the form with your game’s details (name, creator, description, category, GitHub URL, cover image, screenshots).
- **Responsive Design**: Enjoy the retro pixel-art UI on mobile, tablet, or desktop.

## Contributing

We welcome contributions to improve the Arcade Library Website! Whether it’s fixing bugs, adding features, or enhancing the design, your help is appreciated.

### How to Contribute

1. **Fork the Repository**:
   Click the "Fork" button on the [GitHub repository](https://github.com/GeorgeET15/arcade-lib-website).

2. **Clone Your Fork**:

   ```bash
   git clone https://github.com/yourusername/arcade-lib-website.git
   cd arcade-lib-website
   ```

3. **Create a Branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Changes**:
   Follow the coding standards below and implement your changes.

5. **Test Your Changes**:
   Run `npm run dev` to test locally and `npm run lint` to ensure code quality.

6. **Commit Changes**:
   Use clear commit messages (e.g., `Add category display to game cards`).

   ```bash
   git commit -m "Your descriptive commit message"
   ```

7. **Push to Your Fork**:

   ```bash
   git push origin feature/your-feature-name
   ```

8. **Create a Pull Request**:
   Open a pull request (PR) on the [main repository](https://github.com/GeorgeET15/arcade-lib-website). Describe your changes and link to any related issues.

### Contribution Guidelines

- **Coding Standards**:
  - Use TypeScript for type safety.
  - Follow Tailwind CSS for styling (use `pixel-*` classes from `tailwind.config.js`).
  - Adhere to ESLint rules (`npm run lint`).
  - Write clean, modular React components.
- **Commit Messages**:
  - Use present tense (e.g., “Add feature” not “Added feature”).
  - Include a short description (e.g., “Fix mobile layout for game cards”).
- **Testing**:
  - Test changes locally with `npm run dev`.
  - Ensure no new ESLint errors (`npm run lint`).
  - Verify responsiveness on mobile and desktop.
- **Issues**:
  - Check existing [issues](https://github.com/GeorgeET15/arcade-lib-website/issues) before creating a new one.
  - Use the issue template (if available) for bug reports or feature requests.
- **Pull Requests**:
  - Reference related issues in your PR (e.g., “Closes #123”).
  - Ensure your branch is up-to-date with `main` before submitting.
  - PRs are reviewed for code quality and alignment with project goals.

### Code of Conduct

We follow the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/). Please read it to ensure a welcoming and inclusive environment for all contributors.

### Getting Help

- **Issues**: Report bugs or suggest features via [GitHub Issues](https://github.com/GeorgeET15/arcade-lib-website/issues).
- **Discussions**: Join discussions or ask questions in the [GitHub Discussions](https://github.com/GeorgeET15/arcade-lib-website/discussions) tab.
- **Contact**: Reach out via the repository or open an issue for assistance.

## License

This project is licensed under the [MIT License](LICENSE). See the `LICENSE` file for details.

## Contact

- **Author**: GeorgeET15
- **Repository**: [https://github.com/GeorgeET15/arcade-lib-website](https://github.com/GeorgeET15/arcade-lib-website)
- **Issues**: [https://github.com/GeorgeET15/arcade-lib-website/issues](https://github.com/GeorgeET15/arcade-lib-website/issues)
- **Website**: [http://arcade-lib.vercel.app/](http://arcade-lib.vercel.app/)

---

Built with 💾 and 🎮 by the ARCADE community.
