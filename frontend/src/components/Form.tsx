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
    <div>
      <h2 className="text-2xl font-bold mb-6">Évaluation pour {companyName}</h2>

      {axes.map((axis, axisIndex) => {
        const axisTotalScore = axisScores[axisIndex].reduce((total, score) => total + score, 0);
        const axisMaxScore = axis.sections.reduce((total, section) => total + section.questions.length * 2, 0);
        const axisAverageScore = (axisTotalScore / axisMaxScore) * 5;

        return (
          <div key={axisIndex} className="mb-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold mb-4">{axis.name}</h2>
              <div className="text-xl font-semibold mb-4">
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
