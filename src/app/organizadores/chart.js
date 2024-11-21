import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registrando os elementos necessários para o gráfico
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RelatorioDashboard = () => {
  const data = {
    labels: ['Organizador 1', 'Organizador 2', 'Organizador 3'],
    datasets: [
      {
        label: 'Número de Eventos',
        data: [5, 8, 3],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div>
      <h2>Relatório de Organizadores</h2>
      <Bar data={data} />
    </div>
  );
};

export default RelatorioDashboard;
