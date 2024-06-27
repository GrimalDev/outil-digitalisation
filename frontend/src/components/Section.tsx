import React, { useState, useEffect, useCallback } from 'react';
import Question from './Question';

interface Choice {
  text: string;
  value: number;
}

interface Question {
  statement: string;
  possible_choices: Choice[];
}

interface SectionProps {
  title: string;
  questions: Question[];
  onSectionScoreChange: (scores: number[]) => void;
}

const Section: React.FC<SectionProps> = ({ title, questions, onSectionScoreChange }) => {
  const [scores, setScores] = useState<number[]>(Array(questions.length).fill(0));

  const handleScoreChange = useCallback((index: number, score: number) => {
    setScores(prevScores => {
      const newScores = [...prevScores];
      newScores[index] = score;
      return newScores;
    });
  }, []);

  const totalScore = scores.reduce((total, score) => total + score, 0);
  const averageScore = (totalScore / (scores.length * 2)) * 10;

  useEffect(() => {
    onSectionScoreChange(scores);
  }, [scores, onSectionScoreChange]);

  return (
    <div className="mb-8">
      <div className="bg-gray-200 py-2 px-4 mb-4 flex justify-between items-center rounded shadow-md">
        <div className="text-lg font-semibold text-gray-800">{title}</div>
        <div className="w-12 text-center text-gray-700 font-semibold">Score</div>
        <div className="w-12 text-center text-gray-700 font-semibold">{averageScore.toFixed(1)}</div>
      </div>
      {questions.map((question, index) => (
        <Question
          key={index}
          text={question.statement}
          choices={question.possible_choices}
          onScoreChange={(score) => handleScoreChange(index, score)}
        />
      ))}
    </div>
  );
};

export default Section;
