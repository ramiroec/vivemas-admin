import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const LineChart = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
    // Datos de ejemplo para el gráfico de líneas
    const data = {
      labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
      datasets: [
        {
          label: "Empresas",
          data: [1, 3, 3, 5, 7],
          borderColor: "rgb(75, 192, 192)",
          borderWidth: 2,
          fill: false,
        },
      ],
    };

    // Configuración del gráfico
    const config = {
      type: 'line' as const,
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    // Crear el gráfico en el elemento canvas
    const myChart = new Chart(chartRef.current, config);

    return () => {
      // Limpieza del gráfico al desmontar el componente
      myChart.destroy();
    };
    }
  }, []);

  return <canvas ref={chartRef} width={400} height={200} />;
};

export default LineChart;
