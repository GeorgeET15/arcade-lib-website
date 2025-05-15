import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  Rocket,
  Shield,
  Dice3,
  Gamepad,
  Upload,
  User,
  ChevronLeft,
  ChevronRight,
  Puzzle,
  Car,
  Map,
  Brain,
  Swords,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { createClient } from "@supabase/supabase-js";
import { FaGithub } from "react-icons/fa";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Game categories
const gameCategories = [
  { value: "platformer", label: "Platformer" },
  { value: "shooter", label: "Shooter" },
  { value: "rpg", label: "RPG" },
  { value: "roguelike", label: "Roguelike" },
  { value: "sandbox", label: "Sandbox" },
  { value: "puzzle", label: "Puzzle" },
  { value: "racing", label: "Racing" },
  { value: "adventure", label: "Adventure" },
  { value: "strategy", label: "Strategy" },
  { value: "fighting", label: "Fighting" },
];

// Category icons
const categoryIcons: Record<string, React.ReactNode> = {
  platformer: <Gamepad className="text-pixel-pink" />,
  shooter: <Rocket className="text-pixel-pink" />,
  rpg: <Shield className="text-pixel-teal" />,
  roguelike: <Shield className="text-pixel-teal" />,
  sandbox: <Dice3 className="text-pixel-yellow" />,
  puzzle: <Puzzle className="text-pixel-yellow" />,
  racing: <Car className="text-pixel-pink" />,
  adventure: <Map className="text-pixel-teal" />,
  strategy: <Brain className="text-pixel-yellow" />,
  fighting: <Swords className="text-pixel-pink" />,
};

// Form schema
const uploadFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Game name must be at least 2 characters" }),
  creator: z
    .string()
    .min(2, { message: "Creator name must be at least 2 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  category: z.string({ required_error: "Please select a category" }),
  githubUrl: z
    .string()
    .url({ message: "Must be a valid GitHub repository URL" }),
  coverImage: z.string().url({ message: "Must be a valid image URL" }),
  screenshots: z
    .string()
    .min(1, { message: "Enter at least one screenshot URL" }),
});

type UploadFormValues = z.infer<typeof uploadFormSchema>;

// Game interface
interface Game {
  id: string;
  name: string;
  creator: string;
  description: string;
  category: string;
  coverImage: string;
  githubUrl: string;
  screenshots: string[];
  icon: React.ReactNode;
}

// RetroShowcaseCard component
function RetroShowcaseCard({
  game,
  onClick,
}: {
  game: Game;
  onClick: () => void;
}) {
  return (
    <Card
      className="bg-pixel-dark border-2 border-pixel-teal text-pixel-light flex flex-col items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 w-full max-w-[160px] sm:max-w-[320px] mx-auto cursor-pointer hover:scale-105 hover:border-pixel-teal transition-transform duration-200 shadow-[2px_2px_0_#ff00ff] overflow-hidden mt-3"
      onClick={onClick}
      aria-label={`View details for ${game.name} by ${game.creator}`}
    >
      <div className="relative w-full">
        <img
          src={game.coverImage}
          alt={`${game.name} cover`}
          className="w-full max-w-[140px] sm:max-w-[300px] h-20 sm:h-48 object-contain border-2 border-pixel-teal/80 bg-pixel-navy/80 rounded-[4px] mx-auto"
          loading="lazy"
        />
        <div className="absolute top-1 left-1 bg-pixel-dark/50 p-0.5 rounded-full">
          <span className="text-sm sm:text-2xl">{game.icon}</span>
        </div>
      </div>
      <div className="font-pixel text-[8px] sm:text-xs uppercase text-pixel-yellow line-clamp-1">
        {game.name}
      </div>
      <div className="text-[8px] sm:text-xs font-sans text-pixel-teal opacity-75">
        by {game.creator}
      </div>
    </Card>
  );
}

