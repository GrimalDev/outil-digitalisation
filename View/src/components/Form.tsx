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
}

const Form: React.FC<FormProps> = ({ axes }) => {
  const [companyName, setCompanyName] = useState<string>('');
  const [axisScores, setAxisScores] = useState<number[][]>(axes.map(() => []));

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(event.target.value);
  };

  const handleSectionScoreChange = (axisIndex: number, sectionIndex: number, score: number) => {
    const newAxisScores = [...axisScores];
    newAxisScores[axisIndex][sectionIndex] = score;
    setAxisScores(newAxisScores);
  };
  
  return (
    <div>
      <span className="text-sm">
        Saisir le nom de l'entreprise à évaluer
      </span>
      <div className="flex justify-center">
        <input
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 mx-auto my-4"
          type="text"
          value={companyName}
          onChange={handleInputChange}
          placeholder="Cesi"
        />
      </div>

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
