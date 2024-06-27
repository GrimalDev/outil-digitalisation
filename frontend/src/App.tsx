  import React, { useState, useEffect } from 'react';
  import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
  import Form from './components/Form';
  import CompanyForm from './components/SelectEntreprise';
  import Header from './components/Header';
  import Footer from './components/Footer';
  import ResultPage from './components/ResultPage';

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
    const [companyName, setCompanyName] = useState<string | null>(localStorage.getItem('companyName'));
    const [axes, setAxes] = useState<AxisProps[]>(() => {
      const savedAxes = localStorage.getItem('axes');
      return savedAxes ? JSON.parse(savedAxes) : [];
    });
    const [scores, setScores] = useState<number[][][]>(() => {
      const savedScores = localStorage.getItem('scores');
      return savedScores ? JSON.parse(savedScores) : [];
    });
    const [error, setError] = useState<string | null>(null);

    const handleCompanySubmit = (name: string) => {
      setCompanyName(name);
      localStorage.setItem('companyName', name);
    };

    const handleScoresSubmit = (scores: number[][][]) => {
      setScores(scores);
      localStorage.setItem('scores', JSON.stringify(scores));
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

          const transformedAxes = data.map(axis => ({
            name: axis.name,
            description: axis.description,
            sections: [{
              title: axis.name,
              questions: axis.questions
            }]
          }));

          setAxes(transformedAxes);
          localStorage.setItem('axes', JSON.stringify(transformedAxes));
        } catch (error: unknown) {
          console.error('Error fetching axes:', error);
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError('An unknown error occurred');
          }
        }
      };

      if (!axes.length) {
        fetchAxes();
      }
    }, [axes.length]);

    if (error) {
      return <div>Error: {error}</div>;
    }

    const axisNames = axes.map(axis => axis.name);

    return (
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                companyName ? (
                  <Form axes={axes} companyName={companyName} onScoresSubmit={handleScoresSubmit} />
                ) : (
                  <CompanyForm onSubmit={handleCompanySubmit} />
                )
              }
            />
            <Route path="/form/:companyName" element={<Form axes={axes} companyName={companyName || ''} onScoresSubmit={handleScoresSubmit} />} />
            <Route path="/results" element={<ResultPage companyName={companyName} scores={scores} axisNames={axisNames} />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    );
  };

  export default App;
