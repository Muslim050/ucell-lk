import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { ServiceInterface } from '@core/models/mainscreen.interface';

ChartJS.register(ArcElement, Tooltip, Legend);
interface ProgressServicesProps {
  service: ServiceInterface;
}

function ProgressServices({ service }: ProgressServicesProps) {
  const liveAmount = service && parseFloat(service.value.live);
  const initialAmount = service && parseFloat(service.value.initial);
  const color = service && service.color;

  const completionPercentage = (liveAmount / initialAmount) * 100;

  const chartData = {
    datasets: [
      {
        data: [liveAmount, initialAmount - liveAmount],
        backgroundColor: [color, '#d2d2d2'], // Задаем красный цвет для сектора с наименьшим значением
        borderRadius: 15,
        borderWidth: 2
      }
    ]
  };

  const options = {
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: false
      }
    },

    cutout: '70%'
  };
  return (
    <div
      style={{
        width: '48px',
        display: 'flex',
        justifyContent: 'center',
        margin: '0 auto'
      }}
    >
      <Doughnut data={chartData} options={options} />
    </div>
  );
}
export default ProgressServices;
