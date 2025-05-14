import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Code } from "lucide-react";

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

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById("arcade-ide");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
          20%, 40%, 60%, 80% { transform: translateX(2px); }
        }
        .shake:hover {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>
      <header className="top-0 z-50 w-full border-b border-pixel-yellow bg-pixel-dark shadow-[0_4px_0_#ffda41]">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 select-none">
              <div className="w-10 h-10 rounded-none bg-pixel-teal flex items-center justify-center pixel-border border-2 border-pixel-pink shadow-[2px_2px_0_#FF7BDF]">
                <span className="text-pixel-yellow font-bold text-2xl font-pixel tracking-[0.2em] drop-shadow-md select-none">
                  A
                </span>
              </div>
            </Link>
          </div>
          <div className="flex-1 flex justify-end items-center">
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`
                    h-10 px-4 py-2 mx-1 font-semibold rounded-none font-sans 
                    ${
                      isActive(item.path)
                        ? "text-pixel-dark bg-pixel-yellow border-b-4 border-pixel-pink shadow-[0_2px_0_#14c9c9]"
                        : "text-pixel-yellow bg-pixel-dark border-b-4 border-pixel-pink shadow-[0_2px_0_#14c9c9]"
                    }
                    uppercase tracking-wide pixel-border 
                    hover:bg-pixel-pink hover:text-pixel-dark transition-colors flex items-center
                  `}
                  style={{
                    fontFamily: isActive(item.path) ? undefined : "inherit",
                    letterSpacing: "0.1em",
                    fontSize: "1rem",
                  }}
                >
                  {item.name}
                </Link>
              ))}
              <a href="#arcade-ide" onClick={handleScroll} className="ml-4">
                <Button
                  className="
                  h-10 bg-gradient-to-r from-pixel-pink to-pixel-teal text-pixel-dark 
                  border-4 border-pixel-yellow rounded-none uppercase font-pixel 
                  px-4 py-2 hover:scale-110 hover:rotate-2 hover:brightness-125 
                  active:scale-95 shake animate-pulse 
                  shadow-[0_4px_8px_rgba(255,123,223,0.5)] transition-all duration-200 
                  pixel-border flex items-center
                "
                >
                  <Code className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">IDE</span>
                </Button>
              </a>
            </nav>
            <Button
              variant="ghost"
              className="md:hidden h-10 w-10 bg-pixel-pink border border-pixel-yellow text-pixel-dark flex items-center justify-center"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="container md:hidden py-4 border-t border-pixel-pink bg-pixel-dark">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`
                    h-10 px-4 py-2 my-1 font-bold 
                    ${
                      isActive(item.path)
                        ? "bg-pixel-yellow text-pixel-pink border-b-4 border-pixel-teal"
                        : "bg-pixel-dark text-pixel-yellow border-b-4 border-pixel-pink"
                    }
                    pixel-border uppercase tracking-wide 
                    hover:bg-pixel-pink hover:text-pixel-dark flex items-center
                  `}
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    fontFamily: "inherit",
                    fontSize: "1rem",
                  }}
                >
                  {item.name}
                </Link>
              ))}
              <a href="#arcade-ide" onClick={handleScroll} className="mt-4">
                <Button
                  className="
                  h-10 w-full bg-gradient-to-r from-pixel-pink to-pixel-teal 
                  text-pixel-dark border-2 border-pixel-yellow rounded-none 
                  uppercase font-pixel px-4 py-2 hover:scale-110 hover:rotate-2 
                  hover:brightness-125 active:scale-95 shake animate-pulse 
                  shadow-[0_4px_8px_rgba(255,123,223,0.5)] transition-all duration-200 
                  pixel-border flex items-center justify-center
                "
                >
                  <Code className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">IDE</span>
                </Button>
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
