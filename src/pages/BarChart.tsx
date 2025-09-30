import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const BarChart = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Verifica si chartRef.current no es null antes de crear el gráfico
    if (chartRef.current) {
      // Datos de ejemplo para el gráfico de barras
      const data = {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
        datasets: [
          {
            label: "Pasos",
            data: [100, 1000, 3000, 5000, 9000],
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgb(75, 192, 192)",
            borderWidth: 1,
          },
        ],
      };

      // Configuración del gráfico
      const config = {
        type: 'bar' as const, // Usa 'bar' como un valor constante
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

export default BarChart;
