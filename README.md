# 🧠 BrainIt

**Fight brain rot, one equation at a time.** 💪

A terminal-based mental math game for developers who'd rather do quick math than scroll TikTok during their coffee break. Train your brain while your code compiles!

## ⚡ Quick Start

```bash
npm install -g brainit
brainit
```

That's it! No config, no setup, just pure mental math adrenaline.

## 🎮 What You Get

- **60-second sprint** - Beat the clock solving real mental math
- **Live countdown** - Watch time tick without losing your input
- **4 operations** - Addition, subtraction, multiplication, division
- **Smart questions** - No baby math like 2+2 or 5×1
- **High scores** - Flex on your past self
- **2 game modes** - Standard (60s) or Long (120s) for masochists

## 🕹️ Commands

```bash
brainit              # 60-second game
brainit long         # 120-second game (hardcore mode)
brainit highscore    # Check your best score
```

## 📖 The Rules

**Time:**
- Standard: 60 seconds ⏱️
- Long mode: 120 seconds 🔥

**Questions you'll see:**
- **Addition**: `47 + 68` (range: 12-99)
- **Subtraction**: `85 - 39` (range: 25-120)
- **Multiplication**: `23 × 8` or `14 × 11` (no easy ones like 4×4)
- **Division**: `72 / 9` (clean answers, divisor max 9)

**Smart design:**
- ❌ No trivial questions (bye bye 2+2)
- ⏭️ First 3 questions skip division (warm up first!)
- 💾 Auto-saves your high score to `~/.brainit-highscore.json`

## 🛠️ Development

```bash
git clone https://github.com/yourusername/brainit.git
cd brainit
npm install
npm run dev    # Run with hot reload
npm run build  # Compile TypeScript
```

## 🤔 Why This Exists

Your brain is getting soft from all that Stack Overflow copy-pasting. BrainIt brings back the mental math you used before calculators took over your life.

**Use it for:**
- 🧠 Quick brain warmup before deep work
- ☕ Coffee break that's actually productive
- 🏃 Mental sprints between compile times
- 💪 Keeping your calculation skills sharp

**The hidden benefit:** You'll stop reaching for your calculator to figure out how many minutes are in 2.5 hours.

## 📜 License

MIT - Go wild, build something cool.

## 🤝 Contributing

Found a bug? Want to add square roots? PRs welcome!

---

**Pro tip:** Set `alias math='brainit'` in your shell and feel like a genius every time you type it. 😎
