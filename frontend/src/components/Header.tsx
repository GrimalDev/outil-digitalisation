import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('companyName');
    localStorage.removeItem('axes');
    localStorage.removeItem('scores');
    navigate('/');
    window.location.reload();
  };

  return (
    <header className="bg-blue-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Évaluation des Pratiques de l'Entreprise</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Vider le formulaire
        </button>
      </div>
    </header>
  );
};

export default Header;
