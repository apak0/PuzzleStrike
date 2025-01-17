interface Translations {
  title: string;
  
  selectDifficulty: string;
  easy: string;
  medium: string;
  hard: string;
  startGame: string;
  score: string;
  moveLeft: string;
  moveRight: string;
  moveDown: string;
  rotate: string;
  refresh: string;
}

export const translations: Record<'en' | 'tr', Translations> = {
  en: {
    title: 'PuzzleStrike',
    
    selectDifficulty: 'Select Difficulty',
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    startGame: '',
    score: 'Score',
    moveLeft: 'Move Left',
    moveRight: 'Move Right',
    moveDown: 'Move Down',
    rotate: 'Rotate',
    refresh: 'New Game'
  },
  tr: {
    title: 'PuzzleStrike',
   
    selectDifficulty: 'Zorluk Seç',
    easy: 'Kolay',
    medium: 'Orta',
    hard: 'Zor',
    startGame: 'Oyunu Başlat',
    score: 'Skor',
    moveLeft: 'Sola Git',
    moveRight: 'Sağa Git',
    moveDown: 'Aşağı İn',
    rotate: 'Döndür',
    refresh: 'Yeni Oyun'
  }
};