import React, { useEffect, useState } from 'react';

const Footer: React.FC = () => {
  const [version, setVersion] = useState<string>('');

  useEffect(() => {
    const fetchVersion = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/GrimalDev/outil-digitalisation/tags');
        const data = await response.json();
        if (data.length > 0) {
          setVersion(data[0].name);
        }
      } catch (error) {
        console.error('Error fetching version:', error);
      }
    };

    fetchVersion();
  }, []);

  return (
    <footer className="bg-gray-200 text-gray-700 py-4 mt-1 rounded-lg">
      <div className="container mx-auto text-center">
        <h1 className="text-xl font-semibold mb-2">Évaluation des Pratiques de l'Entreprise</h1>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Évaluation des Pratiques de l'Entreprise. Tous droits réservés.
        </p>
        <p className="text-sm">
          Version: {version ? version : 'Chargement...'} - <a href={`https://github.com/GrimalDev/outil-digitalisation/releases/tag/${version}`} className="text-blue-500 underline">Voir la release sur GitHub</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
