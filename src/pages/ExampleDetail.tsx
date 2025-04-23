
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const ExampleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  
  // Mock data for example details
  const examples = {
    'platformer': {
      title: 'Simple Platformer',
      description: 'Learn how to create a basic platformer game with gravity, jumping, and collision detection.',
      image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
      category: 'platformer',
      difficulty: 'beginner',
      overview: 'This example demonstrates how to build a simple platformer game using PixelPortal. You\'ll learn how to implement character movement, jumping, gravity, and collision detection with platforms.',
      features: [
        'Character movement with keyboard input',
        'Jumping mechanics with gravity',
        'Platform collision detection',
        'Camera following the player',
        'Simple level design'
      ],
      screenshots: [
        'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
        'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
      ],
      codeExample: `import { Game, Sprite, Physics } from 'pixelportal';

// Initialize the game
const game = new Game({
  width: 800,
  height: 600,
  backgroundColor: '#87CEEB', // Sky blue
});

// Create the player sprite
const player = new Sprite({
  x: 100,
  y: 300,
  width: 32,
  height: 48,
  color: '#FF0000', // Red
});

// Add physics to the player
Physics.enable(player, {
  gravity: 0.5,
  friction: 0.1,
});

// Create platforms
const platforms = [
  new Sprite({ x: 400, y: 500, width: 800, height: 20, color: '#00FF00', isStatic: true }),
  new Sprite({ x: 200, y: 400, width: 200, height: 20, color: '#00FF00', isStatic: true }),
  new Sprite({ x: 600, y: 300, width: 200, height: 20, color: '#00FF00', isStatic: true }),
];

// Add platforms to the game
platforms.forEach(platform => {
  game.add(platform);
  Physics.makeCollider(platform);
});

// Add the player to the game
game.add(player);

// Handle keyboard input
game.onKeyDown('ArrowLeft', () => {
  player.velocity.x = -5;
});

game.onKeyDown('ArrowRight', () => {
  player.velocity.x = 5;
});

game.onKeyDown('Space', () => {
  // Only jump if the player is on the ground
  if (player.isOnGround) {
    player.velocity.y = -12;
  }
});

game.onKeyUp(['ArrowLeft', 'ArrowRight'], () => {
  player.velocity.x = 0;
});

// Start the game loop
game.start();`
    },
    'space-shooter': {
      title: 'Space Shooter',
      description: 'Build a classic space shooter with enemies, projectiles, and power-ups.',
      image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
      category: 'shooter',
      difficulty: 'intermediate',
      overview: 'In this example, you\'ll create a classic space shooter game where the player controls a spaceship, shoots enemies, and avoids obstacles. You\'ll learn about projectile management, enemy patterns, collision detection, and score tracking.',
      features: [
        'Player-controlled spaceship with keyboard/mouse input',
        'Projectile firing and management',
        'Enemy spawning and movement patterns',
        'Collision detection for projectiles and enemies',
        'Score tracking and display',
        'Power-up system'
      ],
      screenshots: [
        'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
        'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
      ],
      codeExample: `import { Game, Sprite, Input } from 'pixelportal';

// Initialize the game
const game = new Game({
  width: 800,
  height: 600,
  backgroundColor: '#000000',
});

// Game state
let score = 0;
let projectiles = [];
let enemies = [];
let spawnTimer = 0;

// Create the player ship
const player = new Sprite({
  x: 400,
  y: 500,
  width: 40,
  height: 40,
  color: '#FFFFFF',
});

// Add player to the game
game.add(player);

// Handle keyboard input for player movement
game.onKeyDown('ArrowLeft', () => {
  player.x -= 5;
  player.x = Math.max(20, player.x); // Prevent moving off-screen
});

game.onKeyDown('ArrowRight', () => {
  player.x += 5;
  player.x = Math.min(780, player.x); // Prevent moving off-screen
});

// Fire projectile on Space key
game.onKeyDown('Space', () => {
  const projectile = new Sprite({
    x: player.x,
    y: player.y - 20,
    width: 4,
    height: 10,
    color: '#FF0000',
  });
  
  projectiles.push(projectile);
  game.add(projectile);
});

// Game update loop
game.onUpdate(() => {
  // Update projectiles
  projectiles.forEach((projectile, index) => {
    projectile.y -= 8; // Move projectile up
    
    // Remove projectiles that go off-screen
    if (projectile.y < -10) {
      game.remove(projectile);
      projectiles.splice(index, 1);
    }
  });
  
  // Spawn enemies
  spawnTimer--;
  if (spawnTimer <= 0) {
    const enemy = new Sprite({
      x: Math.random() * 760 + 20,
      y: -20,
      width: 30,
      height: 30,
      color: '#00FF00',
    });
    
    enemies.push(enemy);
    game.add(enemy);
    spawnTimer = 60; // Spawn enemy every 60 frames
  }
  
  // Update enemies
  enemies.forEach((enemy, enemyIndex) => {
    enemy.y += 2; // Move enemy down
    
    // Remove enemies that go off-screen
    if (enemy.y > 620) {
      game.remove(enemy);
      enemies.splice(enemyIndex, 1);
    }
    
    // Check collision with projectiles
    projectiles.forEach((projectile, projectileIndex) => {
      if (game.checkCollision(projectile, enemy)) {
        // Remove both projectile and enemy
        game.remove(projectile);
        game.remove(enemy);
        projectiles.splice(projectileIndex, 1);
        enemies.splice(enemyIndex, 1);
        score += 10;
      }
    });
    
    // Check collision with player
    if (game.checkCollision(player, enemy)) {
      // Game over condition
      game.stop();
      alert('Game Over! Score: ' + score);
    }
  });
  
  // Update score display
  game.drawText('Score: ' + score, 20, 20, { color: '#FFFFFF', size: 16 });
});

// Start the game
game.start();`
    },
    'puzzle-game': {
      title: 'Puzzle Game',
      description: 'Create a tile-matching puzzle game with animations and scoring.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
      category: 'puzzle',
      difficulty: 'intermediate',
      overview: 'This puzzle game example shows how to create a tile-matching game similar to Bejeweled or Candy Crush. You\'ll learn how to implement grid-based game mechanics, detect matches, create chain reactions, and add scoring and animations.',
      features: [
        'Grid-based game board creation',
        'Tile swapping with mouse/touch input',
        'Match detection algorithms',
        'Falling tile mechanics',
        'Score tracking and multipliers',
        'Game over conditions'
      ],
      screenshots: [
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80', 
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
        'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80'
      ],
      codeExample: `// This is a simplified version of a match-3 puzzle game
import { Game, Sprite, Grid, Animation } from 'pixelportal';

// Initialize the game
const game = new Game({
  width: 800,
  height: 600,
  backgroundColor: '#222222',
});

// Constants
const GRID_SIZE = 8;
const TILE_SIZE = 60;
const TILE_TYPES = ['red', 'blue', 'green', 'yellow', 'purple'];
const COLORS = {
  red: '#FF0000',
  blue: '#0000FF',
  green: '#00FF00',
  yellow: '#FFFF00',
  purple: '#800080',
};

// Game state
let score = 0;
let selectedTile = null;
let gameBoard = [];
let animations = [];

// Create the game board
function createBoard() {
  gameBoard = [];
  
  for (let row = 0; row < GRID_SIZE; row++) {
    gameBoard[row] = [];
    
    for (let col = 0; col < GRID_SIZE; col++) {
      // Generate a random tile type
      const tileType = TILE_TYPES[Math.floor(Math.random() * TILE_TYPES.length)];
      
      // Create a sprite for the tile
      const tile = new Sprite({
        x: col * TILE_SIZE + TILE_SIZE / 2 + 180,
        y: row * TILE_SIZE + TILE_SIZE / 2 + 80,
        width: TILE_SIZE - 4,
        height: TILE_SIZE - 4,
        color: COLORS[tileType],
        radius: 4, // Rounded corners
      });
      
      // Store the tile type and position
      tile.type = tileType;
      tile.boardRow = row;
      tile.boardCol = col;
      
      // Make the tile interactive
      game.makeInteractive(tile);
      
      // Add the tile to the game
      game.add(tile);
      gameBoard[row][col] = tile;
    }
  }
  
  // Check for initial matches and resolve them
  resolveMatches();
}

// Handle tile selection
game.onObjectClick((tile) => {
  if (!selectedTile) {
    // First selection
    selectedTile = tile;
    tile.scale = 1.1; // Visual indication of selection
  } else if (tile === selectedTile) {
    // Deselect if clicking the same tile
    selectedTile.scale = 1.0;
    selectedTile = null;
  } else {
    // Second selection - check if adjacent
    const rowDiff = Math.abs(tile.boardRow - selectedTile.boardRow);
    const colDiff = Math.abs(tile.boardCol - selectedTile.boardCol);
    
    if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
      // Swap tiles
      swapTiles(selectedTile, tile);
      selectedTile.scale = 1.0;
      selectedTile = null;
    } else {
      // Not adjacent, select new tile
      selectedTile.scale = 1.0;
      selectedTile = tile;
      tile.scale = 1.1;
    }
  }
});

// Swap two tiles
function swapTiles(tile1, tile2) {
  // Swap positions in the array
  gameBoard[tile1.boardRow][tile1.boardCol] = tile2;
  gameBoard[tile2.boardRow][tile2.boardCol] = tile1;
  
  // Swap board coordinates
  const tempRow = tile1.boardRow;
  const tempCol = tile1.boardCol;
  tile1.boardRow = tile2.boardRow;
  tile1.boardCol = tile2.boardCol;
  tile2.boardRow = tempRow;
  tile2.boardCol = tempCol;
  
  // Animate the swap
  animations.push(new Animation({
    target: tile1,
    properties: {
      x: tile2.x,
      y: tile2.y,
    },
    duration: 300,
  }));
  
  animations.push(new Animation({
    target: tile2,
    properties: {
      x: tile1.x,
      y: tile1.y,
    },
    duration: 300,
    onComplete: () => {
      // After animation, check for matches
      resolveMatches();
    }
  }));
  
  // Update visual positions
  const tempX = tile1.x;
  const tempY = tile1.y;
  tile1.x = tile2.x;
  tile1.y = tile2.y;
  tile2.x = tempX;
  tile2.y = tempY;
}

// Check for and resolve matches
function resolveMatches() {
  // Implementation details omitted for brevity
  // This function would check for horizontal and vertical matches
  // Remove matched tiles, increment score, and make new tiles fall
}

// Start the game
createBoard();
game.start();`
    },
    'rpg-battle': {
      title: 'RPG Battle System',
      description: 'Implement a turn-based battle system with characters, abilities, and stats.',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
      category: 'rpg',
      difficulty: 'advanced',
      overview: 'This example demonstrates how to create a classic turn-based RPG battle system. You\'ll learn how to manage character stats, implement turn order, create battle actions, and design a basic AI for enemies.',
      features: [
        'Character stats and status effects',
        'Turn-based combat mechanics',
        'Menu systems for selecting actions',
        'Enemy AI with different behavior patterns',
        'Victory/defeat conditions'
      ],
      screenshots: [
        'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
        'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
        'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80'
      ],
      codeExample: `import { Game, UI, Sprite, Audio } from 'pixelportal';

// Initialize the game
const game = new Game({
  width: 800,
  height: 600,
  backgroundColor: '#2C2C54',
});

// Character class
class Character {
  constructor(name, hp, mp, strength, defense, speed, isEnemy = false) {
    this.name = name;
    this.maxHp = hp;
    this.hp = hp;
    this.maxMp = mp;
    this.mp = mp;
    this.strength = strength;
    this.defense = defense;
    this.speed = speed;
    this.isEnemy = isEnemy;
    this.statusEffects = [];
    
    // Create sprite
    this.sprite = new Sprite({
      width: isEnemy ? 100 : 80,
      height: isEnemy ? 100 : 140,
      color: isEnemy ? '#D83A56' : '#3AAFA9',
    });
    
    // Position will be set when added to battle
    game.add(this.sprite);
  }
  
  takeDamage(amount) {
    const actualDamage = Math.max(1, amount - this.defense / 2);
    this.hp = Math.max(0, this.hp - actualDamage);
    
    // Show damage number
    game.createFloatingText('-' + actualDamage, this.sprite.x, this.sprite.y - 20, {
      color: '#FF0000',
      size: 20,
      duration: 1000,
      rise: true,
    });
    
    // Shake sprite when damaged
    this.sprite.shake(10, 300);
    
    return actualDamage;
  }
  
  heal(amount) {
    const healAmount = Math.min(amount, this.maxHp - this.hp);
    this.hp += healAmount;
    
    // Show heal number
    game.createFloatingText('+' + healAmount, this.sprite.x, this.sprite.y - 20, {
      color: '#00FF00',
      size: 20,
      duration: 1000,
      rise: true,
    });
    
    return healAmount;
  }
  
  useMP(amount) {
    if (this.mp >= amount) {
      this.mp -= amount;
      return true;
    }
    return false;
  }
  
  // Basic attack action
  attack(target) {
    const damage = this.strength * (0.8 + Math.random() * 0.4);
    const damageDealt = target.takeDamage(damage);
    
    // Play attack animation
    this.sprite.playAnimation('attack');
    
    return {
      type: 'attack',
      user: this.name,
      target: target.name,
      damage: damageDealt,
    };
  }
  
  // Skill: Fireball
  fireball(target) {
    if (this.useMP(10)) {
      const damage = this.strength * 1.5 * (0.9 + Math.random() * 0.2);
      const damageDealt = target.takeDamage(damage);
      
      // Play fireball animation
      game.playEffect('fireball', this.sprite.x, this.sprite.y, target.sprite.x, target.sprite.y);
      
      return {
        type: 'skill',
        name: 'Fireball',
        user: this.name,
        target: target.name,
        damage: damageDealt,
      };
    }
    return null;
  }
  
  // Skill: Heal
  healSpell(target) {
    if (this.useMP(15)) {
      const healAmount = this.strength * 0.8 * (0.9 + Math.random() * 0.2);
      const amountHealed = target.heal(healAmount);
      
      // Play heal animation
      game.playEffect('heal', target.sprite.x, target.sprite.y);
      
      return {
        type: 'skill',
        name: 'Heal',
        user: this.name,
        target: target.name,
        heal: amountHealed,
      };
    }
    return null;
  }
  
  isDead() {
    return this.hp <= 0;
  }
}

// Battle system
class BattleSystem {
  constructor() {
    this.heroes = [];
    this.enemies = [];
    this.turnOrder = [];
    this.currentTurn = 0;
    this.battleState = 'idle'; // idle, playerTurn, enemyTurn, victory, defeat
    
    // Create UI elements
    this.createUI();
  }
  
  addHero(hero) {
    this.heroes.push(hero);
    hero.sprite.x = 200;
    hero.sprite.y = 300 + this.heroes.length * 80;
  }
  
  addEnemy(enemy) {
    this.enemies.push(enemy);
    enemy.sprite.x = 600;
    enemy.sprite.y = 200 + this.enemies.length * 100;
  }
  
  createUI() {
    // Implementation details omitted for brevity
    // This would create menu buttons, health bars, etc.
  }
  
  startBattle() {
    // Determine turn order based on speed
    this.turnOrder = [...this.heroes, ...this.enemies].sort((a, b) => b.speed - a.speed);
    this.currentTurn = 0;
    this.battleState = 'playerTurn';
    this.updateUI();
    
    // Start with the first character's turn
    this.processTurn();
  }
  
  processTurn() {
    const currentCharacter = this.turnOrder[this.currentTurn];
    
    if (currentCharacter.isDead()) {
      // Skip dead characters
      this.nextTurn();
      return;
    }
    
    if (currentCharacter.isEnemy) {
      // Enemy turn - AI decides action
      this.battleState = 'enemyTurn';
      this.processEnemyTurn(currentCharacter);
    } else {
      // Player turn - wait for input
      this.battleState = 'playerTurn';
      this.showActionMenu(currentCharacter);
    }
  }
  
  processEnemyTurn(enemy) {
    // Simple AI: Attack a random living hero
    const livingHeroes = this.heroes.filter(hero => !hero.isDead());
    
    if (livingHeroes.length > 0) {
      const target = livingHeroes[Math.floor(Math.random() * livingHeroes.length)];
      
      // Delay action for visual effect
      setTimeout(() => {
        const result = enemy.attack(target);
        this.logAction(result);
        
        // Check for battle end
        if (this.checkBattleEnd()) {
          return;
        }
        
        // Move to next turn
        setTimeout(() => this.nextTurn(), 1000);
      }, 1000);
    }
  }
  
  processPlayerAction(character, action, target) {
    let result;
    
    switch(action) {
      case 'attack':
        result = character.attack(target);
        break;
      case 'fireball':
        result = character.fireball(target);
        break;
      case 'heal':
        result = character.healSpell(target);
        break;
    }
    
    if (result) {
      this.logAction(result);
      
      // Check for battle end
      if (this.checkBattleEnd()) {
        return;
      }
      
      // Move to next turn
      setTimeout(() => this.nextTurn(), 1000);
    }
  }
  
  nextTurn() {
    this.currentTurn = (this.currentTurn + 1) % this.turnOrder.length;
    this.processTurn();
  }
  
  checkBattleEnd() {
    if (this.heroes.every(hero => hero.isDead())) {
      this.battleState = 'defeat';
      this.showDefeatScreen();
      return true;
    }
    
    if (this.enemies.every(enemy => enemy.isDead())) {
      this.battleState = 'victory';
      this.showVictoryScreen();
      return true;
    }
    
    return false;
  }
  
  showActionMenu(character) {
    // Implementation details omitted for brevity
  }
  
  showTargetSelection(character, action) {
    // Implementation details omitted for brevity
  }
  
  showVictoryScreen() {
    // Implementation details omitted for brevity
  }
  
  showDefeatScreen() {
    // Implementation details omitted for brevity
  }
  
  logAction(result) {
    // Implementation details omitted for brevity
  }
  
  updateUI() {
    // Implementation details omitted for brevity
  }
}

// Create characters
const warrior = new Character('Warrior', 120, 30, 25, 15, 10);
const mage = new Character('Mage', 80, 100, 10, 5, 15);
const healer = new Character('Healer', 90, 120, 8, 8, 12);

const goblin = new Character('Goblin', 50, 0, 15, 5, 8, true);
const orc = new Character('Orc', 100, 0, 20, 10, 5, true);
const evilMage = new Character('Evil Mage', 70, 80, 18, 6, 12, true);

// Set up battle
const battle = new BattleSystem();
battle.addHero(warrior);
battle.addHero(mage);
battle.addHero(healer);
battle.addEnemy(goblin);
battle.addEnemy(orc);
battle.addEnemy(evilMage);

// Start the battle
battle.startBattle();

// Start the game
game.start();`
    }
  };
  
  const example = examples[id || 'platformer'];
  
  return (
    <div className="container py-12">
      {example ? (
        <div>
          {/* Header */}
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="md:w-2/3">
              <div className="mb-4 flex items-center gap-2">
                <Link to="/examples" className="text-game-primary hover:underline">
                  ← Back to Examples
                </Link>
                <span className={`ml-auto px-2 py-1 text-xs rounded-full font-medium ${
                  example.difficulty === 'beginner' ? 'bg-green-100 text-green-800' : 
                  example.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {example.difficulty}
                </span>
              </div>
              <h1 className="text-3xl font-bold mb-2">{example.title}</h1>
              <p className="text-muted-foreground mb-4">{example.description}</p>
              <div className="flex gap-4">
                <Button className="bg-game-primary hover:bg-game-primary/90">Run Demo</Button>
                <Button variant="outline">View on GitHub</Button>
              </div>
            </div>
            <div className="md:w-1/3 rounded-lg overflow-hidden">
              <img src={example.image} alt={example.title} className="w-full h-48 object-cover" />
            </div>
          </div>
          
          {/* Tabs */}
          <Tabs defaultValue="overview" className="mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
              <TabsTrigger value="screenshots">Screenshots</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-6">
              <div className="bg-card rounded-lg border p-6">
                <h2 className="text-xl font-semibold mb-4">About this Example</h2>
                <p className="mb-6">{example.overview}</p>
                
                <h3 className="text-lg font-semibold mb-3">Features</h3>
                <ul className="space-y-2">
                  {example.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-card rounded-lg border p-6">
                <h2 className="text-xl font-semibold mb-4">What You'll Learn</h2>
                <p className="mb-4">This example demonstrates key PixelPortal features and concepts that you'll be able to apply to your own games.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-bold mb-2">Core Concepts</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• Sprite management and positioning</li>
                      <li>• Game loop and state handling</li>
                      <li>• Input detection and response</li>
                    </ul>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-bold mb-2">Advanced Techniques</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• Efficient collision detection</li>
                      <li>• Game physics implementation</li>
                      <li>• Performance optimization</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="code">
              <div className="bg-card rounded-lg border overflow-hidden">
                <div className="border-b p-4 bg-muted/50 flex justify-between items-center">
                  <h3 className="font-medium">main.js</h3>
                  <Button variant="outline" size="sm">Copy Code</Button>
                </div>
                <pre className="p-4 overflow-x-auto language-javascript font-code text-sm">
                  <code>{example.codeExample}</code>
                </pre>
              </div>
            </TabsContent>
            
            <TabsContent value="screenshots">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {example.screenshots.map((screenshot, index) => (
                  <div key={index} className="bg-card rounded-lg border overflow-hidden">
                    <img src={screenshot} alt={`Screenshot ${index + 1}`} className="w-full h-64 object-cover" />
                    <div className="p-4">
                      <h3 className="font-medium">Screenshot {index + 1}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Related Examples */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Examples</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(examples)
                .filter(([key]) => key !== id)
                .slice(0, 3)
                .map(([key, related]) => (
                  <Link to={`/examples/${key}`} key={key}>
                    <Card className="game-card h-full">
                      <div className="h-40 overflow-hidden rounded-t-xl">
                        <img 
                          src={related.image} 
                          alt={related.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold mb-2">{related.title}</h3>
                        <p className="text-muted-foreground text-sm">{related.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Example not found</h1>
          <p className="text-muted-foreground mb-6">The example you're looking for doesn't exist or has been removed.</p>
          <Link to="/examples">
            <Button>Back to Examples</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ExampleDetailPage;
