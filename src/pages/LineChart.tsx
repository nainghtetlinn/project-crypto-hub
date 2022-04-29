import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  coinHistory: any;
  currentPrice: number | string;
  coinName: string;
}

export const LineChart: React.FC<LineChartProps> = ({
  coinHistory,
  coinName,
  currentPrice,
}) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    coinPrice.unshift(coinHistory?.data?.history[i].price);
    coinTimestamp.unshift(
      new Date(
        coinHistory?.data?.history[i].timestamp * 1000
      ).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  return (
    <div className="w-full">
      <div className="my-4 flex items-center justify-end space-x-4">
        <h5 className="font-bold">Change: {coinHistory?.data?.change}%</h5>
        <h5 className="font-bold">
          Current {coinName && coinName} Price: $ {currentPrice && currentPrice}
        </h5>
      </div>
      <Line
        options={{
          responsive: true,
          elements: {
            point: {
              radius: 0,
            },
          },
          plugins: {
            tooltip: {
              mode: 'index',
              intersect: false,
              yAlign: 'bottom',
            },
          },
          hover: {
            mode: 'index',
            intersect: false,
          },
        }}
        data={data}
      />
    </div>
  );
};
