#!/usr/bin/env node

import * as readline from 'readline';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

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

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.stats = { correct: 0, incorrect: 0, startTime: 0 };
    this.gameActive = false;
    this.currentQuestion = null;
    this.highScoreFile = path.join(os.homedir(), '.brainit-highscore.json');
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

  private askQuestion(): void {
    if (!this.gameActive) return;

    const timeElapsed = Date.now() - this.stats.startTime;
    if (timeElapsed >= 60000) {
      this.endGame();
      return;
    }

    this.currentQuestion = this.generateQuestion();
    const secondsLeft = Math.ceil((60000 - timeElapsed) / 1000);

    this.rl.question(
      `\n⏱️  ${secondsLeft}s | ${this.currentQuestion.question} = `,
      (answer) => {
        this.handleAnswer(answer);
      }
    );
  }

  private handleAnswer(answer: string): void {
    if (!this.currentQuestion || !this.gameActive) return;

    const userAnswer = parseInt(answer.trim(), 10);

    if (isNaN(userAnswer)) {
      console.log('❌ Please enter a valid number!');
      this.askQuestion();
      return;
    }

    if (userAnswer === this.currentQuestion.answer) {
      this.stats.correct++;
      console.log('✅ Correct!');
    } else {
      this.stats.incorrect++;
      console.log(`❌ Wrong! The answer was ${this.currentQuestion.answer}`);
    }

    this.askQuestion();
  }

  private async endGame(): Promise<void> {
    this.gameActive = false;
    const totalQuestions = this.stats.correct + this.stats.incorrect;
    const accuracy = totalQuestions > 0 ? ((this.stats.correct / totalQuestions) * 100).toFixed(1) : '0';

    console.log('\n\n⏰ TIME\'S UP!\n');
    console.log('═══════════════════════════════════');
    console.log(`  📊 Final Score: ${this.stats.correct} correct`);
    console.log(`  ❌ Incorrect: ${this.stats.incorrect}`);
    console.log(`  📈 Accuracy: ${accuracy}%`);
    console.log('═══════════════════════════════════\n');

    const previousHighScore = await this.loadHighScore();

    if (this.stats.correct > previousHighScore) {
      console.log(`🎉 NEW HIGH SCORE! Previous: ${previousHighScore}\n`);
      await this.saveHighScore(this.stats.correct);
    } else if (previousHighScore > 0) {
      console.log(`🏆 High Score: ${previousHighScore}\n`);
    }

    this.rl.close();
    process.exit(0);
  }

  public async start(): Promise<void> {
    console.clear();
    console.log('═══════════════════════════════════');
    console.log('   🧠 BRAINIT - Mental Math Game');
    console.log('═══════════════════════════════════\n');
    console.log('💡 Rules:');
    console.log('   • Solve as many math problems as you can');
    console.log('   • You have 60 seconds');
    console.log('   • Beat your high score!\n');

    const highScore = await this.loadHighScore();
    if (highScore > 0) {
      console.log(`🏆 Current High Score: ${highScore}\n`);
    }

    console.log('Press ENTER to start...');

    this.rl.question('', () => {
      console.log('\n🎮 Game starting...\n');
      this.stats = { correct: 0, incorrect: 0, startTime: Date.now() };
      this.gameActive = true;
      this.askQuestion();
    });
  }
}

const game = new BrainIt();
game.start();
