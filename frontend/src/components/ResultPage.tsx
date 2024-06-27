import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface ResultPageProps {
  companyName: string | null;
  scores: number[][][];
  axisNames: string[];
}

const ResultPage: React.FC<ResultPageProps> = ({ companyName, scores, axisNames }) => {
  const navigate = useNavigate();
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!companyName || scores.length === 0) {
      navigate('/');
      return;
    }

    const ctx = document.getElementById('myChart') as HTMLCanvasElement;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const data = {
      labels: axisNames,
      datasets: [
        {
          label: 'Scores',
          data: scores.map(axisScores =>
            axisScores.reduce((total: number, sectionScores: number[]) =>
              total + sectionScores.reduce((sectionTotal: number, score: number) => sectionTotal + score, 0)
            , 0)
          ),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          pointBackgroundColor: 'rgba(75, 192, 192, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(75, 192, 192, 1)'
        }
      ]
    };

    const options = {
      scales: {
        r: {
          beginAtZero: true
        }
      }
    };

    chartRef.current = new Chart(ctx, {
      type: 'radar',
      data: data,
      options: options
    });

    // Cleanup function to destroy the chart when the component unmounts
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [companyName, scores, axisNames, navigate]);

  return (
    <div className="p-8 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 border-b-4 border-blue-600 pb-2">
        Résultats pour {companyName}
      </h2>
      <div className="flex justify-center">
        <canvas id="myChart" width="300" height="300" style={{ maxWidth: '100%', maxHeight: '100%' }}></canvas>
      </div>
    </div>
  );
};

export default ResultPage;
