import React, { useState } from 'react';
import './App.css';
import MobileAppWrapper from './components/MobileAppWrapper';
import StartPage from './pages/StartPage';
import QuestionPage from './pages/QuestionPage';
import ResultPage from './pages/ResultPage';
import { mbtiData, MbtiType } from './data/mbti';
import { useTranslation } from 'react-i18next';

type GameState = 'start' | 'playing' | 'result';

function App() {
  const { } = useTranslation();
  const [gameState, setGameState] = useState<GameState>('start');
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<MbtiType | null>(null);

  const handleStart = () => {
    setAnswers([]);
    setGameState('playing');
  };

  const handleAnswer = (answerType: string) => {
    const newAnswers = [...answers, answerType];
    setAnswers(newAnswers);

    if (newAnswers.length === mbtiData.questions.length) {
      calculateResult(newAnswers);
      setGameState('result');
    } 
  };

  const handleRestart = () => {
    setGameState('start');
    setAnswers([]);
    setResult(null);
  };

  const calculateResult = (currentAnswers: string[]) => {
    const counts = {
      E: 0,
      I: 0,
      N: 0,
      S: 0,
      T: 0,
      F: 0,
      P: 0,
      J: 0,
    };

    currentAnswers.forEach((answer) => {
      counts[answer as keyof typeof counts]++;
    });

    let finalResult = '';
    finalResult += counts.E > counts.I ? 'E' : 'I';
    finalResult += counts.N > counts.S ? 'N' : 'S';
    finalResult += counts.T > counts.F ? 'T' : 'F';
    finalResult += counts.P > counts.J ? 'P' : 'J';

    setResult(finalResult as MbtiType);
  };

  const renderPage = () => {
    switch (gameState) {
      case 'start':
        return <StartPage onStart={handleStart} />;
      case 'playing':
        return <QuestionPage questionIndex={answers.length} onAnswer={handleAnswer} />;
      case 'result':
        return result ? <ResultPage result={result} onRestart={handleRestart} /> : null;
      default:
        return null;
    }
  };

  return (
    <MobileAppWrapper>
      {renderPage()}
    </MobileAppWrapper>
  );
}

export default App;
