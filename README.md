# 🧠 BrainIt

A fun terminal-based mental math game to keep your brain sharp and fight brain rot! Perfect for developers who want a quick mental break with practical math skills.

## Features

- **60-second rapid-fire math challenges** - Addition, subtraction, multiplication, and division
- **Real-time countdown timer** - Live updating timer without interrupting your input
- **High score tracking** - Beat your personal best
- **Mental math difficulty** - Problems designed to be solved in your head (like 65 - 18, 84 / 7)
- **Instant feedback** - Know immediately if you're right or wrong
- **Accuracy tracking** - See your performance stats
- **Multiple game modes** - Standard (60s) or Long (120s) mode
- **Smart question generation** - Avoids trivial questions, division limited to max 10 divisor

## Installation

### Quick Start with npx (No Installation)

```bash
npx brainit
```

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

### Standard Mode (60 seconds)

```bash
npx brainit
# or
brainit
```

### Long Mode (120 seconds)

```bash
npx brainit long
# or
brainit long
```

### Check Your High Score

```bash
npx brainit highscore
# or
brainit highscore
```

The game will:
1. Show you the rules and current high score
2. Wait for you to press ENTER to start
3. Give you 60 seconds (or 120s in long mode) to solve as many mental math problems as possible
4. Show your final score and accuracy
5. Save your high score automatically

## Game Rules

- Standard mode: **60 seconds** | Long mode: **120 seconds**
- Questions include:
  - **Addition**: 12-99 + 12-99 (e.g., 45 + 67)
  - **Subtraction**: 25-120 - 12+ (e.g., 82 - 35)
  - **Multiplication**: Two-digit × single-digit or medium ranges (e.g., 23 × 8, 14 × 11)
  - **Division**: Whole number results only, divisor max 10 (e.g., 84 / 7)
- No trivial questions (like 4 × 4 or 5 + 5)
- Division questions skip the first 3 questions for a better start
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
