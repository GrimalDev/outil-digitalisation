import React from 'react';
import Form from './components/Form';
import questions from './res/questions.json';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Évaluation des Pratiques de l'Entreprise</h1>
        <Form axes={questions.axes} />
      </div>
    </div>
  );
}

export default App;
