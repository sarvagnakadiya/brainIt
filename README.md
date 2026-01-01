# 🧠 BrainIt

A fun terminal-based mental math game to keep your brain sharp and fight brain rot! Perfect for developers who want a quick mental break with practical math skills.

## Features

- **60-second rapid-fire math challenges** - Addition, subtraction, and multiplication
- **Real-time countdown timer** - Feel the adrenaline rush
- **High score tracking** - Beat your personal best
- **Mental math difficulty** - Problems designed to be solved in your head (like 65 - 18)
- **Instant feedback** - Know immediately if you're right or wrong
- **Accuracy tracking** - See your performance stats

## Installation

### Global Installation (Recommended)

```bash
npm install -g brainit
```

Then run anywhere:

```bash
brainit
```

### Local Development

```bash
# Clone or navigate to the project
npm install

# Run in development mode
npm run dev

# Or build and run
npm run build
npm start
```

## Usage

Simply run the command and follow the prompts:

```bash
brainit
```

The game will:
1. Show you the rules and current high score
2. Wait for you to press ENTER to start
3. Give you 60 seconds to solve as many mental math problems as possible
4. Show your final score and accuracy
5. Save your high score automatically

## Game Rules

- You have **60 seconds** to solve as many problems as you can
- Questions include:
  - **Addition**: Two 2-digit numbers (e.g., 45 + 67)
  - **Subtraction**: 2-digit numbers with positive results (e.g., 82 - 35)
  - **Multiplication**: Single-digit numbers (e.g., 7 × 8)
- Type your answer and press ENTER
- Your high score is saved in `~/.brainit-highscore.json`

## Development

```bash
# Install dependencies
npm install

# Run in development mode with auto-reload
npm run dev

# Build TypeScript to JavaScript
npm run build

# Run the built version
npm start
```

## Publishing to NPM

```bash
# Build the project
npm run build

# Login to NPM (if not already)
npm login

# Publish
npm publish
```

## Why BrainIt?

As developers, we spend hours coding but rarely exercise our basic mental math skills. BrainIt helps you:

- Practice mental arithmetic you actually use in daily life
- Take productive micro-breaks during coding sessions
- Build number sense and calculation speed
- Have fun competing against yourself

## License

MIT

## Contributing

Feel free to open issues or submit PRs to make BrainIt even better!
