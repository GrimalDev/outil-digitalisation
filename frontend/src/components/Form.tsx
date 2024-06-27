import React, { useState, useCallback } from 'react';
import Section from './Section';

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
}

interface AxisProps {
  name: string;
  description: string;
  sections: SectionProps[];
}

interface FormProps {
  axes: AxisProps[];
  companyName: string;
}

const Form: React.FC<FormProps> = ({ axes, companyName }) => {
  const initialScores = axes.map(axis => axis.sections.map(() => Array<number>(0)));

  const [axisScores, setAxisScores] = useState<number[][][]>(initialScores);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [hasScores, setHasScores] = useState<boolean>(false);

  const handleSectionScoreChange = useCallback((axisIndex: number, sectionIndex: number, scores: number[]) => {
    setAxisScores(prevScores => {
      const newAxisScores = [...prevScores];
      newAxisScores[axisIndex][sectionIndex] = scores;
      return newAxisScores;
    });

    const anyScoresEntered = scores.some(score => score > 0);
    setHasScores(anyScoresEntered);
  }, []);

  const generateJSON = () => {
    const data = {
      companyName: companyName,
      axes: axes.map((axis, axisIndex) => {
        const sections = axis.sections.map((section, sectionIndex) => {
          const sectionScores = axisScores[axisIndex][sectionIndex] || [];
          const questions = section.questions.map((question, questionIndex) => ({
            text: question.statement,
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
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 border-b-4 border-blue-600 pb-2">
        Évaluation pour {companyName}
      </h2>

      <div className="mb-4 flex justify-center">
        {axes.map((axis, index) => (
          <button
            key={index}
            className={`px-4 py-2 mx-2 rounded-lg focus:outline-none ${activeTab === index ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'}`}
            onClick={() => setActiveTab(index)}
          >
            {axis.name}
          </button>
        ))}
      </div>

      {axes.map((axis, axisIndex) => (
        <div key={axisIndex} className={`${activeTab === axisIndex ? 'block' : 'hidden'}`}>
          {axis.sections.map((section, sectionIndex) => (
            <Section
              key={sectionIndex}
              title={section.title}
              questions={section.questions}
              onSectionScoreChange={(scores) => handleSectionScoreChange(axisIndex, sectionIndex, scores)}
            />
          ))}
        </div>
      ))}

      <button
        onClick={generateJSON}
        className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 ${!hasScores ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!hasScores}
      >
        Télécharger JSON
      </button>
    </div>
  );
};

export default Form;
