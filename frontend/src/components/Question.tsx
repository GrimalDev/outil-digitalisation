// src/components/Question.tsx
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
    <div className="bg-white py-3 px-4 mb-4 flex justify-between items-center rounded shadow-sm hover:shadow-md transition-shadow">
      <div className="flex-1 text-gray-800">{text}</div>
      <div className="w-16 text-center">
        <select
          value={score}
          onChange={handleSelectChange}
          className="block w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        >
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
      </div>
    </div>
  );
};

export default Question;
