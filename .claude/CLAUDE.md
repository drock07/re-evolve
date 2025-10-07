# re-evolve

## Project Overview

An incremental/idle game simulating the progression from RNA and DNA through cellular evolution, all the way up to a space-faring civilization and beyond. This project is inspired by the [Evolve incremental game](https://github.com/pmotschmann/Evolve) but will diverge with unique mechanics and progression systems.

## Game Concept

### Core Progression
- Start with basic molecular building blocks (RNA, DNA)
- Progress through cellular evolution (organelles, membranes, etc.)
- Advance through biological complexity
- Eventually reach sentience and civilization
- Push into space exploration and beyond

### Prestige System
The game features a prestige mechanic where players can trigger reset events (such as nuclear disasters or other catastrophic events) to restart with a new species. Each reset:
- Earns prestige currency
- Unlocks new species options
- Provides permanent upgrades that persist across runs
- Allows for different evolutionary paths and strategies

**Note:** While the prestige system starts similar to the original Evolve game, the long-term vision will diverge into unique mechanics and systems.

## Technology Stack

### Core Technologies
- **React 18** - UI framework
- **TypeScript** - Type-safe development
- **Vite** - Build tool and dev server
- **pnpm** - Package manager

### UI Libraries
- **Tailwind CSS 4** - Utility-first styling
- **HeadlessUI** - Unstyled, accessible UI components
- **Heroicons** - Icon library

### State Management
- **Immer** - Immutable state updates
- **Web Workers** - Game loop processing (via `LoopWorker.ts`)
- **React Context** - State distribution to components

## Project Structure

```
src/
├── game/              # Core game logic
│   ├── GameState/     # State management classes
│   ├── types/         # Type definitions and enums
│   ├── Actions.ts     # Player-triggered actions
│   ├── Buildings.ts   # Evolutions/upgrades (note: may be renamed)
│   ├── Game.ts        # Main game controller
│   ├── *Manager.ts    # Managers for resources, actions, buildings
│   └── GameLoopManager.ts  # Game loop orchestration
├── components/        # React UI components
├── contexts/          # React context providers
└── hooks/            # Custom React hooks
```

## Development

### Commands
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build

### Key Patterns
- Game state is immutable and updated via Immer
- Game loop runs on multiple intervals (short/mid/long) via Web Worker
- Managers handle business logic and state transformations
- Views are read-only representations of state for UI consumption
