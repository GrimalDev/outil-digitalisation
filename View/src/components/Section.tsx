import React, { useState, useEffect } from 'react';
import Question from './Question';

interface SectionProps {
  title: string;
  questions: string[];
  onSectionScoreChange: (score: number) => void;
}

const Section: React.FC<SectionProps> = ({ title, questions, onSectionScoreChange }) => {
  const [scores, setScores] = useState<number[]>(Array(questions.length).fill(0));

  const handleScoreChange = (index: number, score: number) => {
    const newScores = [...scores];
    newScores[index] = score;
    setScores(newScores);
  };

  const totalScore = scores.reduce((total, score) => total + score, 0);
  const averageScore = (totalScore / (scores.length * 2)) * 10;

  useEffect(() => {
    onSectionScoreChange(totalScore);
  }, [totalScore, onSectionScoreChange]);

  return (
    <div className="mb-8">
      <div className="bg-gray-200 py-2 px-4 mb-4 flex justify-between items-center rounded">
        <div className="text-xl font-semibold mb-4 flex-1">{title}</div>
        <div className="w-12 text-center text-gray-700 font-semibold">Score</div>
        <div className="w-12 text-center text-gray-700 font-semibold">{averageScore.toFixed(1)}</div>
      </div>
      {questions.map((question, index) => (
        <Question
          key={index}
          text={question}
          onScoreChange={(score) => handleScoreChange(index, score)}
        />
      ))}
    </div>
  );
};

export default Section;
