import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import CompanyForm from './components/SelectEntreprise';
import Header from './components/Header';
import Footer from './components/Footer';

interface Choice {
  text: string;
  value: number;
}

interface Question {
  statement: string;
  possible_choices: Choice[];
}

interface Axis {
  _id: string;
  name: string;
  description: string;
  questions: Question[];
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

const App: React.FC = () => {
  const [companyName, setCompanyName] = useState<string | null>(null);
  const [axes, setAxes] = useState<AxisProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleCompanySubmit = (name: string) => {
    setCompanyName(name);
  };

  useEffect(() => {
    const fetchAxes = async () => {
      try {
        const response = await fetch('http://localhost:8000/questionnaire');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: Axis[] = await response.json();
        if (!Array.isArray(data)) {
          throw new TypeError('Response is not an array');
        }
        
        // Transform the data to fit the expected AxisProps type
        const transformedAxes = data.map(axis => ({
          name: axis.name,
          description: axis.description,
          sections: [{
            title: axis.name, // Assuming each axis has one section titled with its name
            questions: axis.questions
          }]
        }));

        setAxes(transformedAxes);
      } catch (error: unknown) {
        console.error('Error fetching axes:', error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchAxes();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="App">
      <Header />
      {companyName ? (
        <div className="bg-white min-h-screen flex flex-col items-center justify-center">
          <div className="max-w-3xl w-full bg-white rounded-lg p-6">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 border-b-4 border-blue-600 pb-2">
              Évaluation pour {companyName}
            </h2>
            {axes.map((axis) => (
              <div key={axis.name} className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700">{axis.name}</h3>
                <p className="text-gray-600">{axis.description}</p>
              </div>
            ))}
            <Form axes={axes} companyName={companyName} />
          </div>
        </div>
      ) : (
        <CompanyForm onSubmit={handleCompanySubmit} />
      )}
      <Footer />
    </div>
  );
};

export default App;
