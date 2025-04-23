import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="bg-pixel-navy min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
        <span className="text-5xl">🎮</span>
      </div>
      <h1 className="text-4xl font-pixel font-bold mb-4 pixel-shadow text-pixel-yellow drop-shadow-md">
        404: Page Not Found
      </h1>
      <p className="text-xl text-muted-foreground mb-8 text-center max-w-lg">
        Oops! It looks like the game level you're looking for doesn't exist.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <Button asChild className="bg-game-primary hover:bg-game-primary/90">
          <Link to="/">Return Home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/docs">View Documentation</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
