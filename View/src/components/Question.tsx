import React, { useState } from 'react';

interface QuestionProps {
  text: string;
}

const Question: React.FC<QuestionProps> = ({ text }) => {
  const [score, setScore] = useState<string>('0');

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setScore(event.target.value);
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
