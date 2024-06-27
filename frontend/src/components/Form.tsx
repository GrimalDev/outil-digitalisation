import React, { useState } from 'react';
import Section from './Section';
import Footer from './Footer';

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
  const [activeTab, setActiveTab] = useState<number>(0);
  const [hasScores, setHasScores] = useState<boolean>(false);

  const handleSectionScoreChange = (axisIndex: number, sectionIndex: number, scores: number[]) => {
    const newAxisScores = [...axisScores];
    newAxisScores[axisIndex][sectionIndex] = scores;
    setAxisScores(newAxisScores);

    // Check if there are any scores entered
    const anyScoresEntered = newAxisScores.flat(2).some(score => score > 0);
    setHasScores(anyScoresEntered);
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
