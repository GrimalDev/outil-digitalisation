import React from 'react';
import Question from './Question';

interface SectionProps {
  title: string;
  questions: string[];
}

const Section: React.FC<SectionProps> = ({ title, questions }) => {
  return (
    <div className="mb-8">
      <div className="bg-gray-200 py-2 px-4 mb-4 flex justify-between items-center rounded">
        <div className="text-xl font-semibold mb-4 flex-1">{title}</div>
        <div className="w-12 text-center text-gray-700 font-semibold">Score</div>
        <div className="w-12 text-center text-gray-700 font-semibold">0</div>
      </div>
      {questions.map((question, index) => (
        <Question key={index} text={question} />
      ))}
    </div>
  );
};

export default Section;
