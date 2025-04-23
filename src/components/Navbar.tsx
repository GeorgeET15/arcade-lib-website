
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Documentation", path: "/docs" },
    { name: "Examples", path: "/examples" },
    { name: "Showcase", path: "/showcase" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-pixel-yellow bg-pixel-dark shadow-[0_4px_0_#ffda41]">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 select-none">
            <div className="w-8 h-8 rounded-none bg-pixel-teal flex items-center justify-center pixel-border border-2 border-pixel-pink shadow-[2px_2px_0_#FF7BDF]">
              <span className="text-pixel-yellow font-bold text-2xl font-pixel tracking-[0.2em] drop-shadow-md select-none">A</span>
            </div>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={
                isActive(item.path)
                  ? "px-4 py-2 mx-1 font-semibold rounded-none font-sans text-pixel-dark bg-pixel-yellow border-b-4 border-pixel-pink shadow-[0_2px_0_#14c9c9] uppercase tracking-wide pixel-border hover:bg-pixel-pink hover:text-pixel-dark transition-colors"
                  : "px-4 py-2 mx-1 font-semibold rounded-none font-sans text-pixel-yellow bg-pixel-dark border-b-4 border-pixel-pink shadow-[0_2px_0_#14c9c9] uppercase tracking-wide pixel-border hover:bg-pixel-pink hover:text-pixel-dark transition-colors"
              }
              style={{
                fontFamily: isActive(item.path) ? undefined : "inherit",
                letterSpacing: "0.1em",
                fontSize: "1rem",
              }}
            >
              {item.name}
            </Link>
          ))}
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4"
          >
            <Button className="bg-pixel-pink text-pixel-dark border-2 border-pixel-yellow rounded-none uppercase font-pixel hover:bg-pixel-yellow hover:text-pixel-pink hover:border-pixel-pink transition-colors pixel-border shadow-[0_2px_0_#14c9c9]">
              GitHub
            </Button>
          </a>
        </nav>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden bg-pixel-pink border border-pixel-yellow text-pixel-dark"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>
      {isMenuOpen && (
        <div className="container md:hidden py-4 border-t border-pixel-pink bg-pixel-dark">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={
                  isActive(item.path)
                    ? "px-4 py-2 my-1 font-bold bg-pixel-yellow text-pixel-pink pixel-border border-b-4 border-pixel-teal uppercase tracking-wide hover:bg-pixel-pink hover:text-pixel-dark"
                    : "px-4 py-2 my-1 font-bold bg-pixel-dark text-pixel-yellow pixel-border border-b-4 border-pixel-pink uppercase tracking-wide hover:bg-pixel-pink hover:text-pixel-dark"
                }
                onClick={() => setIsMenuOpen(false)}
                style={{
                  fontFamily: "inherit",
                  fontSize: "1rem",
                }}
              >
                {item.name}
              </Link>
            ))}
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4"
            >
              <Button className="bg-pixel-pink text-pixel-dark border-2 border-pixel-yellow rounded-none uppercase font-pixel pixel-border hover:bg-pixel-yellow hover:text-pixel-pink hover:border-pixel-pink">
                GitHub
              </Button>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
