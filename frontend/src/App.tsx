// src/App.tsx
import React, { useState } from 'react';
import Form from './components/Form';
import questions from './res/questions.json';
import CompanyForm from './components/SelectEntreprise';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [companyName, setCompanyName] = useState<string | null>(null);

  const handleCompanySubmit = (name: string) => {
    setCompanyName(name);
  };

  return (
    <div className="App">
      <Header/>
      {companyName ? (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
          <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-6">
            <Form axes={questions.axes} companyName={companyName} />
          </div>
        </div>
      ) : (
        <CompanyForm onSubmit={handleCompanySubmit} />
      )}

      <Footer/>
    </div>
  );
};

export default App;
