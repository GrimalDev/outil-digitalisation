import React, { useState } from 'react';

interface Choice {
  text: string;
  value: number;
}

interface QuestionProps {
  text: string;
  choices: Choice[];
  onScoreChange: (score: number) => void;
}

const Question: React.FC<QuestionProps> = ({ text, choices, onScoreChange }) => {
  const [score, setScore] = useState<number>(0);
  const [hoveredChoice, setHoveredChoice] = useState<string | null>(null);

  const handleRadioChange = (value: number) => {
    setScore(value);
    onScoreChange(value);
  };

  const handleMouseEnter = (choiceText: string) => {
    setHoveredChoice(choiceText);
  };

  const handleMouseLeave = () => {
    setHoveredChoice(null);
  };

  return (
    <div className="bg-white py-3 px-4 mb-4 flex justify-between items-center rounded shadow-sm hover:shadow-md transition-shadow relative">
      <div className="flex-1 text-gray-800 mr-4">{text}</div>
      <div className="w-16 text-center mr-4">
        {[0, 1, 2].map((value, index) => (
          <label key={index} className="block">
            <input
              type="radio"
              name={text}
              value={value}
              checked={score === value}
              onChange={() => handleRadioChange(value)}
              onMouseEnter={() => handleMouseEnter(choices[index].text)}
              onMouseLeave={handleMouseLeave}
              className="mr-2"
            />
            {value}
          </label>
        ))}
      </div>
      {hoveredChoice && (
        <div className="absolute top-full mt-2 bg-gray-700 text-white text-xs rounded py-1 px-2 z-10 w-64">
          {hoveredChoice}
        </div>
      )}
    </div>
  );
};

export default Question;
