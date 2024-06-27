import React, { useState, useEffect } from 'react';

interface CompanyFormProps {
  onSubmit: (companyName: string) => void;
}

const CompanyForm: React.FC<CompanyFormProps> = ({ onSubmit }) => {
  const [companyName, setCompanyName] = useState<string>('');
  const [companies, setCompanies] = useState<{ name: string }[]>([]);
  const [showCompanies, setShowCompanies] = useState<boolean>(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('http://localhost:8000/entreprises');
        const data = await response.json();
        if (Array.isArray(data)) {
          setCompanies(data.map((company: any) => ({ name: company.name })));
        } else {
          console.error('Response is not an array', data);
        }
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(companyName);
  };

  const handleShowCompanies = () => {
    setShowCompanies(!showCompanies);
  };

  const handleSelectCompany = (name: string) => {
    setCompanyName(name);
    setShowCompanies(false);
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
            type="button"
            onClick={handleShowCompanies}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
          >
            {showCompanies ? 'Masquer la liste' : 'Afficher la liste'}
          </button>
          {showCompanies && (
            <ul className="mb-4 bg-gray-100 border rounded shadow-inner max-h-48 overflow-y-auto">
              {companies.map((company) => (
                <li
                  key={company.name}
                  onClick={() => handleSelectCompany(company.name)}
                  className="cursor-pointer py-2 px-4 hover:bg-gray-200"
                >
                  {company.name}
                </li>
              ))}
            </ul>
          )}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold ml-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Soumettre
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompanyForm;
