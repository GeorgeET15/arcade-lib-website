import React from "react";
import { FaGithub, FaLinkedin, FaHeart } from "react-icons/fa";

const Footer: React.FC = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <style>{`html { scroll-behavior: smooth; }`}</style>
      <footer className="bg-black text-white py-6 border-t-4 border-pink-600">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 font-pixel text-base">
          {/* Brand */}
          <a
            href="#hero"
            onClick={(e) => handleScroll(e, "hero")}
            className="text-yellow-400 text-xl sm:text-2xl transition-colors pixel-shadow"
          >
            ARCADE
          </a>
          {/* Made with Love */}
          <span className="text-teal-400 text-xs sm:text-sm text-center inline-flex items-center">
            Made with{" "}
            <a
              href="https://georgeemmanuelthomas.dev/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="The Creator"
            >
              <FaHeart className="w-3 h-3 sm:w-4 sm:h-4 text-pink-600 hover:text-yellow-400 transition-colors ml-2 mr-2 shake" />{" "}
            </a>
            in Kochi
          </span>

          {/* Social Links */}
          <div className="flex gap-4 sm:gap-6">
            <a
              href="https://x.com/GeorgeET0415"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X.com"
            >
              <p className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600 hover:text-yellow-400 transition-colors font-sans font-extrabold text-base sm:text-lg">
                X
              </p>
            </a>
            <a
              href="https://github.com/GeorgeET15/arcade-lib-website"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600 hover:text-yellow-400 transition-colors" />
            </a>
            <a
              href="https://www.linkedin.com/in/george-emmanuel-thomas-518060202/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600 hover:text-yellow-400 transition-colors" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
