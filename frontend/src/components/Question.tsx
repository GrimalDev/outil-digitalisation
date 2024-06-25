import React, { useState } from 'react';

interface QuestionProps {
  text: string;
  onScoreChange: (score: number) => void;
}

const Question: React.FC<QuestionProps> = ({ text, onScoreChange }) => {
  const [score, setScore] = useState<number>(0);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newScore = parseInt(event.target.value, 10);
    setScore(newScore);
    onScoreChange(newScore);
  };

  return (
    <div className="bg-white py-2 px-4 mb-4 flex justify-between items-center">
      <div className="flex-1">{text}</div>
      <div className="w-12 text-center">
        <select value={score} onChange={handleSelectChange}>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
      </div>
      <div className="w-12 text-center"></div>
    </div>
  );
};

export default Question;
