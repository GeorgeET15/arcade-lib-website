import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

import {
  Rocket,
  Shield,
  Dice3,
  Gamepad,
  Upload,
  Github,
  Image,
  User,
  Link as LinkIcon,
  Folder,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const showcaseGames = [
  {
    id: "1",
    name: "Cosmic Crusaders",
    creator: "PixelProgrammer",
    description: "Pixel space shooter demo made with ARCADE",
    category: "shooter",
    coverImage: "/images/cosmic-crusaders.png",
    githubUrl: "https://github.com/pixelprogrammer/cosmic-crusaders",
    screenshots: [
      "/images/cosmic-crusaders-1.png",
      "/images/cosmic-crusaders-2.png",
    ],
    icon: <Rocket className="text-retroPink" />,
  },
  {
    id: "2",
    name: "Dungeon Hero",
    creator: "RetroDevs",
    description: "Classic roguelike dungeon crawler built in ARCADE",
    category: "roguelike",
    coverImage: "/images/dungeon-hero.png",
    githubUrl: "https://github.com/retrodevs/dungeon-hero",
    screenshots: ["/images/dungeon-hero-1.png", "/images/dungeon-hero-2.png"],
    icon: <Shield className="text-retroBlue" />,
  },
  {
    id: "3",
    name: "BlockWorld",
    creator: "C_Master",
    description: "Sandbox block game: the ARCADE physics demo",
    category: "sandbox",
    coverImage: "/images/blockworld.png",
    githubUrl: "https://github.com/c_master/blockworld",
    screenshots: ["/images/blockworld-1.png", "/images/blockworld-2.png"],
    icon: <Dice3 className="text-retroYellow" />,
  },
];

const gameCategories = [
  { value: "platformer", label: "Platformer" },
  { value: "shooter", label: "Shooter" },
  { value: "rpg", label: "RPG" },
  { value: "roguelike", label: "Roguelike" },
  { value: "sandbox", label: "Sandbox" },
];

const categoryIcons: Record<string, React.ReactNode> = {
  platformer: <Gamepad className="text-retroGreen" />,
  shooter: <Rocket className="text-retroPink" />,
  rpg: <Shield className="text-retroBlue" />,
  roguelike: <Shield className="text-retroBlue" />,
  sandbox: <Dice3 className="text-retroYellow" />,
};

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
    .url({ message: "Must be a valid screenshots folder URL" }),
});

type UploadFormValues = z.infer<typeof uploadFormSchema>;

function RetroShowcaseCard({
  game,
  onClick,
}: {
  game: (typeof showcaseGames)[0];
  onClick: () => void;
}) {
  return (
    <div
      className="bg-retroDark text-retroGreen pixel-border flex flex-col items-center gap-2 p-4 w-full max-w-[300px] mx-auto cursor-pointer hover:scale-105 transition-transform duration-200 shadow-xl"
      onClick={onClick}
    >
      <div className="text-5xl">{game.icon}</div>
      <img
        src={game.coverImage}
        alt={game.name}
        className="w-36 h-28 object-contain pixel-border bg-black/80"
      />
      <div className="font-pixel text-[11px] mt-2 uppercase">{game.name}</div>
      <div className="text-xs font-pixel text-retroPink mb-2">
        {game.description}
      </div>
      <div className="text-[10px] font-pixel text-retroBlue">
        by {game.creator}
      </div>
    </div>
  );
}

