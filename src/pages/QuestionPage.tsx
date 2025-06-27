import React, { useState } from 'react';
import { mbtiData } from '../data/mbti';
import { useTranslation } from 'react-i18next';

interface QuestionPageProps {
  questionIndex: number;
  onAnswer: (answer: string) => void;
}

const QuestionPage: React.FC<QuestionPageProps> = ({ questionIndex, onAnswer }) => {
  const { t } = useTranslation();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const question = mbtiData.questions[questionIndex];
  const progress = ((questionIndex + 1) / mbtiData.questions.length) * 100;

  const handleNext = () => {
    if (selectedAnswer) {
      onAnswer(selectedAnswer);
      setSelectedAnswer(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-[#fffceb] p-4">
      <div className="w-full max-w-md">
        <div className="mb-4">
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
              <div style={{ width: `${progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-coral"></div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800">{t('questionPage.questionNumber', { current: questionIndex + 1, total: mbtiData.questions.length })}</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-2xl text-center mb-2">{question.emoji}</p>
          <p className="text-lg text-gray-700 mb-6 text-center" dangerouslySetInnerHTML={{ __html: t(`mbtiData.questions.${questionIndex}.question`) }}></p>
          <div className="flex flex-col space-y-4">
            <label key={0} className="flex items-center p-3 rounded-lg bg-gray-100 cursor-pointer">
                <input
                  type="radio"
                  name="answer"
                  value={question.typeMap.choice1}
                  checked={selectedAnswer === question.typeMap.choice1}
                  onChange={() => setSelectedAnswer(question.typeMap.choice1)}
                  className="form-radio h-5 w-5 text-coral"
                />
                <span className="ml-4 text-gray-700">{t(`mbtiData.questions.${questionIndex}.choices.0.text`)}</span>
              </label>
              <label key={1} className="flex items-center p-3 rounded-lg bg-gray-100 cursor-pointer">
                <input
                  type="radio"
                  name="answer"
                  value={question.typeMap.choice2}
                  checked={selectedAnswer === question.typeMap.choice2}
                  onChange={() => setSelectedAnswer(question.typeMap.choice2)}
                  className="form-radio h-5 w-5 text-coral"
                />
                <span className="ml-4 text-gray-700">{t(`mbtiData.questions.${questionIndex}.choices.1.text`)}</span>
              </label>
          </div>
          <button
            onClick={handleNext}
            disabled={!selectedAnswer}
            className="mt-6 w-full bg-gray-700 hover:bg-coral text-white font-bold py-3 px-4 rounded-lg transition-opacity disabled:opacity-50"
          >
            {t('questionPage.nextButton')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;

