import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface CompanyDetailProps {}

interface Company {
  _id: string;
  name: string;
  sector: string;
  number_of_employees: number;
  location: string;
  governance: string;
  centralized: string;
  clientele: string;
  project: string;
  responses: string | null;
}

const CompanyDetail: React.FC<CompanyDetailProps> = () => {
  const { companyName } = useParams<{ companyName: string }>();
  const [company, setCompany] = useState<Company | null>(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await fetch(`http://localhost:8000/entreprises?name=${companyName}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: Company = await response.json();
        setCompany(data);
      } catch (error) {
        console.error('Error fetching company details:', error);
      }
    };

    fetchCompany();
  }, [companyName]);

  if (!company) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">{company.name}</h1>
        <p><strong>Secteur:</strong> {company.sector}</p>
        <p><strong>Nombre d'employés:</strong> {company.number_of_employees}</p>
        <p><strong>Emplacement:</strong> {company.location}</p>
        <p><strong>Gouvernance:</strong> {company.governance}</p>
        <p><strong>Centralisé:</strong> {company.centralized}</p>
        <p><strong>Clientèle:</strong> {company.clientele}</p>
        <p><strong>Projet:</strong> {company.project}</p>
      </div>
    </div>
  );
};

export default CompanyDetail;
