// src/components/Form.tsx
import React, { useState } from 'react';
import Section from './Section';

interface SectionProps {
  title: string;
  questions: string[];
}

interface AxisProps {
  name: string;
  sections: SectionProps[];
}

interface FormProps {
  axes: AxisProps[];
  companyName: string;
}

const Form: React.FC<FormProps> = ({ axes, companyName }) => {
  const [axisScores, setAxisScores] = useState<number[][]>(axes.map(() => []));

  const handleSectionScoreChange = (axisIndex: number, sectionIndex: number, score: number) => {
    const newAxisScores = [...axisScores];
    newAxisScores[axisIndex][sectionIndex] = score;
    setAxisScores(newAxisScores);
  };

  return (
    <div className="p-8 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Évaluation pour {companyName}</h2>

      {axes.map((axis, axisIndex) => {
        const axisTotalScore = axisScores[axisIndex].reduce((total, score) => total + score, 0);
        const axisMaxScore = axis.sections.reduce((total, section) => total + section.questions.length * 2, 0);
        const axisAverageScore = (axisTotalScore / axisMaxScore) * 5;

        return (
          <div key={axisIndex} className="mb-8">
            <div className="flex justify-between items-center bg-blue-100 p-4 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-blue-700">{axis.name}</h3>
              <div className="text-xl font-semibold text-blue-700">
                Score de l'axe : {axisAverageScore.toFixed(1)}
              </div>
            </div>
            {axis.sections.map((section, sectionIndex) => (
              <Section
                key={sectionIndex}
                title={section.title}
                questions={section.questions}
                onSectionScoreChange={(score) => handleSectionScoreChange(axisIndex, sectionIndex, score)}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Form;