const ShowcasePage = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isInstructionsDialogOpen, setIsInstructionsDialogOpen] =
    useState(false);
  const [isGameDialogOpen, setIsGameDialogOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const form = useForm<UploadFormValues>({
    resolver: zodResolver(uploadFormSchema),
    defaultValues: {
      name: "",
      creator: "",
      description: "",
      category: "",
      githubUrl: "",
      coverImage: "",
      screenshots: "",
    },
  });

  // Fetch games from Supabase
  useEffect(() => {
    const fetchGames = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("games")
          .select("*")
          .eq("status", "approved");
        if (error) throw new Error(error.message);
        const fetchedGames: Game[] = data.map((doc: any) => ({
          id: doc.id,
          name: doc.name,
          creator: doc.creator,
          description: doc.description,
          category: doc.category,
          coverImage: doc.cover_image,
          githubUrl: doc.github_url,
          screenshots: doc.screenshots,
          icon: categoryIcons[doc.category] || (
            <Gamepad className="text-pixel-pink" />
          ),
        }));
        setGames(fetchedGames);
      } catch (error) {
        console.error("Error fetching games:", error);
        toast.error("Failed to load games");
      } finally {
        setIsLoading(false);
      }
    };
    fetchGames();
  }, []);

  // Handle form submission
  const onSubmit = async (data: UploadFormValues) => {
    try {
      const { data: insertedData, error } = await supabase
        .from("games")
        .insert([
          {
            name: data.name,
            creator: data.creator,
            description: data.description,
            category: data.category,
            github_url: data.githubUrl,
            cover_image: data.coverImage,
            screenshots: data.screenshots.split(",").map((url) => url.trim()),
            status: "pending",
          },
        ])
        .select();
      if (error) throw new Error(error.message);
      toast.success("Game submitted successfully! Awaiting approval.");
      setIsUploadDialogOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error submitting game:", error);
      toast.error("Failed to submit game");
    }
  };

  const openGameDetails = (game: Game) => {
    setSelectedGame(game);
    setCarouselIndex(0);
    setIsGameDialogOpen(true);
  };

  const handlePrev = () => {
    setCarouselIndex((prev) =>
      prev === 0 ? (selectedGame?.screenshots.length || 1) - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCarouselIndex((prev) =>
      prev === (selectedGame?.screenshots.length || 1) - 1 ? 0 : prev + 1
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;
    if (deltaX > 50) handlePrev(); // Swipe right
    else if (deltaX < -50) handleNext(); // Swipe left
    setTouchStartX(null);
  };

  return (
    <div className="bg-gradient-to-b from-pixel-navy to-pixel-dark min-h-screen flex flex-col items-center justify-start py-6 px-2 sm:px-4 relative">
      <div className="scanlines pointer-events-none absolute inset-0"></div>
      <div className="z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
        <div className="flex flex-col items-center mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-4 font-pixel text-pixel-yellow drop-shadow-[2px_2px_0_#ff00ff] tracking-wide">
            Arcade Showcase
          </h1>
          <p
            className="font-pixel text-pixel-light mt-1 text-xs sm:text-sm uppercase tracking-widest"
            style={{ letterSpacing: "1px" }}
          >
            Games Created With ARCADE
          </p>
          <p className="font-sans text-pixel-light text-xs sm:text-sm mt-2 max-w-md">
            Browse amazing projects built with the ARCADE C library or submit
            your own!
          </p>
          <Button
            onClick={() => setIsInstructionsDialogOpen(true)}
            className="mt-3 sm:mt-4 bg-pixel-yellow text-pixel-dark font-pixel text-sm sm:text-base px-4 sm:px-6 py-1.5 sm:py-2 border-4 border-pixel-pink hover:bg-pixel-pink hover:text-pixel-yellow transition-colors min-w-[44px] min-h-[44px]"
          >
            <Upload className="mr-2 h-4 w-4" /> Submit Your Game
          </Button>
        </div>

        <div className="w-full">
          <h2 className="font-pixel text-pixel-teal text-lg sm:text-xl md:text-2xl text-center uppercase mb-4 sm:mb-6">
            Featured Games
          </h2>
          {isLoading ? (
            <div className="text-pixel-light text-center text-xs sm:text-sm">
              Loading games...
            </div>
          ) : games.length === 0 ? (
            <div className="text-pixel-light text-center text-xs sm:text-sm">
              No games found.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-5 w-full">
              {games.map((game) => (
                <RetroShowcaseCard
                  key={game.id}
                  game={game}
                  onClick={() => openGameDetails(game)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Instructions Dialog */}
      <Dialog
        open={isInstructionsDialogOpen}
        onOpenChange={setIsInstructionsDialogOpen}
      >
        <DialogContent className="bg-gradient-to-br from-pixel-navy to-pixel-dark/90 text-pixel-light border-4 border-pixel-teal/80 w-[95vw] max-w-[90vw] sm:max-w-2xl p-4 sm:p-6 shadow-[4px_4px_0_#ff00ff] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-pixel-yellow font-pixel text-lg sm:text-xl">
              How to Submit Your ARCADE Game
            </DialogTitle>
            <DialogDescription className="text-pixel-light font-sans text-xs sm:text-sm">
              Follow these steps to prepare and submit your game. All
              submissions are subject to review, and only approved games will be
              showcased.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
            <div>
              <h3 className="text-pixel-pink font-pixel text-sm sm:text-base">
                1. Publish on GitHub
              </h3>
              <p className="text-pixel-light font-sans">
                Create a public GitHub repo with your game code, assets, and a
                README. Use the repo URL (e.g.,{" "}
                <code className="text-pixel-yellow">
                  https://github.com/username/repo
                </code>
                ).
              </p>
            </div>
            <div>
              <h3 className="text-pixel-pink font-pixel text-sm sm:text-base">
                2. Upload Images
              </h3>
              <p className="text-pixel-light font-sans">
                Add 2–3 screenshots and a cover image to a{" "}
                <code className="text-pixel-yellow">/screenshots</code> folder
                in your repo. Use raw GitHub URLs.
              </p>
            </div>
            <div>
              <h3 className="text-pixel-pink font-pixel text-sm sm:text-base">
                3. Complete the Form
              </h3>
              <p className="text-pixel-light font-sans">
                Fill in all fields with valid details and URLs. Submit to share
                your game!
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                setIsInstructionsDialogOpen(false);
                setIsUploadDialogOpen(true);
              }}
              className="bg-pixel-yellow text-pixel-dark font-pixel text-sm sm:text-base px-4 sm:px-6 py-1.5 sm:py-2 border-4 border-pixel-pink hover:bg-pixel-pink hover:text-pixel-yellow transition-colors min-w-[44px] min-h-[44px]"
            >
              Continue to Form
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upload Form Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="bg-gradient-to-br from-pixel-navy to-pixel-dark/90 text-pixel-light border-4 border-pixel-teal/80 w-[95vw] max-w-[90vw] sm:max-w-2xl p-4 sm:p-6 shadow-[4px_4px_0_#ff00ff] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-pixel-yellow font-pixel text-lg sm:text-xl">
              Submit Your ARCADE Game
            </DialogTitle>
            <DialogDescription className="text-pixel-light font-sans text-xs sm:text-sm">
              Share your creation with the ARCADE community. All submissions are
              subject to review, and only approved games will be showcased.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-3 sm:space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-pixel-pink font-pixel text-xs sm:text-sm">
                        Game Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Cosmic Crusaders"
                          {...field}
                          className="bg-pixel-dark border-pixel-teal text-pixel-light font-sans text-xs sm:text-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-pixel-yellow text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="creator"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-pixel-pink font-pixel text-xs sm:text-sm">
                        Creator Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name or handle"
                          {...field}
                          className="bg-pixel-dark border-pixel-teal text-pixel-light font-sans text-xs sm:text-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-pixel-yellow text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-pixel-pink font-pixel text-xs sm:text-sm">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="A brief description of your game"
                        {...field}
                        className="bg-pixel-dark border-pixel-teal text-pixel-light font-sans text-xs sm:text-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-pixel-yellow text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-pixel-pink font-pixel text-xs sm:text-sm">
                      Game Category
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-pixel-dark border-pixel-teal text-pixel-light font-sans text-xs sm:text-sm">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-pixel-dark border-pixel-teal text-pixel-light">
                        {gameCategories.map((category) => (
                          <SelectItem
                            key={category.value}
                            value={category.value}
                          >
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-pixel-yellow text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="githubUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-pixel-pink font-pixel text-xs sm:text-sm">
                      GitHub Repository URL
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://github.com/yourusername/your-repo"
                        {...field}
                        className="bg-pixel-dark border-pixel-teal text-pixel-light font-sans text-xs sm:text-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-pixel-yellow text-xs" />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <FormField
                  control={form.control}
                  name="coverImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-pixel-pink font-pixel text-xs sm:text-sm">
                        Cover Image URL
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://raw.githubusercontent.com/.../cover.png"
                          {...field}
                          className="bg-pixel-dark border-pixel-teal text-pixel-light font-sans text-xs sm:text-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-pixel-yellow text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="screenshots"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-pixel-pink font-pixel text-xs sm:text-sm">
                        Screenshots URLs
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://raw.githubusercontent.com/.../screenshot1.png,..."
                          {...field}
                          className="bg-pixel-dark border-pixel-teal text-pixel-light font-sans text-xs sm:text-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-pixel-yellow text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  className="bg-pixel-yellow text-pixel-dark font-pixel text-sm sm:text-base px-4 sm:px-6 py-1.5 sm:py-2 border-4 border-pixel-pink hover:bg-pixel-pink hover:text-pixel-yellow transition-colors min-w-[44px] min-h-[44px]"
                >
                  Submit Game
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Game Details Dialog */}
      {selectedGame && (
        <Dialog open={isGameDialogOpen} onOpenChange={setIsGameDialogOpen}>
          <DialogContent className="bg-gradient-to-br from-pixel-navy to-pixel-dark/90 text-pixel-light border-4 border-pixel-teal/80 w-[95vw] max-w-[90vw] sm:max-w-2xl p-4 sm:p-6 shadow-[4px_4px_0_#ff00ff] max-h-[85vh] overflow-y-auto">
            <DialogClose className="absolute top-2 sm:top-2 right-2 sm:right-2 text-pixel-light hover:text-pixel-yellow"></DialogClose>
            <DialogHeader>
              <DialogTitle className="text-pixel-yellow font-pixel text-lg sm:text-xl flex items-center gap-2">
                <span className="text-2xl sm:text-3xl">
                  {selectedGame.icon}
                </span>
                {selectedGame.name}
              </DialogTitle>
              <DialogDescription className="text-pixel-light">
                <div className="flex items-center gap-2 text-pixel-pink">
                  <User className="h-3 sm:h-4 w-3 sm:w-4" />
                  <span className="font-pixel text-xs sm:text-sm">
                    by {selectedGame.creator}
                  </span>
                </div>
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 sm:space-y-6">
              <div
                className="relative"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <img
                  src={selectedGame.screenshots[carouselIndex]}
                  alt={`${selectedGame.name} screenshot ${carouselIndex + 1}`}
                  className="w-full h-40 sm:h-64 object-contain rounded-lg border-4 border-pixel-teal/80"
                />
                <button
                  onClick={handlePrev}
                  aria-label="Previous screenshot"
                  className="absolute left-2 sm:left-2 top-1/2 -translate-y-1/2 bg-pixel-dark/80 text-pixel-yellow p-2 sm:p-3 rounded-full hover:bg-pixel-yellow hover:text-pixel-dark transition-colors min-w-[44px] min-h-[44px]"
                >
                  <ChevronLeft className="h-5 sm:h-6 w-5 sm:w-6" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next screenshot"
                  className="absolute right-2 sm:right-2 top-1/2 -translate-y-1/2 bg-pixel-dark/80 text-pixel-yellow p-2 sm:p-3 rounded-full hover:bg-pixel-yellow hover:text-pixel-dark transition-colors min-w-[44px] min-h-[44px]"
                >
                  <ChevronRight className="h-5 sm:h-6 w-5 sm:w-6" />
                </button>
                <div className="absolute bottom-2 sm:bottom-2 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-2">
                  {selectedGame.screenshots.map((_, index) => (
                    <span
                      key={index}
                      className={`h-2 w-2 rounded-full ${
                        index === carouselIndex
                          ? "bg-pixel-teal"
                          : "bg-pixel-light/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-pixel-light font-sans text-xs sm:text-base mb-3 sm:mb-4">
                  {selectedGame.description}
                </p>
                <Button
                  asChild
                  className="bg-pixel-yellow text-pixel-dark font-pixel text-sm sm:text-base px-4 sm:px-6 py-1.5 sm:py-2 border-4 border-pixel-pink hover:bg-pixel-pink hover:text-pixel-yellow transition-colors min-w-[44px] min-h-[44px]"
                >
                  <a
                    href={selectedGame.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub className="mr-2 h-6 w-6" /> View on GitHub
                  </a>
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ShowcasePage;
