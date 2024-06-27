import React, { useState } from 'react';

interface CompanyFormProps {
  onSubmit: (companyName: string) => void;
}

const CompanyForm: React.FC<CompanyFormProps> = ({ onSubmit }) => {
  const [companyName, setCompanyName] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(companyName);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Quel est votre entreprise?</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="companyName" className="block text-gray-700 text-sm font-bold mb-2">
              Nom de l'entreprise:
            </label>
            <input
              type="text"
              id="companyName"
              value={companyName}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Entrez le nom de votre entreprise"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Soumettre
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompanyForm;