const ShowcasePage = () => {
  const [selectedGame, setSelectedGame] = useState<
    (typeof showcaseGames)[0] | null
  >(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isGameDialogOpen, setIsGameDialogOpen] = useState(false);

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

  const onSubmit = (data: UploadFormValues) => {
    console.log("Game submission data:", data);
    toast.success(
      "Game submitted successfully! Once approved, it will appear in the showcase."
    );
    setIsUploadDialogOpen(false);
    form.reset();
  };

  const openGameDetails = (game: (typeof showcaseGames)[0]) => {
    setSelectedGame(game);
    setIsGameDialogOpen(true);
  };

  return (
    <div className="bg-pixel-navy relative min-h-screen flex flex-col items-center justify-start py-16">
      <div className="scanlines pointer-events-none"></div>
      <div className="z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        <div className="flex flex-col items-center mb-12">
          <div
            className="text-pixel-yellow text-[2.4rem] sm:text-5xl font-pixel pixel-shadow drop-shadow-[0_6px_0px_rgb(0_0_0/0.5)] select-none tracking-widest uppercase"
            style={{ letterSpacing: "4px" }}
          >
            ARCADE SHOWCASE
          </div>
          <div
            className="font-pixel text-pixel-white mt-2 text-center text-sm uppercase tracking-widest"
            style={{ letterSpacing: "2px" }}
          >
            Games Created With ARCADE
          </div>
          <div className="bg-pixel-blue h-2 w-36 rounded mt-3 mb-2 animate-pulse-light" />
          <div className="font-pixel text-pixel-white text-xs mb-6">
            Browse amazing projects built with the ARCADE C library or submit
            your own creation!
          </div>

          <Button
            onClick={() => setIsUploadDialogOpen(true)}
            className="bg-pixel-pink text-pixel-dark pixel-border font-pixel"
          >
            <Upload className="mr-2 h-4 w-4" /> Submit Your Game
          </Button>
        </div>

        <div className="w-full mb-8">
          <h2 className="font-pixel text-pixel-blue text-xl text-center uppercase mb-8">
            Featured Games
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full z-20">
            {showcaseGames.map((game) => (
              <RetroShowcaseCard
                key={game.id}
                game={game}
                onClick={() => openGameDetails(game)}
              />
            ))}
          </div>
        </div>
      </div>

      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent
          className="bg-retroDark text-retroGreen border-retroPink max-w-2xl"
          style={{ background: "#191919" }}
        >
          <DialogHeader>
            <DialogTitle className="text-retroYellow font-pixel text-lg">
              Submit Your ARCADE Game
            </DialogTitle>
            <DialogDescription className="text-retroGreen font-pixel text-xs">
              Share your creation with the ARCADE community. Please provide all
              the required information below.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-retroPink">
                        Game Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Cosmic Crusaders"
                          {...field}
                          className="bg-retroDark border-retroBlue text-retroGreen"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="creator"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-retroPink">
                        Creator Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name or handle"
                          {...field}
                          className="bg-retroDark border-retroBlue text-retroGreen"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-retroPink">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="A brief description of your game"
                        {...field}
                        className="bg-retroDark border-retroBlue text-retroGreen"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-retroPink">
                      Game Category
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-retroDark border-retroBlue text-retroGreen">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-retroDark border-retroBlue text-retroGreen">
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="githubUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-retroPink">
                      GitHub Repository URL
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://github.com/yourusername/your-repo"
                        {...field}
                        className="bg-retroDark border-retroBlue text-retroGreen"
                      />
                    </FormControl>
                    <FormDescription className="text-retroBlue text-xs">
                      Make sure your repo contains a screenshots folder
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="coverImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-retroPink">
                        Cover Image URL
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://link-to-your-cover-image.png"
                          {...field}
                          className="bg-retroDark border-retroBlue text-retroGreen"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="screenshots"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-retroPink">
                        Screenshots Folder URL
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://github.com/.../screenshots"
                          {...field}
                          className="bg-retroDark border-retroBlue text-retroGreen"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button
                  type="submit"
                  className="bg-retroYellow text-retroDark font-pixel hover:bg-retroPink"
                >
                  Submit Game
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {selectedGame && (
        <Dialog open={isGameDialogOpen} onOpenChange={setIsGameDialogOpen}>
          <DialogContent
            className="bg-retroDark text-retroGreen border-retroPink max-w-3xl"
            style={{ background: "#191919" }}
          >
            <DialogHeader>
              <DialogTitle className="text-retroYellow font-pixel text-lg flex items-center gap-2">
                <span className="text-3xl">{selectedGame.icon}</span>
                {selectedGame.name}
              </DialogTitle>
              <DialogDescription className="text-retroGreen">
                <div className="flex items-center gap-2 text-retroPink">
                  <User className="h-4 w-4" />
                  <span className="font-pixel text-sm">
                    by {selectedGame.creator}
                  </span>
                </div>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="rounded-lg border border-retroBlue p-4">
                <p className="text-retroGreen mb-2 font-pixel text-sm">
                  {selectedGame.description}
                </p>

                <div className="flex items-center gap-2 mt-4">
                  <Github className="h-4 w-4 text-retroYellow" />
                  <a
                    href={selectedGame.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-retroBlue hover:text-retroPink text-sm underline"
                  >
                    View Repository
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-retroPink font-pixel text-md mb-2 uppercase">
                  Screenshots
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {selectedGame.screenshots.map((screenshot, index) => (
                    <HoverCard key={index}>
                      <HoverCardTrigger>
                        <img
                          src={screenshot}
                          alt={`${selectedGame.name} screenshot ${index + 1}`}
                          className="w-full h-32 object-cover pixel-border cursor-pointer"
                        />
                      </HoverCardTrigger>
                      <HoverCardContent className="bg-retroDark border-retroPink p-0">
                        <img
                          src={screenshot}
                          alt={`${selectedGame.name} screenshot ${index + 1}`}
                          className="w-full object-contain"
                        />
                      </HoverCardContent>
                    </HoverCard>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                className="bg-retroYellow text-retroDark font-pixel hover:bg-retroPink"
                onClick={() => window.open(selectedGame.githubUrl, "_blank")}
              >
                <Github className="mr-2 h-4 w-4" /> View on GitHub
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ShowcasePage;
