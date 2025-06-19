import readline from 'readline';
import readlineSync from 'readline-sync';

export  async function askQuestion(question: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => rl.question(question, ans => { rl.close(); resolve(ans); }));
}

export function askQuestionHidden(question: string): Promise<string> {
  return Promise.resolve(readlineSync.question(question, { hideEchoBack: true }));
}
