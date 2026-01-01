#!/usr/bin/env node

import readline from 'readline';
import fs from 'fs';
import path from 'path';
import os from 'os';
import chalk from 'chalk';
import cliCursor from 'cli-cursor';

interface GameStats {
  correct: number;
  incorrect: number;
  startTime: number;
}

interface HighScore {
  score: number;
  date: string;
}

class BrainIt {
  private rl: readline.Interface;
  private stats: GameStats;
  private gameActive: boolean;
  private currentQuestion: { question: string; answer: number } | null;
  private highScoreFile: string;
  private lastFeedback: string;
  private timerInterval: NodeJS.Timeout | null;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.stats = { correct: 0, incorrect: 0, startTime: 0 };
    this.gameActive = false;
    this.currentQuestion = null;
    this.highScoreFile = path.join(os.homedir(), '.brainit-highscore.json');
    this.lastFeedback = '';
    this.timerInterval = null;
  }

  private generateQuestion(): { question: string; answer: number } {
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];

    let num1: number, num2: number, answer: number, question: string;

    switch (operation) {
      case '+':
        num1 = Math.floor(Math.random() * 90) + 10; // 10-99
        num2 = Math.floor(Math.random() * 90) + 10; // 10-99
        answer = num1 + num2;
        question = `${num1} + ${num2}`;
        break;
      case '-':
        num1 = Math.floor(Math.random() * 90) + 10; // 10-99
        num2 = Math.floor(Math.random() * num1); // Ensure positive result
        answer = num1 - num2;
        question = `${num1} - ${num2}`;
        break;
      case '*':
        num1 = Math.floor(Math.random() * 10) + 2; // 2-11
        num2 = Math.floor(Math.random() * 10) + 2; // 2-11
        answer = num1 * num2;
        question = `${num1} × ${num2}`;
        break;
      default:
        num1 = 0;
        num2 = 0;
        answer = 0;
        question = '';
    }

    return { question, answer };
  }

  private async loadHighScore(): Promise<number> {
    try {
      if (fs.existsSync(this.highScoreFile)) {
        const data = fs.readFileSync(this.highScoreFile, 'utf-8');
        const highScore: HighScore = JSON.parse(data);
        return highScore.score;
      }
    } catch (error) {
      // If there's an error reading, just return 0
    }
    return 0;
  }

  private async saveHighScore(score: number): Promise<void> {
    try {
      const highScore: HighScore = {
        score,
        date: new Date().toISOString(),
      };
      fs.writeFileSync(this.highScoreFile, JSON.stringify(highScore, null, 2));
    } catch (error) {
      console.error('Failed to save high score');
    }
  }

  private getSecondsLeft(): number {
    const timeElapsed = Date.now() - this.stats.startTime;
    return Math.max(0, Math.ceil((60000 - timeElapsed) / 1000));
  }

  private displayGameScreen(): void {
    const secondsLeft = this.getSecondsLeft();

    // Clear screen completely
    console.clear();

    // Header with timer
    console.log(chalk.cyan('═══════════════════════════════════════════════════════'));
    console.log(chalk.bold.white('                    🧠 BRAINIT'));
    console.log(chalk.cyan('═══════════════════════════════════════════════════════\n'));

    // Timer - prominent at top with color based on time left (LINE 4)
    const timerColor = secondsLeft <= 10 ? chalk.red.bold : chalk.yellow.bold;
    console.log(timerColor(`⏱️  Time Remaining: ${secondsLeft}s\n`));

    // Stats (LINE 6)
    console.log(chalk.green(`✅ Correct: ${this.stats.correct}`) + '  ' + chalk.red(`❌ Wrong: ${this.stats.incorrect}\n`));

    // Last feedback (LINE 8)
    if (this.lastFeedback) {
      console.log(this.lastFeedback + '\n');
    } else {
      console.log(''); // Keep spacing consistent
    }

    console.log(chalk.cyan('───────────────────────────────────────────────────────\n'));
  }

  private updateTimerOnly(): void {
    const secondsLeft = this.getSecondsLeft();
    const timerColor = secondsLeft <= 10 ? chalk.red.bold : chalk.yellow.bold;

    // Save cursor position
    process.stdout.write('\x1b[s');

    // Move to line 5 (timer line), column 1
    process.stdout.write('\x1b[5;1H');

    // Clear the line and write updated timer
    process.stdout.write('\x1b[2K');
    process.stdout.write(timerColor(`⏱️  Time Remaining: ${secondsLeft}s`));

    // Restore cursor position
    process.stdout.write('\x1b[u');
  }

  private startTimer(): void {
    // Clear any existing timer
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    // Update display every second
    this.timerInterval = setInterval(() => {
      if (!this.gameActive) {
        if (this.timerInterval) {
          clearInterval(this.timerInterval);
        }
        return;
      }

      const timeElapsed = Date.now() - this.stats.startTime;
      if (timeElapsed >= 60000) {
        if (this.timerInterval) {
          clearInterval(this.timerInterval);
        }
        this.endGame();
        return;
      }

      // Update ONLY the timer line, don't touch input
      this.updateTimerOnly();
    }, 1000);
  }

  private askQuestion(): void {
    if (!this.gameActive) return;

    const timeElapsed = Date.now() - this.stats.startTime;
    if (timeElapsed >= 60000) {
      this.endGame();
      return;
    }

    this.currentQuestion = this.generateQuestion();

    // Display the screen
    this.displayGameScreen();

    // Show the question and ask for input
    this.rl.question(
      chalk.bold.white(`${this.currentQuestion.question} = `),
      (answer) => {
        this.handleAnswer(answer);
      }
    );
  }

  private handleAnswer(answer: string): void {
    if (!this.currentQuestion || !this.gameActive) return;

    const userAnswer = parseInt(answer.trim(), 10);

    if (isNaN(userAnswer)) {
      this.lastFeedback = chalk.red('❌ Please enter a valid number!');
      this.askQuestion();
      return;
    }

    if (userAnswer === this.currentQuestion.answer) {
      this.stats.correct++;
      this.lastFeedback = chalk.green.bold('✅ Correct! Great job!');
    } else {
      this.stats.incorrect++;
      this.lastFeedback = chalk.red(`❌ Wrong! The correct answer was ${chalk.bold(this.currentQuestion.answer.toString())}`);
    }

    this.askQuestion();
  }

  private async endGame(): Promise<void> {
    this.gameActive = false;

    // Clear the timer
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }

    cliCursor.show();

    const totalQuestions = this.stats.correct + this.stats.incorrect;
    const accuracy = totalQuestions > 0 ? ((this.stats.correct / totalQuestions) * 100).toFixed(1) : '0';

    console.clear();
    console.log('\n');
    console.log(chalk.yellow.bold('⏰ TIME\'S UP!\n'));
    console.log(chalk.cyan('═══════════════════════════════════════════════════════'));
    console.log(chalk.bold.white('                    GAME OVER'));
    console.log(chalk.cyan('═══════════════════════════════════════════════════════\n'));
    console.log(chalk.green(`  📊 Final Score: ${chalk.bold(this.stats.correct.toString())} correct`));
    console.log(chalk.red(`  ❌ Incorrect: ${this.stats.incorrect}`));
    console.log(chalk.blue(`  📈 Accuracy: ${accuracy}%`));
    console.log(chalk.cyan('═══════════════════════════════════════════════════════\n'));

    const previousHighScore = await this.loadHighScore();

    if (this.stats.correct > previousHighScore) {
      console.log(chalk.yellow.bold(`🎉 NEW HIGH SCORE! `) + chalk.white(`Previous: ${previousHighScore}\n`));
      await this.saveHighScore(this.stats.correct);
    } else if (previousHighScore > 0) {
      console.log(chalk.yellow(`🏆 High Score: ${previousHighScore}\n`));
    }

    this.rl.close();
    process.exit(0);
  }

  public async start(): Promise<void> {
    console.clear();
    cliCursor.show();

    console.log(chalk.cyan('═══════════════════════════════════════════════════════'));
    console.log(chalk.bold.white('              🧠 BRAINIT - Mental Math Game'));
    console.log(chalk.cyan('═══════════════════════════════════════════════════════\n'));
    console.log(chalk.white('💡 Rules:'));
    console.log(chalk.white('   • Solve as many math problems as you can'));
    console.log(chalk.white('   • You have 60 seconds'));
    console.log(chalk.white('   • Beat your high score!\n'));

    const highScore = await this.loadHighScore();
    if (highScore > 0) {
      console.log(chalk.yellow(`🏆 Current High Score: ${chalk.bold(highScore.toString())}\n`));
    }

    console.log(chalk.green('Press ENTER to start...'));

    this.rl.question('', () => {
      this.stats = { correct: 0, incorrect: 0, startTime: Date.now() };
      this.gameActive = true;
      cliCursor.hide();
      this.startTimer();
      this.askQuestion();
    });
  }
}

const game = new BrainIt();
game.start();
