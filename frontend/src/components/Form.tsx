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
  const [axisScores, setAxisScores] = useState<number[][][]>(axes.map(axis => axis.sections.map(() => Array(0))));

  const handleSectionScoreChange = (axisIndex: number, sectionIndex: number, scores: number[]) => {
    const newAxisScores = [...axisScores];
    newAxisScores[axisIndex][sectionIndex] = scores;
    setAxisScores(newAxisScores);
  };

  const generateJSON = () => {
    const data = {
      companyName: companyName,
      axes: axes.map((axis, axisIndex) => {
        const sections = axis.sections.map((section, sectionIndex) => {
          const sectionScores = axisScores[axisIndex][sectionIndex] || [];
          const questions = section.questions.map((question, questionIndex) => ({
            text: question,
            score: sectionScores[questionIndex] || 0,
          }));
          return {
            title: section.title,
            questions: questions,
            sectionTotalScore: sectionScores.reduce((total, score) => total + score, 0),
          };
        });
        return {
          name: axis.name,
          sections: sections,
          axisTotalScore: sections.reduce((total, section) => total + section.sectionTotalScore, 0),
        };
      }),
    };

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'evaluation.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-8 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Évaluation pour {companyName}</h2>

      {axes.map((axis, axisIndex) => {
        const axisTotalScore = axisScores[axisIndex].flat().reduce((total, score) => total + score, 0);
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
                onSectionScoreChange={(scores) => handleSectionScoreChange(axisIndex, sectionIndex, scores)}
              />
            ))}
          </div>
        );
      })}

      <button
        onClick={generateJSON}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
      >
        Télécharger JSON
      </button>
    </div>
  );
};

export default Form;
